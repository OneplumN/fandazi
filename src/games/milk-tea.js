import {
  h,
  useEngine,
  GameFrame,
  Button,
  Choice,
  Customer,
  Pause,
  GameResult,
  action,
} from "./common.js";
import {
  TEAS,
  MILKS,
  TOPPINGS,
  TEA_ORDERS,
  initialTea,
  teaReducer,
  teaPrice,
  money,
} from "./rules.js";
import {CupArt} from "./kitchen-art.js";
import { ToppingArt } from "./art.js";
export function MilkTea({ api }) {
  const [s, dispatch] = useEngine("tea", teaReducer, initialTea),
    order = TEA_ORDERS[s.round % TEA_ORDERS.length],
    tea = TEAS.find((t) => t.id === s.tea),
    disabled = s.phase !== "recipe";
  const set = (field) => (value) => dispatch({ type: "set", field, value });
  return h(
    GameFrame,
    {
      id: "tea",
      title: "奶茶实验室",
      subtitle: "今天的灵感，装进一只会笑的杯子。",
      state: s,
      dispatch,
      rules: [
        "茶底、奶、甜度、冰量和杯型都能按自己口味选。",
        "小料点一下加入，再点一下拿掉，一杯最多3种。杯子会实时显示配方。",
        "点杯子按标价开做，摇匀后直接点杯子喝，搭子点评只作参考。",
      ],
    },
    s.phase === "result"
      ? h(
          GameResult,
          {
            id: "tea",
            title: "你的特调，请试饮",
            score: s.score,
            breakdown: s.breakdown,
            api,
            order,
            onReplay: action(dispatch, "reset"),
            replayLabel: "接下一杯",
          },
                    h(
            "p",
            null,
            `${tea.name} · ${s.milk} · ${s.sugar}%糖 · ${s.ice} · ${s.size}mL`,
          ),
          h(
            "p",
            { className: "game-muted" },
            s.toppings.length
              ? s.toppings
                  .map((id) => TOPPINGS.find((t) => t.id === id).name)
                  .join(" + ")
              : "原味不加小料",
          ),
          h(
            "p",
            null,
            `本杯 ${money(s.total)} · 按自己的口味来`,
          ),
        )
      : h(
          "div",
          { className: "game-layout tea-layout" },
          h(
            "section",
            { className: "game-workbench" },
            h(Customer, { api, order, compact:true }),
            h("button",{type:"button",id:"tea-mix",className:"food-touch-button tea-preview",disabled:s.paymentPending,"aria-label":s.phase === "recipe"?`制作奶茶 ${teaPrice(s)}金币`:s.paused?"继续摇匀":"摇一摇奶茶",onClick:action(dispatch,s.phase === "recipe"?"mix":s.paused?"pause":"shake",s.paused?{value:false}:{})},
              h(CupArt,{api,state:s,tea,toppings:s.toppings.map(id=>TOPPINGS.find(t=>t.id===id))}),
              h("span",{className:"food-touch-caption"},s.paymentPending?"正在下单…":s.phase === "recipe"?`点杯子开做 · ${teaPrice(s)}金币`:s.paused?"点杯子继续":"点杯子摇一摇")),
            h(
              "div",
              { className: "recipe-caption" },
              h("b", null, `${tea.name} · ${s.milk}`),
              h("span", null, `${s.sugar}%糖 · ${s.ice} · ${s.size}mL`),
              h(
                "small",
                null,
                s.toppings.length
                  ? s.toppings
                      .map((id) => TOPPINGS.find((t) => t.id === id).name)
                      .join(" + ")
                  : "原味不加小料",
              ),
            ),
            h(
              "div",
              { className: "game-status-line" },
              h(
                "strong",
                { className: "recipe-price", "aria-live": "polite" },
                money(teaPrice(s)),
              ),
              h(
                "span",
                { className: "tea-inspiration-note" },
                "搭子口味仅供参考",
              ),
            ),
            s.phase === "mixing" && h(Pause,{state:s,dispatch}),
          ),
          h(
            "aside",
            { className: "game-controls" },
            h(Choice, {
              label: "茶底",
              options: TEAS.map((t) => ({ value: t.id, label: t.name })),
              value: s.tea,
              onChange: set("tea"),
              disabled,
            }),
            h(Choice, {
              label: "奶香",
              options: MILKS,
              value: s.milk,
              onChange: set("milk"),
              disabled,
            }),
            h("details",{className:"optional-recipe"},h("summary",null,`甜度、冰量与杯型 · ${s.sugar}%糖 / ${s.ice} / ${s.size}mL`),
            h(Choice, {
              label: "甜度",
              options: [
                { value: 0, label: "无糖" },
                { value: 25, label: "微糖" },
                { value: 50, label: "半糖" },
                { value: 75, label: "七分糖" },
                { value: 100, label: "全糖" },
              ],
              value: s.sugar,
              onChange: set("sugar"),
              disabled,
            }),
            h(Choice, {
              label: "冰量",
              options: ["无冰", "少冰", "正常冰"],
              value: s.ice,
              onChange: set("ice"),
              disabled,
            }),
            h(Choice, {
              label: "杯型",
              options: [
                { value: 500, label: "中杯 500mL" },
                { value: 700, label: "大杯 700mL" },
              ],
              value: s.size,
              onChange: set("size"),
              disabled,
            }),
            ),
            h("h2", null, `小料 ${s.toppings.length}/3`),
            h(
              "div",
              { className: "game-food-grid topping-grid" },
              TOPPINGS.map((item) =>
                h(
                  "button",
                  {
                    key: item.id,
                    type: "button",
                    disabled:
                      disabled ||
                      (!s.toppings.includes(item.id) && s.toppings.length >= 3),
                    "aria-label": `添加或移除${item.name}`,
                    "aria-pressed": s.toppings.includes(item.id),
                    onClick: action(dispatch, "topping", { id: item.id }),
                  },
                  h(ToppingArt, { item, api }),
                  h("b", null, item.name),
                  h("small", null, "+ 2金币"),
                ),
              ),
            ),
            h(
              "p",
              { className: "game-muted" },
              "茶底5金币 · 鲜奶/燕麦奶+3 · 奶盖+4 · 大杯+3 · 小料每种+2。",
            ),
          ),
        ),
  );
}
