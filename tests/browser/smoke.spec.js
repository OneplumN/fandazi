import {test,expect} from '@playwright/test';

test('recommendation → payment → eating → receipt PNG → document reload',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/play/#home');
 await page.getByRole('button',{name:'喝点甜的',exact:true}).click();
 const plan=await page.locator('[data-plan]').evaluate(el=>JSON.parse(el.dataset.plan));
 expect(plan.game).toBe('tea');
 const balance=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('dazi.wallet.v1')).balance);
 const before=await balance();
 await page.getByRole('button',{name:'就吃这顿 →',exact:true}).click();
 await expect(page).toHaveURL(/#tea$/);
 await page.getByRole('button',{name:/^制作奶茶/}).click();
 await expect.poll(balance).toBe(before-plan.cost);
 // Only test time advances; recipe, payment, serving and every bite use real UI.
 await expect.poll(()=>page.evaluate(()=>typeof window.advanceTime)).toBe('function');
 await page.evaluate(()=>window.advanceTime(60_000));
 const dining=page.getByRole('region',{name:'享用这一餐'});
 await expect(dining).toBeVisible();
 for(let bite=0;bite<5;bite++) await dining.getByRole('button',{name:'喝一口奶茶',exact:true}).click();
 await expect(page.locator('[data-receipt]')).toBeVisible();
 const receipt=await page.locator('[data-receipt]').evaluate(el=>JSON.parse(el.dataset.receipt));
 expect(receipt.amount).toBe(plan.cost);
 expect(await balance()).toBe(before-plan.cost);
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:'保存小票',exact:true}).click();
 const download=await downloadPromise;expect(download.suggestedFilename()).toMatch(/\.png$/);
 const stream=await download.createReadStream();const chunks=[];for await(const chunk of stream)chunks.push(chunk);
 expect(Buffer.concat(chunks).subarray(0,8)).toEqual(Buffer.from([137,80,78,71,13,10,26,10]));
 await page.goto('/play/#receipt');await page.reload();
 await expect(page.locator('[data-receipt]')).toBeVisible();
 expect(await page.locator('[data-receipt]').evaluate(el=>JSON.parse(el.dataset.receipt).id)).toBe(receipt.id);
 expect(await balance()).toBe(before-plan.cost);
 expect(errors).toEqual([]);
});

test('BBQ starts with one payment click, then serves and records every bite',async({page})=>{
 await page.goto('/play/#bbq');
 const wallet=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('dazi.wallet.v1')));
 const before=await wallet();
 await page.locator('.game-food-grid button').first().click();
 await page.getByRole('button',{name:'开始烤制',exact:true}).click();
 await expect(page.locator('[data-game="bbq"]')).toHaveAttribute('data-phase','cooking');
 await expect(page.getByRole('dialog',{name:/确认下单/})).toHaveCount(0);
 const paid=await wallet();expect(paid.balance).toBeLessThan(before.balance);
 const charged=before.balance-paid.balance;
 await page.getByRole('button',{name:'出炉尝尝',exact:true}).click();
 const dining=page.getByRole('region',{name:'享用这一餐'});
 await expect(dining).toBeVisible();
 for(let bite=0;bite<3;bite++)await dining.getByRole('button',{name:/^吃一口/}).click();
 await expect(page.locator('[data-receipt]')).toBeVisible();
 expect(await page.locator('[data-receipt]').evaluate(el=>JSON.parse(el.dataset.receipt).amount)).toBe(charged);
 expect((await wallet()).balance).toBe(paid.balance);
});

test('production five stores expose no debug hooks and load their assets',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const failed=[];page.on('response',r=>{if(r.status()>=400&&!r.url().includes('/api/'))failed.push(r.url());});
 for(const route of ['home','malatang','bbq','tea','hotpot','breakfast']){
  await page.goto('/#'+route);
  await expect(page.locator(route==='home'?'.store-grid':route==='malatang'?'.app':'[data-game]'),route+': '+errors.join('; ')).toBeVisible();
  expect(await page.evaluate(()=>({advance:typeof window.advanceTime,render:typeof window.render_game_to_text}))).toEqual({advance:'undefined',render:'undefined'});
 }
 expect(errors).toEqual([]);expect(failed).toEqual([]);
});

test('inline modal isolates background, traps keyboard and restores focus',async({page})=>{
 await page.goto('/#malatang');
 const originalStyle=await page.locator('body').getAttribute('style');
 const trigger=page.getByRole('button',{name:'查看明细',exact:true,includeHidden:true});await trigger.click();
 const dialog=page.getByRole('dialog',{name:'你的盆',exact:true});await expect(dialog).toBeVisible();
 expect(await dialog.evaluate(el=>!el.closest('[inert]'))).toBe(true);
 await expect(page.locator('body')).toHaveCSS('position','fixed');
 expect(await trigger.evaluate(el=>!!el.closest('[inert]'))).toBe(true);
 await page.keyboard.press('Shift+Tab');expect(await dialog.evaluate(el=>el.contains(document.activeElement))).toBe(true);
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(trigger).toBeFocused();
 expect(await trigger.evaluate(el=>!!el.closest('[inert]'))).toBe(false);
 expect((await page.locator('body').getAttribute('style'))||'').toBe(originalStyle||'');
});

test('nested modal isolation counts and original attributes restore in either close order',async({page})=>{
 await page.goto('/');
 const result=await page.evaluate(async()=>{
  const {isolateModal}=await import('/__test/modal-isolation.js');
  const host=document.createElement('div');host.innerHTML='<main aria-hidden="false"><button>background</button></main><div id="outer"><button>outer</button><div id="inner"><button>inner</button></div></div><aside inert aria-hidden="true"></aside>';
  document.body.append(host);const background=host.querySelector('main'),outer=host.querySelector('#outer'),inner=host.querySelector('#inner'),aside=host.querySelector('aside');
  const run=(reverse)=>{
   const a=isolateModal(outer),b=isolateModal(inner);
   const during=background.inert&&!inner.closest('[inert]')&&outer.querySelector('button').inert&&!a.isTop()&&b.isTop();
   (reverse?a:b).release();const middle=background.inert; (reverse?b:a).release();
   return during&&middle&&!background.inert&&background.getAttribute('aria-hidden')==='false'&&aside.inert&&aside.getAttribute('aria-hidden')==='true';
  };
  const passed=run(false)&&run(true);host.remove();return passed;
 });
 expect(result).toBe(true);
});
