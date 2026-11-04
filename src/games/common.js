import {isolateModal} from "../modal-isolation.js";
import {DEV_TOOLS} from "../runtime.js";
import {getStoreDiscount,resolveStoreId} from "../content-client.js";
import {discountedCoins} from "../content-model.js";
import {seedMeal,buddyById,companionLine} from "./outing-model.js";
import {readOuting,peekOuting,consumeOuting} from "./outing-store.js";
import {lockPageScroll} from "../scroll-lock.js";
import { newRunId, membership } from "./economy.js";
import { MealReceipt, WalletBadge, useWallet } from "./wallet-ui.js";
import { X as React } from "../../vendor/react-runtime.js";
import { clamp, heatState, heatLabel, teaPrice, POT_MENU, money } from "./rules.js";
import {payMeal, finishMeal, refundMeal} from "./wallet-store.js";
import {DiningTable} from "./dining.js";
import {FeedbackSettings,kitchenFeedback,useDockClearance} from "./experience.js";
export const h = React.createElement;
const RoundContext = React.createContext(null);
export function useEngine(game, reducer, initial) {
  const [state, rawDispatch] = React.useReducer(
      (previous, event) => {
        if(event.paymentGuard && (previous.runId !== event.paymentGuard.runId || previous.phase !== event.paymentGuard.phase || previous.serial !== event.paymentGuard.serial))return previous;
        const next = reducer(previous, event);
        return next === previous
          ? previous
          : {
              ...next,
              paidTotal:["reset","next"].includes(event.type)?0:(previous.paidTotal||0)+(event.paidAmount||0),
              companionId:["reset","next"].includes(event.type)?readOuting().buddyId:previous.companionId,
              interaction: !["tick","pause","reset","next"].includes(event.type) ? {type:event.type,serial:(previous.interaction?.serial || 0)+1,target:event.key} : previous.interaction,
              storeId:["reset","next"].includes(event.type)?resolveStoreId(game):previous.storeId,
              discountFactor:["reset","next"].includes(event.type)?getStoreDiscount(game):previous.discountFactor,
              runId: ["reset","next"].includes(event.type) ? newRunId(game) : previous.runId,
            };
      },
      undefined,
      () => {const plan=peekOuting(game);return {...seedMeal(game,initial(),plan,plan?.buddyId||readOuting().buddyId),storeId:resolveStoreId(game),discountFactor:getStoreDiscount(game),runId:newRunId(game)};},
    ),
    latest = React.useRef(state);
  latest.current = state;
  React.useEffect(()=>{if(state.outingPlan?.token)consumeOuting(state.outingPlan.token);},[state.runId]);
  const {wallet:liveWallet}=useWallet();
  React.useEffect(()=>{
    if(liveWallet.orders[state.runId]?.status === "refunded" && !["select","recipe","setup","ready","result"].includes(state.phase)) {
      rawDispatch({type:"reset"});
      setPaymentMessage("这份订单已取消退款，可以重新选餐。");
    }
  },[liveWallet,state.runId,state.phase]);
  const [checkout,setCheckout] = React.useState(null), [paymentMessage,setPaymentMessage]=React.useState(""),[paymentPending,setPaymentPending]=React.useState(false);
  const paying=React.useRef(false),active=React.useRef(true);
  React.useEffect(()=>{active.current=true;return()=>{active.current=false;};},[]);
  const dispatch = (event) => {
    if(paying.current || checkout) return;
    if(event.type==="undo" && game==="bbq" && latest.current.phase==="cooking") {
      const current=latest.current;paying.current=true;setPaymentPending(true);
      refundMeal(current.runId).then(()=>{if(active.current){rawDispatch({type:"reset"});setPaymentMessage("已撤销这盘，金币原路退回。");}}).finally(()=>{paying.current=false;setPaymentPending(false);});return;
    }
    const current=latest.current, next=reducer(current,event);
    if(next === current) return;
    let amount=0;
    if(game === "bbq" && event.type === "start") amount=current.selected.reduce((n,f)=>n+f.price,0);
    if(game === "tea" && event.type === "mix") amount=teaPrice(current);
    if(game === "breakfast" && event.type === "start") amount=10;
    if(game === "hotpot" && event.type === "add_batch")amount=event.ids.reduce((n,id)=>n+(POT_MENU.find(f=>f.id===id)?.price||0),0);
    if(game === "hotpot" && event.type === "add") amount=POT_MENU.find(f=>f.id===event.id)?.price || 0;
    if(!amount) {kitchenFeedback(event.type === "deliver"?"fold":event.type);rawDispatch(event);return;}
    amount=discountedCoins(amount,current.discountFactor);
    const names={bbq:"烧烤",tea:"奶茶",breakfast:"早餐套餐",hotpot:"火锅食材"};
    rawDispatch({type:"pause",value:true});
    const resume=current.paused;
    const confirm=async()=>{
      if(paying.current)return;
      paying.current=true;setPaymentPending(true);setPaymentMessage("");
      try {
        const result=await payMeal({id:current.runId,paymentId:`${current.runId}:${game === "hotpot"?current.serial:0}`,amount,label:names[game]});
        if(!active.current){if(result.status === "paid")await refundMeal(current.runId);return;}
        if(result.status === "paid") {
          rawDispatch({type:"pause",value:resume});
          rawDispatch({...event,paidAmount:amount,paymentGuard:{runId:current.runId,phase:current.phase,serial:current.serial}});
          kitchenFeedback("coin");setCheckout(null);setPaymentMessage(`拍下 ${amount} 金币，开做啦！`);
        } else {rawDispatch({type:"pause",value:resume});setPaymentMessage(result.status === "insufficient"?"金币不够，换个搭配或明天再来领100金币。":"这份订单已结束，请重新选餐。");}
      }catch{rawDispatch({type:"pause",value:resume});setPaymentMessage("这次没能下单，请再点一次。");}
      finally{paying.current=false;setPaymentPending(false);}
    };
    confirm();

  };
  React.useEffect(()=>{
    if(state.phase === "result" || state.phase === "shift") finishMeal(state.runId);
  },[state.phase,state.runId]);
  React.useEffect(()=>{
    const id=state.runId;
    return ()=>{const current=latest.current;
      if(current.runId === id && ["result","shift"].includes(current.phase)) finishMeal(id);
      else refundMeal(id);
    };
  },[state.runId]);

  React.useEffect(() => {
    let last = performance.now(),
      manual = false;
    const timer = setInterval(() => {
      const now = performance.now(),
        dt = Math.min((now - last) / 1000, 0.5);
      last = now;
      if (!document.hidden && !manual) rawDispatch({ type: "tick", dt });
    }, 100);
    const visibility = () => {
      if (document.hidden && !["select","recipe","setup","ready","result","shift"].includes(latest.current.phase)) rawDispatch({ type: "pause", value: true });
      last = performance.now();
    };
    document.addEventListener("visibilitychange", visibility);
    const fullscreen = (event) => {
      if (
        event.key.toLowerCase() === "f" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
      ) {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else
          document
            .querySelector(".game-shell")
            ?.requestFullscreen?.()
            .catch(() => {});
      }
    };
    document.addEventListener("keydown", fullscreen);
    if(DEV_TOOLS) window.render_game_to_text = () =>
      JSON.stringify({
        game,
        coordinateSystem:
          "DOM layout; illustrated food uses a 64x64 SVG with origin top-left, x right, y down",
        ...latest.current,
        dining: (()=>{try{return JSON.parse(document.querySelector("[data-dining]")?.dataset.dining || "null");}catch{return null;}})(),
      });
    const advance = (ms) => {
      if (!Number.isFinite(ms) || ms < 0)
        throw Error("Time must be a nonnegative number");
      manual = true;
      rawDispatch({ type: "tick", dt: ms / 1000 });
      return new Promise((resolve) => setTimeout(resolve, 0));
    };
    if(DEV_TOOLS) window.advanceTime = advance;
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("keydown", fullscreen);
      if (DEV_TOOLS && window.advanceTime === advance) {
        delete window.advanceTime;
        delete window.render_game_to_text;
      }
    };
  }, [game]);
  React.useEffect(() => {
    if(game === "bbq") {window.scrollTo(0,0);return;}
    if(state.phase === "result") {
      const frame=requestAnimationFrame(()=>{const panel=document.querySelector(".game-result");panel?.scrollIntoView({block:"start"});panel?.querySelector("h2")?.focus({preventScroll:true});});
      return()=>cancelAnimationFrame(frame);
    }
  }, [state.phase]);
  return [{...state,checkout,paymentMessage,paymentPending,balance:liveWallet.balance,canInteract:()=>!paying.current&&!checkout&&!(latest.current.paused&&!["result","shift"].includes(latest.current.phase))}, dispatch];
}
export const action =
  (dispatch, type, extra = {}) =>
  () =>
    dispatch({ type, ...extra });
