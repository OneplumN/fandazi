import {DomainNotice,MoveIn,PRIMARY_ORIGIN,LEGACY_ORIGIN} from './domain-move.js';
import {useOuting} from './outing-store.js';
import {MealMemento} from './memento.js';
import {TodayMeal} from "./outing-ui.js";
import { WalletBadge, WalletSkin, ShopPage, useWallet, MemberCard } from "./wallet-ui.js";
import { X as React } from "../../vendor/react-runtime.js";
import { h } from "./common.js";
import { ShopArt } from "./art.js";
import { BBQ } from "./bbq.js";
import { MilkTea } from "./milk-tea.js";
import { Hotpot } from "./hotpot.js";
import { Breakfast } from "./breakfast.js";
const stores = [
  {
    id: "breakfast",
    name: "早餐小摊",
    kind: "breakfast",
    label: "摊饼 · 加料 · 趁热吃",
    desc: "一份10金币，鸡蛋和三种配菜随心搭。",
    tag: "早起有好事",
  },
  {
    id: "hotpot",
    name: "火锅搭子",
    kind: "hotpot",
    label: "下锅 · 等候 · 趁好捞起",
    desc: "不同的菜有不同的脾气，咕嘟声里看准时机。",
    tag: "一锅热闹",
  },
  {
    id: "tea",
    name: "奶茶实验室",
    kind: "tea",
    label: "调配 · 摇匀 · 客人试饮",
    desc: "把茶香、奶香和今天的灵感摇进杯子里。",
    tag: "你的独家特调",
  },
  {
    id: "malatang",
    name: "麻辣搭子",
    kind: "malatang",
    label: "选菜 · 开吃 · 搭子陪你",
    desc: "夹一盆自己喜欢的，看看预算和口味合不合拍。",
    tag: "熟悉的老朋友",
  },
  {
    id: "bbq",
    name: "烧烤搭子",
    kind: "bbq",
    label: "选串 · 翻面 · 看火候",
    desc: "炭火正旺，别忘了给每串翻个面。",
    tag: "新店开张",
  },
];
stores.sort(
  (a, b) =>
    ["malatang", "bbq", "tea", "hotpot", "breakfast"].indexOf(a.id) -
    ["malatang", "bbq", "tea", "hotpot", "breakfast"].indexOf(b.id),
);
export function GameCollection(props) {
  return h(
    React.Fragment,
    null,
    h(WalletSkin, {}),
    h(CollectionContents, props),
  );
}
function CollectionContents({ api, Malatang }) {
  const { wallet } = useWallet();
  const {profile}=useOuting();
  const route = () =>
    window.location.pathname.startsWith("/admin")
      ? "malatang"
      : window.location.hash.slice(1).split("?")[0] || "home";
  const [current, setCurrent] = React.useState(route);
  React.useEffect(() => {
    const change = () => {
      setCurrent(route());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", change);
    window.addEventListener("popstate", change);
    return () => {
      window.removeEventListener("hashchange", change);
      window.removeEventListener("popstate", change);
    };
  }, []);
  React.useEffect(() => {
    const item = stores.find((item) => item.id === current);
    document.title =
      current === "receipt" ? "今天的小票 · 搭子小馆" : current === "move-in" ? "接回存档 · 搭子小馆" : current === "shop"
        ? "小馆装扮铺 · 搭子小馆"
        : item
          ? `${item.name} · 搭子小馆`
          : "搭子小馆 · 今天想吃哪一味";
    if (!item && current !== "shop")
      window.render_game_to_text = () =>
        JSON.stringify({ game: "home", stores: stores.map((item) => item.id) });
  }, [current]);
  if(current === "move-in")return h(MoveIn);
  if(current === "receipt")return h("main",{className:"game-shell receipt-page"},h("a",{href:"#home",className:"game-back"},"← 小馆首页"),profile.lastMeal?h(MealMemento,{saved:profile.lastMeal,api}):h("p",null,"先和搭子吃一顿，再来留张小票。"));
  if (current === "shop") return h(ShopPage, { api });
  if (current === "malatang")
    return h(
      React.Fragment,
      null,
      h(
        "nav",
        { className: "malatang-game-nav" },
        h("a", { href: "#home" }, "← 小馆首页"),
        h(WalletBadge, {}),
      ),
      h(Malatang),
    );
  if (current === "bbq") return h(BBQ, { api });
  if (current === "tea") return h(MilkTea, { api });
  if (current === "hotpot") return h(Hotpot, { api });
  if (current === "breakfast") return h(Breakfast, { api });
  return h(
    "main",
    { className: "game-shell game-home" },
    h(
      "header",
      { className: "hub-header" },
      h(
        "a",
        { href: "#home", className: "hub-logo" },
        h("span", null, "搭"),
        h("b", null, "搭子小馆"),
      ),
      h(WalletBadge, {}),
    ),
    h(DomainNotice),
    h(TodayMeal,{api,balance:wallet.balance}),
    profile.lastMeal&&h("a",{href:"#receipt",className:"last-meal-link"},`看看上一顿的小票 · ${profile.lastMeal.store} →`),
    h(
      "div",
      { className: "hub-section-title" },
      h("h2", null, "沿着香味，挑一家"),
      h("span", null, "每家都有自己的小脾气"),
    ),
    h(
      "section",
      { className: "store-grid" },
      stores.map((store, index) =>
        h(
          "a",
          {
            key: store.id,
            href: `#${store.id}`,
            className: `store-card store-${store.id}`,
          },
          h(
            "div",
            { className: "store-card-top" },
            h("span", null, `0${index + 1}`),
            h("i", null, store.tag),
          ),
          h(ShopArt, { kind: store.kind, api }),
          h(
            "div",
            { className: "store-card-copy" },
            h("h2", null, store.name),
            h("small", null, store.label),
            h("p", null, store.desc),
            h(
              "div",
              { className: "store-card-bottom" },
              h(
                "span",
                null,
                store.id === "malatang"
                  ? "120 种食材"
                  : "随心搭配 · 不限时",
              ),
              h("b", null, "进店吃 →"),
            ),
          ),
        ),
      ),
    ),
    h(MemberCard, {}),
    h(
      "footer",
      { className: "hub-footer" },
      "好好吃饭，也好好玩。",
      h("small", null, "金币、搭子和小票保存在当前浏览器；无需登录。"),
      location.origin===PRIMARY_ORIGIN&&h("a",{href:LEGACY_ORIGIN+"/#home",className:"legacy-save-link"},"从旧站带回存档 →"),
    ),
  );
}
