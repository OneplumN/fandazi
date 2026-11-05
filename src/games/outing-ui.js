import {normalizePricing} from '../malatang-pricing.js';
import {companionMemory} from './companion-memory.js';
import {useStreet} from '../content-client.js';
import {useConsumer} from './consumer-store.js';
import {X as React} from '../../vendor/react-runtime.js';
import {COMPANIONS,buddyById,makeMealPlan,isValidBudget} from './outing-model.js';
import {useOuting,chooseOuting,prepareOuting} from './outing-store.js';
const h=React.createElement;
export function TodayMeal({api,balance}){
 const {content}=useStreet(),{profile:consumer}=useConsumer();
 const {profile}=useOuting(),[round,setRound]=React.useState(0),[budgetDraft,setBudgetDraft]=React.useState(String(profile.budget)),[budgetError,setBudgetError]=React.useState(false);
 React.useEffect(()=>setBudgetDraft(String(profile.budget)),[profile.budget]);
 const budgetValid=budgetDraft.trim()!==''&&isValidBudget(Number(budgetDraft));
 let settings=api.settings;try{settings=normalizePricing(JSON.parse(localStorage.getItem('malatang.settings')||'{}'),settings);}catch{}
 const memory=companionMemory(consumer,profile.buddyId);
 const plan=makeMealPlan({...profile,memory,balance,round,menu:api.menu,settings,favorites:consumer.favorites,storeOptions:content.stores,discounts:Object.fromEntries(content.stores.map(s=>[s.id,s.discount||1])),closed:content.stores.filter(s=>s.status==='closed').map(s=>s.id)});
 return h('section',{className:'today-meal','aria-labelledby':'today-title'},
 h('div',{className:'today-heading'},h('div',null,h('h1',{id:'today-title'},'今天吃什么？'),h('p',null,'先挑个口味，剩下的交给搭子。')),h('button',{type:'button',className:'text-button',onClick:()=>document.querySelector('.store-grid')?.scrollIntoView({block:'start'})},'随便逛逛 ↓')),
 h('fieldset',{className:'companion-picker'},h('legend',null,'今天谁陪你吃'),...COMPANIONS.map(b=>h('button',{type:'button',key:b.id,'aria-pressed':profile.buddyId===b.id,onClick:()=>{chooseOuting({buddyId:b.id});setRound(0);}},h(api.Avatar,{id:b.id,name:b.name,size:44,color:b.color}),h('span',null,h('b',null,b.name),h('small',null,b.tag))))),
 h('div',{className:'today-options'},
  h('fieldset',null,h('legend',null,'预算 · 金币'),
   ...[10,20,30].map(n=>h('button',{type:'button',key:n,'aria-pressed':profile.budget===n,onClick:()=>{setBudgetDraft(String(n));setBudgetError(false);chooseOuting({budget:n});setRound(0);}},`${n}以内`)),
   h('label',{className:'custom-budget'},h('span',null,'自定'),h('input',{type:'number',inputMode:'numeric',min:5,max:200,step:1,value:budgetDraft,'aria-label':'自定义今天的预算','aria-invalid':!budgetValid,'aria-describedby':budgetError&&!budgetValid?'budget-error':undefined,onChange:e=>{setBudgetDraft(e.target.value);if(e.target.value&&isValidBudget(Number(e.target.value))){chooseOuting({budget:Number(e.target.value)});setRound(0);setBudgetError(false);}},onBlur:()=>setBudgetError(!budgetValid),onKeyDown:e=>{if(e.key==='Enter'){e.preventDefault();e.currentTarget.blur();}}})),
   budgetError&&!budgetValid&&h('small',{id:'budget-error',role:'alert',className:'budget-error'},'填5–200的整数金币')),
  h('fieldset',null,h('legend',null,'想吃哪种'),... [['any','随便'],['light','清淡点'],['spicy','想吃辣'],['drink','喝点甜的']].map(([taste,label])=>h('button',{type:'button',key:taste,'aria-pressed':profile.taste===taste,onClick:()=>{chooseOuting({taste});setRound(0);}},label)))),
 plan?h('div',{className:'today-suggestion','data-plan':JSON.stringify({game:plan.game,cost:plan.cost,buddyId:plan.buddyId,recipe:plan.recipe})},h('p',{className:'companion-says'},`${buddyById(profile.buddyId).name}：${plan.reason}`),h('div',{className:'suggestion-title'},h('div',null,h('small',null,plan.storeName),h('h2',null,plan.title)),h('strong',null,`${plan.cost} 金币`)),plan.foods.length>0&&h('div',{className:'suggestion-preview','aria-hidden':true},...plan.foods.slice(0,3).map(f=>{const food=api.menu.find(i=>i.id===f.id);return food&&h(api.Food,{key:f.id,...food,size:52});})),h('p',{className:'suggestion-foods'},plan.foods.length?plan.foods.map(f=>f.name).join(' · '):`${plan.recipe.sugar}%糖 · ${plan.recipe.ice} · ${plan.recipe.milk}`),h('div',{className:'suggestion-actions'},h('button',{type:'button',className:'btn btn--ghost',onClick:()=>setRound(n=>n+1)},'换一家'),h('button',{type:'button',className:'btn btn--primary',disabled:!budgetValid,onClick:()=>{prepareOuting(plan);window.location.hash=plan.storeId&&plan.storeId!==plan.game?'store/'+plan.storeId:plan.game;}},'就吃这顿 →')),h('small',{className:'suggestion-note'},'进店后还能随心改，选推荐不扣金币。')):h('div',{className:'today-suggestion'},h('p',null,'今天先随便逛逛，明天还有100金币。'),h('button',{type:'button',className:'btn',onClick:()=>document.querySelector('.store-grid')?.scrollIntoView()},'去街上看看')));
}
