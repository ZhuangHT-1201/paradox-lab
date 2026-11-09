const LANGUAGE_KEY = "paradox-language";
let language = localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "zh";

const GAME_EN = {
  prisoner: {
    title: "Silent Pact",
    subtitle: "Repeated Prisoner's Dilemma",
    symbol: "P",
    opponentGlyph: "E",
    glyph: "P",
    description: "No judge. No contract. A choice that keeps coming back.",
    tags: ["Cooperation", "Repeated Play", "Reputation"],
    rule: "Both sides choose Cooperate or Defect simultaneously. Cooperation builds mutual value; defection exploits a cooperative opponent. Highest total after eight rounds wins.",
    playerRole: "Pact Maker",
    opponentRole: "Echo Observer"
  },
  ultimatum: {
    title: "Split the Gold",
    subtitle: "Ultimatum Game",
    symbol: "G",
    opponentGlyph: "G",
    glyph: "G",
    description: "One offer. The other side can reject it and leave you both with nothing.",
    tags: ["Fairness", "Bargaining", "Role Swap"],
    rule: "Each round starts with 100 coins. The proposer splits the pot; the responder accepts or rejects. A rejection pays both sides zero. Roles alternate for four rounds.",
    playerRole: "Negotiator",
    opponentRole: "Gatekeeper"
  },
  commons: {
    title: "The Shared Oasis",
    subtitle: "Public Goods Game",
    symbol: "O",
    opponentGlyph: "O",
    glyph: "O",
    description: "Three players maintain a spring that multiplies what everyone puts in.",
    tags: ["Public Goods", "Free Riding", "Multiplayer"],
    rule: "Each player has 20 resources per round and contributes 0–20. The combined pool is multiplied by 1.8 and split three ways. Kept resources remain private. Highest total after five rounds wins.",
    playerRole: "Oasis Keeper",
    opponentRole: "Two Stewards"
  },
  auction: {
    title: "Blind Bid",
    subtitle: "First-Price Sealed Auction",
    symbol: "B",
    opponentGlyph: "B",
    glyph: "B",
    description: "You know what the lot is worth to you, but not what victory will cost.",
    tags: ["Private Value", "Bidding", "Asymmetric Info"],
    rule: "Each round gives you a private valuation. The highest sealed bid wins and pays that bid. Profit equals value minus price. Five rounds, highest total wins.",
    playerRole: "Independent Collector",
    opponentRole: "Anonymous Bidder"
  },
  minority: {
    title: "Odd One Out",
    subtitle: "Repeated Minority Game",
    symbol: "M",
    opponentGlyph: "4",
    glyph: "M",
    description: "Five players pick a side. The minority scores, until everyone tries to be different.",
    tags: ["Crowd Behavior", "Reflexive Prediction", "Congestion"],
    rule: "Choose Red or Blue each round. Players on the less crowded side gain 3 points; the majority gains 0. Highest total after eight rounds wins.",
    playerRole: "Test Subject",
    opponentRole: "Four-Person Crowd"
  },
  council: {
    title: "The Dark Council",
    subtitle: "Hidden-Faction Vote",
    symbol: "C",
    opponentGlyph: "V",
    glyph: "V",
    description: "Five seats, two secret factions, and a vote that reveals more than it decides.",
    tags: ["Hidden Factions", "Majority Vote", "Deduction"],
    rule: "Vote Yes or No on five bills. A majority passes a bill. Passage grants 10 seats to its favored faction; rejection grants 10 to the other. The faction with more seats wins, and all identities are revealed at the end.",
    playerRole: "Secret Councilor",
    opponentRole: "Four Councilors"
  },
  wasteland: {
    title: "Night Raid",
    subtitle: "Four-Player Survival",
    symbol: "R",
    opponentGlyph: "R",
    glyph: "R",
    description: "Four leaders, limited supplies, and no permanent friends.",
    tags: ["Four Players", "Resource Conflict", "Simultaneous Moves"],
    rule: "Choose each round: Gather gains 4 energy. Raid steals 3 from a chosen target, but costs you 2 if they Fortify. Fortify gains 1 and blocks incoming raids. Highest energy after five rounds wins.",
    playerRole: "Wasteland Leader",
    opponentRole: "Three Rivals"
  },
  alliance: {
    title: "The Pact Board",
    subtitle: "Four-Player Coalition Match",
    symbol: "A",
    opponentGlyph: "A",
    glyph: "A",
    description: "Write a name in secret. A pact forms only when both sides choose each other.",
    tags: ["Coalitions", "Reciprocity", "Group Choice"],
    rule: "Each player secretly names one ally. Mutual choices form a pact and pay both players 5 points; unpaired players gain 1. Highest total after seven rounds wins.",
    playerRole: "Player",
    opponentRole: "Three Players"
  },
  blitz: {
    title: "Five Fronts",
    subtitle: "Three-Player Blotto",
    symbol: "F",
    opponentGlyph: "F",
    glyph: "F",
    description: "Five fronts, three commanders, and not enough troops to win everywhere.",
    tags: ["Resource Allocation", "Three Players", "Zero Sum"],
    rule: "Allocate the full troop budget across five fronts. The unique highest allocation on a front wins its prestige value from 1 to 5. Ties score nothing. Highest total after three rounds wins.",
    playerRole: "Front Commander",
    opponentRole: "Two Commanders"
  }
};

export function getLanguage() {
  return language;
}

export function setLanguage(next) {
  language = next === "en" ? "en" : "zh";
  localStorage.setItem(LANGUAGE_KEY, language);
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  return language;
}

export function localizeGame(game) {
  if (language !== "en") return game;
  const copy = GAME_EN[game.id];
  return copy ? { ...game, ...copy } : game;
}

export function updateLanguageButtons() {
  document.querySelectorAll('[data-action="toggle-language"]').forEach((button) => {
    button.textContent = language === "en" ? "中" : "EN";
    button.setAttribute("aria-label", language === "en" ? "切换到中文" : "Switch to English");
  });
}

