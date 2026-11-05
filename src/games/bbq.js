import {mealPrice} from "./common.js";
import {createHoldGesture} from "./gestures.js";
import {X as React} from "../../vendor/react-runtime.js";
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
  GRILL_MENU,
  initialBBQ,
  bbqReducer,
  money,
  heatState,
  bbqItemNotes,
  bbqAdvice,
  bbqStatus,
} from "./rules.js";
import {SkewerDrawing,GrillDrawing,HeatVapour,SeasonShaker} from "./bbq-art.js";
function SkewerArt({ api, food, season, burst = 0, served = false, turning = false }) {
  const heating=!served && !!food.sides && !food.resting;
  return h("div",{className:"skewer-art"},
    h("div",{key:food.flips || 0,className:`skewer-turn ${turning?"is-turning":""}`,style:{"--face-from":`${Math.max(0,(food.flips||0)-1)*180}deg`,"--face-to":`${(food.flips||0)*180}deg`,transform:`rotateY(${(food.flips||0)*180}deg)`}},h(SkewerDrawing,{api,food,season,active:heating})),
    heating && h(HeatVapour,{food}),
    turning && h("svg",{key:`tongs${food.flips}`,className:"bbq-turning-tongs",viewBox:"0 0 110 216","aria-hidden":true},h("path",{d:"M100 -6 L53 71 L40 85 M106 -2 L67 78 L51 93",fill:"none",stroke:"#6D6558",strokeWidth:4,strokeLinecap:"round"}),h("path",{d:"M100 -6 L106 -2",stroke:"#B99062",strokeWidth:8,strokeLinecap:"round"})),
    burst>0 && !served && h("span",{key:burst,className:"seasoning-burst","aria-hidden":true},...[0,1,2,3,4,5,6,7].map(n=>h("i",{key:n,style:{"--fall-x":`${8+n%4*12}px`,"--fall-delay":`${n*.035}s`,background:season === "辣椒"?"#B95543":"#B58B45"}}))));
}
function SkewerButton({food,index,state,dispatch,api}) {
 const latest=React.useRef();latest.current={state,dispatch,food};
 const gestures=React.useMemo(()=>createHoldGesture({hold:()=>{const {state,dispatch,food}=latest.current;if(state.season)dispatch({type:"sprinkle",key:food.key});},tap:()=>{const {dispatch,food}=latest.current;dispatch({type:"flip",key:food.key});}}),[]);
 React.useEffect(()=>()=>gestures.dispose(),[gestures]);
 return h("button",{type:"button",className:"bbq-on-grate",style:{"--skewer-offset":`${(2.5-index)*7}%`},disabled:state.paused,
 onPointerDown:gestures.down,onPointerMove:gestures.move,onPointerUp:gestures.up,onPointerCancel:gestures.cancel,onPointerLeave:gestures.cancel,onClick:gestures.click,onKeyDown:e=>{if(e.key.toLowerCase()==="s"&&state.season){e.preventDefault();dispatch({type:"sprinkle",key:food.key});}},onContextMenu:e=>e.preventDefault(),"aria-label":`翻动烤网第${index+1}串${food.name}，长按或按S撒料`,"aria-describedby":`bbq-local-${food.key}`},
 h(SkewerArt,{api,food,season:food.season,burst:state.interaction?.type==="sprinkle"&&(state.interaction.target===undefined||state.interaction.target===food.key)?state.sprinkleCount:0,turning:state.interaction?.type==="flip"&&state.interaction.target===food.key}),h("span",{className:"bbq-skewer-number"},index+1),h(GrillLabel,{food,paused:state.paused}));
}
function Doneness({food}) {
  return h("small",{className:`bbq-simple-status status-${bbqStatus(food).kind}`},bbqStatus(food).label);
}
function GrillLabel({food,paused=false,removed=false}) {
  const status=bbqStatus(food);
  return h("span",{id:`bbq-local-${food.key}`,className:`bbq-local-label status-${status.kind}`,"data-cook-status":status.kind},
    h("b",null,food.name),h("span",{className:"bbq-local-state"},removed?"已夹出":status.label),(removed||paused)&&h("small",null,removed?"保温盘中":"已暂停"));
}
export function BBQ({ api }) {
  const [s, dispatch] = useEngine("bbq", bbqReducer, initialBBQ),
    total = s.selected.reduce((n, f) => n + f.price, 0),
    cooking = s.phase === "cooking",
    ready = s.items.filter((f) =>
      f.sides.every((t) => heatState(t, f.cook) === "ready"),
    ).length;
  const warm = s.items.filter((f) => f.resting),grillRef=React.useRef(null);
  React.useEffect(()=>{
    const node=grillRef.current;if(!node || typeof IntersectionObserver!=="function")return;
    const observer=new IntersectionObserver(([entry])=>{node.dataset.visible=String(entry.isIntersecting);},{rootMargin:"30px"});observer.observe(node);return()=>observer.disconnect();
  },[cooking]);
  const toggleRest=(key,event)=>{
    dispatch({type:"rest",key});
    if(event.detail===0)requestAnimationFrame(()=>grillRef.current?.closest(".game-workbench")?.querySelector(`[data-rest-key="${key}"]`)?.focus({preventScroll:true}));
  };
  return h(
    GameFrame,
    {
      id: "bbq",
      title: "烧烤搭子",
      subtitle: "看着炭火，翻翻串，慢慢吃。",
      state: s,
      dispatch,
      rules: [
        "挑选最多6串，留意食材各自需要的时间和预算。",
        "放上炉子就会自动烤，点串随时翻一翻；看肉色、烤痕和熟度提示，烤好了就夹出。",
        "烤好的串可夹到保温区，火候就不再变化；也能回炉。选口味后长按串撒料，也可用串下的撒料按钮。",
        "确认选串后按标价扣币，不限时慢慢烤；点评只供参考。",
      ],
    },
    s.phase === "result"
      ? h(
          GameResult,
          {
            id: "bbq",
            title: "串儿出炉，趁热开吃",
            api,
            feedback: bbqAdvice(s),
            onReplay: action(dispatch, "reset"),
          },
          h(
            "div",
            { className: "bbq-item-reviews" },
            s.items.map((f) =>
              h(
                "article",
                { key: f.key },
                h(
                  "div",
                  null,
                  h("b", null, f.name),
                  h(
                    "strong",
                    null,
                    f.sides.every(t=>heatState(t,f.cook) === "ready") ? "烤得刚好" : "火候小记",
                  ),
                ),
                h("p", null, bbqItemNotes(f)),
              ),
            ),
          ),
          h(
            "p",
            { className: "game-muted" },
            `${s.items.map(f=>`${f.name} ${f.season||"原味"}`).join("、")} · 合计 ${money(mealPrice(s,s.total))} · 用时 ${Math.round(s.elapsed)}秒`,
          ),
        )
      : h(
          "div",
          { className: "game-layout bbq-refined" },
          h(
            "section",
            { className: "game-workbench" },
            h(Customer, { api }),
            h(
              "div",
              { className: "bbq-live-feedback sr-only", role: "status" },
              s.feedback,
            ),
            !cooking ? h("section",{className:"bbq-prep-tray","aria-label":"待烤盘"},
              h("div",{className:"bbq-tray-heading"},h("h2",null,`待烤盘 · ${s.selected.length}/6串`),s.selected.length>0&&h("span",null,"点串拿掉")),
              s.selected.length ? h("div",{className:"bbq-prep-skewers"},...s.selected.map(f=>h("button",{type:"button",key:f.key,className:"bbq-prep-skewer",onClick:action(dispatch,"remove",{key:f.key}),"aria-label":`移除${f.name}`},
                h(SkewerArt,{api,food:f}),h("b",null,f.name))))
                : h("p",{className:"bbq-empty-tray"},"先从下面挑几串"))
            : h("section",{className:"bbq-cooking-station","aria-label":"烤炉"},
              h("div",{className:"bbq-live-grill",ref:grillRef},h(GrillDrawing,{api,active:s.items.some(f=>!f.resting)}),
                s.interaction?.type === "sprinkle" && h(SeasonShaker,{key:s.sprinkleCount,kind:s.seasonApplied}),
                h("div",{className:"bbq-grate-skewers"},...s.items.map((f,index)=>f.resting?h("div",{key:f.key,className:"bbq-empty-slot",style:{"--skewer-offset":`${(2.5-index)*7}%`}},h(GrillLabel,{food:f,removed:true})):h(SkewerButton,{key:f.key,food:f,index,state:s,dispatch,api})))),
              !s.items.some(f=>f.flips>0)&&h("p",{className:"bbq-grill-caption"},"点串翻面 · 长按撒料"),
              h("div",{className:"bbq-skewer-controls"},...s.items.map((f,index)=>!f.resting&&h("article",{key:f.key,className:"bbq-control-row"},
                h("div",{className:"bbq-control-name"},h("b",null,`${index+1} · ${f.name}`),h("small",null,bbqStatus(f).label)),
                h("div",{className:"bbq-row-actions"},h("button",{type:"button",disabled:s.paused||!s.season,onClick:action(dispatch,"sprinkle",{key:f.key}),"aria-label":`给${f.name}撒${s.season||"料"}`},f.season||"撒料"),
                  h("button",{type:"button",disabled:s.paused,"data-rest-key":f.key,onClick:event=>toggleRest(f.key,event),"aria-label":`夹出${f.name}`},"夹出")))))) ,
            cooking && warm.length > 0 &&
              h(
                "section",
                { className: "warming-tray" },
                h(
                  "div",
                  { className: "warming-heading" },
                  h("h2", null, `保温区 · ${warm.length}串`),
                  h("small", null, "点串回炉"),
                ),
                warm.length
                  ? h(
                      "div",
                      { className: "warming-items" },
                      warm.map((f) =>
                        h(
                          "button",
                          { type:"button",key:f.key,disabled:s.paused,"data-rest-key":f.key,onClick:event=>toggleRest(f.key,event),"aria-label":`从保温盘回炉${f.name}` },
                          h(SkewerArt, {
                            api,
                            food: f,
                            season: f.season,
                            burst: s.sprinkleCount,
                          }),
                          h(
                            "div",
                            null,
                            h("b", null, f.name),
                            h(Doneness, { food: f }),
                          ),

                        ),
                      ),
                    )
                  : h("p", null, "先烤好的串夹过来，等其他串一起出炉。"),
              ),
            h(
              "div",
              { className: "game-status-line" },
              h("b", null, `${s.selected.length}/6 串 · ${money(mealPrice(s,total))}`),
              h(
                "span",
                { className: total > s.budget ? "is-warning" : "" },
                total > s.budget
                  ? `超预算 ${money(total - s.budget)}`
                  : `预算剩余 ${money(s.budget - total)}`,
              ),
            ),
            h(
              "div",
              { className: "game-actions" },
              !cooking
                ? h(
                    Button,
                    {
                      primary: true,
                      id: "bbq-start",
                      disabled: !s.selected.length,
                      onClick: action(dispatch, "start"),
                    },
                    "开始烤制",
                  )
                : h(
                    "div",
                    { className: "game-cook-actions" },
                    h(
                      "span",
                      null,
                      `${ready}串烤好了 · 不限时`,
                    ),
                    h(Pause, { state: s, dispatch }),
                    h(
                      Button,
                      { primary: true, disabled:s.paused, onClick: action(dispatch, "serve") },
                      "整盘出炉",
                    ),
                  ),
            ),
          ),
          h(
            "aside",
            { className: "game-controls" },
            h(
              cooking?"section":"details",
              { className: `bbq-season-station${cooking?"":" optional-season"}` },
              !cooking&&h("summary",null,"调味（可选）"),

              h(Choice, {
                label: "口味",
                options: ["孜然", "辣椒", "蜜汁"],
                value: s.season,
                onChange: (value) => dispatch({ type: "season", value }),
                disabled: cooking && s.paused,
              }),
              cooking && h(
                Button,
                {
                  primary: true,
                  disabled: s.paused||!s.season,
                  onClick: action(dispatch, "sprinkle"),
                },
                s.season?`整盘撒上${s.season}`:"先选口味",
              ),
            ),
            !cooking
              ? h(
                  "section",
                  {className:"bbq-selection-panel"},
                  h(
                    "label",
                    { className: "game-budget" },
                    "这一盘预算",
                    h("input", {
                      type: "number",
                      min: 10,
                      max: 100,
                      value: s.budget,
                      "aria-label": "烧烤预算",
                      onChange: (e) =>
                        dispatch({
                          type: "budget",
                          value: Number(e.target.value),
                        }),
                    }),
                  ),
                  h("h2", null, "今晚烤点什么"),

                  h(
                    "div",
                    { className: "game-food-grid" },
                    GRILL_MENU.map((f) =>
                      h(
                        "button",
                        {
                          type: "button",
                          key: f.id,
                          disabled: s.selected.length >= 6,
                          onClick: action(dispatch, "add", { id: f.id }),
                          "aria-label": `选${f.name}`,
                        },
                        h(SkewerDrawing, { api, food:f }),
                        h("b", null, f.name),
                        s.selected.some(item=>item.id===f.id)&&h("span",{className:"bbq-selected-count"},`已选 ${s.selected.filter(item=>item.id===f.id).length} 串`),
                        h(
                          "small",
                          null,
                          money(f.price),
                        ),
                      ),
                    ),
                  ),
                )
              : null,
          ),
        ),
  );
}
