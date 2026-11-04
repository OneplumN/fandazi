import {readOuting,peekOuting,consumeOuting} from "./games/outing-store.js";
import {buddyById,companionLine} from "./games/outing-model.js";
import {LazyRack} from "./lazy-rack.js";
import { newRunId } from "./games/economy.js";
import { GameCollection } from "./games/hub.js";
import { createExtraFoodIcons } from "./extra-food-icons.js";
import { BasketDock, CheckoutView, Modal } from "./checkout-ui.js";
import { extraIngredients } from "./extra-ingredients.js";
import { X, i, Hm } from "../vendor/react-runtime.js";

const vu = {
    leaf: "绿叶菜",
    mushroom: "菌藻",
    root: "根茎瓜果",
    tofu: "豆制品",
    meat: "丸滑海鲜",
    staple: "主食粉面",
    egg: "蛋与杂项",
  },
  Wi = ["leaf", "mushroom", "root", "tofu", "meat", "staple", "egg"],
  M2 = {
    shopName: "楼下那家麻辣烫",
    pricePerJin: 19.8,
    budgetDefault: 25,
    separatePricing: !1,
    priceGroups: { veg: 19.8, meat: 26.8, ball: 24.8, staple: 19.8 },
  },
  Bm = [
    [
      "spinach",
      "菠菜",
      "leaf",
      "leaf",
      "#5FA85B",
      "把",
      35,
      28,
      0.25,
      ["fiber", "leafy"],
      "veg",
      !0,
    ],
    [
      "lettuce",
      "生菜",
      "leaf",
      "leaf",
      "#7CC46A",
      "把",
      30,
      15,
      0.2,
      ["fiber", "leafy"],
      "veg",
      !0,
    ],
    [
      "youmaicai",
      "油麦菜",
      "leaf",
      "leaf",
      "#6FB35C",
      "把",
      35,
      20,
      0.25,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "tonghao",
      "茼蒿",
      "leaf",
      "leaf",
      "#83B85A",
      "把",
      30,
      25,
      0.25,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "xiaobaicai",
      "小白菜",
      "leaf",
      "leaf",
      "#9CCB79",
      "把",
      35,
      18,
      0.25,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "wawacai",
      "娃娃菜",
      "leaf",
      "leaf",
      "#C8DE9B",
      "片",
      40,
      16,
      0.3,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "kongxincai",
      "空心菜",
      "leaf",
      "leaf",
      "#4E9E55",
      "把",
      35,
      22,
      0.25,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "wandouxian",
      "豌豆尖",
      "leaf",
      "leaf",
      "#8FCB6B",
      "把",
      25,
      30,
      0.2,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "xiangcai",
      "香菜",
      "leaf",
      "leaf",
      "#57A05A",
      "把",
      10,
      33,
      0.2,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "jiucai",
      "韭菜",
      "leaf",
      "leaf",
      "#5E9E48",
      "把",
      30,
      26,
      0.25,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "muercai",
      "木耳菜",
      "leaf",
      "leaf",
      "#6AAE63",
      "把",
      35,
      20,
      0.3,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "kuju",
      "苦菊",
      "leaf",
      "leaf",
      "#8FBE72",
      "把",
      30,
      17,
      0.2,
      ["fiber", "leafy"],
      "veg",
    ],
    [
      "jinzhengu",
      "金针菇",
      "mushroom",
      "cap",
      "#E8D7A8",
      "朵",
      20,
      32,
      0.3,
      ["fiber"],
      "veg",
      !0,
    ],
    [
      "xianggu",
      "香菇",
      "mushroom",
      "cap",
      "#9C7A4E",
      "朵",
      15,
      26,
      0.35,
      ["fiber"],
      "veg",
    ],
    [
      "pinggu",
      "平菇",
      "mushroom",
      "cap",
      "#C8B79A",
      "朵",
      20,
      24,
      0.3,
      ["fiber"],
      "veg",
    ],
    [
      "xingbaogu",
      "杏鲍菇",
      "mushroom",
      "cap",
      "#DCCBB0",
      "片",
      25,
      35,
      0.4,
      ["fiber"],
      "veg",
    ],
    [
      "haixiangu",
      "海鲜菇",
      "mushroom",
      "cap",
      "#EADFC8",
      "朵",
      18,
      30,
      0.3,
      ["fiber"],
      "veg",
    ],
    [
      "muer",
      "木耳",
      "mushroom",
      "cap",
      "#5C4B47",
      "片",
      8,
      27,
      0.25,
      ["fiber"],
      "veg",
    ],
    [
      "haidaijie",
      "海带结",
      "mushroom",
      "knot",
      "#4F7A52",
      "结",
      12,
      13,
      0.5,
      ["fiber"],
      "veg",
      !0,
    ],
    [
      "qundaicai",
      "裙带菜",
      "mushroom",
      "leaf",
      "#5F8B57",
      "把",
      20,
      15,
      0.35,
      ["fiber"],
      "veg",
    ],
    [
      "yiner",
      "银耳",
      "mushroom",
      "cap",
      "#F0E8DA",
      "朵",
      25,
      26,
      0.2,
      ["fiber"],
      "veg",
    ],
    [
      "tudoupian",
      "土豆片",
      "root",
      "disc",
      "#E3C079",
      "片",
      12,
      77,
      0.75,
      ["carb"],
      "veg",
      !0,
    ],
    [
      "oupian",
      "藕片",
      "root",
      "disc",
      "#F0E2C8",
      "片",
      12,
      73,
      0.75,
      ["carb"],
      "veg",
    ],
    [
      "shanyao",
      "山药",
      "root",
      "disc",
      "#EFE6D2",
      "片",
      15,
      57,
      0.7,
      ["carb"],
      "veg",
    ],
    [
      "donggua",
      "冬瓜",
      "root",
      "cube",
      "#BFD9B4",
      "片",
      20,
      12,
      0.55,
      ["fiber"],
      "veg",
    ],
    [
      "nangua",
      "南瓜",
      "root",
      "cube",
      "#EFA24E",
      "块",
      25,
      26,
      0.6,
      ["carb"],
      "veg",
    ],
    [
      "bailuobo",
      "白萝卜",
      "root",
      "disc",
      "#F4F1E4",
      "片",
      15,
      16,
      0.55,
      ["fiber"],
      "veg",
    ],
    [
      "huluobo",
      "胡萝卜",
      "root",
      "disc",
      "#E8894A",
      "片",
      10,
      39,
      0.6,
      ["fiber"],
      "veg",
    ],
    [
      "wosun",
      "莴笋",
      "root",
      "disc",
      "#A9CE7E",
      "片",
      15,
      15,
      0.55,
      ["fiber"],
      "veg",
    ],
    [
      "huanggua",
      "黄瓜",
      "root",
      "disc",
      "#9FCF7A",
      "片",
      10,
      16,
      0.4,
      ["fiber"],
      "veg",
    ],
    [
      "fanqie",
      "番茄",
      "root",
      "cube",
      "#E4664F",
      "块",
      25,
      20,
      0.5,
      ["fiber"],
      "veg",
    ],
    [
      "yumi",
      "玉米段",
      "root",
      "cube",
      "#F2C94C",
      "段",
      40,
      112,
      0.8,
      ["carb"],
      "veg",
    ],
    [
      "doupi",
      "豆皮",
      "tofu",
      "strip",
      "#EFD9A8",
      "张",
      20,
      409,
      0.5,
      ["protein"],
      "veg",
    ],
    [
      "fuzhu",
      "腐竹",
      "tofu",
      "strip",
      "#E4C98E",
      "段",
      15,
      461,
      0.55,
      ["protein"],
      "veg",
    ],
    [
      "youdoufu",
      "油豆腐",
      "tofu",
      "cube",
      "#E2B266",
      "块",
      12,
      244,
      0.45,
      ["protein", "processed"],
      "veg",
      !0,
    ],
    [
      "dongdoufu",
      "冻豆腐",
      "tofu",
      "cube",
      "#F1E4C8",
      "块",
      30,
      92,
      0.4,
      ["protein"],
      "veg",
    ],
    [
      "doupao",
      "豆泡",
      "tofu",
      "cube",
      "#DDB271",
      "个",
      10,
      245,
      0.45,
      ["protein", "processed"],
      "veg",
    ],
    [
      "qianzhang",
      "千张",
      "tofu",
      "strip",
      "#F3E3BC",
      "张",
      20,
      262,
      0.5,
      ["protein"],
      "veg",
    ],
    [
      "dougan",
      "豆干",
      "tofu",
      "cube",
      "#D9B583",
      "块",
      20,
      140,
      0.55,
      ["protein"],
      "veg",
    ],
    [
      "suji",
      "素鸡",
      "tofu",
      "strip",
      "#E7CB9E",
      "块",
      25,
      192,
      0.6,
      ["protein"],
      "veg",
    ],
    [
      "doufu",
      "豆腐",
      "tofu",
      "cube",
      "#F7F1E2",
      "盒",
      80,
      82,
      0.6,
      ["protein"],
      "veg",
    ],
    [
      "doujie",
      "豆结",
      "tofu",
      "knot",
      "#E8CE9B",
      "结",
      10,
      180,
      0.5,
      ["protein"],
      "veg",
    ],
    [
      "niurouwan",
      "牛肉丸",
      "meat",
      "ball",
      "#B4715A",
      "颗",
      18,
      220,
      0.85,
      ["protein", "processed", "indulgent"],
      "ball",
      !0,
    ],
    [
      "yuwan",
      "鱼丸",
      "meat",
      "ball",
      "#E8E3D6",
      "颗",
      15,
      107,
      0.8,
      ["protein", "processed"],
      "ball",
    ],
    [
      "xiawan",
      "虾丸",
      "meat",
      "ball",
      "#F0B7A0",
      "颗",
      15,
      120,
      0.8,
      ["protein", "processed"],
      "ball",
    ],
    [
      "niaoniaoniurou",
      "撒尿牛丸",
      "meat",
      "ball",
      "#A96852",
      "颗",
      20,
      230,
      0.85,
      ["protein", "processed", "indulgent"],
      "ball",
    ],
    [
      "wucanrou",
      "午餐肉",
      "meat",
      "cube",
      "#D98E86",
      "片",
      15,
      229,
      0.8,
      ["protein", "processed", "indulgent"],
      "ball",
      !0,
    ],
    [
      "huotuichang",
      "火腿肠",
      "meat",
      "strip",
      "#D8766B",
      "根",
      30,
      212,
      0.8,
      ["protein", "processed"],
      "ball",
    ],
    [
      "peigen",
      "培根",
      "meat",
      "strip",
      "#C4665C",
      "片",
      10,
      181,
      0.7,
      ["protein", "processed"],
      "ball",
    ],
    [
      "jixiongrou",
      "鸡胸肉",
      "meat",
      "strip",
      "#F0D3B4",
      "片",
      25,
      133,
      0.7,
      ["protein"],
      "meat",
    ],
    [
      "feiniujuan",
      "肥牛卷",
      "meat",
      "strip",
      "#C4645C",
      "卷",
      20,
      250,
      0.75,
      ["protein", "indulgent"],
      "meat",
    ],
    [
      "yaxue",
      "鸭血",
      "meat",
      "cube",
      "#8E4A46",
      "块",
      25,
      108,
      0.7,
      ["protein"],
      "meat",
    ],
    [
      "maodu",
      "毛肚",
      "meat",
      "strip",
      "#C8A79E",
      "片",
      20,
      72,
      0.6,
      ["protein"],
      "meat",
    ],
    [
      "xiahua",
      "虾滑",
      "meat",
      "ball",
      "#F2B9A8",
      "勺",
      25,
      95,
      0.6,
      ["protein"],
      "ball",
    ],
    [
      "xiaosurou",
      "小酥肉",
      "meat",
      "cube",
      "#D9A05C",
      "块",
      20,
      300,
      0.7,
      ["protein", "processed", "indulgent"],
      "meat",
    ],
    [
      "yudoufu",
      "鱼豆腐",
      "meat",
      "cube",
      "#F0DCA8",
      "块",
      15,
      130,
      0.75,
      ["protein", "processed"],
      "ball",
    ],
    [
      "xieban",
      "蟹棒",
      "meat",
      "strip",
      "#E8796A",
      "根",
      12,
      125,
      0.7,
      ["protein", "processed"],
      "ball",
    ],
    [
      "kuanfen",
      "宽粉",
      "staple",
      "strip",
      "#EFE3C6",
      "卷",
      50,
      340,
      0.85,
      ["carb"],
      "staple",
      !0,
    ],
    [
      "xifen",
      "细粉",
      "staple",
      "strip",
      "#F2E9CF",
      "卷",
      40,
      330,
      0.85,
      ["carb"],
      "staple",
    ],
    [
      "fangbianmian",
      "方便面",
      "staple",
      "cube",
      "#F0D27A",
      "块",
      70,
      470,
      0.9,
      ["carb", "processed"],
      "staple",
    ],
    [
      "wudongmian",
      "乌冬面",
      "staple",
      "strip",
      "#F5EEDC",
      "份",
      80,
      137,
      0.85,
      ["carb"],
      "staple",
    ],
    [
      "niangao",
      "年糕",
      "staple",
      "disc",
      "#F6EDD8",
      "片",
      20,
      154,
      0.9,
      ["carb"],
      "staple",
    ],
    [
      "fensi",
      "粉丝",
      "staple",
      "strip",
      "#F7F1E0",
      "把",
      30,
      335,
      0.8,
      ["carb"],
      "staple",
    ],
    [
      "moyusi",
      "魔芋丝",
      "staple",
      "strip",
      "#E9E3D2",
      "把",
      40,
      7,
      0.5,
      ["fiber"],
      "staple",
    ],
    [
      "mifen",
      "米粉",
      "staple",
      "strip",
      "#F4EEDD",
      "份",
      60,
      350,
      0.85,
      ["carb"],
      "staple",
    ],
    [
      "youtiao",
      "油条",
      "staple",
      "strip",
      "#DDB25F",
      "根",
      40,
      388,
      0.6,
      ["carb", "processed"],
      "staple",
    ],
    [
      "anchundan",
      "鹌鹑蛋",
      "egg",
      "egg",
      "#F4E7C8",
      "颗",
      8,
      160,
      0.8,
      ["protein"],
      "ball",
    ],
    [
      "jidan",
      "鸡蛋",
      "egg",
      "egg",
      "#F6E3B0",
      "个",
      50,
      143,
      0.8,
      ["protein"],
      "ball",
    ],
    [
      "zhishiniangao",
      "芝士年糕",
      "egg",
      "cube",
      "#F5D98A",
      "块",
      25,
      250,
      0.85,
      ["carb", "indulgent"],
      "staple",
    ],
    [
      "xiaomahua",
      "小麻花",
      "egg",
      "knot",
      "#D9A85C",
      "个",
      15,
      440,
      0.7,
      ["carb", "processed"],
      "staple",
    ],
  ],
  qm = Bm.map((s, f) => ({
    id: s[0],
    name: s[1],
    category: s[2],
    shape: s[3],
    color: s[4],
    unitLabel: s[5],
    unitWeightG: s[6],
    kcalPer100g: s[7],
    density: s[8],
    tags: s[9],
    priceGroup: s[10],
    popular: s[11] ?? !1,
    note: s[12] ?? "",
    imageUrl: null,
    enabled: !0,
    sortOrder: f,
  })).concat(extraIngredients),
  Gm = [
    {
      title: "网传「青菜垫底再压别的会轻一点」，我们拿电子秤试了 3 盆",
      summary:
        "结论：秤上的数字一点没变。变的是你能往盆里塞多少——叶菜蓬松，先垫底会让盆「看起来满了」得更快。",
      body: `编辑部按三种摆法各装了一盆：叶菜垫底、叶菜铺顶、全部混着放，三盆食材完全相同。三次称重误差都在 2 克以内——电子秤测的是总重，和你先放什么、放中间还是放边缘毫无关系。

那为什么有人觉得「垫底更划算」？因为盆的容量是固定的。先放蓬松的绿叶菜，盆满得快，后面能塞进去的土豆片、宽粉、丸子就少了，总重自然低。这是「体积占位」，不是「称重变轻」。

真正影响重量的是另外两件事：一是带水，泡在水里的食材和刚喷过水的菜，抖两下能少好几十克；二是密度，冻豆腐、藕片、宽粉、丸子这类东西体积小、分量足，才是账单主力。`,
      sourceUrl: "https://news.qq.com/rain/a/20260916V01NEM00",
      publishedAt: "2026-09-16",
    },
    {
      title: "「不压秤」清单：这 8 样看着多，称起来轻",
      summary:
        "叶菜、菌菇、豆芽、海带结……它们的共同点是体积大、含水少、密度低。",
      body: `被反复点名的有：菠菜、生菜、茼蒿、油麦菜、豆芽、金针菇、海带结、木耳。共同特征是「抓一大把也没多少克」。

反过来，冻豆腐、豆泡、面筋、藕片、土豆片、宽粉、各类丸子体积小、密度高，是让账单突然变贵的主力。`,
      sourceUrl: "https://www.sohu.com/a/764305859_121119045",
      publishedAt: "2026-09-01",
    },
    {
      title: "「2.88 元/50 克」到底是什么价？换算完我沉默了",
      summary: "50 克计价是行业惯例，但它把 28.8 元/斤写得像 2.88 元。",
      body: `很多门店的价签按 50 克标价，比如绿豆芽 2.88 元/50 克——换算成斤就是 28.8 元/斤。看到价签先做一次乘法，能省下不少心理落差。

也有个别门店把「斤」当「公斤」录入系统，一顿吃出九十多元，事后解释为员工操作失误。称重前扫一眼秤上的单位，不吃亏。`,
      sourceUrl: "https://post.smzdm.com/p/ak8pg67e/",
      publishedAt: "2026-05-01",
    },
    {
      title: "“去皮”那点事：那口盆值多少钱",
      summary: "多家门店被曝出去皮不干净，单店能差 20–50 克，折合每单 1–2 元。",
      body: `监管部门的专项检查里，「空盆未完全去皮」是最常见的问题。20–50 克的差看起来很小，但按 20 元/斤算，每单就是一块多。

能做的很简单：称重时看一眼秤是否归零、盆是不是同一个。`,
      sourceUrl:
        "http://www.zgnt.net/jhwbszb/pc/c/202305/30/content_137548.html",
      publishedAt: "2026-05-30",
    },
    {
      title: "健身博主带火的「54321」搭配法，被做成了菜单",
      summary:
        "5 种蔬菜、4 种蛋白、3 种碳水、2 种菌藻、1 种汤底——听着复杂，其实就是别只夹丸子。",
      body: `这套比例来自健身博主帕梅拉的日常选菜习惯，后来被连锁品牌做成了「轻盈碗」。

它解决的是「吃多少种」而不是「花多少钱」：蔬菜给纤维和体积，蛋白给饱腹，菌藻凑口感和微量元素，碳水压轴。照这个比例夹，一般不会难吃，也不容易饿。`,
      sourceUrl: "https://m.163.com/dy/article/LADRAMI905527AC6.html",
      publishedAt: "2026-10-29",
    },
  ];
