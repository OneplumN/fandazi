import test from "node:test";
import assert from "node:assert/strict";
import {
  initialBBQ,
  bbqReducer,
  heatState,
  initialTea,
  teaReducer,
  initialHotpot,
  hotpotReducer,
  initialBreakfast,
  breakfastReducer,
} from "../src/games/rules.js";
test("BBQ requires selection; heats both sides and respects pause", () => {
  let s = initialBBQ();
  assert.equal(bbqReducer(s, { type: "start" }).phase, "select");
  s = bbqReducer(s, { type: "add", id: "lamb" });
  s = bbqReducer(s, { type: "start" });
  s = bbqReducer(s, { type: "tick", dt: 10 });
  assert.equal(s.items[0].sides[0], 10);
  s = bbqReducer(s, { type: "pause", value: true });
  assert.equal(bbqReducer(s, { type: "tick", dt: 8 }).items[0].sides[0], 10);
  s = bbqReducer(s, { type: "pause", value: false });
  s = bbqReducer(s, { type: "flip", key: s.items[0].key });
  s = bbqReducer(s, { type: "tick", dt: 10 });
  s = bbqReducer(s, { type: "sprinkle" });
  s = bbqReducer(s, { type: "serve" });
  assert.equal(s.phase,"result");
  assert.equal("score" in s,false);
  assert.equal(s.phase, "result");
});
test("BBQ preserves raw and burned cooking state; grill capacity six", () => {
  let s = initialBBQ();
  for (let n = 0; n < 9; n++) s = bbqReducer(s, { type: "add", id: "lamb" });
  assert.equal(s.selected.length, 6);
  s = bbqReducer(s, { type: "start" });
  s = bbqReducer(s, { type: "tick", dt: 50 });
  s = bbqReducer(s, { type: "serve" });
  assert.equal(s.items[0].sides[0],50);
  assert.equal(heatState(20, 10), "burned");
});
test("Tea keeps chosen recipe and pouring finishes without mandatory shakes", () => {
  let s = initialTea();
  s = teaReducer(s, { type: "mix" });
  assert.equal(s.phase, "mixing");
  assert.equal(teaReducer(s, { type: "finish" }).phase, "mixing");
  s = teaReducer(s, { type: "tick", dt: 4 });
  assert.equal(s.phase, "result");
  assert.equal("score" in s,false);
});
test("Tea limits three toppings and stops when paused", () => {
  let s = initialTea();
  for (const id of ["pearl", "pudding", "taro", "grass"])
    s = teaReducer(s, { type: "topping", id });
  assert.equal(s.toppings.length, 3);
  s = teaReducer(s, { type: "mix" });
  s = teaReducer(s, { type: "pause", value: true });
  assert.equal(teaReducer(s, { type: "tick", dt: 4 }).phase, "mixing");
});
test("Hotpot first food opens the pot; cooking remains open without a deadline", () => {
  let s = initialHotpot();

  s = hotpotReducer(s, { type: "add", id: "spinach" });
  s = hotpotReducer(s, { type: "tick", dt: 6 });
  s = hotpotReducer(s, { type: "take", key: s.pot[0].key });
  assert.equal(s.served[0].quality, 100);
  s = hotpotReducer(s, { type: "tick", dt: 60 });
  assert.equal(s.phase, "cooking");
  s = hotpotReducer(s, {type:"finish"});
  assert.equal(s.phase,"result");
  assert.equal("score" in s,false);
});
test("Hotpot keeps actual cooking state and capacity", () => {
  let s = hotpotReducer(initialHotpot(), { type: "start" });
  for (let n = 0; n < 7; n++)
    s = hotpotReducer(s, { type: "add", id: "spinach" });
  assert.equal(s.pot.length, 6);
  assert.strictEqual(hotpotReducer(s, { type: "finish" }),s);
  for(const item of [...s.pot])s=hotpotReducer(s,{type:"take",key:item.key});
  s = hotpotReducer(s, { type: "finish" });
  assert.equal(s.served.length, 6);
  assert(s.served.every(f=>f.age===0));
});
test("Breakfast supports freely repeated meals without a mandatory three-order shift", () => {
  let s = initialBreakfast();
  for (let n = 0; n < 3; n++) {
    const order = {base:"煎饼",egg:true,fillings:["lettuce"],sauce:"甜面酱"};
    s = breakfastReducer(s, { type: "base", value: order.base });
    s = breakfastReducer(s, { type: "start" });
    if (order.egg) s = breakfastReducer(s, { type: "egg" });
    s = breakfastReducer(s, { type: "tick", dt: 6 });
    s = breakfastReducer(s, { type: "flip" });
    s = breakfastReducer(s, { type: "tick", dt: 6 });
    s = breakfastReducer(s, { type: "plate" });
    for (const id of order.fillings)
      s = breakfastReducer(s, { type: "filling", id });
    s = breakfastReducer(s, { type: "sauce", value: order.sauce });
    s = breakfastReducer(s, { type: "deliver" });
    assert.equal("score" in s,false);
    s = breakfastReducer(s, { type: "next" });
  }
  assert.equal(s.phase, "ready");
  assert.equal("order" in s,false);
});
test("Breakfast has no timeout and can be reset", () => {
  let s = breakfastReducer(initialBreakfast(), { type: "start" });
  s = breakfastReducer(s, { type: "tick", dt: 50 });
  assert.equal(s.phase, "cooking");
  assert.equal("score" in s,false);
  s = breakfastReducer(s, { type: "reset" });
  assert.equal(s.phase, "ready");
  assert.deepEqual(s.sides,[0,0]);
});

