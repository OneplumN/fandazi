export const DEFAULT_RATE=25.8;
// Stored prices are local estimates in yuan per 500g; reject corrupt drafts on reload.
export function normalizePricing(raw,defaults){
 const rate=(value,fallback)=>Number.isFinite(value)&&value>=1&&value<=200?Math.round(value*10)/10:fallback;
 return {shopName:typeof raw?.shopName==='string'&&raw.shopName.trim()?raw.shopName.trim().slice(0,20):defaults.shopName,
 pricePerJin:rate(raw?.pricePerJin,defaults.pricePerJin),
 budgetDefault:Number.isInteger(raw?.budgetDefault)&&raw.budgetDefault>=5&&raw.budgetDefault<=200?raw.budgetDefault:defaults.budgetDefault,
 separatePricing:typeof raw?.separatePricing==='boolean'?raw.separatePricing:defaults.separatePricing,
 priceGroups:Object.fromEntries(Object.entries(defaults.priceGroups).map(([key,value])=>[key,rate(raw?.priceGroups?.[key],value)]))};
}
