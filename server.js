const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const PORT = Number(process.env.PORT || 4173);

loadEnvFile(path.join(ROOT, ".env"));

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalsAt = trimmed.indexOf("=");
    if (equalsAt < 1) continue;
    const key = trimmed.slice(0, equalsAt).trim();
    let value = trimmed.slice(equalsAt + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function readJson(req, limit = 80_000) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > limit) {
        reject(Object.assign(new Error("请求内容过大"), { status: 413 }));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(Object.assign(new Error("请求不是有效的 JSON"), { status: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function normalizeBaseUrl(raw) {
  const fallback = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
  try {
    const url = new URL(raw || fallback);
    if (!["https:", "http:"].includes(url.protocol)) throw new Error("unsupported protocol");
    return url.toString().replace(/\/+$/, "");
  } catch {
    throw Object.assign(new Error("AI 接口地址无效"), { status: 400 });
  }
}

function extractJson(content) {
  if (typeof content !== "string") return null;
  const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

async function handleAi(req, res) {
  let payload;
  try {
    payload = await readJson(req);
  } catch (error) {
    sendJson(res, error.status || 400, { ok: false, message: error.message });
    return;
  }

  const apiKey =
    String(payload.apiKey || "").trim() ||
    String(process.env.DEEPSEEK_API_KEY || "").trim();

  if (!apiKey) {
    sendJson(res, 401, {
      ok: false,
      code: "NO_API_KEY",
      message: "尚未配置 DeepSeek API Key，当前将使用本地策略对手。"
    });
    return;
  }

  const system = String(payload.system || "").slice(0, 8_000);
  const prompt = String(payload.prompt || "").slice(0, 40_000);
  if (!system || !prompt) {
    sendJson(res, 400, { ok: false, message: "缺少模型提示内容" });
    return;
  }

  let baseUrl;
  try {
    baseUrl = normalizeBaseUrl(payload.baseUrl);
  } catch (error) {
    sendJson(res, error.status || 400, { ok: false, message: error.message });
    return;
  }

  const model = String(payload.model || process.env.DEEPSEEK_MODEL || "deepseek-chat");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt }
        ],
        temperature: 0.78,
        max_tokens: 380,
        response_format: { type: "json_object" }
      }),
      signal: controller.signal
    });

    const raw = await upstream.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      const upstreamMessage =
        data?.error?.message ||
        (raw ? raw.slice(0, 240) : `AI 服务返回了 ${upstream.status}`);
      sendJson(res, upstream.status === 401 ? 401 : 502, {
        ok: false,
        code: "UPSTREAM_ERROR",
        message: `AI 服务调用失败：${upstreamMessage}`
      });
      return;
    }

    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      sendJson(res, 502, {
        ok: false,
        code: "EMPTY_RESPONSE",
        message: "AI 没有返回有效内容"
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      content,
      parsed: extractJson(content),
      model,
      usage: data.usage || null
    });
  } catch (error) {
    const isAbort = error?.name === "AbortError";
    sendJson(res, isAbort ? 504 : 502, {
      ok: false,
      code: isAbort ? "AI_TIMEOUT" : "AI_NETWORK_ERROR",
      message: isAbort
        ? "AI 思考超时，已自动切换到本地策略。"
        : "无法连接 AI 服务，已自动切换到本地策略。"
    });
  } finally {
    clearTimeout(timer);
  }
}

function serveStatic(req, res, pathname) {
  let requestedPath = pathname === "/" ? "/index.html" : pathname;
  try {
    requestedPath = decodeURIComponent(requestedPath);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  const filePath = path.resolve(PUBLIC_DIR, `.${requestedPath}`);
  if (filePath !== PUBLIC_DIR && !filePath.startsWith(`${PUBLIC_DIR}${path.sep}`)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      // The SPA owns every non-file route.
      const indexPath = path.join(PUBLIC_DIR, "index.html");
      fs.readFile(indexPath, (indexError, contents) => {
        if (indexError) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, {
          "Content-Type": MIME_TYPES[".html"],
          "Cache-Control": "no-cache"
        });
        res.end(contents);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=300"
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/api/status" && req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      serverConfigured: Boolean(process.env.DEEPSEEK_API_KEY),
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      endpoint: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com"
    });
    return;
  }

  if (url.pathname === "/api/ai" && req.method === "POST") {
    await handleAi(req, res);
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    sendJson(res, 404, { ok: false, message: "接口不存在" });
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }

  serveStatic(req, res, url.pathname);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("  博弈研究所已启动");
  console.log(`  http://127.0.0.1:${PORT}`);
  console.log(
    process.env.DEEPSEEK_API_KEY
      ? `  DeepSeek: 已配置 (${process.env.DEEPSEEK_MODEL || "deepseek-chat"})`
      : "  DeepSeek: 未配置，将使用本地策略对手"
  );
  console.log("");
});
