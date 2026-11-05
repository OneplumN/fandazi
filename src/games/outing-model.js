import {memoryLine} from './companion-memory.js';
import {discountedCoins,validateSeasonalIds} from '../content-model.js';
import {GRILL_MENU,POT_MENU,FILLINGS,teaPrice,heatState,TOPPINGS as SEASONAL_TOPPINGS,TEAS} from './rules.js';
export const COMPANIONS=[
 {id:'wan',name:'丸丸',tag:'随性搭子',intro:'好吃比纠结重要，今天我陪你随便搭。',color:'#C77850'},
 {id:'lin',name:'小林',tag:'清爽搭子',intro:'想吃得清爽一点？我帮你留意口味。',color:'#78965F'},
 {id:'wang',name:'老王',tag:'干饭搭子',intro:'踏踏实实吃一顿，其他事等吃完再说。',color:'#A57C52'},
];
export const STORE_NAMES={malatang:'麻辣搭子',bbq:'烧烤搭子',tea:'奶茶实验室',hotpot:'火锅搭子',breakfast:'早餐小摊'};
export const buddyById=id=>COMPANIONS.find(b=>b.id===id)||COMPANIONS[0];
export function malatangCost(entries,menu,settings){
 const total=entries.reduce((sum,e)=>{const f=menu.find(f=>f.id===e.id&&f.enabled!==false);if(!f)return sum;const rate=settings.separatePricing?settings.priceGroups?.[f.priceGroup]:settings.pricePerJin;return sum+f.unitWeightG*e.qty/500*(Number.isFinite(rate)&&rate>=0?rate:19.8);},0);
 return entries.length?Math.max(1,Math.ceil(total)):0;
}
export function makeMealPlan({buddyId='wan',budget=20,taste='any',balance=100,round=0,menu=[],settings={pricePerJin:19.8},discounts={},closed=[],favorites=[],storeOptions=[],memory=null}){
 const targets={};for(const kind of ['breakfast','hotpot','tea','malatang','bbq']){const variants=storeOptions.filter(s=>(s.kind||s.id)===kind&&s.status!=='closed');targets[kind]=variants.find(s=>favorites.includes(s.id))?.id||(!closed.includes(kind)?kind:variants[0]?.id)||null;}
 const factor=id=>discounts[targets[id]||id]||1,price=(n,id)=>discountedCoins(n,factor(id));
 settings={...settings,pricePerJin:(settings.pricePerJin??19.8)*factor('malatang'),priceGroups:Object.fromEntries(Object.entries(settings.priceGroups||{}).map(([k,v])=>[k,v*factor('malatang')]))};
 const buddy=buddyById(buddyId),limit=Math.max(0,Math.min(Number.isFinite(budget)?budget:20,Number.isFinite(balance)?balance:0));
 const wantsSpicy=taste==='spicy',ids=buddy.id==='lin'?['spinach','xianggu','dongdoufu','oupian','fensi']:buddy.id==='wang'?['feiniujuan','niurouwan','spinach','fensi','dongdoufu']:['spinach','xianggu','niurouwan','fensi','dongdoufu'];
 const rememberedIds=taste==='any'?(memory?.foods||[]).map(f=>f.id):[];
 const bowlIds=[...new Set([...rememberedIds,...ids])].filter(id=>menu.some(f=>f.id===id&&f.enabled!==false)).slice(0,5);
 let entries=bowlIds.filter(id=>menu.some(f=>f.id===id&&f.enabled!==false)).map(id=>({id,qty:1}));
 while(entries.length&&malatangCost(entries,menu,settings)>limit)entries.pop();
 const bbqIds=buddy.id==='lin'?['mushroom','tofu','broccoli']:buddy.id==='wang'?['lamb','chicken','corn']:['lamb','sausage','mushroom'];
 let skewers=bbqIds.slice();while(skewers.length&&price(skewers.reduce((n,id)=>n+GRILL_MENU.find(f=>f.id===id).price,0),'bbq')>limit)skewers.pop();
 let potIds=buddy.id==='lin'?['spinach','xianggu','dongdoufu','helandou']:buddy.id==='wang'?['feiniujuan','kuanfen','dongdoufu']:['xiahua','oupian','spinach'];
 while(potIds.length&&price(potIds.reduce((n,id)=>n+POT_MENU.find(f=>f.id===id).price,0),'hotpot')>limit)potIds.pop();
 const tea={tea:buddy.id==='lin'?'jasmine':buddy.id==='wang'?'cocoa':'black',milk:buddy.id==='lin'?'无奶':'鲜奶',sugar:buddy.id==='lin'||taste==='light'?25:50,ice:'少冰',size:500,toppings:buddy.id==='lin'?['coconut']:['pearl']};
 const previousTea=memory?.lastByGame?.tea?.recipe;
 if(previousTea&&['any','drink'].includes(taste)){
  if(TEAS.some(t=>t.id===previousTea.tea))tea.tea=previousTea.tea;
  if(['无奶','鲜奶','燕麦奶','奶盖'].includes(previousTea.milk))tea.milk=previousTea.milk;
  if([0,25,50,75,100].includes(previousTea.sugar))tea.sugar=previousTea.sugar;
  if(['无冰','少冰','正常冰'].includes(previousTea.ice))tea.ice=previousTea.ice;
  if([500,700].includes(previousTea.size))tea.size=previousTea.size;
  if(Array.isArray(previousTea.toppings))tea.toppings=[...new Set(previousTea.toppings)].filter(id=>SEASONAL_TOPPINGS.some(t=>t.id===id)).slice(0,3);
 }
 if(price(teaPrice(tea),'tea')>limit)tea.toppings=[];if(price(teaPrice(tea),'tea')>limit)tea.milk='无奶';
 const fillings=buddy.id==='lin'?['lettuce','huanggua']:buddy.id==='wang'?['huotuichang','youtiao']:['lettuce','peigen'];
 const candidates=[
  entries.length&&{game:'malatang',title:wantsSpicy?'热辣一盆':'随心热乎一盆',cost:malatangCost(entries,menu,settings),recipe:{entries,spice:wantsSpicy?'中辣':'不辣'},foods:entries.map(e=>menu.find(f=>f.id===e.id))},
  skewers.length&&{game:'bbq',title:wantsSpicy?'辣香小烤盘':'香香小烤盘',cost:price(skewers.reduce((n,id)=>n+GRILL_MENU.find(f=>f.id===id).price,0),'bbq'),recipe:{ids:skewers,season:wantsSpicy?'辣椒':buddy.id==='lin'?'蜜汁':'孜然'},foods:skewers.map(id=>GRILL_MENU.find(f=>f.id===id))},
  price(teaPrice(tea),'tea')<=limit&&{game:'tea',title:previousTea&&['any','drink'].includes(taste)?'记得的那杯茶':buddy.id==='lin'?'清爽茉莉小料茶':'今天的珍珠奶茶',cost:price(teaPrice(tea),'tea'),recipe:tea,foods:[]},
  potIds.length&&{game:'hotpot',title:wantsSpicy?'一锅热辣':'清汤慢慢涮',cost:price(potIds.reduce((n,id)=>n+POT_MENU.find(f=>f.id===id).price,0),'hotpot'),recipe:{ids:potIds,broth:wantsSpicy?'麻辣红汤':'三鲜清汤'},foods:potIds.map(id=>POT_MENU.find(f=>f.id===id))},
  limit>=price(10,'breakfast')&&{game:'breakfast',title:'加蛋配菜煎饼',cost:price(10,'breakfast'),recipe:{base:'煎饼',egg:true,fillings,sauce:wantsSpicy?'辣酱':'甜面酱'},foods:fillings.map(id=>FILLINGS.find(f=>f.id===id))},
 ].filter(Boolean).filter(p=>targets[p.game]).filter(p=>taste==='drink'?p.game==='tea':taste==='spicy'?p.game!=='tea':true);
 if(!candidates.length)return null;
 candidates.sort((a,b)=>Number(favorites.includes(targets[b.game]))-Number(favorites.includes(targets[a.game])));
 const offset=favorites.some(id=>candidates.some(p=>targets[p.game]===id))?0:buddy.id==='lin'?2:buddy.id==='wang'?1:0,plan=candidates[(Math.max(0,Math.floor(round))+offset)%candidates.length];
 return {...plan,storeId:targets[plan.game],buddyId:buddy.id,budget,taste,storeName:storeOptions.find(s=>s.id===targets[plan.game])?.name||STORE_NAMES[plan.game],foods:plan.foods.map(f=>({id:f.food||f.id,name:f.name})),reason:(taste==='light'?'你说想清爽一点，这份先不加辣。':wantsSpicy?'今天想吃辣，就挑这份热闹的。':memoryLine(memory,{game:plan.game,stage:'recommend'}))||(favorites.includes(targets[plan.game])?'你收藏的这家我还记得，今天一起再去尝尝？':taste==='drink'?'想喝点甜的，先来一杯。':taste==='light'?'你说想清爽一点，这份先不加辣。':wantsSpicy?'今天想吃辣，就挑这份热闹的。':buddy.id==='wang'?'有主角也有配菜，踏实吃一顿。':buddy.id==='lin'?'给自己留点清爽的选择。':'别纠结啦，这顿先从这里开始。')};
}
export function seedMeal(game,base,plan,buddyId){
 const state={...base,companionId:buddyById(buddyId).id};
 if(!plan||plan.game!==game)return state;
 const recipe=plan.recipe;state.outingPlan=plan;
 if(game==='bbq')state.selected=recipe.ids.map((id,key)=>({...GRILL_MENU.find(f=>f.id===id),key})),state.serial=recipe.ids.length,state.season=recipe.season,state.budget=plan.budget;
 if(game==='tea')Object.assign(state,recipe);
 if(game==='hotpot')state.broth=recipe.broth,state.budget=plan.budget;
 if(game==='breakfast')Object.assign(state,recipe,{fillings:recipe.fillings.filter(id=>FILLINGS.some(f=>f.id===id)).slice(0,3)});
 return state;
}
export function companionLine(id,{game,stage='start',items=[],state={}}={}){
 const b=buddyById(id),count=items.reduce((n,f)=>n+(f.bites||f.qty||1),0),names=items.map(f=>f.name||'').join(' '),greens=/菠菜|生菜|菌|菇|豆|黄瓜|藕|荷兰豆/.test(names);
 if(stage==='start')return b.id==='lin'?'先按自己喜欢的搭，我陪你吃得清爽一点。':b.id==='wang'?'别着急，先把想吃的摆上，咱们踏实吃一顿。':'今天没有标准答案，想加什么就加什么。';
 if(game==='bbq'&&state.items?.length){
  const food=state.items.find(f=>f.sides?.some(t=>['overdone','burned'].includes(heatState(t,f.cook))));
  if(food)return b.id==='wang'?`${food.name}有点老啦，慢慢嚼；下回我陪你早一点夹出来。`:`${food.name}的颜色深了，我替这口火候皱皱眉，下回咱们早一点翻。`;
  const plain=state.items.filter(f=>!f.season);
  if(plain.length)return `${plain.slice(0,2).map(f=>f.name).join('、')}还没撒料，原味也有自己的香。`;
 }
 if(game==='tea'&&Number.isFinite(state.mix)&&state.mix<.6&&state.milk==='无奶')return state.toppings?.length?'小料还在杯底，前几口先尝尝清爽茶香。':'这杯纯茶清清爽爽，慢慢喝就好。';
 if(game==='tea'&&Number.isFinite(state.mix)&&state.mix<.6)return b.id==='lin'?'奶和茶还分着层，下一口换个滋味；喜欢的话再轻轻摇一摇。':'这杯还留着分层，小料沉在杯底，最后几口也有惊喜。';
 if(game==='tea')return b.id==='lin'?(state.sugar>=75?'这杯甜得很认真，下次陪我试试半糖？':'清清爽爽的一杯，正好陪你歇一会儿。'):b.id==='wang'?'咕嘟几口，今天这点小疲惫也喝下去。':(state.toppings?.length>=2?'小料挤在一起，像我们凑热闹。':'这杯我喜欢，和你一起喝就更有味道。');
 if(b.id==='lin')return greens?'青菜和配菜都没落下，这一顿挺清爽。':'你挑喜欢的，我负责陪你慢慢吃。';
 if(b.id==='wang')return count<=2?'先垫一口，待会儿想加再加，不着急。':'这一顿吃得踏实，其他事等吃完再说。';
 return game==='breakfast'?'有热乎的饼陪着，今天就算开了个好头。':count>=5?'这一盆挺热闹，和你一起吃就刚刚好。':'不必搭得多漂亮，喜欢这一口就够啦。';
}

