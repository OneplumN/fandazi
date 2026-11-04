import test from "node:test";
import assert from "node:assert/strict";
import { initialWallet, validWallet, migrateWallet, dailyGift, payOrder, closeOrder, purchase, equip, membership, localDay } from "../src/games/economy.js";
const fresh=()=>dailyGift(initialWallet(),"2026-11-03",1).wallet;
test("daily gift is exactly 100, once per day, with accumulation and no retroactive gifts",()=>{
 let w=fresh();assert.equal(w.balance,100);assert.strictEqual(dailyGift(w,"2026-11-03").wallet,w);
 w=dailyGift(w,"2026-11-08",2).wallet;assert.equal(w.balance,200);assert.equal(Object.keys(w.gifts).length,2);assert.equal(w.spent,0);
 assert.equal(localDay(new Date(2026,10,3)),"2026-11-03");
});
test("legacy wallet keeps coins, cosmetics, equipment and ledger; new membership starts at zero",()=>{
 const w={...initialWallet(),version:1,balance:247,owned:[...initialWallet().owned,"theme-mint"],equipped:{...initialWallet().equipped,theme:"mint"},ledger:[{id:"old",label:"旧账",amount:247,at:0}]};
 delete w.spent;delete w.orders;delete w.gifts;
 const migrated=migrateWallet(w);assert(validWallet(migrated));assert.equal(migrated.balance,247);assert.equal(migrated.spent,0);assert.equal(migrated.equipped.theme,"mint");assert.equal(dailyGift(migrated,"2026-11-03").wallet.balance,347);
});
test("food payment is idempotent, deducts balance and adds growth; no overdraft",()=>{
 let w=fresh(), order={id:"bbq:1",amount:7,label:"烧烤"};w=payOrder(w,order).wallet;
 assert.equal(w.balance,93);assert.equal(w.spent,7);assert.strictEqual(payOrder(w,order).wallet,w);
 assert.equal(payOrder(w,{id:"tea:1",amount:94,label:"奶茶"}).status,"insufficient");
 for(const amount of [0,-1,1.5,NaN,Infinity]) assert.equal(payOrder(w,{...order,id:"bad",amount}).status,"invalid");
});
test("unfinished multi-portion hotpot refunds all coins and membership growth once",()=>{
 let w=fresh();for(let i=0;i<3;i++)w=payOrder(w,{id:"pot:1",paymentId:`pot:1:${i}`,amount:2,label:"下菜"}).wallet;
 assert.equal(w.balance,94);assert.equal(w.spent,6);w=closeOrder(w,"pot:1",true).wallet;
 assert.equal(w.balance,100);assert.equal(w.spent,0);assert.strictEqual(closeOrder(w,"pot:1",true).wallet,w);
 assert.equal(payOrder(w,{id:"pot:1",paymentId:"new",amount:2,label:"下菜"}).status,"closed");
});
test("completed meals cannot refund or charge again",()=>{
 let w=payOrder(fresh(),{id:"meal",amount:10,label:"早餐"}).wallet;w=closeOrder(w,"meal").wallet;
 assert.equal(w.orders.meal.status,"completed");assert.strictEqual(closeOrder(w,"meal",true).wallet,w);
 assert.equal(w.balance,90);assert.equal(w.spent,10);
});
test("membership thresholds use actual spending, with no balance or daily-gift multiplier",()=>{
 for(const [amount,name] of [[0,"初来小馆"],[299,"初来小馆"],[300,"街坊熟客"],[1000,"银卡会员"],[3000,"金卡会员"],[6000,"黑金食客"]])assert.equal(membership(amount).name,name);
 let w={...fresh(),balance:1000};w=payOrder(w,{id:"meal",amount:300,label:"聚餐"}).wallet;assert.equal(membership(w.spent).name,"街坊熟客");w=closeOrder(w,"meal",true).wallet;assert.equal(membership(w.spent).name,"初来小馆");
});
test("cosmetic spending grows membership, switching and repeat purchases never charge twice",()=>{
 let w=purchase(fresh(),"sign-night").wallet;assert.equal(w.balance,30);assert.equal(w.spent,70);
 w=purchase(w,"sign-night").wallet;assert.equal(w.balance,30);assert.equal(w.spent,70);assert.equal(equip(w,"sign-default").wallet.balance,30);
 assert.equal(purchase(w,"theme-mint").status,"insufficient");
});
test("ledger remains balanced after truncation, gifts, food, refunds and cosmetics",()=>{
 let w=initialWallet();for(let i=0;i<250;i++)w=dailyGift(w,`day-${i}`,i).wallet;
 w=payOrder(w,{id:"meal",amount:77,label:"用餐"}).wallet;w=closeOrder(w,"meal",true).wallet;w=purchase(w,"theme-mint").wallet;
 assert(w.ledger.length<=200);assert.equal(w.ledger.reduce((n,t)=>n+t.amount,0),w.balance);assert(validWallet(w));
});
