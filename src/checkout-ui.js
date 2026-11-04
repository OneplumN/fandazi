import {lockPageScroll} from "./scroll-lock.js";
import {useDockClearance} from "./games/experience.js";
import {PickBowl} from "./games/malatang-motion.js";
import {DiningTable} from "./games/dining.js";
import {payMeal,finishMeal,useWallet} from "./games/wallet-store.js";
import { MealCheckout } from "./games/wallet-ui.js";
import { X as React } from "../vendor/react-runtime.js";
const h = React.createElement;

export function Modal({ title, className = "", panelId, onClose, children }) {
  const ref = React.useRef(null);
  const headingId = React.useId();
  React.useEffect(() => {
    const previous = document.activeElement;
    const unlock=lockPageScroll();
    const panel = ref.current;
    const focusable = () =>
      [
        ...panel.querySelectorAll(
          'button:not(:disabled), summary, input, [tabindex="0"]',
        ),
      ].filter((el) => el.getClientRects().length);
    (focusable()[0] || panel).focus();
    const keyboard = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const elements = focusable(),
        first = elements[0],
        last = elements.at(-1);
      if (!first) {
        event.preventDefault();
        panel.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === panel)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", keyboard);
    return () => {
      panel.removeEventListener("keydown", keyboard);
      unlock();
      if (previous?.isConnected) previous.focus({preventScroll:true});
    };
  }, []);
  return h(
    "div",
    {
      className: `overlay checkout-overlay ${className}`,
      onClick: (event) => {
        if (event.target === event.currentTarget) onClose();
      },
    },
    h(
      "section",
      {
        className: "checkout-panel",
        id:panelId,
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": headingId,
        tabIndex: -1,
        ref,
      },
      h(
        "header",
        { className: "checkout-header" },
        h("h2", { id: headingId }, title),
        h(
          "button",
          {
            type: "button",
            className: "icon-btn",
            onClick: onClose,
            "aria-label": `关闭${title}`,
          },
          "✕",
        ),
      ),
      children,
    ),
  );
}

function FoodRows({ entries, byId, settings, api, onAdd, onRemove }) {
  return h(
    "ul",
    { className: "food-detail-list" },
    entries.map((entry) => {
      const food = byId.get(entry.id);
      if (!food) return null;
      return h(
        "li",
        { className: "food-detail-row", key: entry.id },
        h(api.Icon, {
          id: food.id,
          shape: food.shape,
          color: food.color,
          size: 40,
        }),
        h(
          "div",
          { className: "food-detail-name" },
          h("b", null, food.name),
          h(
            "small",
            null,
            `${entry.qty} ${food.unitLabel} · ${Math.round(api.weight(food, entry.qty))}g`,
          ),
        ),
        h(
          "strong",
          { className: "food-detail-price" },
          api.money(api.price(food, entry.qty, settings)),
        ),
        onAdd &&
          h(
            "div",
            { className: "quantity-control" },
            h(
              "button",
              {
                type: "button",
                onClick: () => onRemove(food.id),
                "aria-label": `减少一份${food.name}`,
              },
              "−",
            ),
            h("span", { "aria-label": `${food.name}份数` }, entry.qty),
            h(
              "button",
              {
                type: "button",
                onClick: () => onAdd(food.id),
                disabled: entry.qty >= 9,
                "aria-label": `增加一份${food.name}`,
              },
              "+",
            ),
          ),
      );
    }),
  );
}

