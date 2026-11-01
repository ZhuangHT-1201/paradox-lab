import {
  getLanguage,
  setLanguage,
  localizeGame,
  translateDOM,
  updateLanguageButtons
} from "./i18n.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  swords: '<path d="M14.5 5.5 19 2l3 3-3.5 4.5"/><path d="m9.5 18.5-4 4-3-3 4-4"/><path d="m5 5 14 14"/><path d="m19 5-5.5 6.5"/><path d="m5.5 11.5 6.5 6.5"/><circle cx="12" cy="12" r="1.7"/>',
  archive: '<path d="M4 7h16v13H4z"/><path d="M3 3h18v4H3z"/><path d="M9 11h6"/>',
  spark: '<path d="m12 2 1.5 5.2L19 9l-5.5 1.8L12 16l-1.5-5.2L5 9l5.5-1.8L12 2Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/>',
  "arrow-up-right": '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m14 7 5 5-5 5"/>',
  "arrow-left": '<path d="M19 12H5"/><path d="m10 7-5 5 5 5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.09 14H3v-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.09V3h4v.09A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 20.91 10H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 6.7"/><path d="M20 4v7h-7"/>',
  trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  brain: '<path d="M9.5 4a3 3 0 0 0-5.7 1.4A3.5 3.5 0 0 0 2 8.5a3.4 3.4 0 0 0 1.3 2.7A3.5 3.5 0 0 0 5 17.5 3 3 0 0 0 9.5 20V4Z"/><path d="M14.5 4a3 3 0 0 1 5.7 1.4 3.5 3.5 0 0 1 1.8 3.1 3.4 3.4 0 0 1-1.3 2.7 3.5 3.5 0 0 1-1.7 6.3 3 3 0 0 1-4.5 2.5V4Z"/><path d="M9.5 9H7"/><path d="M14.5 13h2.5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  coins: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 11v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5"/>',
  leaf: '<path d="M20 4c-7 0-14 4-14 11a5 5 0 0 0 5 5c7 0 9-7 9-16Z"/><path d="M4 21c2-6 6-9 11-12"/>',
  gavel: '<path d="m14 5 5 5"/><path d="m12 7 5 5"/><path d="M3 21h10"/><path d="m13 3 7 7-2 2-7-7 2-2Z"/><path d="m10 8 6 6-6 4H5l5-10Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  flame: '<path d="M12 22c4.4 0 8-3.6 8-8 0-4-2.5-7.5-5-10-.4 3-2 5-4 6 0-3-1-5-3-7-1 4-4 7-4 11 0 4.4 3.6 8 8 8Z"/><path d="M12 18c1.7 0 3-1.3 3-3s-1-3-3-5c-2 2-3 3.3-3 5s1.3 3 3 3Z"/>',
  chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  zap: '<path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 12 9-9"/><path d="m16 7 2 2"/><path d="m19 4 2 2"/>',
  shuffle: '<path d="M3 7h3c5 0 6 10 11 10h4"/><path d="m18 14 3 3-3 3"/><path d="M3 17h3c2 0 3.2-1.6 4.3-3.5"/><path d="M13.7 8.5C14.8 6.4 16 5 18 5h3"/><path d="m18 2 3 3-3 3"/>'
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.info}</svg>`;
}

function hydrateIcons(root = document) {
  $$("[data-icon]", root).forEach((node) => {
    const name = node.dataset.icon;
    if (name && ICONS[name]) node.innerHTML = icon(name);
  });
  translateDOM(root);
  updateLanguageButtons();
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatNumber(value) {
  return new Intl.NumberFormat(getLanguage() === "en" ? "en-US" : "zh-CN", {
    maximumFractionDigits: 1
  }).format(value);
}

function formatDate(iso, includeTime = true) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "未知时间";
  return new Intl.DateTimeFormat(getLanguage() === "en" ? "en-US" : "zh-CN", {
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {})
  }).format(date);
}

function todayLabel() {
  return new Intl.DateTimeFormat(getLanguage() === "en" ? "en-US" : "zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short"
  }).format(new Date());
}

const GAMES = [
  {
    id: "prisoner",
    index: "01",
    title: "无声盟约",
    subtitle: "重复囚徒困境",
    symbol: "囚",
    glyph: "盟",
    tone: "forest",
    artColor: "#17372c",
    difficulty: 2,
    rounds: 8,
    minutes: 5,
    tags: ["合作演化", "重复博弈", "声誉"],
    description: "没有法官，也没有契约。你与一位陌生对手反复相遇，每次都能悄悄多拿一分。",
    longDescription: "八轮连续选择，让短期的诱惑与长期的关系互相拉扯。AI 会记住你的选择，也会用自己的方式回应。",
    rule: "双方同时选择「合作」或「背叛」。合作建立共同收益，背叛则在对手合作时获得更高单轮回报；八轮累计得分更高者获胜。",
    playerRole: "盟约者",
    opponentRole: "回声观察员"
  },
  {
    id: "ultimatum",
    index: "02",
    title: "分金谈判",
    subtitle: "最后通牒博弈",
    symbol: "金",
    glyph: "衡",
    tone: "sand",
    artColor: "#826635",
    difficulty: 2,
    rounds: 4,
    minutes: 4,
    tags: ["公平偏好", "议价", "角色互换"],
    description: "一笔金币，一次提案。对方可以说「不」，让两个人都拿不到一分。",
    longDescription: "你和 AI 轮流扮演提案者。看似理性的最低出价，未必能跨过对方心里的公平阈值。",
    rule: "每轮有 100 枚金币。提案者决定分配方案，回应者只能接受或拒绝；拒绝时双方都得到 0。四轮后累计收益高者获胜。",
    playerRole: "议价者",
    opponentRole: "守门人"
  },
  {
    id: "commons",
    index: "03",
    title: "共同绿洲",
    subtitle: "公共品博弈",
    symbol: "共",
    glyph: "泉",
    tone: "blue",
    artColor: "#315f69",
    difficulty: 3,
    rounds: 5,
    minutes: 6,
    tags: ["公共资源", "搭便车", "多人博弈"],
    description: "三个人守着一口会放大回报的井。每个人都想少投入，却都希望井水丰沛。",
    longDescription: "你与两位性格不同的 AI 代理人共同投资绿洲。每次投入都会放大后返还给三人，而保留私产永远安全。",
    rule: "每轮每人拥有 20 枚资源，可投入 0–20 枚。投入总和乘以 1.8 后由三人平分；未投入资源保留。五轮累计收益高者胜。",
    playerRole: "绿洲守井人",
    opponentRole: "两位共治者"
  },
  {
    id: "auction",
    index: "04",
    title: "暗标竞拍",
    subtitle: "第一价格密封拍卖",
    symbol: "竞",
    glyph: "槌",
    tone: "coral",
    artColor: "#9e4933",
    difficulty: 3,
    rounds: 5,
    minutes: 5,
    tags: ["私人估值", "出价策略", "信息不对称"],
    description: "你看得见藏品对自己的价值，却看不见对手愿意出多少。报高了亏损，报低了错过。",
    longDescription: "五件估值不断变化的藏品，五轮封闭出价。最了解对手，并不等于最了解自己该保留多少余地。",
    rule: "每轮你会得到一件藏品的私人估值。只有最高出价者获胜并支付自己的报价，收益为「估值 − 出价」；未获胜收益为 0。五轮累计高者胜。",
    playerRole: "独立藏家",
    opponentRole: "匿名竞拍者"
  },
  {
    id: "minority",
    index: "05",
    title: "少数派实验",
    subtitle: "连续少数派博弈",
    symbol: "众",
    glyph: "左",
    tone: "plum",
    artColor: "#50405b",
    difficulty: 4,
    rounds: 8,
    minutes: 5,
    tags: ["群体行为", "反身预测", "拥挤效应"],
    description: "五个人同时选边，站在少数一侧的人得分。当所有人都试图与众不同，答案会去哪里？",
    longDescription: "你和四位虚拟参与者连续猜边。每个人的上轮选择都会成为下一轮的公共信息，越熟悉规律，规律越容易失效。",
    rule: "每轮在「赤」与「蓝」之间选择。选择人数更少一侧的人获得 3 分，多数一侧得 0；平票双方各得 1。八轮累计得分高者胜。",
    playerRole: "实验参与者",
    opponentRole: "四人群体"
  },
  {
    id: "council",
    index: "06",
    title: "暗潮议会",
    subtitle: "隐藏阵营投票",
    symbol: "议",
    glyph: "潮",
    tone: "wine",
    artColor: "#563545",
    difficulty: 4,
    rounds: 5,
    minutes: 7,
    tags: ["隐藏阵营", "多数表决", "身份推理"],
    description: "五席议员，两股暗流。每一纸议案都只属于一个阵营，而公开表决会一点点暴露立场。",
    longDescription: "你被秘密分配到一个阵营，与四位议员共同决定五份议案的命运。议案通过时，受益阵营获得席位；最终席位更多的一侧胜出。",
    rule: "每轮公开表决「赞成」或「反对」，赞成票更多则议案通过。议案通过时受益阵营获得 10 席，被否决时另一阵营获得 10 席。五轮后席位较多的一方获胜，终局公开所有身份。",
    playerRole: "秘密议员",
    opponentRole: "四席议员"
  },
  {
    id: "wasteland",
    index: "07",
    title: "荒原夜袭",
    subtitle: "四人生存混战",
    symbol: "袭",
    glyph: "荒",
    tone: "rust",
    artColor: "#7b432d",
    difficulty: 3,
    rounds: 5,
    minutes: 6,
    tags: ["四人混战", "资源争夺", "同步行动"],
    description: "四支队伍争抢荒原最后的补给。采掘、劫掠或筑防，每个选择都在创造猎物，也在制造猎人。",
    longDescription: "你与三名独立领队同时行动。劫掠可以快速追上领先者，筑防则会让冒进者付出代价；五轮后能量最高者获胜。",
    rule: "每轮同步选择：采掘获得 4 能量；劫掠指定一人夺取 3 能量，但若目标筑防则你损失 2；筑防获得 1 能量并挡下针对你的劫掠。五轮后能量最高者胜。",
    playerRole: "荒原领队",
    opponentRole: "三名争夺者"
  },
  {
    id: "alliance",
    index: "08",
    title: "合纵棋局",
    subtitle: "四人结盟配对",
    symbol: "纵",
    glyph: "盟",
    tone: "indigo",
    artColor: "#354963",
    difficulty: 3,
    rounds: 7,
    minutes: 6,
    tags: ["联盟", "互惠", "多人选择"],
    description: "四名棋手各写下一个名字。只有彼此选中，盟约才会成立；一厢情愿则只能独自收场。",
    longDescription: "七轮隐秘缔约，你可以回报旧盟友，也可以突然转向。三名棋手各自判断彼此的关系，而每一条公开箭头都会改变下一轮。",
    rule: "每轮每位棋手秘密指定一名盟友。双方互选则结成盟约，各得 5 分；未结对者得 1 分。七轮后总分最高者获胜。",
    playerRole: "棋手",
    opponentRole: "三名棋手"
  },
  {
    id: "blitz",
    index: "09",
    title: "五域争衡",
    subtitle: "三方资源布阵",
    symbol: "域",
    glyph: "衡",
    tone: "steel",
    artColor: "#45544d",
    difficulty: 4,
    rounds: 3,
    minutes: 7,
    tags: ["资源分配", "三方对局", "零和竞争"],
    description: "有限的兵力，五处价值不同的边域。你无法守住一切，必须让对手猜不到你真正想要的地方。",
    longDescription: "三名统帅在每轮把全部兵力分配到五处边域。每处投入最多者赢得该域，但过度集中也可能让你失去其余战场。",
    rule: "每轮拥有固定兵力，必须全部分配到五处边域。每处兵力最多者获得该域声望 1–5 分，并列第一则无人得分。三轮后总分最高者胜。",
    playerRole: "边域统帅",
    opponentRole: "两名统帅"
  }
];

const GAME_BY_ID = Object.fromEntries(GAMES.map((game) => [game.id, game]));

const PRISONER_PERSONAS = [
  {
    type: "echo",
    name: "林回",
    glyph: "回",
    role: "镜像型观察者",
    traits: ["记忆型", "互惠偏好", "低噪声"],
    quote: "我会尊重你上一次的选择。"
  },
  {
    type: "garden",
    name: "顾衡",
    glyph: "衡",
    role: "长期主义园丁",
    traits: ["耐心", "宽容", "长期收益"],
    quote: "关系不是一轮结算，而是一片需要照料的地。"
  },
  {
    type: "fox",
    name: "祁先生",
    glyph: "祁",
    role: "机会主义猎手",
    traits: ["试探", "机会主义", "高风险"],
    quote: "善意很好，但我不介意看看它能走多远。"
  }
];

const NEGOTIATOR_PERSONAS = [
  {
    type: "fair",
    name: "唐禾",
    glyph: "禾",
    role: "公平守门人",
    traits: ["公平敏感", "愿意互惠", "讨厌轻视"],
    threshold: 34,
    generosity: 47,
    quote: "太少不是策略，是不尊重。"
  },
  {
    type: "pragmatic",
    name: "周策",
    glyph: "策",
    role: "务实议价者",
    traits: ["理性", "可说服", "看长期关系"],
    threshold: 24,
    generosity: 38,
    quote: "能成交的数字，才是真正的数字。"
  },
  {
    type: "proud",
    name: "闻先生",
    glyph: "闻",
    role: "尊严型谈判者",
    traits: ["高阈值", "重面子", "强硬"],
    threshold: 44,
    generosity: 52,
    quote: "我不需要用接受低价来证明自己理性。"
  }
];

const COMMONS_PERSONAS = [
  {
    type: "idealist",
    name: "阿岚",
    glyph: "岚",
    role: "理想主义共治者",
    traits: ["高贡献", "相信合作"],
    quote: "如果每个人都先退一步，井就真的会干。"
  },
  {
    type: "adaptive",
    name: "墨丘",
    glyph: "墨",
    role: "适应型共治者",
    traits: ["看历史", "中高贡献"],
    quote: "我先观察井水，再决定今天的份额。"
  },
  {
    type: "strategist",
    name: "砾石",
    glyph: "砾",
    role: "策略型共治者",
    traits: ["谨慎", "反搭便车"],
    quote: "共同体的边界，要看谁真的在意共同体。"
  },
  {
    type: "guarded",
    name: "辛夷",
    glyph: "辛",
    role: "防御型共治者",
    traits: ["低贡献", "风险厌恶"],
    quote: "先保住自己的水囊，再谈绿洲。"
  }
];

const AUCTION_PERSONAS = [
  {
    type: "collector",
    name: "黑匣藏家",
    glyph: "匣",
    role: "感性收藏家",
    traits: ["溢价倾向", "情绪出价"],
    aggression: 0.79,
    quote: "喜欢的东西，价格只是 footnote。"
  },
  {
    type: "dealer",
    name: "白手套",
    glyph: "白",
    role: "冷静经销商",
    traits: ["严格留利", "价格敏感"],
    aggression: 0.67,
    quote: "我不会替情绪付账。"
  },
  {
    type: "rival",
    name: "灰隼",
    glyph: "隼",
    role: "强势竞争者",
    traits: ["高攻击性", "追逐胜利"],
    aggression: 0.86,
    quote: "重要的不是买到，而是不让你买到。"
  }
];

const CROWD_PERSONAS = [
  { name: "小满", glyph: "满" },
  { name: "罗盘", glyph: "盘" },
  { name: "纸鸢", glyph: "鸢" },
  { name: "七号", glyph: "七" }
];

const COUNCIL_AGENTS = [
  {
    name: "洛因",
    glyph: "洛",
    team: "court",
    role: "曜庭枢记",
    traits: ["克制", "善于引导"],
    quote: "秩序从来不靠嗓门维持。"
  },
  {
    name: "白鸦",
    glyph: "鸦",
    team: "rebel",
    role: "灰盟信使",
    traits: ["锋利", "煽动者"],
    quote: "议案写得再漂亮，也要看谁被牺牲。"
  },
  {
    name: "枢机",
    glyph: "枢",
    team: "court",
    role: "王庭守誓者",
    traits: ["强硬", "制度派"],
    quote: "先守住秩序，再谈谁对谁错。"
  },
  {
    name: "岑夜",
    glyph: "岑",
    team: "rebel",
    role: "灰盟幕僚",
    traits: ["隐忍", "善于换位"],
    quote: "真正的立场，要看最后一票落在哪里。"
  }
];

const WASTELAND_AGENTS = [
  {
    name: "铁砂",
    glyph: "砂",
    type: "raider",
    role: "沙脊猎手",
    traits: ["侵略性", "追逐领先者"],
    quote: "补给不会自己走进帐篷。"
  },
  {
    name: "砂狐",
    glyph: "狐",
    type: "adaptive",
    role: "流沙斥候",
    traits: ["机敏", "看局势"],
    quote: "风向不对，就不该把帐篷扎在原地。"
  },
  {
    name: "牧鸦",
    glyph: "牧",
    type: "guardian",
    role: "废城守望者",
    traits: ["谨慎", "报复性筑防"],
    quote: "想拿走水囊的人，会先听见警钟。"
  }
];

const ALLIANCE_AGENTS = [
  {
    name: "青隼",
    glyph: "隼",
    type: "reciprocal",
    role: "青隼家主",
    traits: ["记旧情", "有来有往"],
    quote: "盟约不在于写得多长，而在于上一次有没有兑现。"
  },
  {
    name: "鹿角",
    glyph: "鹿",
    type: "builder",
    role: "鹿庭议使",
    traits: ["稳定联盟", "追求连续合作"],
    quote: "可靠的伙伴，比一时的最优选择更稀缺。"
  },
  {
    name: "黑曜",
    glyph: "曜",
    type: "switcher",
    role: "黑曜棋手",
    traits: ["机会主义", "观察关系"],
    quote: "阵营会变，收益不会。"
  }
];

const BLITZ_AGENTS = [
  {
    name: "铸城",
    glyph: "铸",
    type: "concentrate",
    role: "北境统帅",
    traits: ["集中兵力", "争高价值边域"],
    quote: "守住最贵的地方，其他土地便有了意义。"
  },
  {
    name: "千面",
    glyph: "千",
    type: "adaptive",
    role: "边境谋士",
    traits: ["均衡布阵", "快速调整"],
    quote: "看见我的重心时，下一轮的重心已经变了。"
  }
];

const AVATARS = ["策", "谋", "弈", "衡"];
const DEFAULT_STORE = {
  version: 1,
  profile: { name: "策略家", avatar: "策" },
  history: [],
  settings: { model: "deepseek-chat", baseUrl: "https://api.deepseek.com" }
};

function readStore() {
  try {
    const parsed = JSON.parse(localStorage.getItem("paradox-lab-store") || "null");
    if (!parsed || typeof parsed !== "object") return structuredClone(DEFAULT_STORE);
    return {
      ...structuredClone(DEFAULT_STORE),
      ...parsed,
      profile: { ...DEFAULT_STORE.profile, ...(parsed.profile || {}) },
      settings: { ...DEFAULT_STORE.settings, ...(parsed.settings || {}) },
      history: Array.isArray(parsed.history) ? parsed.history : []
    };
  } catch {
    return structuredClone(DEFAULT_STORE);
  }
}

let store = readStore();
let currentGame = null;
let activeFilter = "all";
let appLanguage = getLanguage();
let preserveFinishedGame = false;
let serverStatus = {
  serverConfigured: false,
  model: "deepseek-chat",
  endpoint: "https://api.deepseek.com"
};
let pendingAIRequests = 0;
let lastAIErrorAt = 0;

function saveStore() {
  localStorage.setItem("paradox-lab-store", JSON.stringify(store));
  updateChrome();
}

function sessionKey() {
  return sessionStorage.getItem("paradox-deepseek-key") || "";
}

function saveSessionKey(key) {
  if (key) sessionStorage.setItem("paradox-deepseek-key", key);
  else sessionStorage.removeItem("paradox-deepseek-key");
  updateChrome();
}

function aiAvailable() {
  return Boolean(serverStatus.serverConfigured || sessionKey());
}

function totalWins() {
  return store.history.filter((item) => item.outcome === "win").length;
}

function totalRecordSummary() {
  if (!store.history.length) return "尚无对局记录";
  return `${store.history.length} 局 · 胜率 ${Math.round((totalWins() / store.history.length) * 100)}%`;
}

function updateChrome() {
  const profileAvatar = $("#profile-avatar");
  const profileName = $("#profile-name");
  if (profileAvatar) profileAvatar.textContent = store.profile.avatar;
  if (profileName) profileName.textContent = store.profile.name;
  if ($("#profile-record")) $("#profile-record").textContent = totalRecordSummary();
  if ($("#rail-profile-hint")) {
    $("#rail-profile-hint").textContent = store.history.length
      ? `已沉淀 ${store.history.length} 次选择`
      : "完成一局后生成";
  }

  const online = aiAvailable();
  const statusChip = $("#ai-status-chip");
  if (statusChip) statusChip.classList.toggle("is-online", online);
  if ($("#ai-status-label")) {
    $("#ai-status-label").textContent = pendingAIRequests
      ? "DeepSeek 思考中"
      : online
        ? "DeepSeek 在线"
        : "本地策略";
  }
  if ($("#rail-ai-title")) {
    $("#rail-ai-title").textContent = online ? "DeepSeek 思考引擎" : "本地策略运行中";
  }
  if ($("#rail-ai-desc")) {
    $("#rail-ai-desc").textContent = online
      ? `${serverStatus.model || store.settings.model} · 实时角色决策`
      : "连接 DeepSeek 解锁角色思考";
  }
  translateDOM(document);
}

function updateDate() {
  const node = $("#today-label");
  if (node) node.textContent = todayLabel();
}

function setRouteActive(route) {
  const normalized = route.startsWith("game/") ? "arena" : route;
  $$("[data-route]").forEach((node) => {
    node.classList.toggle("active", node.dataset.route === normalized.split("?")[0]);
  });
}

function setContext(text) {
  const node = $("#page-context");
  if (node) node.textContent = text;
}

function navigate(route) {
  if (location.hash === `#${route}`) renderRoute();
  else location.hash = route;
}

