import test from 'node:test';import assert from 'node:assert/strict';
import {normalizePricing,DEFAULT_RATE} from '../src/malatang-pricing.js';import {isValidBudget,makeMealPlan} from '../src/games/outing-model.js';
const defaults={shopName:'楼下那家麻辣烫',pricePerJin:DEFAULT_RATE,budgetDefault:25,separatePricing:false,priceGroups:{veg:19.8,meat:26.8,ball:24.8,staple:19.8}};
test('local pricing preserves a previous custom rate and repairs incomplete or corrupt saved fields',()=>{
 const normalized=normalizePricing({pricePerJin:19.8,budgetDefault:37,priceGroups:{veg:12.8,meat:-4},shopName:' 我的店 ',separatePricing:true},defaults);
 assert.equal(normalized.pricePerJin,19.8);assert.equal(normalized.shopName,'我的店');assert.equal(normalized.budgetDefault,37);assert.deepEqual(normalized.priceGroups,{...defaults.priceGroups,veg:12.8});assert.equal(normalizePricing({pricePerJin:0,budgetDefault:Infinity},defaults).pricePerJin,DEFAULT_RATE);
});
test('non-preset budgets remain valid and every recommendation fits the selected amount',()=>{
 for(const value of [5,17,45,200]){assert(isValidBudget(value));for(let round=0;round<8;round++){const plan=makeMealPlan({budget:value,balance:100,round});if(plan)assert(plan.cost<=Math.min(100,value));}}
 for(const value of [0,4,201,NaN,Infinity,17.5,'20',null])assert(!isValidBudget(value));
});
