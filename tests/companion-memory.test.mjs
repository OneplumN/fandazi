import test from 'node:test';
import assert from 'node:assert/strict';
import {companionMemory,memoryLine,buddyBiteIndex,servingPage} from '../src/games/companion-memory.js';
import {makeMealPlan} from '../src/games/outing-model.js';
const meal=(id,buddyId='wan',more={})=>({id,buddyId,game:'malatang',store:'麻辣搭子',items:[{food:'spinach',name:'菠菜'}],...more});
test('memories belong to the chosen companion, exclude this meal, and count each food once per visit',()=>{
 const profile={meals:[meal('now'),meal('other','lin'),meal('old','wan',{items:[{food:'spinach',name:'菠菜'},{food:'spinach',name:'菠菜'}]})]};
 const memory=companionMemory(profile,'wan',{excludeMealId:'now'});
 assert.equal(memory.count,1);assert.equal(memory.foods[0].visits,1);assert.match(memoryLine(memory,{game:'malatang'}),/上回/);assert.doesNotMatch(memoryLine(memory,{game:'malatang'}),/这几次/);
 assert.equal(companionMemory(profile,'wang').count,0);assert.equal(memoryLine(companionMemory(profile,'wang'),{game:'tea'}),'');
 const repeated=companionMemory({meals:[meal('a'),meal('b')]},'wan');assert.match(memoryLine(repeated,{game:'malatang'}),/这几次.*菠菜/);
});
test('tea recommendations remember valid recipes within the budget and honor an explicit light preference',()=>{
 const memory=companionMemory({meals:[meal('tea','lin',{game:'tea',recipe:{tea:'cocoa',milk:'燕麦奶',sugar:75,size:700,ice:'无冰',toppings:['pearl','taro']}})]},'lin');
 const remembered=makeMealPlan({buddyId:'lin',taste:'drink',memory,budget:30});
 assert.equal(remembered.recipe.tea,'cocoa');assert.equal(remembered.recipe.sugar,75);assert.equal(remembered.recipe.size,700);assert(remembered.cost<=30);
 const light=makeMealPlan({buddyId:'lin',taste:'light',memory,budget:30});if(light.game==='tea'){assert.equal(light.recipe.sugar,25);assert.equal(light.recipe.tea,'jasmine');}
 const cheap=makeMealPlan({buddyId:'lin',taste:'drink',memory,budget:8});if(cheap)assert(cheap.cost<=8);
});
test('a bowl keeps holes in its six serving slots until the page is eaten; buddy picks only an available visible food',()=>{
 const items=Array.from({length:8},(_,i)=>({food:String(i),bites:1})),counts=items.map(()=>0);
 counts[0]=1;assert.deepEqual(servingPage(items,counts),[0,1,2,3,4,5]);
 assert.equal(buddyBiteIndex(items,counts,servingPage(items,counts),{foods:[{id:'7'},{id:'3'}]}),3);
 counts.fill(1,0,6);assert.deepEqual(servingPage(items,counts),[6,7]);counts.fill(1);assert.deepEqual(servingPage(items,counts),[]);assert.equal(buddyBiteIndex(items,counts,[6,7],null),-1);
});
