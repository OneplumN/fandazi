import {X as React,createPortal} from '../../vendor/react-runtime.js';
import {ServingBowl} from './dining.js';
import {canAnimateMeal,Chopsticks} from './experience.js';
const h=React.createElement;
export function PickBowl({entries,byId,api,pickSource}){
 const ref=React.useRef(null),previous=React.useRef(entries),serial=React.useRef(0),timers=React.useRef(new Set());
 const [flights,setFlights]=React.useState([]),[arrival,setArrival]=React.useState(null);
 React.useEffect(()=>()=>{for(const timer of timers.current)clearTimeout(timer);},[]);
 const later=(fn,ms)=>{const timer=setTimeout(()=>{timers.current.delete(timer);fn();},ms);timers.current.add(timer);};
 React.useEffect(()=>{
  const old=new Map(previous.current.map(e=>[e.id,e.qty]));previous.current=entries;
  const entry=entries.find(e=>e.qty>(old.get(e.id)||0));
  if(!entry||!canAnimateMeal())return;
  const food=byId.get(entry.id),target=ref.current?.getBoundingClientRect();if(!food||!target)return;
  const source=pickSource?.current,nonce=++serial.current;
  // Details and quick combinations still get a small bowl settlement; only shelf taps travel across the page.
  if(!source||source.id!==entry.id||performance.now()-source.at>700||document.querySelector('.checkout-overlay')){setArrival({nonce,id:entry.id});return;}
  const x=source.x,y=source.y,dx=target.x+target.width*.5-x,dy=target.y+target.height*.28-y;
  setFlights(list=>[...list.slice(-3),{nonce,food,x,y,dx,dy}]);
  later(()=>setArrival({nonce,id:entry.id}),420);
  later(()=>setFlights(list=>list.filter(f=>f.nonce!==nonce)),620);
 },[entries]);
 React.useEffect(()=>{const clear=()=>{if(document.hidden){setFlights([]);setArrival(null);}};document.addEventListener('visibilitychange',clear);return()=>document.removeEventListener('visibilitychange',clear);},[]);
 return h(React.Fragment,null,
 h('div',{className:'selection-bowl',ref,'aria-hidden':true},h(ServingBowl,{api},h('div',{className:'selection-bowl-foods'},...entries.slice(-3).map(entry=>{const food=byId.get(entry.id);return food&&h('span',{key:entry.id===arrival?.id?arrival.nonce:entry.id,className:entry.id===arrival?.id?'selection-food-arrives':''},h(api.Icon,{...food,size:20}));})))),
 createPortal(flights.map(f=>h('div',{className:'picked-food-flight',key:f.nonce,'data-food':f.food.id,'aria-hidden':true,style:{left:f.x,top:f.y,'--fly-x':`${f.dx}px`,'--fly-y':`${f.dy}px`,'--arc-x':`${f.dx*.55}px`,'--arc-y':`${f.dy*.4-30}px`}},h(api.Icon,{...f.food,size:46}),h(Chopsticks))),document.body));
}