const EN_EXACT = {
  "总览": "Overview",
  "博弈场": "Arena",
  "对局档案": "Archive",
  "档案": "Archive",
  "观察室": "OBSERVATORY",
  "牌谱": "LEDGER",
  "门厅 · 今日开放": "LOBBY · OPEN",
  "博弈研究所": "PARADOX LAB",
  "局中": "IN PLAY",
  "你的决策画像": "Decision Profile",
  "完成一局后生成": "Play to unlock",
  "已沉淀": "Recorded",
  "次选择": "choices",
  "本地策略运行中": "Local strategy",
  "连接 DeepSeek 解锁角色思考": "Connect DeepSeek for live reasoning",
  "策略家": "Strategist",
  "尚无对局记录": "No matches yet",
  "观察室 · 今日开放": "OBSERVATORY · OPEN",
  "本地策略": "Local",
  "本地策略不消耗 API 额度，也能完整游玩所有游戏。": "Local play needs no API key.",
  "DeepSeek 在线": "DeepSeek online",
  "DeepSeek 思考中": "Thinking",
  "DeepSeek 思考引擎": "DeepSeek Engine",
  "实时在线": "Live",
  "无需联网": "No network",
  "今日推荐": "TODAY",
  "9 种规则，9 个独立博弈场。观察、下注、结盟，然后改写结局。": "Nine rule systems. Observe, bid, ally, and rewrite the outcome.",
  "开始今日博弈": "Play featured game",
  "浏览全部玩法": "Browse all games",
  "选择你的博弈场": "Choose a game",
  "查看全部": "View all",
  "累计对局": "Matches",
  "观察胜率": "Win rate",
  "累计得分": "Total score",
  "思考引擎": "Engine",
  "局": "games",
  "分": "pts",
  "难度": "Difficulty",
  "分钟": "min",
  "轮": "rounds",
  "全部": "All",
  "合作": "Cooperation",
  "议价": "Bargaining",
  "信息": "Information",
  "多人": "Multiplayer",
  "选择一场博弈。": "Pick your game.",
  "对局档案": "Match Archive",
  "ARCHIVE · 可回看的决定": "ARCHIVE · REVIEW YOUR MOVES",
  "胜利 / 惜败": "Wins / Losses",
  "平均得分": "Avg. score",
  "查看决策画像": "View profile",
  "进入博弈场": "Enter the arena",
  "返回博弈场": "Back to arena",
  "重新开局": "Restart",
  "你的决策": "Your move",
  "本轮结果": "Round result",
  "对局已结束": "Match complete",
  "等待你的回应": "Your response",
  "对手正在思考": "Opponent thinking",
  "博弈规则与收益": "Rules & payoffs",
  "你的累计": "Your total",
  "当前差势": "Score gap",
  "对手累计": "Opponent",
  "对手均值": "Opponent avg.",
  "另一阵营": "Rival faction",
  "最强对手": "Top rival",
  "本轮判断来源": "Decision engine",
  "查看结算": "View result",
  "查看排名": "View ranking",
  "查看终局": "View result",
  "查看战果": "View result",
  "进入下一轮": "Next round",
  "再来一局": "Play again",
  "选择其他博弈": "Choose another game",
  "查看档案": "View archive",
  "已归档": "Archived",
  "合作 / 合作 3 : 3": "Both cooperate 3 : 3",
  "合作 / 背叛 0 : 5": "You cooperate 0 : 5",
  "背叛 / 合作 5 : 0": "You defect 5 : 0",
  "背叛 / 背叛 1 : 1": "Both defect 1 : 1",
  "接受：按提案分配": "Accept: split offer",
  "拒绝：双方归零": "Reject: both get 0",
  "投入总和 × 1.8": "Pool × 1.8",
  "三人平分公共池": "Split three ways",
  "获胜：估值 − 报价": "Win: value − bid",
  "落败：收益为 0": "Lose: 0 payoff",
  "少数侧：3 分": "Minority: +3",
  "多数侧：0 分": "Majority: 0",
  "通过：受益阵营 +10 席": "Pass: favored faction +10",
  "否决：另一阵营 +10 席": "Reject: rival faction +10",
  "采掘 +4 · 筑防 +1": "Gather +4 · Fortify +1",
  "劫掠 ±3 · 撞防 −2": "Raid ±3 · Blocked −2",
  "双向结盟：各 +5": "Mutual pact: +5 each",
  "未结盟：+1": "No pact: +1",
  "最高兵力：赢得该域": "Most troops: win front",
  "并列第一：无人得分": "Tied first: no score",
  "合作": "Cooperate",
  "背叛": "Defect",
  "共同建立收益，但可能被利用": "Build shared value, but risk exploitation",
  "争取单轮优势，但可能失去信任": "Take a short-term edge, risk trust",
  "双方同时行动，选择将在本轮结束后一同揭晓。": "Moves are simultaneous and revealed after both lock in.",
  "第一轮 · 无历史信息": "Round one · no history",
  "你的选择": "Your move",
  "合": "C",
  "争": "D",
  "进入下一夜": "Next night",
  "进入下一轮": "Next round",
  "下一份议案": "Next bill",
  "下一轮缔约": "Next round",
  "下一轮布阵": "Next formation",
  "你保留": "You keep",
  "分给": "Offer to",
  "你的提案": "Your offer",
  "以公平换取成交概率": "Fairness buys acceptance",
  "发出提案": "Send offer",
  "接受提案": "Accept",
  "拒绝，双方归零": "Reject · both get 0",
  "谈判达成": "Deal reached",
  "交易破裂": "Deal collapsed",
  "本轮可分配": "ROUND POT",
  "投入绿洲": "Contribute to the oasis",
  "保留 = 20 − 投入": "Kept = 20 − contribution",
  "保留私产": "Kept private",
  "公共回报": "Public return",
  "潜在收益": "Potential payoff",
  "确认投入": "Lock contribution",
  "本轮公共池": "PUBLIC POOL",
  "公共池 = 三人投入总和 × 1.8，再平均分配。": "The pool is contribution × 1.8, split equally.",
  "投入未知": "Contribution hidden",
  "计划投入": "Planned",
  "三人总投入": "Total contributed",
  "放大的公共池": "Multiplied pool",
  "每人公共份额": "Per-player share",
  "收益": "Payoff",
  "投入": "Contributed",
  "0 · 全保留": "0 · keep all",
  "20 · 全投入": "20 · give all",
  "你的密封报价": "Your sealed bid",
  "不可超过你的估值": "Cannot exceed your value",
  "若以此价格赢下拍品": "Profit if you win at this bid",
  "封存报价": "Seal bid",
  "你的私人估值": "your value",
  "本轮可用兵力": "Troop budget",
  "五域声望总值": "Total prestige",
  "布阵完成": "Formation ready",
  "剩余": "left",
  "锋矢": "Spearhead",
  "均势": "Balanced",
  "虚实": "Feint",
  "所有兵力必须分配完毕": "All troops must be assigned",
  "封存阵图": "Lock formation",
  "声望": "prestige",
  "采": "G",
  "袭": "R",
  "守": "F",
  "采掘": "Gather",
  "夜袭": "Raid",
  "筑防": "Fortify",
  "稳定 +4 能量": "Steady +4 energy",
  "夺取 3，撞防 −2": "Steal 3; blocked costs 2",
  "+1 并挡下劫掠": "+1 and block raids",
  "选择劫掠目标": "Choose a raid target",
  "确认行动": "Lock move",
  "独立领队": "Independent leader",
  "补给正在减少": "Supplies are running out",
  "本轮能量变化": "Energy change",
  "三名领队会同时行动，选择不会提前公开。": "All three leaders move simultaneously.",
  "选择赤": "Choose Red",
  "选择蓝": "Choose Blue",
  "站在人数更少的一边": "Join the smaller side",
  "押注多数人的反向": "Bet against the crowd",
  "少数侧 +3 分": "Minority +3",
  "你的累计": "Your total",
  "群体平均": "Crowd average",
  "剩余轮次": "Rounds left",
  "选择即揭晓": "Pick to reveal",
  "赤": "Red",
  "蓝": "Blue",
  "你的秘密阵营": "Your secret faction",
  "本轮议案 · 若通过": "BILL · IF PASSED",
  "赞成": "Yes",
  "反对": "No",
  "让议案直接进入席位结算": "Award seats to the favored faction",
  "争取让另一阵营获得席位": "Try to award the rival faction",
  "你的票将在五人全部表决后公开。": "Your vote is revealed after all five seats vote.",
  "观察谁在保护同一类议案。": "Watch who protects similar bills.",
  "终局将揭晓所有议员身份。": "All identities are revealed at the end.",
  "通过": "PASSED",
  "否决": "REJECTED",
  "票赞成 ·": "YES ·",
  "票反对": "NO",
  "你的阵营": "YOUR FACTION",
  "五轮结束，所有身份已经公开。": "All identities are now public.",
  "席位领先只带来优势，不保证最后胜局。": "A lead is not a guarantee.",
  "这次，你写下谁的名字？": "Whose name do you write?",
  "已落笔": "Selected",
  "选择": "Select",
  "与": "Pact with",
  "缔约": "",
  "互选：双方各得 5 分。未结成盟约：得 1 分。": "Mutual picks form a pact: +5 each. No pact: +1.",
  "盟约成立": "PACT FORMED",
  "盟约落空": "PACT MISSED",
  "单向选择": "One-way choice",
  "双向盟约": "Mutual pact",
  "写给了": "Chose",
  "各得 5 分": "5 points each",
  "对方没有回应": "They chose someone else",
  "AI 对手设置": "AI Settings",
  "服务端已配置 DeepSeek": "DeepSeek configured",
  "临时 Key 已连接": "Temporary key set",
  "当前运行本地策略": "Local strategy active",
  "配置来自 .env，浏览器无需再次填写。": "Configured server-side through .env.",
  "保存设置": "Save",
  "取消": "Cancel",
  "关闭": "Close",
  "测试连接": "Test connection",
  "模型": "Model",
  "API 根地址": "API base URL",
  "无需包含 /chat/completions": "Do not include /chat/completions",
  "推荐使用 .env 配置": "Recommended: .env",
  "已填临时 Key": "Temporary key set",
  "你的入场身份": "Player identity",
  "显示名称": "Display name",
  "最多 12 个字符": "Up to 12 characters",
  "保存身份": "Save identity",
  "你的决策画像": "Your decision profile",
  "合作倾向": "Cooperation",
  "冒险倾向": "Risk",
  "信任意愿": "Trust",
  "适应速度": "Adaptation",
  "合作": "Cooperation",
  "冒险": "Risk",
  "信任": "Trust",
  "适应": "Adapt",
  "先做一次选择，画像才会开始生长。": "Play a match to shape this profile.",
  "完成任意一局后，合作、冒险、信任与适应四个维度会从你的真实决策中计算出来。": "Each completed match updates cooperation, risk, trust, and adaptation.",
  "查看全部": "View all",
  "全部档案": "Full archive",
  "最近对局": "Recent matches",
  "还没有对局。第一次选择往往最能说明问题。": "No matches yet.",
  "尚无对局记录": "No matches yet",
  "思考引擎": "Engine",
  "AI 设置": "AI Settings",
  "随机开局": "Random game",
  "难度 1 级": "Difficulty 1",
  "难度 2 级": "Difficulty 2",
  "难度 3 级": "Difficulty 3",
  "难度 4 级": "Difficulty 4",
  "本地策略不消耗 API 额度，也能完整游玩所有游戏。": "Local opponents need no API key.",
  "连接 DeepSeek 后，角色会结合局势、历史与性格实时思考；失败时自动回退到本地策略。": "DeepSeek uses game state, history, and character traits; failures fall back to local strategy.",
  "测试连接": "Test connection",
  "DeepSeek API Key": "DeepSeek API Key",
  "API 根地址": "API base URL",
  "模型": "Model",
  "当前运行本地策略": "Local strategy active",
  "本地策略": "Local strategy",
  "正在进行": "In progress",
  "完成": "Complete",
  "胜出": "Win",
  "惜败": "Loss",
  "平局": "Draw",
  "对手": "Opponent",
  "比分": "Score",
  "第 1 轮 · 你的累计 0 分": "Round 1 · Your total 0",
  "第 1 夜 · 荒原温度 −4℃": "Night 1 · Wasteland −4℃",
  "策": "S",
  "谋": "T",
  "弈": "P",
  "衡": "B",
  "合": "C",
  "信": "T",
  "争": "D",
  "盟": "A",
  "泉": "O",
  "槌": "B",
  "左": "M",
  "潮": "V",
  "荒": "R",
  "域": "F",
  "众": "C",
  "囚": "P",
  "金": "G",
  "共": "O",
  "竞": "B",
  "议": "V",
  "纵": "A",
  "对局档案 · 本地留存": "MATCH ARCHIVE · LOCAL",
  "档案仍是空白": "No matches yet",
  "选择一场博弈，留下第一份可供观察的决策记录。无需配置 API Key 也能完整游玩。": "Choose a game and make your first move. No API key required.",
  "当前轮次": "Current round",
  "你的累计": "Your total",
  "对手平均收益": "Opponent avg.",
  "对方阵营席位": "Rival faction seats",
  "你的累计收益": "Your total",
  "对手累计收益": "Opponent total",
  "盟约者": "Pact Maker",
  "回声观察员": "Echo Observer",
  "林回": "Lin Hui",
  "镜像型观察者": "Mirror Observer",
  "记忆型": "Memory",
  "互惠偏好": "Reciprocity",
  "低噪声": "Low noise",
  "顾衡": "Gu Heng",
  "长期主义园丁": "Long-Game Gardener",
  "耐心": "Patient",
  "宽容": "Forgiving",
  "长期收益": "Long-term",
  "祁先生": "Mr. Qi",
  "机会主义猎手": "Opportunist",
  "试探": "Probing",
  "高风险": "High risk",
  "关系不是一轮结算，而是一片需要照料的地。": "A relationship is a garden, not a single transaction.",
  "善意很好，但我不介意看看它能走多远。": "Goodwill is useful. I want to see how far it goes.",
  "我会尊重你上一次的选择。": "I respect your last move.",
  "守门人": "Gatekeeper",
  "唐禾": "Tang He",
  "公平守门人": "Fairness Gatekeeper",
  "公平敏感": "Fairness",
  "愿意互惠": "Reciprocal",
  "讨厌轻视": "Hates insults",
  "周策": "Zhou Ce",
  "务实议价者": "Pragmatic Negotiator",
  "可说服": "Persuadable",
  "看长期关系": "Long game",
  "闻先生": "Mr. Wen",
  "尊严型谈判者": "Prideful Negotiator",
  "高阈值": "High threshold",
  "重面子": "Pride",
  "强硬": "Tough",
  "太少不是策略，是不尊重。": "A lowball offer is disrespect, not strategy.",
  "能成交的数字，才是真正的数字。": "A deal that closes is the only real number.",
  "我不需要用接受低价来证明自己理性。": "I do not need to accept a bad deal to look rational.",
  "你": "You",
  "阿岚": "Aran",
  "墨丘": "Mo Qiu",
  "砾石": "Gravel",
  "辛夷": "Xinyi",
  "理想主义共治者": "Idealist Steward",
  "适应型共治者": "Adaptive Steward",
  "策略型共治者": "Strategic Steward",
  "防御型共治者": "Guarded Steward",
  "相信合作": "Trusts cooperation",
  "看历史": "Reads history",
  "中高贡献": "High contribution",
  "反搭便车": "Anti-free-rider",
  "谨慎": "Cautious",
  "风险厌恶": "Risk averse",
  "两位共治者": "Two Stewards",
  "如果每个人都先退一步，井就真的会干。": "If everyone steps back, the spring really does run dry.",
  "我先观察井水，再决定今天的份额。": "I watch the water before deciding my share.",
  "共同体的边界，要看谁真的在意共同体。": "A community is defined by who actually shows up.",
  "先保住自己的水囊，再谈绿洲。": "Secure your canteen before talking about an oasis.",
  "匿名竞拍者": "Anonymous Bidder",
  "黑匣藏家": "Black-Box Collector",
  "白手套": "White Glove",
  "灰隼": "Grey Falcon",
  "感性收藏家": "Emotional Collector",
  "冷静经销商": "Cold Dealer",
  "强势竞争者": "Aggressive Rival",
  "溢价倾向": "Pays premiums",
  "情绪出价": "Emotional bids",
  "严格留利": "Profit discipline",
  "价格敏感": "Price sensitive",
  "高攻击性": "Aggressive",
  "追逐胜利": "Wins at cost",
  "喜欢的东西，价格只是 footnote。": "Price is a footnote when I want the piece.",
  "我不会替情绪付账。": "I do not pay for emotion.",
  "重要的不是买到，而是不让你买到。": "The point is not winning. It is making sure you lose.",
  "四人群体": "Four-Person Crowd",
  "互相猜测的参与者": "Mutual Prediction Players",
  "反身预测": "Reflexive prediction",
  "拥挤效应": "Congestion",
  "四名个体": "Four individuals",
  "每个人都想成为少数，于是多数就换了方向。": "Everyone wants to be the minority. That changes the majority.",
  "四席议员": "Four Councilors",
  "身份未知的共谋者": "Unknown conspirators",
  "隐藏阵营": "Hidden faction",
  "多数表决": "Majority vote",
  "身份推理": "Deduction",
  "今天坐在你身边的人，未必明天仍与你同席。": "The person beside you today may not sit with you tomorrow.",
  "曜庭": "Sun Court",
  "灰盟": "Grey Pact",
  "洛因": "Loyn",
  "白鸦": "White Crow",
  "枢机": "Cardinal",
  "岑夜": "Cen Ye",
  "曜庭枢记": "Sun Court Scribe",
  "灰盟信使": "Grey Pact Courier",
  "王庭守誓者": "Royal Oathkeeper",
  "灰盟幕僚": "Grey Pact Strategist",
  "克制": "Restrained",
  "善于引导": "Persuasive",
  "锋利": "Sharp",
  "煽动者": "Agitator",
  "制度派": "Institutionalist",
  "隐忍": "Patient",
  "善于换位": "Perspective-taking",
  "秩序从来不靠嗓门维持。": "Order was never kept by volume.",
  "议案写得再漂亮，也要看谁被牺牲。": "Pretty words do not hide who pays.",
  "先守住秩序，再谈谁对谁错。": "Protect order first. Blame comes later.",
  "真正的立场，要看最后一票落在哪里。": "A real position is decided by the final vote.",
  "三名争夺者": "Three Rivals",
  "各自为战的领队": "Independent leaders",
  "四人混战": "Four-player conflict",
  "资源争夺": "Resource conflict",
  "同步行动": "Simultaneous moves",
  "荒原不奖励最谨慎的人，也不奖励最贪心的人。": "The wasteland rewards neither the timid nor the greedy.",
  "铁砂": "Ironsand",
  "砂狐": "Sandfox",
  "牧鸦": "Rook",
  "沙脊猎手": "Dune Hunter",
  "流沙斥候": "Quicksand Scout",
  "废城守望者": "Ruins Watcher",
  "侵略性": "Aggressive",
  "追逐领先者": "Hunts leaders",
  "机敏": "Agile",
  "看局势": "Reads position",
  "报复性筑防": "Retaliatory defense",
  "补给不会自己走进帐篷。": "Supplies do not walk into your tent.",
  "风向不对，就不该把帐篷扎在原地。": "When the wind changes, do not stay put.",
  "想拿走水囊的人，会先听见警钟。": "Anyone reaching for my canteen hears the alarm.",
  "三名棋手": "Three Players",
  "各怀权衡的缔约者": "Pact strategists",
  "互惠": "Reciprocity",
  "联盟": "Coalition",
  "关系记忆": "Relationship memory",
  "青隼": "Falcon",
  "鹿角": "Antler",
  "黑曜": "Obsidian",
  "青隼家主": "Falcon House",
  "鹿庭议使": "Antler Envoy",
  "黑曜棋手": "Obsidian Player",
  "记旧情": "Remembers favors",
  "有来有往": "Reciprocal",
  "稳定联盟": "Stable coalitions",
  "追求连续合作": "Long-term partnership",
  "机会主义": "Opportunist",
  "观察关系": "Reads networks",
  "被选中是一种邀请，彼此选中才是一份盟约。": "Being chosen is an invitation. Mutual choice is a pact.",
  "盟约不在于写得多长，而在于上一次有没有兑现。": "A pact is measured by the last promise kept.",
  "可靠的伙伴，比一时的最优选择更稀缺。": "A reliable partner is rarer than today's best move.",
  "阵营会变，收益不会。": "Sides change. Payoffs remain.",
  "两名统帅": "Two Commanders",
  "同步布阵的对手": "Simultaneous commanders",
  "资源分配": "Resource allocation",
  "三方零和": "Three-player zero sum",
  "同时行动": "Simultaneous actions",
  "所有边域都想守住，等于没有真正的重心。": "Defend every front and you defend none.",
  "铸城": "Forge",
  "千面": "Thousand",
  "北境统帅": "Northern Commander",
  "边境谋士": "Frontier Strategist",
  "集中兵力": "Concentrates troops",
  "争高价值边域": "Targets high value",
  "均衡布阵": "Balanced formation",
  "快速调整": "Fast adaptation",
  "守住最贵的地方，其他土地便有了意义。": "Hold what matters and the rest follows.",
  "看见我的重心时，下一轮的重心已经变了。": "By the time you see my center, it has moved.",
  "本轮公共池": "PUBLIC POOL",
  "放大后的公共池": "MULTIPLIED POOL",
  "本轮可用兵力": "TROOP BUDGET",
  "五域声望总值": "TOTAL PRESTIGE",
  "王城税契": "Royal Tax Charter",
  "延长王庭特许税权，以换取边城驻军。": "Extend royal tax rights in exchange for frontier garrisons.",
  "旧律复行": "Restore the Old Law",
  "恢复旧贵族议事席位，削弱临时议会。": "Restore old noble seats and weaken the provisional council.",
  "金印征召": "Gold Seal Levy",
  "将地方粮仓交由王庭统一调度。": "Place local granaries under royal control.",
  "盐路公契": "Salt Road Charter",
  "开放盐路给自治商团，削减王庭过境税。": "Open the salt road to free traders and cut royal tolls.",
  "灰旗赦令": "Grey Banner Amnesty",
  "赦免参与边城起义的守军与工匠。": "Pardon guards and artisans from the frontier uprising.",
  "地契分授": "Land Deed Grant",
  "把荒废庄园分给长期耕作的无地农户。": "Grant abandoned estates to landless farmers.",
  "你的秘密阵营": "YOUR SECRET FACTION",
  "本轮议案 · 若通过": "BILL · IF PASSED",
  "可": "Y",
  "否": "N",
  "四名虚拟参与者": "Four virtual players",
  "第一轮没有公共历史，只能凭直觉。": "No public history yet. Trust your read.",
  "计划投入": "Planned",
  "双方报价同时封存。最高报价者获胜并支付自己的报价。": "Both bids stay sealed. Highest bid wins and pays their bid.",
  "这件藏品只对你有私人意义。赢下它带来的满足，可以用货币等价衡量。": "This lot is valuable to you. Convert that satisfaction into a price.",
  "青釉折枝瓶": "Celadon Vase",
  "孤本博弈手稿": "Rare Game Manuscript",
  "旧王私印": "Old King's Seal",
  "铜制星盘钟": "Bronze Astrolabe Clock",
  "银背预言镜": "Silver-Backed Oracle Mirror",
  "器": "L1",
  "卷": "L2",
  "玺": "L3",
  "钟": "L4",
  "镜": "L5",
  "三名统帅同时布阵，每处兵力最多者获得该域。": "All three commanders deploy at once. The unique highest force wins each front.",
  "只有彼此选中，盟约才会成立。公开箭头会告诉所有人，上一轮谁被拒绝，谁被回应。": "A pact requires a mutual pick. Public arrows show who was rejected and who was answered.",
  "Pact with": "Pact with",
  "灰": "G",
  "曜": "S",
  "岚": "A",
  "砾": "G",
  "黑": "B",
  "匣": "C",
  "白": "W",
  "隼": "F",
  "铁": "I",
  "砂": "S",
  "狐": "F",
  "牧": "R",
  "铸": "F",
  "千": "T",
  "洛": "L",
  "鸦": "C",
  "枢": "C",
  "岑": "Y",
  "鹿": "A",
  "青": "F",
  "闻": "W",
  "祁": "Q",
  "顾": "G",
  "唐": "T",
  "岚": "A",
  "墨": "M",
  "辛": "X"
  ,"回": "E"
  ,"理性": "Rational"
  ,"低贡献": "Low contribution"
  ,"枚 · 你的私人估值": "coins · your value"
  ,"“我会尊重你上一次的选择。”": "“I respect your last move.”"
  ,"“能成交的数字，才是真正的数字。”": "“A deal that closes is the only real number.”"
  ,"“我不需要用接受低价来证明自己理性。”": "“I do not need to accept a bad deal to look rational.”"
  ,"“我先观察井水，再决定今天的份额。”": "“I watch the water before deciding my share.”"
  ,"“喜欢的东西，价格只是 footnote。”": "“Price is a footnote when I want the piece.”"
  ,"“我不会替情绪付账。”": "“I do not pay for emotion.”"
  ,"“每个人都想成为少数，于是多数就换了方向。”": "“Everyone wants to be the minority. That changes the majority.”"
  ,"“今天坐在你身边的人，未必明天仍与你同席。”": "“The person beside you today may not sit with you tomorrow.”"
  ,"“荒原不奖励最谨慎的人，也不奖励最贪心的人。”": "“The wasteland rewards neither the timid nor the greedy.”"
  ,"“被选中是一种邀请，彼此选中才是一份盟约。”": "“Being chosen is an invitation. Mutual choice is a pact.”"
  ,"“所有边域都想守住，等于没有真正的重心。”": "“Defend every front and you defend none.”"
  ,"这次我愿意先伸出手。": "I will reach first this time."
  ,"我仍然认为长期互惠比这一轮多拿几分更值。": "Long-term reciprocity is worth more than a few points."
  ,"我记得之前的局面，但不想让它锁死下一步。": "I remember the past, but I will not let it lock the future."
  ,"我会试着争取这一轮的优势。": "I will try to take this round."
  ,"善意需要边界，我选择先保护自己。": "Goodwill needs boundaries. I protect myself here."
  ,"这一轮，我决定把你的选择当作信息，而不是承诺。": "I treat your last move as information, not a promise."
  ,"这是我能够认真考虑的方案，成交。": "This is a serious offer. Deal."
  ,"可以接受。我宁愿先达成，而不是把桌面清空。": "Acceptable. I would rather close than leave nothing."
  ,"太少。我不会用接受这种价格来证明自己理性。": "Too low. I will not accept disrespect to look rational."
  ,"这还没有达到我愿意成交的底线。": "This is still below my minimum."
  ,"我希望这是一次可以继续的合作，而不是一次性的占有。": "I want a deal we can build on, not a one-time extraction."
  ,"我相信这个比例足以让谈判继续。": "This split should keep the negotiation alive."
  ,"我愿意先让井水位涨起来。": "I will help raise the water first."
  ,"我保持一部分谨慎，也保留继续合作的空间。": "I stay partly cautious and leave room to cooperate."
  ,"这一轮我选择先保护自己的份额。": "This round I protect my own share."
  ,"我给这件东西的耐心出了一个价。": "I have priced in my patience."
  ,"不会替情绪多付一枚。": "I will not pay one coin for emotion."
  ,"如果我拿不到，也至少让价格接近它的真实价值。": "If I lose, the price should still reflect value."
  ,"我们看见同一条规律，于是有人决定反向而行。": "We saw the same pattern, so someone moved against it."
  ,"这次人群比预想中更分散。": "The crowd is more scattered than expected."
  ,"几道目光在议案上停留得比话语更久。": "A few glances lingered on the bill longer than the words."
  ,"今晚的荒原很安静，安静得不够可信。": "The wasteland is quiet tonight. Too quiet."
  ,"几条墨线正在纸面上寻找彼此。": "Several ink lines search for one another."
  ,"五张阵图看上去都很安静。": "All five formations look deceptively quiet."
  ,"这一轮双方均势": "This round is even"
  ,"这一轮你获得了优势": "You took this round"
  ,"这一轮对手获得优势": "Your opponent took this round"
  ,"下一轮开始前，对手会记住你这次的选择。": "The opponent remembers your move."
  ,"胜": "WIN"
  ,"惜": "LOSS"
  ,"衡": "DRAW"
  ,"这一局，你掌握了更有效的规则。": "You found the stronger strategy."
  ,"你输掉了比分，但留下了可读的模式。": "You lost the score, not the lesson."
  ,"势均力敌，规则没有偏袒任何一方。": "Evenly matched. The rules favored no one."
  ,"成": "DEAL"
  ,"对方回应了你的提案": "The opponent responded to your offer"
  ,"双方共同锁定了这笔收益。": "Both sides locked in the payoff."
  ,"下一轮角色互换，由对方提案。": "Roles swap next round."
  ,"继续谈判": "Continue negotiation"
  ,"盈": "GAIN"
  ,"本轮你获得": "This round you gained"
  ,"下一轮三位共治者会看到本轮投入和收益。": "All stewards see this round's contributions and payoffs."
  ,"开标结果 · YOU PASSED": "AUCTION · YOU PASSED"
  ,"拍品被对手拿下": "The opponent won the lot"
  ,"枚 · 你的本轮收益": "coins · your payoff"
  ,"未中标": "LOST"
  ,"最高报价": "HIGHEST BID"
  ,"舍": "PASS"
  ,"你没有获胜，也没有支付任何报价。": "You did not win and paid nothing."
  ,"下一件拍品的私人估值会重新变化。": "The next lot brings a new valuation."
  ,"赤色侧": "RED SIDE"
  ,"蓝色侧": "BLUE SIDE"
  ,"多数侧 · 本轮不得分": "Majority · no score"
  ,"少数侧 · 每人 +3": "Minority · +3 each"
  ,"你进入了多数侧，本轮没有得分。": "You joined the majority and scored nothing."
  ,"本轮所有人的选择已成为下一轮的公共信息。": "Everyone's choice is now public history."
  ,"失": "MISS"
  ,"对方阵营抢先获得本席议案。": "The rival faction took the seats."
  ,"下一轮可以继续追击，也可以临时转入防御。": "You can chase the lead or defend next round."
  ,"独": "ALONE"
  ,"本轮声望": "ROUND PRESTIGE"
  ,"平": "TIE"
  ,"下一轮兵力增加，五处边域仍等待新阵图。": "More troops arrive next round."
  ,"“我仍然认为长期互惠比这一轮多拿几分更值。”": "“Long-term reciprocity is worth more than a few points.”"
  ,"“我会试着争取这一轮的优势。”": "“I will try to take this round.”"
  ,"“这是我能够认真考虑的方案，成交。”": "“This is a serious offer. Deal.”"
  ,"“我保持一部分谨慎，也保留继续合作的空间。”": "“I stay cautious and leave room to cooperate.”"
  ,"“不会替情绪多付一枚。”": "“I will not pay one coin for emotion.”"
  ,"“我们看见同一条规律，于是有人决定反向而行。”": "“We saw the same pattern, so someone moved against it.”"
  ,"“几道目光在议案上停留得比话语更久。”": "“A few glances lingered on the bill longer than the words.”"
  ,"“今晚的荒原很安静，安静得不够可信。”": "“The wasteland is quiet tonight. Too quiet.”"
  ,"“几条墨线正在纸面上寻找彼此。”": "“Several ink lines search for one another.”"
  ,"“五张阵图看上去都很安静。”": "“All five formations look deceptively quiet.”"
  ,"满": "M"
  ,"七": "7"
  ,"盘": "P"
  ,"鸢": "K"
  ,"“这次我愿意先伸出手。”": "“I will reach first this time.”"
  ,"“我希望这是一次可以继续的合作，而不是一次性的占有。”": "“I want a deal we can build on, not a one-time extraction.”"
  ,"“我相信这个比例足以让谈判继续。”": "“This split should keep the negotiation alive.”"
  ,"“我愿意先让井水位涨起来。”": "“I will help raise the water first.”"
  ,"“如果我拿不到，也至少让价格接近它的真实价值。”": "“If I lose, the price should still reflect value.”"
  ,"高贡献": "High contribution"
  ,"得": "SCORE"
  ,"你所属的阵营拿下本席议案。": "Your faction took the bill."
  ,"北望原": "Northreach"
  ,"青铜峡": "Bronzegorge"
  ,"白盐川": "White Salt"
  ,"鸦羽岭": "Raven Ridge"
  ,"灰烬港": "Ash Harbor"
  ,"禾": "T"
  ,"小满": "Xiaoman"
  ,"罗盘": "Compass"
  ,"纸鸢": "Kite"
  ,"七号": "No. 7"
};

