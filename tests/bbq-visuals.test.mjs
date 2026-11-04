import test from 'node:test';import assert from 'node:assert/strict';
import {heatLook,blendColor} from '../src/games/bbq-visuals.js';
test('food color and texture change continuously before the cooked threshold',()=>{
 const stages=[0,.25,.5,.75,1,1.5,2].map(t=>heatLook(t));const colors=stages.map(s=>s.color('#D79480','#BA8250'));
 assert.equal(new Set(colors).size,7);assert(stages[2].marks>0);assert.equal(stages[4].scorch,0);assert(stages[5].scorch>0);assert(stages[4].shrink<stages[0].shrink);assert(stages[6].shrink>=.935);
});
test('visual heat stays bounded and invalid values cannot generate corrupt colors',()=>{
 for(const ratio of [NaN,Infinity,-2,0,20]){const look=heatLook(ratio);assert.match(look.color('#D79480','#BA8250'),/^#[0-9a-f]{6}$/i);assert(look.shrink>=.935&&look.shrink<=1);assert(look.scorch>=0&&look.scorch<=1);}
 assert.equal(blendColor('#000000','#ffffff',.5),'#808080');
});
