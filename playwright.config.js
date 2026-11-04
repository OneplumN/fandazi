import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser', testIgnore:'**/._*', timeout:45_000, fullyParallel:true,
  retries:process.env.CI?1:0, reporter:process.env.CI?'github':'list',
  use:{baseURL:'http://127.0.0.1:4186',viewport:{width:390,height:844},reducedMotion:'reduce',trace:'retain-on-failure'},
  webServer:{command:'node tests/browser/serve.mjs',url:'http://127.0.0.1:4186',reuseExistingServer:false,timeout:120_000},
});