const REGEX_TRANSLATIONS = [
  [/^博弈场 · (\d+) 种规则$/, "ARENA · $1 RULES"],
  [/^博弈场 · (.+)$/, "ARENA · $1"],
  [/^(\d+) 场关于合作、公平、信任与欲望的实验。.*$/, "$1 rule systems for cooperation, fairness, trust, and ambition."],
  [/^(\d+) 轮 · (\d+) 分钟$/, "$1 rounds · $2 min"],
  [/^(\d+) 局 · 胜率 (\d+)%$/, "$1 matches · $2% win rate"],
  [/^已沉淀 (\d+) 次选择$/, "$1 choices recorded"],
  [/^完成一局后生成$/, "Play to unlock"],
  [/^你的累计 (\d+) 分$/, "Your total: $1"],
  [/^(\d+) 分$/, "$1 pts"],
  [/^(\d+) 分 · (.+)$/, "$1 pts · $2"],
  [/^第 (\d+) 轮 · 你的累计 (\d+) 分$/, "Round $1 · Your total: $2"],
  [/^第 (\d+) 夜 · 荒原温度 −4℃$/, "Night $1 · Wasteland −4℃"],
  [/^第 (\d+) 轮、(\d+) 轮由 (.+) 提出分配。.*$/, "Rounds $1 and $2: $3 proposes."],
  [/^(\d+) 票赞成 · (\d+) 票反对$/, "$1 YES · $2 NO"],
  [/^(\d+) 分$/, "$1 pts"],
  [/^(\d+) 轮$/, "$1 rounds"],
  [/^(\d+) 人$/, "$1 players"],
  [/^(\d+)\/(\d+)$/, "$1/$2"],
  [/^\+(\d+(?:\.\d+)?) 分$/, "+$1"],
  [/^\+(\d+) 枚盈余$/, "+$1 profit"],
  [/^(\d+)% 估值$/, "$1% value"],
  [/^给 (\d+)$/, "Offer $1"],
  [/^与 (.+) 缔约$/, "Pact with $1"],
  [/^分给 (.+)$/, "Offer to $1"],
  [/^(.+) 只回应「接受」或「拒绝」。$/, "$1 can only accept or reject."],
  [/^第 (\d+) 轮 \/ (\d+) 轮$/, "Round $1 / $2"],
  [/^ROUND (\d+) \/ (\d+)$/, "ROUND $1 / $2"],
  [/^第 (\d+) 轮$/, "Round $1"],
  [/^(\d+) 枚$/, "$1 coins"],
  [/^(\d+) 能量$/, "$1 energy"],
  [/^(\d+) 席$/, "$1 seats"],
  [/^(\d+) 票 · (\d+) 票$/, "$1 votes · $2 votes"]
  ,[/^合作\s*\/\s*合作\s*3\s*:\s*3$/, "Both cooperate 3 : 3"]
  ,[/^合作\s*\/\s*背叛\s*0\s*:\s*5$/, "You cooperate 0 : 5"]
  ,[/^背叛\s*\/\s*合作\s*5\s*:\s*0$/, "You defect 5 : 0"]
  ,[/^背叛\s*\/\s*背叛\s*1\s*:\s*1$/, "Both defect 1 : 1"]
  ,[/^第 (\d+) 号拍品 · PRIVATE VALUE$/, "LOT $1 · PRIVATE VALUE"]
  ,[/^(\d+) 枚 · 你的私人估值$/, "$1 coins · your value"]
  ,[/^(\d+) 枚 · 对手估值 (\d+) 枚。$/, "$1 coins · rival value $2."]
  ,[/^第 (\d+) 夜 · 荒原温度 −4℃$/, "Night $1 · Wasteland −4℃"]
  ,[/^曜庭 (\d+)$/, "Sun Court $1"]
  ,[/^灰盟 (\d+)$/, "Grey Pact $1"]
  ,[/^(.+) 的选择$/, "$1's choice"]
  ,[/^你在 (\d+) 轮中选择合作 (\d+) 次、背叛 (\d+) 次。$/, "You cooperated $2 times and defected $3 times in $1 rounds."]
  ,[/^你获得 (\d+) 枚 · 对手获得 (\d+) 枚$/, "You gained $1 · Opponent gained $2"]
  ,[/^收益 ([\d.]+)$/, "Payoff $1"]
  ,[/^本轮你获得 ([\d.]+) 枚资源$/, "This round you gained $1 resources"]
  ,[/^你的估值 (\d+) 枚，对手估值 (\d+) 枚。现在所有私人估值都成了公开信息。$/, "Your value: $1. Rival value: $2. Both are now public."]
  ,[/^(.+) 的报价$/, "$1's bid"]
  ,[/^R(\d+) 赤 (\d+):(\d+)$/, "R$1 Red $2:$3"]
  ,[/^R(\d+) 蓝 (\d+):(\d+)$/, "R$1 Blue $2:$3"]
  ,[/^([夜袭采掘筑防]+) → (.+)$/, "Raid → $2"]
  ,[/^你选择了 (.+)，对方没有回应$/, "You chose $1. They chose someone else."]
  ,[/^(\d+) 处边域取胜$/, "$1 fronts won"]
  ,[/^价值 (\d+)$/, "Value $1"]
  ,[/^(.+) · 赞成$/, "$1 · YES"]
  ,[/^(.+) · 反对$/, "$1 · NO"]
  ,[/^四轮谈判中共有 (\d+) 次成交，你累计获得 (\d+) 枚金币。$/, "$1 deals closed. You earned $2 coins."]
  ,[/^你平均每轮投入 ([\d.]+) 枚，公共池平均规模 ([\d.]+)。$/, "You contributed $1 per round. Average pool size: $2."]
  ,[/^你赢下了 (\d+) 件拍品，总买方剩余为 ([\d.]+) 枚。$/, "You won $1 lots with $2 total buyer surplus."]
  ,[/^你有 (\d+) 次站到少数侧，在八轮中取得了 (\d+) 分。$/, "You joined the minority $1 times and scored $2 points."]
  ,[/^终局公开身份。(.+)取得 (\d+) 席，(.+)取得 (\d+) 席；你属于(.+)。$/, "All identities revealed. $1: $2 seats. $3: $4 seats. You were with $5."]
  ,[/^五轮结束后你保有 (\d+) 能量，发动 (\d+) 次夜袭，挡下 (\d+) 次劫掠。$/, "You finished with $1 energy, launched $2 raids, and blocked $3."]
  ,[/^七轮中共有 (\d+) 份盟约成立，你最终积累 (\d+) 分。$/, "$1 pacts formed. You finished with $2 points."]
  ,[/^三轮布阵共赢得 (\d+) 处边域，最终取得 (\d+) 声望。$/, "You won $1 fronts and finished with $2 prestige."]
];

