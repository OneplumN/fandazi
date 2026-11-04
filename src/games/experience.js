import {suppressKitchenTouch} from './touch-policy.js';
import {X as React} from '../../vendor/react-runtime.js';
const h=React.createElement, KEY='dazi.experience.v1', listeners=new Set();
const defaults={sound:false,haptics:false,motion:true};
let preferences={...defaults}, audio;
try {const saved=JSON.parse(localStorage.getItem(KEY));for(const k of Object.keys(defaults))if(typeof saved?.[k]==='boolean')preferences[k]=saved[k];} catch {}
const update=()=>{document.body.dataset.kitchenMotion=preferences.motion?'on':'off';listeners.forEach(f=>f());};
update();
export function kitchenFeedback(kind='tap') {
  if(document.hidden) return;
  if(preferences.haptics) {try{navigator.vibrate?.(kind==='eat'?12:7);}catch{}}
  if(!preferences.sound) return;
  try {
    const Audio=window.AudioContext || window.webkitAudioContext;if(!Audio)return;
    audio ||= new Audio(); if(audio.state==='suspended')audio.resume().catch(()=>{});
    const oscillator=audio.createOscillator(), gain=audio.createGain(), start=audio.currentTime;
    const frequency={eat:420,sip:660,flip:220,sprinkle:900,take:510,shake:340,fold:280,tap:560}[kind] || 560;
    oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,start);oscillator.frequency.exponentialRampToValueAtTime(frequency*.65,start+.09);
    gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.035,start+.012);gain.gain.exponentialRampToValueAtTime(.0001,start+.11);
    oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(start);oscillator.stop(start+.12);
    oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
  } catch {} // Feedback is optional; unsupported devices keep the same interactions.
}
export function FeedbackSettings() {
  const settings=React.useSyncExternalStore(cb=>{listeners.add(cb);return()=>listeners.delete(cb);},()=>preferences);
  return h('details',{className:'experience-settings'},h('summary',null,'声音与动效'),
    h('div',null,...[['sound','轻声音效'],['motion','互动动效'],...(typeof navigator.vibrate==='function'?[['haptics','轻触反馈']]:[])].map(([key,label])=>h('label',{key},h('input',{type:'checkbox',checked:settings[key],onChange:e=>{
      preferences={...preferences,[key]:e.target.checked};try{localStorage.setItem(KEY,JSON.stringify(preferences));}catch{}update();if(key==='sound'&&preferences.sound)kitchenFeedback('tap');
    }}),label)),h('small',null,'默认静音；系统减少动态效果设置也会生效。')));
}
window.addEventListener('storage',event=>{if(event.key!==KEY&&event.key!==null)return;try{const saved=event.newValue?JSON.parse(event.newValue):defaults;preferences={...defaults};for(const key of Object.keys(defaults))if(typeof saved[key]==='boolean')preferences[key]=saved[key];update();}catch{}});
document.body.dataset.kitchenHidden=String(document.hidden);
document.addEventListener('visibilitychange',()=>{document.body.dataset.kitchenHidden=String(document.hidden);if(document.hidden)audio?.suspend().catch(()=>{});});

export function canAnimateMeal(){return !document.hidden && document.body.dataset.kitchenMotion!=='off' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;}
export function Chopsticks(){return h('svg',{className:'meal-chopsticks',viewBox:'0 0 64 64','aria-hidden':true},h('path',{d:'M37 35 L54 2 M43 39 L61 6',fill:'none',stroke:'#3D2B23',strokeWidth:5,strokeLinecap:'round'}),h('path',{d:'M37 35 L54 2 M43 39 L61 6',fill:'none',stroke:'#C29C6A',strokeWidth:2.7,strokeLinecap:'round'}));}

// One policy for touch interaction across the five shops; it never delays a valid first tap.
let touchGesture=null,lastTouchActivation=null;
const kitchenControl=target=>{
  const control=target instanceof Element?target.closest('button,a,summary'):null;
  return control?.closest('.app,.game-shell,.checkout-overlay,.malatang-game-nav')?control:null;
};
document.addEventListener('pointerdown',event=>{
  if(!event.isPrimary)return;
  touchGesture={id:event.pointerId,type:event.pointerType,node:kitchenControl(event.target),x:event.clientX,y:event.clientY,moved:false,cancelled:false,at:performance.now()};
},true);
document.addEventListener('pointermove',event=>{
  if(touchGesture?.id===event.pointerId&&Math.hypot(event.clientX-touchGesture.x,event.clientY-touchGesture.y)>14)touchGesture.moved=true;
},{capture:true,passive:true});
document.addEventListener('pointercancel',event=>{if(touchGesture?.id===event.pointerId)touchGesture.cancelled=true;},true);
document.addEventListener('click',event=>{
  const control=kitchenControl(event.target),now=performance.now();if(!control||event.detail===0)return;
  const touch=event.pointerType==='touch'||(touchGesture?.type==='touch'&&now-touchGesture.at<1500);
  if(suppressKitchenTouch({touch,moved:touchGesture?.moved,cancelled:touchGesture?.cancelled,changedTarget:touchGesture?.node!==control,previous:lastTouchActivation,now,x:event.clientX,y:event.clientY})){
    event.preventDefault();event.stopImmediatePropagation();return;
  }
  if(touch)lastTouchActivation={at:now,x:event.clientX,y:event.clientY};
},true);

export function useDockClearance(ref,rootSelector){
  React.useLayoutEffect(()=>{
    const dock=ref.current,root=dock?.closest(rootSelector);if(!dock||!root)return;
    const update=()=>{const height=dock.getBoundingClientRect().height;root.style.setProperty('--dock-clearance',`${height?Math.ceil(height)+28:0}px`);};
    update();const observer=window.ResizeObserver?new ResizeObserver(update):null;observer?.observe(dock);window.addEventListener('resize',update);
    return()=>{observer?.disconnect();window.removeEventListener('resize',update);root.style.removeProperty('--dock-clearance');};
  },[]);
}