// Limited-time combinations use the same native recipes, capacities and checkout prices.
export function seasonalPlan({store,buddyId='wan',menu=[],settings={pricePerJin:19.8},budget=20,balance=100}){
 const game=store?.kind||store?.id,limit=Math.max(0,Math.min(budget,balance));
 if(!store||store.status==='closed'||!Number.isFinite(limit)||!validateSeasonalIds(game,store.seasonalItems)||!store.seasonalItems.length)return null;
 const factor=store.discount??1;if(!Number.isFinite(factor)||factor<=0||factor>1)return null;
 const caps={tea:3,breakfast:3,bbq:6,hotpot:6,malatang:8};let ids=store.seasonalItems.slice(0,caps[game]);
 if(game==='malatang'&&ids.some(id=>!menu.some(f=>f.id===id&&f.enabled!==false)))return null;
 const rates={...settings,pricePerJin:(settings.pricePerJin??19.8)*factor,priceGroups:Object.fromEntries(Object.entries(settings.priceGroups||{}).map(([id,n])=>[id,n*factor]))};
 const build=()=>{
  if(game==='tea'){const recipe={tea:'black',milk:'鲜奶',sugar:50,ice:'少冰',size:500,toppings:[...ids]};return {recipe,cost:discountedCoins(teaPrice(recipe),factor),foods:ids.map(id=>({id,name:SEASONAL_TOPPINGS.find(f=>f.id===id).name}))};}
  if(game==='breakfast')return {recipe:{base:'煎饼',egg:true,fillings:[...ids],sauce:'甜面酱'},cost:discountedCoins(10,factor),foods:ids.map(id=>FILLINGS.find(f=>f.id===id))};
  if(game==='bbq'||game==='hotpot'){const native=game==='bbq'?GRILL_MENU:POT_MENU,foods=ids.map(id=>native.find(f=>f.id===id));return {recipe:{ids:[...ids],...(game==='bbq'?{season:'孜然'}:{broth:'三鲜清汤'})},cost:discountedCoins(foods.reduce((sum,f)=>sum+f.price,0),factor),foods};}
  const entries=ids.map(id=>({id,qty:1}));return {recipe:{entries,spice:'不辣'},cost:malatangCost(entries,menu,rates),foods:ids.map(id=>menu.find(f=>f.id===id))};
 };
 let chosen=build();while(ids.length>1&&chosen.cost>limit){ids=ids.slice(0,-1);chosen=build();}
 if(chosen.cost>limit)return null;
 return {...chosen,game,storeId:store.id,storeName:store.name||STORE_NAMES[game],title:store.seasonal||'本季搭配',buddyId:buddyById(buddyId).id,budget,taste:'any',foods:chosen.foods.map(f=>({id:f.food||f.id,name:f.name})),reason:'听说这几样正当季，先照着搭，进店还能随心改。'};
}
