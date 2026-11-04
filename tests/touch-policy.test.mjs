import test from 'node:test';import assert from 'node:assert/strict';import {suppressKitchenTouch} from '../src/games/touch-policy.js';
const tap={touch:true,now:1000,x:80,y:200,previous:{at:800,x:82,y:199}};
test('same-position touch bursts cannot click through a replaced food slot or dialog',()=>assert.equal(suppressKitchenTouch(tap),true));
test('deliberate subsequent touch and a different food position remain available',()=>{assert.equal(suppressKitchenTouch({...tap,now:1060}),false);assert.equal(suppressKitchenTouch({...tap,x:110}),false)});
test('drag, cancellation and changed target never activate a touch button',()=>{for(const key of ['moved','cancelled','changedTarget'])assert.equal(suppressKitchenTouch({...tap,previous:null,[key]:true}),true)});
test('keyboard and mouse keep native behavior even at the same position',()=>assert.equal(suppressKitchenTouch({...tap,touch:false,moved:true}),false));
