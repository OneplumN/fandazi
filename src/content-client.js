import {X as React} from '../vendor/react-runtime.js';
import {DEFAULT_STREET,validateStreetContent,priceWithFactor} from './content-model.js';
import {assetUrl} from './runtime.js';
function timeout(ms){if(globalThis.AbortSignal?.timeout)return AbortSignal.timeout(ms);if(!globalThis.AbortController)return undefined;const controller=new AbortController();setTimeout(()=>controller.abort(),ms);return controller.signal;}
let snapshot={content:DEFAULT_STREET,live:false},requested=false,flight=null,lastFetch=0,owners=0,poll;const listeners=new Set();
export const storeTerms=id=>snapshot.content.stores.find(s=>s.id===id)||{id,status:'open'};
export const effectivePrice=(amount,id)=>priceWithFactor(amount,storeTerms(id).discount||1);
export const streetSnapshot=()=>snapshot;
export async function loadStreet(){
 if(flight)return flight;if(requested)return snapshot;requested=true;lastFetch=Date.now();
 flight=(async()=>{try{const response=await fetch(assetUrl('api/street'),{headers:{Accept:'application/json'},signal:timeout(4000)});if(!response.ok)return snapshot;const raw=await response.text();if(raw.length>64000)return snapshot;const content=validateStreetContent(JSON.parse(raw));if(content){snapshot={content,live:true};listeners.forEach(f=>f());}}catch{}return snapshot;})().finally(()=>{flight=null;});return flight;
}
function refreshStreet(){if(document.hidden||Date.now()-lastFetch<30000)return;requested=false;loadStreet();}
export function useStreet(){React.useEffect(()=>{loadStreet();if(++owners===1){poll=setInterval(refreshStreet,60000);document.addEventListener('visibilitychange',refreshStreet);}return()=>{if(--owners===0){clearInterval(poll);document.removeEventListener('visibilitychange',refreshStreet);}};},[]);return React.useSyncExternalStore(f=>{listeners.add(f);return()=>listeners.delete(f);},streetSnapshot);}
export function resolveStoreId(game){const route=globalThis.location?.hash?.slice(1).split('?')[0]||'';if(route.startsWith('store/')){const id=route.slice(6),terms=storeTerms(id);if(terms.kind===game)return id;}return game;}
export const getStoreDiscount=id=>storeTerms(resolveStoreId(id)).discount||1;
export const readStreet=()=>snapshot.content;

export async function submitReview({mealId,storeId,rating,text}){
 let clientId;try{clientId=localStorage.getItem('dazi.review-client.v1');if(!clientId){clientId=crypto.randomUUID();localStorage.setItem('dazi.review-client.v1',clientId);}}catch{return {ok:false};}
 try{const response=await fetch(assetUrl('api/reviews'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({clientId,mealId,storeId,rating,text}),signal:timeout(5000)});if(!response.ok)return {ok:false};requested=false;await loadStreet();return {ok:true};}catch{return {ok:false};}
}