async function Ji(s, f, d = 4e3) {
  const r = new AbortController(),
    S = setTimeout(() => r.abort(), d);
  try {
    const g = await fetch(s, {
        ...f,
        credentials: "same-origin",
        signal: r.signal,
        headers: {
          ...(f?.body ? { "Content-Type": "application/json" } : {}),
          ...(f?.headers ?? {}),
        },
      }),
      O = await g.text(),
      D = O ? JSON.parse(O) : null;
    if (!g.ok) throw new Error((D && D.error) || `请求失败 ${g.status}`);
    return D;
  } finally {
    clearTimeout(S);
  }
}
const Wl = {
  get: (s) => Ji(s),
  post: (s, f) => Ji(s, { method: "POST", body: JSON.stringify(f ?? {}) }),
  patch: (s, f) => Ji(s, { method: "PATCH", body: JSON.stringify(f ?? {}) }),
  del: (s) => Ji(s, { method: "DELETE" }),
};
const STATIC_MODE = typeof __DAZI_STATIC__ !== "undefined" && __DAZI_STATIC__;
function builtInBootstrap(){return {ingredients:qm,news:Gm.map((s,f)=>({...s,id:f+1})),settings:M2,offline:true};}
async function Ym() {
  if(STATIC_MODE)return builtInBootstrap();
  try {
    const s = await Wl.get("/api/bootstrap");
    if (!s.ingredients?.length) throw new Error("empty");
    return { ...s, offline: !1 };
  } catch {
    return {
      ingredients: qm,
      news: Gm.map((s, f) => ({ ...s, id: f + 1 })),
      settings: M2,
      offline: !0,
    };
  }
}
const Yt = (s) => Math.max(0, Math.min(1, s));
function C2(s, f, d, r, S) {
  const g = d.weightG || 1,
    O = ["leaf", "mushroom", "root"];
  let D = 0,
    _ = 0,
    T = 0,
    A = 0,
    E = 0,
    Q = 0,
    G = 0,
    Z = 0;
  const I = new Set(),
    K = new Set(),
    rl = new Set();
  for (const Fl of s) {
    const vl = f.get(Fl.id);
    if (!vl || vl.enabled === !1 || Fl.qty <= 0) continue;
    const Dl = vl.unitWeightG * Fl.qty;
    (I.add(vl.category),
      K.add(vl.color),
      O.includes(vl.category) && (D += Dl),
      vl.tags.includes("protein") && (_ += Dl),
      (vl.category === "staple" || vl.tags.includes("carb")) && (T += Dl),
      vl.tags.includes("processed") && (A += Dl),
      vl.tags.includes("indulgent") && (E += Dl),
      vl.shape === "ball" && (Q += Fl.qty),
      vl.category === "leaf" && rl.add(vl.id),
      (G += vl.density * Dl),
      (vl.tags.includes("processed") ||
        vl.tags.includes("indulgent") ||
        vl.tags.includes("spicy")) &&
        (Z += Dl));
  }
  const Rl = { 清汤: 0, 微辣: 0.33, 中辣: 0.66, 爆辣: 1 }[r] ?? 0.33;
  return {
    weightG: d.weightG,
    price: d.price,
    kcal: d.kcal,
    portions: d.portions,
    uniqueItems: d.itemCount,
    categories: I.size,
    vegShare: D / g,
    proteinShare: _ / g,
    carbShare: T / g,
    processedShare: A / g,
    indulgentShare: E / g,
    ballUnits: Q,
    leafKinds: rl.size,
    colorVariety: K.size,
    avgDensity: G / g,
    spiceFit: Yt(1 - Math.abs(Rl - Z)),
    budgetRatio: S > 0 ? d.price / S : 0,
  };
}
function Zm(s) {
  return {
    veg: Yt(s.vegShare),
    protein: Yt(s.proteinShare / 0.35),
    carb: Yt(s.carbShare / 0.45),
    variety: Yt(s.categories / 7),
    processed: Yt(s.processedShare),
    indulgent: Yt(s.indulgentShare / 0.5),
    kcal: Yt(s.kcal / 900),
    price: Yt(s.price / 35),
    density: Yt(s.avgDensity),
    spicy: Yt(s.spiceFit),
    looks: Yt(s.colorVariety / 7),
  };
}
const wm = [
  {
    id: "save",
    name: "省钱狂魔",
    emoji: "🪙",
    blurb: "专挑轻的、不吸水的，盆堆得高，秤上数字小。",
    plan: { leaf: 3, mushroom: 2, root: 1, tofu: 1, meat: 1, staple: 1 },
    bias: { light: 1, cheap: 0.8, lowKcal: 0.2 },
  },
  {
    id: "balance",
    name: "均衡打工人",
    emoji: "🍱",
    blurb: "4 蔬菜 + 3 蛋白 + 2 菌藻 + 1 主食，54321 压缩成一餐。",
    plan: { leaf: 3, mushroom: 2, tofu: 1, meat: 3, staple: 1 },
    bias: { protein: 0.6, fiber: 0.5, light: 0.3 },
  },
  {
    id: "lean",
    name: "减脂轻盈",
    emoji: "🪶",
    blurb: "低热量高蛋白，主食只留一份，丸子基本绝缘。",
    plan: { leaf: 3, mushroom: 2, root: 1, tofu: 1, meat: 2, staple: 1 },
    bias: { lowKcal: 1, protein: 0.7, light: 0.3 },
  },
  {
    id: "treat",
    name: "放纵一顿",
    emoji: "🔥",
    blurb: "今天不管了，丸子年糕宽粉全都来。",
    plan: { leaf: 1, mushroom: 1, tofu: 1, meat: 4, staple: 3, egg: 1 },
    bias: { indulgent: 1, protein: 0.4, cheap: 0.1 },
  },
];
function Xm(s, f) {
  let d = 0;
  return (
    f.light && (d += f.light * (1 - s.density)),
    f.cheap && (d += f.cheap * (1 - Math.min(s.unitWeightG / 80, 1))),
    f.protein && (d += f.protein * (s.tags.includes("protein") ? 1 : 0)),
    f.lowKcal && (d += f.lowKcal * (1 - Math.min(s.kcalPer100g / 350, 1))),
    f.indulgent &&
      (d +=
        f.indulgent *
        (s.tags.includes("indulgent")
          ? 1
          : s.tags.includes("processed")
            ? 0.6
            : 0)),
    f.fiber && (d += f.fiber * (s.tags.includes("fiber") ? 1 : 0)),
    d
  );
}
function Vm(s, f, d = Math.random) {
  const r = f.filter((O) => O.enabled !== !1),
    S = [],
    g = new Set();
  for (const [O, D] of Object.entries(s.plan)) {
    const _ = r
      .filter((T) => T.category === O && !g.has(T.id))
      .map((T) => ({ i: T, s: Xm(T, s.bias) + d() * 0.35 }))
      .sort((T, A) => A.s - T.s);
    for (let T = 0; T < D; T += 1) {
      const A = _.filter((I) => !g.has(I.i.id));
      if (A.length === 0) break;
      const E = A.slice(0, 3),
        Q = d(),
        G = Q < 0.62 ? 0 : Q < 0.9 ? 1 : 2,
        Z = E[Math.min(G, E.length - 1)];
      (g.add(Z.i.id), S.push({ id: Z.i.id, qty: 1 }));
    }
  }
  return { preset: s, entries: S };
}
function z2(s, f = Math.random) {
  return wm.map((d) => Vm(d, s, f));
}
function km(s, f) {
  return f.separatePricing ? f.priceGroups[s.priceGroup] : f.pricePerJin;
}
function jn(s, f) {
  return s.unitWeightG * f;
}
function Fi(s, f, d) {
  return (jn(s, f) / 500) * km(s, d);
}
function Km(s, f) {
  return (jn(s, f) / 100) * s.kcalPer100g;
}
function Zf(s, f, d) {
  let r = 0,
    S = 0,
    g = 0,
    O = 0,
    D = 0;
  for (const _ of s) {
    const T = f.get(_.id);
    !T ||
      T.enabled === !1 ||
      _.qty <= 0 ||
      ((r += jn(T, _.qty)),
      (S += Fi(T, _.qty, d)),
      (g += Km(T, _.qty)),
      (O += _.qty),
      (D += 1));
  }
  return { weightG: r, price: S, kcal: g, portions: O, itemCount: D };
}
const Jm = 9;
function Wm(s, f) {
  switch (f.type) {
    case "add": {
      const d = s.entries.find((r) => r.id === f.id);
      return d
        ? d.qty >= Jm
          ? s
          : {
              ...s,
              entries: s.entries.map((r) =>
                r.id === f.id ? { ...r, qty: r.qty + 1 } : r,
              ),
            }
        : { ...s, entries: [...s.entries, { id: f.id, qty: 1 }] };
    }
    case "removeOne": {
      const d = s.entries.find((r) => r.id === f.id);
      return d
        ? d.qty <= 1
          ? { ...s, entries: s.entries.filter((r) => r.id !== f.id) }
          : {
              ...s,
              entries: s.entries.map((r) =>
                r.id === f.id ? { ...r, qty: r.qty - 1 } : r,
              ),
            }
        : s;
    }
    case "clear":
      return { ...s, entries: [], runId: newRunId("malatang") };
    case "apply":
      return { ...s, entries: f.entries };
    case "budget":
      return { ...s, budget: f.value };
    case "spice":
      return { ...s, spice: f.value };
    case "tab":
      return { ...s, tab: f.value };
    case "query":
      return { ...s, query: f.value };
    default:
      return s;
  }
}
function Fm(s) {
  let f = null;
  try {
    const d = localStorage.getItem("malatang.budget");
    d && (f = Number(d));
  } catch {
    f = null;
  }
  return {
    entries: [],
    runId: newRunId("malatang"),
    budget: f && Number.isFinite(f) && f > 0 ? f : s,
    spice: "中辣",
    tab: "all",
    query: "",
  };
}
const ot = "#3D2B23";
function H(s, f) {
  const d = parseInt(s.slice(1), 16),
    r = Math.max(0, Math.min(255, ((d >> 16) & 255) + Math.round(255 * f))),
    S = Math.max(0, Math.min(255, ((d >> 8) & 255) + Math.round(255 * f))),
    g = Math.max(0, Math.min(255, (d & 255) + Math.round(255 * f)));
  return `#${((r << 16) | (S << 8) | g).toString(16).padStart(6, "0")}`;
}
const z = {
    stroke: ot,
    strokeWidth: 2.4,
    strokeLinejoin: "round",
    strokeLinecap: "round",
  },
  B = {
    stroke: ot,
    strokeWidth: 1.6,
    strokeLinejoin: "round",
    strokeLinecap: "round",
    fill: "none",
  };
