export const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
export const money = (n) => `${Math.ceil(n)} 金币`;
const average = (values) =>
  values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
const validTick = (a) => Number.isFinite(a.dt) && a.dt >= 0;
export const heatState = (time, target) =>
  time < target * 0.85 ? "raw" : time <= target * 1.3 ? "ready" : time <= target * 1.65 ? "overdone" : "burned";
export const heatLabel = (timeState) =>
  ({ raw: "还没到火候", ready: "刚刚好", overdone: "有点老", burned: "火候过了" })[timeState];
export function heatQuality(time, target) {
  const ratio = time / target;
  return Math.round(
    ratio < 0.75 ? clamp(ratio * 45) : clamp(100 - Math.abs(ratio - 1) * 130),
  );
}
export const GRILL_MENU = [
  ["lamb", "yangroujuan", "羊肉串", 10, 4],
  ["beef", "feiniujuan", "肥牛串", 9, 4],
  ["chicken", "jixiongrou", "鸡肉串", 11, 3],
  ["shrimp", "xianxia", "鲜虾串", 8, 5],
  ["sausage", "qinqinchang", "亲亲肠", 7, 3],
  ["squid", "youyuquan", "鱿鱼圈串", 8, 4],
  ["mushroom", "xianggu", "香菇串", 8, 2],
  ["tofu", "dougan", "豆干串", 7, 2],
  ["corn", "yumi", "玉米串", 12, 3],
  ["broccoli", "xilanhua", "西兰花串", 6, 2],
  ["eggplant", "qiezi", "茄子串", 10, 2],
  ["lotus", "oupian", "藕片串", 9, 2],
].map(([id, food, name, cook, price]) => ({ id, food, name, cook, price }));
export const initialBBQ = (round = 0) => ({
  phase: "select",
  round,
  budget: 30,
  selected: [],
  items: [],
  season: null,
  seasonApplied: null,
  sprinkleCount: 0,
  feedback: "先选几串，今晚的手艺从这里开始。",
  elapsed: 0,
  paused: false,
  serial: 0,
});
export function bbqReducer(s, a) {
  if (a.type === "reset") return initialBBQ(s.round + 1);
  if (a.type === "pause") return { ...s, paused: a.value };
  if (a.type === "add" && s.phase === "select" && s.selected.length < 6) {
    const food = GRILL_MENU.find((f) => f.id === a.id);
    return food
      ? {
          ...s,
          serial: s.serial + 1,
          selected: [...s.selected, { ...food, key: s.serial }],
        }
      : s;
  }
  if (a.type === "remove" && s.phase === "select")
    return { ...s, selected: s.selected.filter((f) => f.key !== a.key) };
  if (a.type === "budget" && s.phase === "select")
    return { ...s, budget: clamp(Number(a.value) || 10, 10, 100) };
  if (
    a.type === "season" &&
    ["select", "cooking"].includes(s.phase) &&
    ["孜然", "辣椒", "蜜汁"].includes(a.value)
  )
    return s.phase === "cooking" && s.paused ? s : { ...s, season: a.value };
  if (a.type === "start" && s.phase === "select" && s.selected.length)
    return {
      ...s,
      phase: "cooking",
      elapsed: 0,
      paused: false,
      feedback: "炭火起来了，点每串分别翻面；也可以原味吃。",
      items: s.selected.map((f) => ({
        ...f,
        side: 0,
        sides: [0, 0],
        flips: 0,
        resting: false,
      })),
    };
  if (a.type === "tick" && validTick(a) && s.phase === "cooking" && !s.paused) {
    const dt = a.dt;
    const next = {
      ...s,
      elapsed: s.elapsed + dt,
      items: s.items.map((f) => ({
        ...f,
        sides: f.sides.map(
          (t, index) => t + (index === f.side && !f.resting ? dt : 0),
        ),
      })),
    };
    return next;
  }
  if (a.type === "flip" && s.phase === "cooking" && !s.paused) {
    const food = s.items.find((f) => f.key === a.key);
    if (!food || food.resting) return s;
    return {
      ...s,
      feedback: `${food.name}翻过来啦，接着慢慢烤。`,
      items: s.items.map((f) =>
        f.key === a.key ? { ...f, side: 1 - f.side, flips: f.flips + 1 } : f,
      ),
    };
  }
  if (a.type === "rest" && s.phase === "cooking" && !s.paused) {
    const food = s.items.find((f) => f.key === a.key);
    if (!food) return s;
    return {
      ...s,
      feedback: food.resting
        ? `${food.name}回炉了，小心看火候。`
        : `${food.name}夹到保温区，火候暂停变化。`,
      items: s.items.map((f) =>
        f.key === a.key ? { ...f, resting: !f.resting } : f,
      ),
    };
  }
  if (a.type === "sprinkle" && s.phase === "cooking" && !s.paused && s.season) {
    const targets=s.items.filter(f=>a.key===undefined||f.key===a.key);
    if(!targets.length)return s;
    return {...s,seasonApplied:s.season,sprinkleCount:s.sprinkleCount+1,
      items:s.items.map(f=>targets.includes(f)?{...f,season:s.season}:f),
      feedback:`${targets.length===1?targets[0].name:targets.length+'串'}撒上${s.season}，香味飘过来啦！`};
  }
  if (a.type === "serve" && s.phase === "cooking" && !s.paused)
    return {...s,phase:"result",paused:false,total:s.items.reduce((n,f)=>n+f.price,0)};
  return s;
}

