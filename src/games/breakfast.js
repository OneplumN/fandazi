import {mealPrice} from "./common.js";
import {useOptionalStroke} from "./gestures.js";
import {h,useEngine,GameFrame,Button,Choice,Customer,Food,Pause,GameResult,action} from "./common.js";
import {FILLINGS,initialBreakfast,breakfastReducer} from "./rules.js";
import {BreakfastArt,IngredientArt} from "./kitchen-art.js";
export function Breakfast({api}) {
 const [s,dispatch]=useEngine("breakfast",breakfastReducer,initialBreakfast);
 const spread=useOptionalStroke(()=>dispatch({type:"spread"}),{circle:true});
 const ready=s.phase==="ready",cooking=s.phase==="cooking";
 const tap=s.paused?"pause":ready?"start":cooking?"flip":"deliver";
 return h(GameFrame,{id:"breakfast",title:"早餐小摊",subtitle:"摊一张热乎的，慢慢吃。",state:s,dispatch,rules:["点饼开摊，每份10金币，含鸡蛋和最多3种配菜。","点饼翻面，点配菜加入，再点饼包起来。想摊圆时可在饼上画圈，键盘按S也可以。"]},
 s.phase==="result"?h(GameResult,{id:"breakfast",title:"早餐做好啦",api,record:false,onReplay:action(dispatch,"next"),replayLabel:"再做一份"},h("p",null,`${s.base} · ${s.sauce}`)):
 h("div",{className:"game-layout"},h("section",{className:"game-workbench"},
 h(Customer,{api,compact:true}),
 h("button",{...spread,type:"button",id:"breakfast-start",className:"food-touch-button breakfast-stage",disabled:s.paymentPending,onKeyDown:event=>{if(cooking&&event.key.toLowerCase()==="s"){event.preventDefault();dispatch({type:"spread"});}},onClick:action(dispatch,tap,s.paused?{value:false}:{}),"aria-label":ready?`摊饼 ${mealPrice(s,10)}金币`:s.paused?"继续摊饼":cooking?"翻面":"包起来"},h(BreakfastArt,{api,state:s}),h("span",{className:"food-touch-caption"},s.paymentPending?"正在下单…":ready?`点饼开摊 · ${mealPrice(s,10)}金币`:s.paused?"点饼继续":cooking?"点饼翻面":"点饼包起来")),
 !ready&&h("div",{className:"game-actions"},h(Pause,{state:s,dispatch}),cooking&&h(Button,{disabled:s.paused,onClick:action(dispatch,"wrap")},"直接包起来"))),
 h("aside",{className:"game-controls"},ready&&h(Choice,{label:"饼底",options:["煎饼","手抓饼"],value:s.base,onChange:value=>dispatch({type:"base",value}),disabled:!ready||s.paymentPending}),
 !ready&&h("h2",null,"配菜 · 最多3样"),!ready&&h("div",{className:"game-food-grid"},h("button",{type:"button",disabled:ready||s.paused||s.egg,onClick:action(dispatch,"egg"),"aria-label":"加一颗蛋"},h(Food,{api,id:"jidan",size:56}),h("b",null,s.egg?"已加鸡蛋":"鸡蛋"),h("small",null,"套餐内")),...FILLINGS.map(f=>h("button",{type:"button",key:f.id,"aria-label":`加料${f.name}`,"aria-pressed":s.fillings.includes(f.id),disabled:ready||s.paused||(!s.fillings.includes(f.id)&&s.fillings.length>=3),onClick:action(dispatch,"filling",{id:f.id})},h(IngredientArt,{id:f.id,size:56}),h("b",null,f.name)))),
 !ready&&h(Choice,{label:"酱料",options:["甜面酱","辣酱","番茄酱"],value:s.sauce,onChange:value=>dispatch({type:"sauce",value}),disabled:ready||s.paused}))));
}
