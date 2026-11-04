import {test,expect} from '@playwright/test';
test('delayed malatang promo updates quote; editing settings never compounds discount',async({page})=>{
 await page.route('**/api/street',async route=>{await new Promise(r=>setTimeout(r,500));await route.fulfill({json:{version:1,stores:[{id:'malatang',status:'open',discount:.5}],messages:[]}});});
 await page.goto('/play/#malatang');await page.locator('.goods').first().waitFor();await expect(page.locator('.goods').first()).toContainText('0.7');
 const before=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('malatang.settings')||'{}'));
 const settingsButton=page.getByRole('button',{name:/设置/}).first();await settingsButton.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await dialog.getByRole('button',{name:/保存/}).click();await expect.poll(async()=>(await before()).pricePerJin).toBe(19.8);await expect(page.locator('.goods').first()).toContainText('0.7');
 await page.locator('.goods').first().click();await page.locator('.checkout-dock .btn--primary').click();await expect(page.locator('[data-dining]')).toBeVisible();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('dazi.wallet.v1')).balance)).toBe(99);
});
test('subpath admin reload reaches admin login rather than homepage',async({page})=>{await page.goto('/play/admin');await expect(page.getByRole('heading',{name:/登录|后台/}).first()).toBeVisible();await expect(page.locator('.store-grid')).toHaveCount(0);});

test('focused lazy rack can unmount during a route change without queued focus errors',async({page})=>{const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/play/#malatang');await page.locator('.rack').last().scrollIntoViewIfNeeded();await expect(page.locator('.rack').last()).toHaveAttribute('data-deferred','false');await page.locator('.goods').last().focus();await page.evaluate(()=>{location.hash='tea';});await expect(page.locator('[data-game="tea"]')).toBeVisible();await page.waitForTimeout(100);expect(errors).toEqual([]);});
