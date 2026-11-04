import {X as React} from '../../vendor/react-runtime.js';
import {CONSUMER_KEY,emptyConsumer,cleanConsumer,completeMeal,reviewMeal,favoriteStore,cleanStrokes} from './consumer-model.js';
let profile=emptyConsumer(),persistent=true;const listeners=new Set();
try{profile=cleanConsumer(JSON.parse(localStorage.getItem(CONSUMER_KEY)));}catch{persistent=false;}
let snapshot={profile,persistent};
function publish(next){profile=next;try{localStorage.setItem(CONSUMER_KEY,JSON.stringify(profile));}catch{persistent=false;}snapshot={profile,persistent};listeners.forEach(f=>f());}
function sync(){if(!persistent)return;try{const raw=localStorage.getItem(CONSUMER_KEY);profile=raw?cleanConsumer(JSON.parse(raw)):emptyConsumer();}catch{}}
function mutate(fn){const run=()=>{sync();publish(fn(profile));};if(globalThis.navigator?.locks?.request)return navigator.locks.request('dazi-consumer-write',run);run();return Promise.resolve();}
export const useConsumer=()=>React.useSyncExternalStore(f=>{listeners.add(f);return()=>listeners.delete(f);},()=>snapshot);
export const readConsumer=()=>profile;
export const recordCompletedMeal=meal=>mutate(p=>completeMeal(p,meal));
export const saveReview=(id,stars,text)=>mutate(p=>reviewMeal(p,id,stars,text));
export const toggleFavorite=id=>mutate(p=>favoriteStore(p,id));
export const saveMealNote=(id,text,strokes)=>mutate(p=>Object.hasOwn(p.completed,id)?{...p,notes:{...p.notes,[id]:{text:String(text).slice(0,240),strokes:cleanStrokes(strokes)}}}:p);
window.addEventListener('storage',e=>{if(!persistent)return;if(e.key===CONSUMER_KEY||e.key===null){try{profile=cleanConsumer(JSON.parse(localStorage.getItem(CONSUMER_KEY)));}catch{profile=emptyConsumer();}snapshot={profile,persistent};listeners.forEach(f=>f());}});
