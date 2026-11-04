import {validStoreId} from '../content-model.js';
export const CONSUMER_KEY='dazi.consumer.v1';
export const emptyConsumer=()=>({version:1,completed:{},meals:[],reviews:{},favorites:[],notes:{}});
const games=['breakfast','hotpot','tea','malatang','bbq'];
const safeId=id=>typeof id==='string'&&id.length>0&&id.length<=8192&&!['__proto__','constructor','prototype'].includes(id);
const validMeal=meal=>meal&&safeId(meal.id)&&games.includes(meal.game)&&(meal.storeId===undefined||validStoreId(meal.storeId))&&Number.isFinite(meal.at)&&typeof meal.store==='string'&&Number.isFinite(meal.amount)&&meal.amount>=0&&typeof meal.line==='string'&&plain(meal.recipe)&&Array.isArray(meal.items)&&meal.items.length<=160&&meal.items.every(i=>i&&typeof i.name==='string'&&Number.isFinite(i.qty)&&i.qty>=0);
const plain=v=>v&&typeof v==='object'&&!Array.isArray(v);
export function cleanConsumer(raw){
 const next=emptyConsumer();if(!plain(raw)||raw.version!==1)return next;
 next.favorites=[...new Set((Array.isArray(raw.favorites)?raw.favorites:[]).filter(id=>validStoreId(id)))];
 for(const [id,game]of Object.entries(plain(raw.completed)?raw.completed:{}))if(safeId(id)&&validStoreId(game))next.completed[id]=game;
 for(const meal of Array.isArray(raw.meals)?raw.meals:[])if(validMeal(meal)){next.meals.push(meal);next.completed[meal.id]=meal.storeId||meal.game;}
 for(const [id,r]of Object.entries(plain(raw.reviews)?raw.reviews:{}))if(Object.hasOwn(next.completed,id)&&plain(r)&&(r.stars===null||Number.isInteger(r.stars)&&r.stars>=1&&r.stars<=5)&&typeof r.text==='string')next.reviews[id]={stars:r.stars,text:r.text.slice(0,240)};
 for(const [id,n]of Object.entries(plain(raw.notes)?raw.notes:{}))if(Object.hasOwn(next.completed,id)&&plain(n)&&typeof n.text==='string')next.notes[id]={text:n.text.slice(0,240),strokes:cleanStrokes(n.strokes)};
 return next;
}
export function cleanStrokes(strokes){return (Array.isArray(strokes)?strokes:[]).slice(0,100).map(s=>(Array.isArray(s)?s:[]).slice(0,500).filter(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&n>=0&&n<=1))).filter(s=>s.length);}
export function completeMeal(profile,meal){if(!validMeal(meal)||Object.hasOwn(profile.completed,meal.id))return profile;return {...profile,completed:{...profile.completed,[meal.id]:meal.storeId||meal.game},meals:[meal,...profile.meals]};}
export function reviewMeal(profile,id,stars,text){if(!Object.hasOwn(profile.completed,id))return profile;if(stars!==null&&(!Number.isInteger(stars)||stars<1||stars>5))return profile;return {...profile,reviews:{...profile.reviews,[id]:{stars,text:String(text||'').trim().slice(0,240)}}};}
export function favoriteStore(profile,id){if(!validStoreId(id))return profile;return {...profile,favorites:profile.favorites.includes(id)?profile.favorites.filter(x=>x!==id):[...profile.favorites,id]};}
export function storeVisits(profile,id){return Object.values(profile.completed).filter(game=>game===id).length;}
export function regularStatus(profile,id){const visits=storeVisits(profile,id);return {visits,regular:visits>=5,side:visits>=10};}
export function lastReview(profile,id){for(const meal of profile.meals){const r=profile.reviews[meal.id];if((meal.storeId||meal.game)===id&&r?.text)return r.text;}return '';}
export function consumerStats(profile){const rated=Object.values(profile.reviews).filter(r=>r.stars!==null),foods=new Map();for(const meal of profile.meals){if(Array.isArray(meal.ingredientNames)&&meal.ingredientNames.every(n=>typeof n==='string'))for(const name of meal.ingredientNames)foods.set(name,(foods.get(name)||0)+1);else for(const item of meal.items)foods.set(item.name,(foods.get(item.name)||0)+(item.qty||1));}return {visits:Object.keys(profile.completed).length,count:rated.length,rating:rated.length?rated.reduce((n,r)=>n+r.stars,0)/rated.length:null,favoriteIngredient:[...foods].sort((a,b)=>b[1]-a[1])[0]?.[0]||null};}
