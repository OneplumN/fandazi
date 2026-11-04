import test from 'node:test';import assert from 'node:assert/strict';
import {mealItems,initialDining,validDining,takeBite,diningSummary} from '../src/games/dining-model.js';
import {initialTea,teaReducer} from '../src/games/rules.js';
test('skewers have three bites, drinks five sips, breakfast four bites',()=>{
 for(const [game,state,bites] of [['bbq',{items:[{id:'lamb',food:'yangroujuan',name:'羊肉串'}]},3],['tea',{},5],['breakfast',{base:'煎饼'},4]]){
  const items=mealItems(game,state);let counts=initialDining(items);assert.equal(diningSummary(counts,items).total,bites);
  for(let n=0;n<bites;n++)counts=takeBite(counts,items,0);assert(diningSummary(counts,items).finished);assert.strictEqual(takeBite(counts,items,0),counts);
 }
});
test('bowl servings reflect quantities and keep selected-food identities',()=>{
 const items=mealItems('malatang',{entries:[{id:'spinach',qty:3},{id:'yumi',qty:2}]},[{id:'spinach',name:'菠菜'},{id:'yumi',name:'玉米'}]);assert.equal(items[0].name,'菠菜');assert.equal(diningSummary([1,0],items).remaining,4);
 const pot=mealItems('hotpot',{served:[{id:'spinach',name:'菠菜'}],pot:[{id:'yuwan',name:'鱼丸'}]});assert.equal(pot.length,1);assert.equal(diningSummary([0],pot).total,1);
});
test('invalid or stale dining progress cannot give negative servings',()=>{
 const items=mealItems('tea',{});for(const counts of [null,[6],[-1],[1.2],[],[1,2]])assert(!validDining(counts,items));assert(validDining([3],items));
 for(const index of [-1,1,NaN,1.2])assert.deepEqual(takeBite([0],items,index),[0]);
});
test('optional shaking helps mixing but respects pause and never changes recipe',()=>{
 let s=teaReducer(initialTea(),{type:'mix'});s=teaReducer(s,{type:'pause',value:true});assert.strictEqual(teaReducer(s,{type:'shake'}),s);s=teaReducer(s,{type:'pause',value:false});
 for(let i=0;i<7;i++)s=teaReducer(s,{type:'shake'});assert.equal(s.phase,'result');assert.equal(s.tea,'black');assert.equal(s.total,8);
});

test('hotpot food still in the pot cannot silently become edible',()=>{
 assert.equal(mealItems('hotpot',{served:[],pot:[{id:'spinach',name:'菠菜'}]}).length,0);
});