test("hotpot allows continued dining after twelve portions and freezes after finishing", () => {
  let s = hotpotReducer(initialHotpot(), { type: "start" });
  for (let n = 0; n < 12; n++) {
    s = hotpotReducer(s, { type: "add", id: "spinach" });
    s = hotpotReducer(s, { type: "take", key: s.pot[0].key });
  }
  assert.equal(s.added, 12);
  assert.equal(hotpotReducer(s, { type: "add", id: "spinach" }).added, 13);
  s = hotpotReducer(s, { type: "finish" });
  assert.strictEqual(hotpotReducer(s, { type: "tick", dt: 10 }), s);
});
test("empty hotpot stays open without forcing a result", () => {
  let s = hotpotReducer(initialHotpot(), { type: "start" });
  s = hotpotReducer(s, { type: "tick", dt: 60 });
  assert.equal(s.phase, "cooking");
  assert.equal("score" in s,false);
});
test("invalid ingredient IDs and invalid time deltas cannot corrupt any game", () => {
  for (const [initial, reducer, phaseAction] of [
    [initialBBQ, bbqReducer, "start"],
    [initialTea, teaReducer, "mix"],
    [initialHotpot, hotpotReducer, "start"],
    [initialBreakfast, breakfastReducer, "start"],
  ]) {
    let s = initial();
    s = reducer(s, { type: phaseAction });
    for (const dt of [-1, NaN, Infinity])
      assert.strictEqual(reducer(s, { type: "tick", dt }), s);
    assert.strictEqual(reducer(s, { type: "not-a-real-action" }), s);
  }
  assert.equal(
    bbqReducer(initialBBQ(), { type: "add", id: "missing" }).selected.length,
    0,
  );
  assert.equal(
    hotpotReducer(hotpotReducer(initialHotpot(), { type: "start" }), {
      type: "add",
      id: "missing",
    }).pot.length,
    0,
  );
});
test("all game food illustrations reference existing menu IDs", async () => {
  const fs = await import("node:fs/promises");
  const menu = JSON.parse(
    await fs.readFile(
      new URL("../docs/ingredients.json", import.meta.url),
      "utf8",
    ),
  );
  const ids = new Set(menu.map((f) => f.id));
  const { GRILL_MENU, POT_MENU, FILLINGS } = await import(
    "../src/games/rules.js"
  );
  for (const item of [...GRILL_MENU, ...POT_MENU, ...FILLINGS])
    assert(ids.has(item.food), item.food);
});

