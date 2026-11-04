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
  BBQ_ORDERS,
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
    order = BBQ_ORDERS[s.round % BBQ_ORDERS.length],
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
        "烤好的串可夹到保温区，火候就不再变化；也能回炉。选口味后点“撒上”，才算真的撒了料。",
        "确认选串后按标价扣币，不限时慢慢烤；点评只供参考。",
      ],
    },
    s.phase === "result"
      ? h(
          GameResult,
          {
            id: "bbq",
            title: "串儿出炉，趁热开吃",
            score: s.score,
            breakdown: s.breakdown,
            api,
            order,
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
            `${s.seasonApplied ? `已撒${s.seasonApplied}` : "这盘忘了撒料"} · 合计 ${money(s.total)} · 用时 ${Math.round(s.elapsed)}秒`,
          ),
        )
      : h(
          "div",
          { className: "game-layout bbq-refined" },
          h(
            "section",
            { className: "game-workbench" },
            h(Customer, { api, order }),
            h(
              "div",
              { className: "bbq-live-feedback", role: "status" },
              s.feedback,
            ),
            !cooking ? h("section",{className:"bbq-prep-tray","aria-label":"待烤盘"},
              h("div",{className:"bbq-tray-heading"},h("h2",null,`待烤盘 · ${s.selected.length}/6串`),h("span",null,"选好后再上炉，点串可以拿掉")),
              s.selected.length ? h("div",{className:"bbq-prep-skewers"},...s.selected.map(f=>h("button",{type:"button",key:f.key,className:"bbq-prep-skewer",onClick:action(dispatch,"remove",{key:f.key}),"aria-label":`移除${f.name}`},
                h(SkewerArt,{api,food:f}),h("b",null,f.name),h("small",null,"拿掉这一串"))))
                : h("p",{className:"bbq-empty-tray"},"先挑喜欢的串，选好再上炉。"))
            : h("section",{className:"bbq-cooking-station","aria-label":"烤炉"},
              h("div",{className:"bbq-live-grill",ref:grillRef},h(GrillDrawing,{api,active:s.items.some(f=>!f.resting)}),
                s.interaction?.type === "sprinkle" && h(SeasonShaker,{key:s.sprinkleCount,kind:s.seasonApplied}),
                h("div",{className:"bbq-grate-skewers"},...s.items.map((f,index)=>f.resting?h("div",{key:f.key,className:"bbq-empty-slot",style:{"--skewer-offset":`${(2.5-index)*7}%`}},h(GrillLabel,{food:f,removed:true})):h("button",{
                  key:f.key,type:"button",className:"bbq-on-grate",style:{"--skewer-offset":`${(2.5-index)*7}%`},disabled:s.paused,onClick:action(dispatch,"flip",{key:f.key}),"aria-label":`翻动烤网第${index+1}串${f.name}`,"aria-describedby":`bbq-local-${f.key}`},
                  h(SkewerArt,{api,food:f,season:s.seasonApplied,burst:s.interaction?.type==="sprinkle"?s.sprinkleCount:0,turning:s.interaction?.type==="flip"&&s.interaction?.target===f.key}),h("span",{className:"bbq-skewer-number"},index+1),h(GrillLabel,{food:f,paused:s.paused}))))),
              h("p",{className:"bbq-grill-caption"},"点一下串就能翻面，烤好了就夹到保温盘。"),
              h("div",{className:"bbq-skewer-controls"},...s.items.map((f,index)=>h("article",{key:f.key,className:`bbq-control-row ${f.resting?"is-resting":""}`},
                h("div",{className:"bbq-control-name"},h("b",null,`${index+1} · ${f.name}`),h("small",null,f.resting?"已离火保温":bbqStatus(f).label)),
                h("div",{className:"bbq-row-actions"},!f.resting&&h("button",{type:"button",disabled:s.paused,onClick:action(dispatch,"flip",{key:f.key}),"aria-label":`给${f.name}翻面`},"翻面"),
                  h("button",{type:"button",disabled:s.paused,onClick:action(dispatch,"rest",{key:f.key}),"aria-label":`${f.resting?"回炉":"夹出"}${f.name}`},f.resting?"回炉":"夹到保温区")))))) ,
            cooking &&
              h(
                "section",
                { className: "warming-tray" },
                h(
                  "div",
                  { className: "warming-heading" },
                  h("h2", null, `保温区 · ${warm.length}串`),
                  h("small", null, "这里的火候暂停变化"),
                ),
                warm.length
                  ? h(
                      "div",
                      { className: "warming-items" },
                      warm.map((f) =>
                        h(
                          "article",
                          { key: f.key },
                          h(SkewerArt, {
                            api,
                            food: f,
                            season: s.seasonApplied,
                            burst: s.sprinkleCount,
                          }),
                          h(
                            "div",
                            null,
                            h("b", null, f.name),
                            h(Doneness, { food: f }),
                          ),
                          h("button",{type:"button",disabled:s.paused,onClick:action(dispatch,"rest",{key:f.key}),"aria-label":`从保温盘回炉${f.name}`},"回炉"),
                        ),
                      ),
                    )
                  : h("p", null, "先烤好的串夹过来，等其他串一起出炉。"),
              ),
            h(
              "div",
              { className: "game-status-line" },
              h("b", null, `${s.selected.length}/6 串 · ${money(total)}`),
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
              "div",
              { className: "bbq-season-station" },
              h("h2", null, "调味小台"),
              h(
                "p",
                { className: "game-muted" },
                "按自己喜欢的口味撒一点，香气才会落到串上。",
              ),
              h(Choice, {
                label: "选一种口味",
                options: ["孜然", "辣椒", "蜜汁"],
                value: s.season,
                onChange: (value) => dispatch({ type: "season", value }),
                disabled: cooking && s.paused,
              }),
              cooking && h(
                Button,
                {
                  primary: true,
                  disabled: s.paused,
                  onClick: action(dispatch, "sprinkle"),
                },
                `撒上${s.season}`,
              ),
              h(
                "p",
                { className: "applied-season" },
                !cooking ? `预选${s.season}，上炉后再撒。` : s.seasonApplied
                  ? `这盘已经撒了：${s.seasonApplied}`
                  : "这盘还没有撒料",
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
                    "p",
                    { className: "game-muted" },
                    "每串一面所需时间不同；早烤好的可以先夹到保温区。",
                  ),
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
              : h(
                  "section",
                  { className: "bbq-chef-notes" },
                  h("h2", null, "掌勺小贴士"),
                  h(
                    "ul",
                    null,
                    h("li", null, "看颜色和烤痕，点一下串就能翻面。"),
                    h("li", null, "火候过了会留下焦痕，回炉不能消掉焦痕。"),
                    h(
                      "li",
                      null,
                      "不同食材分开翻面、先后保温，更容易整盘都刚好。",
                    ),
                    h("li", null, "换了口味后，记得重新点一下撒料。"),
                  ),
                ),
          ),
        ),
  );
}
