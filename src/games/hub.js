import {DEV_TOOLS,isAdminPath} from '../runtime.js';
import {useStreet,storeTerms} from '../content-client.js';
import {useConsumer} from './consumer-store.js';
import {FavoriteButton,RegularWelcome,ReviewsPage} from './consumer-ui.js';
import {regularStatus} from './consumer-model.js';
import {buddyById,seasonalPlan} from './outing-model.js';
import {DomainNotice,MoveIn,PRIMARY_ORIGIN,LEGACY_ORIGIN} from './domain-move.js';
import {useOuting,prepareOuting} from './outing-store.js';
const MealMemento=React.lazy(()=>import('./memento.js').then(m=>({default:m.MealMemento})));

import {TodayMeal} from "./outing-ui.js";
import { WalletBadge, WalletSkin, ShopPage, useWallet, MemberCard } from "./wallet-ui.js";
import { X as React } from "../../vendor/react-runtime.js";
const h=React.createElement;
import { ShopArt } from "./art.js";
const BBQ=React.lazy(()=>import('./bbq.js').then(m=>({default:m.BBQ})));
const MilkTea=React.lazy(()=>import('./milk-tea.js').then(m=>({default:m.MilkTea})));
const Hotpot=React.lazy(()=>import('./hotpot.js').then(m=>({default:m.Hotpot})));
const Breakfast=React.lazy(()=>import('./breakfast.js').then(m=>({default:m.Breakfast})));
const stores = [
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
{
    id: "tea",
    name: "奶茶实验室",
    kind: "tea",
    label: "调配 · 摇匀 · 客人试饮",
    desc: "把茶香、奶香和今天的灵感摇进杯子里。",
    tag: "你的独家特调",
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
    id: "breakfast",
    name: "早餐小摊",
    kind: "breakfast",
    label: "摊饼 · 加料 · 趁热吃",
    desc: "一份10金币，鸡蛋和三种配菜随心搭。",
    tag: "早起有好事",
  }
];
function SeasonalSuggestion({store,api,profile,balance}){
 let settings=api.settings;try{settings={...settings,...JSON.parse(localStorage.getItem('malatang.settings')||'{}')};}catch{}
 const plan=seasonalPlan({store,buddyId:profile.buddyId,budget:profile.budget,balance,menu:api.menu,settings});if(!plan)return null;
 return h('div',{className:'seasonal-suggestion','data-seasonal-plan':JSON.stringify({game:plan.game,storeId:plan.storeId,cost:plan.cost,recipe:plan.recipe})},h('p',{className:'street-chat'},`${buddyById(profile.buddyId).name}：本季一起尝尝${plan.foods.map(f=>f.name).join('、')}？`),h('button',{type:'button',className:'btn btn--ghost',onClick:()=>{prepareOuting(plan);window.location.hash=plan.storeId===plan.game?plan.game:'store/'+plan.storeId;}},`尝尝本季搭配 · ${plan.cost}金币`),h('small',null,'先带上搭配进店，开做前不扣金币。'));
}
export function GameCollection(props) {
  return h(
    React.Fragment,
    null,
    h(WalletSkin, {}),
    h(React.Suspense,{fallback:h('main',{className:'game-shell initial-loading',role:'status'},'炉子点着了，马上就好…')},h(CollectionContents, props)),
  );
}
function CollectionContents({ api, Malatang }) {
  const { wallet } = useWallet();
  const {profile}=useOuting();
  const {profile:consumer}=useConsumer();
  const {content,live}=useStreet();
  const entered=React.useRef(null);
  const route = () =>
    isAdminPath()
      ? "malatang"
      : window.location.hash.slice(1).split("?")[0] || "home";
  const [current, setCurrent] = React.useState(route);
  const previousRoute=React.useRef(current);
  const priorOrders=React.useRef(new Set(Object.keys(wallet.orders)));
  if(previousRoute.current!==current){entered.current=null;priorOrders.current=new Set(Object.keys(wallet.orders));previousRoute.current=current;}
  const allStores=[...stores,...content.stores.filter(s=>!stores.some(base=>base.id===s.id)).map(s=>({...stores.find(base=>base.id===s.kind),...s}))];
  const storeId=current.startsWith('store/')?current.slice(6):current;
  const selected=allStores.find(s=>s.id===storeId);
  const activeGame=selected?.kind;
  if(selected&&!entered.current&&Object.entries(wallet.orders).some(([id,o])=>!priorOrders.current.has(id)&&id.startsWith(activeGame+':')&&o.status!=='refunded'))entered.current=current;
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
    const item=selected;
    document.title =
      current === "receipt" ? "今天的小票 · 搭子小馆" : current === "move-in" ? "接回存档 · 搭子小馆" : current === "shop"
        ? "小馆装扮铺 · 搭子小馆"
        : item
          ? `${item.name} · 搭子小馆`
          : "搭子小馆 · 今天想吃哪一味";
    if (DEV_TOOLS && !item && current !== "shop")
      window.render_game_to_text = () =>
        JSON.stringify({ game: "home", stores: stores.map((item) => item.id) });
  }, [current,content]);
  if(current === "reviews")return h(ReviewsPage);
  if(selected&&storeTerms(storeId).status==='closed'&&entered.current!==current)return h('main',{className:'game-shell'},h('a',{href:'#home',className:'game-back'},'← 小馆首页'),h('h1',null,`${selected.name}今天歇歇`),h('p',null,'搭子：老板说今天先收摊，我们去隔壁闻闻香味吧。'));
  if(current === "move-in")return h(MoveIn);
  if(current === "receipt")return h("main",{className:"game-shell receipt-page"},h("a",{href:"#home",className:"game-back"},"← 小馆首页"),profile.lastMeal?h(MealMemento,{saved:profile.lastMeal,api}):h("p",null,"先和搭子吃一顿，再来留张小票。"));
  if (current === "shop") return h(ShopPage, { api });
  if (activeGame === "malatang")
    return h(
      React.Fragment,
      null,
      h(
        "nav",
        { className: "malatang-game-nav" },
        h("a", { href: "#home" }, "← 小馆首页"),
        h(FavoriteButton,{game:storeId,name:selected?.name}),
        h(WalletBadge, {}),
      ),
      h(RegularWelcome,{game:storeId,name:storeTerms(storeId).name||selected.name,buddyId:profile.buddyId}),
      h(Malatang,{key:storeId}),
    );
  if (activeGame === "bbq") return h(React.Fragment,null,h(RegularWelcome,{game:storeId,name:storeTerms(storeId).name||selected.name,buddyId:profile.buddyId}),h(BBQ, { api:{...api,storeId},key:storeId }));
  if (activeGame === "tea") return h(React.Fragment,null,h(RegularWelcome,{game:storeId,name:storeTerms(storeId).name||selected.name,buddyId:profile.buddyId}),h(MilkTea, { api:{...api,storeId},key:storeId }));
  if (activeGame === "hotpot") return h(React.Fragment,null,h(RegularWelcome,{game:storeId,name:storeTerms(storeId).name||selected.name,buddyId:profile.buddyId}),h(Hotpot, { api:{...api,storeId},key:storeId }));
  if (activeGame === "breakfast") return h(React.Fragment,null,h(RegularWelcome,{game:storeId,name:storeTerms(storeId).name||selected.name,buddyId:profile.buddyId}),h(Breakfast, { api:{...api,storeId},key:storeId }));
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
    h("a",{href:"#reviews",className:"last-meal-link"},"我的点评与吃饭记录 →"),
    content.messages.map(m=>h("p",{key:m.id,className:"street-chat"},`${buddyById(profile.buddyId).name}：${m.text}`)),
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
      [...allStores].sort((a,b)=>Number(consumer.favorites.includes(b.id))-Number(consumer.favorites.includes(a.id))).map((store, index) =>
        h(
          "article",
          {
            key: store.id,
            className: `store-card store-${store.kind}`,
          },
          h(
            "div",
            { className: "store-card-top" },
            h("span", null, `0${index + 1}`),
            h("i", null, storeTerms(store.id).status==='closed'?'今天歇歇':storeTerms(store.id).tag||store.tag),
          ),
          h(ShopArt, { kind: store.kind, api }),
          h(
            "div",
            { className: "store-card-copy" },
            h("h2", null, storeTerms(store.id).name||store.name),
            h(FavoriteButton,{game:store.id,name:storeTerms(store.id).name||store.name}),
            h(SeasonalSuggestion,{store:{...store,...storeTerms(store.id)},api,profile,balance:wallet.balance}),
            storeTerms(store.id).seasonal&&h("p",{className:"street-chat"},`丸丸：听说这里上了${storeTerms(store.id).seasonal}，有空来尝尝。`),
            storeTerms(store.id).discount<1&&h("p",{className:"street-chat"},`老王：今天是${Number((storeTerms(store.id).discount*10).toFixed(2))}折，结账也按这个算。`),
            regularStatus(consumer,store.id).regular&&h("small",null,regularStatus(consumer,store.id).side?"熟客 · 老板请小菜":"这里的常客"),
            live&&content.aggregates?.[store.id]&&h("small",null,`街坊点评 ${content.aggregates[store.id].rating.toFixed(1)} 星 · ${content.aggregates[store.id].count} 条`),
            h("small", null, store.label),
            h("p", null, store.desc),
            h(
              "div",
              { className: "store-card-bottom" },
              h(
                "span",
                null,
                store.kind === "malatang"
                  ? `${api.menu.filter(f=>f.enabled!==false).length} 种食材`
                  : "随心搭配 · 不限时",
              ),
              h("a",{href:storeTerms(store.id).status==='closed'?undefined:`#${stores.some(s=>s.id===store.id)?store.id:'store/'+store.id}`,className:"store-enter","aria-disabled":storeTerms(store.id).status==='closed'},storeTerms(store.id).status==='closed'?"今天歇歇":"进店吃 →"),
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
