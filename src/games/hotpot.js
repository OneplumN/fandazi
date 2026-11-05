import {mealPrice} from "./common.js";
import {useOptionalStroke} from "./gestures.js";
import {
  h,
  useEngine,
  GameFrame,
  Button,
  Choice,
  Customer,
  Food,
  HeatMeter,
  Pause,
  GameResult,
  action,
} from "./common.js";
import {
  BROTHS,
  POT_MENU,
  initialHotpot,
  hotpotReducer,
  money,
  heatState,
} from "./rules.js";
import { ServingBowl } from "./dining.js";
import {PotArt} from "./kitchen-art.js";
function ScoopFood({food,index,api,state,dispatch}) {
 const stroke=useOptionalStroke(()=>dispatch({type:"take",key:food.key}));
 return h("button",{...stroke,type:"button",className:`pot-surface-food pot-${heatState(food.age,food.cook)}`,disabled:state.paused,
 style:{"--food-x":`${[27,50,73,27,50,73][index]}%`,"--food-y":`${[27,23,27,50,54,50][index]}%`},
 onClick:action(dispatch,"take",{key:food.key}),"aria-label":`捞起${food.name}`},h("div",{className:"pot-food-entry"},h(Food,{api,id:food.food,size:46})),h("span",{className:"pot-food-number"},food.key+1),h("b",{className:"pot-local-name"},food.name),h("small",{className:"pot-local-state"},({raw:"未熟",ready:"已熟 · 可捞",overdone:"有点老",burned:"煮久了"})[heatState(food.age,food.cook)]));
}
export function Hotpot({ api }) {
  const [s, dispatch] = useEngine("hotpot", hotpotReducer, initialHotpot),
    broth = BROTHS.find((b) => b.name === s.broth),
    total = [...s.pot, ...s.served].reduce((n, f) => n + f.price, 0);
  const diningReady=!s.pot.length&&s.served.length>0&&s.served.every(f=>heatState(f.age,f.cook)!=="raw");
  return h(
    GameFrame,
    {
      id: "hotpot",
      title: "火锅搭子",
      subtitle: "最好的那一口，得刚刚好捞起来。",
      state: s,
      dispatch,
      rules: [
        "点食材按标价下锅，点菜捞起，或拖出锅沿试试漏勺。",
        "食材变熟后捞起；捞早了，点碗里的食材免费回锅。",
        "锅里最多六份，捞完后直接点碗里的食物吃。",
      ],
    },
    (s.phase === "result"||diningReady)
      ? h(
          GameResult,
          {
            id: "hotpot",
            title: "这一碗，趁热开吃",
            api,
            onReplay: action(dispatch, "reset"),
            onBite:s.phase==="cooking"?action(dispatch,"finish"):undefined,
            tableControls:s.phase==="cooking"?h(Pause,{state:s,dispatch}):null,
          },
          h(
            "p",
            null,
            `${s.broth} · 下锅 ${s.added} 份 · 捞起 ${s.served.length} 份 · ${money(s.paidTotal || s.total || 0)}`,
          ),
          s.pot.length > 0 &&
            h(
              "p",
              { className: "game-warning" },
              `还有 ${s.pot.length} 份没有捞起。`,
            ),
          h(
            "div",
            { className: "game-result-items" },
            s.served.map((f) =>
              h(
                "div",
                { key: f.key },
                h(Food, { api, id: f.food, size: 36 }),
                h("span", null, f.name),
                h("b", null, f.quality >= 70 ? "口感正好" : "别样口感"),
              ),
            ),
          ),
        )
      : h(
          "div",
          { className: "game-layout" },
          h(
            "section",
            { className: "game-workbench" },
            h(
              Customer,
              { api, compact:true },
              h("small", null, `今天的汤底：${s.broth}`),
            ),
            s.outingPlan&&s.added===0&&h("div",{className:"suggested-pot"},h("p",null,`${s.outingPlan.title} · ${s.outingPlan.foods.map(f=>f.name).join("、")}`),h(Button,{primary:true,disabled:s.paymentPending,onClick:action(dispatch,"add_batch",{ids:s.outingPlan.recipe.ids})},`这几样下锅 · ${s.outingPlan.cost}金币`)),
            h("div",{className:"pot-stage physical-pot"},h(PotArt,{api,color:broth.color,state:s}),
              h("div",{className:"pot-surface-foods"},...s.pot.map((f,index)=>h(ScoopFood,{key:f.key,food:f,index,api,state:s,dispatch})))),
            h(
              "p",
              { className: "game-muted pot-legend" },
              s.phase === "setup"
                ? "点食材下锅"
                : s.pot.length
                  ? "点菜捞起"
                  : "点食材下锅",
            ),
            h(
              "div",
              { className: "game-status-line" },
              h(
                "b",
                null,
                s.phase === "setup"
                  ? "开锅准备中"
                  : `不限时 · 锅内 ${s.pot.length}/6`,
              ),
              h(
                "span",
                { className: total > 30 ? "is-warning" : "" },
                `本餐已点 ${money(s.paidTotal || 0)}`,
              ),
            ),
            s.phase === "cooking" && h(Pause,{state:s,dispatch}),
            s.served.length>0 && h("section",{className:"served-plate"},
              h(ServingBowl,{api},h("div",{className:"bowl-preview-foods"},...s.served.slice(-6).map(f=>h("button",{type:"button",key:f.key,className:"raw-bowl-food",disabled:s.paused||s.paymentPending||s.pot.length>=6,onClick:action(dispatch,"return",{key:f.key}),"aria-label":`回锅再煮${f.name}`},h(Food,{api,id:f.food,size:44}),h("small",null,f.name),h("small",null,heatState(f.age,f.cook)==="raw"?"点我回锅":"点我再煮"))))),
            ),
          ),
          h(
            "aside",
            { className: "game-controls" },
            h(Choice, {
              label: "选一锅今天的心情",
              options: BROTHS.map((b) => b.name),
              value: s.broth,
              onChange: (value) => dispatch({ type: "broth", value }),
              disabled: s.phase !== "setup",
            }),
            h("h2", null, "咕嘟咕嘟，下点什么？"),

            h(
              "div",
              { className: "game-food-grid" },
              POT_MENU.map((f) =>
                h(
                  "button",
                  {
                    type: "button",
                    key: f.id,
                    disabled:
                      s.paymentPending ||
                      s.paused ||
                      s.pot.length >= 6,
                    onClick: action(dispatch, "add", { id: f.id }),
                    "aria-label": `下锅${f.name}`,
                  },
                  h(Food, { api, id: f.food, size: 56 }),
                  h("b", null, f.name),
                  h("small", null, `${money(mealPrice(s,f.price))} · 约${f.cook}秒`),
                ),
              ),
            ),
          ),
        ),
  );
}