function routeName() {
  return location.hash.replace(/^#\/?/, "") || "home";
}

function pageWrap(content) {
  return `<div class="page-enter">${content}</div>`;
}

function metric(label, value, unit, iconName) {
  return `
    <div class="metric">
      <span class="metric-icon">${icon(iconName)}</span>
      <span class="metric-copy">
        <span class="metric-label">${label}</span>
        <span class="metric-value">${value}<small>${unit}</small></span>
      </span>
    </div>`;
}

function difficultyMarkup(level) {
  return `<span class="difficulty-bars" aria-label="难度 ${level} 级">${[1, 2, 3, 4]
    .map((item) => `<i class="${item <= level ? "on" : ""}"></i>`)
    .join("")}</span>`;
}

function gameCard(originalGame) {
  const game = localizeGame(originalGame);
  const opponentGlyph =
    game.opponentGlyph ||
    (game.id === "commons"
      ? "岚"
      : game.id === "minority"
        ? "四"
        : game.id === "council"
          ? "议"
          : game.id === "wasteland"
            ? "荒"
            : game.id === "alliance"
              ? "纵"
              : game.id === "blitz"
                ? "域"
                : game.glyph);
  return `
    <article class="game-card" data-tone="${game.tone}" data-open-game="${game.id}" tabindex="0" role="button" aria-label="游玩${game.title}">
      <div class="game-card-top">
        <span class="game-index">NO. ${game.index}</span>
        <span class="game-card-tag">${game.opponentRole}</span>
      </div>
      <div class="game-art" aria-hidden="true">
          <span class="art-label">${game.subtitle.toUpperCase()}</span>
        <div class="art-core">
          <span class="art-node accent">${game.symbol}</span>
          <span class="art-link"></span>
          <span class="art-node">${opponentGlyph}</span>
        </div>
      </div>
      <div class="game-card-body">
        <div class="game-title-row">
          <h3>${game.title}</h3>
          <span class="game-arrow">${icon("arrow-up-right")}</span>
        </div>
        <p>${game.description}</p>
        <div class="game-card-meta">
          <span class="game-meta-group">
            <span class="mini-avatars">
              <span class="mini-avatar">${store.profile.avatar}</span>
              <span class="mini-avatar">${opponentGlyph}</span>
            </span>
            ${game.rounds} 轮 · ${game.minutes} 分钟
          </span>
          <span class="game-meta-group">难度 ${difficultyMarkup(game.difficulty)}</span>
        </div>
      </div>
    </article>`;
}

function renderHome() {
  setRouteActive("home");
  setContext("观察室 · 今日开放");
  const winRate = store.history.length ? Math.round((totalWins() / store.history.length) * 100) : 0;

  const featured = GAMES[new Date().getDate() % GAMES.length];
  $("#app").innerHTML = pageWrap(`
    <section class="home-hero">
      <div class="hero-copy">
        <span class="kicker">${appLanguage === "en" ? "PLAY THE INCENTIVE · READ THE CHOICE" : "PLAY THE INCENTIVE · 看懂选择"}</span>
        <h1>${appLanguage === "en" ? 'Read the<br /><em>game</em>.' : "在规则里，<br />读懂<em>选择</em>。"}</h1>
        <p class="hero-description">${GAMES.length} 种规则，9 个独立博弈场。观察、下注、结盟，然后改写结局。</p>
        <div class="hero-actions">
          <button class="button button-primary" data-open-game="${featured.id}" type="button">
            ${icon("play")} 开始今日博弈
          </button>
          <button class="button button-secondary" data-route="arena" type="button">
            浏览全部玩法 ${icon("arrow-right")}
          </button>
        </div>
      </div>
      <div class="hero-visual" aria-label="博弈关系示意">
        <div class="hero-visual-head">
          <span>DECISION FIELD / 01</span>
          <span class="hero-visual-badge">${aiAvailable() ? "DEEPSEEK READY" : "LOCAL INTEL"}</span>
        </div>
        <div class="decision-orbit" aria-hidden="true">
          <i class="ring"></i><i class="ring"></i><i class="ring"></i>
          <span class="orbit-center">?</span>
          <span class="orbit-node node-a">合</span>
          <span class="orbit-node node-b">信</span>
          <span class="orbit-node node-c">衡</span>
          <span class="orbit-node node-d">争</span>
        </div>
        <div class="hero-caption">
          <p>今日推荐</p>
          <strong>${localizeGame(featured).title}</strong>
        </div>
      </div>
    </section>

    <section class="home-metrics" aria-label="对局统计">
      ${metric("累计对局", store.history.length, "局", "target")}
      ${metric("观察胜率", winRate, "%", "trophy")}
      ${metric("累计得分", store.history.reduce((sum, item) => sum + Number(item.score || 0), 0), "分", "chart")}
      ${metric("思考引擎", aiAvailable() ? "DeepSeek" : "本地策略", aiAvailable() ? "实时在线" : "无需联网", "brain")}
    </section>

    <section class="section-block">
      <div class="section-heading">
        <div class="heading-copy">
          <span class="eyebrow">THE GAME COLLECTION</span>
          <h2>选择你的博弈场</h2>
        </div>
        <button class="text-link" data-route="arena" type="button">查看全部 ${icon("arrow-up-right")}</button>
      </div>
      <div class="game-grid">${GAMES.map(gameCard).join("")}</div>
    </section>
  `);
  hydrateIcons($("#app"));
}

function renderArena() {
  setRouteActive("arena");
  setContext(`博弈场 · ${GAMES.length} 种规则`);
  $("#app").innerHTML = pageWrap(`
    <header class="page-title-row">
      <div class="page-title-copy">
        <span class="kicker">THE ARENA</span>
        <h1>选择一场博弈。</h1>
      </div>
      <div class="arena-filter" role="tablist" aria-label="按类型筛选">
        ${[
          ["all", "全部"],
          ["cooperation", "合作"],
          ["negotiation", "议价"],
          ["information", "信息"],
          ["multiplayer", "多人"]
        ]
          .map(
            ([value, label]) =>
              `<button class="filter-button ${activeFilter === value ? "active" : ""}" data-filter="${value}" type="button">${label}</button>`
          )
          .join("")}
      </div>
    </header>
    <div class="arena-grid">${GAMES.map(arenaCard).join("")}</div>
  `);
  applyArenaFilter();
  hydrateIcons($("#app"));
}

function arenaCard(originalGame) {
  const game = localizeGame(originalGame);
  return `
    <article class="arena-card" data-game-category="${arenaCategory(game.id)}" data-open-game="${game.id}" tabindex="0" role="button" aria-label="游玩${game.title}">
      <div class="arena-card-art" style="--card-bg:${game.artColor}">
        <span class="arena-card-index">NO. ${game.index}</span>
        <span class="arena-card-glyph">${game.glyph}</span>
        <small>${game.subtitle.toUpperCase()}</small>
      </div>
      <div class="arena-card-body">
        <span class="eyebrow">${game.opponentRole}</span>
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <div class="arena-card-foot">
          <div class="tag-row">${game.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          <button class="game-arrow" data-open-game="${game.id}" aria-label="进入${game.title}" type="button">${icon("arrow-up-right")}</button>
        </div>
      </div>
    </article>`;
}

function arenaCategory(gameId) {
  if (["prisoner", "commons"].includes(gameId)) return "cooperation";
  if (gameId === "ultimatum") return "negotiation";
  if (["council", "wasteland", "alliance", "blitz"].includes(gameId)) return "multiplayer";
  return "information";
}

function applyArenaFilter() {
  $$(".arena-card").forEach((card) => {
    card.classList.toggle(
      "hidden",
      activeFilter !== "all" && card.dataset.gameCategory !== activeFilter
    );
  });
}

function aggregateProfile() {
  const base = { cooperation: 50, risk: 50, trust: 50, adaptation: 50 };
  if (!store.history.length) return base;
  const sums = { ...base };
  store.history.forEach((item) => {
    const metrics = item.metrics || {};
    ["cooperation", "risk", "trust", "adaptation"].forEach((key) => {
      if (Number.isFinite(Number(metrics[key]))) sums[key] += Number(metrics[key]);
    });
  });
  return Object.fromEntries(
    Object.entries(sums).map(([key, value]) => [
      key,
      clamp(Math.round(value / (store.history.length + 1)), 5, 95)
    ])
  );
}

function radarMarkup(profile) {
  const center = 110;
  const radius = 76;
  const axes = [
    { key: "cooperation", label: "合作意愿", angle: -90 },
    { key: "risk", label: "冒险程度", angle: 0 },
    { key: "adaptation", label: "适应速度", angle: 90 },
    { key: "trust", label: "信任水平", angle: 180 }
  ];
  const point = (angle, value) => {
    const rad = (angle * Math.PI) / 180;
    const scale = (value / 100) * radius;
    return [center + Math.cos(rad) * scale, center + Math.sin(rad) * scale];
  };
  const gridPolys = [0.33, 0.66, 1]
    .map((scale) => {
      const points = axes
        .map((axis) => {
          const rad = (axis.angle * Math.PI) / 180;
          return `${center + Math.cos(rad) * radius * scale},${center + Math.sin(rad) * radius * scale}`;
        })
        .join(" ");
      return `<polygon points="${points}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
    })
    .join("");
  const axisLines = axes
    .map((axis) => {
      const [x, y] = point(axis.angle, 100);
      return `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,.1)"/>`;
    })
    .join("");
  const shape = axes.map((axis) => point(axis.angle, profile[axis.key]).join(",")).join(" ");
  return `
    <div class="radar-wrap">
      <svg viewBox="0 0 220 220" aria-label="决策画像雷达图">
        ${gridPolys}${axisLines}
        <polygon points="${shape}" fill="rgba(217,229,138,.28)" stroke="#d9e58a" stroke-width="2"/>
        ${axes
          .map((axis) => {
            const [x, y] = point(axis.angle, profile[axis.key]);
            return `<circle cx="${x}" cy="${y}" r="3.5" fill="#d9e58a" stroke="#17372c" stroke-width="2"/>`;
          })
          .join("")}
      </svg>
      <span class="radar-label top">合作</span>
      <span class="radar-label right">冒险</span>
      <span class="radar-label bottom">适应</span>
      <span class="radar-label left">信任</span>
    </div>`;
}

function renderHistory() {
  setRouteActive("history");
  setContext("对局档案 · 本地留存");
  const wins = totalWins();
  const losses = store.history.filter((item) => item.outcome === "loss").length;
  const averageScore = store.history.length
    ? (
        store.history.reduce((sum, item) => sum + Number(item.score || 0), 0) /
        store.history.length
      ).toFixed(1)
    : "0";

  $("#app").innerHTML = pageWrap(`
    <header class="page-title-row">
      <div class="page-title-copy">
        <span class="kicker">ARCHIVE · 可回看的决定</span>
        <h1>对局档案</h1>
      </div>
      <button class="button button-secondary" data-action="open-insights" type="button">${icon("brain")} 查看决策画像</button>
    </header>
    <section class="archive-summary">
      <div class="archive-metric"><small>累计对局</small><strong>${store.history.length}</strong></div>
      <div class="archive-metric"><small>胜利 / 惜败</small><strong>${wins} / ${losses}</strong></div>
      <div class="archive-metric"><small>平均得分</small><strong>${averageScore}</strong></div>
      <div class="archive-metric"><small>思考引擎</small><strong style="font-size:17px">${aiAvailable() ? "DeepSeek" : "本地策略"}</strong></div>
    </section>
    ${
      store.history.length
        ? `<div class="history-list">${store.history
            .map((item) => {
              const game = localizeGame(GAME_BY_ID[item.gameId] || GAMES[0]);
              return `
                <div class="history-row">
                  <span class="history-icon">${game.symbol}</span>
                  <span class="history-main">
                    <strong>${game.title} · ${game.subtitle}</strong>
                    <small>${formatDate(item.playedAt)} · ${item.rounds} 轮 · ${item.mode === "deepseek" ? "DeepSeek" : "本地策略"}</small>
                  </span>
                  <span class="history-cell">对手<small>${escapeHTML(item.opponent)}</small></span>
                  <span class="history-cell">比分<small>${formatNumber(item.score)} : ${formatNumber(item.opponentScore)}</small></span>
                  <span class="outcome ${item.outcome}">${item.outcome === "win" ? "胜出" : item.outcome === "loss" ? "惜败" : "平局"}</span>
                </div>`;
            })
            .join("")}</div>`
        : `<div class="empty-state">
            <span class="empty-state-art">∅</span>
            <h3>档案仍是空白</h3>
            <p>选择一场博弈，留下第一份可供观察的决策记录。无需配置 API Key 也能完整游玩。</p>
            <button class="button button-primary" data-route="arena" type="button">${icon("swords")} 进入博弈场</button>
          </div>`
    }
  `);
  hydrateIcons($("#app"));
}

function shuffled(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function baseGame(gameId) {
  const meta = GAME_BY_ID[gameId];
  return {
    gameId,
    meta,
    round: 1,
    totalRounds: meta.rounds,
    playerScore: 0,
    aiScore: 0,
    aiScores: [],
    history: [],
    roundData: {},
    status: "choosing",
    busy: false,
    recorded: false,
    usedDeepSeek: false,
    opponent: {},
    startedAt: new Date().toISOString()
  };
}

function createGame(gameId) {
  const game = baseGame(gameId);
  if (gameId === "prisoner") {
    game.opponent = structuredClone(pick(PRISONER_PERSONAS));
  } else if (gameId === "ultimatum") {
    game.opponent = structuredClone(pick(NEGOTIATOR_PERSONAS));
  } else if (gameId === "commons") {
    game.opponents = shuffled(COMMONS_PERSONAS)
      .slice(0, 2)
      .map((persona) => ({ ...structuredClone(persona), score: 0 }));
    game.opponent = {
      name: game.opponents.map((item) => item.name).join(" · "),
      glyph: "泉",
      role: "两位共治者",
      traits: game.opponents.flatMap((item) => item.traits).slice(0, 4),
      quote: game.opponents[0].quote
    };
    game.roundData = { contribution: 10 };
  } else if (gameId === "auction") {
    game.opponent = structuredClone(pick(AUCTION_PERSONAS));
    game.values = Array.from({ length: game.totalRounds }, () => randomBetween(72, 126));
    game.aiValues = Array.from({ length: game.totalRounds }, () => randomBetween(68, 130));
    game.bid = Math.round(game.values[0] * 0.72);
    game.roundData = { bid: game.bid };
  } else if (gameId === "minority") {
    game.opponent = {
      name: "四人群体",
      glyph: "众",
      role: "互相猜测的参与者",
      traits: ["反身预测", "拥挤效应", "四名个体"],
      quote: "每个人都想成为少数，于是多数就换了方向。"
    };
    game.crowd = CROWD_PERSONAS.map((persona, index) => ({
      ...persona,
      index,
      score: 0,
      lastChoice: index % 2 ? "blue" : "red"
    }));
  } else if (gameId === "council") {
    game.playerFaction = Math.random() < 0.5 ? "court" : "rebel";
    game.factions = {
      court: { name: "曜庭", glyph: "曜", score: 0 },
      rebel: { name: "灰盟", glyph: "灰", score: 0 }
    };
    game.agents = COUNCIL_AGENTS.map((agent) => ({ ...structuredClone(agent) }));
    const favorPlan = shuffled(["court", "court", "rebel", "rebel", "court"]);
    const bills = {
      court: [
        ["王城税契", "延长王庭特许税权，以换取边城驻军。"],
        ["旧律复行", "恢复旧贵族议事席位，削弱临时议会。"],
        ["金印征召", "将地方粮仓交由王庭统一调度。"]
      ],
      rebel: [
        ["盐路公契", "开放盐路给自治商团，削减王庭过境税。"],
        ["灰旗赦令", "赦免参与边城起义的守军与工匠。"],
        ["地契分授", "把荒废庄园分给长期耕作的无地农户。"]
      ]
    };
    game.bills = favorPlan.map((favor, index) => {
      const bill = bills[favor][index % 3];
      return { favor, title: bill[0], description: bill[1], number: index + 1 };
    });
    game.opponent = {
      name: "四席议员",
      glyph: "议",
      role: "身份未知的共谋者",
      traits: ["隐藏阵营", "多数表决", "身份推理"],
      quote: "今天坐在你身边的人，未必明天仍与你同席。"
    };
  } else if (gameId === "wasteland") {
    game.agents = WASTELAND_AGENTS.map((agent, index) => ({
      ...structuredClone(agent),
      id: `agent${index}`,
      energy: 12
    }));
    game.playerEnergy = 12;
    game.opponent = {
      name: "三名争夺者",
      glyph: "荒",
      role: "各自为战的领队",
      traits: ["四人混战", "资源争夺", "同步行动"],
      quote: "荒原不奖励最谨慎的人，也不奖励最贪心的人。"
    };
    game.roundData = { action: "gather", target: "agent0" };
  } else if (gameId === "alliance") {
    game.agents = ALLIANCE_AGENTS.map((agent, index) => ({
      ...structuredClone(agent),
      id: `agent${index}`,
      score: 0,
      lastPartner: index === 0 ? "player" : `agent${Math.max(0, index - 1)}`
    }));
    game.opponent = {
      name: "三名棋手",
      glyph: "纵",
      role: "各怀权衡的缔约者",
      traits: ["互惠", "联盟", "关系记忆"],
      quote: "被选中是一种邀请，彼此选中才是一份盟约。"
    };
    game.roundData = { target: "agent0" };
  } else if (gameId === "blitz") {
    game.agents = BLITZ_AGENTS.map((agent, index) => ({
      ...structuredClone(agent),
      id: `agent${index}`,
      score: 0
    }));
    game.budgets = [9, 11, 13];
    game.roundData = { allocation: balancedAllocation(game.budgets[0]) };
    game.opponent = {
      name: "两名统帅",
      glyph: "域",
      role: "同步布阵的对手",
      traits: ["资源分配", "三方零和", "同时行动"],
      quote: "所有边域都想守住，等于没有真正的重心。"
    };
  }
  return game;
}

function balancedAllocation(budget) {
  const allocation = [0, 0, 0, 0, 0];
  const priority = [2, 3, 1, 4, 0];
  for (let index = 0; index < budget; index += 1) {
    allocation[priority[index % priority.length]] += 1;
  }
  return allocation;
}

async function callAI(system, prompt) {
  pendingAIRequests += 1;
  updateChrome();
  try {
    const languageInstruction =
      appLanguage === "en"
        ? " All human-readable quote, message, and explanation fields must be written in natural English."
        : "";
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: `${system}${languageInstruction}`,
        prompt,
        apiKey: sessionKey() || undefined,
        model: store.settings.model || serverStatus.model || "deepseek-chat",
        baseUrl: store.settings.baseUrl || serverStatus.endpoint
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      throw new Error(data.message || `AI 请求失败（${response.status}）`);
    }
    return data.parsed;
  } finally {
    pendingAIRequests = Math.max(0, pendingAIRequests - 1);
    updateChrome();
  }
}

async function tryAI(game, system, prompt) {
  if (!aiAvailable()) return null;
  try {
    const result = await callAI(system, prompt);
    if (!result || typeof result !== "object") throw new Error("模型没有返回可用的结构化结果");
    game.usedDeepSeek = true;
    return result;
  } catch (error) {
    const now = Date.now();
    if (now - lastAIErrorAt > 8000) {
      toast(`${error.message} 已切换为本地策略。`, "error");
      lastAIErrorAt = now;
    }
    return null;
  }
}

