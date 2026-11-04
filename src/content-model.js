export const STORE_IDS=['breakfast','hotpot','tea','malatang','bbq'];
export const validStoreId=id=>typeof id==='string'&&/^[a-z][a-z0-9-]{0,39}$/.test(id);
export const DEFAULT_STREET={version:1,stores:STORE_IDS.map(id=>({id,status:'open'})),messages:[]};
const text=(v,n)=>typeof v==='string'&&v.trim().length>0&&v.length<=n;
export function validateStreetContent(raw){
 if(!raw||raw.version!==1||!Array.isArray(raw.stores)||raw.stores.length>30||!Array.isArray(raw.messages)||raw.messages.length>30)return null;
 const stores=[],seen=new Set();
 for(const s of raw.stores){if(!s||!validStoreId(s.id)||seen.has(s.id)||!['open','closed'].includes(s.status))return null;if((STORE_IDS.includes(s.id)&&s.kind!==undefined&&s.kind!==s.id)||(s.kind!==undefined&&!STORE_IDS.includes(s.kind))||(!STORE_IDS.includes(s.id)&&!s.kind))return null;seen.add(s.id);const out={id:s.id,status:s.status,...(s.kind?{kind:s.kind}:{})};for(const k of ['name','tag','seasonal'])if(s[k]!==undefined){if(!text(s[k],k==='seasonal'?120:40))return null;out[k]=s[k];}if(s.discount!==undefined){if(!Number.isFinite(s.discount)||s.discount<=0||s.discount>1)return null;out.discount=s.discount;}stores.push(out);}
 const messages=[],ids=new Set();for(const m of raw.messages){if(!m||!text(m.id,80)||ids.has(m.id)||!text(m.text,240)||(m.storeId!==undefined&&!validStoreId(m.storeId)))return null;ids.add(m.id);messages.push({id:m.id,text:m.text,...(m.storeId?{storeId:m.storeId}:{})});}
 const result={version:1,stores,messages};if(raw.aggregates!==undefined){if(!raw.aggregates||typeof raw.aggregates!=='object'||Array.isArray(raw.aggregates))return null;result.aggregates={};for(const [id,a]of Object.entries(raw.aggregates)){if(!validStoreId(id)||!a||!Number.isInteger(a.count)||a.count<1||!Number.isFinite(a.rating)||a.rating<1||a.rating>5)return null;result.aggregates[id]={count:a.count,rating:a.rating};}}
 return result;
}
export function priceWithFactor(amount,factor=1){if(!Number.isFinite(factor)||factor<=0||factor>1)throw new TypeError('Invalid factor');if(!Number.isFinite(amount)||amount<0)throw new TypeError('Invalid amount');return amount===0?0:Math.max(1,Math.ceil(amount*factor));}
export const discountedCoins=priceWithFactor;