export function Button({ children, primary = false, ...props }) {
  return h(
    "button",
    {
      type: "button",
      className: `btn ${primary ? "btn--primary" : "btn--ghost"}`,
      ...props,
    },
    children,
  );
}
export function Choice({ label, options, value, onChange, disabled = false }) {
  return h(
    "fieldset",
    { className: "game-choice", disabled },
    h("legend", null, label),
    h(
      "div",
      { className: "choice-buttons" },
      options.map((option) => {
        const item =
          typeof option === "object"
            ? option
            : { value: option, label: String(option) };
        return h(
          "button",
          {
            key: item.value,
            type: "button",
            "aria-pressed": value === item.value,
            onClick: () => onChange(item.value),
          },
          item.label,
        );
      }),
    ),
  );
}
export function Customer({api}) {
  const round=React.useContext(RoundContext),buddy=buddyById(round?.stats.companionId),state=round?.stats||{};
  const favorite=state.interaction?.type==="sprinkle" || (buddy.id==="lin"&&(state.tea==="jasmine"||state.selected?.some(f=>f.id==="mushroom"))) || (buddy.id==="wang"&&state.selected?.some(f=>f.id==="lamb"));
  const [idle,setIdle]=React.useState(false);
  React.useEffect(()=>{setIdle(false);const timer=setTimeout(()=>setIdle(true),18000);return()=>clearTimeout(timer);},[state.interaction?.serial]);
  const line=favorite?`眼睛亮了！${state.interaction?.type==="sprinkle"?"这串闻着好香，我也想尝一口。":"这一口我也喜欢。"}`:idle?"哈啊～慢慢来，我陪你等热乎的。":companionLine(buddy.id,{game:round?.game});
  return h("section",{className:`companion-presence ${favorite?"buddy-favorite":idle?"buddy-yawn":""}`},h("span",{className:"buddy-portrait"},h(api.Avatar,{id:buddy.id,name:buddy.name,size:40,color:buddy.color}),favorite&&h("span",{className:"buddy-sparkles","aria-hidden":true},"✦ ✦")),h("div",null,h("b",null,`${buddy.name}陪你吃`),h("p",null,line)));
}
export function Food({ api, id, size = 64 }) {
  const item = api.menu.find((item) => item.id === id);
  return item
    ? h(api.Food, { id: item.id, shape: item.shape, color: item.color, size })
    : null;
}
export function HeatMeter({ time, target, label }) {
  const status = heatState(time, target),
    percent = Math.round((time / target) * 100);
  return h(
    "div",
    { className: `heat-status heat-${status}` },
    h(
      "div",
      { className: "heat-label" },
      h("span", null, label),
      h("b", null, `${percent}%`),
    ),
    h(
      "div",
      {
        className: "heat-track",
        role: "progressbar",
        "aria-label": label,
        "aria-valuemin": 0,
        "aria-valuemax": 200,
        "aria-valuenow": Math.min(200, percent),
      },
      h("i", { style: { width: `${clamp(percent)}%` } }),
    ),
    h("small", null, heatLabel(status)),
  );
}
export function Pause({ state, dispatch }) {
  return h(
    Button,
    {
      onClick: action(dispatch, "pause", { value: !state.paused }),
      "aria-pressed": state.paused,
    },
    state.paused ? "继续" : "暂停",
  );
}
export function GameFrame({
  id,
  title,
  subtitle,
  state,
  dispatch,
  rules,
  children,
}) {
  const { wallet } = useWallet();
  const [leave, setLeave] = React.useState(false),
    [leaveTarget, setLeaveTarget] = React.useState("home"),
    wasPaused = React.useRef(false),
    dialogRef = React.useRef(null);
  React.useEffect(() => {
    if (!leave) return;
    const previous = document.activeElement,unlock=lockPageScroll();
    const isolation=isolateModal(dialogRef.current);
    const panel = dialogRef.current,
      buttons = () => [...panel.querySelectorAll("button:not(:disabled)")];
    buttons()[0]?.focus();
    const key = (event) => {
      if(!isolation.isTop())return;
      if (event.key === "Escape") {
        event.preventDefault();
        setLeave(false);
        dispatch({ type: "pause", value: wasPaused.current });
      }
      if (event.key === "Tab") {
        const list = buttons();
        if (event.shiftKey && document.activeElement === list[0]) {
          event.preventDefault();
          list.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === list.at(-1)) {
          event.preventDefault();
          list[0]?.focus();
        }
      }
    };
    panel.addEventListener("keydown", key);
    return () => {
      isolation.release();unlock();
      panel.removeEventListener("keydown", key);
      if (previous?.isConnected) previous.focus({preventScroll:true});
    };
  }, [leave]);
  const busy = ![
    "select",
    "recipe",
    "setup",
    "ready",
    "result",
    "shift",
  ].includes(state.phase);
  return h(
    RoundContext.Provider,
    { value: { game: id, runId: state.runId, stats: state } },
    h(
      "main",
      {
        className: `game-shell game-${id}${id !== "bbq"?" simple-game":""}`,
        "data-game": id,
        "data-phase": state.phase,
        "data-paused": state.paused,
        "data-action": state.interaction?.type,
      },
      h(
        "header",
        { className: "game-topbar" },
        h(
          "button",
          {
            type: "button",
            className: "game-back",
            disabled:state.paymentPending,
            onClick: () => {
              if (busy) {
                setLeaveTarget("home");
                wasPaused.current = state.paused;
                dispatch({ type: "pause", value: true });
                setLeave(true);
              } else window.location.hash = "home";
            },
          },
          "← 小馆首页",
        ),
        h(WalletBadge, {
          onClick: (event) => {
            if(state.paymentPending){event.preventDefault();return;}
            if (busy) {
              event.preventDefault();
              setLeaveTarget("shop");
              wasPaused.current = state.paused;
              dispatch({ type: "pause", value: true });
              setLeave(true);
            }
          },
        }),
      ),
      h(
        "div",
        { className: "game-title" },
        h(
          "div",
          null,
          h("p", null, "搭子小馆 · PLAY & TASTE"),
          h("h1", null, title),
          h("span", null, subtitle),
        ),
        h(
          "span",
          { className: "title-stamp" },
          wallet.equipped.sign === "night"
            ? "夜市食神\n今日掌勺"
            : membership(wallet.spent).name !== "初来小馆" ? `${membership(wallet.spent).name}\n欢迎常来` : "好好玩\n慢慢吃",
        ),
      ),
      h(
        "details",
        {
          className: "game-guide",
          onToggle: (event) => {
            if (event.currentTarget.open && busy)
              dispatch({ type: "pause", value: true });
          },
        },
        h("summary", null, "怎么玩 · 点开看看"),
        h(
          "ol",
          null,
          rules.map((rule, index) => h("li", { key: index }, rule)),
        ),
        h(
          "p",
          null,
          "离开页面会暂停计时，回来后点“继续”。支持键盘 Tab、Enter；按 F 可全屏。",
        ),
      ),
      state.phase !== "result" && h(FeedbackSettings,{}),
      state.paused &&
        busy &&
        h(
          "div",
          { className: "game-pause-note", role: "status" },
          "已暂停，火候停住了。准备好再继续。",
        ),
      state.paymentMessage && !state.checkout && h("p",{className:"game-pause-note coin-slap",role:"status"},state.paymentMessage),
      id==="bbq"&&state.phase==="cooking"&&h(Button,{disabled:state.paymentPending,onClick:()=>dispatch({type:"undo"})},"撤销这盘 · 原路退款"),
      children,
      !["result", "shift"].includes(state.phase) &&
        h(MobileDock, { id, state, dispatch }),
      h(
        "footer",
        { className: "game-footnote" },
        "小馆里的火候、价格与营养参数均为游戏设定；现实烹饪请以实际食材为准。",
      ),
      leave &&
        h(
          "div",
          { className: "game-confirm-backdrop" },
          h(
            "section",
            {
              role: "dialog",
              "aria-modal": true,
              "aria-label": "取消并离开",
              className: "game-confirm",
              ref: dialogRef,
            },
            h("h2", null, "这一餐还没吃完"),
            h("p", null, "离开会取消这餐，已扣的用餐金币会退回，对应会员成长一并撤回。"),
            h(
              "div",
              { className: "game-actions" },
              h(
                Button,
                {
                  onClick: () => {
                    setLeave(false);
                    dispatch({ type: "pause", value: wasPaused.current });
                  },
                  autoFocus: true,
                },
                "继续这一餐",
              ),
              h(
                Button,
                {
                  primary: true,
                  onClick: () => {
                    window.location.hash = leaveTarget;
                  },
                },
                "取消并离开",
              ),
            ),
          ),
        ),
    ),
  );
}
export function GameResult({
  id,
  title,
  api,
  onReplay,
  replayLabel = "再做一份",
  children,
  record = true,
  feedback,
}) {
  const round=React.useContext(RoundContext);
  const buddy=buddyById(round?.stats.companionId);
  const review=h("div",{className:"game-review"},h(api.Avatar,{id:buddy.id,name:buddy.name,size:44,color:buddy.color}),h("div",null,h("b",null,buddy.name),h("p",null,companionLine(buddy.id,{game:id,stage:"end",state:round?.stats,items:[]}))));
  const receipt=round&&h(MealReceipt,{runId:round.runId});
  const table=round&&h(DiningTable,{key:round.runId,game:id,mealId:round.runId,state:round.stats,api});
  return h("section",{className:"game-result"},h("h2",{tabIndex:-1},title),
    table,h("details",{className:"meal-notes"},h("summary",null,"这餐小记"),receipt,review,children),
    h("div",{className:"game-actions"},h(Button,{onClick:()=>{window.location.hash="home";}},"逛逛其他小店"),h(Button,{primary:true,onClick:onReplay},replayLabel)));
}