function decisionTheatre(promise) {
  return Promise.all([promise, wait(randomBetween(380, 620))]).then(([result]) => result);
}

function opponentDisplayName(game) {
  if (game.gameId === "commons") return "两位共治者";
  if (game.gameId === "minority") return "四人群体";
  return game.opponent.name;
}

function averageOpponentScore(game) {
  if (game.gameId === "commons" && game.opponents) {
    return game.opponents.reduce((sum, item) => sum + item.score, 0) / game.opponents.length;
  }
  return game.aiScore;
}

function outcomeFor(game) {
  const opponent = averageOpponentScore(game);
  if (game.playerScore > opponent) return "win";
  if (game.playerScore < opponent) return "loss";
  return "draw";
}

function recordGame(game) {
  if (game.recorded) return;
  game.recorded = true;
  const opponentScore = Number(averageOpponentScore(game).toFixed(1));
  const record = {
    id: `${Date.now()}-${game.gameId}`,
    gameId: game.gameId,
    opponent: opponentDisplayName(game),
    score: Number(game.playerScore.toFixed(1)),
    opponentScore,
    outcome: outcomeFor(game),
    rounds: game.totalRounds,
    playedAt: new Date().toISOString(),
    mode: game.usedDeepSeek ? "deepseek" : "local",
    metrics: buildGameMetrics(game)
  };
  store.history.unshift(record);
  store.history = store.history.slice(0, 100);
  saveStore();
}

function buildGameMetrics(game) {
  if (game.gameId === "prisoner") {
    const cooperations = game.history.filter((item) => item.playerAction === "cooperate").length;
    const afterBetrayal = game.history.filter(
      (item, index) =>
        index > 0 &&
        game.history[index - 1].aiAction === "defect" &&
        item.playerAction === "cooperate"
    ).length;
    const betrayals = game.history.length - cooperations;
    return {
      cooperation: Math.round((cooperations / Math.max(1, game.history.length)) * 100),
      risk: Math.round((betrayals / Math.max(1, game.history.length)) * 100),
      trust: Math.round(45 + afterBetrayal * 9),
      adaptation: Math.round(
        45 + game.history.slice(1).filter((item, index) => item.playerAction !== game.history[index].playerAction).length * 7
      )
    };
  }
  if (game.gameId === "ultimatum") {
    const offers = game.history.filter((item) => item.playerRole === "proposer");
    const responded = game.history.filter((item) => item.playerRole === "responder");
    const accepted = responded.filter((item) => item.playerAccepted).length;
    return {
      cooperation: 55,
      risk: Math.round(100 - offers.reduce((sum, item) => sum + item.offer, 0) / Math.max(1, offers.length)),
      trust: Math.round(35 + accepted * 18),
      adaptation: Math.round(45 + responded.length * 9)
    };
  }
  if (game.gameId === "commons") {
    const average =
      game.history.reduce((sum, item) => sum + item.contributions[0], 0) /
      Math.max(1, game.history.length);
    return {
      cooperation: Math.round((average / 20) * 100),
      risk: 38,
      trust: Math.round(45 + (average - 10) * 3),
      adaptation: 52
    };
  }
  if (game.gameId === "auction") {
    const ratios = game.history.map((item) => item.playerBid / item.playerValue);
    const averageRatio = ratios.reduce((sum, value) => sum + value, 0) / Math.max(1, ratios.length);
    return {
      cooperation: 48,
      risk: Math.round(averageRatio * 100),
      trust: 42,
      adaptation: Math.round(45 + game.history.filter((item) => item.winner === "player").length * 6)
    };
  }
  if (game.gameId === "minority") {
    const wins = game.history.filter((item) => item.playerMinority).length;
    return {
      cooperation: 42,
      risk: 62,
      trust: 48,
      adaptation: Math.round(35 + (wins / Math.max(1, game.history.length)) * 60)
    };
  }
  if (game.gameId === "council") {
    const own = game.factions[game.playerFaction];
    const rival = game.factions[game.playerFaction === "court" ? "rebel" : "court"];
    const against = game.history.filter((item) => item.passed !== (item.playerVote === "yes")).length;
    return {
      cooperation: game.playerFaction === "court" ? 62 : 50,
      risk: Math.round((against / Math.max(1, game.history.length)) * 100),
      trust: Math.round(40 + (own.score / Math.max(1, own.score + rival.score)) * 55),
      adaptation: Math.round(35 + game.history.filter((item, index) => index > 0 && item.playerVote !== game.history[index - 1].playerVote).length * 10)
    };
  }
  if (game.gameId === "wasteland") {
    const raids = game.history.filter((item) => item.playerAction === "raid").length;
    const guards = game.history.filter((item) => item.playerAction === "fortify").length;
    return {
      cooperation: Math.round(65 - (raids / Math.max(1, game.history.length)) * 45),
      risk: Math.round((raids / Math.max(1, game.history.length)) * 100),
      trust: Math.round(55 - raids * 5 + guards * 3),
      adaptation: Math.round(35 + game.history.filter((item, index) => index > 0 && item.playerAction !== game.history[index - 1].playerAction).length * 8)
    };
  }
  if (game.gameId === "alliance") {
    const pacts = game.history.filter((item) => item.playerPact).length;
    return {
      cooperation: Math.round(40 + (pacts / Math.max(1, game.history.length)) * 55),
      risk: Math.round(25 + game.history.filter((item, index) => index > 0 && item.playerTarget !== game.history[index - 1].playerTarget).length * 9),
      trust: Math.round(35 + (pacts / Math.max(1, game.history.length)) * 60),
      adaptation: Math.round(35 + game.history.filter((item, index) => index > 0 && item.playerTarget !== game.history[index - 1].playerTarget).length * 8)
    };
  }
  const maxShare = Math.max(
    ...game.history.flatMap((item) => item.playerAllocation.map((value) => value / item.budget))
  );
  return {
    cooperation: 47,
    risk: Math.round(maxShare * 100),
    trust: 40,
    adaptation: Math.round(38 + game.history.filter((item) => item.playerPoints > 7).length * 13)
  };
}

function finishGame(game) {
  game.status = "finished";
  recordGame(game);
  updateGameRoom();
}

function ensureGame(gameId) {
  if (
    !currentGame ||
    currentGame.gameId !== gameId ||
    (currentGame.status === "finished" && routeName().startsWith("game/") && !preserveFinishedGame)
  ) {
    currentGame = createGame(gameId);
  }
  return currentGame;
}

function renderGame(gameId) {
  const game = ensureGame(gameId);
  setRouteActive(`game/${gameId}`);
  setContext(`博弈场 · ${localizeGame(game.meta).title}`);
  const meta = localizeGame(game.meta);
  $("#app").innerHTML = pageWrap(`
    <div class="game-page">
      <div class="game-topline">
        <button class="back-link" data-route="arena" type="button">${icon("arrow-left")} 返回博弈场</button>
        <div class="round-indicator" id="round-indicator"></div>
      </div>
      <header class="game-heading">
        <div class="game-heading-copy">
          <span class="game-emblem">${meta.glyph}</span>
          <div>
            <h1>${meta.title}</h1>
            <p>${meta.subtitle}</p>
          </div>
        </div>
        <div class="game-heading-actions">
          <button class="button button-secondary button-small" data-game-action="restart" type="button">${icon("refresh")} 重新开局</button>
        </div>
      </header>
      <div class="game-layout">
        <div class="game-main-column">
          <div id="game-stage"></div>
        </div>
        <aside class="game-side-column">
          <div id="opponent-dynamic"></div>
          <div id="score-dynamic"></div>
          <details class="rules-card">
            <summary>博弈规则与收益</summary>
            <div class="rules-copy">
              <p>${meta.rule}</p>
              ${miniPayoffMarkup(gameId)}
            </div>
          </details>
        </aside>
      </div>
    </div>
  `);
  updateGameRoom();
  hydrateIcons($("#app"));

  if (game.gameId === "ultimatum" && game.round % 2 === 0 && game.status === "awaiting_ai") {
    startUltimatumAIRound(game);
  }
}

function updateGameRoom() {
  if (!currentGame) return;
  const game = currentGame;
  const roundNode = $("#round-indicator");
  if (roundNode) {
    roundNode.innerHTML = `
      <span>ROUND ${String(game.round).padStart(2, "0")} / ${String(game.totalRounds).padStart(2, "0")}</span>
      <span class="round-dots">${Array.from({ length: game.totalRounds }, (_, index) => {
        const round = index + 1;
        const className = game.status === "finished" || round < game.round ? "done" : round === game.round ? "current" : "";
        return `<i class="round-dot ${className}"></i>`;
      }).join("")}</span>`;
  }

  const stageNode = $("#game-stage");
  if (stageNode) stageNode.innerHTML = stageMarkup(game);
  const opponentNode = $("#opponent-dynamic");
  if (opponentNode) opponentNode.innerHTML = opponentCardMarkup(game);
  const scoreNode = $("#score-dynamic");
  if (scoreNode) scoreNode.innerHTML = sideScoreMarkup(game);

  hydrateIcons(stageNode || document);
  hydrateIcons(opponentNode || document);
  hydrateIcons(scoreNode || document);
}

function stageFrame(game, content, brief) {
  const headerLabel =
    game.status === "finished"
      ? "对局已结束"
      : game.status === "resolved"
        ? "本轮结果"
        : game.status === "ai_offer"
          ? "等待你的回应"
          : "你的决策";
  return `
    <section class="stage-panel">
      <header class="stage-header">
        <div class="stage-header-copy">
          <strong>${headerLabel}</strong>
          <span class="stage-round">ROUND ${String(game.round).padStart(2, "0")}</span>
        </div>
        <span class="thinking-indicator ${game.status === "thinking" ? "visible" : ""}">
          ${game.status === "thinking" ? "对手正在思考" : ""}
          <span><i></i><i></i><i></i></span>
        </span>
      </header>
      <div class="stage-body">
        ${content}
      </div>
    </section>`;
}

function stageMarkup(game) {
  if (game.status === "finished") return stageFrame(game, resultMarkup(game), "");
  const renderers = {
    prisoner: prisonerStage,
    ultimatum: ultimatumStage,
    commons: commonsStage,
    auction: auctionStage,
    minority: minorityStage,
    council: councilStage,
    wasteland: wastelandStage,
    alliance: allianceStage,
    blitz: blitzStage
  };
  return renderers[game.gameId](game);
}

function opponentCardMarkup(game) {
  const opponent = game.opponent;
  const quote =
    game.roundData?.aiQuote ||
    game.lastAiQuote ||
    opponent.quote ||
    "我会根据你的选择，重新判断下一轮。";
  return `
    <article class="info-card dark">
      <div class="info-card-head">
        <span class="tiny-label">YOUR OPPONENT</span>
        <span class="tiny-label">${aiAvailable() ? "DEEPSEEK" : "LOCAL"}</span>
      </div>
      <div class="opponent-profile">
        <span class="opponent-avatar">${opponent.glyph || "对"}</span>
        <span class="opponent-meta">
          <strong>${escapeHTML(opponent.name || "对手")}</strong>
          <small>${escapeHTML(opponent.role || "策略角色")}</small>
        </span>
      </div>
      <p class="opponent-quote">“${escapeHTML(quote)}”</p>
      <div class="trait-list">
        ${(opponent.traits || []).map((trait) => `<span class="trait">${escapeHTML(trait)}</span>`).join("")}
      </div>
    </article>`;
}

function sideScoreMarkup(game) {
  const opponentScore = averageOpponentScore(game);
  const scoreDelta = game.playerScore - opponentScore;
  const values = game.history.map((item) => Number(item.playerPoints || 0));
  const opponentLabel =
    game.gameId === "commons"
      ? "对手均值"
      : game.gameId === "council"
        ? "另一阵营"
        : ["wasteland", "alliance", "blitz"].includes(game.gameId)
          ? "最强对手"
          : "对手累计";
  return `
    <div class="side-score">
      <div class="side-score-cell">
        <small>你的累计</small>
        <strong>${formatNumber(game.playerScore)}<small>分</small></strong>
      </div>
      <div class="side-score-cell">
        <small>${opponentLabel}</small>
        <strong>${formatNumber(opponentScore)}<small>分</small></strong>
      </div>
      <div class="side-score-cell" style="grid-column:1/-1">
        <small>当前差势</small>
        <strong style="font-size:16px;color:${scoreDelta >= 0 ? "#4e8056" : "#c65d42"}">${scoreDelta >= 0 ? "+" : ""}${formatNumber(scoreDelta)}</strong>
        <div class="mini-history">${Array.from({ length: Math.max(5, values.length) }, (_, index) => {
          const value = values[index];
          if (value === undefined) return `<span class="mini-history-bar" style="height:8px"></span>`;
          const max = Math.max(...values.map((item) => Math.abs(item)), 1);
          return `<span class="mini-history-bar ${value >= 0 ? "positive" : "negative"}" style="height:${Math.max(7, (Math.abs(value) / max) * 38)}px" title="第 ${index + 1} 轮：${value}"></span>`;
        }).join("")}</div>
      </div>
    </div>`;
}

function reflectionMarkup(game) {
  const last = game.history.at(-1);
  if (!last) {
    const hints = {
      prisoner: "这不是一锤定音的游戏。对手会把你上一轮的选择带进下一轮。",
      ultimatum: "公平不是唯一的理性边界。留出一点空间，往往比精确压榨更容易达成协议。",
      commons: "公共收益取决于所有人，但每个人只为自己决定投入。",
      auction: "第一价格拍卖里，获胜不等于获利。关键是给估值留下足够的安全边际。",
      minority: "如果一条规律被所有人看见，它下一轮就可能反过来。",
      council: "身份隐藏时，每一票都不只是决定议案，也在暴露自己。",
      wasteland: "混战中没有固定的敌人。领先者会吸引更多袭击，暴露的补给也会。",
      alliance: "互选才能成盟。关系越稳定，越容易被别人预判和利用。",
      blitz: "你无法在每个战场都取胜。真正的布阵，是让对手把兵力放错地方。"
    };
    return `<article class="reflection-panel">
      <h3>${icon("spark")} 本局观察</h3>
      <p>${hints[game.gameId]}</p>
      <div class="reflection-stat"><span>当前轮次</span><strong>${game.round}/${game.totalRounds}</strong></div>
    </article>`;
  }
  let observation = "";
  if (game.gameId === "prisoner") {
    observation =
      last.playerAction === last.aiAction
        ? "这一轮双方采取了相同动作。对称选择通常会给关系带来更清晰的下一步。"
        : "这一轮双方动作错位。单次占优不代表长期占优，对手会记住这种错位。";
  } else if (game.gameId === "ultimatum") {
    observation = last.accepted
      ? "提案被接受。双方没有拿到理论最大值，但共同避免了归零。"
      : "提案被拒绝，双方都归零。公平阈值有时会让纯粹的数字计算失效。";
  } else if (game.gameId === "commons") {
    observation =
      last.playerPoints >= 20
        ? "本轮公共回报超过了你的原始投入带来的机会成本。"
        : "本轮保留私产是局部最优，但公共池因此缩小，长期影响会在后续轮次显现。";
  } else if (game.gameId === "auction") {
    observation =
      last.winner === "player"
        ? `你以 ${last.playerBid} 的出价赢得估值 ${last.playerValue} 的藏品，本轮的买方剩余为 ${last.playerPoints}。`
        : "你没有获胜，但保留了全部现金。竞拍中的「没买到」有时也是一种正收益。";
  } else if (game.gameId === "minority") {
    observation = last.playerMinority
      ? `你选择了少数侧，取得 ${last.playerPoints} 分。下一轮的预测者会看到这次结果。`
      : "这一轮你进入了多数侧。所有可见的规律，都可能成为下一轮拥挤的方向。";
  } else if (game.gameId === "council") {
    observation = last.passed
      ? `议案以 ${last.yesVotes}:${last.noVotes} 通过，${game.factions[last.bill.favor].name}获得席位。`
      : `议案以 ${last.yesVotes}:${last.noVotes} 被否决，另一阵营获得席位。`;
  } else if (game.gameId === "wasteland") {
    observation = `本轮你的能量变化为 ${last.playerPoints >= 0 ? "+" : ""}${last.playerPoints}，当前以 ${game.playerEnergy} 能量排在${pactRank(game)}。`;
  } else if (game.gameId === "alliance") {
    observation = last.playerPact
      ? `你与${participantName(game, last.playerTarget)}彼此选中，盟约成立，各得 5 分。`
      : "本轮盟约没有成立。单方面的选择不会自动换来对方的承诺。";
  } else {
    observation = `你在五域中取得 ${last.playerPoints} 分，最重的一域投入了 ${Math.max(...last.playerAllocation)} 名兵力。`;
  }
  return `<article class="reflection-panel">
    <h3>${icon("spark")} 本局观察</h3>
    <p>${observation}</p>
    <div class="reflection-stat">
      <span>本轮判断来源</span>
      <strong>${game.usedDeepSeek ? "DeepSeek" : "本地策略"}</strong>
    </div>
  </article>`;
}

function miniPayoffMarkup(gameId) {
  if (gameId === "prisoner") {
    return `<div class="payoff-mini">
      <span>合作 / 合作&nbsp;&nbsp;3 : 3</span>
      <span>合作 / 背叛&nbsp;&nbsp;0 : 5</span>
      <span>背叛 / 合作&nbsp;&nbsp;5 : 0</span>
      <span>背叛 / 背叛&nbsp;&nbsp;1 : 1</span>
    </div>`;
  }
  if (gameId === "ultimatum") {
    return `<div class="payoff-mini"><span>接受：按提案分配</span><span>拒绝：双方归零</span></div>`;
  }
  if (gameId === "commons") {
    return `<div class="payoff-mini"><span>投入总和 × 1.8</span><span>三人平分公共池</span></div>`;
  }
  if (gameId === "auction") {
    return `<div class="payoff-mini"><span>获胜：估值 − 报价</span><span>落败：收益为 0</span></div>`;
  }
  if (gameId === "minority") {
    return `<div class="payoff-mini"><span>少数侧：3 分</span><span>多数侧：0 分</span></div>`;
  }
  if (gameId === "council") {
    return `<div class="payoff-mini"><span>通过：受益阵营 +10 席</span><span>否决：另一阵营 +10 席</span></div>`;
  }
  if (gameId === "wasteland") {
    return `<div class="payoff-mini"><span>采掘 +4 · 筑防 +1</span><span>劫掠 ±3 · 撞防 −2</span></div>`;
  }
  if (gameId === "alliance") {
    return `<div class="payoff-mini"><span>双向结盟：各 +5</span><span>未结盟：+1</span></div>`;
  }
  return `<div class="payoff-mini"><span>最高兵力：赢得该域</span><span>并列第一：无人得分</span></div>`;
}

function pactRank(game) {
  const scores = [game.playerEnergy, ...game.agents.map((agent) => agent.energy)];
  return `第 ${scores.filter((score) => score > game.playerEnergy).length + 1} 位`;
}

/* Prisoner's dilemma */
function prisonerStage(game) {
  if (game.status === "resolved") return prisonerReveal(game);
  const busy = game.status === "thinking";
  return stageFrame(
    game,
    `
      <div class="duel-scene">
        <div class="duelist">
          <span class="duelist-avatar">${store.profile.avatar}</span>
          <strong class="duelist-name">${escapeHTML(store.profile.name)}</strong>
          <span class="duelist-role">${game.meta.playerRole}</span>
        </div>
        <div class="duel-center">
          <span class="duel-center-line"></span>
          <span class="versus-mark">VS</span>
          <span class="duel-center-line"></span>
        </div>
        <div class="duelist">
          <span class="duelist-avatar ai ${busy ? "thinking" : ""}">${game.opponent.glyph}</span>
          <strong class="duelist-name">${escapeHTML(game.opponent.name)}</strong>
          <span class="duelist-role">${escapeHTML(game.opponent.role)}</span>
        </div>
      </div>
      <div class="choice-grid">
        <button class="choice-card" data-game-action="prisoner-choice" data-choice="cooperate" type="button" ${busy ? "disabled" : ""}>
          <span class="choice-symbol">合</span>
          <span class="choice-copy">
            <strong>合作</strong>
            <small>共同建立收益，但可能被利用</small>
          </span>
        </button>
        <button class="choice-card coral" data-game-action="prisoner-choice" data-choice="defect" type="button" ${busy ? "disabled" : ""}>
          <span class="choice-symbol">争</span>
          <span class="choice-copy">
            <strong>背叛</strong>
            <small>争取单轮优势，但可能失去信任</small>
          </span>
        </button>
      </div>
      <div class="stage-notes">
        <span>双方同时行动，选择将在本轮结束后一同揭晓。</span>
        <span>${game.round === 1 ? "第一轮 · 无历史信息" : `上一轮你选择了「${game.history.at(-1).playerAction === "cooperate" ? "合作" : "背叛"}」`}</span>
      </div>
    `,
    "你无法控制对手，只能选择让对手如何理解你。重复对局中，今天的收益会参与塑造明天的预期。"
  );
}