test('different BBQ ingredients can finish separately using the warming tray',()=>{let s=initialBBQ();s=bbqReducer(s,{type:'add',id:'lamb'});s=bbqReducer(s,{type:'add',id:'corn'});s=bbqReducer(s,{type:'start'});s=bbqReducer(s,{type:'tick',dt:10});s=bbqReducer(s,{type:'flip',key:0});s=bbqReducer(s,{type:'tick',dt:2});s=bbqReducer(s,{type:'flip',key:1});s=bbqReducer(s,{type:'tick',dt:8});s=bbqReducer(s,{type:'rest',key:0});s=bbqReducer(s,{type:'tick',dt:4});assert.deepEqual(s.items[0].sides,[10,10]);assert.deepEqual(s.items[1].sides,[12,12]);s=bbqReducer(s,{type:'rest',key:1});s=bbqReducer(s,{type:'sprinkle'});s=bbqReducer(s,{type:'serve'});assert.equal(s.phase,"result");});
test('choosing BBQ seasoning is different from actually sprinkling it',()=>{let s=bbqReducer(bbqReducer(initialBBQ(),{type:'add',id:'lamb'}),{type:'start'});s=bbqReducer(s,{type:'season',value:'孜然'});s=bbqReducer(s,{type:'tick',dt:10});s=bbqReducer(s,{type:'flip',key:0});s=bbqReducer(s,{type:'tick',dt:10});assert.equal(bbqReducer(s,{type:'serve'}).items[0].season,undefined);s=bbqReducer(s,{type:'pause',value:true});assert.strictEqual(bbqReducer(s,{type:'sprinkle'}),s);s=bbqReducer(s,{type:'pause',value:false});s=bbqReducer(s,{type:'sprinkle'});assert.equal(s.seasonApplied,'孜然');assert.equal(bbqReducer(s,{type:'serve'}).items[0].season,'孜然');});

test("BBQ stays on the grill beyond the previous 90-second limit",()=>{
 let s=bbqReducer(initialBBQ(),{type:"add",id:"lamb"});s=bbqReducer(s,{type:"start"});
 s=bbqReducer(s,{type:"tick",dt:180});assert.equal(s.phase,"cooking");assert.equal(s.elapsed,180);
});

test('hotpot can reheat a taken serving without creating a new chargeable portion',()=>{
 let s=hotpotReducer(initialHotpot(),{type:'start'});s=hotpotReducer(s,{type:'add',id:'spinach'});s=hotpotReducer(s,{type:'tick',dt:2});s=hotpotReducer(s,{type:'take',key:0});
 s=hotpotReducer(s,{type:'return',key:0});assert.equal(s.added,1);assert.equal(s.serial,1);assert.equal(s.pot[0].age,2);assert.equal(s.served.length,0);
 s=hotpotReducer(s,{type:'tick',dt:4});s=hotpotReducer(s,{type:'take',key:0});assert.equal(s.served[0].quality,100);
});

test('on-grill status distinguishes one cooked face, both cooked faces and burned food',async()=>{
 const {bbqStatus}=await import('../src/games/rules.js');
 const food={cook:10,sides:[0,0],side:0};assert.equal(bbqStatus(food).label,'未熟');
 assert.equal(bbqStatus({...food,sides:[10,0]}).label,'翻一翻');
 assert.equal(bbqStatus({...food,sides:[10,0],side:1}).label,'未熟');
 assert.equal(bbqStatus({...food,sides:[10,10]}).label,'烤好了');
 assert.equal(bbqStatus({...food,sides:[17,0],side:1}).label,'烤过头');
 assert.equal(bbqStatus({...food,resting:true}).label,'未熟保温');
 assert.equal(bbqStatus({...food,sides:[10,10],resting:true}).label,'已熟保温');
});

test("breakfast directly adds fillings from the pan and wraps a plain pancake",()=>{
 let s=breakfastReducer(initialBreakfast(),{type:"start"});
 const filled=breakfastReducer(s,{type:"filling",id:"lettuce"});
 assert.equal(filled.phase,"assembling");assert.deepEqual(filled.fillings,["lettuce"]);
 assert.equal(breakfastReducer(s,{type:"wrap"}).phase,"result");
 const paused=breakfastReducer(s,{type:"pause",value:true});
 assert.strictEqual(breakfastReducer(paused,{type:"wrap"}),paused);
});

test("paused hotpot cannot finish, but resumes to finish the same meal",()=>{
 let s=hotpotReducer(initialHotpot(),{type:"add",id:"spinach"});s=hotpotReducer(s,{type:"take",key:s.pot[0].key});s=hotpotReducer(s,{type:"pause",value:true});
 assert.strictEqual(hotpotReducer(s,{type:"finish"}),s);assert.equal(hotpotReducer(hotpotReducer(s,{type:"pause",value:false}),{type:"finish"}).phase,"result");
});
test("paused BBQ cannot serve and keeps the paid food intact",()=>{
 let s=bbqReducer(initialBBQ(),{type:"add",id:"lamb"});s=bbqReducer(s,{type:"start"});s=bbqReducer(s,{type:"pause",value:true});assert.strictEqual(bbqReducer(s,{type:"serve"}),s);
});
