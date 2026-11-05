import {useConsumer} from './games/consumer-store.js';
import {companionMemory,memoryLine} from './games/companion-memory.js';
import {LegacyDialog} from './legacy-dialog.js';
import {assetUrl,basePath,isAdminPath} from './runtime.js';
import {getStoreDiscount,resolveStoreId,useStreet} from './content-client.js';
import {walletSnapshot} from './games/wallet-store.js';
import {readOuting,peekOuting,consumeOuting} from "./games/outing-store.js";
import {buddyById,companionLine} from "./games/outing-model.js";
import {LazyRack} from "./lazy-rack.js";
import { newRunId } from "./games/economy.js";
import { BasketDock, CheckoutView, Modal } from "./checkout-ui.js";
import { X, i } from "../vendor/react-runtime.js";

import {CATEGORY_LABELS,CATEGORY_ORDER,DEFAULT_SETTINGS,MENU,INITIAL_NEWS} from './data/menu.js';

async function requestJson(s, f, d = 4e3) {
  const r = new AbortController(),
    S = setTimeout(() => r.abort(), d);
  try {
    const g = await fetch(assetUrl(s), {
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
const apiClient = {
  get: (s) => requestJson(s),
  post: (s, f) => requestJson(s, { method: "POST", body: JSON.stringify(f ?? {}) }),
  patch: (s, f) => requestJson(s, { method: "PATCH", body: JSON.stringify(f ?? {}) }),
  del: (s) => requestJson(s, { method: "DELETE" }),
};
const STATIC_MODE = typeof __DAZI_STATIC__ !== "undefined" && __DAZI_STATIC__;
function builtInBootstrap(){return {ingredients:MENU,news:INITIAL_NEWS.map((s,f)=>({...s,id:f+1})),settings:DEFAULT_SETTINGS,offline:true};}
async function loadBootstrap() {
  if(STATIC_MODE)return builtInBootstrap();
  try {
    const s = await apiClient.get("/api/bootstrap");
    if (!s.ingredients?.length) throw new Error("empty");
    return { ...s, offline: !1 };
  } catch {
    return {
      ingredients: MENU,
      news: INITIAL_NEWS.map((s, f) => ({ ...s, id: f + 1 })),
      settings: DEFAULT_SETTINGS,
      offline: !0,
    };
  }
}
const clampUnit = (s) => Math.max(0, Math.min(1, s));
function analyzeBowl(s, f, d, r, S) {
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
    spiceFit: clampUnit(1 - Math.abs(Rl - Z)),
    budgetRatio: S > 0 ? d.price / S : 0,
  };
}
function describeBowl(s) {
  return {
    veg: clampUnit(s.vegShare),
    protein: clampUnit(s.proteinShare / 0.35),
    carb: clampUnit(s.carbShare / 0.45),
    variety: clampUnit(s.categories / 7),
    processed: clampUnit(s.processedShare),
    indulgent: clampUnit(s.indulgentShare / 0.5),
    kcal: clampUnit(s.kcal / 900),
    price: clampUnit(s.price / 35),
    density: clampUnit(s.avgDensity),
    spicy: clampUnit(s.spiceFit),
    looks: clampUnit(s.colorVariety / 7),
  };
}
const RECOMMENDATION_PRESETS = [
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
function recommendationWeight(s, f) {
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
function buildRecommendation(s, f, d = Math.random) {
  const r = f.filter((O) => O.enabled !== !1),
    S = [],
    g = new Set();
  for (const [O, D] of Object.entries(s.plan)) {
    const _ = r
      .filter((T) => T.category === O && !g.has(T.id))
      .map((T) => ({ i: T, s: recommendationWeight(T, s.bias) + d() * 0.35 }))
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
function buildRecommendations(s, f = Math.random) {
  return RECOMMENDATION_PRESETS.map((d) => buildRecommendation(d, s, f));
}
function priceRate(s, f) {
  return f.separatePricing ? f.priceGroups[s.priceGroup] : f.pricePerJin;
}
function portionWeight(s, f) {
  return s.unitWeightG * f;
}
function portionPrice(s, f, d) {
  return (portionWeight(s, f) / 500) * priceRate(s, d);
}
function portionCalories(s, f) {
  return (portionWeight(s, f) / 100) * s.kcalPer100g;
}
function summarizeBowl(s, f, d) {
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
      ((r += portionWeight(T, _.qty)),
      (S += portionPrice(T, _.qty, d)),
      (g += portionCalories(T, _.qty)),
      (O += _.qty),
      (D += 1));
  }
  return { weightG: r, price: S, kcal: g, portions: O, itemCount: D };
}
const MAX_PORTIONS = 9;
function bowlReducer(s, f) {
  switch (f.type) {
    case "add": {
      const d = s.entries.find((r) => r.id === f.id);
      return d
        ? d.qty >= MAX_PORTIONS
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
function initialBowl(s) {
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
import {FoodIllustration,FoodFace} from './art/foods.js';
const BOWL_VISIBLE_LIMIT = 18;
function bowlSeed(s) {
  let f = 0;
  for (let d = 0; d < s.length; d += 1) f = (f * 31 + s.charCodeAt(d)) >>> 0;
  return f;
}
const clampRange = (s, f, d) => Math.max(f, Math.min(d, s));
function expandBowlItems(s) {
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
function layoutBowlItems(s, f = BOWL_VISIBLE_LIMIT) {
  const d = [],
    r = [...s]
      .filter((T) => T.qty > 0)
      .sort((T, A) => T.id.localeCompare(A.id));
  for (const T of r)
    for (let A = 0; A < T.qty; A += 1)
      d.push({ id: T.id, key: `${T.id}-${A}` });
  const S = d.length,
    g = d.slice(0, f),
    O = expandBowlItems(g.length),
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
        const K = bowlSeed(I.key),
          rl = ((K >>> 5) % 11) - 5,
          Rl = ((K >>> 11) % 9) - 4,
          Fl = T > 1 ? 50 - E / 2 + Z * Q : 50;
        (D.push({
          key: I.key,
          id: I.id,
          x: clampRange(Fl + rl * 0.45 + G * 0.6, 29, 71),
          y: clampRange(47 - A * 10 + Rl * 0.5, 24, 52),
          rot: ((K >>> 3) % 25) - 12,
          scale: clampRange(
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
function BowlDrawing({
  entries: s,
  byId: f,
  settings: d,
  onRemove: r,
  compact: S = !1,
}) {
  const { tokens: g, overflow: O } = X.useMemo(() => layoutBowlItems(s), [s]),
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
          const A = `${T.name}，一份约 ${Math.round(portionWeight(T, 1))} 克，${portionPrice(T, 1, d).toFixed(2)} 元，点一下拿掉一份`;
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
              children: i.jsx(FoodIllustration, {
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
const formatPrice = (s) => `¥${s.toFixed(2)}`;
function WeightDisplay({
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
          children: ["⚠️ 超了 ", formatPrice(f - d), "，麻姐在看你 —— 但没说不让你夹"],
        }),
    ],
  });
}
function BasketPanel({
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
                        i.jsx(FoodIllustration, {
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
                            Math.round(portionWeight(T, _.qty)),
                            "g",
                            i.jsx("i", { children: formatPrice(portionPrice(T, _.qty, d)) }),
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
          i.jsx("span", { className: "basket-total", children: formatPrice(S) }),
        ],
      }),
    ],
  });
}
function BasketSummary(props) {
  return i.jsx(BasketDock, { ...props, api: { Icon: FoodIllustration, Face:FoodFace, money: formatPrice, weight: portionWeight, price: portionPrice } });
}
function NewsDrawer({ news: s, onClose: f }) {
  return i.jsx(LegacyDialog, {
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
function loadRecommendations(s) {
  let f = s >>> 0;
  return () => ((f = (f * 1664525 + 1013904223) >>> 0), f / 4294967295);
}
function RecommendationList({ ingredients: s, settings: f, byId: d, onApply: r, hasSelection }) {
  const [S, g] = X.useState(1),
    O = X.useMemo(() => buildRecommendations(s, loadRecommendations(S)), [s, S]);
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
          const T = summarizeBowl(_, d, f),
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
                    i.jsx("i", { children: formatPrice(T.price) }),
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
                            FoodIllustration,
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
function RecommendationDrawer({ingredients,settings,byId,onApply,open,onClose,hasSelection}) {
  return open ? i.jsx(Modal,{title:"推荐搭配",panelId:"recommendations-dialog",className:"recommendation-overlay",onClose,children:i.jsx("div",{className:"detail-body",children:i.jsx(RecommendationList,{ingredients,settings,byId,onApply,hasSelection})})}) : null;
}
function SettingsDialog({ settings: s, onSave: f, onClose: d }) {
  const [r, S] = X.useState(s),
    g = (O, D) => S((_) => ({ ..._, [O]: D }));
  return i.jsx(LegacyDialog, {
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
const CATEGORY_EMOJI = {
  leaf: "🥬",
  mushroom: "🍄",
  root: "🥕",
  tofu: "🧊",
  meat: "🍢",
  staple: "🍜",
  egg: "🥚",
};
function foodPriceLabel(s, f) {
  const d = f.separatePricing ? f.priceGroups[s.priceGroup] : f.pricePerJin;
  return (s.unitWeightG / 500) * d;
}
function IngredientButton({ ing: s, settings: f, qty: d, size: r, onAdd: S }) {
  return i.jsxs("button", {
    type: "button",
    className: `goods${d > 0 ? " goods--picked" : ""}`,
    onClick: (event) => S(s.id,event),
    title: `${s.name}　1 ${s.unitLabel} ≈ ${s.unitWeightG}g`,
    children: [
      i.jsx("span", {
        className: "goods-icon",
        children: i.jsx(FoodIllustration, {
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
          i.jsxs("em", { children: [foodPriceLabel(s, f).toFixed(1), "元"] }),
        ],
      }),
      d > 0 && i.jsxs("span", { className: "goods-badge", children: ["×", d] }),
    ],
  });
}
function IngredientShelf({
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
        CATEGORY_ORDER.filter((G) => (S === "all" ? !0 : G === S)).map((G) => ({
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
              CATEGORY_ORDER.map((G) =>
                i.jsx(
                  "button",
                  {
                    type: "button",
                    className: `tab${S === G ? " tab--on" : ""}`,
                    onClick: () => O(G),
                    children: CATEGORY_LABELS[G],
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
                    i.jsx(FoodIllustration, {
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
          T.map(({category:G,items:Z},index)=>Z.length?i.jsx(LazyRack,{category:G,items:Z,label:CATEGORY_LABELS[G],emoji:CATEGORY_EMOJI[G],big:E,defer:S==="all"&&!g&&index>0,Food:IngredientButton,settings:f,qtyOf:d,onAdd:r,size:Q},G):null),
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
const REVIEW_CHARACTERS = [
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
  clampReview = (s, f, d) => Math.max(f, Math.min(d, s));
function reviewAffinity(s, f) {
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
function reviewBand(s) {
  return s >= 75 ? "hi" : s >= 45 ? "mid" : "lo";
}
function reviewSentence(s, f) {
  let d = 0;
  for (const [r, S] of Object.entries(s.weights)) d += (S ?? 0) * (f[r] ?? 0);
  return Math.round(clampReview(50 + 55 * d, 5, 99));
}
function buildCharacterReviews(s, f, d = Math.random) {
  const r = describeBowl(s),
    S = reviewAffinity(s, f);
  return REVIEW_CHARACTERS.map((g) => {
    const O = reviewSentence(g, r),
      D = reviewBand(O);
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
    return { character: g, affinity: O, band: D, line: _ };
  });
}
function summarizeReviews(verdicts) {
 const ranked=[...verdicts].sort((a,b)=>b.affinity-a.affinity);
 return {star:ranked[0],harshest:ranked.at(-1),summary:'口味各有偏爱，喜欢这一口就好。'};
}
import {CharacterAvatar} from './art/avatar.js';
function BowlCheckout({entries, byId, settings, spice, budget, onClose, onRestart, runId,companionId,storeId,onOrderLock}) {
  const result = X.useMemo(() => {
    const totals = summarizeBowl(entries, byId, settings);
    const features = analyzeBowl(entries, byId, totals, spice, budget);
    const verdicts = buildCharacterReviews(features, spice).sort((a,b) => b.affinity-a.affinity);
    return {totals, verdicts, summary: summarizeReviews(verdicts)};
  }, [entries, byId, settings, spice, budget]);
  return i.jsx(CheckoutView, {entries, byId, settings, budget, onClose, onRestart, runId,companionId,storeId,onOrderLock, ...result,
    api: {Icon: FoodIllustration, Avatar: CharacterAvatar, Face:FoodFace, money: formatPrice, weight: portionWeight, price: portionPrice}});
}
function MalatangGame({
  ingredients: s,
  news: f,
  settings: d,
  offline: r,
  onSettings: S,
  onAdmin: g,
}) {
  const {profile:buddyHistory}=useConsumer();
  const [storeId]=X.useState(()=>resolveStoreId('malatang'));
  useStreet();
  const rawSettings=d,[frozenDiscount,freezeDiscount]=X.useState(null),storeDiscount=frozenDiscount??getStoreDiscount('malatang');
  d=X.useMemo(()=>({...rawSettings,pricePerJin:rawSettings.pricePerJin*storeDiscount,priceGroups:Object.fromEntries(Object.entries(rawSettings.priceGroups).map(([key,value])=>[key,value*storeDiscount]))}),[rawSettings,storeDiscount]);

  const O =
      window.location.pathname.replace(/\/+$/, "").endsWith("/demo") ||
      new URLSearchParams(window.location.search).get("demo") === "1",
    [D, _] = X.useReducer(bowlReducer, d, (ol) => {
      const el = initialBowl(ol.budgetDefault),plan=peekOuting("malatang");
      el.companionId=plan?.buddyId||readOuting().buddyId;
      if(plan){el.entries=plan.recipe.entries;el.budget=plan.budget;el.spice=plan.recipe.spice;el.outingPlan=plan;}
      if (!O) return el;
      const dl = buildRecommendations(s, () => 0.5)[1];
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
  const handleOrderLock=value=>{orderLock.current=value;if(value)freezeDiscount(storeDiscount);else if(!Object.entries(walletSnapshot().wallet.orders).some(([id,o])=>id.startsWith(D.runId+':')&&o.status!=='refunded'))freezeDiscount(null);};
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
    rl = X.useMemo(() => summarizeBowl(D.entries, K, d), [D.entries, K, d]),
    Rl = X.useMemo(
      () => analyzeBowl(D.entries, K, rl, D.spice, D.budget),
      [D.entries, K, rl, D.spice, D.budget],
    ),
    Fl = rl.price > D.budget && D.budget > 0,
    vl = (ol) => D.entries.find((el) => el.id === ol)?.qty ?? 0;
  const buddy=buddyById(D.companionId),rememberedGreeting=memoryLine(companionMemory(buddyHistory,buddy.id),{game:"malatang"});
  let Dl = `${buddy.name}：${rememberedGreeting||companionLine(buddy.id,{game:"malatang",items:D.entries.map(e=>({...e,name:K.get(e.id)?.name}))})}`;
  return (
    D.entries.length === 0
      ? (Dl = rememberedGreeting?`${buddy.name}：${rememberedGreeting}`:`先夹点喜欢的吧，${buddy.name}陪你吃。`)
      : Fl
        ? (Dl = "这盆超出刚才的预算啦，按自己的胃口来就好。")
        : Rl.vegShare < 0.2
          ? (Dl = "一把绿叶都没有，加两把菜？盆会更满、秤不会更重。")
          : Rl.proteinShare < 0.15
            ? (Dl = "蛋白质有点少，来点肉或者豆腐。")
            : Rl.budgetRatio > 0.85 && (Dl = "快到预算了，再夹就超。"),
    i.jsxs("div", {
      className: "app",
      children: [
        i.jsx(WeightDisplay, {
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
            i.jsx(CharacterAvatar, { id:buddy.id,name:buddy.name,size:30,color:buddy.color }),
            i.jsx("span", { children: Dl }),
          ],
        }),
        i.jsx("main", {
          className: "stage",
          children: i.jsx(IngredientShelf, {
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
        i.jsx(RecommendationDrawer, {
          open:recommendations,onClose:()=>setRecommendations(false),hasSelection:D.entries.length>0,
          ingredients: s,
          settings: d,
          byId: K,
          onApply: (ol) => {if(!orderLock.current){pickSource.current=null;_({ type: "apply", entries: ol });setRecommendations(false);}},
        }),
        i.jsx(BasketSummary, {
          runId:D.runId,pickSource,onRecommendations:()=>setRecommendations(true),recommendationsOpen:recommendations,storeId,onOrderLock:handleOrderLock,
          entries: D.entries,
          byId: K,
          settings: d,
          weight: rl.weightG,
          price: rl.price,
          budget: D.budget,
          canWeigh: D.entries.length > 0,
          onRemove: (ol) => !orderLock.current && _({ type: "removeOne", id: ol }),
          onAdd: addToBowl,
          onClear: () => {if(!orderLock.current){freezeDiscount(null);_({type:"clear"});}},
          onWeigh: () => Z(!0),
        }),
        T && i.jsx(NewsDrawer, { news: f, onClose: () => A(!1) }),
        E &&
          i.jsx(SettingsDialog, {
            settings: rawSettings,
            onClose: () => Q(!1),
            onSave: (ol) => {
              (S(ol), Q(!1));
            },
          }),
        G &&
          i.jsx(BowlCheckout, {
            runId: D.runId,companionId:D.companionId,storeId,onOrderLock:handleOrderLock,
            entries: D.entries,
            byId: K,
            settings: d,
            spice: D.spice,
            budget: D.budget,
            onClose: () => Z(!1),
            onRestart: () => {freezeDiscount(null);
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
      apiClient.get("/api/auth/me")
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
                          (await apiClient.post("/api/auth/logout"), d(null));
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
          const E = await apiClient.post("/api/auth/login", {
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
        f(await apiClient.get("/api/admin/ingredients"));
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
          ? await apiClient.patch(`/api/admin/ingredients/${T.id}`, T)
          : await apiClient.post("/api/admin/ingredients", T),
          r(null),
          await O());
      } catch (A) {
        g(A.message);
      }
    },
    _ = async (T) => {
      confirm("下架这个食材？（玩家端会立刻看不到）") &&
        (await apiClient.del(`/api/admin/ingredients/${T}`), await O());
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
                          i.jsx(FoodIllustration, {
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
                    i.jsx("td", { children: CATEGORY_LABELS[T.category] }),
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
  return i.jsx(LegacyDialog, {
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
                  children: CATEGORY_ORDER.map((g) =>
                    i.jsx("option", { value: g, children: CATEGORY_LABELS[g] }, g),
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
                      children: i.jsx(FoodIllustration, {
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
      f(await apiClient.get("/api/admin/news"));
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
                          (await apiClient.del(`/api/admin/news/${g.id}`), await S());
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
          i.jsx(LegacyDialog, {
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
                      ? await apiClient.patch(`/api/admin/news/${d.id}`, d)
                      : await apiClient.post("/api/admin/news", d),
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
      d(await apiClient.get("/api/admin/accounts"));
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
              (await apiClient.post("/api/admin/accounts", {
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
                              (await apiClient.del(`/api/admin/accounts/${A.id}`),
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
      apiClient.get("/api/bootstrap")
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
                (await apiClient.patch("/api/admin/settings", f), S("已保存"));
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
                  (await apiClient.post("/api/auth/password", { current: g, next: D }),
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
const SETTINGS_KEY = "malatang.settings";
function readSettings() {
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    return s ? JSON.parse(s) : {};
  } catch {
    return {};
  }
}
function MalatangApp() {
  const [s, f] = X.useState(() => STATIC_MODE?builtInBootstrap():null),
    [d, r] = X.useState(readSettings),
    [S, g] = X.useState(() =>
      isAdminPath() ? "admin" : "play",
    );
  (X.useEffect(() => {
    loadBootstrap().then(f);
  }, []),
    X.useEffect(() => {
      const T = () =>
        g(isAdminPath() ? "admin" : "play");
      return (
        window.addEventListener("popstate", T),
        () => window.removeEventListener("popstate", T)
      );
    }, []));
  const O = X.useCallback((T) => {
      const A = T === "admin" ? assetUrl("admin") : basePath+"#malatang";
      (window.history.pushState({}, "", A), g(T));
    }, []),
    D = X.useCallback((T) => {
      r(T);
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(T));
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
  const _ = { ...DEFAULT_SETTINGS, ...s.settings, ...d };
  return S === "admin"
    ? i.jsx(L3, { onExit: () => O("play") })
    : i.jsx(MalatangGame, {
        ingredients: s.ingredients,
        news: s.news,
        settings: _,
        offline: s.offline,
        onSettings: D,
        onAdmin: () => O("admin"),
      });
}

export {MalatangApp};
