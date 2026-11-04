export const SHOP_ITEMS = [
  {
    id: "theme-cream",
    type: "theme",
    value: "cream",
    name: "暖奶油",
    price: 0,
    description: "熟悉的暖色小馆，随时换回来。",
    art: "cream",
  },
  {
    id: "theme-mint",
    type: "theme",
    value: "mint",
    name: "薄荷小馆",
    price: 120,
    description: "换一张浅绿桌布，心情清清爽爽。",
    art: "mint",
  },
  {
    id: "theme-peach",
    type: "theme",
    value: "peach",
    name: "蜜桃小馆",
    price: 120,
    description: "小馆换上柔和的蜜桃暖色。",
    art: "peach",
  },
  {
    id: "sign-default",
    type: "sign",
    value: "default",
    name: "好好玩，慢慢吃",
    price: 0,
    description: "小馆最初的手写招牌。",
    art: "sign",
  },
  {
    id: "sign-night",
    type: "sign",
    value: "night",
    name: "夜市食神招牌",
    price: 70,
    description: "把专属招牌挂在首页和小店门口。",
    art: "sign",
  },
  {
    id: "tray-plain",
    type: "tray",
    value: "plain",
    name: "素色餐盘",
    price: 0,
    description: "干净朴素的一只餐盘。",
    art: "tray",
  },
  {
    id: "tray-gold",
    type: "tray",
    value: "gold",
    name: "金边餐盘",
    price: 160,
    description: "烧烤出炉和结算单都添一道金边。",
    art: "tray",
  },
  {
    id: "grill-classic",
    type: "grill",
    value: "classic",
    name: "老伙计烤炉",
    price: 0,
    description: "一直陪你看火候的老伙计。",
    art: "grill",
  },
  {
    id: "grill-copper",
    type: "grill",
    value: "copper",
    name: "暖铜烤炉",
    price: 200,
    description: "给烤炉换件暖铜外衣，火候规则照旧。",
    art: "grill",
  },
];
const freeItems = SHOP_ITEMS.filter((item) => item.price === 0).map(
  (item) => item.id,
);
export function newRunId(game) {
  return `${game}:${globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}`;
}
export const localDay = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
export const MEMBERS = [
  { min: 0, name: "初来小馆" }, { min: 300, name: "街坊熟客" },
  { min: 1000, name: "银卡会员" }, { min: 3000, name: "金卡会员" },
  { min: 6000, name: "黑金食客" },
];
export function membership(spent = 0) {
  const index = MEMBERS.findLastIndex(t => spent >= t.min);
  return { ...MEMBERS[Math.max(0,index)], next: MEMBERS[index + 1] || null };
}
export function initialWallet() {
  return { version: 2, balance: 0, spent: 0, owned: [...freeItems],
    equipped: {theme:"cream",sign:"default",tray:"plain",grill:"classic"},
    gifts: {}, orders: {}, ledger: [], revision: 0 };
}
export function validWallet(w) {
  return !!w && [1,2].includes(w.version) && Number.isSafeInteger(w.balance) && w.balance >= 0 && w.balance <= 1e9 &&
    Array.isArray(w.owned) && freeItems.every(id => w.owned.includes(id)) &&
    w.owned.every(id => SHOP_ITEMS.some(item => item.id === id)) && !!w.equipped &&
    ["theme","sign","tray","grill"].every(type => SHOP_ITEMS.some(item => item.type === type && item.value === w.equipped[type] && w.owned.includes(item.id))) &&
    Array.isArray(w.ledger) && w.ledger.every(t => t && typeof t.label === "string" && Number.isSafeInteger(t.amount) && Number.isFinite(t.at)) &&
    (w.version === 1 || (Number.isSafeInteger(w.spent) && w.spent >= 0 && w.gifts && typeof w.gifts === "object" && !Array.isArray(w.gifts) && w.orders && typeof w.orders === "object" && !Array.isArray(w.orders) && Object.values(w.orders).every(o => o && Number.isSafeInteger(o.amount) && o.amount > 0 && ["pending","completed","refunded"].includes(o.status) && typeof o.label === "string" && Array.isArray(o.payments) && o.payments.every(id => typeof id === "string"))));
}
export function migrateWallet(w) {
  if (!validWallet(w)) throw Error("Invalid wallet");
  if (w.version === 2) return w;
  return {...initialWallet(), balance:w.balance, owned:w.owned, equipped:w.equipped, ledger:w.ledger, revision:w.revision || 0};
}
const appendLedger = (w, tx) => {
  const list = [tx,...w.ledger];
  if(list.length <= 200) return list;
  const older = list.slice(199);
  return [...list.slice(0,199), {id:"carried-forward",label:"更早的收支合计",amount:older.reduce((n,t)=>n+t.amount,0),at:older.at(-1).at}];
};
export function dailyGift(w, day = localDay(), now = Date.now()) {
  if(Object.hasOwn(w.gifts,day)) return {wallet:w,status:"claimed"};
  return {wallet:{...w,balance:w.balance+100,gifts:{...w.gifts,[day]:true},revision:w.revision+1,
    ledger:appendLedger(w,{id:`daily:${day}`,label:"每日小馆礼金",amount:100,at:now})},status:"gifted"};
}
export function payOrder(w, {id, paymentId = id, amount, label}, now = Date.now()) {
  if(typeof id !== "string" || !id || typeof paymentId !== "string" || !Number.isSafeInteger(amount) || amount <= 0 || amount > 1e6 || typeof label !== "string") return {wallet:w,status:"invalid"};
  const old = w.orders[id];
  if(old?.payments?.includes(paymentId)) return {wallet:w,status:"paid",order:old};
  if(old && old.status !== "pending") return {wallet:w,status:"closed"};
  if(w.balance < amount) return {wallet:w,status:"insufficient"};
  const order = {amount:(old?.amount || 0)+amount,status:"pending",label,payments:[...(old?.payments || []),paymentId]};
  return {wallet:{...w,balance:w.balance-amount,spent:w.spent+amount,orders:{...w.orders,[id]:order},revision:w.revision+1,
    ledger:appendLedger(w,{id:paymentId,label,amount:-amount,at:now})},status:"paid",order};
}
export function closeOrder(w,id,refund=false,now=Date.now()) {
  const order=w.orders[id];
  if(!order || order.status !== "pending") return {wallet:w,status:"unchanged"};
  return {wallet:{...w,balance:w.balance+(refund?order.amount:0),spent:w.spent-(refund?order.amount:0),
    orders:{...w.orders,[id]:{...order,status:refund?"refunded":"completed"}},revision:w.revision+1,
    ledger:refund?appendLedger(w,{id:`refund:${id}`,label:`取消退款 · ${order.label}`,amount:order.amount,at:now}):w.ledger},status:refund?"refunded":"completed"};
}
export function equip(w, id) {
  const item = SHOP_ITEMS.find((item) => item.id === id);
  if (!item) return { wallet: w, status: "invalid" };
  if (!w.owned.includes(id)) return { wallet: w, status: "not-owned" };
  if (w.equipped[item.type] === item.value)
    return { wallet: w, status: "equipped" };
  return {
    wallet: {
      ...w,
      equipped: { ...w.equipped, [item.type]: item.value },
      revision: w.revision + 1,
    },
    status: "equipped",
  };
}
export function purchase(w, id, now = Date.now()) {
  const item = SHOP_ITEMS.find((item) => item.id === id);
  if (!item) return { wallet: w, status: "invalid" };
  if (w.owned.includes(id)) return { ...equip(w, id), status: "owned" };
  if (w.balance < item.price) return { wallet: w, status: "insufficient" };
  const tx = {
    id: `purchase:${id}`,
    label: `购买${item.name}`,
    amount: -item.price,
    at: now,
  };
  return {
    wallet: {
      ...w,
      balance: w.balance - item.price,
      spent: w.spent + item.price,
      owned: [...w.owned, id],
      equipped: { ...w.equipped, [item.type]: item.value },
      ledger: appendLedger(w, tx),
      revision: w.revision + 1,
    },
    status: "purchased",
  };
}
