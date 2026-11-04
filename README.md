# 饭搭子 · 搭子小馆

五家手绘风格美食小游戏：麻辣搭子、烧烤搭子、奶茶实验室、火锅搭子、早餐小摊。玩家选预算、口味与搭子，随心做一顿，吃完留张小票；不闯关。

线上：https://fandazi.oneplums.cn/ 。本仓库包含可编辑前端源码、素材、测试及部署配置；当前工作树的变更是否发布需以部署记录为准。

## 本地运行

构建要求 Node.js `^20.19.0 || >=22.12.0`，建议 Node.js 22.12 或以上。

```sh
git clone https://github.com/OneplumN/fandazi.git
cd fandazi
npm ci
npm start
```

打开 http://127.0.0.1:4173/ 。可通过 `PORT=4175 npm start` 改端口。

```sh
npm test
npx playwright install chromium
npm run test:browser
npm run build:static -- --out-parent ./work
```

构建命令打印产物目录 `work/malatang-static-随机后缀`，包含哈希 JS/CSS、预压缩文件和 SHA256 清单。`--out-dir ./work/preview` 可指定一个空输出目录；`--base /play/` 可验证子路径部署。用该目录预览正式构建（替换下面目录名）：

```sh
npx vite preview --outDir ./work/malatang-static-随机后缀 --port 4174
```

打开 http://127.0.0.1:4174/ 。生产使用构建产物，而非 `/src` 模块。

## 代码入口

| 位置 | 内容 |
| --- | --- |
| `src/app.js` | 麻辣烫主应用、价格与页面装配；菜单与 SVG 见 `src/data/` 和 `src/art/` |
| `src/checkout-ui.js` | 明细、称重结算、共享弹层、背景隔离与滚动锁 |
| `src/modal-isolation.js` | 嵌套弹层背景 inert、原属性计数恢复；弹层祖先保持可访问 |
| `src/games/hub.js` | 五店路由与首页 |
| `src/games/rules.js`、`economy.js` | 制作规则、每日赠币、消费、退款与会员模型 |
| `src/games/wallet-store.js` | 本地钱包持久化、并发写入与迁移 |
| `src/games/outing-*.js` | 今天吃什么、三位搭子与推荐带入 |
| `src/games/dining.js`、`dining-model.js` | 享用动作、一口食物的持久化与份数 |
| `src/games/memento.js`、`domain-move.js` | 小票 PNG、旧域名存档迁移 |
| `public/styles/index.css` | CSS 唯一入口，按 tokens/base/components/pages/outings/motion 组织 |
| `public/art/char/`、`vendor/` | 原角色素材与本地 React 运行库，不依赖 CDN |
| `tests/`、`scripts/build-static.mjs` | Node 规则测试与 Vite 静态构建 |
| `deploy/oneplums/` | Nginx、部署说明、线上版本信息；不含凭据或私钥 |

## 功能与边界

- 每天首次到店送 100 金币；消费升级会员，未完成订单取消时退款；币值仅为游戏设置。
- 首页推荐不收费，进店可改；三个搭子沿用原形象，并有不同偏好与评语。
- 直接点食物制作、翻面、夹取或享用；吃完可保存小票图片，首页保留最近一顿。
- 金币、装扮、偏好和用餐数据保存在当前浏览器，不能跨设备同步。旧域名提供手动存档迁移入口。
- 玩家运营内容使用同源 `/api/street`，接口不可用时以静态内容降级；旧管理后端未恢复。没有离线安装功能。

## 审查

先看 [审查指南](docs/审查指南.md)，再运行测试和构建。GitHub Actions 使用 Node.js 22 执行 `npm ci`、规则测试、生产构建与 Chromium 浏览器回归。浏览器测试自行生成根路径生产包与 `/play/` 测试包，使用独立浏览器存储，无需线上服务或凭据；`--test-tools` 仅供隔离测试，不得用于发布。现有浏览器验证使用 Chrome 的手机视口模拟，未声称完成实体手机或微信客户端验收。

来源是对原站 https://malatang-lovat.vercel.app/ 的前端恢复与持续修改，并非原作者 Git 仓库。原始 TypeScript/JSX、后端源码未恢复。原始采集档案 `evidence/`、`snapshots/` 与临时构建保留在开发机，未提交。原素材来源与权利不因本仓库创建而改变，本次未添加开源许可证。

历史功能与交付记录见 [历史交付记录](docs/历史交付记录.md)；历史记录中的旧路径、评分奖励与版本号以当前代码和本 README 为准。