export function BasketDock({
  runId,onOrderLock,pickSource,onRecommendations,recommendationsOpen,
  entries,
  byId,
  settings,
  weight,
  price,
  budget,
  onAdd,
  onRemove,
  onClear,
  onWeigh,
  api,
}) {
  const dockRef=React.useRef(null);useDockClearance(dockRef,".app");
  const busy=React.useRef(false),[ordering,setOrdering]=React.useState(false),[message,setMessage]=React.useState("");
  const order=async()=>{
    if(busy.current||!entries.length)return;
    busy.current=true;setOrdering(true);onOrderLock?.(true);setMessage("");
    try {
      const id=`${runId}:${entries.map(e=>JSON.stringify(e)).join("|")}:${Math.ceil(price)}`;
      const result=await payMeal({id,paymentId:id,amount:Math.max(1,Math.ceil(price)),label:"麻辣烫"});
      if(result.status === "paid") {await finishMeal(id);setOpen(false);onWeigh();}
      else setMessage(result.status === "insufficient"?"金币不够，少夹一点试试。":"这份订单已结束，请重新夹菜。");
    }catch{setMessage("这次没能下单，请再试一次。");}
    finally{busy.current=false;setOrdering(false);onOrderLock?.(false);}
  };
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const empty = entries.length === 0,
    over = price > budget;
  const close = () => {
    setOpen(false);
    setConfirm(false);
  };
  const weigh = () => {
    close();
    onWeigh();
  };
  const budgetText = over
    ? `超出预算 ${api.money(price - budget)}`
    : `预算 ${api.money(budget)}，还可夹 ${api.money(Math.max(0, budget - price))}`;
  return h(
    React.Fragment,
    null,
    h(
      "footer",
      { ref:dockRef,className: `dock checkout-dock${over ? " dock--over" : ""}` },
      h(
        "div",
        { className: "checkout-dock-summary" },
        h(PickBowl,{entries,byId,api,pickSource}),
        h(
          "div",
          { className: "checkout-dock-info" },
          h("span", null, `已选 ${entries.length} 样 · ${Math.round(weight)}g`),
          h("small", null, empty ? "点货架上的食材，开始夹一盆吧" : message || `点开吃直接上桌 · ${Math.max(1,Math.ceil(price))}金币`),
        ),
        h(
          "strong",
          { className: "checkout-dock-price", "aria-live": "polite" },
          api.money(price),
        ),
      ),
      h(
        "div",
        { className: "dock-actions" },
        h("button",{type:"button",className:"btn btn--ghost",disabled:ordering,onClick:onRecommendations,"aria-haspopup":"dialog","aria-controls":"recommendations-dialog","aria-expanded":recommendationsOpen},"推荐搭配"),
        h(
          "button",
          {
            type: "button",
            className: "btn btn--ghost",
            onClick: () => setOpen(true),
            "aria-haspopup": "dialog",
            "aria-expanded": open,
          },
          "查看明细",
        ),
        h(
          "button",
          {
            type: "button",
            className: "btn btn--primary",
            disabled: empty || ordering,
            onClick: order,
          },
          ordering?"正在下单…":empty?"先选食材":`开吃 · ${Math.max(1,Math.ceil(price))}金币`,
        ),
      ),
    ),
    open &&
      h(
        Modal,
        { title: "你的盆", className: "detail-overlay", onClose: close },
        h(
          "div",
          { className: "detail-body" },
          h(
            "div",
            { className: "detail-toolbar" },
            h("span", null, `已选 ${entries.length} 样 · 每种最多 9 份`),
            h(
              "button",
              {
                type: "button",
                className: "link-btn danger",
                disabled: empty,
                onClick: () => {
                  if (confirm) {
                    onClear();
                    setConfirm(false);
                  } else setConfirm(true);
                },
              },
              confirm ? "确认清空" : "清空食材",
            ),
          ),
          empty
            ? h(
                "div",
                { className: "detail-empty" },
                h("span", null, "🥢"),
                h("p", null, "盆还是空的，先去夹点喜欢的吧。"),
              )
            : h(FoodRows, { entries, byId, settings, api, onAdd, onRemove }),
          h(
            "p",
            { className: "estimate-note" },
            "重量与热量为游戏估算，供模拟搭配参考。",
          ),
        ),
        h(
          "footer",
          { className: "detail-footer" },
          h(
            "div",
            { className: "detail-total", "aria-live": "polite" },
            h("span", null, `合计 ${Math.round(weight)}g`),
            h("strong", null, api.money(price)),
          ),
          h(
            "p",
            { className: over ? "budget-warning" : "budget-remaining" },
            budgetText,
          ),
          h(
            "div",
            { className: "checkout-actions" },
            h(
              "button",
              { type: "button", className: "btn btn--ghost", onClick: close },
              "继续夹菜",
            ),
            h(
              "button",
              {
                type: "button",
                className: "btn btn--primary",
                onClick: weigh,
                disabled: empty,
              },
              "只看称重单 · 免费",
            ),
          ),
        ),
      ),
  );
}

function VerdictCard({ verdict, Avatar, label }) {
  const { character, score, line, band } = verdict;
  return h(
    "article",
    { className: `verdict verdict--${band}` },
    h(Avatar, {
      id: character.id,
      name: character.name,
      size: 48,
      color: character.color,
    }),
    h(
      "div",
      { className: "verdict-main" },
      label && h("small", { className: "verdict-label" }, label),
      h(
        "div",
        { className: "verdict-name" },
        h("b", null, character.name),
        h("i", null, `${score}分`),
      ),
      h("p", null, line),
    ),
  );
}

