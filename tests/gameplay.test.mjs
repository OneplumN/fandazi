import test from 'node:test';
import assert from 'node:assert/strict';
import {initialBBQ,bbqReducer,initialTea,teaReducer,initialBreakfast,breakfastReducer,heatState,bbqStatus} from '../src/games/rules.js';
import {createHoldGesture} from '../src/games/gesture-model.js';
test('four heat states include an overdone stage before burning',()=>{
 assert.deepEqual([0,10,14,17].map(t=>heatState(t,10)),['raw','ready','overdone','burned']);
 assert.equal(bbqStatus({sides:[14,10],cook:10}).label,'有点老');
});
test('free BBQ has no selected spice and seasoning is per skewer without reheating',()=>{
 let s=initialBBQ();assert.equal(s.season,null);
 s=bbqReducer(s,{type:'add',id:'lamb'});s=bbqReducer(s,{type:'add',id:'corn'});s=bbqReducer(s,{type:'start'});
 assert.strictEqual(bbqReducer(s,{type:'sprinkle',key:0}),s);
 s=bbqReducer(s,{type:'season',value:'辣椒'});s=bbqReducer(s,{type:'sprinkle',key:0});
 assert.equal(s.items[0].season,'辣椒');assert.equal(s.items[1].season,undefined);assert.deepEqual(s.items[0].sides,[0,0]);
 s=bbqReducer(s,{type:'season',value:'蜜汁'});s=bbqReducer(s,{type:'sprinkle',key:1});
 assert.deepEqual(s.items.map(f=>f.season),['辣椒','蜜汁']);
 const done=bbqReducer(s,{type:'serve'});assert(!('score' in done));assert(!('breakdown' in done));
});
test('shake changes layered recipe before pouring and never becomes a required step',()=>{
 const plain=initialTea();assert.equal(plain.tea,'black');assert.deepEqual(plain.toppings,[]);
 const shaken=teaReducer(plain,{type:'shake'});assert(shaken.mix>0);assert.equal(shaken.phase,'recipe');assert.equal(shaken.mixTime,0);
 const done=teaReducer(teaReducer(plain,{type:'mix'}),{type:'tick',dt:4});assert.equal(done.phase,'result');assert.equal(done.mix,0);assert.equal(done.total,8);
});
test('circle spread is optional and pause-safe',()=>{
 const cooking=breakfastReducer(initialBreakfast(),{type:'start'}),spread=breakfastReducer(cooking,{type:'spread'});
 assert.equal(spread.spread,true);assert.equal(breakfastReducer(cooking,{type:'wrap'}).phase,'result');
 const paused=breakfastReducer(cooking,{type:'pause',value:true});assert.strictEqual(breakfastReducer(paused,{type:'spread'}),paused);
});
test('hold seasons once; swipe and pointercancel never season or flip; keyboard click works',()=>{
 let timer,flips=0,seasons=0;
 const g=createHoldGesture({hold:()=>seasons++,tap:()=>flips++,schedule:fn=>(timer=fn,1),cancel:()=>{timer=null;}}),down={pointerId:1,clientX:10,clientY:10,button:0};
 g.down(down);timer();g.up();g.click({detail:1});assert.equal(seasons,1);assert.equal(flips,0);
 g.down(down);g.move({...down,clientY:50});assert.equal(timer,null);g.up();g.click({detail:1});assert.equal(flips,0);
 g.down(down);g.cancel();g.click({detail:1});assert.equal(flips,0);
 g.click({detail:0});assert.equal(flips,1);
 g.down(down);g.up();g.click({detail:1});assert.equal(flips,2);
});

test('unpaid quote follows delayed content, successful first payment fixes subsequent portions',async()=>{
 const {quotedDiscount}=await import('../src/games/meal-pricing.js');
 const unpaid={discountFactor:1};assert.equal(quotedDiscount(unpaid,1),1);assert.equal(quotedDiscount(unpaid,.5),.5);
 const paid={discountFactor:.5,discountCaptured:true};assert.equal(quotedDiscount(paid,.75),.5);assert.equal(quotedDiscount(paid,1),.5);
 assert.equal(quotedDiscount({...paid,discountCaptured:false},.75),.75);
});
test('included breakfast egg can be added before or after fillings without reheating or an extra charge',()=>{
 const cooking=breakfastReducer(initialBreakfast(),{type:'start'}),filled=breakfastReducer(cooking,{type:'filling',id:'lettuce'}),after=breakfastReducer(filled,{type:'egg'});
 assert.equal(after.egg,true);assert.equal(after.phase,'assembling');assert.deepEqual(after.fillings,['lettuce']);assert.deepEqual(after.sides,filled.sides);assert.strictEqual(breakfastReducer({...filled,paused:true},{type:'egg'}).egg,false);assert.strictEqual(breakfastReducer(after,{type:'egg'}),after);
});
test('touch pointerleave after release keeps the completed tap, but a held or cancelled gesture never adds a flip',()=>{
 let timer,flips=0,seasons=0;
 const g=createHoldGesture({hold:()=>seasons++,tap:()=>flips++,schedule:fn=>(timer=fn,1),cancel:()=>{timer=null;}}),down={pointerId:1,clientX:10,clientY:10,button:0};
 g.down(down);g.up();g.cancel();g.click({detail:1});assert.equal(flips,1);
 g.down(down);timer();g.up();g.cancel();g.click({detail:1});assert.equal(seasons,1);assert.equal(flips,1);
 g.down(down);g.cancel();g.up();g.click({detail:1});assert.equal(flips,1);
});