function Tl({ cx: s, cy: f, rx: d = 4, ry: r = 2.6 }) {
  return i.jsx("ellipse", {
    cx: s,
    cy: f,
    rx: d,
    ry: r,
    fill: "#fff",
    opacity: "0.42",
  });
}
function L({ x: s = 32, y: f = 36, mood: d = 0, scale: r = 1, eye: S = 2.4 }) {
  const g = 6.2 * r,
    O = s - g,
    D = s + g;
  return d === 2
    ? i.jsxs("g", {
        transform: `translate(${s} ${f}) scale(${r}) translate(${-s} ${-f})`,
        children: [
          i.jsx("path", {
            d: `M${O - 2} ${f} q2 -3 4 0`,
            ...B,
            strokeWidth: 1.9,
          }),
          i.jsx("path", {
            d: `M${D - 2} ${f} q2 -3 4 0`,
            ...B,
            strokeWidth: 1.9,
          }),
          i.jsx("path", {
            d: `M${s - 1.6} ${f + 5} q1.6 2 3.2 0`,
            ...B,
            strokeWidth: 1.5,
          }),
        ],
      })
    : i.jsxs("g", {
        transform: `translate(${s} ${f}) scale(${r}) translate(${-s} ${-f})`,
        children: [
          i.jsx("ellipse", { cx: O, cy: f, rx: S, ry: S * 1.32, fill: ot }),
          i.jsx("ellipse", { cx: D, cy: f, rx: S, ry: S * 1.32, fill: ot }),
          i.jsx("circle", { cx: O + 0.9, cy: f - 1.2, r: 0.9, fill: "#fff" }),
          i.jsx("circle", { cx: D + 0.9, cy: f - 1.2, r: 0.9, fill: "#fff" }),
          d === 0
            ? i.jsx("path", {
                d: `M${s - 3} ${f + 5.4} q3 2.8 6 0`,
                ...B,
                strokeWidth: 1.5,
              })
            : i.jsx("path", {
                d: `M${s - 3} ${f + 6} q1.5 -2 3 0 q1.5 2 3 0`,
                ...B,
                strokeWidth: 1.4,
              }),
        ],
      });
}
const $m = {
    anchundan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 10 C41 10 46 24 46 34 C46 44 40 51 32 51 C24 51 18 44 18 34 C18 24 23 10 32 10 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: H(s, -0.24),
            opacity: "0.7",
            children: [
              i.jsx("ellipse", { cx: "26", cy: "26", rx: "2", ry: "1.4" }),
              i.jsx("ellipse", { cx: "38", cy: "32", rx: "1.8", ry: "1.3" }),
              i.jsx("ellipse", { cx: "30", cy: "42", rx: "1.6", ry: "1.2" }),
              i.jsx("ellipse", { cx: "39", cy: "20", rx: "1.4", ry: "1" }),
            ],
          }),
          i.jsx(Tl, { cx: 26, cy: 20, rx: 3.4, ry: 2.4 }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.66 }),
        ],
      }),
    jidan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 8 C43 8 49 24 49 35 C49 46 42 54 32 54 C22 54 15 46 15 35 C15 24 21 8 32 8 Z",
            fill: s,
            ...z,
          }),
          i.jsx(Tl, { cx: 25, cy: 22, rx: 4.6, ry: 3.2 }),
          i.jsx("path", {
            d: "M20 36 Q24 44 30 47",
            ...B,
            strokeWidth: 1.6,
            stroke: "#fff",
            opacity: "0.5",
          }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.72 }),
        ],
      }),
    zhishiniangao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "16",
            width: "38",
            height: "34",
            rx: "9",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M20 22 Q32 18 44 22",
            ...B,
            strokeWidth: 1.4,
            stroke: "#fff",
            opacity: "0.5",
          }),
          i.jsx("path", {
            d: "M24 30 Q32 24 40 30 Q40 40 32 44 Q24 40 24 30 Z",
            fill: "#F6C453",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M28 33 Q32 30 36 33",
            ...B,
            strokeWidth: 1.2,
            stroke: "#fff",
            opacity: "0.7",
          }),
          i.jsx(L, { x: 32, y: 30, mood: f, scale: 0.55, eye: 2 }),
        ],
      }),
    xiaomahua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M18 46 C26 40 24 30 32 26 C40 22 38 14 46 12",
            fill: "none",
            stroke: s,
            strokeWidth: "11",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M18 46 C26 40 24 30 32 26 C40 22 38 14 46 12",
            fill: "none",
            stroke: ot,
            strokeWidth: "2.2",
            strokeLinecap: "round",
          }),
          i.jsxs("g", {
            stroke: H(s, -0.22),
            strokeWidth: "1.5",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M22 42 L26 38" }),
              i.jsx("path", { d: "M27 34 L31 30" }),
              i.jsx("path", { d: "M34 24 L38 20" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.54, eye: 2 }),
        ],
      }),
  },
  Im = {
    spinach: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 53 L32 44", ...B, strokeWidth: 2.6 }),
          i.jsx("path", {
            d: "M32 44 C22 37 20 22 28 13 C36 22 38 37 32 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 44 C24 41 16 33 16 24 C26 25 31 34 32 44 Z",
            fill: H(s, -0.12),
            ...z,
          }),
          i.jsx("path", {
            d: "M32 44 C40 41 48 33 48 24 C38 25 33 34 32 44 Z",
            fill: H(s, -0.12),
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "52",
            rx: "3.4",
            ry: "4.2",
            fill: "#C4574C",
            ...z,
          }),
          i.jsx(L, { x: 32, y: 29, mood: f, scale: 0.85 }),
        ],
      }),
    lettuce: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsxs("g", {
            fill: s,
            ...z,
            children: [
              i.jsx("circle", { cx: "32", cy: "33", r: "14" }),
              i.jsx("circle", { cx: "20", cy: "26", r: "7" }),
              i.jsx("circle", { cx: "44", cy: "26", r: "7" }),
              i.jsx("circle", { cx: "21", cy: "42", r: "7.5" }),
              i.jsx("circle", { cx: "43", cy: "42", r: "7.5" }),
              i.jsx("circle", { cx: "32", cy: "17", r: "7" }),
            ],
          }),
          i.jsx(Tl, { cx: 24, cy: 27, rx: 4.4, ry: 2.8 }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.9 }),
        ],
      }),
    youmaicai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [
            { x: 22, r: -10 },
            { x: 32, r: 0 },
            { x: 42, r: 10 },
          ].map(({ x: d, r }) =>
            i.jsx(
              "path",
              {
                d: `M${d} 52 C${d - 4} 42 ${d - 4} 22 ${d} 13 C${d + 4} 22 ${d + 4} 42 ${d} 52 Z`,
                fill: d === 32 ? s : H(s, -0.1),
                ...z,
                transform: `rotate(${r} ${d} 52)`,
              },
              d,
            ),
          ),
          i.jsx(L, { x: 32, y: 37, mood: f, scale: 0.8 }),
        ],
      }),
    tonghao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 55 L32 15", ...B, strokeWidth: 2.4 }),
          [45, 38, 22, 15].map((d) =>
            i.jsxs(
              "g",
              {
                children: [
                  i.jsx("ellipse", {
                    cx: "23",
                    cy: d,
                    rx: "6.2",
                    ry: "2.8",
                    fill: s,
                    ...z,
                    transform: `rotate(-22 23 ${d})`,
                  }),
                  i.jsx("ellipse", {
                    cx: "41",
                    cy: d,
                    rx: "6.2",
                    ry: "2.8",
                    fill: s,
                    ...z,
                    transform: `rotate(22 41 ${d})`,
                  }),
                ],
              },
              d,
            ),
          ),
          i.jsx("ellipse", {
            cx: "32",
            cy: "12",
            rx: "3.6",
            ry: "4.4",
            fill: s,
            ...z,
          }),
          i.jsx(L, { x: 32, y: 31, mood: f, scale: 0.75 }),
        ],
      }),
    xiaobaicai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M25 50 Q32 44 39 50 L37 58 L27 58 Z",
            fill: "#F3EFDC",
            ...z,
          }),
          i.jsx("path", {
            d: "M32 46 C20 42 16 28 22 17 C31 21 34 34 32 46 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 46 C44 42 48 28 42 17 C33 21 30 34 32 46 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", { d: "M32 46 L32 24", ...B, strokeWidth: 1.4 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.8 }),
        ],
      }),
    wawacai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 56 C20 52 15 34 19 16 C26 11 38 11 45 16 C49 34 44 52 32 56 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 54 C26 48 24 32 26 18 C30 16 34 16 38 18 C40 32 38 48 32 54 Z",
            fill: "#FBF4E0",
            ...z,
            strokeWidth: 1.6,
          }),
          i.jsx("path", { d: "M22 26 L22 40", ...B, strokeWidth: 1.2 }),
          i.jsx("path", { d: "M42 26 L42 40", ...B, strokeWidth: 1.2 }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.78 }),
        ],
      }),
    kongxincai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M30 58 C29 44 29 30 31 14",
            ...B,
            strokeWidth: 2.6,
          }),
          i.jsx("ellipse", {
            cx: "30",
            cy: "58",
            rx: "4.4",
            ry: "3",
            fill: "#F3EFDC",
            ...z,
          }),
          i.jsx("path", {
            d: "M31 14 C40 18 45 26 43 34 C35 32 31 24 31 14 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M31 22 C24 26 20 33 22 40 C29 37 31 30 31 22 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", { d: "M31 30 L31 44", ...B, strokeWidth: 1.2 }),
          i.jsx(L, { x: 31, y: 46, mood: f, scale: 0.72 }),
        ],
      }),
    wandouxian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 58 C32 48 32 40 33 32",
            ...B,
            strokeWidth: 2.4,
          }),
          i.jsx("path", {
            d: "M33 32 C40 28 44 20 40 14 C34 18 32 25 33 32 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M32 36 C25 33 20 25 23 18 C29 22 32 29 32 36 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", {
            d: "M33 32 C37 22 44 17 50 18 C47 24 41 29 33 32",
            ...B,
            strokeWidth: 1.8,
          }),
          i.jsx(L, { x: 32, y: 48, mood: f, scale: 0.7 }),
        ],
      }),
    xiangcai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 58 C31 46 31 34 32 24",
            ...B,
            strokeWidth: 2,
          }),
          [
            { x: 32, y: 16, r: 0 },
            { x: 21, y: 24, r: -40 },
            { x: 43, y: 24, r: 40 },
            { x: 25, y: 34, r: -70 },
            { x: 39, y: 34, r: 70 },
          ].map(({ x: d, y: r, r: S }) =>
            i.jsx(
              "g",
              {
                transform: `rotate(${S} ${d} ${r})`,
                children: i.jsx("ellipse", {
                  cx: d,
                  cy: r,
                  rx: "4.6",
                  ry: "7",
                  fill: s,
                  ...z,
                  strokeWidth: 2,
                }),
              },
              `${d}-${r}`,
            ),
          ),
          i.jsx(L, { x: 32, y: 47, mood: f, scale: 0.7 }),
        ],
      }),
    jiucai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [-12, -4, 4, 12].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${32 + d} 56 L${32 + d} 20 L${32 + d + 2.6} 13 L${32 + d + 2.6} 56 Z`,
                fill: r % 2 ? H(s, 0.34) : H(s, 0.12),
                ...z,
                strokeWidth: 2,
              },
              d,
            ),
          ),
          i.jsx("path", { d: "M18 53 L46 53", ...B, strokeWidth: 2.8 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.66 }),
        ],
      }),
    muercai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 56 L32 44", ...B, strokeWidth: 2.6 }),
          i.jsx("path", {
            d: "M32 44 C18 40 12 26 20 15 C29 11 40 16 44 26 C47 36 40 43 32 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M32 44 L30 20", ...B, strokeWidth: 1.3 }),
          i.jsx("path", { d: "M31 34 L21 28", ...B, strokeWidth: 1.2 }),
          i.jsx("path", { d: "M31 30 L41 23", ...B, strokeWidth: 1.2 }),
          i.jsx(Tl, { cx: 24, cy: 24, rx: 3.6, ry: 2.4 }),
          i.jsx(L, { x: 33, y: 35, mood: f, scale: 0.78 }),
        ],
      }),
    kuju: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", { d: "M32 56 L32 46", ...B, strokeWidth: 2.6 }),
          i.jsx("path", {
            d: "M32 46 L20 40 L24 35 L14 30 L22 25 L16 19 L26 18 L26 10 L32 14 L38 10 L38 18 L48 19 L42 25 L50 30 L40 35 L44 40 Z",
            fill: s,
            ...z,
          }),
          i.jsx(L, { x: 32, y: 28, mood: f, scale: 0.78 }),
        ],
      }),
  },
  Pm = {
    niurouwan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "18", fill: s, ...z }),
          i.jsxs("g", {
            stroke: H(s, -0.26),
            strokeWidth: "1.7",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M20 26 Q24 34 20 42" }),
              i.jsx("path", { d: "M32 18 Q36 26 32 34" }),
              i.jsx("path", { d: "M44 26 Q40 34 44 42" }),
            ],
          }),
          i.jsx(Tl, { cx: 24, cy: 25, rx: 4, ry: 2.6 }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.7 }),
        ],
      }),
    yuwan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "31", cy: "34", r: "17", fill: s, ...z }),
          i.jsx("path", {
            d: "M46 34 L55 26 L52 34 L55 42 Z",
            fill: H(s, -0.12),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(Tl, { cx: 24, cy: 26, rx: 4.4, ry: 2.8 }),
          i.jsx(L, { x: 31, y: 35, mood: f, scale: 0.72 }),
        ],
      }),
    xiawan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "18", fill: s, ...z }),
          i.jsx("path", {
            d: "M32 20 C40 22 44 30 40 38 C36 45 26 45 22 38",
            fill: "none",
            stroke: H(s, -0.2),
            strokeWidth: "2",
            strokeLinecap: "round",
          }),
          i.jsx(Tl, { cx: 24, cy: 26, rx: 4, ry: 2.6 }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.7 }),
        ],
      }),
    niaoniaoniurou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "35", r: "18", fill: s, ...z }),
          i.jsx("path", {
            d: "M26 19 Q32 12 38 19 Q34 22 30 21 Z",
            fill: "#F2A65A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 12 L32 7",
            ...B,
            strokeWidth: 2,
            stroke: "#F2A65A",
          }),
          i.jsxs("g", {
            stroke: H(s, -0.24),
            strokeWidth: "1.6",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M21 30 Q26 36 22 44" }),
              i.jsx("path", { d: "M43 30 Q38 36 42 44" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 38, mood: f, scale: 0.66 }),
        ],
      }),
    wucanrou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 24 L38 18 L50 26 L26 32 Z",
            fill: H(s, 0.12),
            ...z,
          }),
          i.jsx("path", {
            d: "M14 24 L26 32 L26 46 L14 38 Z",
            fill: H(s, -0.12),
            ...z,
          }),
          i.jsx("path", { d: "M26 32 L50 26 L50 40 L26 46 Z", fill: s, ...z }),
          i.jsxs("g", {
            fill: H(s, -0.28),
            opacity: "0.6",
            children: [
              i.jsx("circle", { cx: "33", cy: "36", r: "1.4" }),
              i.jsx("circle", { cx: "41", cy: "33", r: "1.2" }),
              i.jsx("circle", { cx: "38", cy: "42", r: "1.3" }),
            ],
          }),
          i.jsx(L, { x: 37, y: 38, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    huotuichang: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M20 16 Q32 10 44 16 L44 50 Q32 56 20 50 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M20 22 Q32 28 44 22",
            ...B,
            strokeWidth: 1.4,
            opacity: "0.5",
          }),
          i.jsx("path", { d: "M25 12 L27 18", ...B, strokeWidth: 2 }),
          i.jsx("path", { d: "M39 12 L37 18", ...B, strokeWidth: 2 }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "50",
            rx: "12",
            ry: "4",
            fill: H(s, -0.16),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(Tl, { cx: 26, cy: 28, rx: 3.4, ry: 5 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.66 }),
        ],
      }),
    peigen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M10 36 Q18 24 26 34 Q34 44 42 32 Q48 24 54 30 L54 40 Q46 46 40 40 Q32 30 24 40 Q16 48 10 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M12 38 Q20 30 26 38",
            ...B,
            strokeWidth: 1.4,
            stroke: "#F2E3D8",
          }),
          i.jsx("path", {
            d: "M32 38 Q38 30 44 36",
            ...B,
            strokeWidth: 1.4,
            stroke: "#F2E3D8",
          }),
          i.jsx(L, { x: 32, y: 37, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    jixiongrou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M16 24 Q28 14 44 20 Q54 28 48 40 Q38 52 24 46 Q14 40 16 24 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            stroke: H(s, -0.14),
            strokeWidth: "1.4",
            strokeLinecap: "round",
            opacity: "0.8",
            children: [
              i.jsx("path", { d: "M22 30 Q30 26 36 30" }),
              i.jsx("path", { d: "M22 38 Q32 34 40 39" }),
            ],
          }),
          i.jsx(Tl, { cx: 26, cy: 24, rx: 3.6, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.68 }),
        ],
      }),
    feiniujuan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M18 40 C12 32 18 20 30 18 C42 16 52 24 50 34 C48 44 36 48 28 44",
            fill: "none",
            stroke: s,
            strokeWidth: "11",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M18 40 C12 32 18 20 30 18 C42 16 52 24 50 34 C48 44 36 48 28 44",
            fill: "none",
            stroke: ot,
            strokeWidth: "2.2",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M22 28 Q30 24 38 28",
            ...B,
            strokeWidth: 1.6,
            stroke: "#F5E1DA",
          }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    yaxue: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 22 L32 14 L50 22 L50 42 L32 50 L14 42 Z",
            fill: H(s, -0.14),
            ...z,
          }),
          i.jsx("path", {
            d: "M14 22 L32 30 L32 50 L14 42 Z",
            fill: H(s, -0.24),
            ...z,
          }),
          i.jsx("path", { d: "M32 30 L50 22 L50 42 L32 50 Z", fill: s, ...z }),
          i.jsx("path", {
            d: "M20 26 L26 30",
            ...B,
            strokeWidth: 1.4,
            stroke: "#fff",
            opacity: "0.5",
          }),
          i.jsx(L, { x: 40, y: 36, mood: f, scale: 0.52, eye: 2 }),
        ],
      }),
    maodu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 30 L18 24 L24 30 L30 23 L36 30 L42 24 L48 30 L52 26 L52 42 L46 46 L40 40 L34 46 L28 40 L22 46 L16 42 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M18 36 L46 36",
            ...B,
            strokeWidth: 1.2,
            opacity: "0.5",
          }),
          i.jsx(L, { x: 32, y: 36, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    xiahua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 42 Q12 34 20 34 L46 34 Q52 34 52 42 Q52 48 44 48 L20 48 Q12 48 12 42 Z",
            fill: "#D9D2C4",
            ...z,
          }),
          i.jsx("path", {
            d: "M20 34 Q22 18 32 16 Q42 18 44 34 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 28 Q32 22 40 28",
            ...B,
            strokeWidth: 1.3,
            opacity: "0.6",
          }),
          i.jsx(Tl, { cx: 27, cy: 24, rx: 3.4, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 30, mood: f, scale: 0.62 }),
        ],
      }),
    xiaosurou: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M16 30 Q14 20 24 17 Q32 12 40 18 Q50 20 49 30 Q53 40 43 44 Q34 50 26 45 Q15 43 16 30 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: H(s, 0.14),
            opacity: "0.8",
            children: [
              i.jsx("circle", { cx: "25", cy: "24", r: "2" }),
              i.jsx("circle", { cx: "37", cy: "22", r: "1.7" }),
              i.jsx("circle", { cx: "42", cy: "34", r: "2" }),
              i.jsx("circle", { cx: "28", cy: "40", r: "1.8" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.66 }),
        ],
      }),
    yudoufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "20",
            width: "38",
            height: "30",
            rx: "8",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M13 28 Q32 34 51 28",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, -0.28),
            opacity: "0.7",
          }),
          i.jsx("path", {
            d: "M17 20 Q32 13 47 20",
            fill: H(s, 0.16),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx(Tl, { cx: 22, cy: 26, rx: 3.4, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 36, mood: f, scale: 0.66 }),
        ],
      }),
    xieban: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "16",
            y: "18",
            width: "32",
            height: "32",
            rx: "6",
            fill: "#F7E9DE",
            ...z,
            transform: "rotate(-12 32 34)",
          }),
          i.jsxs("g", {
            stroke: "#E8796A",
            strokeWidth: "7",
            strokeLinecap: "butt",
            opacity: "0.95",
            children: [
              i.jsx("path", { d: "M18 24 L30 24" }),
              i.jsx("path", { d: "M26 36 L38 36" }),
              i.jsx("path", { d: "M34 48 L46 48" }),
            ],
          }),
          i.jsx("rect", {
            x: "16",
            y: "18",
            width: "32",
            height: "32",
            rx: "6",
            fill: "none",
            ...z,
            transform: "rotate(-12 32 34)",
          }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
  },
  l3 = {
    jinzhengu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [20, 26, 32, 38, 44].map((d, r) =>
            i.jsxs(
              "g",
              {
                children: [
                  i.jsx("rect", {
                    x: d - 2.8,
                    y: "22",
                    width: "5.6",
                    height: "34",
                    rx: "2.8",
                    fill: "#F8F0D8",
                    ...z,
                    strokeWidth: 2,
                  }),
                  i.jsx("ellipse", {
                    cx: d,
                    cy: r === 2 ? 17 : 20,
                    rx: "5",
                    ry: "3.4",
                    fill: s,
                    ...z,
                    strokeWidth: 2.2,
                  }),
                ],
              },
              d,
            ),
          ),
          i.jsx(L, { x: 32, y: 42, mood: f, scale: 0.72 }),
        ],
      }),
    xianggu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M26 30 L26 50 Q32 54 38 50 L38 30",
            fill: "#EBD9B4",
            ...z,
          }),
          i.jsx("path", {
            d: "M9 32 Q10 11 32 11 Q54 11 55 32 Q44 25 32 25 Q20 25 9 32 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M22 19 L27 24", ...B, strokeWidth: 1.5 }),
          i.jsx("path", { d: "M42 19 L37 24", ...B, strokeWidth: 1.5 }),
          i.jsx("path", { d: "M32 15 L32 21", ...B, strokeWidth: 1.5 }),
          i.jsx(Tl, { cx: 21, cy: 20, rx: 3.4, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 37, mood: f, scale: 0.75 }),
        ],
      }),
    pinggu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M28 40 L28 52 Q32 55 36 52 L36 40",
            fill: "#E9DCC0",
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("path", {
            d: "M11 38 Q13 14 32 14 Q51 14 53 38 Q43 31 32 31 Q21 31 11 38 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M20 33 Q24 22 30 17", ...B, strokeWidth: 1.4 }),
          i.jsx("path", { d: "M32 31 Q32 22 32 15", ...B, strokeWidth: 1.4 }),
          i.jsx("path", { d: "M44 33 Q40 22 34 17", ...B, strokeWidth: 1.4 }),
          i.jsx(L, { x: 32, y: 42, mood: f, scale: 0.7 }),
        ],
      }),
    xingbaogu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "23",
            y: "24",
            width: "18",
            height: "30",
            rx: "8",
            fill: "#EFE2C6",
            ...z,
          }),
          i.jsx("path", {
            d: "M14 26 Q16 14 32 14 Q48 14 50 26 Q41 22 32 22 Q23 22 14 26 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M28 34 L28 48", ...B, strokeWidth: 1.3 }),
          i.jsx("path", { d: "M36 34 L36 48", ...B, strokeWidth: 1.3 }),
          i.jsx(L, { x: 32, y: 38, mood: f, scale: 0.72 }),
        ],
      }),
    haixiangu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [24, 32, 40].map((d, r) =>
            i.jsxs(
              "g",
              {
                children: [
                  i.jsx("rect", {
                    x: d - 3.2,
                    y: "18",
                    width: "6.4",
                    height: "38",
                    rx: "3.2",
                    fill: "#FBF6E6",
                    ...z,
                    strokeWidth: 2,
                  }),
                  i.jsx("ellipse", {
                    cx: d,
                    cy: r === 1 ? 14 : 17,
                    rx: "6",
                    ry: "4",
                    fill: s,
                    ...z,
                    strokeWidth: 2.2,
                  }),
                ],
              },
              d,
            ),
          ),
          i.jsx(L, { x: 32, y: 42, mood: f, scale: 0.7 }),
        ],
      }),
    muer: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M15 45 C9 34 14 18 26 13 C37 8 49 15 51 27 C53 39 43 50 31 50 C25 50 19 48 15 45 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M22 40 C18 32 22 22 31 19 C40 16 45 22 45 30",
            fill: "none",
            stroke: H(s, 0.22),
            strokeWidth: "2.4",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M26 44 C24 36 27 28 34 26",
            fill: "none",
            stroke: H(s, 0.22),
            strokeWidth: "1.8",
            strokeLinecap: "round",
          }),
          i.jsx(Tl, { cx: 24, cy: 22, rx: 4, ry: 2.4 }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.72 }),
        ],
      }),
    haidaijie: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: `M20 18 C30 12 44 16 47 26 C50 36 42 44 32 44 C22 44 14 36 17 26 C18 22 19 20 20 18 Z
           M32 26 C28 26 25 29 25 33 C25 37 28 40 32 40 C36 40 39 37 39 33 C39 29 36 26 32 26 Z`,
            fill: s,
            ...z,
            fillRule: "evenodd",
          }),
          i.jsx("path", {
            d: "M20 20 C26 26 30 30 32 36",
            ...B,
            strokeWidth: 1.5,
            stroke: H(s, 0.2),
          }),
          i.jsx("path", {
            d: "M44 20 C38 26 34 30 32 36",
            ...B,
            strokeWidth: 1.5,
            stroke: H(s, 0.2),
          }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.62 }),
        ],
      }),
    qundaicai: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M22 56 C14 47 24 37 18 27 C14 19 20 12 28 10 C36 8 44 13 43 21 C42 29 34 33 37 41 C40 49 32 54 27 56 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M26 14 C24 24 30 32 26 46",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, 0.2),
          }),
          i.jsx("path", {
            d: "M36 15 C34 25 39 33 35 47",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, 0.2),
          }),
          i.jsx(Tl, { cx: 26, cy: 22, rx: 3.2, ry: 2 }),
          i.jsx(L, { x: 31, y: 33, mood: f, scale: 0.66 }),
        ],
      }),
    yiner: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsxs("g", {
            fill: s,
            ...z,
            strokeWidth: 2.2,
            children: [
              i.jsx("ellipse", { cx: "32", cy: "20", rx: "9", ry: "7" }),
              i.jsx("ellipse", {
                cx: "19",
                cy: "30",
                rx: "8.5",
                ry: "6.5",
                transform: "rotate(-25 19 30)",
              }),
              i.jsx("ellipse", {
                cx: "45",
                cy: "30",
                rx: "8.5",
                ry: "6.5",
                transform: "rotate(25 45 30)",
              }),
              i.jsx("ellipse", {
                cx: "24",
                cy: "43",
                rx: "8",
                ry: "6",
                transform: "rotate(15 24 43)",
              }),
              i.jsx("ellipse", {
                cx: "40",
                cy: "43",
                rx: "8",
                ry: "6",
                transform: "rotate(-15 40 43)",
              }),
            ],
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "32",
            rx: "7",
            ry: "6",
            fill: H(s, 0.06),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.6 }),
        ],
      }),
  },
  t3 = {
    tudoupian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "34",
            rx: "21",
            ry: "15",
            fill: s,
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "34",
            rx: "21",
            ry: "15",
            fill: "none",
            stroke: H(s, -0.22),
            strokeWidth: "4",
            opacity: "0.55",
          }),
          i.jsxs("g", {
            fill: H(s, -0.3),
            opacity: "0.55",
            children: [
              i.jsx("circle", { cx: "22", cy: "27", r: "1.4" }),
              i.jsx("circle", { cx: "41", cy: "31", r: "1.3" }),
              i.jsx("circle", { cx: "30", cy: "42", r: "1.2" }),
            ],
          }),
          i.jsx(Tl, { cx: 24, cy: 27, rx: 4.4, ry: 2.4 }),
          i.jsx(L, { x: 33, y: 34, mood: f, scale: 0.72 }),
        ],
      }),
    oupian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "33", r: "20", fill: s, ...z }),
          i.jsx("circle", {
            cx: "32",
            cy: "33",
            r: "20",
            fill: "none",
            stroke: H(s, -0.16),
            strokeWidth: "3.4",
            opacity: "0.6",
          }),
          i.jsxs("g", {
            fill: H(s, -0.34),
            stroke: ot,
            strokeWidth: "1.4",
            children: [
              i.jsx("ellipse", { cx: "32", cy: "25", rx: "3.2", ry: "3.8" }),
              i.jsx("ellipse", { cx: "25", cy: "29", rx: "2.6", ry: "3" }),
              i.jsx("ellipse", { cx: "39", cy: "29", rx: "2.6", ry: "3" }),
              i.jsx("ellipse", { cx: "24", cy: "37", rx: "2.4", ry: "2.8" }),
              i.jsx("ellipse", { cx: "40", cy: "37", rx: "2.4", ry: "2.8" }),
              i.jsx("ellipse", { cx: "32", cy: "40", rx: "2.6", ry: "2.8" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.52, eye: 2 }),
        ],
      }),
    shanyao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "18",
            y: "14",
            width: "28",
            height: "38",
            rx: "14",
            fill: s,
            ...z,
            transform: "rotate(-8 32 33)",
          }),
          i.jsxs("g", {
            stroke: H(s, -0.2),
            strokeWidth: "1.4",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M24 22 L22 30" }),
              i.jsx("path", { d: "M32 18 L30 26" }),
              i.jsx("path", { d: "M40 22 L38 30" }),
              i.jsx("path", { d: "M26 44 L24 50" }),
              i.jsx("path", { d: "M38 44 L40 50" }),
            ],
          }),
          i.jsx(Tl, { cx: 25, cy: 24, rx: 3.6, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.74 }),
        ],
      }),
    donggua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 44 Q12 16 32 16 Q52 16 52 44 Q32 52 12 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M12 44 Q32 52 52 44 L52 38 Q32 46 12 38 Z",
            fill: "#4E7A45",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M20 24 Q26 30 24 42",
            ...B,
            strokeWidth: 1.3,
            stroke: "#fff",
          }),
          i.jsx(Tl, { cx: 24, cy: 26, rx: 3.4, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.72 }),
        ],
      }),
    nangua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 42 Q14 18 32 18 Q50 18 50 42 Q32 50 14 42 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 20 Q22 32 24 46",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, -0.28),
          }),
          i.jsx("path", {
            d: "M40 20 Q42 32 40 46",
            ...B,
            strokeWidth: 1.4,
            stroke: H(s, -0.28),
          }),
          i.jsx("path", {
            d: "M32 18 L32 46",
            ...B,
            strokeWidth: 1.2,
            stroke: H(s, -0.2),
          }),
          i.jsx("path", {
            d: "M32 18 Q35 12 40 13",
            ...B,
            strokeWidth: 2.2,
            stroke: "#5C8A4A",
          }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.7 }),
        ],
      }),
    bailuobo: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M24 12 Q32 8 40 12 L42 30 Q40 48 32 54 Q24 48 22 30 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M30 50 Q26 52 26 56", ...B, strokeWidth: 1.6 }),
          i.jsx("path", { d: "M34 50 Q38 52 38 56", ...B, strokeWidth: 1.6 }),
          i.jsx("path", {
            d: "M32 14 L32 20",
            ...B,
            strokeWidth: 1.6,
            stroke: "#6B9E58",
          }),
          i.jsx("path", {
            d: "M32 14 Q27 10 24 11",
            ...B,
            strokeWidth: 1.6,
            stroke: "#6B9E58",
          }),
          i.jsx("path", {
            d: "M32 14 Q37 10 40 11",
            ...B,
            strokeWidth: 1.6,
            stroke: "#6B9E58",
          }),
          i.jsx(Tl, { cx: 27, cy: 24, rx: 3.2, ry: 4 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.7 }),
        ],
      }),
    huluobo: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 56 Q22 40 24 18 Q32 14 40 18 Q42 40 32 56 Z",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            stroke: H(s, -0.26),
            strokeWidth: "1.5",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M26 26 L33 24" }),
              i.jsx("path", { d: "M26 34 L34 32" }),
              i.jsx("path", { d: "M27 42 L33 41" }),
            ],
          }),
          i.jsx("path", {
            d: "M32 16 C28 10 24 8 21 9 C25 13 28 15 32 16 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 16 C36 10 40 8 43 9 C39 13 36 15 32 16 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.68 }),
        ],
      }),
    wosun: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "20",
            y: "10",
            width: "24",
            height: "44",
            rx: "11",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            stroke: H(s, -0.2),
            strokeWidth: "1.4",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M26 18 L26 46" }),
              i.jsx("path", { d: "M32 16 L32 48" }),
              i.jsx("path", { d: "M38 18 L38 46" }),
            ],
          }),
          i.jsx("path", {
            d: "M20 20 Q14 16 13 10",
            ...B,
            strokeWidth: 2,
            stroke: "#5C8A4A",
          }),
          i.jsx("path", {
            d: "M44 20 Q50 16 51 10",
            ...B,
            strokeWidth: 2,
            stroke: "#5C8A4A",
          }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.7 }),
        ],
      }),
    huanggua: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "16",
            y: "14",
            width: "32",
            height: "40",
            rx: "16",
            fill: s,
            ...z,
            transform: "rotate(-12 32 34)",
          }),
          i.jsxs("g", {
            fill: H(s, -0.3),
            opacity: "0.7",
            children: [
              i.jsx("circle", { cx: "25", cy: "24", r: "1.3" }),
              i.jsx("circle", { cx: "33", cy: "30", r: "1.3" }),
              i.jsx("circle", { cx: "27", cy: "38", r: "1.2" }),
              i.jsx("circle", { cx: "39", cy: "42", r: "1.2" }),
              i.jsx("circle", { cx: "22", cy: "32", r: "1.1" }),
            ],
          }),
          i.jsx(Tl, { cx: 25, cy: 23, rx: 3.4, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.7 }),
        ],
      }),
    fanqie: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "35", r: "19", fill: s, ...z }),
          i.jsx("path", {
            d: "M32 17 L24 12 L27 19 L20 19 L27 23 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 17 L40 12 L37 19 L44 19 L37 23 Z",
            fill: "#5C8A4A",
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("path", {
            d: "M32 17 L32 25",
            ...B,
            strokeWidth: 2.4,
            stroke: "#5C8A4A",
          }),
          i.jsx(Tl, { cx: 24, cy: 28, rx: 4.6, ry: 3 }),
          i.jsx(L, { x: 32, y: 36, mood: f, scale: 0.78 }),
        ],
      }),
    yumi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "18",
            y: "14",
            width: "28",
            height: "40",
            rx: "13",
            fill: s,
            ...z,
          }),
          i.jsx("g", {
            fill: H(s, 0.16),
            opacity: "0.9",
            children: [24, 33, 42].flatMap((d) =>
              [24, 32, 40].map((r) =>
                i.jsx("circle", { cx: r, cy: d, r: "2.6" }, `${r}-${d}`),
              ),
            ),
          }),
          i.jsx("path", {
            d: "M18 18 Q10 16 10 26 Q10 34 18 32",
            fill: "#6B9E58",
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("path", {
            d: "M46 18 Q54 16 54 26 Q54 34 46 32",
            fill: "#6B9E58",
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.66 }),
        ],
      }),
  },
  e3 = {
    kuanfen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 40 C12 24 20 16 32 16 C44 16 52 24 52 40 C52 48 44 52 32 52 C20 52 12 48 12 40 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M20 26 Q32 20 44 26",
            ...B,
            strokeWidth: 1.4,
            stroke: "#fff",
            opacity: "0.55",
          }),
          i.jsx("path", {
            d: "M18 34 Q32 28 46 34",
            ...B,
            strokeWidth: 1.2,
            stroke: H(s, -0.14),
            opacity: "0.6",
          }),
          i.jsx(L, { x: 32, y: 38, mood: f, scale: 0.66 }),
        ],
      }),
    xifen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [18, 23, 28, 33, 38, 43, 48].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${d} 54 C${d - 4} 42 ${d + 4} 30 ${d} 18`,
                fill: "none",
                stroke: r % 2 ? H(s, -0.1) : s,
                strokeWidth: "4.6",
                strokeLinecap: "round",
              },
              d,
            ),
          ),
          i.jsxs("g", {
            fill: "none",
            stroke: ot,
            strokeWidth: "1.6",
            strokeLinecap: "round",
            opacity: "0.75",
            children: [
              i.jsx("path", { d: "M18 50 C15 38 20 28 18 20" }),
              i.jsx("path", { d: "M48 50 C45 38 51 28 48 20" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 38, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    fangbianmian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", {
            cx: "32",
            cy: "34",
            r: "19",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("path", {
            d: "M17 30 Q24 20 32 30 Q40 40 47 30",
            fill: "none",
            stroke: H(s, -0.2),
            strokeWidth: "3",
            strokeLinecap: "round",
          }),
          i.jsx("path", {
            d: "M16 38 Q24 28 32 38 Q40 48 48 38",
            fill: "none",
            stroke: H(s, -0.2),
            strokeWidth: "3",
            strokeLinecap: "round",
          }),
          i.jsx(Tl, { cx: 24, cy: 24, rx: 4, ry: 2.6 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    wudongmian: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [20, 32, 44].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${d} 54 C${d - 8} 42 ${d + 8} 30 ${d} 18`,
                fill: "none",
                stroke: r === 1 ? s : H(s, -0.06),
                strokeWidth: "9.5",
                strokeLinecap: "round",
              },
              d,
            ),
          ),
          i.jsxs("g", {
            fill: "none",
            stroke: ot,
            strokeWidth: "2",
            strokeLinecap: "round",
            children: [
              i.jsx("path", { d: "M20 52 C13 41 26 31 20 19" }),
              i.jsx("path", { d: "M44 52 C51 41 38 31 44 19" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.58, eye: 2 }),
        ],
      }),
    niangao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "40",
            rx: "19",
            ry: "10",
            fill: H(s, -0.14),
            ...z,
          }),
          i.jsx("rect", {
            x: "13",
            y: "22",
            width: "38",
            height: "18",
            fill: s,
            ...z,
            strokeWidth: 2.4,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "22",
            rx: "19",
            ry: "10",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "22",
            rx: "11",
            ry: "5.5",
            fill: "#fff",
            opacity: "0.35",
          }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    fensi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 22 Q32 14 50 22",
            ...B,
            strokeWidth: 2,
            stroke: H(s, -0.3),
          }),
          [20, 25, 30, 35, 40, 45].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${d} 22 L${d - 2} 52`,
                fill: "none",
                stroke: r % 2 ? H(s, -0.05) : s,
                strokeWidth: "2.4",
                strokeLinecap: "round",
                opacity: "0.9",
              },
              d,
            ),
          ),
          i.jsx(L, { x: 32, y: 38, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    moyusi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          [-10, 0, 10].map((d, r) =>
            i.jsx(
              "rect",
              {
                x: 31 + d - 4,
                y: "16",
                width: "9",
                height: "38",
                rx: "4",
                fill: r === 1 ? s : H(s, -0.08),
                opacity: "0.92",
                ...z,
                strokeWidth: 2,
                transform: `rotate(${d / 4} ${31 + d} 34)`,
              },
              d,
            ),
          ),
          i.jsx("path", {
            d: "M22 26 L42 26",
            ...B,
            strokeWidth: 1.2,
            stroke: "#fff",
            opacity: "0.6",
          }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    mifen: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M20 18 Q32 24 44 18",
            ...B,
            strokeWidth: 2.2,
            stroke: H(s, -0.24),
          }),
          [-12, -6, 0, 6, 12].map((d, r) =>
            i.jsx(
              "path",
              {
                d: `M${32 + d / 4} 20 Q${32 + d} 36 ${32 + d * 1.2} 52`,
                fill: "none",
                stroke: r % 2 ? H(s, -0.06) : s,
                strokeWidth: "3.2",
                strokeLinecap: "round",
              },
              d,
            ),
          ),
          i.jsx(L, { x: 32, y: 36, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    youtiao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 40 Q14 20 26 20 Q38 20 38 40 Z",
            fill: s,
            ...z,
            transform: "rotate(-8 26 30)",
          }),
          i.jsx("path", {
            d: "M28 44 Q28 24 40 24 Q52 24 52 44 Z",
            fill: H(s, -0.1),
            ...z,
            transform: "rotate(6 40 34)",
          }),
          i.jsxs("g", {
            fill: H(s, 0.18),
            opacity: "0.75",
            children: [
              i.jsx("circle", { cx: "22", cy: "28", r: "1.6" }),
              i.jsx("circle", { cx: "30", cy: "34", r: "1.5" }),
              i.jsx("circle", { cx: "40", cy: "32", r: "1.6" }),
              i.jsx("circle", { cx: "46", cy: "38", r: "1.4" }),
            ],
          }),
          i.jsx(L, { x: 31, y: 34, mood: f, scale: 0.5, eye: 2 }),
        ],
      }),
  },
  a3 = {
    doupi: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M14 22 Q32 14 50 22 L50 44 Q32 52 14 44 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", { d: "M14 22 Q20 30 18 44", ...B, strokeWidth: 1.4 }),
          i.jsx("path", {
            d: "M24 20 Q28 28 26 46",
            ...B,
            strokeWidth: 1.2,
            opacity: "0.6",
          }),
          i.jsx("path", {
            d: "M50 22 Q44 28 46 42 Q48 46 50 44",
            fill: H(s, -0.12),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx(L, { x: 33, y: 33, mood: f, scale: 0.7 }),
        ],
      }),
    fuzhu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M18 50 L18 22 Q18 12 28 12 L36 12 Q46 12 46 22 L46 50",
            fill: s,
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "16",
            rx: "10",
            ry: "5",
            fill: H(s, -0.18),
            ...z,
            strokeWidth: 2,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "16",
            rx: "4.6",
            ry: "2.2",
            fill: "#F7EEDB",
            ...z,
            strokeWidth: 1.4,
          }),
          i.jsx("path", {
            d: "M24 24 L24 46",
            ...B,
            strokeWidth: 1.2,
            stroke: H(s, -0.16),
          }),
          i.jsx(L, { x: 32, y: 36, mood: f, scale: 0.66 }),
        ],
      }),
    youdoufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "18",
            width: "38",
            height: "32",
            rx: "9",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M22 18 Q32 11 42 18",
            fill: H(s, 0.12),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "33",
            rx: "7",
            ry: "8",
            fill: H(s, -0.16),
            opacity: "0.5",
          }),
          i.jsx(Tl, { cx: 21, cy: 26, rx: 3.6, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.68 }),
        ],
      }),
    dongdoufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "18",
            width: "38",
            height: "32",
            rx: "7",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: H(s, -0.16),
            stroke: ot,
            strokeWidth: "1.1",
            opacity: "0.75",
            children: [
              i.jsx("circle", { cx: "22", cy: "26", r: "2.6" }),
              i.jsx("circle", { cx: "31", cy: "24", r: "3" }),
              i.jsx("circle", { cx: "41", cy: "27", r: "2.4" }),
              i.jsx("circle", { cx: "25", cy: "36", r: "2.2" }),
              i.jsx("circle", { cx: "36", cy: "34", r: "2.6" }),
              i.jsx("circle", { cx: "44", cy: "38", r: "2" }),
            ],
          }),
          i.jsx(L, { x: 31, y: 43, mood: f, scale: 0.56, eye: 2 }),
        ],
      }),
    doupao: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "19", fill: s, ...z }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "27",
            rx: "9",
            ry: "6",
            fill: H(s, -0.2),
            opacity: "0.55",
            ...z,
            strokeWidth: 1.6,
          }),
          i.jsx("path", { d: "M26 24 Q32 30 38 24", ...B, strokeWidth: 1.2 }),
          i.jsx(Tl, { cx: 22, cy: 30, rx: 3.4, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 38, mood: f, scale: 0.68 }),
        ],
      }),
    qianzhang: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M12 40 L32 30 L52 40 L32 50 Z",
            fill: H(s, -0.1),
            ...z,
          }),
          i.jsx("path", { d: "M12 32 L32 22 L52 32 L32 42 Z", fill: s, ...z }),
          i.jsx("path", {
            d: "M12 24 L32 14 L52 24 L32 34 Z",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("path", {
            d: "M20 22 Q26 26 24 30",
            ...B,
            strokeWidth: 1.1,
            opacity: "0.5",
          }),
          i.jsx(L, { x: 32, y: 24, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    dougan: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "14",
            y: "20",
            width: "36",
            height: "30",
            rx: "6",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M18 26 L46 26",
            ...B,
            strokeWidth: 1.3,
            stroke: H(s, -0.2),
          }),
          i.jsx("path", {
            d: "M18 33 L46 33",
            ...B,
            strokeWidth: 1.3,
            stroke: H(s, -0.2),
          }),
          i.jsx("path", {
            d: "M18 40 L46 40",
            ...B,
            strokeWidth: 1.3,
            stroke: H(s, -0.2),
          }),
          i.jsx(Tl, { cx: 22, cy: 24, rx: 3.2, ry: 2 }),
          i.jsx(L, { x: 32, y: 34, mood: f, scale: 0.66 }),
        ],
      }),
    suji: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "44",
            rx: "17",
            ry: "8",
            fill: H(s, -0.16),
            ...z,
          }),
          i.jsx("rect", {
            x: "15",
            y: "20",
            width: "34",
            height: "24",
            fill: s,
            ...z,
            strokeWidth: 2.4,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "20",
            rx: "17",
            ry: "8",
            fill: H(s, 0.1),
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "20",
            rx: "9",
            ry: "4",
            fill: H(s, -0.14),
            opacity: "0.6",
          }),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.62, eye: 2 }),
        ],
      }),
    doufu: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "14",
            y: "19",
            width: "36",
            height: "31",
            rx: "7",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M14 26 Q32 32 50 26",
            ...B,
            strokeWidth: 1.2,
            stroke: "#fff",
            opacity: "0.7",
          }),
          i.jsx("path", {
            d: "M50 30 Q46 36 49 42",
            ...B,
            strokeWidth: 1.6,
            stroke: "#fff",
            opacity: "0.6",
          }),
          i.jsx(Tl, { cx: 22, cy: 25, rx: 4, ry: 2.4 }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.68 }),
        ],
      }),
    doujie: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M20 24 C14 30 16 42 24 46 C30 49 38 47 42 42 C46 36 44 28 38 25 C32 22 26 22 20 24 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 26 L32 34 L40 26",
            ...B,
            strokeWidth: 1.6,
            opacity: "0.6",
          }),
          i.jsx("path", {
            d: "M20 22 Q14 16 18 12 Q24 12 26 18",
            fill: H(s, -0.1),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx("path", {
            d: "M44 22 Q50 16 46 12 Q40 12 38 18",
            fill: H(s, -0.1),
            ...z,
            strokeWidth: 2.2,
          }),
          i.jsx(L, { x: 32, y: 36, mood: f, scale: 0.62 }),
        ],
      }),
  },
  N2 = {
    ball: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "34", r: "17.5", fill: s, ...z }),
          i.jsx(Tl, { cx: 25, cy: 26, rx: 5, ry: 3 }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.72 }),
        ],
      }),
    disc: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("ellipse", {
            cx: "32",
            cy: "35",
            rx: "19.5",
            ry: "13.5",
            fill: s,
            ...z,
          }),
          i.jsx("ellipse", {
            cx: "32",
            cy: "35",
            rx: "13",
            ry: "8",
            fill: "#fff",
            opacity: "0.24",
          }),
          i.jsxs("g", {
            fill: H(s, -0.24),
            stroke: ot,
            strokeWidth: "1.1",
            children: [
              i.jsx("circle", { cx: "25", cy: "31", r: "1.9" }),
              i.jsx("circle", { cx: "35", cy: "31", r: "1.9" }),
              i.jsx("circle", { cx: "30", cy: "38", r: "1.9" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.62, eye: 2 }),
        ],
      }),
    cube: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("rect", {
            x: "13",
            y: "18",
            width: "38",
            height: "31",
            rx: "8",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M22 18 Q32 12 42 18",
            fill: s,
            stroke: ot,
            strokeWidth: "2.2",
          }),
          i.jsx(Tl, { cx: 22, cy: 26, rx: 3.4, ry: 2.2 }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.68 }),
        ],
      }),
    cap: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M11 33 Q11 11 32 11 Q53 11 53 33 Q41 28 32 28 Q23 28 11 33 Z",
            fill: s,
            ...z,
          }),
          i.jsx("path", {
            d: "M24 31 L24 47 Q32 51 40 47 L40 31",
            fill: s,
            ...z,
          }),
          i.jsxs("g", {
            fill: "#fff",
            opacity: "0.4",
            children: [
              i.jsx("circle", { cx: "24", cy: "23", r: "2.6" }),
              i.jsx("circle", { cx: "36", cy: "20", r: "2" }),
            ],
          }),
          i.jsx(L, { x: 32, y: 38, mood: f, scale: 0.62, eye: 2 }),
        ],
      }),
    leaf: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 47 L32 55",
            stroke: ot,
            strokeWidth: "2.6",
            strokeLinecap: "round",
          }),
          [-52, 0, 52].map((d, r) =>
            i.jsx(
              "g",
              {
                transform: `rotate(${d} 32 47)`,
                children: i.jsx("ellipse", {
                  cx: "32",
                  cy: "31",
                  rx: "8.4",
                  ry: "13.6",
                  fill: r === 0 ? H(s, -0.1) : s,
                  stroke: ot,
                  strokeWidth: "2.3",
                }),
              },
              d,
            ),
          ),
          i.jsx(L, { x: 32, y: 32, mood: f, scale: 0.6, eye: 2 }),
        ],
      }),
    strip: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M15 26 Q25 14 33 25 Q41 36 49 24 L49 36 Q41 48 33 37 Q25 26 15 38 Z",
            fill: s,
            ...z,
          }),
          i.jsx(Tl, { cx: 24, cy: 24, rx: 4, ry: 2.4 }),
          i.jsx(L, { x: 32, y: 30, mood: f, scale: 0.55, eye: 2 }),
        ],
      }),
    egg: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("path", {
            d: "M32 11 C42 11 48 26 48 36 C48 46 41 53 32 53 C23 53 16 46 16 36 C16 26 22 11 32 11 Z",
            fill: s,
            ...z,
          }),
          i.jsx(Tl, { cx: 25, cy: 24, rx: 4, ry: 2.6 }),
          i.jsx(L, { x: 32, y: 35, mood: f, scale: 0.7 }),
        ],
      }),
    knot: (s, f) =>
      i.jsxs(i.Fragment, {
        children: [
          i.jsx("circle", { cx: "32", cy: "33", r: "18", fill: s, ...z }),
          i.jsx("circle", {
            cx: "32",
            cy: "33",
            r: "7",
            fill: "#FFF8F0",
            stroke: ot,
            strokeWidth: "2.2",
          }),
          i.jsx(L, { x: 32, y: 33, mood: f, scale: 0.55, eye: 2 }),
        ],
      }),
  },
  A2 = { ...Im, ...l3, ...t3, ...a3, ...Pm, ...e3, ...$m,
    ...createExtraFoodIcons({Face: L, Shine: Tl, shade: H, outline: z, line: B}) };
