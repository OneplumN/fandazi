// Enjoying an already paid meal never changes coins or membership.
export function mealItems(game, state, menu = []) {
  if (game === 'tea') return [{id:'cup',name:'特调奶茶',bites:5}];
  if (game === 'breakfast') return [{id:'pancake',name:state.base || '早餐饼',bites:4}];
  const foods = game === 'bbq' ? state.items : game === 'hotpot' ? state.served : state.entries;
  return (foods || []).map((f,index)=>({id:`${f.id}:${index}`, food:f.food || f.id,
    season:f.season,
    doneness:game === "bbq" && f.sides ? Math.max(...f.sides)/f.cook : undefined,
    name:f.name || menu.find(m=>m.id===f.id)?.name || '食材',
    bites:game==='bbq'?3:Math.max(1,Math.min(9,Math.floor(f.qty || 1)))}));
}
export function initialDining(items) { return items.map(()=>0); }
export function validDining(counts,items) {
  return Array.isArray(counts) && counts.length===items.length && counts.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=items[i].bites);
}
export function takeBite(counts,items,index) {
  if(!Number.isInteger(index) || index<0 || index>=items.length || counts[index]>=items[index].bites) return counts;
  return counts.map((n,i)=>i===index?n+1:n);
}
export function diningSummary(counts,items) {
  const total=items.reduce((n,f)=>n+f.bites,0), eaten=counts.reduce((n,v)=>n+v,0);
  return {total,eaten,remaining:Math.max(0,total-eaten),finished:total>0&&eaten>=total};
}
