import {discountedCoins} from '../content-model.js';
import {GRILL_MENU,POT_MENU,FILLINGS,teaPrice} from './rules.js';
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
export function makeMealPlan({buddyId='wan',budget=20,taste='any',balance=100,round=0,menu=[],settings={pricePerJin:19.8},discounts={},closed=[],favorites=[]}){
 const factor=id=>discounts[id]||1,price=(n,id)=>discountedCoins(n,factor(id));
 settings={...settings,pricePerJin:(settings.pricePerJin??19.8)*factor('malatang'),priceGroups:Object.fromEntries(Object.entries(settings.priceGroups||{}).map(([k,v])=>[k,v*factor('malatang')]))};
 const buddy=buddyById(buddyId),limit=Math.max(0,Math.min(Number.isFinite(budget)?budget:20,Number.isFinite(balance)?balance:0));
 const wantsSpicy=taste==='spicy',ids=buddy.id==='lin'?['spinach','xianggu','dongdoufu','oupian','fensi']:buddy.id==='wang'?['feiniujuan','niurouwan','spinach','fensi','dongdoufu']:['spinach','xianggu','niurouwan','fensi','dongdoufu'];
 let entries=ids.filter(id=>menu.some(f=>f.id===id&&f.enabled!==false)).map(id=>({id,qty:1}));
 while(entries.length&&malatangCost(entries,menu,settings)>limit)entries.pop();
 const bbqIds=buddy.id==='lin'?['mushroom','tofu','broccoli']:buddy.id==='wang'?['lamb','chicken','corn']:['lamb','sausage','mushroom'];
 let skewers=bbqIds.slice();while(skewers.length&&price(skewers.reduce((n,id)=>n+GRILL_MENU.find(f=>f.id===id).price,0),'bbq')>limit)skewers.pop();
 let potIds=buddy.id==='lin'?['spinach','xianggu','dongdoufu','helandou']:buddy.id==='wang'?['feiniujuan','kuanfen','dongdoufu']:['xiahua','oupian','spinach'];
 while(potIds.length&&price(potIds.reduce((n,id)=>n+POT_MENU.find(f=>f.id===id).price,0),'hotpot')>limit)potIds.pop();
 const tea={tea:buddy.id==='lin'?'jasmine':buddy.id==='wang'?'cocoa':'black',milk:buddy.id==='lin'?'无奶':'鲜奶',sugar:buddy.id==='lin'||taste==='light'?25:50,ice:'少冰',size:500,toppings:buddy.id==='lin'?['coconut']:['pearl']};
 if(price(teaPrice(tea),'tea')>limit)tea.toppings=[];if(price(teaPrice(tea),'tea')>limit)tea.milk='无奶';
 const fillings=buddy.id==='lin'?['lettuce','huanggua']:buddy.id==='wang'?['huotuichang','youtiao']:['lettuce','peigen'];
 const candidates=[
  entries.length&&{game:'malatang',title:wantsSpicy?'热辣一盆':'随心热乎一盆',cost:malatangCost(entries,menu,settings),recipe:{entries,spice:wantsSpicy?'中辣':'不辣'},foods:entries.map(e=>menu.find(f=>f.id===e.id))},
  skewers.length&&{game:'bbq',title:wantsSpicy?'辣香小烤盘':'香香小烤盘',cost:price(skewers.reduce((n,id)=>n+GRILL_MENU.find(f=>f.id===id).price,0),'bbq'),recipe:{ids:skewers,season:wantsSpicy?'辣椒':buddy.id==='lin'?'蜜汁':'孜然'},foods:skewers.map(id=>GRILL_MENU.find(f=>f.id===id))},
  price(teaPrice(tea),'tea')<=limit&&{game:'tea',title:buddy.id==='lin'?'清爽茉莉小料茶':'今天的珍珠奶茶',cost:price(teaPrice(tea),'tea'),recipe:tea,foods:[]},
  potIds.length&&{game:'hotpot',title:wantsSpicy?'一锅热辣':'清汤慢慢涮',cost:price(potIds.reduce((n,id)=>n+POT_MENU.find(f=>f.id===id).price,0),'hotpot'),recipe:{ids:potIds,broth:wantsSpicy?'麻辣红汤':'三鲜清汤'},foods:potIds.map(id=>POT_MENU.find(f=>f.id===id))},
  limit>=price(10,'breakfast')&&{game:'breakfast',title:'加蛋配菜煎饼',cost:price(10,'breakfast'),recipe:{base:'煎饼',egg:true,fillings,sauce:wantsSpicy?'辣酱':'甜面酱'},foods:fillings.map(id=>FILLINGS.find(f=>f.id===id))},
 ].filter(Boolean).filter(p=>!closed.includes(p.game)).filter(p=>taste==='drink'?p.game==='tea':taste==='spicy'?p.game!=='tea':true);
 if(!candidates.length)return null;
 candidates.sort((a,b)=>Number(favorites.includes(b.game))-Number(favorites.includes(a.game)));
 const offset=favorites.some(id=>candidates.some(p=>p.game===id))?0:buddy.id==='lin'?2:buddy.id==='wang'?1:0,plan=candidates[(Math.max(0,Math.floor(round))+offset)%candidates.length];
 return {...plan,buddyId:buddy.id,budget,taste,storeName:STORE_NAMES[plan.game],foods:plan.foods.map(f=>({id:f.food||f.id,name:f.name})),reason:favorites.includes(plan.game)?'你收藏的这家我还记得，今天一起再去尝尝？':taste==='drink'?'想喝点甜的，先来一杯。':taste==='light'?'你说想清爽一点，这份先不加辣。':wantsSpicy?'今天想吃辣，就挑这份热闹的。':buddy.id==='wang'?'有主角也有配菜，踏实吃一顿。':buddy.id==='lin'?'给自己留点清爽的选择。':'别纠结啦，这顿先从这里开始。'};
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
 if(game==='tea')return b.id==='lin'?(state.sugar>=75?'这杯甜得很认真，下次陪我试试半糖？':'清清爽爽的一杯，正好陪你歇一会儿。'):b.id==='wang'?'咕嘟几口，今天这点小疲惫也喝下去。':(state.toppings?.length>=2?'小料挤在一起，像我们凑热闹。':'这杯我喜欢，和你一起喝就更有味道。');
 if(b.id==='lin')return greens?'青菜和配菜都没落下，这一顿挺清爽。':'你挑喜欢的，我负责陪你慢慢吃。';
 if(b.id==='wang')return count<=2?'先垫一口，待会儿想加再加，不着急。':'这一顿吃得踏实，其他事等吃完再说。';
 return game==='breakfast'?'有热乎的饼陪着，今天就算开了个好头。':count>=5?'这一盆挺热闹，和你一起吃就刚刚好。':'不必搭得多漂亮，喜欢这一口就够啦。';
}
