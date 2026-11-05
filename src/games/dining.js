import {useConsumer} from './consumer-store.js';
import {companionMemory,buddyBiteIndex,servingPage,biteReply} from './companion-memory.js';
import {DEV_TOOLS} from "../runtime.js";
import {LeftoversArt} from "./leftovers.js";
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
// Hotpot changes to its result layout after the first bite; keep this meal's sharing beat.
const sharedMeals=new Map();
function sharedMeal(id){if(!sharedMeals.has(id)){sharedMeals.set(id,{enabled:false,bites:0,waiting:false,due:0});if(sharedMeals.size>80)sharedMeals.delete(sharedMeals.keys().next().value);}return sharedMeals.get(id);}
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
  const [counts,setCounts]=React.useState(()=>read(mealId,items)),[message,setMessage]=React.useState(''),[pending,setPending]=React.useState(false);
  const summary=diningSummary(counts,items),sceneRef=useVisibleArt(),eating=React.useRef(false),serial=React.useRef(0),timers=React.useRef(new Set());
  const {profile:history}=useConsumer(),remembered=companionMemory(history,buddyById(state.companionId).id,{excludeMealId:mealId});
  const session=sharedMeal(mealId);
  const [sharing,setSharing]=React.useState(session.enabled),[buddyBites,setBuddyBites]=React.useState(session.bites),[biteMarks,setBiteMarks]=React.useState(()=>[[252,109,31],[218,83,34],[179,95,39]].slice(0,counts[0]||0).map(([cx,cy,r])=>({cx,cy,r})));
  const sharingRef=React.useRef(session.enabled),buddyTimer=React.useRef(null),blockedRef=React.useRef(false),actorRef=React.useRef('you');
  const [soupLevel,setSoupLevel]=React.useState(0),[poked,setPoked]=React.useState(false);
  const [mouthfuls,setMouthfuls]=React.useState([]),[bite,setBite]=React.useState(null);
  const eaterRef=React.useRef(null),mounted=React.useRef(true),buddy=buddyById(state.companionId);
  const later=(fn,ms)=>{const timer=setTimeout(()=>{timers.current.delete(timer);if(mounted.current)fn();},ms);timers.current.add(timer);return timer;};
  React.useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;for(const timer of timers.current)clearTimeout(timer);};},[]);
  const lift=(index,node,point,before)=>{
    if(!canAnimateMeal()||!node?.isConnected||!eaterRef.current)return false;
    const rect=(node.querySelector('svg')||node).getBoundingClientRect(),target=eaterRef.current.getBoundingClientRect();
    const x=point?.x||rect.x+rect.width/2,y=point?.y||rect.y+rect.height*(game==='bbq'?(.22+Math.min(2,before||0)*.16):.42);
    const nonce=++serial.current,flight={nonce,index,x,y,dx:target.x+target.width*.5-x,dy:target.y+target.height*.65-y};
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
    if(!DEV_TOOLS || game!=='malatang')return;
    const old=window.render_game_to_text,render=()=>JSON.stringify({game,phase:'dining',dining:{mealId,...summary,counts}});
    window.render_game_to_text=render;return()=>{if(window.render_game_to_text===render)window.render_game_to_text=old;};
  },[game,mealId,counts]);
  const blocked=Boolean(state.paymentPending||(state.paused&&!["result","shift"].includes(state.phase)));
  blockedRef.current=blocked;
  const visible=servingPage(items,counts);
  const cancelBuddy=()=>{if(buddyTimer.current){clearTimeout(buddyTimer.current);timers.current.delete(buddyTimer.current);buddyTimer.current=null;}};
  const eat=(index,node,actor='you',point)=>{
    if(eating.current || blockedRef.current || (canInteract && !canInteract()))return;
    if(actor==='you')cancelBuddy();
    actorRef.current=actor;eating.current=true;
    kitchenFeedback(game==='tea'?'sip':'eat');setPending(true);
    let animating=false;
    const task=()=>{
      if(!mounted.current)return;
      const current=read(mealId,items),next=takeBite(current,items,index);if(next===current)return;
      write(mealId,next);if(game==='tea')setPoked(true);if(game==='breakfast'){const rect=node?.getBoundingClientRect(),left=point&&rect?point.x<rect.x+rect.width/2:current[index]%2===1;setBiteMarks(marks=>[...marks,{cx:left?108+current[index]*22:252-current[index]*18,cy:108-(current[index]%2)*20,r:31+current[index]*3}]);}
      animating=lift(index,node,point,current[index]);
      const settle=()=>{
       const after=diningSummary(next,items);setMessage(biteReply(game,items[index],{actor,finished:after.finished,sip:next[0]}));
       setCounts(next);setMouthfuls([]);setBite(null);eating.current=false;setPending(false);
       if(actor==='buddy'){session.bites++;setBuddyBites(session.bites);}
       // One shared bite follows a player bite; the companion never starts an eating loop.
       if(actor==='you'&&sharingRef.current&&!after.finished){session.waiting=true;session.due=Date.now()+850;queueBuddy();}
       onBite?.();
      };
      if(animating)later(settle,680);else settle();

    };
    const run=()=>navigator.locks?.request?navigator.locks.request('dazi-dining-write',task):task();
    queue=queue.then(run,run).catch(()=>setMessage("刚才这一口没记上，再点一下试试。")).finally(()=>{if(!animating&&mounted.current){eating.current=false;setPending(false);}});
  };
  const queueBuddy=()=>{
    cancelBuddy();buddyTimer.current=later(()=>{
      buddyTimer.current=null;if(!session.waiting)return;session.waiting=false;
      const table=sceneRef.current;
      if(!sharingRef.current||document.hidden||Date.now()-session.due>1500||blockedRef.current||!table?.isConnected||table.closest('[inert]'))return;
      const live=read(mealId,items),pick=buddyBiteIndex(items,live,servingPage(items,live),remembered);
      if(pick<0)return;
      const source=table.querySelector(`[data-serving-index="${pick}"]`),rect=source?.getBoundingClientRect();
      if(rect&&rect.top>=0&&rect.bottom<=innerHeight)eat(pick,source,'buddy');
    },Math.max(0,session.due-Date.now()));
  };
  React.useEffect(()=>{if(session.waiting&&session.enabled&&Date.now()-session.due<1500)queueBuddy();else session.waiting=false;},[mealId]);
  if(!items.length)return null;
  const title={bbq:'一串串，趁热吃',tea:'你的特调，慢慢喝',hotpot:'捞到碗里，开吃啦',breakfast:'包好啦，咬一口',malatang:'这一盆，慢慢享用'}[game];
  const tea=TEAS.find(t=>t.id===state.tea);
  return h('section',{ref:sceneRef,'data-motion-visible':'false',className:`dining-table dining-${game}`,'data-eating':bite?String(bite.index):undefined,'data-sharing':sharing,'data-dining':JSON.stringify({game,mealId,...summary,counts,buddyBites}),'aria-label':'享用这一餐'},
    h('div',{className:'dining-heading'},h('h3',null,summary.finished?'这餐吃好啦':title),h('span',{className:'dining-company'},summary.finished?'谢谢款待':sharing?'你一口，我一口':'慢慢吃，不着急')),

    summary.finished&&h('div',{className:'finished-meal-table'},h('div',{className:'buddy-cheers'},h(api.Avatar,{id:buddy.id,name:buddy.name,size:60,color:buddy.color}),h('span',null,'碰杯！这顿好满足。')),h(LeftoversArt,{game,state:{...state,soupLevel},api})),
    !summary.finished&&h('div',{className:'dining-stage','data-finished':summary.finished},
      h('button',{type:'button',className:'dining-eater',ref:eaterRef,disabled:pending||blocked,'aria-pressed':sharing,onClick:()=>{sharingRef.current=!sharingRef.current;session.enabled=sharingRef.current;setSharing(sharingRef.current);if(!sharingRef.current){session.waiting=false;cancelBuddy();}setMessage(sharingRef.current?'好呀，你先尝，下一口分我一点。':'你慢慢吃，我在这儿陪你。');},'data-chewing':Boolean(bite),'data-actor':actorRef.current,'aria-label':sharing?`让${buddy.name}歇一会儿`:`和${buddy.name}一起吃`},h(api.Avatar,{id:buddy.id,name:buddy.name,size:60,color:buddy.color}),h('svg',{className:'munch-marks',viewBox:'0 0 100 80','aria-hidden':true},h('path',{d:'M12 37 q-6 6 0 13 M6 31 q-10 12 0 23 M88 37 q6 6 0 13 M94 31 q10 12 0 23',fill:'none',stroke:'#A5734C',strokeWidth:2,strokeLinecap:'round'})),h('small',null,sharing?'一起吃':summary.eaten>=2?'分我一口？':buddy.name)),
      ['tea','breakfast'].includes(game)?h('button',{type:'button',className:'dining-main-food',disabled:pending||blocked||summary.finished,'data-serving-index':0,onClick:event=>eat(0,event.currentTarget,'you',event.detail?{x:event.clientX,y:event.clientY}:undefined),'aria-label':game==='tea'?'喝一口奶茶':'咬一口早餐饼'},
        h('div',{className:'dining-motion'},game==='tea'?h(CupArt,{api,state:{...state,strawPoked:poked,drinking:Boolean(bite)},tea,toppings:(state.toppings||[]).map(id=>TOPPINGS.find(t=>t.id===id)).filter(Boolean),level:1-counts[0]/5}):h(BreakfastArt,{api,state,folded:true,bites:counts[0],biteMarks})),
        h('span',null,summary.finished?(game==='tea'?'杯子空啦':'饼吃完啦'):game==='tea'?'喝一口':'咬一口'))
      :game==='bbq'?h('div',{className:'dining-foods',style:{'--servings':Math.min(3,items.length)}},...items.map((item,index)=>h('button',{type:'button',key:item.id,className:'dining-food','data-serving-index':index,'data-lifting':bite?.index===index,disabled:pending||blocked||counts[index]>=item.bites,onClick:event=>eat(index,event.currentTarget),'aria-label':`吃一口${item.name}（第${index+1}份）`,'data-eaten':counts[index]>=item.bites},
          h(Skewer,{api,item,eaten:counts[index]}),h('b',null,item.name),h('small',null,counts[index]>=item.bites?'空签留在盘里':counts[index]===2?'最后这一口':'趁热撸一口'))))
      :h('div',{className:'dining-bowl-wrap'},['malatang','hotpot'].includes(game)&&!summary.finished&&h('svg',{className:'malatang-warmth',viewBox:'0 0 360 45','aria-hidden':true},...[130,185,235].map((x,n)=>h('path',{key:n,d:`M${x} 43 q-6 -9 0 -17 q6 -9 0 -18`,fill:'none',stroke:'#A48B74',strokeWidth:2,strokeLinecap:'round',style:{'--lag':`${n*-.7}s`}}))),soupLevel>0&&h('svg',{key:soupLevel,className:'soup-add-ripple',viewBox:'0 0 360 100','aria-hidden':true},h('ellipse',{cx:180,cy:50,rx:110,ry:30,fill:'none',stroke:'#F4DCAC',strokeWidth:4}),h('path',{d:'M270 6 L235 30',stroke:'#A57C52',strokeWidth:7,strokeLinecap:'round'})),h(ServingBowl,{api},summary.finished?h('span',null,'谢谢款待'):h('div',{className:'bowl-edible-foods'},...visible.map(index=>({item:items[index],index})).map(({item,index})=>counts[index]>=item.bites?h('span',{key:item.id,className:'empty-mouthful','aria-hidden':true},h('svg',{viewBox:'0 0 46 46',width:28,height:28},h('ellipse',{cx:23,cy:32,rx:12,ry:3,fill:'#CBA675',opacity:.3}),h('circle',{cx:20,cy:29,r:2,fill:'#D7B782'}))):h('button',{key:item.id,type:'button',className:'dining-food','data-serving-index':index,'data-lifting':bite?.index===index,style:game==='malatang'?{'--serve-lag':`${Math.min(index,5)*45}ms`}:undefined,disabled:pending||blocked,onClick:event=>eat(index,event.currentTarget),'aria-label':`吃一口${item.name}（第${index+1}份）`},game==='malatang'?h('span',{className:'malatang-food-settle',key:counts[index]},h(FoodIcon,{api,id:item.food,size:46})):h(FoodIcon,{api,id:item.food,size:46}),h('b',null,item.name),h('small',null,`×${item.bites-counts[index]}`))))),
        h('p',{className:'bowl-ingredient-list'},summary.finished?'碗里都吃完啦':items.filter((item,index)=>counts[index]<item.bites).slice(0,6).map(item=>item.name).join(' · ')),
        items.filter((item,index)=>counts[index]<item.bites).length>6&&h('p',{className:'dining-hint'},'碗里先放六样，吃完会继续盛上后面的食材。'))),
    h('p',{className:'dining-response',role:'status','aria-live':'polite'},message || (summary.finished?'吃饱啦，慢慢坐一会儿。':'做得认真，也吃得开心。')),
    game==='malatang'&&!summary.finished&&h('button',{type:'button',className:'optional-soup',disabled:blocked,onClick:()=>{setSoupLevel(n=>n+1);kitchenFeedback('sip');setMessage('添一点热汤，暖暖的。');}},`加点热汤${soupLevel?' · 已添'+soupLevel+'勺':''}`),
    game==='tea'&&!summary.finished&&!poked&&h('button',{type:'button',className:'optional-straw',disabled:blocked,'aria-pressed':poked,onClick:()=>{setPoked(true);kitchenFeedback('tap');setMessage('噗！吸管戳开杯膜，咕嘟一口。');}},poked?'吸管插好啦':'戳开杯膜'),
    h(FeedbackSettings,{}),
    summary.finished&&h(MealMemento,{game,mealId,state:{...state,soupLevel},items,api}),
    createPortal(mouthfuls.map(f=>h('div',{className:`dining-mouthful mouthful-${game}`,key:f.nonce,'data-food':items[f.index].food,'aria-hidden':true,style:{left:f.x,top:f.y,'--bite-x':`${f.dx}px`,'--bite-y':`${f.dy}px`}},game==='breakfast'?h('svg',{viewBox:'0 0 64 64',className:'pancake-mouthful'},h('path',{d:'M9 45 Q2 23 20 13 Q38 5 55 26 L43 47 Q26 59 9 45Z',fill:'#EDD9AE',stroke:'#3D2B23',strokeWidth:2.4}),h('path',{d:'M16 35 L44 23 M19 43 L46 31',stroke:'#B7884C',strokeWidth:2,strokeLinecap:'round'})):h(FoodIcon,{api,id:items[f.index].food,size:46}),game!=='breakfast'&&h(Chopsticks),game==='hotpot'&&h('svg',{className:'bite-steam',viewBox:'0 0 46 46'},h('path',{d:'M14 20q-5 -7 0 -13 M28 22q-5 -7 0 -13',fill:'none',stroke:'#A48B74',strokeWidth:2,strokeLinecap:'round'})),/粉|面/.test(items[f.index].name)&&h('svg',{className:'noodle-tail',viewBox:'0 0 46 72'},h('path',{d:'M15 15q-8 22 3 32t0 20 M27 15q-8 22 3 32t0 20',fill:'none',stroke:'#D4BB8B',strokeWidth:3,strokeLinecap:'round'})),h('i',{className:'bite-crumb crumb-one'}),h('i',{className:'bite-crumb crumb-two'}))),document.body));
}