function n3(s) {
  let f = 0;
  for (let d = 0; d < s.length; d += 1) f = (f * 31 + s.charCodeAt(d)) >>> 0;
  return f % 3;
}
Object.keys(A2).length;
function Ca({ id: s, shape: f, color: d, size: r = 56, seed: S }) {
  const O = n3(S ?? s ?? f),
    D = (s ? A2[s] : void 0) ?? N2[f] ?? N2.ball;
  return i.jsx("svg", {
    width: r,
    height: r,
    viewBox: "0 0 64 64",
    role: "img",
    "aria-hidden": "true",
    children: i.jsx("g", {
      transform: "translate(-5.5 -5.5) scale(1.22)",
      children: D(d, O),
    }),
  });
}
const u3 = 18;
function i3(s) {
  let f = 0;
  for (let d = 0; d < s.length; d += 1) f = (f * 31 + s.charCodeAt(d)) >>> 0;
  return f;
}
const qf = (s, f, d) => Math.max(f, Math.min(d, s));
function c3(s) {
  if (s <= 0) return [];
  if (s <= 3) return [s];
  if (s <= 5) return [s - 1, 1];
  const f = [];
  let d = s;
  for (; d > 0; ) {
    const r = Math.min(4, Math.max(2, Math.ceil(d * 0.6))),
      S = Math.min(d, r);
    (f.push(S), (d -= S));
  }
  return f;
}
function s3(s, f = u3) {
  const d = [],
    r = [...s]
      .filter((T) => T.qty > 0)
      .sort((T, A) => T.id.localeCompare(A.id));
  for (const T of r)
    for (let A = 0; A < T.qty; A += 1)
      d.push({ id: T.id, key: `${T.id}-${A}` });
  const S = d.length,
    g = d.slice(0, f),
    O = c3(g.length),
    D = [];
  let _ = 0;
  return (
    O.forEach((T, A) => {
      const E = Math.max(16, 44 - A * 8),
        Q = T > 1 ? E / (T - 1) : 0,
        G = A % 2 === 1 ? 2 : 0;
      for (let Z = 0; Z < T; Z += 1) {
        const I = g[_];
        if (!I) break;
        const K = i3(I.key),
          rl = ((K >>> 5) % 11) - 5,
          Rl = ((K >>> 11) % 9) - 4,
          Fl = T > 1 ? 50 - E / 2 + Z * Q : 50;
        (D.push({
          key: I.key,
          id: I.id,
          x: qf(Fl + rl * 0.45 + G * 0.6, 29, 71),
          y: qf(47 - A * 10 + Rl * 0.5, 24, 52),
          rot: ((K >>> 3) % 25) - 12,
          scale: qf(
            0.96 +
              (((K >>> 7) % 7) - 3) * 0.02 -
              Math.max(0, g.length - 8) * 0.022,
            0.66,
            1.06,
          ),
          z: 300 - A * 10 + Z,
          index: _,
        }),
          (_ += 1));
      }
    }),
    { tokens: D, overflow: Math.max(0, S - g.length), total: S }
  );
}
function f3({
  entries: s,
  byId: f,
  settings: d,
  onRemove: r,
  compact: S = !1,
}) {
  const { tokens: g, overflow: O } = X.useMemo(() => s3(s), [s]),
    D = S ? 34 : 62;
  return i.jsxs("div", {
    className: `bowl${S ? " bowl--compact" : ""}`,
    children: [
      i.jsxs("svg", {
        className: "bowl-back",
        viewBox: "0 0 320 142",
        preserveAspectRatio: "xMidYMid meet",
        "aria-hidden": "true",
        children: [
          i.jsxs("defs", {
            children: [
              i.jsxs("linearGradient", {
                id: "bowlGrad",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                  i.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
                  i.jsx("stop", { offset: "55%", stopColor: "#f6ecdc" }),
                  i.jsx("stop", { offset: "100%", stopColor: "#ddcbb0" }),
                ],
              }),
              i.jsxs("linearGradient", {
                id: "bowlSoup",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                  i.jsx("stop", { offset: "0%", stopColor: "#f9e8cb" }),
                  i.jsx("stop", { offset: "100%", stopColor: "#e6c496" }),
                ],
              }),
            ],
          }),
          i.jsx("path", {
            d: "M76 62 A84 78 0 0 0 244 62 Z",
            fill: "url(#bowlGrad)",
            stroke: "#3D2B23",
            strokeWidth: "3",
            strokeLinejoin: "round",
          }),
          i.jsx("ellipse", {
            cx: "160",
            cy: "62",
            rx: "84",
            ry: "26",
            fill: "url(#bowlSoup)",
            stroke: "#3D2B23",
            strokeWidth: "3",
          }),
          i.jsx("ellipse", {
            cx: "160",
            cy: "61",
            rx: "70",
            ry: "16",
            fill: "#e0b884",
            opacity: "0.5",
          }),
          i.jsx("path", {
            d: "M110 120 Q160 138 210 120",
            fill: "none",
            stroke: "#3D2B23",
            strokeWidth: "2",
            opacity: "0.12",
          }),
        ],
      }),
      i.jsx("div", {
        className: "bowl-items",
        children: g.map((_) => {
          const T = f.get(_.id);
          if (!T) return null;
          const A = `${T.name}，一份约 ${Math.round(jn(T, 1))} 克，${Fi(T, 1, d).toFixed(2)} 元，点一下拿掉一份`;
          return i.jsx(
            "button",
            {
              type: "button",
              className: "bowl-item",
              style: {
                left: `${_.x}%`,
                top: `${_.y}%`,
                transform: `translate(-50%, -50%) rotate(${_.rot}deg) scale(${_.scale})`,
                zIndex: _.z,
              },
              onClick: () => r(_.id),
              title: `${T.name} · 点一下拿掉一份`,
              "aria-label": A,
              children: i.jsx(Ca, {
                id: T.id,
                shape: T.shape,
                color: T.color,
                size: D,
              }),
            },
            _.key,
          );
        }),
      }),
      i.jsx("svg", {
        className: "bowl-front",
        viewBox: "0 0 320 142",
        preserveAspectRatio: "xMidYMid meet",
        "aria-hidden": "true",
        children: i.jsx("path", {
          d: "M76 64 Q160 88 244 64 L244 84 Q160 106 76 84 Z",
          fill: "url(#bowlGrad)",
          stroke: "#3D2B23",
          strokeWidth: "3",
          strokeLinejoin: "round",
        }),
      }),
      O > 0 && i.jsxs("span", { className: "bowl-more", children: ["+", O] }),
    ],
  });
}
const At = (s) => `¥${s.toFixed(2)}`;
function o3({
  settings: s,
  price: f,
  budget: d,
  over: r,
  onBudget: S,
  onNews: g,
  onSettings: O,
  onAdmin: D,
}) {
  return i.jsxs(i.Fragment, {
    children: [
      i.jsxs("header", {
        className: `hud${r ? " hud--over" : ""}`,
        children: [
          i.jsxs("div", {
            className: "hud-brand",
            children: [
              i.jsx("span", { className: "hud-logo", children: "🧺" }),
              i.jsxs("div", {
                children: [
                  i.jsx("b", { children: "麻辣搭子" }),
                  i.jsx("small", { children: s.shopName }),
                ],
              }),
            ],
          }),
          i.jsxs("label", {
            className: "budget",
            children: [
              i.jsx("span", { children: "本次预算" }),
              i.jsxs("span", {
                className: "budget-input",
                children: [
                  "¥",
                  i.jsx("input", {
                    type: "number",
                    min: 5,
                    max: 200,
                    step: 1,
                    value: d,
                    onChange: (_) => S(Number(_.target.value) || 0),
                    "aria-label": "本次预算",
                  }),
                ],
              }),
            ],
          }),
          i.jsxs("div", {
            className: "hud-actions",
            children: [
              i.jsx("button", {
                className: "icon-btn",
                onClick: g,
                title: "麻辣烫小报",
                "aria-label":"麻辣烫小报",
                type: "button",
                children: "📰",
              }),
              i.jsx("button", {
                className: "icon-btn",
                onClick: O,
                title: "单价设置",
                "aria-label":"单价设置",
                type: "button",
                children: "⚙️",
              }),
              i.jsx("button", {
                className: "icon-btn",
                onClick: D,
                title: "后台管理",
                "aria-label":"后台管理",
                type: "button",
                children: "🔑",
              }),
            ],
          }),
        ],
      }),
      r &&
        i.jsxs("div", {
          className: "overbar",
          children: ["⚠️ 超了 ", At(f - d), "，麻姐在看你 —— 但没说不让你夹"],
        }),
    ],
  });
}
function r3({
  entries: s,
  byId: f,
  settings: d,
  weight: r,
  price: S,
  onRemove: g,
  onClear: O,
  dense: D,
}) {
  return i.jsxs("section", {
    className: `basket${D ? " basket--dense" : ""}`,
    children: [
      i.jsxs("div", {
        className: "basket-head",
        children: [
          i.jsxs("h2", {
            children: [
              "🧺 你的盆 ",
              i.jsxs("i", { children: [s.length, " 样"] }),
            ],
          }),
          s.length > 0 &&
            i.jsx("button", {
              type: "button",
              className: "link-btn",
              onClick: O,
              children: "清空",
            }),
        ],
      }),
      s.length === 0
        ? i.jsxs("div", {
            className: "basket-empty",
            children: [
              i.jsx("span", { children: "🥢" }),
              i.jsx("p", { children: "点左边的食材，一筷子一筷子夹进来。" }),
            ],
          })
        : i.jsx("ul", {
            className: "basket-list",
            children: s.map((_) => {
              const T = f.get(_.id);
              return T
                ? i.jsxs(
                    "li",
                    {
                      className: "basket-row",
                      children: [
                        i.jsx(Ca, {
                          id: T.id,
                          shape: T.shape,
                          color: T.color,
                          size: 32,
                        }),
                        i.jsxs("span", {
                          className: "basket-name",
                          children: [
                            T.name,
                            i.jsxs("i", {
                              children: ["×", _.qty, " ", T.unitLabel],
                            }),
                          ],
                        }),
                        i.jsxs("span", {
                          className: "basket-num",
                          children: [
                            Math.round(jn(T, _.qty)),
                            "g",
                            i.jsx("i", { children: At(Fi(T, _.qty, d)) }),
                          ],
                        }),
                        i.jsx("button", {
                          type: "button",
                          className: "mini-btn",
                          onClick: () => g(_.id),
                          "aria-label": `拿掉一份${T.name}`,
                          children: "−",
                        }),
                      ],
                    },
                    _.id,
                  )
                : i.jsxs(
                    "li",
                    {
                      className: "basket-row basket-row--gone",
                      children: [
                        i.jsx("span", {
                          className: "basket-name",
                          children: "已下架的食材",
                        }),
                        i.jsx("button", {
                          type: "button",
                          className: "link-btn",
                          onClick: () => g(_.id),
                          children: "清掉",
                        }),
                      ],
                    },
                    _.id,
                  );
            }),
          }),
      i.jsxs("div", {
        className: "basket-foot",
        children: [
          i.jsxs("span", {
            children: [
              "合计 ",
              i.jsxs("b", { children: [Math.round(r), "g"] }),
            ],
          }),
          i.jsx("span", { className: "basket-total", children: At(S) }),
        ],
      }),
    ],
  });
}
function d3(props) {
  return i.jsx(BasketDock, { ...props, api: { Icon: Ca, Face:L, money: At, weight: jn, price: Fi } });
}
function h3({ news: s, onClose: f }) {
  return i.jsx("div", {
    className: "overlay",
    role: "dialog",
    "aria-modal": "true",
    onClick: f,
    children: i.jsxs("div", {
      className: "sheet sheet--news",
      onClick: (d) => d.stopPropagation(),
      children: [
        i.jsxs("header", {
          className: "sheet-head",
          children: [
            i.jsx("h2", { children: "📰 麻辣烫小报" }),
            i.jsx("button", {
              type: "button",
              className: "icon-btn",
              onClick: f,
              "aria-label": "关闭",
              children: "✕",
            }),
          ],
        }),
        i.jsxs("div", {
          className: "news-list",
          children: [
            s.map((d) =>
              i.jsxs(
                "article",
                {
                  className: "news-card",
                  children: [
                    i.jsx("h3", { children: d.title }),
                    i.jsx("p", {
                      className: "news-summary",
                      children: d.summary,
                    }),
                    i.jsx("div", {
                      className: "news-body",
                      children: d.body
                        .split(
                          `

`,
                        )
                        .map((r, S) => i.jsx("p", { children: r }, S)),
                    }),
                    i.jsxs("footer", {
                      className: "news-foot",
                      children: [
                        i.jsx("time", { children: d.publishedAt.slice(0, 10) }),
                        d.sourceUrl &&
                          i.jsx("a", {
                            href: d.sourceUrl,
                            target: "_blank",
                            rel: "noreferrer noopener",
                            children: "看原报道 →",
                          }),
                      ],
                    }),
                  ],
                },
                d.id,
              ),
            ),
            s.length === 0 &&
              i.jsx("p", { className: "empty", children: "小报还没印出来。" }),
          ],
        }),
      ],
    }),
  });
}
function m3(s) {
  let f = s >>> 0;
  return () => ((f = (f * 1664525 + 1013904223) >>> 0), f / 4294967295);
}
function y3({ ingredients: s, settings: f, byId: d, onApply: r, hasSelection }) {
  const [S, g] = X.useState(1),
    O = X.useMemo(() => z2(s, m3(S)), [s, S]);
  return i.jsxs("section", {
    className: "reco",
    children: [
      i.jsxs("div", {
        className: "reco-head",
        children: [
          i.jsx("p", { className:"reco-note",children:hasSelection?"选用搭配会替换当前食材，不扣金币。":"选一盆喜欢的，不扣金币。" }),
          i.jsx("button", {
            type: "button",
            className: "link-btn",
            onClick: () => g((D) => D + 1),
            children: "换一批",
          }),
        ],
      }),
      i.jsx("div", {
        className: "reco-list",
        children: O.map(({ preset: D, entries: _ }) => {
          const T = Zf(_, d, f),
            A = _.slice(0, 4);
          return i.jsxs(
            "div",
            {
              className: "reco-card",
              children: [
                i.jsxs("div", {
                  className: "reco-title",
                  children: [
                    i.jsx("span", { children: D.emoji }),
                    i.jsx("b", { children: D.name }),
                    i.jsx("i", { children: At(T.price) }),
                  ],
                }),
                i.jsx("p", { className: "reco-blurb", children: D.blurb }),
                i.jsxs("div", {
                  className: "reco-items",
                  children: [
                    A.map((E) => {
                      const Q = d.get(E.id);
                      return Q
                        ? i.jsx(
                            Ca,
                            {
                              id: Q.id,
                              shape: Q.shape,
                              color: Q.color,
                              size: 34,
                            },
                            E.id,
                          )
                        : null;
                    }),
                    i.jsxs("span", {
                      className: "reco-more",
                      children: [
                        "等 ",
                        _.length,
                        " 样 · ",
                        Math.round(T.weightG),
                        "g",
                      ],
                    }),
                  ],
                }),
                i.jsx("button", {
                  type: "button",
                  className: "btn btn--ghost",
                  onClick: () => r(_),
                  children: hasSelection?"换成这盆":"照着夹",
                }),
              ],
            },
            D.id,
          );
        }),
      }),
    ],
  });
}
function g3({ingredients,settings,byId,onApply,open,onClose,hasSelection}) {
  return open ? i.jsx(Modal,{title:"推荐搭配",panelId:"recommendations-dialog",className:"recommendation-overlay",onClose,children:i.jsx("div",{className:"detail-body",children:i.jsx(y3,{ingredients,settings,byId,onApply,hasSelection})})}) : null;
}
function v3({ settings: s, onSave: f, onClose: d }) {
  const [r, S] = X.useState(s),
    g = (O, D) => S((_) => ({ ..._, [O]: D }));
  return i.jsx("div", {
    className: "overlay",
    role: "dialog",
    "aria-modal": "true",
    onClick: d,
    children: i.jsxs("div", {
      className: "sheet sheet--narrow",
      onClick: (O) => O.stopPropagation(),
      children: [
        i.jsxs("header", {
          className: "sheet-head",
          children: [
            i.jsx("h2", { children: "⚙️ 门店设置" }),
            i.jsx("button", {
              type: "button",
              className: "icon-btn",
              onClick: d,
              "aria-label": "关闭",
              children: "✕",
            }),
          ],
        }),
        i.jsxs("div", {
          className: "form",
          children: [
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "门店名" }),
                i.jsx("input", {
                  value: r.shopName,
                  onChange: (O) => g("shopName", O.target.value),
                  maxLength: 20,
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "单价（元 / 斤）" }),
                i.jsx("input", {
                  type: "number",
                  step: "0.1",
                  min: 1,
                  max: 99,
                  value: r.pricePerJin,
                  onChange: (O) =>
                    g("pricePerJin", Number(O.target.value) || 0),
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "默认预算（元）" }),
                i.jsx("input", {
                  type: "number",
                  min: 5,
                  max: 200,
                  value: r.budgetDefault,
                  onChange: (O) =>
                    g("budgetDefault", Number(O.target.value) || 0),
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field field--row",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: r.separatePricing,
                  onChange: (O) => g("separatePricing", O.target.checked),
                }),
                i.jsx("span", { children: "荤素不同价（很多店是这样）" }),
              ],
            }),
            r.separatePricing &&
              i.jsx("div", {
                className: "price-grid",
                children: [
                  ["veg", "素菜"],
                  ["meat", "荤菜"],
                  ["ball", "丸滑"],
                  ["staple", "主食"],
                ].map(([O, D]) =>
                  i.jsxs(
                    "label",
                    {
                      className: "field",
                      children: [
                        i.jsxs("span", { children: [D, "（元/斤）"] }),
                        i.jsx("input", {
                          type: "number",
                          step: "0.1",
                          value: r.priceGroups[O],
                          onChange: (_) =>
                            g("priceGroups", {
                              ...r.priceGroups,
                              [O]: Number(_.target.value) || 0,
                            }),
                        }),
                      ],
                    },
                    O,
                  ),
                ),
              }),
          ],
        }),
        i.jsx("p", {
          className: "hint",
          children:
            "这里的修改只影响你这台设备的显示，方便按自家楼下那家店的价来算。",
        }),
        i.jsx("button", {
          type: "button",
          className: "btn btn--primary btn--block",
          onClick: () => f(r),
          children: "保存",
        }),
      ],
    }),
  });
}
const x3 = {
  leaf: "🥬",
  mushroom: "🍄",
  root: "🥕",
  tofu: "🧊",
  meat: "🍢",
  staple: "🍜",
  egg: "🥚",
};
function p3(s, f) {
  const d = f.separatePricing ? f.priceGroups[s.priceGroup] : f.pricePerJin;
  return (s.unitWeightG / 500) * d;
}
function j3({ ing: s, settings: f, qty: d, size: r, onAdd: S }) {
  return i.jsxs("button", {
    type: "button",
    className: `goods${d > 0 ? " goods--picked" : ""}`,
    onClick: (event) => S(s.id,event),
    title: `${s.name}　1 ${s.unitLabel} ≈ ${s.unitWeightG}g`,
    children: [
      i.jsx("span", {
        className: "goods-icon",
        children: i.jsx(Ca, {
          id: s.id,
          shape: s.shape,
          color: s.color,
          size: r,
        }),
      }),
      i.jsxs("span", {
        className: "goods-tag",
        children: [
          i.jsx("b", { children: s.name }),
          i.jsxs("i", {
            children: ["1", s.unitLabel, "≈", s.unitWeightG, "g"],
          }),
          i.jsxs("em", { children: [p3(s, f).toFixed(1), "元"] }),
        ],
      }),
      d > 0 && i.jsxs("span", { className: "goods-badge", children: ["×", d] }),
    ],
  });
}
function b3({
  ingredients: s,
  settings: f,
  qtyOf: d,
  onAdd: r,
  tab: S,
  query: g,
  onTab: O,
  onQuery: D,
}) {
  X.useMemo(() => {
    const G = new Map();
    for (const Z of s) G.set(Z.category, (G.get(Z.category) ?? 0) + 1);
    return G;
  }, [s]);
  const _ = X.useMemo(() => {
      const G = g.trim();
      return G
        ? s.filter((Z) => Z.name.includes(G) || Z.id.includes(G.toLowerCase()))
        : s;
    }, [s, g]),
    T = X.useMemo(
      () =>
        Wi.filter((G) => (S === "all" ? !0 : G === S)).map((G) => ({
          category: G,
          items: _.filter((Z) => Z.category === G),
        })),
      [_, S],
    ),
    A = X.useMemo(() => s.filter((G) => G.popular).slice(0, 6), [s]),
    E = S !== "all",
    Q = E ? 118 : 94;
  return i.jsxs("section", {
    className: "shelf",
    children: [
      i.jsxs("div", {
        className: "shelf-head",
        children: [
          i.jsxs("div", {
            className: "tabs",
            role: "tablist",
            children: [
              i.jsx("button", {
                type: "button",
                className: `tab${S === "all" ? " tab--on" : ""}`,
                onClick: () => O("all"),
                children: "全部",
              }),
              Wi.map((G) =>
                i.jsx(
                  "button",
                  {
                    type: "button",
                    className: `tab${S === G ? " tab--on" : ""}`,
                    onClick: () => O(G),
                    children: vu[G],
                  },
                  G,
                ),
              ),
            ],
          }),
          i.jsx("input", {
            className: "search",
            value: g,
            onChange: (G) => D(G.target.value),
            placeholder: "搜一下：宽粉 / 金针菇 / 毛肚",
            "aria-label": "搜索食材",
          }),
        ],
      }),
      S === "all" &&
        !g &&
        A.length > 0 &&
        i.jsxs("div", {
          className: "popular",
          children: [
            i.jsx("span", { className: "popular-label", children: "本店常点" }),
            A.map((G) =>
              i.jsxs(
                "button",
                {
                  type: "button",
                  className: "popular-chip",
                  onClick: () => r(G.id),
                  children: [
                    i.jsx(Ca, {
                      id: G.id,
                      shape: G.shape,
                      color: G.color,
                      size: 22,
                    }),
                    G.name,
                  ],
                },
                G.id,
              ),
            ),
          ],
        }),
      i.jsxs("div", {
        className: "racks",
        children: [
          T.map(({category:G,items:Z},index)=>Z.length?i.jsx(LazyRack,{category:G,items:Z,label:vu[G],emoji:x3[G],big:E,defer:S==="all"&&!g&&index>0,Food:j3,settings:f,qtyOf:d,onAdd:r,size:Q},G):null),
          T.every((G) => G.items.length === 0) &&
            i.jsx("p", {
              className: "empty",
              children: "这一格空空的，换个词搜搜？",
            }),
        ],
      }),
    ],
  });
}
const S3 = [
    {
      id: "jian",
      name: "养生阿健",
      group: "健康派",
      emoji: "🍵",
      color: "#6D9E7A",
      tagline: "保温杯里泡枸杞",
      weights: {
        veg: 0.45,
        processed: -0.25,
        variety: 0.2,
        kcal: -0.15,
        carb: 0.05,
      },
      lines: {
        hi: [
          "这盆菜码得漂亮，纤维够了，我心里踏实。",
          "难得，丸子堆里还能看见绿色。",
        ],
        mid: [
          "还行，但你那几颗丸子我是闭着眼装没看见的。",
          "菜量再翻一倍，我就可以夸你了。",
        ],
        lo: [
          "丸子是好吃，但你这盆的膳食纤维……算了，我也不劝了。",
          "你这不叫吃菜，叫给丸子上坟。",
        ],
      },
      specials: { noVeg: "一根绿叶子都没有，你这是来进货的吧。" },
    },
    {
      id: "lin",
      name: "营养师小林",
      group: "健康派",
      emoji: "🥗",
      color: "#7BB86A",
      tagline: "开口就是膳食指南",
      weights: { veg: 0.3, protein: 0.25, variety: 0.25, processed: -0.2 },
      lines: {
        hi: [
          "结构对了：一半菜、三成蛋白、两成主食，教科书级别。",
          "这盆我会拍下来当教案。",
        ],
        mid: [
          "方向对了，就是把丸子换成豆腐会更好。",
          "蔬菜占比刚过四成，及格，别骄傲。",
        ],
        lo: [
          "你这不是麻辣烫，是一盆碳水开会。",
          "蛋白质只有丸子出场的麻辣烫，建议改名丸子汤。",
        ],
      },
      specials: { noProtein: "查无蛋白质。这盆吃完，你晚上一定会饿。" },
    },
    {
      id: "zhang",
      name: "中医张大夫",
      group: "健康派",
      emoji: "🌿",
      color: "#7C9A5B",
      tagline: "你这是湿气重",
      weights: {
        veg: 0.25,
        processed: -0.3,
        spicy: -0.2,
        variety: 0.2,
        carb: 0.1,
      },
      lines: {
        hi: [
          "脾胃调和，气色不错，今天这碗可以。",
          "青菜为主，你的湿气有救了。",
        ],
        mid: [
          "尚可，就是辣得有点冲，你的胃记着呢。",
          "再加两把绿叶，火气就下去了。",
        ],
        lo: [
          "辛辣厚味，油盐俱重，你这是拿胃当赌注。",
          "舌苔我不用看，看你这盆就知道了。",
        ],
      },
      specials: { noSpice: "清汤？那你来麻辣烫干嘛，回家煮面吧。" },
    },
    {
      id: "may",
      name: "素食阿May",
      group: "健康派",
      emoji: "🥬",
      color: "#8FC46B",
      tagline: "肉？什么肉",
      weights: {
        veg: 0.5,
        protein: -0.15,
        processed: -0.15,
        variety: 0.2,
        looks: 0.1,
      },
      lines: {
        hi: [
          "一根肉都没混进来，完美，我们可以做朋友。",
          "这盆绿得让人心情好。",
        ],
        mid: [
          "素得很好，下次少拿点油豆腐就更素了。",
          "我闻到一点点肉味，当我没说。",
        ],
        lo: ["你这一盆，我数了数，七颗肉丸。", "别装了，你就是想吃肉。"],
      },
      specials: { noVeg: "全荤？那我们没什么好聊的了。" },
    },
    {
      id: "xiong",
      name: "撸铁大熊",
      group: "力量派",
      emoji: "💪",
      color: "#D9764F",
      tagline: "先报蛋白质克数",
      weights: { protein: 0.55, kcal: 0.15, processed: -0.15, carb: 0.1 },
      lines: {
        hi: [
          "蛋白质够了，练完直接补，兄弟有前途。",
          "这盆我认，增肌餐就是这么吃的。",
        ],
        mid: [
          "蛋白勉强够，一半靠丸子凑，算你聪明。",
          "鸡胸没拿？那你今天算白练。",
        ],
        lo: [
          "蛋白质不到 15 克。兄弟，你这练的是夹菜还是练佛系？",
          "这盆吃完，你只能长出脂肪。",
        ],
      },
      specials: { noProtein: "零蛋白。你今天不是来吃饭的，是来喝汤的。" },
    },
    {
      id: "zhe",
      name: "增肌患者阿哲",
      group: "力量派",
      emoji: "🏋️",
      color: "#C98A5B",
      tagline: "这顿白练了",
      weights: { protein: 0.5, kcal: 0.25, price: -0.1, processed: -0.1 },
      lines: {
        hi: [
          "够了够了，这一盆够我撑到明天。",
          "热量和蛋白都在线，我可以安心增肌。",
        ],
        mid: ["热量够，蛋白差点，回去补一杯粉。", "还行，但我教练会骂我。"],
        lo: [
          "我增肌半年，就是被这种盆子拖累的。",
          "这盆的热量，我热身都不够。",
        ],
      },
      specials: { overBudget: "超预算了？增肌本来就是烧钱，认了。" },
    },
    {
      id: "fen",
      name: "蛋白粉推销员",
      group: "力量派",
      emoji: "🥛",
      color: "#E0A85C",
      tagline: "要不要加两勺",
      weights: { protein: 0.45, processed: 0.1, price: -0.2, indulgent: 0.1 },
      lines: {
        hi: [
          "完美客户！要不要再来两勺粉？今天有活动。",
          "这盆配我的粉，效果直接翻倍。",
        ],
        mid: [
          "蛋白一般，我建议补一勺，真的，就一勺。",
          "你现在这个量，得配两桶。",
        ],
        lo: [
          "你这蛋白摄入，我看了想哭，我业绩也想哭。",
          "要不要考虑一下我们的家庭装？",
        ],
      },
      specials: { noProtein: "零蛋白客户，我最喜欢你这种了。" },
    },
    {
      id: "chen",
      name: "跑马老陈",
      group: "力量派",
      emoji: "🏃",
      color: "#6FA8C7",
      tagline: "跑前不能吃这个",
      weights: { carb: 0.3, protein: 0.25, kcal: -0.15, processed: -0.25 },
      lines: {
        hi: [
          "碳水补得及时，明天拉个 15 公里没问题。",
          "这盆轻，跑起来不压腿。",
        ],
        mid: ["有点油，跑前吃这个会顶。", "碳水够了，就是丸子太多，跑不动。"],
        lo: ["这盆下去，你只能跑厕所。", "我跑全马都没你这盆沉。"],
      },
      specials: { overBudget: "贵是贵了点，但补给不能省。" },
    },
    {
      id: "tao",
      name: "暴食老饕",
      group: "享乐派",
      emoji: "🍖",
      color: "#C4645C",
      tagline: "就这？",
      weights: { kcal: 0.45, indulgent: 0.3, variety: 0.15, veg: -0.05 },
      lines: {
        hi: [
          "这才叫吃饭！再来一盆我陪你。",
          "有肉有丸有面，看着我就饱了三分。",
        ],
        mid: [
          "就这？我拿这个当餐前小菜，还得再点一锅。",
          "你这盆的野心不够大。",
        ],
        lo: ["这点东西，喂猫呢？", "我奶奶吃得比你多。"],
      },
      specials: { tiny: "空盆？你是来参观的？", empty: "你盆里连汤都没有。" },
    },
    {
      id: "gui",
      name: "深夜饿鬼",
      group: "享乐派",
      emoji: "🌙",
      color: "#6B6F9C",
      tagline: "凌晨两点",
      weights: { kcal: 0.4, indulgent: 0.3, carb: 0.15, price: -0.1 },
      lines: {
        hi: ["凌晨两点，这盆就是光。", "热汤、宽粉、丸子，人生圆满了。"],
        mid: ["少了点油水，不够压住这夜。", "能吃，但我还想再来一份。"],
        lo: ["这个量，我凌晨三点还会醒。", "你这盆看着像减肥餐，我很失望。"],
      },
      specials: { noVeg: "没菜更好，我从来不吃草。" },
    },
    {
      id: "yuan",
      name: "甜品控小圆",
      group: "享乐派",
      emoji: "🍡",
      color: "#E68FA8",
      tagline: "有甜的吗",
      weights: { indulgent: 0.45, carb: 0.25, looks: 0.15, veg: -0.1 },
      lines: {
        hi: [
          "有年糕！还有芝士年糕！满分满分满分！",
          "甜甜的碳水，这是我的本命。",
        ],
        mid: ["好吃是好吃，就是不够甜。", "下次能加个麻花吗？"],
        lo: ["一整盆绿色的，我怎么下口呀。", "没有甜的东西，这顿饭没有灵魂。"],
      },
      specials: { noVeg: "全是菜……我先哭一会儿。" },
    },
    {
      id: "hg",
      name: "火锅原教旨",
      group: "享乐派",
      emoji: "🌶️",
      color: "#D9503F",
      tagline: "这不叫麻辣烫",
      weights: { spicy: 0.4, indulgent: 0.2, processed: 0.15, veg: 0.1 },
      lines: {
        hi: ["红油够、辣度够，这才是麻辣烫。", "这盆有脾气，我认可。"],
        mid: ["辣度勉强，但配菜太温柔了。", "毛肚呢？没有毛肚的麻辣烫是残废。"],
        lo: [
          "清汤？这也能叫麻辣烫？你这是在喝菜汤。",
          "你这盆，一点火气都没有。",
        ],
      },
      specials: { noSpice: "清汤锅底，你不如直接喝白开水。" },
    },
    {
      id: "wang",
      name: "打工人老王",
      group: "精算派",
      emoji: "💸",
      color: "#8B8B8B",
      tagline: "这钱花得冤",
      weights: { price: -0.55, density: -0.2, veg: 0.15, processed: -0.1 },
      lines: {
        hi: ["这个价，这盆量，老板今天亏了。", "性价比之王，我服。"],
        mid: ["还成，勉强对得起我这一天的工资。", "再便宜五块，我就叫你哥。"],
        lo: [
          "24 块 6。三片藕两片土豆，够你在楼下吃份真肉了。",
          "你这不叫吃饭，叫给老板交房租。",
        ],
      },
      specials: { overBudget: "超了。你这钱花得，比我加班还冤。" },
    },
    {
      id: "men",
      name: "抠门室友",
      group: "精算派",
      emoji: "🪙",
      color: "#B08D57",
      tagline: "AA 制",
      weights: { price: -0.6, density: -0.2, kcal: 0.1 },
      lines: {
        hi: ["这一盆不到二十，我认你这个室友。", "会挑，全是轻的。"],
        mid: ["有点贵，下次跟我学学。", "你这几颗丸子，够我吃两顿。"],
        lo: ["你知不知道这几颗丸子多少钱？", "这钱我能在菜市场买三斤。"],
      },
      specials: { overBudget: "超预算？那我先走了，账单你付。" },
    },
    {
      id: "lisa",
      name: "精算师Lisa",
      group: "精算派",
      emoji: "📊",
      color: "#5C7C9E",
      tagline: "建议停止夹菜",
      weights: {
        protein: 0.3,
        price: -0.3,
        kcal: -0.2,
        variety: 0.15,
        processed: -0.1,
      },
      lines: {
        hi: [
          "单位蛋白成本 1.2 元/10g，最优解。",
          "这盆的结构和成本都在有效前沿上。",
        ],
        mid: ["边际效益开始递减了，建议停止夹菜。", "数据还行，方差略大。"],
        lo: [
          "这盆的投入产出比，我建议直接止损。",
          "你这是在为情绪付费，不是为营养。",
        ],
      },
      specials: { overBudget: "预算超支，需要重新配置。" },
    },
    {
      id: "zhen",
      name: "宝妈阿珍",
      group: "精算派",
      emoji: "👶",
      color: "#D9A0A0",
      tagline: "孩子能吃吗",
      weights: {
        veg: 0.25,
        protein: 0.2,
        processed: -0.35,
        spicy: -0.2,
        variety: 0.15,
      },
      lines: {
        hi: [
          "有菜有肉，孩子也能吃，阿姨放心了。",
          "这盆干净，没有乱七八糟的东西。",
        ],
        mid: ["丸子有点多，小孩吃多了不好。", "辣度再低一点就完美了。"],
        lo: [
          "这么多加工肉，你让我怎么放心。",
          "这盆要是给孩子吃，我得说你两句。",
        ],
      },
      specials: { allProcessed: "全是丸子火腿，一样正经菜都没有。" },
    },
    {
      id: "ge",
      name: "外卖小哥",
      group: "整活派",
      emoji: "🛵",
      color: "#E0B44C",
      tagline: "这单我送过",
      weights: { kcal: 0.3, price: -0.25, processed: 0.1, variety: 0.15 },
      lines: {
        hi: ["这单我送过，回头客都说好。", "这盆扎实，送到不洒。"],
        mid: ["汤多菜少，路上容易洒。", "还行，就是不好打包。"],
        lo: [
          "这么点东西，我都不好意思按门铃。",
          "你这单我要超时了，因为太轻。",
        ],
      },
      specials: { tiny: "这就一单？我以为是加餐。" },
    },
    {
      id: "vivi",
      name: "探店网红Vivi",
      group: "整活派",
      emoji: "📸",
      color: "#D98CB8",
      tagline: "这能出片吗",
      weights: { looks: 0.55, veg: 0.2, processed: -0.1, indulgent: 0.1 },
      lines: {
        hi: ["配色绝了！这盆我发小红书能爆。", "红绿黄都有，出片！"],
        mid: [
          "配色还行，但这一盆全是褐色……拍出来真的不太出片耶。",
          "光线不错，菜一般。",
        ],
        lo: ["这也太素了，滤镜都救不回来。", "我要怎么拍？拍汤吗？"],
      },
      specials: { noVeg: "一盆褐色，我先调个滤镜。" },
    },
    {
      id: "fu",
      name: "橘猫大福",
      group: "整活派",
      emoji: "🐱",
      color: "#E39A4E",
      tagline: "只按丸子打分",
      weights: { indulgent: 0.5, protein: 0.2, veg: -0.3, kcal: 0.2 },
      lines: {
        hi: ["喵。（丸子给满分）", "喵喵。（这么多肉，可以摸一下）"],
        mid: ["喵。（勉强）", "喵……（想要那条鱼丸）"],
        lo: ["喵。（走开）", "喵。（一堆草，不吃）"],
      },
      specials: { noProtein: "喵？（没肉你叫我来干嘛）" },
    },
    {
      id: "ai007",
      name: "AI客服007",
      group: "整活派",
      emoji: "🤖",
      color: "#6BB8D9",
      tagline: "亲，已为您记录",
      weights: { variety: 0.25, price: 0.2, processed: 0.25, veg: 0.1 },
      lines: {
        hi: [
          "亲，您这盆搭配非常棒哦，已为您记录好评～",
          "检测到您很有品味，建议给个五星好评～",
        ],
        mid: [
          "亲，您的选择已提交，正在为您排队～",
          "这个问题我需要转接人工，请稍等哦。",
        ],
        lo: [
          "亲，您这盆数据异常，建议重新夹一次哦～",
          "很抱歉，我无法理解您的搭配。",
        ],
      },
      specials: { overBudget: "亲，检测到预算超支，已为您自动（假装）处理～" },
    },
  ],
  E3 = (s, f, d) => Math.max(f, Math.min(d, s));
