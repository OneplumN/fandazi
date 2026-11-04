# 饭搭子评审全量实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development to implement independent file-owned tasks, then review and integrate. User approved full implementation in chat.

**Goal:** 落实用户评审汇总，保留轻松消费者玩法，完成代码/测试/五店体验/点评收藏熟客/运营内容接口/小程序准备，并推送与部署可用部分。
**Architecture:** 原生 ES modules + React.createElement + SVG；纯模型与本地存储边界；Vite生产构建移除调试工具；同源内容服务与静态降级；微信WebView通过可选桥接。
**Tech Stack:** Node22+, Vite8, React本地运行库, Playwright, Nginx。
**Spec:** 用户2026-11-04评审汇总及“全部落实到位”。本文件记录具体验收与外部限制。

## Global Constraints
- 五店不闯关、不显示分数、不做任务；每日100金币、累计消费会员、原退款和存档保护。
- 原奶油/棕线SVG和角色画风；320px至桌面、横屏、安全区、44px目标、减少动态效果。
- 现有关闭音效偏好保留；新用户音效/震动可在手势后开启，首次翻面一次可关提示。
- 用户说明不涉及版权；品牌改fandazi，历史来源保持事实，不虚构原创/第三方授权。
- 用户没有CDN账号，小程序在申请：不得声称CDN或微信上线；完成配置/工程和准确交付边界。
- 不公开服务器IP/凭据，不改写Git历史；不影响其他服务器站点。
- 新运营接口校验输入、写入需本机凭据；本地数据降级可玩；无虚构汇总评分。

## Task 1 基础与自动验证（文件owner foundation）
- [ ] package品牌/脚本/Playwright开发依赖与lock；CI跑规则、构建、浏览器冒烟。
- [ ] tests/browser真实UI推荐→付费→吃完→小票→刷新；生产无调试钩子测试。
- [ ] 共享背景inert辅助，适配嵌套弹层，焦点/滚动恢复；不可inert整个含弹层root。
- [ ] README审查文档更新及测试说明。

## Task 2 五店动作与规则（owner gameplay）
- [ ] 去四店计分/最高分/订单目标残留；测试改为制作状态与动作结果。
- [ ] 自由奶茶无小料预选、烧烤无口味预选；首页推荐仍带配方。
- [ ] 摇杯混合、分串调味、四档火候和搭子可见反馈；不加必经手势门槛。
- [ ] 一键扣费开烤+拍币反馈+撤销，去二次确认，维持幂等/退款。
- [ ] 打哈欠/喜欢/碰杯与残局；各店专属可选动作；音效一次可关。
- [ ] 所有调试钩子只在开发/测试构建注册。import {DEV_TOOLS} from ../runtime.js。
- [ ] 向consumer提供state中seasoning/heat/mix及剩余物信息；Dining最后完成后仍展示残局。

## Task 3 消费者与运营前端（owner consumers）
- [ ] 一餐只计一次用餐次数；点评五星+一句话、收藏置顶、常客5次/10次小菜、我的点评页可保存。
- [ ] 小票留言（键盘输入可手写键盘）+可选真正画笔签字，保存PNG包含留言和残局。
- [ ] 下次进店复述上次评价；搭子收藏推荐；运营新店/限定/折扣/歇业包装闲聊。
- [ ] 新src/content-client.js请求/api/street，静态内置降级；不恢复管理503依赖；汇总只显示真实响应。
- [ ] hub按声明顺序且动态食材计数，DEV_TOOLS guard；运营折扣不能伪造扣费，需向root/gameplay约定价格接口。

## Task 4 构建/核心/部署/小程序（owner root）
- [ ] app.js机械语义改名、拆菜单数据和SVG，画面对照与五店回归。
- [ ] runtime.js定义DEV_TOOLS与assetUrl，去构建字符串替换，支持子路径；按店lazy，图片哈希，Brotli与隐藏map。
- [ ] 同源运营内容服务：受控内容编辑接口、schema校验、原子持久化、公开只读；无密钥进Git。
- [ ] Nginx安全片段、短HSTS、CSP实测、清单/map拒绝、旧站/admin noindex、加载占位。
- [ ] 直连公网/本机TTFB与系统安全包审计，若更新可安全就备份后更新；无CDN账号只给配置和准确限制。
- [ ] 微信WebView工程、2店入口、原生分享/存储桥接及域名/账号待办；不能伪称上线。
- [ ] 统一验收、审查各任务、GitHub CI、版本备份与原子部署，报告已完成和外部待办。

## Interface review / rulings
| Pair | Interface | Ruling |
|---|---|---|
| 1/2/3/4 | package与测试/调试 | foundation owns package+browser tests，gameplay只修改已有规则测试，consumers新consumer测试；root runtime提供常量 |
| 2/3 | dining与memento | gameplay owns dining及新残留物组件；consumers owns memento。残留物由game/state推导，无分数。 |
| 2/3 | 价格与运营折扣 | 运营配置先通过统一effectivePrice helper传入，不能只改标签；歇业需拦直达但不取消正在消费。 |
| 3/4 | 内容服务 | GET /api/street返回version/stores/messages，PUT仅本机受认证；没有服务时静默内置降级。 |
| 1/4 | 基路径 | root提供assetUrl helper，foundation浏览器直接用生产root及subpath构建测试。 |
| 1 | 单项一致 | CI不依赖服务器/IP/密钥，E2E使用测试构建且另测生产无钩子。 |
| 2 | 单项一致 | 视觉状态保留数值制作模型，删除评分而不是火候。 |
| 3 | 单项一致 | 本机点评与真实服务汇总区分；小菜不赠币/制造任务。 |
| 4 | 单项一致 | 未取得外部账号不伪造CDN/微信结果；推进其他项。 |

## 验证与裁定记录
- 基础bb024de，玩法258557f/27d6214，消费者18bf0f5/3680dc6/46af929/7556822；独立审查发现quota、路由保留字、延迟折扣、歇业重开均已修正并回归。
- Root将59主符号语义改名并拆data/menu、art/foods；120个SVG序列化逐一一致。
- 生产调试关闭，测试构建保留钩子；浏览器12项已通过，新增子路径/admin与促销设置不复折扣。
- Root审查修复UTF8分包JSON损坏、原生空/新钱包覆盖旧存档、原始门店设置被折扣污染。
- 裁定：Nginx已安装Ubuntu22.04的1.18.0-6ubuntu14.22安全更新且apt候选一致，不跨供应商替换版本；关闭版本泄漏、增加安全头、静态Brotli。
- 裁定：无CDN账号且实测当前直连TTFB32–42ms，不购买资源/迁移主机；准备CDN控制台接入与缓存规则。AppID申请中，仅准备工程/桥接与本地测试，不冒充微信上线。
