import {test,expect} from '@playwright/test';
const progress=page=>page.locator('[data-dining]').evaluate(n=>JSON.parse(n.dataset.dining));
const balance=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('dazi.wallet.v1')).balance);
async function tea(page){await page.goto('/play/#tea');await page.locator('#tea-mix').click();await expect.poll(()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()).phase)).toBe('mixing');await page.evaluate(()=>window.advanceTime(4000));await expect(page.locator('[data-dining]')).toBeVisible();}
test('sharing is opt-in, follows just one player bite, can be stopped, and never spends more coins',async({page})=>{
 await tea(page);const paid=await balance(page),buddy=page.getByRole('button',{name:'和丸丸一起吃',exact:true});
 await page.waitForTimeout(1000);expect((await progress(page)).eaten).toBe(0);
 await buddy.click();await page.waitForTimeout(1000);expect((await progress(page)).eaten).toBe(0);
 await page.getByRole('button',{name:'喝一口奶茶',exact:true}).click();await expect.poll(async()=>(await progress(page)).eaten).toBe(2);
 expect((await progress(page)).buddyBites).toBe(1);await page.waitForTimeout(1100);expect((await progress(page)).eaten).toBe(2);
 await page.getByRole('button',{name:'喝一口奶茶',exact:true}).click();await expect.poll(async()=>(await progress(page)).eaten).toBe(3);
 await page.getByRole('button',{name:'让丸丸歇一会儿',exact:true}).click();await page.waitForTimeout(1100);expect((await progress(page)).eaten).toBe(3);expect(await balance(page)).toBe(paid);
 for(let i=0;i<2;i++)await page.getByRole('button',{name:'喝一口奶茶',exact:true}).click();await expect(page.locator('[data-receipt]')).toBeVisible();expect(await balance(page)).toBe(paid);
});
test('a shared bite does not happen while the dining table is off screen',async({page})=>{
 await page.setViewportSize({width:390,height:360});await tea(page);await page.getByRole('button',{name:'和丸丸一起吃',exact:true}).click();await page.getByRole('button',{name:'喝一口奶茶',exact:true}).click();
 await expect.poll(async()=>(await progress(page)).eaten).toBe(1);await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(1100);expect((await progress(page)).eaten).toBe(1);
});
test('completed companion history survives reload, recalls recipes, and stays separate from other buddies',async({page})=>{
 await page.addInitScript(()=>{if(localStorage.getItem('dazi.consumer.v1'))return;const meal={id:'remember-tea',buddyId:'wan',game:'tea',store:'奶茶实验室',at:1,amount:10,recipe:{tea:'jasmine',milk:'鲜奶',sugar:75,ice:'少冰',size:500,toppings:['pearl']},items:[{name:'特调奶茶',qty:1}],line:'一起喝完啦'};localStorage.setItem('dazi.consumer.v1',JSON.stringify({version:1,completed:{[meal.id]:'tea'},meals:[meal],reviews:{},favorites:[],notes:{}}));});
 await page.goto('/play/#home');await page.getByRole('button',{name:'喝点甜的',exact:true}).click();await expect(page.locator('.companion-says')).toContainText('上回那杯75%糖');expect(await page.locator('[data-plan]').evaluate(n=>JSON.parse(n.dataset.plan).recipe.sugar)).toBe(75);
 await page.reload();await expect(page.locator('.companion-says')).toContainText('上回那杯75%糖');await page.getByRole('button',{name:/小林 清爽搭子/}).click();await expect(page.locator('.companion-says')).not.toContainText('上回');await page.getByRole('button',{name:/丸丸 随性搭子/}).click();await page.getByRole('button',{name:'就吃这顿 →',exact:true}).click();await expect(page.locator('.companion-presence')).toContainText('上回那杯75%糖');
});
test('eaten bowl slots do not move neighboring touch targets under a resting finger',async({page})=>{
 await page.goto('/play/#malatang');for(let i=0;i<3;i++)await page.locator('.goods').nth(i).click();await page.locator('.checkout-dock .btn--primary').click();
 const slot=page.locator('[data-serving-index="1"]');await slot.click({trial:true});const before=await slot.boundingBox();await page.locator('[data-serving-index="0"]').click();await expect(page.locator('.empty-mouthful')).toHaveCount(1);const after=await slot.boundingBox();expect(after.x).toBeCloseTo(before.x,0);expect(after.y).toBeCloseTo(before.y,0);
});
test('breakfast bites follow the tapped edge and leave crumbs; first tea sip opens the straw without an extra step',async({page})=>{
 await page.goto('/play/#breakfast');await page.locator('#breakfast-start').click();await expect.poll(()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()).phase)).toBe('cooking');await page.evaluate(()=>window.advanceTime(6000));await page.locator('#breakfast-start').click();await page.evaluate(()=>window.advanceTime(6000));await page.getByRole('button',{name:'加料油条',exact:true}).click();await page.getByRole('button',{name:'加一颗蛋',exact:true}).click();await expect(page.getByRole('button',{name:'加一颗蛋',exact:true})).toBeDisabled();await page.locator('#breakfast-start').click();
 const food=page.getByRole('button',{name:'咬一口早餐饼',exact:true});await food.click({position:{x:50,y:100}});await expect.poll(async()=>(await progress(page)).eaten).toBe(1);await expect(page.locator('.breakfast-plate-crumbs')).toBeVisible();
 await expect(food.locator('mask [data-bite-edge]').first()).toHaveAttribute('data-bite-edge','left');const box=await food.boundingBox();await food.click({position:{x:box.width-50,y:100}});await expect.poll(async()=>(await progress(page)).eaten).toBe(2);await expect(food.locator('mask [data-bite-edge]').nth(1)).toHaveAttribute('data-bite-edge','right');
 await tea(page);await page.getByRole('button',{name:'喝一口奶茶',exact:true}).click();await expect(page.locator('.dining-main-food .refined-cup')).toHaveAttribute('data-straw-poked','true');await expect(page.getByRole('button',{name:'戳开杯膜',exact:true})).toHaveCount(0);await expect(page.locator('.dining-main-food [data-fill-level]')).toHaveAttribute('data-fill-level','0.8');
});
test('hotpot keeps the same table and shared bite when the first bite completes the order',async({page})=>{
 await page.goto('/play/#hotpot');for(const [n,name] of ['鱼丸','菠菜'].entries()){await page.getByRole('button',{name:'下锅'+name,exact:true}).click();await expect.poll(()=>page.evaluate(()=>JSON.parse(window.render_game_to_text()).pot.length)).toBe(n+1);}
 await page.evaluate(()=>window.advanceTime(18000));for(const name of ['鱼丸','菠菜'])await page.getByRole('button',{name:'捞起'+name,exact:true}).click();await expect(page.locator('.game-mobile-dock')).toHaveCount(0);await page.getByRole('button',{name:'和丸丸一起吃',exact:true}).click();await page.evaluate(()=>window.__firstTable=document.querySelector('[data-dining]'));await page.locator('[data-serving-index="0"]').click();expect(await page.evaluate(()=>window.__firstTable===document.querySelector('[data-dining]'))).toBe(true);await expect(page.locator('[data-game="hotpot"]')).toHaveAttribute('data-phase','result');await page.locator('[data-dining]').scrollIntoViewIfNeeded();await expect.poll(async()=>(await progress(page)).finished).toBe(true);expect((await progress(page)).buddyBites).toBe(1);await expect(page.locator('[data-receipt]')).toBeVisible();
});
test('a delayed background timer cannot eat a stale shared bite when the player returns',async({page})=>{
 await page.clock.install();await tea(page);await page.getByRole('button',{name:'和丸丸一起吃',exact:true}).click();await page.getByRole('button',{name:'喝一口奶茶',exact:true}).click();await expect.poll(async()=>(await progress(page)).eaten).toBe(1);await page.clock.fastForward(60000);expect((await progress(page)).eaten).toBe(1);
});