export const TEAS = [
  { id: "black", name: "红茶", color: "#B77B54" },
  { id: "jasmine", name: "茉莉绿茶", color: "#B6BE83" },
  { id: "oolong", name: "乌龙茶", color: "#BF9C6C" },
  { id: "matcha", name: "抹茶", color: "#8FAA70" },
  { id: "cocoa", name: "可可", color: "#A27C65" },
  { id: "coffee", name: "咖啡", color: "#8E6C57" },
];
export const MILKS = ["鲜奶", "燕麦奶", "奶盖", "无奶"];
export const TOPPINGS = [
  { id: "pearl", name: "珍珠", color: "#675044" },
  { id: "coconut", name: "椰果", color: "#F1E9D8" },
  { id: "bean", name: "红豆", color: "#A67370" },
  { id: "grass", name: "仙草", color: "#625C52" },
  { id: "pudding", name: "布丁", color: "#E9C46D" },
  { id: "taro", name: "芋泥", color: "#C4ABC3" },
  { id: "sago", name: "西米", color: "#E1D7BD" },
];
export const initialTea = (round = 0) => ({
  phase: "recipe",
  round,
  tea: "black",
  milk: "鲜奶",
  sugar: 50,
  ice: "少冰",
  size: 500,
  toppings: [],
  mixTime: 0,
  mix: 0,
  shakes: 0,
  strawPoked: false,
  paused: false,
});
export const teaPrice = (s) =>
  5 +
  (s.milk === "无奶" ? 0 : s.milk === "奶盖" ? 4 : 3) +
  (s.size === 700 ? 3 : 0) +
  s.toppings.length * 2;
export function teaReducer(s, a) {
  if (a.type === "reset") return initialTea(s.round + 1);
  if(a.type === "shake" && ["recipe","mixing"].includes(s.phase) && !s.paused) return {...s,shakes:s.shakes+1,mix:Math.min(1,s.mix+.35)};
  if(a.type === "poke" && ["mixing","result"].includes(s.phase) && !s.paused)return {...s,strawPoked:true};
  if (a.type === "pause") return { ...s, paused: a.value };
  if (a.type === "set" && s.phase === "recipe") {
    const choices = {
      tea: TEAS.map((t) => t.id),
      milk: MILKS,
      sugar: [0, 25, 50, 75, 100],
      ice: ["无冰", "少冰", "正常冰"],
      size: [500, 700],
    };
    return choices[a.field]?.includes(a.value)
      ? { ...s, [a.field]: a.value }
      : s;
  }
  if (
    a.type === "topping" &&
    s.phase === "recipe" &&
    TOPPINGS.some((t) => t.id === a.id)
  )
    return {
      ...s,
      toppings: s.toppings.includes(a.id)
        ? s.toppings.filter((t) => t !== a.id)
        : s.toppings.length < 3
          ? [...s.toppings, a.id]
          : s.toppings,
    };
  if (a.type === "mix" && s.phase === "recipe")
    return { ...s, phase: "mixing", mixTime: 0, paused: false };
  if (a.type === "tick" && validTick(a) && s.phase === "mixing" && !s.paused) {
    const next = { ...s, mixTime: Math.min(4, s.mixTime + a.dt) };
    if (next.mixTime < 4) return next;
    return {...next,phase:"result",total:teaPrice(s)};
  }
  return s;
}

