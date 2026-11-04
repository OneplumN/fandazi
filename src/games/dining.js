import {buddyById} from './outing-model.js';
import {MealMemento} from './memento.js';
import {ServingBowl} from './vessels.js';
export {ServingBowl} from './vessels.js';
import {X as React,createPortal} from '../../vendor/react-runtime.js';
import {SkewerDrawing} from "./bbq-art.js";
import {CupArt,BreakfastArt,useVisibleArt} from './kitchen-art.js';
import {TEAS,TOPPINGS} from './rules.js';
import {mealItems,initialDining,validDining,takeBite,diningSummary} from './dining-model.js';
import {FeedbackSettings,kitchenFeedback,Chopsticks,canAnimateMeal} from './experience.js';
const h=React.createElement, KEY='dazi.dining.v1', memory=new Map();
let queue=Promise.resolve(), memoryOnly=false;
function read(id,items) {
  if(!memoryOnly)try {const saved=JSON.parse(localStorage.getItem(KEY))?.[id];if(validDining(saved,items))return saved;}catch{memoryOnly=true;}
  const saved=memory.get(id);return validDining(saved,items)?saved:initialDining(items);
}
function write(id,counts) {
  memory.set(id,counts);
  try {let all=JSON.parse(localStorage.getItem(KEY)) || {};delete all[id];all={...all,[id]:counts};const keys=Object.keys(all);for(const key of keys.slice(0,-80))delete all[key];localStorage.setItem(KEY,JSON.stringify(all));}catch{memoryOnly=true;}
}
function FoodIcon({api,id,size=64}) {
  const food=api.menu?.find(f=>f.id===id);return food?h(api.Food,{...food,size}):null;
}
function Skewer({api,item,eaten}) {return h(SkewerDrawing,{api,food:item,eaten});}
export function DiningTable({game,mealId,api,state,onBite,canInteract}) {
  const items=React.useMemo(()=>mealItems(game,state,api.menu),[game,mealId]);
  const [counts,setCounts]=React.useState(()=>read(mealId,items)),[message,setMessage]=React.useState(''),[pending,setPending]=React.useState(false),[pulse,setPulse]=React.useState(0);
  const summary=diningSummary(counts,items),sceneRef=useVisibleArt(),eating=React.useRef(false),serial=React.useRef(0),timers=React.useRef(new Set());
  const [mouthfuls,setMouthfuls]=React.useState([]),[bite,setBite]=React.useState(null);
  const eaterRef=React.useRef(null),mounted=React.useRef(true),buddy=buddyById(state.companionId);
  const later=(fn,ms)=>{const timer=setTimeout(()=>{timers.current.delete(timer);if(mounted.current)fn();},ms);timers.current.add(timer);return timer;};
  React.useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;for(const timer of timers.current)clearTimeout(timer);};},[]);
  const lift=(index,node)=>{
    if(!canAnimateMeal()||!node?.isConnected||!eaterRef.current)return false;
    const rect=(node.querySelector('svg')||node).getBoundingClientRect(),target=eaterRef.current.getBoundingClientRect();
    const nonce=++serial.current,flight={nonce,index,x:rect.x+rect.width/2,y:rect.y+rect.height*.42,dx:target.x+target.width*.5-(rect.x+rect.width/2),dy:target.y+target.height*.65-(rect.y+rect.height*.42)};
    setBite({index,nonce});
    if(game!=='tea')setMouthfuls([flight]);
    return true;
  };
  React.useEffect(()=>{const clear=()=>{if(document.hidden)setMouthfuls([]);};document.addEventListener('visibilitychange',clear);return()=>document.removeEventListener('visibilitychange',clear);},[]);
  React.useEffect(()=>{
    const sync=e=>{if(e.key===KEY||e.key===null)setCounts(read(mealId,items));};window.addEventListener('storage',sync);
    return()=>window.removeEventListener('storage',sync);
  },[mealId,items]);
  React.useEffect(()=>{
    if(game!=='malatang')return;
    const old=window.render_game_to_text,render=()=>JSON.stringify({game,phase:'dining',dining:{mealId,...summary,counts}});
    window.render_game_to_text=render;return()=>{if(window.render_game_to_text===render)window.render_game_to_text=old;};
  },[game,mealId,counts]);
  const blocked=Boolean(state.paymentPending||(state.paused&&!["result","shift"].includes(state.phase)));
  const eat=(index,node)=>{
    if(eating.current || blocked || (canInteract && !canInteract()))return;
    eating.current=true;
    kitchenFeedback(game==='tea'?'sip':'eat');setPending(true);
    let animating=false;
    const task=()=>{
      const current=read(mealId,items),next=takeBite(current,items,index);if(next===current)return;
      write(mealId,next);animating=lift(index,node);setPulse(n=>n+1);
      const settle=()=>{const after=diningSummary(next,items);setMessage(after.finished?'吃饱啦，慢慢坐一会儿。':game==='tea'?`咕嘟一口，还剩 ${Math.round((1-next[0]/5)*100)}%`:`${items[index].name}，${next[index]===items[index].bites?'吃完啦！':`还剩 ${items[index].bites-next[index]} 口。`}`);setCounts(next);setMouthfuls([]);setBite(null);eating.current=false;setPending(false);onBite?.();};
      if(animating)later(settle,680);else settle();
      
    };
    const run=()=>navigator.locks?.request?navigator.locks.request('dazi-dining-write',task):task();
    queue=queue.then(run,run).catch(()=>setMessage("刚才这一口没记上，再点一下试试。")).finally(()=>{if(!animating&&mounted.current){eating.current=false;setPending(false);}});
  };
  if(!items.length)return null;
  const title={bbq:'一串串，趁热吃',tea:'你的特调，慢慢喝',hotpot:'捞到碗里，开吃啦',breakfast:'包好啦，咬一口',malatang:'这一盆，慢慢享用'}[game];
  const tea=TEAS.find(t=>t.id===state.tea);
  return h('section',{ref:sceneRef,'data-motion-visible':'false',className:`dining-table dining-${game}`,'data-eating':bite?String(bite.index):undefined,'data-dining':JSON.stringify({game,mealId,...summary,counts}),'aria-label':'享用这一餐'},
    h('div',{className:'dining-heading'},h('h3',null,summary.finished?'这餐吃好啦':title),h('span',null,summary.finished?'这餐吃完啦':`${summary.eaten} / ${summary.total} 口`)),
    
    !summary.finished&&h('div',{className:'dining-stage','data-finished':summary.finished},
      h('div',{className:'dining-eater',ref:eaterRef,'data-chewing':Boolean(bite),'aria-label':`${buddy.name}陪你尝一口`},h(api.Avatar,{id:buddy.id,name:buddy.name,size:60,color:buddy.color}),h('svg',{className:'munch-marks',viewBox:'0 0 100 80','aria-hidden':true},h('path',{d:'M12 37 q-6 6 0 13 M6 31 q-10 12 0 23 M88 37 q6 6 0 13 M94 31 q10 12 0 23',fill:'none',stroke:'#A5734C',strokeWidth:2,strokeLinecap:'round'})),h('small',null,buddy.name)),
      ['tea','breakfast'].includes(game)?h('button',{type:'button',className:'dining-main-food',disabled:pending||blocked||summary.finished,onClick:event=>eat(0,event.currentTarget),'aria-label':game==='tea'?'喝一口奶茶':'咬一口早餐饼'},
        h('div',{className:'dining-motion',key:pulse},game==='tea'?h(CupArt,{api,state,tea,toppings:(state.toppings||[]).map(id=>TOPPINGS.find(t=>t.id===id)).filter(Boolean),level:1-counts[0]/5}):h(BreakfastArt,{api,state,folded:true,bites:counts[0]})),
        h('span',null,summary.finished?(game==='tea'?'杯子空啦':'饼吃完啦'):game==='tea'?'喝一口':`咬一口 · 还剩 ${4-counts[0]} 口`))
      :game==='bbq'?h('div',{className:'dining-foods',style:{'--servings':Math.min(3,items.length)}},...items.map((item,index)=>h('button',{type:'button',key:item.id,className:'dining-food','data-lifting':bite?.index===index,disabled:pending||blocked||counts[index]>=item.bites,onClick:event=>eat(index,event.currentTarget),'aria-label':`吃一口${item.name}（第${index+1}份）`,'data-eaten':counts[index]>=item.bites},
          h(Skewer,{api,item,eaten:counts[index]}),h('b',null,item.name),h('small',null,counts[index]>=item.bites?'吃完啦':`还剩 ${item.bites-counts[index]} 口`))))
      :h('div',{className:'dining-bowl-wrap'},game==='malatang'&&!summary.finished&&h('svg',{className:'malatang-warmth',viewBox:'0 0 360 45','aria-hidden':true},...[130,185,235].map((x,n)=>h('path',{key:n,d:`M${x} 43 q-6 -9 0 -17 q6 -9 0 -18`,fill:'none',stroke:'#A48B74',strokeWidth:2,strokeLinecap:'round',style:{'--lag':`${n*-.7}s`}}))),h(ServingBowl,{api},summary.finished?h('span',null,'谢谢款待'):h('div',{className:'bowl-edible-foods'},...items.map((item,index)=>({item,index})).filter(({item,index})=>counts[index]<item.bites).slice(0,6).map(({item,index})=>h('button',{key:item.id,type:'button',className:'dining-food','data-lifting':bite?.index===index,style:game==='malatang'?{'--serve-lag':`${Math.min(index,5)*45}ms`}:undefined,disabled:pending||blocked,onClick:event=>eat(index,event.currentTarget),'aria-label':`吃一口${item.name}（第${index+1}份）`},game==='malatang'?h('span',{className:'malatang-food-settle',key:counts[index]},h(FoodIcon,{api,id:item.food,size:46})):h(FoodIcon,{api,id:item.food,size:46}),h('b',null,item.name),h('small',null,`×${item.bites-counts[index]}`))))),
        h('p',{className:'bowl-ingredient-list'},summary.finished?'碗里都吃完啦':items.filter((item,index)=>counts[index]<item.bites).slice(0,6).map(item=>item.name).join(' · ')),
        items.filter((item,index)=>counts[index]<item.bites).length>6&&h('p',{className:'dining-hint'},'碗里先放六样，吃完会继续盛上后面的食材。'))),
    h('p',{className:'dining-response',role:'status','aria-live':'polite'},message || (summary.finished?'吃饱啦，慢慢坐一会儿。':'做得认真，也吃得开心。')),
    h(FeedbackSettings,{}),
    summary.finished&&h(MealMemento,{game,mealId,state,items,api}),
    createPortal(mouthfuls.map(f=>h('div',{className:`dining-mouthful mouthful-${game}`,key:f.nonce,'data-food':items[f.index].food,'aria-hidden':true,style:{left:f.x,top:f.y,'--bite-x':`${f.dx}px`,'--bite-y':`${f.dy}px`}},game==='breakfast'?h('svg',{viewBox:'0 0 64 64',className:'pancake-mouthful'},h('path',{d:'M9 45 Q2 23 20 13 Q38 5 55 26 L43 47 Q26 59 9 45Z',fill:'#EDD9AE',stroke:'#3D2B23',strokeWidth:2.4}),h('path',{d:'M16 35 L44 23 M19 43 L46 31',stroke:'#B7884C',strokeWidth:2,strokeLinecap:'round'})):h(FoodIcon,{api,id:items[f.index].food,size:46}),game!=='breakfast'&&h(Chopsticks),h('i',{className:'bite-crumb crumb-one'}),h('i',{className:'bite-crumb crumb-two'}))),document.body));
}