function N3(s, f) {
  const d = [];
  return (
    s.portions === 0 && d.push("empty"),
    s.portions > 0 && s.proteinShare < 0.05 && d.push("noProtein"),
    s.portions > 0 && s.vegShare < 0.05 && d.push("noVeg"),
    s.portions > 0 && s.processedShare > 0.6 && d.push("allProcessed"),
    s.budgetRatio > 1 && d.push("overBudget"),
    s.portions > 0 && s.weightG < 150 && d.push("tiny"),
    f === "清汤" && d.push("noSpice"),
    s.kcal > 1100 && d.push("feast"),
    d
  );
}
function T3(s) {
  return s >= 75 ? "hi" : s >= 45 ? "mid" : "lo";
}
function M3(s, f) {
  let d = 0;
  for (const [r, S] of Object.entries(s.weights)) d += (S ?? 0) * (f[r] ?? 0);
  return Math.round(E3(50 + 55 * d, 5, 99));
}
function C3(s, f, d = Math.random) {
  const r = Zm(s),
    S = N3(s, f);
  return S3.map((g) => {
    const O = M3(g, r),
      D = T3(O);
    let _ = "";
    for (const T of S) {
      const A = g.specials?.[T];
      if (A) {
        _ = A;
        break;
      }
    }
    if (!_) {
      const T = g.lines[D];
      _ = T[Math.floor(d() * T.length) % T.length] ?? T[0];
    }
    return { character: g, score: O, band: D, line: _ };
  });
}
function z3(s) {
  if (s.length === 0)
    return { average: 0, star: s[0], harshest: s[0], summary: "" };
  const f = Math.round(s.reduce((O, D) => O + D.score, 0) / s.length),
    d = [...s].sort((O, D) => D.score - O.score),
    r = d[0],
    S = d[d.length - 1],
    g =
      f >= 75
        ? `全场 ${f} 分，${r.character.name}站起来鼓掌了`
        : f >= 55
          ? `全场 ${f} 分，及格线上下横跳`
          : `全场 ${f} 分，${S.character.name}已经把盆推回去了`;
  return { average: f, star: r, harshest: S, summary: g };
}
function Gf({ id: s, name: f, size: d = 72, color: r = "#FF6B6B" }) {
  const [S, g] = X.useState(!1),
    O = { width: d, height: d, background: `${r}22` };
  return S
    ? i.jsx("div", {
        className: "avatar avatar--fallback",
        style: O,
        children: f.slice(0, 1),
      })
    : i.jsx("div", {
        className: "avatar",
        style: O,
        children: i.jsx("img", {
          src: `/art/char/${s}.webp`,
          alt: f,
          width: d,
          height: d,
          loading: "lazy",
          onError: () => g(!0),
        }),
      });
}
function A3({entries, byId, settings, spice, budget, onClose, onRestart, runId,companionId}) {
  const result = X.useMemo(() => {
    const totals = Zf(entries, byId, settings);
    const features = C2(entries, byId, totals, spice, budget);
    const verdicts = C3(features, spice).sort((a,b) => b.score-a.score);
    return {totals, verdicts, summary: z3(verdicts)};
  }, [entries, byId, settings, spice, budget]);
  return i.jsx(CheckoutView, {entries, byId, settings, budget, onClose, onRestart, runId,companionId, ...result,
    api: {Icon: Ca, Avatar: Gf, Face:L, money: At, weight: jn, price: Fi}});
}
function O3({
  ingredients: s,
  news: f,
  settings: d,
  offline: r,
  onSettings: S,
  onAdmin: g,
}) {
  const O =
      window.location.pathname.replace(/\/+$/, "").endsWith("/demo") ||
      new URLSearchParams(window.location.search).get("demo") === "1",
    [D, _] = X.useReducer(Wm, d, (ol) => {
      const el = Fm(ol.budgetDefault),plan=peekOuting("malatang");
      el.companionId=plan?.buddyId||readOuting().buddyId;
      if(plan){el.entries=plan.recipe.entries;el.budget=plan.budget;el.spice=plan.recipe.spice;el.outingPlan=plan;}
      if (!O) return el;
      const dl = z2(s, () => 0.5)[1];
      return dl ? { ...el, entries: dl.entries } : el;
    }),
    [T, A] = X.useState(!1),
    [E, Q] = X.useState(!1),
    [G, Z] = X.useState(
      O && new URLSearchParams(window.location.search).get("noweigh") !== "1",
    ),
    [recommendations,setRecommendations]=X.useState(false),
    I = T || E || G || recommendations;
  X.useEffect(()=>{if(D.outingPlan?.token)consumeOuting(D.outingPlan.token);},[D.runId]);
  const orderLock=X.useRef(false),pickSource=X.useRef(null);
  const addToBowl=(id,event)=>{
    if(orderLock.current)return;
    const node=event?.currentTarget,rect=(node?.querySelector('.goods-icon')||node)?.getBoundingClientRect();
    pickSource.current=rect?{id,x:rect.x+rect.width/2,y:rect.y+rect.height/2,at:performance.now()}:null;
    _({type:"add",id});
  };
  X.useEffect(
    () => (
      document.body.classList.toggle("modal-open", I),
      () => document.body.classList.remove("modal-open")
    ),
    [I],
  );
  const K = X.useMemo(() => new Map(s.map((ol) => [ol.id, ol])), [s]),
    rl = X.useMemo(() => Zf(D.entries, K, d), [D.entries, K, d]),
    Rl = X.useMemo(
      () => C2(D.entries, K, rl, D.spice, D.budget),
      [D.entries, K, rl, D.spice, D.budget],
    ),
    Fl = rl.price > D.budget && D.budget > 0,
    vl = (ol) => D.entries.find((el) => el.id === ol)?.qty ?? 0;
  const buddy=buddyById(D.companionId);
  let Dl = `${buddy.name}：${companionLine(buddy.id,{game:"malatang",items:D.entries.map(e=>({...e,name:K.get(e.id)?.name}))})}`;
  return (
    D.entries.length === 0
      ? (Dl = "先夹点东西吧，丸丸饿了。")
      : Fl
        ? (Dl = "超预算了……不过麻姐没拦你，是丸丸在拦你。")
        : Rl.vegShare < 0.2
          ? (Dl = "一把绿叶都没有，加两把菜？盆会更满、秤不会更重。")
          : Rl.proteinShare < 0.15
            ? (Dl = "蛋白质有点少，来点肉或者豆腐。")
            : Rl.budgetRatio > 0.85 && (Dl = "快到预算了，再夹就超。"),
    i.jsxs("div", {
      className: "app",
      children: [
        i.jsx(o3, {
          settings: d,
          price: rl.price,
          budget: D.budget,
          over: Fl,
          onBudget: (ol) => {
            _({ type: "budget", value: ol });
            try {
              localStorage.setItem("malatang.budget", String(ol));
            } catch {}
          },
          onNews: () => A(!0),
          onSettings: () => Q(!0),
          onAdmin: g,
        }),
        i.jsxs("div", {
          className: "tipbar",
          children: [
            i.jsx(Gf, { id:buddy.id,name:buddy.name,size:30,color:buddy.color }),
            i.jsx("span", { children: Dl }),
          ],
        }),
        i.jsx("main", {
          className: "stage",
          children: i.jsx(b3, {
            ingredients: s,
            settings: d,
            qtyOf: vl,
            onAdd: addToBowl,
            tab: D.tab,
            query: D.query,
            onTab: (ol) => _({ type: "tab", value: ol }),
            onQuery: (ol) => _({ type: "query", value: ol }),
          }),
        }),
        i.jsx(g3, {
          open:recommendations,onClose:()=>setRecommendations(false),hasSelection:D.entries.length>0,
          ingredients: s,
          settings: d,
          byId: K,
          onApply: (ol) => {if(!orderLock.current){pickSource.current=null;_({ type: "apply", entries: ol });setRecommendations(false);}},
        }),
        i.jsx(d3, {
          runId:D.runId,pickSource,onRecommendations:()=>setRecommendations(true),recommendationsOpen:recommendations,onOrderLock:value=>{orderLock.current=value;},
          entries: D.entries,
          byId: K,
          settings: d,
          weight: rl.weightG,
          price: rl.price,
          budget: D.budget,
          canWeigh: D.entries.length > 0,
          onRemove: (ol) => !orderLock.current && _({ type: "removeOne", id: ol }),
          onAdd: addToBowl,
          onClear: () => !orderLock.current && _({ type: "clear" }),
          onWeigh: () => Z(!0),
        }),
        T && i.jsx(h3, { news: f, onClose: () => A(!1) }),
        E &&
          i.jsx(v3, {
            settings: d,
            onClose: () => Q(!1),
            onSave: (ol) => {
              (S(ol), Q(!1));
            },
          }),
        G &&
          i.jsx(A3, {
            runId: D.runId,companionId:D.companionId,
            entries: D.entries,
            byId: K,
            settings: d,
            spice: D.spice,
            budget: D.budget,
            onClose: () => Z(!1),
            onRestart: () => {
              (_({ type: "clear" }), Z(!1));
            },
          }),
      ],
    })
  );
}
const _3 = ["leaf", "cap", "cube", "ball", "disc", "strip", "egg", "knot"],
  D3 = ["protein", "fiber", "carb", "processed", "indulgent", "leafy", "spicy"],
  U3 = {
    protein: "蛋白",
    fiber: "纤维",
    carb: "碳水",
    processed: "加工",
    indulgent: "放纵",
    leafy: "叶菜",
    spicy: "辣",
  },
  T2 = { veg: "素菜", meat: "荤菜", ball: "丸滑", staple: "主食" },
  R3 = {
    leaf: {
      shape: "leaf",
      color: "#6FB35C",
      unitLabel: "把",
      unitWeightG: 35,
      kcalPer100g: 22,
      density: 0.25,
      tags: ["fiber", "leafy"],
      priceGroup: "veg",
    },
    mushroom: {
      shape: "cap",
      color: "#C8B79A",
      unitLabel: "朵",
      unitWeightG: 20,
      kcalPer100g: 28,
      density: 0.3,
      tags: ["fiber"],
      priceGroup: "veg",
    },
    root: {
      shape: "disc",
      color: "#E0A458",
      unitLabel: "片",
      unitWeightG: 15,
      kcalPer100g: 50,
      density: 0.7,
      tags: ["carb"],
      priceGroup: "veg",
    },
    tofu: {
      shape: "cube",
      color: "#EFD9A8",
      unitLabel: "块",
      unitWeightG: 20,
      kcalPer100g: 160,
      density: 0.5,
      tags: ["protein"],
      priceGroup: "veg",
    },
    meat: {
      shape: "ball",
      color: "#C4645C",
      unitLabel: "颗",
      unitWeightG: 18,
      kcalPer100g: 200,
      density: 0.8,
      tags: ["protein"],
      priceGroup: "ball",
    },
    staple: {
      shape: "strip",
      color: "#EFE3C6",
      unitLabel: "份",
      unitWeightG: 50,
      kcalPer100g: 330,
      density: 0.85,
      tags: ["carb"],
      priceGroup: "staple",
    },
    egg: {
      shape: "egg",
      color: "#F4E7C8",
      unitLabel: "个",
      unitWeightG: 15,
      kcalPer100g: 180,
      density: 0.8,
      tags: ["protein"],
      priceGroup: "ball",
    },
  };