function prisonerReveal(game) {
  const data = game.roundData;
  const playerCoop = data.playerAction === "cooperate";
  const aiCoop = data.aiAction === "cooperate";
  return stageFrame(
    game,
    `
      <div class="reveal-board">
        <div class="reveal-card ${playerCoop ? "" : "defect"}">
          <span class="reveal-symbol">${playerCoop ? "合" : "争"}</span>
          <small>你的选择</small>
          <strong>${playerCoop ? "合作" : "背叛"}</strong>
          <span class="round-points ${data.playerPoints < 0 ? "negative" : ""}">+${data.playerPoints} 分</span>
        </div>
        <div class="reveal-island">
          <span class="reveal-island-line"></span>
          <strong>vs</strong>
          <span class="reveal-island-line"></span>
        </div>
        <div class="reveal-card ai-card ${aiCoop ? "" : "defect"}">
          <span class="reveal-symbol">${aiCoop ? "合" : "争"}</span>
          <small>${escapeHTML(game.opponent.name)} 的选择</small>
          <strong>${aiCoop ? "合作" : "背叛"}</strong>
          <span class="round-points">+${data.aiPoints} 分</span>
        </div>
      </div>
      <div class="outcome-banner">
        <div class="outcome-banner-copy">
          <span class="outcome-banner-mark">${data.playerPoints > data.aiPoints ? "胜" : data.playerPoints < data.aiPoints ? "负" : "衡"}</span>
          <p>
            <strong>${data.playerPoints > data.aiPoints ? "这一轮你获得了优势" : data.playerPoints < data.aiPoints ? "这一轮对手获得优势" : "这一轮双方均势"}</strong>
            ${escapeHTML(data.aiQuote)}
          </p>
        </div>
        <div class="round-ledger">
          ${game.history.map((item, index) => `<span class="ledger-chip ${item.playerPoints < item.aiPoints ? "bad" : ""}"><i></i>R${index + 1} ${item.playerPoints}:${item.aiPoints}</span>`).join("")}
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "八轮已经结束，查看本局结算。" : "下一轮开始前，对手会记住你这次的选择。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看结算" : "进入下一轮"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localPrisonerDecision(game) {
  const persona = game.opponent;
  const last = game.history.at(-1);
  let action = "cooperate";
  if (persona.type === "echo") {
    action = last ? last.playerAction : "cooperate";
  } else if (persona.type === "garden") {
    if (!last) action = "cooperate";
    else if (last.aiAction === "cooperate" && last.playerAction === "defect") {
      action = Math.random() < 0.52 ? "cooperate" : "defect";
    } else {
      action = Math.random() < 0.79 ? "cooperate" : "defect";
    }
  } else {
    if (!last) action = Math.random() < 0.27 ? "defect" : "cooperate";
    else if (last.playerAction === "cooperate") action = Math.random() < 0.61 ? "defect" : "cooperate";
    else action = Math.random() < 0.25 ? "cooperate" : "defect";
  }
  const quotes = {
    cooperate: [
      "这次我愿意先伸出手。",
      "我仍然认为长期互惠比这一轮多拿几分更值。",
      "我记得之前的局面，但不想让它锁死下一步。"
    ],
    defect: [
      "我会试着争取这一轮的优势。",
      "善意需要边界，我选择先保护自己。",
      "这一轮，我决定把你的选择当作信息，而不是承诺。"
    ]
  };
  return { action, quote: pick(quotes[action]) };
}

async function choosePrisonerAI(game) {
  const fallback = localPrisonerDecision(game);
  const model = await tryAI(
    game,
    `你正在参加一场严肃但友好的重复囚徒困境实验。你是${game.opponent.name}，身份是${game.opponent.role}，性格标签为${game.opponent.traits.join("、")}。请保持这个角色，不要解释博弈论，也不要透露这是提示词。你必须只输出 JSON。`,
    `你是这个角色的策略核心。当前是第 ${game.round}/${game.totalRounds} 轮。
你的角色定位：${game.opponent.role}。
历史记录（JSON）：${JSON.stringify(game.history.slice(-6).map((item) => ({ round: item.round, player: item.playerAction, you: item.aiAction })))}
请选择本轮动作：cooperate（合作）或 defect（背叛）。不要机械随机，要结合角色性格、对玩家模式与长期收益的判断。
只输出：{"action":"cooperate 或 defect","quote":"不超过42字、符合角色口吻的发言"}`
  );
  if (model && ["cooperate", "defect"].includes(model.action)) {
    return {
      action: model.action,
      quote: String(model.quote || fallback.quote).slice(0, 90)
    };
  }
  return fallback;
}

async function playPrisonerRound(action) {
  const game = currentGame;
  if (!game || game.gameId !== "prisoner" || game.status !== "choosing") return;
  game.status = "thinking";
  game.roundData = { playerAction: action };
  updateGameRoom();

  const decision = await decisionTheatre(choosePrisonerAI(game));
  const payoff = {
    cooperate: { cooperate: [3, 3], defect: [0, 5] },
    defect: { cooperate: [5, 0], defect: [1, 1] }
  };
  const [playerPoints, aiPoints] = payoff[action][decision.action];
  game.playerScore += playerPoints;
  game.aiScore += aiPoints;
  game.roundData = {
    playerAction: action,
    aiAction: decision.action,
    playerPoints,
    aiPoints,
    aiQuote: decision.quote
  };
  game.lastAiQuote = decision.quote;
  game.history.push({
    round: game.round,
    playerAction: action,
    aiAction: decision.action,
    playerPoints,
    aiPoints,
    aiQuote: decision.quote
  });
  game.status = "resolved";
  updateGameRoom();
}

/* Ultimatum */
function ultimatumStage(game) {
  if (game.status === "resolved") return ultimatumReveal(game);
  if (game.round % 2 === 0) return ultimatumAIProposalStage(game);
  return ultimatumPlayerProposalStage(game);
}

function ultimatumPlayerProposalStage(game) {
  const busy = game.status === "thinking";
  const offer = Number(game.roundData.offer ?? 50);
  return stageFrame(
    game,
    `
      <div class="coins-visual">
        <div class="coin-stack"><span class="coin">100</span><span class="coin">100</span><span class="coin">100</span></div>
        <span class="coin-divider">本轮可分配</span>
        <div class="coin-stack"><span class="coin">100</span><span class="coin">100</span><span class="coin">100</span></div>
      </div>
      <div class="coin-allocation">
        <div class="allocation-side">
          <small>你保留</small>
          <strong id="player-allocation">${100 - offer}<span> 枚</span></strong>
        </div>
        <span class="allocation-plus">+</span>
        <div class="allocation-side ai-side">
          <small>分给 ${escapeHTML(game.opponent.name)}</small>
          <strong id="ai-allocation">${offer}<span> 枚</span></strong>
        </div>
      </div>
      <div class="public-controls" style="margin-top:0">
        <div class="range-wrap">
          <div class="range-readout">
            <span class="range-readout-label">你的提案 <small>以公平换取成交概率</small></span>
            <span class="range-readout-value" id="offer-readout">${offer}<small>枚</small></span>
          </div>
          <input class="range-track" id="offer-slider" type="range" min="0" max="100" step="1" value="${offer}" style="--fill:${offer}%" ${busy ? "disabled" : ""} />
          <div class="range-scale"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
        </div>
        <div class="preset-row" style="margin-top:12px">
          ${[20, 30, 40, 50, 60].map((value) => `<button class="preset-chip ${value === 40 ? "recommended" : ""}" data-game-action="set-offer" data-value="${value}" type="button" ${busy ? "disabled" : ""}>给 ${value}</button>`).join("")}
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${escapeHTML(game.opponent.name)} 只回应「接受」或「拒绝」。</span>
        <button class="button button-primary button-small" data-game-action="submit-offer" type="button" ${busy ? "disabled" : ""}>${busy ? "等待回应…" : "发出提案"} ${icon("arrow-right")}</button>
      </div>
    `,
    "这是第 1、3 轮：由你提出分配。对方若拒绝，双方本轮都拿不到金币。AI 的接受线不只看金额，也看它是否感到被尊重。"
  );
}

function ultimatumAIProposalStage(game) {
  if (game.status === "thinking") {
    return stageFrame(
      game,
      `
        <div class="duel-scene">
          <div class="duelist">
            <span class="duelist-avatar">${store.profile.avatar}</span>
            <strong class="duelist-name">${escapeHTML(store.profile.name)}</strong>
            <span class="duelist-role">等待提案</span>
          </div>
          <div class="duel-center"><span class="duel-center-line"></span><span class="versus-mark">VS</span><span class="duel-center-line"></span></div>
          <div class="duelist">
            <span class="duelist-avatar ai thinking">${game.opponent.glyph}</span>
            <strong class="duelist-name">${escapeHTML(game.opponent.name)}</strong>
            <span class="duelist-role">正在计算提案</span>
          </div>
        </div>
        <div class="ai-offer-card">
          <small>本轮角色互换 · 对方提案</small>
          <h3>思考中<span>…</span></h3>
          <p>对方会把上一轮的分配与你接受或拒绝的方式一起纳入判断。</p>
        </div>
      `,
      "第 2、4 轮由 AI 提出分配。你只能接受或拒绝；拒绝同样会让双方归零。"
    );
  }
  const offer = Number(game.roundData.offer || 0);
  return stageFrame(
    game,
    `
      <div class="ai-offer-card">
        <small>${escapeHTML(game.opponent.name)} 的提案</small>
        <h3>${offer}<span> 枚留给你</span></h3>
        <p>“${escapeHTML(game.roundData.aiQuote || "这是我愿意给出的分配。")}”</p>
      </div>
      <div class="accept-reject-row">
        <button class="button button-primary" data-game-action="respond-offer" data-choice="accept" type="button">${icon("check")} 接受提案</button>
        <button class="button button-secondary" data-game-action="respond-offer" data-choice="reject" type="button">拒绝，双方归零</button>
      </div>
    `,
    "你没有还价空间，但拒绝本身也是一种信息。接受意味着获得提案金额，拒绝意味着用收益表达你的公平边界。"
  );
}

function ultimatumReveal(game) {
  const data = game.roundData;
  const accepted = data.accepted;
  return stageFrame(
    game,
    `
      <div class="reveal-board" style="grid-template-columns:1fr">
        <div class="reveal-card ${accepted ? "" : "defect"}" style="min-height:195px">
          <span class="reveal-symbol">${accepted ? "成" : "拒"}</span>
          <small>${data.playerRole === "proposer" ? "对方回应了你的提案" : "你回应了对方的提案"}</small>
          <strong>${accepted ? "谈判达成" : "交易破裂"}</strong>
          <span class="round-points">你获得 ${data.playerPoints} 枚 · 对手获得 ${data.aiPoints} 枚</span>
        </div>
      </div>
      <div class="outcome-banner">
        <div class="outcome-banner-copy">
          <span class="outcome-banner-mark">${accepted ? "✓" : "!"}</span>
          <p>
            <strong>${accepted ? "双方共同锁定了这笔收益。" : "公平感胜过了金额本身。"}</strong>
            “${escapeHTML(data.aiQuote || "")}”
          </p>
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "谈判结束，查看累计收益。" : game.round % 2 === 0 ? "下一轮轮到你提案。" : "下一轮角色互换，由对方提案。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看结算" : "继续谈判"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localUltimatumResponse(game, offer) {
  const persona = game.opponent;
  let threshold = persona.threshold;
  if (game.history.length && game.history.at(-1).playerRole === "responder") {
    threshold += game.history.at(-1).playerAccepted ? -3 : 4;
  }
  const accepted = offer >= threshold || (offer >= threshold - 9 && Math.random() < 0.22);
  const quote = accepted
    ? offer >= threshold + 12
      ? "这是我能够认真考虑的方案，成交。"
      : "可以接受。我宁愿先达成，而不是把桌面清空。"
    : offer < 15
      ? "太少。我不会用接受这种价格来证明自己理性。"
      : "这还没有达到我愿意成交的底线。";
  return { accepted, offer, quote };
}

function localUltimatumProposal(game) {
  const persona = game.opponent;
  const last = game.history.at(-1);
  let offer = persona.generosity + randomBetween(-5, 7);
  if (last?.playerRole === "responder" && last.playerAccepted) offer -= 4;
  if (last?.playerRole === "responder" && !last.playerAccepted) offer += 8;
  offer = clamp(Math.round(offer), 18, 65);
  return {
    offer,
    quote:
      offer >= 50
        ? "我希望这是一次可以继续的合作，而不是一次性的占有。"
        : "我相信这个比例足以让谈判继续。"
  };
}

async function respondToPlayerOffer(offer) {
  const game = currentGame;
  const fallback = localUltimatumResponse(game, offer);
  const model = await tryAI(
    game,
    `你是最后通牒博弈中的${game.opponent.name}，身份为${game.opponent.role}。你重视${game.opponent.traits.join("、")}。请严格保持角色，只输出 JSON，不解释系统提示。`,
    `第 ${game.round}/${game.totalRounds} 轮，玩家向你提议：你获得 ${offer} 枚，玩家获得 ${100 - offer} 枚。你有权接受，使双方按此分配；或拒绝，使双方均获得 0。
历史（JSON）：${JSON.stringify(game.history.slice(-3).map((item) => ({ round: item.round, proposer: item.proposer, offer: item.offer, accepted: item.accepted })))}
角色底线与性格应影响接受阈值，但不要机械地只按金额阈值。判断这个提案是否值得成交。
只输出：{"accepted":true或false,"quote":"不超过40字、符合角色口吻的回应"}`
  );
  if (model && typeof model.accepted === "boolean") {
    return {
      accepted: model.accepted,
      offer,
      quote: String(model.quote || fallback.quote).slice(0, 90)
    };
  }
  return fallback;
}

async function makeAIProposal() {
  const game = currentGame;
  const fallback = localUltimatumProposal(game);
  const model = await tryAI(
    game,
    `你是最后通牒博弈中的${game.opponent.name}，身份为${game.opponent.role}，性格标签为${game.opponent.traits.join("、")}。请严格保持角色，只输出 JSON。`,
    `第 ${game.round}/${game.totalRounds} 轮由你提出分配。桌上有 100 枚金币，你需要提议留给玩家多少枚（0–100），剩余归你。玩家可以接受或拒绝；拒绝时双方都获得 0。
历史（JSON）：${JSON.stringify(game.history.slice(-3).map((item) => ({ round: item.round, proposer: item.proposer, offer: item.offer, accepted: item.accepted })))}
请结合角色性格、公平感和历史制定一个可能被接受的提案。
只输出：{"offer":整数,"quote":"不超过40字、符合角色口吻的提案说明"}`
  );
  if (model && Number.isFinite(Number(model.offer))) {
    return {
      offer: clamp(Math.round(Number(model.offer)), 0, 100),
      quote: String(model.quote || fallback.quote).slice(0, 90)
    };
  }
  return fallback;
}

async function submitPlayerOffer() {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const offer = clamp(Number(game.roundData.offer ?? 50), 0, 100);
  game.status = "thinking";
  game.roundData.offer = offer;
  updateGameRoom();
  const response = await decisionTheatre(respondToPlayerOffer(offer));
  const playerPoints = response.accepted ? 100 - offer : 0;
  const aiPoints = response.accepted ? offer : 0;
  game.playerScore += playerPoints;
  game.aiScore += aiPoints;
  game.roundData = {
    playerRole: "proposer",
    proposer: "player",
    offer,
    accepted: response.accepted,
    playerPoints,
    aiPoints,
    aiQuote: response.quote
  };
  game.lastAiQuote = response.quote;
  game.history.push({
    round: game.round,
    playerRole: "proposer",
    proposer: "player",
    offer,
    accepted: response.accepted,
    playerAccepted: null,
    playerPoints,
    aiPoints,
    aiQuote: response.quote
  });
  game.status = "resolved";
  updateGameRoom();
}

async function startUltimatumAIRound(game) {
  if (!game || game.gameId !== "ultimatum" || game.round % 2 !== 0 || game.status === "resolved" || game.status === "finished" || game.busy) return;
  game.busy = true;
  game.status = "thinking";
  updateGameRoom();
  const proposal = await decisionTheatre(makeAIProposal());
  game.roundData = { offer: proposal.offer, aiQuote: proposal.quote };
  game.lastAiQuote = proposal.quote;
  game.status = "ai_offer";
  game.busy = false;
  updateGameRoom();
}

function respondToAIProposal(accepted) {
  const game = currentGame;
  if (!game || game.status !== "ai_offer") return;
  const offer = Number(game.roundData.offer || 0);
  const playerPoints = accepted ? offer : 0;
  const aiPoints = accepted ? 100 - offer : 0;
  game.playerScore += playerPoints;
  game.aiScore += aiPoints;
  const aiQuote = accepted ? "成交。至少我们都避免了归零。" : "你拒绝了。我尊重这个边界。";
  game.roundData = {
    playerRole: "responder",
    proposer: "ai",
    offer,
    accepted,
    playerAccepted: accepted,
    playerPoints,
    aiPoints,
    aiQuote: game.lastAiQuote
  };
  game.history.push({
    round: game.round,
    playerRole: "responder",
    proposer: "ai",
    offer,
    accepted,
    playerAccepted: accepted,
    playerPoints,
    aiPoints,
    aiQuote
  });
  game.status = "resolved";
  updateGameRoom();
}

/* Public goods */
function commonsStage(game) {
  if (game.status === "resolved") return commonsReveal(game);
  const busy = game.status === "thinking";
  const contribution = Number(game.roundData.contribution ?? 10);
  const total = game.roundData.totalContrib || 0;
  return stageFrame(
    game,
    `
      <div class="commons-scene">
        <div class="commons-pool">
          <span class="commons-pool-copy">
            <small>本轮公共池</small>
            <strong>${busy ? "…" : "?"}</strong>
          </span>
        </div>
        <div class="participant-row">
          <div class="participant">
            <span class="participant-avatar">${store.profile.avatar}</span>
            <strong>你</strong>
            <small>计划投入 ${contribution}</small>
          </div>
          ${game.opponents
            .map(
              (opponent) => `
                <div class="participant ai">
                  <span class="participant-avatar">${opponent.glyph}</span>
                  <strong>${escapeHTML(opponent.name)}</strong>
                  <small>${busy ? "正在判断…" : "投入未知"}</small>
                </div>`
            )
            .join("")}
        </div>
      </div>
      <div class="public-controls">
        <div class="range-wrap">
          <div class="range-readout">
            <span class="range-readout-label">投入绿洲 <small>保留 = 20 − 投入</small></span>
            <span class="range-readout-value" id="contribution-readout">${contribution}<small>枚</small></span>
          </div>
          <input class="range-track" id="contribution-slider" type="range" min="0" max="20" step="1" value="${contribution}" style="--fill:${contribution * 5}%" ${busy ? "disabled" : ""}/>
          <div class="range-scale"><span>0 · 全保留</span><span>10</span><span>20 · 全投入</span></div>
        </div>
        <div class="preset-row" style="margin-top:12px">
          ${[0, 5, 10, 15, 20].map((value) => `<button class="preset-chip ${value === 10 ? "recommended" : ""}" data-game-action="set-contribution" data-value="${value}" type="button" ${busy ? "disabled" : ""}>${value}</button>`).join("")}
        </div>
        <div class="payment-breakdown">
          <div class="payment-cell"><small>保留私产</small><strong>${20 - contribution}</strong></div>
          <div class="payment-cell"><small>公共回报</small><strong>?</strong></div>
          <div class="payment-cell"><small>潜在收益</small><strong>?</strong></div>
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">公共池 = 三人投入总和 × 1.8，再平均分配。</span>
        <button class="button button-primary button-small" data-game-action="submit-contribution" type="button" ${busy ? "disabled" : ""}>${busy ? "等待其他共治者…" : "确认投入"} ${icon("leaf")}</button>
      </div>
    `,
    `第 ${game.round}/${game.totalRounds} 轮。投入能放大集体收益，但每 1 枚公共回报最终只回给你 ${(1.8 / 3).toFixed(2)} 枚。保留则是确定的 1 枚。`
  );
}

function commonsReveal(game) {
  const data = game.roundData;
  return stageFrame(
    game,
    `
      <div class="commons-scene" style="padding-top:0">
        <div class="commons-pool">
          <span class="commons-pool-copy">
            <small>放大后的公共池</small>
            <strong>${formatNumber(data.pool)}</strong>
          </span>
        </div>
        <div class="participant-row">
          <div class="participant">
            <span class="participant-avatar">${store.profile.avatar}</span>
            <strong>你</strong>
            <small>投入 <span class="contribution-reveal">${data.contributions[0]}</span></small>
            <small>收益 ${formatNumber(data.payouts[0])}</small>
          </div>
          ${game.opponents
            .map(
              (opponent, index) => `
                <div class="participant ai">
                  <span class="participant-avatar">${opponent.glyph}</span>
                  <strong>${escapeHTML(opponent.name)}</strong>
                  <small>投入 <span class="contribution-reveal">${data.contributions[index + 1]}</span></small>
                  <small>收益 ${formatNumber(data.payouts[index + 1])}</small>
                </div>`
            )
            .join("")}
        </div>
      </div>
      <div class="payment-breakdown">
        <div class="payment-cell"><small>三人总投入</small><strong>${data.contributions.reduce((a, b) => a + b, 0)}</strong></div>
        <div class="payment-cell"><small>放大的公共池</small><strong>${formatNumber(data.pool)}</strong></div>
        <div class="payment-cell"><small>每人公共份额</small><strong>${formatNumber(data.share)}</strong></div>
      </div>
      <div class="outcome-banner">
        <div class="outcome-banner-copy">
          <span class="outcome-banner-mark">${data.payouts[0] >= 20 ? "盈" : "损"}</span>
          <p>
            <strong>本轮你获得 ${formatNumber(data.payouts[0])} 枚资源</strong>
            ${escapeHTML(data.aiQuotes[0] || "绿洲的水位会记住所有人的投入。")}
          </p>
        </div>
        <div class="round-ledger">
          ${game.history.map((item, index) => `<span class="ledger-chip ${item.payouts[0] < 20 ? "bad" : ""}"><i></i>R${index + 1} ${formatNumber(item.payouts[0])}</span>`).join("")}
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "五轮投资已经结束。" : "下一轮三位共治者会看到本轮投入和收益。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看结算" : "进入下一轮"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localCommonsDecision(game, persona, agentIndex) {
  const averages = game.history.map(
    (item) =>
      (item.contributions[0] + item.contributions[1] + item.contributions[2]) / 3
  );
  const expected = averages.length
    ? averages.reduce((sum, value) => sum + value, 0) / averages.length
    : 11;
  let contribution;
  if (persona.type === "idealist") {
    contribution = expected < 7 ? randomBetween(10, 15) : randomBetween(15, 20);
  } else if (persona.type === "adaptive") {
    contribution = clamp(Math.round(expected + randomBetween(-2, 4)), 5, 19);
  } else if (persona.type === "strategist") {
    const othersLow = game.history.at(-1)
      ? game.history.at(-1).contributions.filter((_, index) => index !== agentIndex + 1).some((value) => value < 7)
      : false;
    contribution = othersLow ? randomBetween(5, 10) : randomBetween(10, 16);
  } else {
    contribution = clamp(Math.round(expected * 0.55 + randomBetween(1, 5)), 2, 13);
  }
  const quote =
    contribution >= 14
      ? "我愿意先让井水位涨起来。"
      : contribution >= 8
        ? "我保持一部分谨慎，也保留继续合作的空间。"
        : "这一轮我选择先保护自己的份额。";
  return { contribution, quote };
}

async function decideCommons(game, persona, index) {
  const fallback = localCommonsDecision(game, persona, index);
  const past = game.history.slice(-4).map((item) => ({
    round: item.round,
    contributions: item.contributions,
    payouts: item.payouts.map((value) => Number(value.toFixed(1)))
  }));
  const model = await tryAI(
    game,
    `你是公共品博弈中的${persona.name}，身份为${persona.role}，性格标签为${persona.traits.join("、")}。保持角色，只输出 JSON，不说教。`,
    `当前第 ${game.round}/${game.totalRounds} 轮。每轮三人各有 20 枚资源，共同投入总和乘以 1.8 后三人平分，未投入资源保留。你的累计得分 ${persona.score.toFixed(1)}。
历史（JSON）：${JSON.stringify(past)}
另一位对手也会独立决定。请思考搭便车、维持公共池和角色性格之间的平衡。
选择你本轮投入绿洲的整数 0–20。
只输出：{"contribution":整数,"quote":"不超过36字、符合角色口吻的发言"}`
  );
  if (model && Number.isFinite(Number(model.contribution))) {
    return {
      contribution: clamp(Math.round(Number(model.contribution)), 0, 20),
      quote: String(model.quote || fallback.quote).slice(0, 86)
    };
  }
  return fallback;
}

async function submitCommonsContribution() {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const playerContribution = clamp(
    Math.round(Number(game.roundData.contribution ?? 10)),
    0,
    20
  );
  game.status = "thinking";
  game.roundData.playerContribution = playerContribution;
  updateGameRoom();
  const decisions = await decisionTheatre(
    Promise.all(game.opponents.map((persona, index) => decideCommons(game, persona, index)))
  );
  const contributions = [playerContribution, ...decisions.map((item) => item.contribution)];
  const totalContrib = contributions.reduce((sum, value) => sum + value, 0);
  const pool = totalContrib * 1.8;
  const share = pool / 3;
  const payouts = contributions.map((value) => Number((20 - value + share).toFixed(1)));
  game.playerScore = Number((game.playerScore + payouts[0]).toFixed(1));
  game.opponents.forEach((opponent, index) => {
    opponent.score = Number((opponent.score + payouts[index + 1]).toFixed(1));
  });
  game.aiScore =
    game.opponents.reduce((sum, opponent) => sum + opponent.score, 0) /
    game.opponents.length;
  const aiQuotes = decisions.map((item) => item.quote);
  game.roundData = {
    contributions,
    payouts,
    totalContrib,
    pool,
    share,
    aiQuotes
  };
  game.lastAiQuote = aiQuotes[0];
  game.history.push({
    round: game.round,
    contributions,
    payouts,
    totalContrib,
    pool,
    share,
    aiQuotes,
    playerPoints: payouts[0]
  });
  game.status = "resolved";
  updateGameRoom();
}

/* Auction */
function auctionStage(game) {
  if (game.status === "resolved") return auctionReveal(game);
  const value = game.values[game.round - 1];
  const bid = clamp(Number(game.roundData.bid ?? Math.round(value * 0.72)), 0, value);
  const busy = game.status === "thinking";
  return stageFrame(
    game,
    `
      <div class="auction-lot">
        <span class="lot-art">${["器", "卷", "玺", "钟", "镜"][game.round - 1] || "藏"}</span>
        <div class="lot-copy">
          <small>第 ${String(game.round).padStart(2, "0")} 号拍品 · PRIVATE VALUE</small>
          <h3>${["青釉折枝瓶", "孤本博弈手稿", "旧王私印", "铜制星盘钟", "银背预言镜"][game.round - 1] || "未命名藏品"}</h3>
          <p>这件藏品只对你有私人意义。赢下它带来的满足，可以用货币等价衡量。</p>
          <div class="valuation">${value}<span>枚 · 你的私人估值</span></div>
        </div>
      </div>
      <div class="bid-controls">
        <div class="range-wrap">
          <div class="range-readout">
            <span class="range-readout-label">你的密封报价 <small>不可超过你的估值</small></span>
            <span class="range-readout-value" id="bid-readout">${bid}<small>枚</small></span>
          </div>
          <input class="range-track" id="bid-slider" type="range" min="0" max="${value}" step="1" value="${bid}" style="--fill:${value ? (bid / value) * 100 : 0}%" ${busy ? "disabled" : ""}/>
          <div class="range-scale"><span>0</span><span>${Math.round(value * 0.5)}</span><span>${value}</span></div>
        </div>
        <div class="preset-row" style="margin-top:12px">
          ${[0.55, 0.65, 0.75, 0.85, 0.95]
            .map((ratio) => {
              const preset = Math.round(value * ratio);
              return `<button class="preset-chip ${ratio === 0.75 ? "recommended" : ""}" data-game-action="set-bid" data-value="${preset}" type="button" ${busy ? "disabled" : ""}>${Math.round(ratio * 100)}% 估值</button>`;
            })
            .join("")}
        </div>
        <div class="bid-preview">
          <span>若以此价格赢下拍品</span>
          <strong id="bid-profit">+${Math.max(0, value - bid)} 枚盈余</strong>
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">双方报价同时封存。最高报价者获胜并支付自己的报价。</span>
        <button class="button button-primary button-small" data-game-action="submit-bid" type="button" ${busy ? "disabled" : ""}>${busy ? "等待开标…" : "封存报价"} ${icon("gavel")}</button>
      </div>
    `,
    "报价越高，获胜概率越高；但获胜后支付也越高。你真正要最大化的是「赢得拍品后的剩余」，而不是「赢」本身。"
  );
}

function auctionReveal(game) {
  const data = game.roundData;
  const playerWon = data.winner === "player";
  return stageFrame(
    game,
    `
      <div class="auction-lot" style="margin-bottom:17px">
        <span class="lot-art">${["器", "卷", "玺", "钟", "镜"][game.round - 1] || "藏"}</span>
        <div class="lot-copy">
          <small>开标结果 · ${playerWon ? "YOU WON" : "YOU PASSED"}</small>
          <h3>${playerWon ? "拍品归你" : "拍品被对手拿下"}</h3>
          <p>你的估值 ${data.playerValue} 枚，对手估值 ${data.aiValue} 枚。现在所有私人估值都成了公开信息。</p>
          <div class="valuation">${playerWon ? `+${formatNumber(data.playerPoints)}` : "0"}<span>枚 · 你的本轮收益</span></div>
        </div>
      </div>
      <div class="auction-result-grid">
        <div class="sealed-bid">
          <small>你的密封报价</small>
          <strong>${data.playerBid}<span> 枚</span></strong>
          <em>${playerWon ? "最高报价" : "未中标"}</em>
        </div>
        <div class="sealed-bid ai-bid">
          <small>${escapeHTML(game.opponent.name)} 的报价</small>
          <strong>${data.aiBid}<span> 枚</span></strong>
          <em>${playerWon ? "未中标" : "最高报价"}</em>
        </div>
      </div>
      <div class="outcome-banner">
        <div class="outcome-banner-copy">
          <span class="outcome-banner-mark">${playerWon ? "得" : "舍"}</span>
          <p>
            <strong>${playerWon ? `你以 ${data.playerBid} 枚赢得估值 ${data.playerValue} 枚的藏品。` : "你没有获胜，也没有支付任何报价。"}</strong>
            ${escapeHTML(data.aiQuote)}
          </p>
        </div>
        <div class="round-ledger">
          ${game.history.map((item, index) => `<span class="ledger-chip ${item.winner !== "player" ? "bad" : ""}"><i></i>R${index + 1} ${item.playerBid}:${item.aiBid}</span>`).join("")}
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "五件拍品已全部落槌。" : "下一件拍品的私人估值会重新变化。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看结算" : "进入下一轮"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localAuctionDecision(game) {
  const aiValue = game.aiValues[game.round - 1];
  const persona = game.opponent;
  let ratio = persona.aggression + (Math.random() - 0.5) * 0.1;
  const playerBids = game.history.map((item) => item.playerBid / item.playerValue);
  if (playerBids.length >= 2) {
    const playerAverage = playerBids.reduce((sum, value) => sum + value, 0) / playerBids.length;
    if (playerAverage > 0.84) ratio += 0.035;
    if (playerAverage < 0.62) ratio -= 0.025;
  }
  const bid = clamp(Math.round(aiValue * ratio), 0, aiValue);
  const quotes = [
    "我给这件东西的耐心出了一个价。",
    "不会替情绪多付一枚。",
    "如果我拿不到，也至少让价格接近它的真实价值。"
  ];
  return { bid, quote: pick(quotes) };
}

async function decideAuction(game) {
  const fallback = localAuctionDecision(game);
  const aiValue = game.aiValues[game.round - 1];
  const model = await tryAI(
    game,
    `你是第一价格密封拍卖中的${game.opponent.name}，身份为${game.opponent.role}，性格标签为${game.opponent.traits.join("、")}。保持角色，只输出 JSON。`,
    `当前第 ${game.round}/${game.totalRounds} 轮。藏品的私人估值只属于你：${aiValue} 枚。你和一名对手同时提交密封报价；最高者获胜，并支付自己的报价。你本轮收益 = 获胜时估值 − 报价，未获胜 = 0。
你看到玩家过去几轮的报价与估值（JSON）：${JSON.stringify(game.history.slice(-4).map((item) => ({ playerBidRatio: Number((item.playerBid / item.playerValue).toFixed(2)), winner: item.winner })))}
请决定你的整数报价，范围 0–${aiValue}。胜率不是唯一目标，剩余收益同样重要。
只输出：{"bid":整数,"quote":"不超过36字、符合角色口吻的发言"}`
  );
  if (model && Number.isFinite(Number(model.bid))) {
    return {
      bid: clamp(Math.round(Number(model.bid)), 0, aiValue),
      quote: String(model.quote || fallback.quote).slice(0, 86)
    };
  }
  return fallback;
}

async function submitAuctionBid() {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const playerValue = game.values[game.round - 1];
  const playerBid = clamp(
    Math.round(Number(game.roundData.bid ?? Math.round(playerValue * 0.72))),
    0,
    playerValue
  );
  game.status = "thinking";
  game.roundData.playerBid = playerBid;
  updateGameRoom();
  const decision = await decisionTheatre(decideAuction(game));
  const aiValue = game.aiValues[game.round - 1];
  const winner = playerBid > decision.bid ? "player" : "ai";
  const playerPoints = winner === "player" ? playerValue - playerBid : 0;
  const aiPoints = winner === "ai" ? aiValue - decision.bid : 0;
  game.playerScore += playerPoints;
  game.aiScore += aiPoints;
  game.roundData = {
    playerValue,
    playerBid,
    aiValue,
    aiBid: decision.bid,
    winner,
    playerPoints,
    aiPoints,
    aiQuote: decision.quote
  };
  game.lastAiQuote = decision.quote;
  game.history.push({
    round: game.round,
    playerValue,
    playerBid,
    aiValue,
    aiBid: decision.bid,
    winner,
    playerPoints,
    aiPoints,
    aiQuote: decision.quote
  });
  game.status = "resolved";
  updateGameRoom();
}

/* Minority game */
function minorityStage(game) {
  if (game.status === "resolved") return minorityReveal(game);
  const busy = game.status === "thinking";
  return stageFrame(
    game,
    `
      <div class="minority-scene">
        <div class="crowd-legend" style="margin:0 0 15px">
          <span><i class="you"></i>你</span>
          <span><i></i>四名虚拟参与者</span>
          <span>少数侧 +3 分</span>
        </div>
        <div class="minority-choice-grid">
          <button class="minority-choice red" data-game-action="minority-choice" data-choice="red" type="button" ${busy ? "disabled" : ""}>
            <span class="minority-dot">赤</span>
            <strong>选择赤</strong>
            <small>站在人数更少的一边</small>
          </button>
          <button class="minority-choice blue" data-game-action="minority-choice" data-choice="blue" type="button" ${busy ? "disabled" : ""}>
            <span class="minority-dot">蓝</span>
            <strong>选择蓝</strong>
            <small>押注多数人的反向</small>
          </button>
        </div>
        <div class="payment-breakdown" style="max-width:480px">
          <div class="payment-cell"><small>你的累计</small><strong>${formatNumber(game.playerScore)}</strong></div>
          <div class="payment-cell"><small>群体平均</small><strong>${formatNumber(game.aiScore)}</strong></div>
          <div class="payment-cell"><small>剩余轮次</small><strong>${game.totalRounds - game.round + 1}</strong></div>
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.history.length ? `上一轮赤 ${game.history.at(-1).redCount} 人 · 蓝 ${game.history.at(-1).blueCount} 人` : "第一轮没有公共历史，只能凭直觉。"}</span>
        <span class="rule-hint">选择即揭晓</span>
      </div>
    `,
    "当所有人都追求少数地位，少数本身就会改变。不要只看哪边「应该更少」，还要想其他人会如何预测你的预测。"
  );
}

function minorityReveal(game) {
  const data = game.roundData;
  const playerRed = data.playerChoice === "red";
  return stageFrame(
    game,
    `
      <div class="minority-reveal">
        <div class="side-reveal ${data.winner === "red" ? "winner" : ""}">
          <div class="side-reveal-head"><strong>赤色侧</strong><span>${data.redCount} / 5 人</span></div>
          <div class="people-dots">
            ${Array.from({ length: data.redCount }, (_, index) => playerRed && index === 0 ? `<span class="people-dot player">${store.profile.avatar}</span>` : `<span class="people-dot">${data.redPeople[index] || "赤"}</span>`).join("")}
          </div>
          <div class="side-reveal-foot">${data.winner === "red" ? `<strong>少数侧 · 每人 +3</strong>` : "多数侧 · 本轮不得分"}</div>
        </div>
        <div class="side-reveal ${data.winner === "blue" ? "winner" : ""}">
          <div class="side-reveal-head"><strong>蓝色侧</strong><span>${data.blueCount} / 5 人</span></div>
          <div class="people-dots">
            ${Array.from({ length: data.blueCount }, (_, index) => !playerRed && index === 0 ? `<span class="people-dot player">${store.profile.avatar}</span>` : `<span class="people-dot">${data.bluePeople[index] || "蓝"}</span>`).join("")}
          </div>
          <div class="side-reveal-foot">${data.winner === "blue" ? `<strong>少数侧 · 每人 +3</strong>` : "多数侧 · 本轮不得分"}</div>
        </div>
      </div>
      <div class="outcome-banner">
        <div class="outcome-banner-copy">
          <span class="outcome-banner-mark">${data.playerMinority ? "+3" : "0"}</span>
          <p>
            <strong>${data.playerMinority ? "你在少数侧，拿到 3 分。" : "你进入了多数侧，本轮没有得分。"}</strong>
            ${escapeHTML(data.aiQuote)}
          </p>
        </div>
        <div class="round-ledger">
          ${game.history.map((item, index) => `<span class="ledger-chip ${!item.playerMinority ? "bad" : ""}"><i></i>R${index + 1} ${item.playerChoice === "red" ? "赤" : "蓝"} ${item.redCount}:${item.blueCount}</span>`).join("")}
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "八轮少数派实验结束。" : "本轮所有人的选择已成为下一轮的公共信息。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看结算" : "进入下一轮"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localMinorityCrowd(game, validate = false) {
  const previous = game.history.at(-1);
  const choices = game.crowd.map((persona, index) => {
    if (!previous) {
      const preference = index % 2 === 0 ? "red" : "blue";
      return Math.random() < 0.68 ? preference : preference === "red" ? "blue" : "red";
    }
    let choice;
    const lastMajority = previous.redCount > previous.blueCount ? "red" : "blue";
    if (index === 0) {
      choice = lastMajority;
    } else if (index === 1) {
      choice = lastMajority === "red" ? "blue" : "red";
    } else if (index === 2) {
      choice = Math.random() < 0.64
        ? previous.playerChoice
        : previous.playerChoice === "red"
          ? "blue"
          : "red";
    } else {
      const recentBlue = game.history.slice(-2).filter((item) => item.winner === "blue").length;
      choice = recentBlue >= 1 ? "red" : Math.random() < 0.55 ? "blue" : "red";
    }
    if (Math.random() < 0.11) choice = choice === "red" ? "blue" : "red";
    return choice;
  });
  if (validate) return choices;
  const quote = choices.filter((choice) => choice === "red").length >= 2
    ? "我们看见同一条规律，于是有人决定反向而行。"
    : "这次人群比预想中更分散。";
  return { choices, quote };
}

async function decideMinorityCrowd(game) {
  const fallback = localMinorityCrowd(game);
  const model = await tryAI(
    game,
    `你是一名观察连续少数派博弈的行为研究助手。场上有四位性格不同的参与者：${CROWD_PERSONAS.map((item) => item.name).join("、")}。玩家也会独立选边。请模拟这四位参与者的独立决定，只输出 JSON。`,
    `当前第 ${game.round}/${game.totalRounds} 轮。五个人各自选择 red（赤）或 blue（蓝），选择人数更少一侧的人得 3 分。
历史（JSON）：${JSON.stringify(game.history.slice(-5).map((item) => ({ red: item.redCount, blue: item.blueCount, winner: item.winner, playerChoice: item.playerChoice })))}
四位参与者会各自使用反身推理：既要避开拥挤，也要猜测别人如何避开拥挤。不要让他们全部选择同一边，除非历史给出很强理由。
只输出：{"choices":["red或blue", "red或blue", "red或blue", "red或blue"],"quote":"不超过42字的群体观察"}`
  );
  if (
    model &&
    Array.isArray(model.choices) &&
    model.choices.length === 4 &&
    model.choices.every((choice) => ["red", "blue"].includes(choice))
  ) {
    return {
      choices: model.choices,
      quote: String(model.quote || fallback.quote).slice(0, 92)
    };
  }
  return fallback;
}

async function playMinorityRound(playerChoice) {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  game.status = "thinking";
  game.roundData.playerChoice = playerChoice;
  updateGameRoom();
  const crowd = await decisionTheatre(decideMinorityCrowd(game));
  const crowdChoices = crowd.choices;
  const allChoices = [playerChoice, ...crowdChoices];
  const redCount = allChoices.filter((choice) => choice === "red").length;
  const blueCount = 5 - redCount;
  const winner = redCount < blueCount ? "red" : "blue";
  const playerMinority = playerChoice === winner;
  const playerPoints = playerMinority ? 3 : 0;
  const crowdPoints = crowdChoices.map((choice) => (choice === winner ? 3 : 0));
  game.playerScore += playerPoints;
  game.crowd.forEach((persona, index) => {
    persona.lastChoice = crowdChoices[index];
    persona.score += crowdPoints[index];
  });
  game.aiScore =
    game.crowd.reduce((sum, persona) => sum + persona.score, 0) / game.crowd.length;
  const redPeople = [
    ...(playerChoice === "red" ? [store.profile.name] : []),
    ...game.crowd.filter((_, index) => crowdChoices[index] === "red").map((item) => item.glyph)
  ];
  const bluePeople = [
    ...(playerChoice === "blue" ? [store.profile.name] : []),
    ...game.crowd.filter((_, index) => crowdChoices[index] === "blue").map((item) => item.glyph)
  ];
  game.roundData = {
    playerChoice,
    crowdChoices,
    redCount,
    blueCount,
    winner,
    playerMinority,
    playerPoints,
    crowdPoints,
    redPeople,
    bluePeople,
    aiQuote: crowd.quote
  };
  game.lastAiQuote = crowd.quote;
  game.history.push({
    round: game.round,
    playerChoice,
    crowdChoices,
    redCount,
    blueCount,
    winner,
    playerMinority,
    playerPoints,
    crowdPoints,
    aiQuote: crowd.quote
  });
  game.status = "resolved";
  updateGameRoom();
}

function councilStage(game) {
  if (game.status === "resolved") return councilReveal(game);
  const busy = game.status === "thinking";
  const bill = game.bills[game.round - 1];
  const own = game.factions[game.playerFaction];
  const favored = game.factions[bill.favor];
  return stageFrame(
    game,
    `
      <div class="council-banner">
        <div class="council-identity">
          <span class="council-emblem ${game.playerFaction}">${own.glyph}</span>
          <span><small>你的秘密阵营</small><strong>${own.name}</strong></span>
        </div>
        <div class="council-balance">
          <span><i class="court"></i>${game.factions.court.name} ${game.factions.court.score}</span>
          <b>${game.factions.court.score} : ${game.factions.rebel.score}</b>
          <span>${game.factions.rebel.name} ${game.factions.rebel.score}<i class="rebel"></i></span>
        </div>
      </div>
      <article class="bill-card">
        <span class="bill-seal">${String(bill.number).padStart(2, "0")}</span>
        <div class="bill-copy">
          <small>本轮议案 · 若通过</small>
          <h3>${bill.title}</h3>
          <p>${bill.description}</p>
        </div>
        <span class="bill-benefit ${bill.favor}">${favored.name} +10 席</span>
      </article>
      <div class="council-table">
        <span class="council-member you">
          <i>${store.profile.avatar}</i><small>你</small><b>${own.glyph}</b>
        </span>
        ${game.agents
          .map(
            (agent) => `<span class="council-member">
              <i>${agent.glyph}</i><small>${agent.name}</small><b>?</b>
            </span>`
          )
          .join("")}
      </div>
      <div class="choice-grid council-choice-grid">
        <button class="choice-card" data-game-action="council-vote" data-choice="yes" type="button" ${busy ? "disabled" : ""}>
          <span class="choice-symbol">可</span>
          <span class="choice-copy"><strong>赞成</strong><small>让议案直接进入席位结算</small></span>
        </button>
        <button class="choice-card coral" data-game-action="council-vote" data-choice="no" type="button" ${busy ? "disabled" : ""}>
          <span class="choice-symbol">否</span>
          <span class="choice-copy"><strong>反对</strong><small>争取让另一阵营获得席位</small></span>
        </button>
      </div>
      <div class="stage-notes">
        <span>你的票将在五人全部表决后公开。</span>
        <span>${game.round >= 5 ? "终局将揭晓所有议员身份。" : "观察谁在保护同一类议案。"}</span>
      </div>
    `,
    "议案通过时它标记的阵营获得 10 席，被否决时另一阵营获得 10 席。你自己的收益，来自所属阵营的最终席位。"
  );
}

function councilReveal(game) {
  const data = game.roundData;
  const showRoles = game.round >= game.totalRounds;
  return stageFrame(
    game,
    `
      <div class="vote-result-head">
        <span class="vote-outcome ${data.passed ? "passed" : "rejected"}">${data.passed ? "通过" : "否决"}</span>
        <div>
          <small>${data.bill.title}</small>
          <strong>${data.yesVotes} 票赞成 · ${data.noVotes} 票反对</strong>
        </div>
        <span class="bill-benefit ${data.awardedTeam}">${game.factions[data.awardedTeam].name} +10 席</span>
      </div>
      <div class="council-vote-list">
        <div class="council-vote-person you">
          <span>${store.profile.avatar}</span>
          <strong>你</strong>
          <small>${game.factions[game.playerFaction].glyph} · ${data.playerVote === "yes" ? "赞成" : "反对"}</small>
        </div>
        ${game.agents
          .map(
            (agent, index) => `
              <div class="council-vote-person">
                <span>${agent.glyph}</span>
                <strong>${agent.name}</strong>
                <small>${showRoles ? `${game.factions[agent.team].glyph} · ` : ""}${data.agentVotes[index] === "yes" ? "赞成" : "反对"}</small>
              </div>`
          )
          .join("")}
      </div>
      <div class="faction-scoreboard">
        ${["court", "rebel"]
          .map(
            (team) => `
              <div class="faction-score ${team}">
                <span>${game.factions[team].glyph}</span>
                <div><small>${game.factions[team].name}</small><strong>${game.factions[team].score}<em> 席</em></strong></div>
                ${team === game.playerFaction ? "<b>你的阵营</b>" : ""}
              </div>`
          )
          .join("")}
      </div>
      <div class="outcome-banner">
        <div class="outcome-banner-copy">
          <span class="outcome-banner-mark">${data.awardedTeam === game.playerFaction ? "得" : "失"}</span>
          <p><strong>${data.awardedTeam === game.playerFaction ? "你所属的阵营拿下本席议案。" : "对方阵营抢先获得本席议案。"}</strong>${escapeHTML(data.aiQuote)}</p>
        </div>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "五轮结束，所有身份已经公开。" : "席位领先只带来优势，不保证最后胜局。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "终局结算" : "下一份议案"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localCouncilVotes(game) {
  const bill = game.bills[game.round - 1];
  return game.agents.map((agent, index) => {
    const prefersPass = agent.team === bill.favor;
    const noise = Math.random() < 0.06 + index * 0.012;
    if (!noise) return prefersPass ? "yes" : "no";
    return prefersPass ? "no" : "yes";
  });
}

async function decideCouncilVotes(game) {
  const fallbackVotes = localCouncilVotes(game);
  const bill = game.bills[game.round - 1];
  const model = await tryAI(
    game,
    "你是多人隐藏阵营议会中的席位代理。四名议员各有秘密立场，必须只输出结构化投票。",
    `当前第 ${game.round}/${game.totalRounds} 轮。议案「${bill.title}」若通过，${game.factions[bill.favor].name}获得 10 席；若否决，${game.factions[bill.favor === "court" ? "rebel" : "court"].name}获得 10 席。
四名议员身份：${JSON.stringify(game.agents.map((agent, index) => ({ index, name: agent.name, team: game.factions[agent.team].name, role: agent.role, traits: agent.traits })))}
当前席位：曜庭 ${game.factions.court.score}，灰盟 ${game.factions.rebel.score}。
历史公开票型：${JSON.stringify(game.history.slice(-3).map((item) => ({ bill: item.bill.title, favor: item.bill.favor, passingVotes: item.passingVotes, player: item.playerVote })))}
每名议员以己方最终席位为目标，并可根据发言与局势采取隐蔽策略。请决定四人的 yes/no 票。
只输出：{"votes":["yes或no","yes或no","yes或no","yes或no"],"quote":"不超过42字的议会气氛描述"}`
  );
  if (
    model &&
    Array.isArray(model.votes) &&
    model.votes.length === 4 &&
    model.votes.every((vote) => ["yes", "no"].includes(vote))
  ) {
    return { votes: model.votes, quote: String(model.quote || "").slice(0, 92) };
  }
  return {
    votes: fallbackVotes,
    quote: "几道目光在议案上停留得比话语更久。"
  };
}

async function castCouncilVote(playerVote) {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  game.status = "thinking";
  game.roundData = { playerVote };
  updateGameRoom();
  const decision = await decisionTheatre(decideCouncilVotes(game));
  const bill = game.bills[game.round - 1];
  const allVotes = [playerVote, ...decision.votes];
  const yesVotes = allVotes.filter((vote) => vote === "yes").length;
  const noVotes = 5 - yesVotes;
  const passed = yesVotes > noVotes;
  const awardedTeam = passed ? bill.favor : bill.favor === "court" ? "rebel" : "court";
  game.factions[awardedTeam].score += 10;
  game.playerScore = game.factions[game.playerFaction].score;
  const rivalTeam = game.playerFaction === "court" ? "rebel" : "court";
  game.aiScore = game.factions[rivalTeam].score;
  game.roundData = {
    bill,
    playerVote,
    agentVotes: decision.votes,
    allVotes,
    passingVotes: yesVotes,
    yesVotes,
    noVotes,
    passed,
    awardedTeam,
    playerPoints: awardedTeam === game.playerFaction ? 10 : 0,
    aiPoints: awardedTeam === rivalTeam ? 10 : 0,
    aiQuote: decision.quote
  };
  game.lastAiQuote = decision.quote;
  game.history.push({ round: game.round, ...game.roundData });
  game.status = "resolved";
  updateGameRoom();
}

function actionLabel(action) {
  return action === "gather" ? "采掘" : action === "raid" ? "夜袭" : "筑防";
}

function participantName(game, id) {
  if (id === "player") return store.profile.name;
  const agent = game.agents?.find((item) => item.id === id);
  return agent?.name || "未知目标";
}

function wastelandStage(game) {
  if (game.status === "resolved") return wastelandReveal(game);
  const busy = game.status === "thinking";
  const action = game.roundData.action || "gather";
  const target = game.roundData.target || "agent0";
  const standings = [
    { id: "player", name: store.profile.name, glyph: store.profile.avatar, energy: game.playerEnergy },
    ...game.agents.map((agent) => ({ id: agent.id, name: agent.name, glyph: agent.glyph, energy: agent.energy }))
  ].sort((a, b) => b.energy - a.energy);
  return stageFrame(
    game,
    `
      <div class="wasteland-board">
        <div class="wasteland-sky">
          <span class="wasteland-moon"></span>
          <div><small>第 ${game.round} 夜 · 荒原温度 −4℃</small><strong>补给正在减少</strong></div>
          <span class="energy-pill">${icon("zap")} ${game.playerEnergy}</span>
        </div>
        <div class="wasteland-leaders">
          ${standings
            .map(
              (person) => `
                <div class="wasteland-person ${person.id === "player" ? "you" : ""}">
                  <span>${person.glyph}</span>
                  <div><strong>${escapeHTML(person.name)}</strong><small>${person.id === "player" ? "你" : "独立领队"}</small></div>
                  <b>${person.energy}</b>
                </div>`
            )
            .join("")}
        </div>
      </div>
      <div class="action-triad">
        ${[
          ["gather", "采", "采掘", "稳定 +4 能量"],
          ["raid", "袭", "夜袭", "夺取 3，撞防 −2"],
          ["fortify", "守", "筑防", "+1 并挡下劫掠"]
        ]
          .map(
            ([value, glyph, title, copy]) => `
              <button class="triage-action ${action === value ? "selected" : ""}" data-game-action="wasteland-action" data-choice="${value}" type="button" ${busy ? "disabled" : ""}>
                <span>${glyph}</span><strong>${title}</strong><small>${copy}</small>
              </button>`
          )
          .join("")}
      </div>
      ${
        action === "raid"
          ? `<div class="target-strip">
              <small>选择劫掠目标</small>
              <div>${game.agents.map((agent) => `<button class="${target === agent.id ? "selected" : ""}" data-game-action="wasteland-target" data-target="${agent.id}" type="button">${agent.glyph} ${agent.name} · ${agent.energy}</button>`).join("")}</div>
            </div>`
          : ""
      }
      <div class="action-footer">
        <span class="action-footer-copy">三名领队会同时行动，选择不会提前公开。</span>
        <button class="button button-primary button-small" data-game-action="submit-wasteland" type="button" ${busy ? "disabled" : ""}>${busy ? "荒原行动中…" : "确认行动"} ${icon("flame")}</button>
      </div>
    `,
    "夜袭目标若选择筑防，你无法夺取补给，反而损失 2 能量；筑防者的额外补给会全部保留。"
  );
}

function wastelandReveal(game) {
  const data = game.roundData;
  const standings = data.standings;
  return stageFrame(
    game,
    `
      <div class="night-result">
        <span class="night-result-mark">${data.playerPoints >= 0 ? "+" : ""}${data.playerPoints}</span>
        <div><small>本轮能量变化</small><strong>${actionLabel(data.playerAction)}${data.playerAction === "raid" ? ` · ${participantName(game, data.playerTarget)}` : ""}</strong><p>${escapeHTML(data.aiQuote)}</p></div>
      </div>
      <div class="round-actions-board">
        ${data.actions
          .map(
            (entry) => `
              <div class="round-action-person ${entry.id === "player" ? "you" : ""} ${entry.blocked ? "blocked" : ""}">
                <span class="action-avatar">${entry.glyph}</span>
                <div><strong>${escapeHTML(entry.name)}</strong><small>${actionLabel(entry.action)}${entry.target && entry.action === "raid" ? ` → ${participantName(game, entry.target)}` : ""}</small></div>
                <b class="${entry.delta >= 0 ? "gain" : "loss"}">${entry.delta >= 0 ? "+" : ""}${entry.delta}</b>
              </div>`
          )
          .join("")}
      </div>
      <div class="wasteland-standings">
        ${standings
          .map(
            (person, index) => `
              <div class="${person.id === "player" ? "you" : ""}">
                <span>${index + 1}</span><strong>${escapeHTML(person.name)}</strong>
                <i style="--energy:${clamp(person.energy / Math.max(...standings.map((item) => item.energy)), 0, 1) * 100}%"></i>
                <b>${person.energy}</b>
              </div>`
          )
          .join("")}
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "黎明到来，能量最高者赢得荒原。" : "下一轮可以继续追击，也可以临时转入防御。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看排名" : "进入下一夜"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localWastelandActions(game) {
  const all = [
    { id: "player", energy: game.playerEnergy },
    ...game.agents.map((agent) => ({ id: agent.id, energy: agent.energy }))
  ];
  const leader = [...all].sort((a, b) => b.energy - a.energy)[0];
  return game.agents.map((agent) => {
    let action = "gather";
    let target = "player";
    if (agent.type === "raider") {
      const attackChance = leader.id === agent.id ? 0.3 : 0.68;
      action = Math.random() < attackChance ? "raid" : Math.random() < 0.35 ? "fortify" : "gather";
      target = leader.id === agent.id ? (game.playerEnergy >= all[1].energy ? "player" : all[1].id) : leader.id;
    } else if (agent.type === "guardian") {
      const wasRaided = game.history.at(-1)?.actions?.some(
        (entry) => entry.target === agent.id && entry.action === "raid"
      );
      action = wasRaided || agent.energy <= 8 ? (Math.random() < 0.7 ? "fortify" : "gather") : "gather";
    } else {
      action = Math.random() < 0.48 ? "raid" : Math.random() < 0.32 ? "fortify" : "gather";
      target = leader.id === agent.id ? "player" : leader.id;
    }
    if (target === agent.id) {
      const alternatives = all.filter((person) => person.id !== agent.id);
      target = alternatives.sort((a, b) => b.energy - a.energy)[0].id;
    }
    return { agent: agent.id, action, target };
  });
}

async function decideWastelandActions(game) {
  const fallback = localWastelandActions(game);
  const leader = [...game.agents, { id: "player", energy: game.playerEnergy }].sort(
    (a, b) => b.energy - a.energy
  )[0];
  const model = await tryAI(
    game,
    "你是四人生存博弈的行动代理，负责为三名独立领队同时制定行动。只输出结构化行动。",
    `当前第 ${game.round}/${game.totalRounds} 轮。参与者能量：你 ${game.playerEnergy}，${game.agents.map((agent) => `${agent.name} ${agent.energy}`).join("，")}。当前领先者：${leader.id === "player" ? "玩家" : leader.name}。
三名领队：${JSON.stringify(game.agents.map((agent) => ({ id: agent.id, name: agent.name, role: agent.role, traits: agent.traits, energy: agent.energy })))}
历史（JSON）：${JSON.stringify(game.history.slice(-3).map((item) => ({ actions: item.actions, energyAfter: item.energyAfter })))}
每名领队选择 gather（+4）、raid（指定 target 夺取 3；目标筑防则自己 −2）或 fortify（+1 并挡下针对自己的劫掠）。target 只能是 player 或另一位 agent 的 id，不能选择自己。
只输出：{"agents":[{"agent":"agent0","action":"gather或raid或fortify","target":"player或agentN"}],"quote":"不超过42字的荒原观察"}`
  );
  if (
    model &&
    Array.isArray(model.agents) &&
    model.agents.length === game.agents.length
  ) {
    const validIds = new Set(["player", ...game.agents.map((agent) => agent.id)]);
    const actions = game.agents.map((agent, index) => {
      const choice = model.agents.find((item) => item?.agent === agent.id) || model.agents[index];
      const action = ["gather", "raid", "fortify"].includes(choice?.action)
        ? choice.action
        : fallback[index].action;
      const target = validIds.has(choice?.target) && choice.target !== agent.id
        ? choice.target
        : fallback[index].target;
      return { agent: agent.id, action, target };
    });
    return { actions, quote: String(model.quote || "").slice(0, 92) };
  }
  return { actions: fallback, quote: "今晚的荒原很安静，安静得不够可信。" };
}

async function submitWastelandAction() {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const playerAction = game.roundData.action || "gather";
  const playerTarget = game.roundData.target || "agent0";
  game.status = "thinking";
  updateGameRoom();
  const decision = await decisionTheatre(decideWastelandActions(game));
  const everyone = [
    { id: "player", name: store.profile.name, glyph: store.profile.avatar, action: playerAction, target: playerTarget, energy: game.playerEnergy },
    ...game.agents.map((agent, index) => ({
      id: agent.id,
      name: agent.name,
      glyph: agent.glyph,
      action: decision.actions[index].action,
      target: decision.actions[index].target,
      energy: agent.energy
    }))
  ];
  const before = Object.fromEntries(everyone.map((person) => [person.id, person.energy]));
  everyone.forEach((person) => {
    if (person.action === "gather") person.energy += 4;
    if (person.action === "fortify") person.energy += 1;
  });
  const blockedBy = new Map();
  everyone
    .filter((person) => person.action === "raid")
    .forEach((raider) => {
      const target = everyone.find((person) => person.id === raider.target);
      if (!target) return;
      if (target.action === "fortify") {
        raider.energy = Math.max(0, raider.energy - 2);
        blockedBy.set(raider.id, target.id);
      } else {
        const stolen = Math.min(3, Math.max(0, target.energy));
        target.energy -= stolen;
        raider.energy += stolen;
      }
    });
  game.playerEnergy = everyone[0].energy;
  everyone.slice(1).forEach((person, index) => {
    game.agents[index].energy = person.energy;
  });
  game.aiScore = Math.max(...game.agents.map((agent) => agent.energy));
  const actions = everyone.map((person) => ({
    id: person.id,
    name: person.name,
    glyph: person.glyph,
    action: person.action,
    target: person.action === "raid" ? person.target : null,
    blocked: blockedBy.has(person.id),
    delta: person.energy - before[person.id]
  }));
  const energyAfter = Object.fromEntries(everyone.map((person) => [person.id, person.energy]));
  const standings = everyone
    .map((person) => ({ id: person.id, name: person.name, glyph: person.glyph, energy: person.energy }))
    .sort((a, b) => b.energy - a.energy);
  const blockedRaids = blockedBy.size;
  game.roundData = {
    playerAction,
    playerTarget,
    actions,
    energyAfter,
    standings,
    blockedRaids,
    playerPoints: energyAfter.player - before.player,
    aiQuote: decision.quote
  };
  game.lastAiQuote = decision.quote;
  game.history.push({ round: game.round, ...game.roundData });
  game.status = "resolved";
  updateGameRoom();
}

function allianceStage(game) {
  if (game.status === "resolved") return allianceReveal(game);
  const busy = game.status === "thinking";
  const target = game.roundData.target || "agent0";
  return stageFrame(
    game,
    `
      <div class="alliance-center">
        <div class="alliance-orbit" aria-hidden="true">
          <i></i><i></i><i></i>
          <span>${store.profile.avatar}</span>
        </div>
        <div class="alliance-intro">
          <small>第 ${game.round} 轮 · 你的累计 ${game.playerScore} 分</small>
          <strong>这次，你写下谁的名字？</strong>
          <p>只有彼此选中，盟约才会成立。公开箭头会告诉所有人，上一轮谁被拒绝，谁被回应。</p>
        </div>
      </div>
      <div class="alliance-lines">
        ${game.agents
          .map(
            (agent) => `
              <button class="alliance-node ${target === agent.id ? "selected" : ""}" data-game-action="alliance-target" data-target="${agent.id}" type="button" ${busy ? "disabled" : ""}>
                <span>${agent.glyph}</span>
                <strong>${agent.name}</strong>
                <small>${agent.score} 分 · ${escapeHTML(agent.role)}</small>
                <i>${target === agent.id ? "已落笔" : "选择"}</i>
              </button>`
          )
          .join("")}
      </div>
      <div class="alliance-history">
        ${Array.from({ length: 7 }, (_, index) => {
          const item = game.history[index];
          if (!item) return `<i class="${index === game.round - 1 ? "current" : ""}"></i>`;
          return `<i class="${item.playerPact ? "done" : ""}">${item.playerPact ? "盟" : "·"}</i>`;
        }).join("")}
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">互选：双方各得 5 分。未结成盟约：得 1 分。</span>
        <button class="button button-primary button-small" data-game-action="submit-alliance" type="button" ${busy ? "disabled" : ""}>${busy ? "等待其他人落笔…" : `与 ${participantName(game, target)} 缔约`} ${icon("arrow-right")}</button>
      </div>
    `,
    "连续回报固定盟友能建立信任，但长期固定的关系也更容易被另两名棋手读取和利用。"
  );
}

function allianceReveal(game) {
  const data = game.roundData;
  const people = [
    { id: "player", name: store.profile.name, glyph: store.profile.avatar, target: data.playerTarget },
    ...game.agents.map((agent, index) => ({
      id: agent.id,
      name: agent.name,
      glyph: agent.glyph,
      target: data.agentTargets[index]
    }))
  ];
  return stageFrame(
    game,
    `
      <div class="alliance-result-head ${data.playerPact ? "pact" : ""}">
        <span>${data.playerPact ? "盟" : "独"}</span>
        <div>
          <small>${data.playerPact ? "盟约成立" : "盟约落空"}</small>
          <strong>${data.playerPact ? `你与 ${participantName(game, data.playerTarget)} 各得 5 分` : `你选择了 ${participantName(game, data.playerTarget)}，对方没有回应`}</strong>
        </div>
        <b>+${data.playerPoints}</b>
      </div>
      <div class="contract-web">
        ${people
          .map(
            (person) => `
              <div class="contract-person ${person.id === "player" ? "you" : ""} ${person.target === "player" && data.agentTargets.indexOf("player") >= 0 ? "linked" : ""}">
                <span>${person.glyph}</span>
                <strong>${escapeHTML(person.name)}</strong>
                <small>写给了 <b>${escapeHTML(participantName(game, person.target))}</b></small>
                <i>${people.some((other) => other.id === person.target && other.target === person.id) ? "双向盟约" : "单向选择"}</i>
              </div>`
          )
          .join("")}
      </div>
      <div class="alliance-standings">
        ${data.standings
          .map(
            (person, index) => `
              <div class="${person.id === "player" ? "you" : ""}">
                <span>${index + 1}</span><strong>${escapeHTML(person.name)}</strong>
                <div><i style="width:${clamp((person.score / Math.max(...data.standings.map((item) => item.score), 1)) * 100, 0, 100)}%"></i></div>
                <b>${person.score}</b>
              </div>`
          )
          .join("")}
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">“${escapeHTML(data.aiQuote)}”</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看终局" : "下一轮缔约"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function localAllianceChoices(game) {
  const participantIds = ["player", ...game.agents.map((agent) => agent.id)];
  return game.agents.map((agent, index) => {
    const priorTargeters = game.history.at(-1)?.agentTargets
      ? ["player", ...game.agents.map((item) => item.id)].filter((id) => {
          if (id === agent.id) return false;
          const target = id === "player" ? game.history.at(-1).playerTarget : game.history.at(-1).agentTargets[game.agents.findIndex((item) => item.id === id)];
          return target === agent.id;
        })
      : [];
    let target = agent.lastPartner || "player";
    if (agent.type === "reciprocal" && priorTargeters.length && Math.random() < 0.72) {
      target = priorTargeters[0];
    } else if (agent.type === "builder") {
      target = agent.lastPartner && Math.random() < 0.76 ? agent.lastPartner : priorTargeters[0] || "player";
    } else {
      const options = participantIds.filter((id) => id !== agent.id);
      target = Math.random() < 0.46 ? agent.lastPartner : pick(options);
    }
    if (!participantIds.includes(target) || target === agent.id) {
      target = participantIds.filter((id) => id !== agent.id)[index % 3];
    }
    agent.lastPartner = target;
    return { agent: agent.id, target };
  });
}

async function decideAllianceChoices(game) {
  const fallback = localAllianceChoices(game);
  const participantIds = ["player", ...game.agents.map((agent) => agent.id)];
  const model = await tryAI(
    game,
    "你是四人联盟配对博弈的行为代理，为三名棋手选择本轮盟友。只输出结构化选择。",
    `当前第 ${game.round}/${game.totalRounds} 轮。四名参与者 id：${participantIds.join("、")}。每人秘密选择一名其他人；双方互选则各得 5 分，否则得 1 分。
三名棋手：${JSON.stringify(game.agents.map((agent) => ({ id: agent.id, name: agent.name, type: agent.type, role: agent.role, traits: agent.traits, score: agent.score, lastTarget: agent.lastPartner })))}
公开历史箭头：${JSON.stringify(game.history.slice(-3).map((item) => ({ playerTarget: item.playerTarget, agentTargets: item.agentTargets, pacts: item.pacts })))}
请为三名棋手各自选择一个目标 id，不能选择自己。可回报上轮朝自己伸出的手，也可转换关系。
只输出：{"agents":[{"agent":"agent0","target":"目标id"},{"agent":"agent1","target":"目标id"},{"agent":"agent2","target":"目标id"}],"quote":"不超过42字的棋局观察"}`
  );
  if (model && Array.isArray(model.agents) && model.agents.length === game.agents.length) {
    const choices = game.agents.map((agent, index) => {
      const item = model.agents.find((entry) => entry?.agent === agent.id) || model.agents[index];
      const target =
        participantIds.includes(item?.target) && item.target !== agent.id
          ? item.target
          : fallback[index].target;
      return { agent: agent.id, target };
    });
    return { choices, quote: String(model.quote || "").slice(0, 92) };
  }
  return { choices: fallback, quote: "几条墨线正在纸面上寻找彼此。" };
}

async function submitAlliance() {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const playerTarget = game.roundData.target || "agent0";
  game.status = "thinking";
  updateGameRoom();
  const decision = await decisionTheatre(decideAllianceChoices(game));
  const choices = {
    player: playerTarget,
    ...Object.fromEntries(decision.choices.map((item) => [item.agent, item.target]))
  };
  const participantIds = ["player", ...game.agents.map((agent) => agent.id)];
  const pacts = participantIds
    .filter((id) => choices[choices[id]] === id)
    .map((id) => [id, choices[id]])
    .filter((pair, index, list) => list.findIndex((other) => other[0] === pair[1] && other[1] === pair[0]) === index);
  const playerPact = choices[choices.player] === "player";
  const playerPoints = playerPact ? 5 : 1;
  game.playerScore += playerPoints;
  const agentPoints = game.agents.map((agent) => (choices[choices[agent.id]] === agent.id ? 5 : 1));
  game.agents.forEach((agent, index) => {
    agent.score += agentPoints[index];
    agent.lastPartner = choices[agent.id];
  });
  game.aiScore = Math.max(...game.agents.map((agent) => agent.score));
  const standings = [
    { id: "player", name: store.profile.name, glyph: store.profile.avatar, score: game.playerScore },
    ...game.agents.map((agent) => ({ id: agent.id, name: agent.name, glyph: agent.glyph, score: agent.score }))
  ].sort((a, b) => b.score - a.score);
  game.roundData = {
    playerTarget,
    playerPact,
    playerPoints,
    agentTargets: decision.choices.map((item) => item.target),
    pacts,
    standings,
    aiQuote: decision.quote
  };
  game.lastAiQuote = decision.quote;
  game.history.push({ round: game.round, ...game.roundData });
  game.status = "resolved";
  updateGameRoom();
}

function blitzStage(game) {
  if (game.status === "resolved") return blitzReveal(game);
  const busy = game.status === "thinking";
  const budget = game.budgets[game.round - 1];
  const allocation = game.roundData.allocation || balancedAllocation(budget);
  const remaining = budget - allocation.reduce((sum, value) => sum + value, 0);
  return stageFrame(
    game,
    `
      <div class="blitz-command">
        <div><small>本轮可用兵力</small><strong>${budget}</strong></div>
        <span>五域声望总值 <b>15</b></span>
        <span class="${remaining === 0 ? "ready" : ""}">${remaining === 0 ? "布阵完成" : `剩余 ${remaining}`}</span>
      </div>
      <div class="front-lines">
        ${[5, 4, 3, 2, 1]
          .map((value, index) => {
            const front = [4, 3, 2, 1, 0][index];
            const amount = allocation[front];
            return `
              <div class="front-row">
                <span class="front-number">0${front + 1}</span>
                <span class="front-value">${value}<small>声望</small></span>
                <div class="front-bar"><i style="width:${budget ? (amount / budget) * 100 : 0}%"></i></div>
                <strong>${amount}</strong>
                <div class="front-stepper">
                  <button data-game-action="blitz-adjust" data-front="${front}" data-delta="-1" type="button" ${busy || amount === 0 ? "disabled" : ""}>−</button>
                  <button data-game-action="blitz-adjust" data-front="${front}" data-delta="1" type="button" ${busy || remaining === 0 ? "disabled" : ""}>+</button>
                </div>
              </div>`;
          })
          .join("")}
      </div>
      <div class="blitz-presets">
        <button data-game-action="blitz-preset" data-choice="spear" type="button" ${busy ? "disabled" : ""}>锋矢</button>
        <button data-game-action="blitz-preset" data-choice="balance" type="button" ${busy ? "disabled" : ""}>均势</button>
        <button data-game-action="blitz-preset" data-choice="fade" type="button" ${busy ? "disabled" : ""}>虚实</button>
        <span>所有兵力必须分配完毕</span>
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">三名统帅同时布阵，每处兵力最多者获得该域。</span>
        <button class="button button-primary button-small" data-game-action="submit-blitz" type="button" ${busy || remaining !== 0 ? "disabled" : ""}>${busy ? "敌军布阵中…" : "封存阵图"} ${icon("compass")}</button>
      </div>
    `,
    "声望 5 的边域并非总是最值得争夺。三方同时集中时，一处平局就可能让你失去整轮。"
  );
}

function blitzReveal(game) {
  const data = game.roundData;
  return stageFrame(
    game,
    `
      <div class="blitz-result-title">
        <span>${data.playerPoints}</span>
        <div><small>本轮声望</small><strong>${data.frontsWon} 处边域取胜</strong><p>${escapeHTML(data.aiQuote)}</p></div>
      </div>
      <div class="front-result-list">
        ${data.battles
          .map(
            (battle) => `
              <div class="front-result-row ${battle.winner === "player" ? "won" : ""}">
                <span>${String(battle.front + 1).padStart(2, "0")}</span>
                <div><strong>${battle.name}</strong><small>价值 ${battle.value}</small></div>
                <span class="army-count">${battle.allocations.join(" · ")}</span>
                <b>${battle.winner === "player" ? `+${battle.value}` : battle.winner === "tie" ? "平" : "失"}</b>
              </div>`
          )
          .join("")}
      </div>
      <div class="blitz-standings">
        ${data.standings
          .map(
            (person, index) => `
              <div class="${person.id === "player" ? "you" : ""}">
                <span>${index + 1}</span><strong>${escapeHTML(person.name)}</strong>
                <div><i style="width:${(person.score / 45) * 100}%"></i></div><b>${person.score}</b>
              </div>`
          )
          .join("")}
      </div>
      <div class="action-footer">
        <span class="action-footer-copy">${game.round >= game.totalRounds ? "三张阵图已经全部揭晓。" : "下一轮兵力增加，五处边域仍等待新阵图。"}</span>
        <button class="button button-primary button-small" data-game-action="continue" type="button">${game.round >= game.totalRounds ? "查看战果" : "下一轮布阵"} ${icon("arrow-right")}</button>
      </div>
    `,
    ""
  );
}

function weightedAllocation(budget, weights) {
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  const raw = weights.map((weight) => (budget * weight) / totalWeight);
  const allocation = raw.map(Math.floor);
  let remaining = budget - allocation.reduce((sum, value) => sum + value, 0);
  raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction)
    .forEach((item) => {
      if (remaining > 0) {
        allocation[item.index] += 1;
        remaining -= 1;
      }
    });
  return allocation;
}

function localBlitzAllocations(game, budget) {
  return game.agents.map((agent) => {
    if (agent.type === "concentrate") {
      return weightedAllocation(budget, [1, 1, 2, 4, 8]);
    }
    const last = game.history.at(-1);
    if (!last) return weightedAllocation(budget, [2, 3, 3, 2, 2]);
    const previous = last.agentAllocations[game.agents.indexOf(agent)];
    const shifted = previous.map((value, index) => Math.max(0, value + (index === (game.round + 1) % 5 ? 2 : index === game.round % 5 ? -1 : 0)));
    const sum = shifted.reduce((total, value) => total + value, 0);
    if (sum < budget) shifted[(game.round + 2) % 5] += budget - sum;
    if (sum > budget) {
      let excess = sum - budget;
      while (excess > 0) {
        const target = shifted.findIndex((value) => value > 0);
        shifted[target] -= 1;
        excess -= 1;
      }
    }
    return shifted;
  });
}

async function decideBlitzAllocations(game, budget) {
  const fallback = localBlitzAllocations(game, budget);
  const frontValues = [1, 2, 3, 4, 5];
  const model = await tryAI(
    game,
    "你是五域争衡的资源分配代理，为两名统帅同时制定阵图。只输出结构化兵力分配。",
    `当前第 ${game.round}/${game.totalRounds} 轮，每名统帅共有 ${budget} 名兵力。五处边域按 0–4 编号，声望分别为 ${frontValues.join("、")}。每处兵力最多者得分，并列第一无人得分。
两名统帅：${JSON.stringify(game.agents.map((agent) => ({ id: agent.id, name: agent.name, type: agent.type, traits: agent.traits, score: agent.score })))}
历史阵图：${JSON.stringify(game.history.slice(-2).map((item) => ({ player: item.playerAllocation, agents: item.agentAllocations, winners: item.battles.map((battle) => battle.winner) })))}
每名统帅的 allocation 必须是 5 个非负整数，总和严格等于 ${budget}。
只输出：{"agents":[{"agent":"agent0","allocation":[五个整数]},{"agent":"agent1","allocation":[五个整数]}],"quote":"不超过42字的布阵判断"}`
  );
  if (model && Array.isArray(model.agents)) {
    const allocations = game.agents.map((agent, index) => {
      const item = model.agents.find((entry) => entry?.agent === agent.id) || model.agents[index];
      const candidate = item?.allocation;
      if (
        Array.isArray(candidate) &&
        candidate.length === 5 &&
        candidate.every((value) => Number.isFinite(Number(value)) && Number(value) >= 0) &&
        candidate.reduce((sum, value) => sum + Number(value), 0) === budget
      ) {
        return candidate.map((value) => Math.round(Number(value)));
      }
      return fallback[index];
    });
    return { allocations, quote: String(model.quote || "").slice(0, 92) };
  }
  return { allocations: fallback, quote: "五张阵图看上去都很安静。" };
}

async function submitBlitz() {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const budget = game.budgets[game.round - 1];
  const playerAllocation = game.roundData.allocation;
  game.status = "thinking";
  updateGameRoom();
  const decision = await decisionTheatre(decideBlitzAllocations(game, budget));
  const allAllocations = [playerAllocation, ...decision.allocations];
  const names = ["北望原", "青铜峡", "白盐川", "鸦羽岭", "灰烬港"];
  const values = [1, 2, 3, 4, 5];
  const battles = names.map((name, front) => {
    const allocations = allAllocations.map((allocation) => allocation[front]);
    const highest = Math.max(...allocations);
    const leaders = allocations.filter((amount) => amount === highest).length;
    const winner =
      leaders > 1 ? "tie" : ["player", "agent0", "agent1"][allocations.indexOf(highest)];
    return {
      front,
      name,
      value: values[front],
      allocations,
      winner,
      points: winner === "tie" ? 0 : values[front]
    };
  });
  const playerPoints = battles
    .filter((battle) => battle.winner === "player")
    .reduce((sum, battle) => sum + battle.value, 0);
  const agentPoints = game.agents.map((agent, index) =>
    battles
      .filter((battle) => battle.winner === `agent${index}`)
      .reduce((sum, battle) => sum + battle.value, 0)
  );
  game.playerScore += playerPoints;
  game.agents.forEach((agent, index) => {
    agent.score += agentPoints[index];
  });
  game.aiScore = Math.max(...game.agents.map((agent) => agent.score));
  const standings = [
    { id: "player", name: store.profile.name, glyph: store.profile.avatar, score: game.playerScore },
    ...game.agents.map((agent) => ({ id: agent.id, name: agent.name, glyph: agent.glyph, score: agent.score }))
  ].sort((a, b) => b.score - a.score);
  game.roundData = {
    budget,
    playerAllocation,
    agentAllocations: decision.allocations,
    battles,
    playerPoints,
    frontsWon: battles.filter((battle) => battle.winner === "player").length,
    standings,
    aiQuote: decision.quote
  };
  game.lastAiQuote = decision.quote;
  game.history.push({ round: game.round, ...game.roundData });
  game.status = "resolved";
  updateGameRoom();
}

function updateBlitzAllocation(front, delta) {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const budget = game.budgets[game.round - 1];
  const allocation = [...game.roundData.allocation];
  const remaining = budget - allocation.reduce((sum, value) => sum + value, 0);
  if (delta > 0 && remaining > 0) allocation[front] += 1;
  if (delta < 0 && allocation[front] > 0) allocation[front] -= 1;
  game.roundData.allocation = allocation;
  updateGameRoom();
}

function setBlitzPreset(type) {
  const game = currentGame;
  if (!game || game.status !== "choosing") return;
  const budget = game.budgets[game.round - 1];
  const presets = {
    spear: [1, 1, 2, 4, 8],
    balance: [2, 3, 3, 2, 2],
    fade: [4, 1, 3, 1, 5]
  };
  game.roundData.allocation = weightedAllocation(budget, presets[type] || presets.balance);
  updateGameRoom();
}

/* Global round flow and result */
function resultMarkup(game) {
  const outcome = outcomeFor(game);
  const opponentScore = averageOpponentScore(game);
  const seal = outcome === "win" ? "胜" : outcome === "loss" ? "惜" : "衡";
  const title =
    outcome === "win"
      ? "这一局，你掌握了更有效的规则。"
      : outcome === "loss"
        ? "你输掉了比分，但留下了可读的模式。"
        : "势均力敌，规则没有偏袒任何一方。";
  let summary = "";
  if (game.gameId === "prisoner") {
    summary = `你在 ${game.history.length} 轮中选择合作 ${game.history.filter((item) => item.playerAction === "cooperate").length} 次、背叛 ${game.history.filter((item) => item.playerAction === "defect").length} 次。`;
  } else if (game.gameId === "ultimatum") {
    summary = `四轮谈判中共有 ${game.history.filter((item) => item.accepted).length} 次成交，你累计获得 ${game.playerScore} 枚金币。`;
  } else if (game.gameId === "commons") {
    summary = `你平均每轮投入 ${(game.history.reduce((sum, item) => sum + item.contributions[0], 0) / Math.max(1, game.history.length)).toFixed(1)} 枚，公共池平均规模 ${(game.history.reduce((sum, item) => sum + item.pool, 0) / Math.max(1, game.history.length)).toFixed(1)}。`;
  } else if (game.gameId === "auction") {
    summary = `你赢下了 ${game.history.filter((item) => item.winner === "player").length} 件拍品，总买方剩余为 ${formatNumber(game.history.reduce((sum, item) => sum + item.playerPoints, 0))} 枚。`;
  } else if (game.gameId === "minority") {
    summary = `你有 ${game.history.filter((item) => item.playerMinority).length} 次站到少数侧，在八轮中取得了 ${game.playerScore} 分。`;
  } else if (game.gameId === "council") {
    const own = game.factions[game.playerFaction];
    const rival = game.factions[game.playerFaction === "court" ? "rebel" : "court"];
    summary = `终局公开身份。${own.name}取得 ${own.score} 席，${rival.name}取得 ${rival.score} 席；你属于${own.name}。`;
  } else if (game.gameId === "wasteland") {
    summary = `五轮结束后你保有 ${game.playerEnergy} 能量，发动 ${game.history.filter((item) => item.playerAction === "raid").length} 次夜袭，挡下 ${game.history.reduce((sum, item) => sum + item.blockedRaids, 0)} 次劫掠。`;
  } else if (game.gameId === "alliance") {
    summary = `七轮中共有 ${game.history.filter((item) => item.playerPact).length} 份盟约成立，你最终积累 ${game.playerScore} 分。`;
  } else {
    summary = `三轮布阵共赢得 ${game.history.reduce((sum, item) => sum + item.frontsWon, 0)} 处边域，最终取得 ${game.playerScore} 声望。`;
  }
  const opponentLabel =
    game.gameId === "commons"
      ? "对手平均收益"
      : game.gameId === "council"
        ? "对方阵营席位"
        : ["wasteland", "alliance", "blitz"].includes(game.gameId)
          ? "最强对手"
          : "对手累计收益";
  return `
    <div class="result-view">
      <span class="result-seal"><span>${seal}</span></span>
      <span class="eyebrow">SESSION COMPLETE · ${localizeGame(game.meta).subtitle}</span>
      <h2>${title}</h2>
      <p>${summary}</p>
      <div class="result-scoreboard">
        <div class="result-score-cell">
          <small>你的累计收益</small>
          <strong>${formatNumber(game.playerScore)}</strong>
        </div>
        <div class="result-score-cell">
          <small>${opponentLabel}</small>
          <strong>${formatNumber(opponentScore)}</strong>
        </div>
      </div>
      <div class="result-actions">
        <button class="button button-primary" data-game-action="play-again" type="button">${icon("refresh")} 再来一局</button>
        <button class="button button-secondary" data-route="arena" type="button">选择其他博弈</button>
        <button class="button button-quiet" data-route="history" type="button">查看档案 ${icon("arrow-up-right")}</button>
      </div>
    </div>`;
}

function continueGame() {
  const game = currentGame;
  if (!game || game.status !== "resolved") return;
  if (game.round >= game.totalRounds) {
    finishGame(game);
    return;
  }
  game.round += 1;
  game.roundData = {};
  game.status = "choosing";
  if (game.gameId === "commons") {
    const lastPlayerContribution = game.history.at(-1)?.contributions?.[0] ?? 10;
    game.roundData = { contribution: lastPlayerContribution };
  } else if (game.gameId === "auction") {
    game.roundData = { bid: Math.round(game.values[game.round - 1] * 0.72) };
  } else if (game.gameId === "ultimatum" && game.round % 2 === 0) {
    game.status = "awaiting_ai";
  } else if (game.gameId === "wasteland") {
    game.roundData = { action: "gather", target: "agent0" };
  } else if (game.gameId === "alliance") {
    game.roundData = { target: "agent0" };
  } else if (game.gameId === "blitz") {
    game.roundData = { allocation: balancedAllocation(game.budgets[game.round - 1]) };
  }
  updateGameRoom();
  if (game.gameId === "ultimatum" && game.round % 2 === 0) {
    startUltimatumAIRound(game);
  }
}

function restartGame() {
  if (!currentGame) return;
  const gameId = currentGame.gameId;
  currentGame = createGame(gameId);
  renderGame(gameId);
  toast("新一局已开始，对手和角色组合可能已经变化。");
}

function renderRoute() {
  const route = routeName();
  if (route === "home" || route === "") renderHome();
  else if (route === "arena") renderArena();
  else if (route === "history") renderHistory();
  else if (route.startsWith("game/")) {
    const gameId = route.split("/")[1];
    if (GAME_BY_ID[gameId]) renderGame(gameId);
    else {
      location.hash = "home";
      return;
    }
  } else {
    location.hash = "home";
    return;
  }
  updateChrome();
  translateDOM(document);
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() => $("#app")?.focus({ preventScroll: true }));
}

function toggleLanguage() {
  appLanguage = setLanguage(appLanguage === "zh" ? "en" : "zh");
  preserveFinishedGame = true;
  renderRoute();
  preserveFinishedGame = false;
  updateChrome();
  translateDOM(document);
}

function startRandomGame() {
  const game = pick(GAMES);
  navigate(`game/${game.id}`);
}

function updateSliderUI(type, input) {
  const game = currentGame;
  if (!game) return;
  const value = Number(input.value);
  if (type === "offer") {
    game.roundData.offer = value;
    input.style.setProperty("--fill", `${value}%`);
    const readout = $("#offer-readout");
    if (readout) readout.innerHTML = `${value}<small>枚</small>`;
    if ($("#player-allocation")) $("#player-allocation").innerHTML = `${100 - value}<span> 枚</span>`;
    if ($("#ai-allocation")) $("#ai-allocation").innerHTML = `${value}<span> 枚</span>`;
  } else if (type === "contribution") {
    game.roundData.contribution = value;
    input.style.setProperty("--fill", `${value * 5}%`);
    if ($("#contribution-readout")) {
      $("#contribution-readout").innerHTML = `${value}<small>枚</small>`;
    }
    const participantSmall = $(".participant small");
    if (participantSmall) participantSmall.textContent = `计划投入 ${value}`;
    const cells = $$(".public-controls .payment-cell strong");
    if (cells[0]) cells[0].textContent = String(20 - value);
  } else if (type === "bid") {
    game.roundData.bid = value;
    const max = Number(input.max) || 1;
    input.style.setProperty("--fill", `${(value / max) * 100}%`);
    if ($("#bid-readout")) $("#bid-readout").innerHTML = `${value}<small>枚</small>`;
    if ($("#bid-profit")) $("#bid-profit").textContent = `+${Math.max(0, max - value)} 枚盈余`;
  }
}

function toast(message, type = "info") {
  const stack = $("#toast-stack");
  if (!stack) return;
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.textContent = message;
  stack.append(node);
  setTimeout(() => node.remove(), 4400);
}

/* Modals */
function openModal(content, wide = false) {
  const layer = $("#modal-layer");
  const panel = $("#modal-panel");
  panel.className = `modal-panel${wide ? " wide" : ""}`;
  panel.innerHTML = content;
  layer.classList.add("open");
  layer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  hydrateIcons(panel);
  requestAnimationFrame(() => $(".modal-close", panel)?.focus());
}

function closeModal() {
  const layer = $("#modal-layer");
  layer.classList.remove("open");
  layer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function settingsModal() {
  const key = sessionKey();
  openModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <span class="eyebrow">INTELLIGENCE SETTINGS</span>
        <h2 id="modal-title">AI 对手设置</h2>
        <p>连接 DeepSeek 后，角色会结合局势、历史与性格实时思考；失败时自动回退到本地策略。</p>
      </div>
      <button class="modal-close" data-action="close-modal" type="button" aria-label="关闭"></button>
    </div>
    <div class="modal-body">
      <div class="provider-status">
        <span class="provider-status-icon">${icon("brain")}</span>
        <span class="provider-status-copy">
          <strong>${serverStatus.serverConfigured ? "服务端已配置 DeepSeek" : key ? "临时 Key 已连接" : "当前运行本地策略"}</strong>
          <small>${serverStatus.serverConfigured ? "配置来自 .env，浏览器无需再次填写。" : "本地策略不消耗 API 额度，也能完整游玩所有游戏。"}</small>
        </span>
      </div>
      <div class="form-group">
        <label for="settings-key">DeepSeek API Key <span>${key ? "已填临时 Key" : "推荐使用 .env 配置"}</span></label>
        <input class="field" id="settings-key" type="password" autocomplete="off" placeholder="${serverStatus.serverConfigured ? "服务端已配置，可留空" : "sk-..."}" value="${escapeHTML(key)}" />
        <p class="field-hint">临时 Key 只保存在当前标签页的 <code>sessionStorage</code> 中，经本机代理调用，关闭标签页即清除。</p>
      </div>
      <div class="form-group">
        <label for="settings-model">模型 <span>OpenAI 兼容 Chat Completions</span></label>
        <input class="field" id="settings-model" type="text" value="${escapeHTML(store.settings.model || "deepseek-chat")}" placeholder="deepseek-chat" />
      </div>
      <div class="form-group">
        <label for="settings-endpoint">API 根地址 <span>无需包含 /chat/completions</span></label>
        <input class="field" id="settings-endpoint" type="url" value="${escapeHTML(store.settings.baseUrl || "https://api.deepseek.com")}" placeholder="https://api.deepseek.com" />
      </div>
      <div class="test-result" id="ai-test-result" role="status"></div>
      <div class="modal-actions">
        <button class="button button-quiet button-small" data-action="test-ai" type="button">${icon("zap")} 测试连接</button>
        <button class="button button-secondary button-small" data-action="close-modal" type="button">取消</button>
        <button class="button button-primary button-small" data-action="save-settings" type="button">保存设置</button>
      </div>
    </div>
  `);
}

async function testAISettings() {
  const result = $("#ai-test-result");
  if (!result) return;
  const key = $("#settings-key")?.value.trim() || "";
  const model = $("#settings-model")?.value.trim() || "deepseek-chat";
  const baseUrl = $("#settings-endpoint")?.value.trim() || "https://api.deepseek.com";
  result.className = "test-result visible loading";
  result.textContent = "正在请求模型，请稍候…";
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: key || undefined,
        model,
        baseUrl,
        system: "你是连接测试助手，只输出 JSON。",
        prompt: '只输出 {"reply":"ok"}，不要包含其他内容。'
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      throw new Error(data.message || "连接测试失败");
    }
    result.className = "test-result visible success";
    result.textContent = `连接成功：${data.model || model} 已返回有效结构化响应。`;
  } catch (error) {
    result.className = "test-result visible error";
    result.textContent = `${error.message}。你仍可使用本地策略完成所有对局。`;
  }
}

function saveSettings() {
  const key = $("#settings-key")?.value.trim() || "";
  const model = $("#settings-model")?.value.trim() || "deepseek-chat";
  const baseUrl = $("#settings-endpoint")?.value.trim() || "https://api.deepseek.com";
  saveSessionKey(key);
  store.settings.model = model;
  store.settings.baseUrl = baseUrl;
  saveStore();
  closeModal();
  updateChrome();
  toast(key ? "AI 设置已保存，本次对局将优先使用 DeepSeek。" : serverStatus.serverConfigured ? "已使用服务端 DeepSeek 配置。" : "已保留本地策略模式。");
  if (routeName() === "home" || routeName() === "arena") renderRoute();
}

function profileModal() {
  openModal(`
    <div class="modal-header">
      <div class="modal-heading">
        <span class="eyebrow">PLAYER PROFILE</span>
        <h2 id="modal-title">你的入场身份</h2>
        <p>名字与头像仅用于本地对局展示。对局档案不会发送到任何服务器。</p>
      </div>
      <button class="modal-close" data-action="close-modal" type="button" aria-label="关闭"></button>
    </div>
    <div class="modal-body">
      <div class="profile-grid">
        <div>
          <span class="profile-big-avatar" id="profile-modal-avatar">${store.profile.avatar}</span>
          <div class="avatar-choice">
            ${AVATARS.map(
              (avatar) =>
                `<input type="radio" name="avatar" id="avatar-${avatar}" value="${avatar}" ${store.profile.avatar === avatar ? "checked" : ""}><label for="avatar-${avatar}">${avatar}</label>`
            ).join("")}
          </div>
        </div>
        <div>
          <div class="form-group">
            <label for="profile-name-field">显示名称 <span>最多 12 个字符</span></label>
            <input class="field" id="profile-name-field" type="text" maxlength="12" value="${escapeHTML(store.profile.name)}" />
          </div>
          <p class="field-hint">所有身份、对局和画像数据都保存在当前浏览器中。</p>
        </div>
      </div>
      <div class="modal-actions">
        <button class="button button-secondary button-small" data-action="close-modal" type="button">取消</button>
        <button class="button button-primary button-small" data-action="save-profile" type="button">保存身份</button>
      </div>
    </div>
  `);
  $$('input[name="avatar"]').forEach((input) => {
    input.addEventListener("change", () => {
      $("#profile-modal-avatar").textContent = input.value;
    });
  });
}

function saveProfile() {
  const name = $("#profile-name-field")?.value.trim().slice(0, 12) || "策略家";
  const avatar = $('input[name="avatar"]:checked')?.value || "策";
  store.profile = { name, avatar };
  saveStore();
  closeModal();
  toast("入场身份已更新。");
  if (routeName() === "home" || routeName() === "arena" || routeName().startsWith("game/")) {
    renderRoute();
  }
}

function insightsModal() {
  const profile = aggregateProfile();
  const highest = Object.entries(profile).sort((a, b) => b[1] - a[1])[0][0];
  const labels = {
    cooperation: "合作倾向",
    risk: "冒险倾向",
    trust: "信任意愿",
    adaptation: "适应速度"
  };
  const descriptions = {
    cooperation: "你更愿意先释放善意，或通过投入维持共同收益。",
    risk: "你愿意为了更高上限承担不确定结果。",
    trust: "你倾向于把对方的动作视为可延续的关系信号。",
    adaptation: "面对新信息时，你调整原策略的速度。"
  };
  const count = store.history.length;
  openModal(
    `
    <div class="modal-header">
      <div class="modal-heading">
        <span class="eyebrow">DECISION PROFILE · ${count} SESSIONS</span>
        <h2 id="modal-title">你的决策画像</h2>
        <p>画像由本地对局中的真实选择聚合而成。样本越多，轮廓越清晰。</p>
      </div>
      <button class="modal-close" data-action="close-modal" type="button" aria-label="关闭"></button>
    </div>
    <div class="modal-body">
      <div class="insight-hero">
        <div>
          <span class="eyebrow">CURRENT LEANING</span>
          <h2>${count ? descriptions[highest] : "先做一次选择，画像才会开始生长。"}</h2>
          <p>${count ? `当前最突出的维度是「${labels[highest]}」，指数为 ${profile[highest]}。这不是好坏判断，只是你在当前样本中的行为倾向。` : "完成任意一局后，合作、冒险、信任与适应四个维度会从你的真实决策中计算出来。"}</p>
        </div>
        ${radarMarkup(profile)}
      </div>
      <div class="trait-grid">
        ${Object.entries(profile)
          .map(
            ([key, value]) =>
              `<div class="trait-stat"><small>${labels[key]}</small><strong>${value}</strong><div style="height:3px;margin-top:8px;border-radius:4px;background:var(--paper-deep);overflow:hidden"><div style="width:${value}%;height:100%;border-radius:4px;background:${key === highest ? "var(--coral)" : "var(--forest-mid)"}"></div></div></div>`
          )
          .join("")}
      </div>
      <div class="modal-actions">
        <button class="button button-secondary button-small" data-action="close-modal" type="button">关闭</button>
        <button class="button button-primary button-small" data-route="arena" data-action="close-modal" type="button">再玩一局 ${icon("arrow-right")}</button>
      </div>
    </div>
  `,
    true
  );
}

/* Event wiring */
document.addEventListener("click", (event) => {
  const routeNode = event.target.closest("[data-route]");
  if (routeNode) {
    if (routeNode.dataset.action === "close-modal") closeModal();
    navigate(routeNode.dataset.route);
    return;
  }

  const gameNode = event.target.closest("[data-open-game]");
  if (gameNode) {
    navigate(`game/${gameNode.dataset.openGame}`);
    return;
  }

  const filterNode = event.target.closest("[data-filter]");
  if (filterNode) {
    activeFilter = filterNode.dataset.filter;
    $$(".filter-button").forEach((node) =>
      node.classList.toggle("active", node.dataset.filter === activeFilter)
    );
    applyArenaFilter();
    return;
  }

  const gameActionNode = event.target.closest("[data-game-action]");
  if (gameActionNode) {
    const action = gameActionNode.dataset.gameAction;
    if (action === "restart") restartGame();
    else if (action === "continue") continueGame();
    else if (action === "play-again") restartGame();
    else if (action === "prisoner-choice") playPrisonerRound(gameActionNode.dataset.choice);
    else if (action === "set-offer") {
      currentGame.roundData.offer = Number(gameActionNode.dataset.value);
      updateGameRoom();
    } else if (action === "submit-offer") submitPlayerOffer();
    else if (action === "respond-offer") respondToAIProposal(gameActionNode.dataset.choice === "accept");
    else if (action === "set-contribution") {
      currentGame.roundData.contribution = Number(gameActionNode.dataset.value);
      updateGameRoom();
    } else if (action === "submit-contribution") submitCommonsContribution();
    else if (action === "set-bid") {
      currentGame.roundData.bid = Number(gameActionNode.dataset.value);
      updateGameRoom();
    } else if (action === "submit-bid") submitAuctionBid();
    else if (action === "minority-choice") playMinorityRound(gameActionNode.dataset.choice);
    else if (action === "council-vote") castCouncilVote(gameActionNode.dataset.choice);
    else if (action === "wasteland-action") {
      currentGame.roundData.action = gameActionNode.dataset.choice;
      updateGameRoom();
    } else if (action === "wasteland-target") {
      currentGame.roundData.target = gameActionNode.dataset.target;
      updateGameRoom();
    } else if (action === "submit-wasteland") submitWastelandAction();
    else if (action === "alliance-target") {
      currentGame.roundData.target = gameActionNode.dataset.target;
      updateGameRoom();
    } else if (action === "submit-alliance") submitAlliance();
    else if (action === "blitz-adjust") {
      updateBlitzAllocation(Number(gameActionNode.dataset.front), Number(gameActionNode.dataset.delta));
    } else if (action === "blitz-preset") setBlitzPreset(gameActionNode.dataset.choice);
    else if (action === "submit-blitz") submitBlitz();
    return;
  }

  const actionNode = event.target.closest("[data-action]");
  if (!actionNode) return;
  const action = actionNode.dataset.action;
  if (action === "toggle-language") toggleLanguage();
  else if (action === "random-game") startRandomGame();
  else if (action === "open-settings") settingsModal();
  else if (action === "open-insights") insightsModal();
  else if (action === "edit-profile") profileModal();
  else if (action === "close-modal") closeModal();
  else if (action === "test-ai") testAISettings();
  else if (action === "save-settings") saveSettings();
  else if (action === "save-profile") saveProfile();
});

document.addEventListener("input", (event) => {
  if (event.target.id === "offer-slider") updateSliderUI("offer", event.target);
  else if (event.target.id === "contribution-slider") updateSliderUI("contribution", event.target);
  else if (event.target.id === "bid-slider") updateSliderUI("bid", event.target);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && $("#modal-layer")?.classList.contains("open")) {
    closeModal();
    return;
  }
  if (event.altKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    toggleLanguage();
    return;
  }
  if (event.altKey && event.key.toLowerCase() === "r") {
    event.preventDefault();
    startRandomGame();
    return;
  }
  if (
    event.key === "Enter" &&
    !["INPUT", "TEXTAREA", "BUTTON", "SELECT"].includes(event.target.tagName) &&
    $('[data-game-action="continue"]')
  ) {
    event.preventDefault();
    continueGame();
    return;
  }
  if (
    event.key === "Enter" &&
    event.target.matches("[data-open-game]") &&
    event.target.tagName !== "BUTTON"
  ) {
    navigate(`game/${event.target.dataset.openGame}`);
  }
});

window.addEventListener("hashchange", renderRoute);

async function fetchServerStatus() {
  try {
    const response = await fetch("/api/status");
    if (!response.ok) return;
    serverStatus = { ...serverStatus, ...(await response.json()) };
    updateChrome();
    if (["home", "arena"].includes(routeName())) renderRoute();
  } catch {
    // The local interface still works when the status endpoint is unavailable.
  }
}

(function init() {
  setLanguage(appLanguage);
  hydrateIcons();
  updateDate();
  updateChrome();
  if (!location.hash) history.replaceState(null, "", "#home");
  renderRoute();
  fetchServerStatus();
})();
