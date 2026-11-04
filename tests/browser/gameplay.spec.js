import {test,expect} from '@playwright/test';
const content=factor=>({version:1,stores:[{id:'tea',status:'open',discount:factor},{id:'hotpot',status:'open',discount:factor}],messages:[]});
const state=page=>page.evaluate(()=>JSON.parse(window.render_game_to_text()));
test('direct tea entry updates its unpaid quote after delayed content and pays displayed price',async({page})=>{
 await page.route('**/api/street',async route=>{await new Promise(resolve=>setTimeout(resolve,1200));await route.fulfill({json:content(.5)});});
 await page.goto('/play/#tea');
 await expect(page.getByRole('button',{name:'制作奶茶 8金币',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'制作奶茶 4金币',exact:true})).toBeVisible();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('dazi.wallet.v1')).balance);
 await page.getByRole('button',{name:'制作奶茶 4金币',exact:true}).click();
 await expect.poll(async()=>(await state(page)).paidTotal).toBe(4);
 expect((await state(page)).discountCaptured).toBe(true);
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('dazi.wallet.v1')).balance)).toBe(before-4);
});
test('hotpot direct entry updates delayed quote and uses the first paid factor for later portions',async({page})=>{
 await page.route('**/api/street',async route=>{await new Promise(resolve=>setTimeout(resolve,1200));await route.fulfill({json:content(.5)});});await page.goto('/play/#hotpot');
 await expect(page.getByRole('button',{name:'下锅肥牛卷',exact:true})).toContainText('4 金币');
 await expect(page.getByRole('button',{name:'下锅肥牛卷',exact:true})).toContainText('2 金币');
 await page.getByRole('button',{name:'下锅肥牛卷',exact:true}).click();
 await expect.poll(async()=>(await state(page)).paidTotal).toBe(2);
 await page.getByRole('button',{name:'下锅肥牛卷',exact:true}).click();
 await expect.poll(async()=>(await state(page)).paidTotal).toBe(4);
 expect((await state(page)).discountFactor).toBe(.5);expect((await state(page)).discountCaptured).toBe(true);
});
test('saved sound off remains off with keyboard and synthetic keys never unlock feedback',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('dazi.experience.v1',JSON.stringify({sound:false,haptics:false,motion:false}));window.__audioCreated=0;window.AudioContext=class {constructor(){window.__audioCreated++;}};});
 await page.goto('/play/#tea');await page.evaluate(()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true})));
 await page.getByRole('button',{name:'摇匀配方',exact:true}).focus();await page.keyboard.press('Enter');
 expect(await page.evaluate(()=>window.__audioCreated)).toBe(0);
 await page.getByText('声音与动效',{exact:true}).first().click();await expect(page.getByRole('checkbox',{name:'轻声音效',exact:true})).not.toBeChecked();
});

test('sound waits for a trusted gesture and a real keyboard action can unlock it',async({page})=>{
 await page.addInitScript(()=>{localStorage.removeItem('dazi.experience.v1');window.__audioCreated=0;window.AudioContext=class {constructor(){window.__audioCreated++;}};});
 await page.goto('/play/#tea');await page.evaluate(()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));document.querySelector('button[aria-label="摇匀配方"]').click();});
 expect(await page.evaluate(()=>window.__audioCreated)).toBe(0);
 await page.getByRole('button',{name:'摇匀配方',exact:true}).focus();await page.keyboard.press('Enter');
 expect(await page.evaluate(()=>window.__audioCreated)).toBe(1);
});

test('paid tea keeps its factor after street refresh and a closed store cannot replay the finished meal',async({page})=>{
 let closed=false;
 await page.route('**/api/street',route=>route.fulfill({json:{version:1,stores:[{id:'tea',status:closed?'closed':'open',discount:closed?1:.5}],messages:[]}}));
 await page.route('**/api/reviews',route=>{closed=true;return route.fulfill({json:{ok:true}});});
 await page.goto('/play/#tea');await page.getByRole('button',{name:'制作奶茶 4金币',exact:true}).click();
 await expect.poll(async()=>(await state(page)).discountCaptured).toBe(true);
 await page.evaluate(()=>window.advanceTime(4000));
 const dining=page.getByRole('region',{name:'享用这一餐'});
 for(let i=0;i<5;i++)await dining.getByRole('button',{name:'喝一口奶茶',exact:true}).click();
 await page.getByRole('button',{name:'5星',exact:true}).click();
 await page.getByRole('checkbox',{name:'也分享给街坊（会发送星级和这句话）',exact:true}).check();
 await page.getByRole('button',{name:'记下点评',exact:true}).click();
 await expect(page.getByText('这句味道记住啦，也分享给街坊了。',{exact:true})).toBeVisible();
 expect((await state(page)).discountFactor).toBe(.5);
 const runId=(await state(page)).runId;
 await page.getByRole('button',{name:'接下一杯',exact:true}).click();
 await expect(page.getByText('小店正在歇业，这餐留着慢慢回味，先逛逛其他小店吧。',{exact:true})).toBeVisible();
 expect((await state(page)).runId).toBe(runId);expect((await state(page)).phase).toBe('result');
 await expect(page.getByRole('button',{name:'逛逛其他小店',exact:true})).toBeVisible();
});