function MobileDock({ id, state: s, dispatch }) {
  const dockRef=React.useRef(null);useDockClearance(dockRef,".game-shell");
  let text = "",
    label = "",
    type = null,
    disabled = false;
  if (id === "bbq") {
    text =
      s.phase === "select"
        ? `${s.selected.length}/6 串 · ${money(mealPrice(s,s.selected.reduce((n, f) => n + f.price, 0)))}`
        : "慢慢烤 · 不限时";
    label = s.phase === "select" ? "上炉开烤" : "出炉尝尝";
    type = s.phase === "select" ? "start" : "serve";
    disabled = s.phase === "select" && !s.selected.length;
  }
  if (id === "tea") {
    text=s.phase === "recipe"?`${money(mealPrice(s,teaPrice(s)))} · 点杯开做`:"摇匀中";
    label=s.phase === "recipe"?"摇这杯":"摇一摇";type=s.phase === "recipe"?"mix":"shake";
    disabled=!!s.paymentPending;
  }
  if (id === "hotpot") {
    text=s.phase === "setup"?"点食材直接下锅":`锅里 ${s.pot.length} 份`;
    label=!s.pot.length&&s.served.length?"看碗里":"看锅里";type=null;
  }
  if (id === "breakfast") {
    text=s.phase === "ready"?`早餐${mealPrice(s,10)}金币 · 点饼开摊`:"点饼翻面，点配菜加入";
    label=s.phase === "ready"?"摊这张饼":s.phase === "assembling"?"包起来":"包起来";
    type=s.phase === "ready"?"start":s.phase === "assembling"?"deliver":"wrap";
    disabled=!!s.paymentPending || (s.phase!=="ready"&&s.paused);
  }
  if (s.paused && !["select", "recipe", "setup", "ready"].includes(s.phase)) {
    label = "继续";
    type = "resume";
    disabled = false;
  }
  return h(
    "aside",
    { ref:dockRef,className: "game-mobile-dock", "aria-label": "当前游戏快捷操作" },
    h("span", null, text),
    id === "bbq" &&
      s.phase === "cooking" &&
      h(
        Button,
        {
          onClick: () =>
            document
              .querySelector(".game-workbench")
              ?.scrollIntoView({ block: "start" }),
        },
        "看烤炉",
      ),
    id !== "bbq" && h(Button,{onClick:()=>document.querySelector(".game-controls")?.scrollIntoView({block:"start"})},id === "tea"?"选配方":id === "hotpot"?"挑食材":(s.phase === "ready"?"选饼底":"挑配菜")),
    h(
      Button,
      {
        primary: true,
        disabled,
        "aria-label": id === "hotpot" && type === "finish" ? "快捷端碗开吃" : undefined,
        onClick: () => {
          if (type === "resume") dispatch({ type: "pause", value: false });
          else if (type) dispatch({ type });
          else if(id === "hotpot") {document.querySelector(!s.pot.length&&s.served.length?".served-plate":".physical-pot")?.scrollIntoView({block:"center"});return;}
          document
            .querySelector(".game-workbench")
            ?.scrollIntoView({ block: "start" });
        },
      },
      label,
    ),
  );
}


export const mealPrice=(state,amount)=>discountedCoins(amount,state.discountFactor ?? 1);