function O2(s) {
  const f = R3[s];
  return {
    id: "",
    name: "",
    category: s,
    shape: f.shape,
    color: f.color,
    unitLabel: f.unitLabel,
    unitWeightG: f.unitWeightG,
    kcalPer100g: f.kcalPer100g,
    density: f.density,
    tags: f.tags,
    priceGroup: f.priceGroup,
    popular: !1,
    note: "",
    imageUrl: null,
    sortOrder: 999,
    enabled: !0,
  };
}
function L3({ onExit: s }) {
  const [f, d] = X.useState("loading"),
    [r, S] = X.useState("ingredients");
  return (
    X.useEffect(() => {
      Wl.get("/api/auth/me")
        .then(d)
        .catch(() => d(null));
    }, []),
    f === "loading"
      ? i.jsx("div", { className: "admin-loading", children: "正在验证身份…" })
      : f
        ? i.jsxs("div", {
            className: "admin",
            children: [
              i.jsxs("header", {
                className: "admin-head",
                children: [
                  i.jsxs("div", {
                    children: [
                      i.jsx("h1", { children: "🔑 后台" }),
                      i.jsxs("span", {
                        children: [
                          f.username,
                          " · ",
                          f.role === "owner" ? "超级管理员" : "管理员",
                        ],
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "admin-head-actions",
                    children: [
                      i.jsx("button", {
                        type: "button",
                        className: "btn btn--ghost",
                        onClick: s,
                        children: "回到夹菜台",
                      }),
                      i.jsx("button", {
                        type: "button",
                        className: "btn btn--ghost",
                        onClick: async () => {
                          (await Wl.post("/api/auth/logout"), d(null));
                        },
                        children: "退出",
                      }),
                    ],
                  }),
                ],
              }),
              i.jsx("nav", {
                className: "admin-tabs",
                children: [
                  ["ingredients", "食材"],
                  ["news", "小报"],
                  ["accounts", "账号"],
                  ["settings", "门店设置"],
                ].map(([g, O]) =>
                  i.jsx(
                    "button",
                    {
                      type: "button",
                      className: r === g ? "on" : "",
                      onClick: () => S(g),
                      disabled: g === "accounts" && f.role !== "owner",
                      children: O,
                    },
                    g,
                  ),
                ),
              }),
              r === "ingredients" && i.jsx(H3, {}),
              r === "news" && i.jsx(q3, {}),
              r === "accounts" && f.role === "owner" && i.jsx(G3, { me: f }),
              r === "settings" && i.jsx(Y3, { me: f }),
            ],
          })
        : i.jsx(Q3, { onDone: d, onExit: s })
  );
}
function Q3({ onDone: s, onExit: f }) {
  const [d, r] = X.useState("owner"),
    [S, g] = X.useState(""),
    [O, D] = X.useState(""),
    [_, T] = X.useState(!1);
  return i.jsx("div", {
    className: "login-wrap",
    children: i.jsxs("form", {
      className: "login-card",
      onSubmit: async (A) => {
        (A.preventDefault(), T(!0), D(""));
        try {
          const E = await Wl.post("/api/auth/login", {
            username: d,
            password: S,
          });
          s(E);
        } catch (E) {
          D(E.message);
        } finally {
          T(!1);
        }
      },
      children: [
        i.jsx("h1", { children: "🔑 后台登录" }),
        i.jsxs("label", {
          className: "field",
          children: [
            i.jsx("span", { children: "账号" }),
            i.jsx("input", {
              value: d,
              onChange: (A) => r(A.target.value),
              autoComplete: "username",
            }),
          ],
        }),
        i.jsxs("label", {
          className: "field",
          children: [
            i.jsx("span", { children: "密码" }),
            i.jsx("input", {
              type: "password",
              value: S,
              onChange: (A) => g(A.target.value),
              autoComplete: "current-password",
            }),
          ],
        }),
        O && i.jsx("p", { className: "error", children: O }),
        i.jsx("button", {
          className: "btn btn--primary btn--block",
          disabled: _,
          type: "submit",
          children: _ ? "登录中…" : "登录",
        }),
        i.jsx("button", {
          className: "link-btn",
          type: "button",
          onClick: f,
          children: "← 回夹菜台",
        }),
        i.jsx("p", {
          className: "hint",
          children: "首次启动默认账号 owner / malatang，登录后请立刻改密码。",
        }),
      ],
    }),
  });
}
function H3() {
  const [s, f] = X.useState([]),
    [d, r] = X.useState(null),
    [S, g] = X.useState(""),
    O = X.useCallback(async () => {
      try {
        f(await Wl.get("/api/admin/ingredients"));
      } catch (T) {
        g(T.message);
      }
    }, []);
  X.useEffect(() => {
    O();
  }, [O]);
  const D = async (T) => {
      g("");
      try {
        (T.id
          ? await Wl.patch(`/api/admin/ingredients/${T.id}`, T)
          : await Wl.post("/api/admin/ingredients", T),
          r(null),
          await O());
      } catch (A) {
        g(A.message);
      }
    },
    _ = async (T) => {
      confirm("下架这个食材？（玩家端会立刻看不到）") &&
        (await Wl.del(`/api/admin/ingredients/${T}`), await O());
    };
  return i.jsxs("div", {
    className: "admin-body",
    children: [
      i.jsxs("div", {
        className: "admin-toolbar",
        children: [
          i.jsx("button", {
            type: "button",
            className: "btn btn--primary",
            onClick: () => r(O2("leaf")),
            children: "＋ 新增食材",
          }),
          i.jsxs("span", {
            className: "hint",
            children: ["共 ", s.length, " 项 · 新增后玩家刷新即见，无需发版"],
          }),
        ],
      }),
      S && i.jsx("p", { className: "error", children: S }),
      i.jsxs("table", {
        className: "table",
        children: [
          i.jsx("thead", {
            children: i.jsxs("tr", {
              children: [
                i.jsx("th", { children: "食材" }),
                i.jsx("th", { children: "分类" }),
                i.jsx("th", { children: "一份" }),
                i.jsx("th", { children: "热量" }),
                i.jsx("th", { children: "状态" }),
                i.jsx("th", {}),
              ],
            }),
          }),
          i.jsx("tbody", {
            children: s.map((T) =>
              i.jsxs(
                "tr",
                {
                  className: T.enabled ? "" : "is-off",
                  children: [
                    i.jsx("td", {
                      children: i.jsxs("span", {
                        className: "cell-food",
                        children: [
                          i.jsx(Ca, {
                            id: T.id,
                            shape: T.shape,
                            color: T.color,
                            size: 30,
                          }),
                          T.name,
                          i.jsx("i", { children: T.id }),
                        ],
                      }),
                    }),
                    i.jsx("td", { children: vu[T.category] }),
                    i.jsxs("td", {
                      children: [T.unitWeightG, "g / ", T.unitLabel],
                    }),
                    i.jsxs("td", { children: [T.kcalPer100g, " kcal"] }),
                    i.jsx("td", { children: T.enabled ? "在架" : "已下架" }),
                    i.jsxs("td", {
                      className: "cell-actions",
                      children: [
                        i.jsx("button", {
                          type: "button",
                          className: "link-btn",
                          onClick: () => r(T),
                          children: "编辑",
                        }),
                        i.jsx("button", {
                          type: "button",
                          className: "link-btn danger",
                          onClick: () => _(T.id),
                          children: "下架",
                        }),
                      ],
                    }),
                  ],
                },
                T.id,
              ),
            ),
          }),
        ],
      }),
      d &&
        i.jsx(B3, { item: d, onCancel: () => r(null), onSave: D, onChange: r }),
    ],
  });
}
function B3({ item: s, onChange: f, onSave: d, onCancel: r }) {
  const S = (g, O) => f({ ...s, [g]: O });
  return i.jsx("div", {
    className: "overlay",
    role: "dialog",
    "aria-modal": "true",
    onClick: r,
    children: i.jsxs("div", {
      className: "sheet sheet--editor",
      onClick: (g) => g.stopPropagation(),
      children: [
        i.jsxs("header", {
          className: "sheet-head",
          children: [
            i.jsx("h2", { children: s.id ? `编辑：${s.name}` : "新增食材" }),
            i.jsx("button", {
              type: "button",
              className: "icon-btn",
              onClick: r,
              "aria-label": "关闭",
              children: "✕",
            }),
          ],
        }),
        i.jsxs("div", {
          className: "editor-grid",
          children: [
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "名字 *" }),
                i.jsx("input", {
                  value: s.name,
                  onChange: (g) => S("name", g.target.value),
                  maxLength: 20,
                  placeholder: "鸭肠",
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "分类 *" }),
                i.jsx("select", {
                  value: s.category,
                  onChange: (g) => {
                    const O = g.target.value;
                    f({ ...s, ...O2(O), id: s.id, name: s.name });
                  },
                  children: Wi.map((g) =>
                    i.jsx("option", { value: g, children: vu[g] }, g),
                  ),
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "计量单位" }),
                i.jsx("input", {
                  value: s.unitLabel,
                  onChange: (g) => S("unitLabel", g.target.value),
                  maxLength: 4,
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "每份克重" }),
                i.jsx("input", {
                  type: "number",
                  min: 1,
                  max: 500,
                  value: s.unitWeightG,
                  onChange: (g) => S("unitWeightG", Number(g.target.value)),
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "热量 kcal/100g" }),
                i.jsx("input", {
                  type: "number",
                  min: 0,
                  max: 900,
                  value: s.kcalPer100g,
                  onChange: (g) => S("kcalPer100g", Number(g.target.value)),
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "压秤指数 0–1" }),
                i.jsx("input", {
                  type: "number",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: s.density,
                  onChange: (g) => S("density", Number(g.target.value)),
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "价格组" }),
                i.jsx("select", {
                  value: s.priceGroup,
                  onChange: (g) => S("priceGroup", g.target.value),
                  children: Object.keys(T2).map((g) =>
                    i.jsx("option", { value: g, children: T2[g] }, g),
                  ),
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "排序" }),
                i.jsx("input", {
                  type: "number",
                  value: s.sortOrder,
                  onChange: (g) => S("sortOrder", Number(g.target.value)),
                }),
              ],
            }),
          ],
        }),
        i.jsxs("div", {
          className: "field",
          children: [
            i.jsx("span", { children: "图标" }),
            i.jsxs("div", {
              className: "shape-picker",
              children: [
                _3.map((g) =>
                  i.jsx(
                    "button",
                    {
                      type: "button",
                      className: s.shape === g ? "on" : "",
                      onClick: () => S("shape", g),
                      children: i.jsx(Ca, {
                        shape: g,
                        color: s.color,
                        size: 40,
                      }),
                    },
                    g,
                  ),
                ),
                i.jsx("input", {
                  type: "color",
                  value: s.color,
                  onChange: (g) => S("color", g.target.value),
                  "aria-label": "图标颜色",
                }),
              ],
            }),
            i.jsx("p", {
              className: "hint",
              children:
                "没配图也不要紧：后台按形状 + 颜色自动生成同风格的卡通图标。",
            }),
          ],
        }),
        i.jsxs("div", {
          className: "field",
          children: [
            i.jsx("span", { children: "标签" }),
            i.jsx("div", {
              className: "tag-picker",
              children: D3.map((g) =>
                i.jsx(
                  "button",
                  {
                    type: "button",
                    className: s.tags.includes(g) ? "on" : "",
                    onClick: () =>
                      S(
                        "tags",
                        s.tags.includes(g)
                          ? s.tags.filter((O) => O !== g)
                          : [...s.tags, g],
                      ),
                    children: U3[g],
                  },
                  g,
                ),
              ),
            }),
          ],
        }),
        i.jsxs("div", {
          className: "editor-grid",
          children: [
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "图片 URL（可选）" }),
                i.jsx("input", {
                  value: s.imageUrl ?? "",
                  onChange: (g) => S("imageUrl", g.target.value || null),
                  placeholder: "https://… 或留空用卡通图标",
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field",
              children: [
                i.jsx("span", { children: "备注" }),
                i.jsx("input", {
                  value: s.note ?? "",
                  onChange: (g) => S("note", g.target.value),
                  maxLength: 80,
                }),
              ],
            }),
            i.jsxs("label", {
              className: "field field--row",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: s.popular,
                  onChange: (g) => S("popular", g.target.checked),
                }),
                i.jsx("span", { children: "放进「本店常点」" }),
              ],
            }),
            i.jsxs("label", {
              className: "field field--row",
              children: [
                i.jsx("input", {
                  type: "checkbox",
                  checked: s.enabled,
                  onChange: (g) => S("enabled", g.target.checked),
                }),
                i.jsx("span", { children: "在架可夹" }),
              ],
            }),
          ],
        }),
        i.jsxs("div", {
          className: "editor-actions",
          children: [
            i.jsx("button", {
              type: "button",
              className: "btn btn--ghost",
              onClick: r,
              children: "取消",
            }),
            i.jsx("button", {
              type: "button",
              className: "btn btn--primary",
              onClick: () => d(s),
              children: "保存",
            }),
          ],
        }),
      ],
    }),
  });
}
function q3() {
  const [s, f] = X.useState([]),
    [d, r] = X.useState(null),
    S = X.useCallback(async () => {
      f(await Wl.get("/api/admin/news"));
    }, []);
  return (
    X.useEffect(() => {
      S();
    }, [S]),
    i.jsxs("div", {
      className: "admin-body",
      children: [
        i.jsx("div", {
          className: "admin-toolbar",
          children: i.jsx("button", {
            type: "button",
            className: "btn btn--primary",
            onClick: () =>
              r({ title: "", summary: "", body: "", sourceUrl: "" }),
            children: "＋ 新增小报",
          }),
        }),
        i.jsx("div", {
          className: "news-admin",
          children: s.map((g) =>
            i.jsxs(
              "div",
              {
                className: "news-admin-row",
                children: [
                  i.jsxs("div", {
                    children: [
                      i.jsx("b", { children: g.title }),
                      i.jsx("p", { children: g.summary }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "cell-actions",
                    children: [
                      i.jsx("button", {
                        type: "button",
                        className: "link-btn",
                        onClick: () => r(g),
                        children: "编辑",
                      }),
                      i.jsx("button", {
                        type: "button",
                        className: "link-btn danger",
                        onClick: async () => {
                          (await Wl.del(`/api/admin/news/${g.id}`), await S());
                        },
                        children: "删除",
                      }),
                    ],
                  }),
                ],
              },
              g.id,
            ),
          ),
        }),
        d &&
          i.jsx("div", {
            className: "overlay",
            role: "dialog",
            "aria-modal": "true",
            onClick: () => r(null),
            children: i.jsxs("div", {
              className: "sheet sheet--narrow",
              onClick: (g) => g.stopPropagation(),
              children: [
                i.jsxs("header", {
                  className: "sheet-head",
                  children: [
                    i.jsx("h2", { children: d.id ? "编辑小报" : "新增小报" }),
                    i.jsx("button", {
                      type: "button",
                      className: "icon-btn",
                      onClick: () => r(null),
                      children: "✕",
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className: "form",
                  children: [
                    i.jsxs("label", {
                      className: "field",
                      children: [
                        i.jsx("span", { children: "标题" }),
                        i.jsx("input", {
                          value: d.title ?? "",
                          onChange: (g) => r({ ...d, title: g.target.value }),
                        }),
                      ],
                    }),
                    i.jsxs("label", {
                      className: "field",
                      children: [
                        i.jsx("span", { children: "导语" }),
                        i.jsx("textarea", {
                          rows: 2,
                          value: d.summary ?? "",
                          onChange: (g) => r({ ...d, summary: g.target.value }),
                        }),
                      ],
                    }),
                    i.jsxs("label", {
                      className: "field",
                      children: [
                        i.jsx("span", { children: "正文（空行分段）" }),
                        i.jsx("textarea", {
                          rows: 8,
                          value: d.body ?? "",
                          onChange: (g) => r({ ...d, body: g.target.value }),
                        }),
                      ],
                    }),
                    i.jsxs("label", {
                      className: "field",
                      children: [
                        i.jsx("span", { children: "来源链接" }),
                        i.jsx("input", {
                          value: d.sourceUrl ?? "",
                          onChange: (g) =>
                            r({ ...d, sourceUrl: g.target.value }),
                        }),
                      ],
                    }),
                  ],
                }),
                i.jsx("button", {
                  type: "button",
                  className: "btn btn--primary btn--block",
                  onClick: async () => {
                    (d.id
                      ? await Wl.patch(`/api/admin/news/${d.id}`, d)
                      : await Wl.post("/api/admin/news", d),
                      r(null),
                      await S());
                  },
                  children: "保存",
                }),
              ],
            }),
          }),
      ],
    })
  );
}
function G3({ me: s }) {
  const [f, d] = X.useState([]),
    [r, S] = X.useState(""),
    [g, O] = X.useState(""),
    [D, _] = X.useState(""),
    T = X.useCallback(async () => {
      d(await Wl.get("/api/admin/accounts"));
    }, []);
  return (
    X.useEffect(() => {
      T();
    }, [T]),
    i.jsxs("div", {
      className: "admin-body",
      children: [
        i.jsxs("form", {
          className: "inline-form",
          onSubmit: async (A) => {
            (A.preventDefault(), _(""));
            try {
              (await Wl.post("/api/admin/accounts", {
                username: r,
                password: g,
                role: "admin",
              }),
                S(""),
                O(""),
                await T());
            } catch (E) {
              _(E.message);
            }
          },
          children: [
            i.jsx("input", {
              placeholder: "新账号",
              value: r,
              onChange: (A) => S(A.target.value),
            }),
            i.jsx("input", {
              placeholder: "密码（≥6 位）",
              type: "password",
              value: g,
              onChange: (A) => O(A.target.value),
            }),
            i.jsx("button", {
              type: "submit",
              className: "btn btn--primary",
              children: "创建管理员",
            }),
          ],
        }),
        D && i.jsx("p", { className: "error", children: D }),
        i.jsxs("table", {
          className: "table",
          children: [
            i.jsx("thead", {
              children: i.jsxs("tr", {
                children: [
                  i.jsx("th", { children: "账号" }),
                  i.jsx("th", { children: "角色" }),
                  i.jsx("th", { children: "最近登录" }),
                  i.jsx("th", {}),
                ],
              }),
            }),
            i.jsx("tbody", {
              children: f.map((A) =>
                i.jsxs(
                  "tr",
                  {
                    children: [
                      i.jsx("td", { children: A.username }),
                      i.jsx("td", {
                        children: A.role === "owner" ? "超级管理员" : "管理员",
                      }),
                      i.jsx("td", { children: A.lastLoginAt ?? "—" }),
                      i.jsx("td", {
                        className: "cell-actions",
                        children:
                          A.id !== s.id &&
                          i.jsx("button", {
                            type: "button",
                            className: "link-btn danger",
                            onClick: async () => {
                              (await Wl.del(`/api/admin/accounts/${A.id}`),
                                await T());
                            },
                            children: "删除",
                          }),
                      }),
                    ],
                  },
                  A.id,
                ),
              ),
            }),
          ],
        }),
      ],
    })
  );
}
function Y3({ me: s }) {
  const [f, d] = X.useState(null),
    [r, S] = X.useState(""),
    [g, O] = X.useState(""),
    [D, _] = X.useState("");
  return (
    X.useEffect(() => {
      Wl.get("/api/bootstrap")
        .then((T) => d(T.settings))
        .catch(() => S("读取失败"));
    }, []),
    f
      ? i.jsxs("div", {
          className: "admin-body",
          children: [
            i.jsxs("div", {
              className: "editor-grid",
              children: [
                i.jsxs("label", {
                  className: "field",
                  children: [
                    i.jsx("span", { children: "门店名" }),
                    i.jsx("input", {
                      value: f.shopName,
                      onChange: (T) => d({ ...f, shopName: T.target.value }),
                    }),
                  ],
                }),
                i.jsxs("label", {
                  className: "field",
                  children: [
                    i.jsx("span", { children: "单价（元/斤）" }),
                    i.jsx("input", {
                      type: "number",
                      step: "0.1",
                      value: f.pricePerJin,
                      onChange: (T) =>
                        d({ ...f, pricePerJin: Number(T.target.value) }),
                    }),
                  ],
                }),
                i.jsxs("label", {
                  className: "field",
                  children: [
                    i.jsx("span", { children: "默认预算" }),
                    i.jsx("input", {
                      type: "number",
                      value: f.budgetDefault,
                      onChange: (T) =>
                        d({ ...f, budgetDefault: Number(T.target.value) }),
                    }),
                  ],
                }),
                i.jsxs("label", {
                  className: "field field--row",
                  children: [
                    i.jsx("input", {
                      type: "checkbox",
                      checked: f.separatePricing,
                      onChange: (T) =>
                        d({ ...f, separatePricing: T.target.checked }),
                    }),
                    i.jsx("span", { children: "荤素分价" }),
                  ],
                }),
              ],
            }),
            i.jsx("button", {
              type: "button",
              className: "btn btn--primary",
              onClick: async () => {
                (await Wl.patch("/api/admin/settings", f), S("已保存"));
              },
              children: "保存门店设置",
            }),
            i.jsx("hr", { className: "rule" }),
            i.jsxs("h3", { children: ["修改密码（", s.username, "）"] }),
            i.jsxs("form", {
              className: "inline-form",
              onSubmit: async (T) => {
                T.preventDefault();
                try {
                  (await Wl.post("/api/auth/password", { current: g, next: D }),
                    O(""),
                    _(""),
                    S("密码已更新"));
                } catch (A) {
                  S(A.message);
                }
              },
              children: [
                i.jsx("input", {
                  type: "password",
                  placeholder: "当前密码",
                  value: g,
                  onChange: (T) => O(T.target.value),
                }),
                i.jsx("input", {
                  type: "password",
                  placeholder: "新密码",
                  value: D,
                  onChange: (T) => _(T.target.value),
                }),
                i.jsx("button", {
                  type: "submit",
                  className: "btn btn--ghost",
                  children: "更新",
                }),
              ],
            }),
            r && i.jsx("p", { className: "hint", children: r }),
          ],
        })
      : i.jsx("div", { className: "admin-body", children: "加载中…" })
  );
}
const _2 = "malatang.settings";
function Z3() {
  try {
    const s = localStorage.getItem(_2);
    return s ? JSON.parse(s) : {};
  } catch {
    return {};
  }
}
function w3() {
  const [s, f] = X.useState(() => STATIC_MODE?builtInBootstrap():null),
    [d, r] = X.useState(Z3),
    [S, g] = X.useState(() =>
      window.location.pathname.startsWith("/admin") ? "admin" : "play",
    );
  (X.useEffect(() => {
    Ym().then(f);
  }, []),
    X.useEffect(() => {
      const T = () =>
        g(window.location.pathname.startsWith("/admin") ? "admin" : "play");
      return (
        window.addEventListener("popstate", T),
        () => window.removeEventListener("popstate", T)
      );
    }, []));
  const O = X.useCallback((T) => {
      const A = T === "admin" ? "/admin" : "/#malatang";
      (window.history.pushState({}, "", A), g(T));
    }, []),
    D = X.useCallback((T) => {
      r(T);
      try {
        localStorage.setItem(_2, JSON.stringify(T));
      } catch {}
    }, []);
  if (!s)
    return i.jsxs("div", {
      className: "boot",
      children: [
        i.jsx("div", { className: "boot-pot", children: "🍲" }),
        i.jsx("p", { children: "正在热锅…" }),
      ],
    });
  const _ = { ...M2, ...s.settings, ...d };
  return S === "admin"
    ? i.jsx(L3, { onExit: () => O("play") })
    : i.jsx(O3, {
        ingredients: s.ingredients,
        news: s.news,
        settings: _,
        offline: s.offline,
        onSettings: D,
        onAdmin: () => O("admin"),
      });
}
Hm.createRoot(document.getElementById("root")).render(
  i.jsx(X.StrictMode, { children: i.jsx(GameCollection, {api: {Food: Ca, Avatar: Gf, Face: L, menu: qm,settings:M2}, Malatang: w3}) }),
);