export const BROTHS = [
  { name: "三鲜清汤", color: "#E7D3A1" },
  { name: "麻辣红汤", color: "#CF7854" },
  { name: "番茄浓汤", color: "#DA9874" },
  { name: "菌菇汤", color: "#BEA17C" },
];
export const POT_MENU = [
  ["spinach", "菠菜", 6, 1],
  ["feiniujuan", "肥牛卷", 8, 4],
  ["xiahua", "虾滑", 12, 4],
  ["oupian", "藕片", 16, 2],
  ["tudoupian", "土豆片", 18, 2],
  ["dongdoufu", "冻豆腐", 15, 2],
  ["kuanfen", "宽粉", 22, 3],
  ["xianxia", "鲜虾", 14, 4],
  ["helandou", "荷兰豆", 10, 2],
  ["niangao", "年糕", 16, 2],
  ["xianggu", "香菇", 12, 2],
  ["yuwan", "鱼丸", 18, 3],
].map(([id, name, cook, price]) => ({ id, food: id, name, cook, price }));
export const initialHotpot = (round = 0) => ({
  phase: "setup",
  round,
  broth: "三鲜清汤",
  budget: 30,
  pot: [],
  served: [],
  added: 0,
  elapsed: 0,
  paused: false,
  serial: 0,
});
export function hotpotReducer(s, a) {
  if(a.type === "add_batch"){
    if(!Array.isArray(a.ids)||!a.ids.length||a.ids.length+s.pot.length>6||s.paused||!["setup","cooking"].includes(s.phase)||!a.ids.every(id=>POT_MENU.some(f=>f.id===id)))return s;
    return a.ids.reduce((next,id)=>hotpotReducer(next,{type:"add",id}),s);
  }
  if (a.type === "reset") return initialHotpot(s.round + 1);
  if (a.type === "pause") return { ...s, paused: a.value };
  if (
    a.type === "broth" &&
    s.phase === "setup" &&
    BROTHS.some((b) => b.name === a.value)
  )
    return { ...s, broth: a.value };
  if (a.type === "start" && s.phase === "setup")
    return { ...s, phase: "cooking", paused: false };
  if (
    a.type === "add" &&
    (s.phase === "setup" || (s.phase === "cooking" && !s.paused)) &&
    s.pot.length < 6
  ) {
    const food = POT_MENU.find((f) => f.id === a.id);
    return food
      ? {
          ...s,
          phase:"cooking",paused:false,
          serial: s.serial + 1,
          added: s.added + 1,
          pot: [...s.pot, { ...food, key: s.serial, age: 0 }],
        }
      : s;
  }
  if(a.type === "return" && s.phase === "cooking" && !s.paused && s.pot.length<6) {
    const food=s.served.find(f=>f.key===a.key);
    if(!food)return s;
    const {quality,...reheat}=food;
    return {...s,pot:[...s.pot,reheat],served:s.served.filter(f=>f.key!==a.key)};
  }
  if (a.type === "take" && s.phase === "cooking" && !s.paused) {
    const food = s.pot.find((f) => f.key === a.key);
    return food
      ? {
          ...s,
          pot: s.pot.filter((f) => f.key !== a.key),
          served: [
            ...s.served,
            { ...food, quality: heatQuality(food.age, food.cook) },
          ],
        }
      : s;
  }
  if (a.type === "tick" && validTick(a) && s.phase === "cooking" && !s.paused) {
    const dt = a.dt;
    const next = {
      ...s,
      elapsed: s.elapsed + dt,
      pot: s.pot.map((f) => ({ ...f, age: f.age + dt })),
    };
    return next;
  }
  if (
    a.type === "finish" &&
    s.phase === "cooking" && !s.paused &&
    s.pot.length === 0 && s.served.length > 0
  ) {
    return {...s,phase:"result",paused:false,total:s.served.reduce((n,f)=>n+f.price,0)};
  }
  return s;
}

