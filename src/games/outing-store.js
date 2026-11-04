import {X as React} from '../../vendor/react-runtime.js';
import {recordCompletedMeal} from './consumer-store.js';
import {buddyById} from './outing-model.js';
export const OUTING_KEY='dazi.outing.v1';
const defaults={version:1,buddyId:'wan',budget:20,taste:'any',lastMeal:null};
let value={...defaults},persistent=true;const listeners=new Set();
function validMeal(m){return m&&typeof m.id==='string'&&['malatang','bbq','tea','hotpot','breakfast'].includes(m.game)&&typeof m.store==='string'&&Number.isFinite(m.amount)&&m.amount>=0&&Number.isFinite(m.at)&&m.recipe&&typeof m.recipe==='object'&&typeof m.line==='string'&&Array.isArray(m.items)&&m.items.every(f=>f&&(f.food===undefined||typeof f.food==='string')&&typeof f.name==='string'&&Number.isFinite(f.qty));}
function clean(raw){return {...defaults,buddyId:buddyById(raw?.buddyId).id,budget:[10,20,30].includes(raw?.budget)?raw.budget:20,taste:['any','light','spicy','drink'].includes(raw?.taste)?raw.taste:'any',lastMeal:validMeal(raw?.lastMeal)?raw.lastMeal:null};}
try{value=clean(JSON.parse(localStorage.getItem(OUTING_KEY)));}catch{persistent=false;}
let snapshot={profile:value,persistent};
function update(next){value=next;try{localStorage.setItem(OUTING_KEY,JSON.stringify(value));}catch{persistent=false;}snapshot={profile:value,persistent};listeners.forEach(f=>f());}
window.addEventListener('storage',e=>{if(e.key!==OUTING_KEY&&e.key!==null)return;try{value=clean(e.newValue?JSON.parse(e.newValue):null);snapshot={profile:value,persistent};listeners.forEach(f=>f());}catch{}});
export const readOuting=()=>value;
export const useOuting=()=>React.useSyncExternalStore(fn=>{listeners.add(fn);return()=>listeners.delete(fn);},()=>snapshot);
export const chooseOuting=fields=>update({...value,...clean({...value,...fields}),lastMeal:value.lastMeal});
let pendingPlan=null;
export const prepareOuting=plan=>{pendingPlan={...plan,token:crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`,at:Date.now()};};
export const peekOuting=game=>pendingPlan?.game===game&&Date.now()-pendingPlan.at<30*60*1000?pendingPlan:null;
export const consumeOuting=token=>{if(pendingPlan?.token===token)pendingPlan=null;};
export function rememberMeal(meal){recordCompletedMeal(meal);if(value.lastMeal?.id===meal.id)return;update({...value,lastMeal:meal});}
export function replaceOuting(raw){update(clean(raw));}
