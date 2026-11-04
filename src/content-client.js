import {X as React} from '../vendor/react-runtime.js';
import {DEFAULT_STREET,validateStreetContent,priceWithFactor} from './content-model.js';
import {assetUrl} from './runtime.js';
let snapshot={content:DEFAULT_STREET,live:false},requested=false;const listeners=new Set();
export const storeTerms=id=>snapshot.content.stores.find(s=>s.id===id)||{id,status:'open'};
export const effectivePrice=(amount,id)=>priceWithFactor(amount,storeTerms(id).discount||1);
export const streetSnapshot=()=>snapshot;
export async function loadStreet(){if(requested)return snapshot;requested=true;try{const response=await fetch(assetUrl('api/street'),{headers:{Accept:'application/json'},signal:AbortSignal.timeout(4000)});if(!response.ok)return snapshot;const raw=await response.text();if(raw.length>64000)return snapshot;const content=validateStreetContent(JSON.parse(raw));if(content){snapshot={content,live:true};listeners.forEach(f=>f());}}catch{}return snapshot;}
export function useStreet(){React.useEffect(()=>{loadStreet();},[]);return React.useSyncExternalStore(f=>{listeners.add(f);return()=>listeners.delete(f);},streetSnapshot);}
export const getStoreDiscount=id=>storeTerms(id).discount||1;
export const readStreet=()=>snapshot.content;