export function CheckoutView({
  runId,companionId,
  entries,
  byId,
  settings,
  budget,
  totals,
  verdicts,
  summary,
  onClose,
  onRestart,
  api,
}) {
  const [confirm, setConfirm] = React.useState(false);
  const over = totals.price > budget;
  const {wallet}=useWallet();
  const mealId=`${runId}:${entries.map(e=>JSON.stringify(e)).join("|")}:${Math.ceil(totals.price)}`;
  const mealPaid=wallet.orders[mealId]?.status === "completed",wasPaid=React.useRef(mealPaid);
  React.useEffect(()=>{
    let frame;
    if(mealPaid && !wasPaid.current)frame=requestAnimationFrame(()=>document.querySelector(".result-overlay [data-dining]")?.scrollIntoView({block:"nearest"}));
    wasPaid.current=mealPaid;
    return()=>{if(frame)cancelAnimationFrame(frame);};
  },[mealPaid,mealId]);
  return h(
    Modal,
    { title: "称重单", className: "result-overlay", onClose },
    h(
      "div",
      { className: "result-body" },
      wallet.orders[mealId]?.status === "completed" && h(DiningTable,{key:mealId,game:"malatang",mealId,state:{entries,companionId},api:{...api,Food:api.Icon,menu:[...byId.values()]}}),
      h("details",{open:mealPaid?undefined:true,className:"meal-notes"},h("summary",null,"账单与点评"),
      h(
        "section",
        { className: "result-ticket" },
        h("small", null, settings.shopName),
        h("p", { className: "result-label" }, "这一盆"),
        h("strong", { className: "result-price" }, api.money(totals.price)),
        h(
          "p",
          { className: "result-metrics" },
          `${Math.round(totals.weightG)}g · 约 ${Math.round(totals.kcal)} kcal · ${totals.itemCount} 样 / ${totals.portions} 份`,
        ),
        h(
          "p",
          { className: over ? "budget-warning" : "budget-remaining" },
          over
            ? `超出预算 ${api.money(totals.price - budget)}`
            : `预算还剩 ${api.money(Math.max(0, budget - totals.price))}`,
        ),
        h(
          "p",
          { className: "result-pricing" },
          settings.separatePricing
            ? "荤素分价 · 各项按所属价格组计费"
            : `统一单价 ${api.money(settings.pricePerJin)}/斤`,
        ),
        h(
          "details",
          { className: "receipt-details" },
          h("summary", null, `食材账单 · ${entries.length} 样`),
          h(FoodRows, { entries, byId, settings, api }),
        ),
      ),
      h(MealCheckout, {id:mealId,amount:Math.max(1,Math.ceil(totals.price))}),

      h(
        "section",
        { className: "verdict-summary" },
        h(
          "div",
          { className: "score-heading" },
          h(
            "div",
            null,
            h("small", null, "综合评分"),
            h("h3", null, summary.summary),
          ),
          h("strong", null, summary.average, h("small", null, "分")),
        ),
        h(
          "div",
          { className: "highlight-verdicts" },
          summary.star &&
            h(VerdictCard, {
              verdict: summary.star,
              Avatar: api.Avatar,
              label: "最喜欢这一盆",
            }),
          summary.harshest &&
            summary.harshest !== summary.star &&
            h(VerdictCard, {
              verdict: summary.harshest,
              Avatar: api.Avatar,
              label: "最想提点意见",
            }),
        ),
      ),
      h(
        "details",
        { className: "all-verdicts" },
        h("summary", null, `查看全部 ${verdicts.length} 位评价`),
        h(
          "div",
          { className: "verdict-grid" },
          verdicts.map((verdict) =>
            h(VerdictCard, {
              key: verdict.character.id,
              verdict,
              Avatar: api.Avatar,
            }),
          ),
        ),
      ),
      h(
        "p",
        { className: "estimate-note" },
        "重量与热量为游戏估算；角色评分仅供娱乐。",
      ),
    ),
    ),
    h(
      "footer",
      { className: "result-footer" },
      confirm &&
        h(
          "p",
          { className: "restart-question", role: "status" },
          "确定清空当前食材，重新夹一盆？",
        ),
      h(
        "div",
        { className: "checkout-actions" },
        h(
          "button",
          {
            type: "button",
            className: "btn btn--ghost",
            onClick: () => {
              if (confirm) setConfirm(false);
              else onClose();
            },
          },
          confirm ? "取消" : "继续夹菜",
        ),
        h(
          "button",
          {
            type: "button",
            className: "btn btn--primary",
            onClick: () => {
              if (confirm) onRestart();
              else setConfirm(true);
            },
          },
          confirm ? "确认重来" : "重来一盆",
        ),
      ),
    ),
  );
}