const PHRASES = [
  ["策略家", "Strategist"],
  ["青隼家主", "Falcon House"],
  ["鹿庭议使", "Antler Envoy"],
  ["黑曜棋手", "Obsidian Player"],
  ["洛因", "Loyn"],
  ["白鸦", "White Crow"],
  ["枢机", "Cardinal"],
  ["岑夜", "Cen Ye"],
  ["铁砂", "Ironsand"],
  ["砂狐", "Sandfox"],
  ["牧鸦", "Rook"],
  ["铸城", "Forge"],
  ["千面", "Thousand"],
  ["青隼", "Falcon"],
  ["鹿角", "Antler"],
  ["黑曜", "Obsidian"],
  ["唐禾", "Tang He"],
  ["周策", "Zhou Ce"],
  ["闻先生", "Mr. Wen"],
  ["顾衡", "Gu Heng"],
  ["林回", "Lin Hui"],
  ["祁先生", "Mr. Qi"],
  ["阿岚", "Aran"],
  ["墨丘", "Mo Qiu"],
  ["砾石", "Gravel"],
  ["辛夷", "Xinyi"],
  ["灰隼", "Grey Falcon"],
  ["黑匣藏家", "Black-Box Collector"],
  ["白手套", "White Glove"],
  ["曜庭", "Sun Court"],
  ["灰盟", "Grey Pact"],
  ["曜", "S"],
  ["灰", "G"],
  ["计划投入", "Planned"],
  ["本轮", "This round"],
  ["博弈场", "Arena"],
  ["对局档案", "Archive"],
  ["累计对局", "Matches"],
  ["观察胜率", "Win rate"],
  ["累计得分", "Total score"],
  ["本地策略", "Local strategy"],
  ["你的累计", "Your total"],
  ["对手累计", "Opponent"],
  ["当前差势", "Score gap"],
  ["本轮结果", "Round result"],
  ["对局已结束", "Match complete"],
  ["查看结算", "View result"],
  ["进入下一轮", "Next round"],
  ["再来一局", "Play again"],
  ["选择其他博弈", "Choose another game"],
  ["最难", "Hardest"],
  ["分钟", "min"],
  ["轮", "rounds"],
  ["分", "pts"],
  ["枚", "coins"],
  ["席", "seats"],
  ["人", "players"]
];

