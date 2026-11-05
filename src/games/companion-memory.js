// Memories come only from completed meals with this companion, on this browser.
export function companionMemory(profile,buddyId,{excludeMealId}={}) {
 const meals=(profile?.meals||[]).filter(m=>m&&m.buddyId===buddyId&&m.id!==excludeMealId).slice(0,12),foods=new Map();
 for(const meal of meals){const seen=new Set();for(const item of meal.items||[]){if(!item.food||typeof item.name!=='string'||seen.has(item.food))continue;seen.add(item.food);const saved=foods.get(item.food)||{id:item.food,name:item.name.slice(0,24),visits:0};saved.visits++;foods.set(item.food,saved);}}
 const favorites=[...foods.values()].sort((a,b)=>b.visits-a.visits),lastByGame={};for(const meal of meals)if(!lastByGame[meal.game])lastByGame[meal.game]=meal;
 return {count:meals.length,last:meals[0]||null,lastByGame,foods:favorites};
}
export function memoryLine(memory,{game,stage='start',state={},items=[]}={}) {
 const previous=memory?.lastByGame?.[game];
 if(!previous)return stage==='start'&&memory?.last?`上回一起去了${memory.last.store}，今天换个味道，我还陪你。`:'';
 const recipe=previous.recipe||{};
 if(stage==='end'){
  if(game==='tea'&&Number.isFinite(recipe.sugar)&&Number.isFinite(state.sugar)&&recipe.sugar!==state.sugar)return `上回是${recipe.sugar}%糖，这次${state.sugar<recipe.sugar?'淡一点':'甜一点'}，你的新口味我记下啦。`;
  const known=memory.foods.find(f=>f.visits>=2&&items.some(i=>i.food===f.id));
  return known?`又见到你喜欢的${known.name}啦，和你吃了几次，这一口我记住了。`:'';
 }
 if(game==='tea'&&Number.isFinite(recipe.sugar))return `记得上回那杯${recipe.sugar}%糖。今天照旧也好，换个味道我也陪你。`;
 const favorite=memory.foods.find(f=>f.visits>=2&&previous.items?.some(i=>i.food===f.id));
 if(favorite)return `这几次总见你夹${favorite.name}，今天也给喜欢的那口留个位置吧。`;
 const name=previous.items?.find(i=>i.name)?.name;
 return name?`上回一起吃了${String(name).slice(0,24)}，今天想怎么搭都行。`:'';
}
export function buddyBiteIndex(items,counts,visible,memory){
 const choices=visible.filter(i=>counts[i]<items[i].bites);
 return choices.find(i=>memory?.foods?.some(f=>f.id===items[i].food))??choices[0]??-1;
}
export function servingPage(items,counts,limit=6){
 const first=items.findIndex((f,i)=>counts[i]<f.bites);if(first<0)return [];
 const start=Math.floor(first/limit)*limit;
 return items.slice(start,start+limit).map((_,i)=>start+i);
}
export function biteReply(game,item,{actor='you',finished=false,sip=0,hasToppings=true,hasIce=true}={}){
 if(finished)return actor==='buddy'?'最后这口我收下啦，碰个杯，谢谢你陪我吃。':'吃好啦，和你慢慢吃一顿真舒服。';
 if(actor==='buddy')return item?.name?`这口${item.name}分我啦，你慢慢吃，下一口等你。`:'这一口分我啦，下一口等你。';
 if(game==='tea')return sip%2?(hasToppings?'咕嘟，小料也跟上来啦。':'咕嘟，这一口慢慢喝。'):(hasIce?'冰块轻轻碰了一下杯壁。':'杯子轻轻放回桌上。');
 if(game==='bbq')return '竹签上又空出一点，烤香还留着。';
 if(game==='breakfast')return '咔嚓，饼边掉了两粒小碎屑。';
 if(game==='hotpot')return '先吹一吹，这一口还热乎。';
 return /粉|面/.test(item?.name||'')?'嗦——最后一小截也跟上来啦。':'夹起这一口，碗里的汤轻轻晃了一下。';
}