export const FILLINGS = [
  ["lettuce", "生菜"],
  ["huotuichang", "火腿肠"],
  ["peigen", "培根"],
  ["huanggua", "黄瓜"],
  ["dougan", "豆干"],
  ["xihulu", "西葫芦"],
  ["jixiongrou", "鸡胸肉"],
  ["youtiao", "油条"],
].map(([id, name]) => ({ id, food: id, name }));
export const initialBreakfast = () => ({
  phase: "ready",
  base: "煎饼",
  egg: false,
  fillings: [],
  sauce: "甜面酱",
  side: 0,
  sides: [0, 0],
  elapsed: 0,
  paused: false,
});
export function breakfastReducer(s, a) {
  if (a.type === "reset") return initialBreakfast();
  if(a.type === "spread" && s.phase === "cooking" && !s.paused)return {...s,spread:true};
  if (a.type === "pause") return { ...s, paused: a.value };
  if(a.type === "wrap" && s.phase === "cooking" && !s.paused)return breakfastReducer(breakfastReducer(s,{type:"plate"}),{type:"deliver"});
  if (
    a.type === "base" &&
    s.phase === "ready" &&
    ["煎饼", "手抓饼"].includes(a.value)
  )
    return { ...s, base: a.value };
  if (a.type === "egg" && s.phase === "cooking" && !s.paused && !s.egg)
    return { ...s, egg: true };
  if (a.type === "start" && s.phase === "ready")
    return { ...s, phase: "cooking", paused: false };
  if (
    a.type === "tick" &&
    validTick(a) &&
    ["cooking", "assembling"].includes(s.phase) &&
    !s.paused
  ) {
    const dt = a.dt;
    const next = {
      ...s,
      elapsed: s.elapsed + dt,
      sides: s.sides.map(
        (t, i) => t + (s.phase === "cooking" && i === s.side ? dt : 0),
      ),
    };
    return next;
  }
  if (a.type === "flip" && s.phase === "cooking" && !s.paused)
    return { ...s, side: 1 - s.side };
  if (a.type === "plate" && s.phase === "cooking" && !s.paused)
    return { ...s, phase: "assembling" };
  if (
    a.type === "filling" &&
    ["cooking","assembling"].includes(s.phase) &&
    !s.paused &&
    FILLINGS.some((f) => f.id === a.id)
  )
    return {
      ...s,phase:"assembling",
      fillings: s.fillings.includes(a.id)
        ? s.fillings.filter((f) => f !== a.id)
        : s.fillings.length < 3
          ? [...s.fillings, a.id]
          : s.fillings,
    };
  if (
    a.type === "sauce" &&
    ["cooking","assembling"].includes(s.phase) &&
    !s.paused &&
    ["甜面酱", "辣酱", "番茄酱"].includes(a.value)
  )
    return { ...s, phase:"assembling",sauce: a.value };
  if (a.type === "deliver" && s.phase === "assembling" && !s.paused) return {...s,phase:"result"};
  if (a.type === "next" && s.phase === "result") return initialBreakfast();
  return s;
}

export function bbqItemNotes(food) {
  const status=bbqStatus(food);
  return status.kind === "burned"?"烤得有点过，下次早点夹出保温。":status.kind === "overdone"?"烤得有点老，趁热慢慢吃。":status.kind === "ready"?"烤得刚好，趁热吃。":"还欠一点火候，翻一翻再烤会儿。";
}
export function bbqAdvice(s) {
  const burned = s.items.filter((f) =>
    f.sides.some((t) => heatState(t, f.cook) === "burned"),
  ).length;
  const raw = s.items.filter((f) =>
    f.sides.some((t) => heatState(t, f.cook) === "raw"),
  ).length;
  if (burned)
    return `${burned}串烤过头了，下回看到火候刚好就翻面或出炉。${raw ? `还有${raw}串还欠点火候，记得分别照顾。` : ""}`;
  if (raw) return `有${raw}串还欠点火候，翻一翻再烤会儿就好。`;
  if(s.items.some(f=>f.sides.some(t=>heatState(t,f.cook)==="overdone")))return "烤得有点老，下回早点夹出；这一盘慢慢吃。";
  return s.items.some(f=>f.season)?"香味落在串上啦，趁热一起吃！":"原味也香，按自己喜欢的来。";
}

// The label describes the whole skewer, not only the face touching the grill.
export function bbqStatus(food) {
  const sides=food.sides || [0,0],current=heatState(sides[food.side || 0],food.cook),other=heatState(sides[1-(food.side || 0)],food.cook);
  if(sides.some(t=>heatState(t,food.cook)==='burned'))return {kind:'burned',label:'烤过头',hint:food.resting?'已离火':'可夹出'};
  if(sides.some(t=>heatState(t,food.cook)==='overdone'))return {kind:'overdone',label:'有点老',hint:food.resting?'已离火':'可夹出'};
  if(sides.every(t=>heatState(t,food.cook)==='ready'))return {kind:'ready',label:food.resting?'已熟保温':'烤好了',hint:food.resting?'已离火':'可夹出'};
  if(food.resting)return {kind:'raw',label:'未熟保温',hint:'可回炉'};
  if(current==='ready' && other==='raw')return {kind:'turn',label:'翻一翻',hint:'点串翻面'};
  return {kind:'raw',label:'未熟',hint:'点串翻面'};
}