const originals = new WeakMap();
const translatedAttributes = new WeakMap();

function translateText(source) {
  const leading = source.match(/^\s*/)?.[0] || "";
  const trailing = source.match(/\s*$/)?.[0] || "";
  const text = source.trim();
  if (!text || !/[\u3400-\u9fff]/.test(text)) return source;
  if (EN_EXACT[text]) return `${leading}${EN_EXACT[text]}${trailing}`;
  const quoteMatch = text.match(/^“(.+)”$/);
  if (quoteMatch && EN_EXACT[quoteMatch[1]]) {
    return `${leading}“${EN_EXACT[quoteMatch[1]]}”${trailing}`;
  }
  for (const [pattern, replacement] of REGEX_TRANSLATIONS) {
    if (pattern.test(text)) {
      let replaced = text.replace(pattern, replacement);
      for (const [phrase, value] of PHRASES) replaced = replaced.replaceAll(phrase, value);
      return `${leading}${replaced}${trailing}`;
    }
  }
  let result = text;
  for (const [phrase, replacement] of PHRASES) {
    result = result.replaceAll(phrase, replacement);
  }
  if (/[\u3400-\u9fff]/.test(result)) return source;
  return `${leading}${result}${trailing}`;
}

export function translateDOM(root = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (
      !["SCRIPT", "STYLE"].includes(walker.currentNode.parentElement?.tagName) &&
      !walker.currentNode.parentElement?.closest("[data-no-i18n]")
    ) {
      nodes.push(walker.currentNode);
    }
  }
  for (const node of nodes) {
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    const source = originals.get(node);
    node.nodeValue = language === "en" ? translateText(source) : source;
  }

  root.querySelectorAll?.("[placeholder], [aria-label], [title]").forEach((node) => {
    if (!translatedAttributes.has(node)) {
      translatedAttributes.set(node, {
        placeholder: node.getAttribute("placeholder"),
        ariaLabel: node.getAttribute("aria-label"),
        title: node.getAttribute("title")
      });
    }
    const saved = translatedAttributes.get(node);
    if (language === "en") {
      if (saved.placeholder) node.setAttribute("placeholder", translateText(saved.placeholder));
      if (saved.ariaLabel) node.setAttribute("aria-label", translateText(saved.ariaLabel));
      if (saved.title) node.setAttribute("title", translateText(saved.title));
    } else {
      if (saved.placeholder) node.setAttribute("placeholder", saved.placeholder);
      if (saved.ariaLabel) node.setAttribute("aria-label", saved.ariaLabel);
      if (saved.title) node.setAttribute("title", saved.title);
    }
  });
  updateLanguageButtons();
}
