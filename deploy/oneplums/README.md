当前最新20261104T103644Z，前版101204Z保留；详见 ../../docs/评审落实与发布.md。

当前最新：20261104T101204Z。安全片段需同时部署fandazi-encoding.conf到http级conf.d以及security/precompressed到snippets；内容服务与Node22配置见评审落实文档。以下为历史记录。

当前最新：20261104T084355Z，开吃动作已精修，详见 ../../docs/开吃动作精修.md。以下为此前记录。

## 当前状态：2026-11-04

主站已切换 https://fandazi.oneplums.cn/ ，HTTPS/HTTP2已验证；当前20261104T081907Z。旧域名继续提供存档迁移。证书自动续期，目录仍复用原站。详见 ../../docs/推荐搭子小票与新域名.md 和 release.json。下方为历史部署记录。

# 麻辣搭子部署记录与DNS设置

部署日期：2026-11-03（Asia/Shanghai）。

## 当前状态

已部署到SERVER_IPV4，独立Nginx虚拟主机为malatang.oneplums.cn。服务器本机及公网指定Host访问HTTP返回200。30个发布文件SHA-256校验通过；公网浏览器通过主机解析覆盖进行390px/1280px测试，120种食材、增加份数、¥1.98结算和20位评价均正常，未发现页面JavaScript异常。该验证不代表公共DNS已生效。

检查时malatang.oneplums.cn的A记录不存在。主域名oneplums.cn仍指向原服务器101.43.54.131，未改动。既有regex站点返回200，Zabbix容器保持运行。

## DNS配置

到oneplums.cn的DNS控制台（权威NS为阿里云HiChina），新增：

| 字段 | 内容 |
|---|---|
| 记录类型 | A |
| 主机记录 | malatang |
| 解析线路 | 默认 |
| 记录值 | SERVER_IPV4 |
| TTL | 600秒 / 10分钟 |

主机记录只填写malatang，不填写完整域名；保留现有@和www记录。阿里云官方说明：https://www.alibabacloud.com/help/en/dns/pubz-add-parsing-record

## HTTPS

服务器已安装malatang-https-bootstrap.timer，每两分钟检查一次域名IPv4地址。确认只解析到SERVER_IPV4后，使用已有生产ACME账号申请证书，验证Nginx配置后启用443和HTTP→HTTPS跳转。成功后该初始化定时器自动停用；证书续期由原有snap.certbot.renew.timer处理。当前尚未签发该域名证书，也未完成真实HTTPS访问验证。

申请失败至少间隔3小时再试，避免高频请求；如有人修改了本站HTTP配置，脚本会拒绝覆盖。无需更改现有站点证书。

## 服务器位置

- 当前静态目录：`/var/www/malatang.oneplums.cn/current`
- 独立版本目录：`/var/www/malatang.oneplums.cn/releases/20261103T085322Z`
- Nginx配置：`/etc/nginx/sites-available/malatang.oneplums.cn`
- 初始化脚本：`/usr/local/sbin/malatang-enable-https`
- 初始化状态与HTTP配置备份：`/var/lib/malatang-deploy/`
- 访问/错误日志：`/var/log/nginx/malatang.access.log`、`/var/log/nginx/malatang.error.log`

查看HTTPS等待/申请日志：

```sh
journalctl -u malatang-https-bootstrap.service -n 30 --no-pager
systemctl status malatang-https-bootstrap.timer --no-pager
```

DNS生效后可手动触发一次检查：

```sh
systemctl start malatang-https-bootstrap.service
```

停止HTTPS初始化检查：

```sh
systemctl disable --now malatang-https-bootstrap.timer
```

静态部署仅提供当前模拟器功能；原站后台接口未恢复，/api/返回503并由前端采用内置数据。没有新增Node或Docker服务。访问地址解析后为http://malatang.oneplums.cn/，证书启用后为https://malatang.oneplums.cn/。

## 后续更新：2026-11-03

域名A记录已生效，HTTPS初始化任务成功并自动停用。公网浏览器TLS验证通过。图标修正版当前版本为 `20261103T090810Z`，上一版本保留在releases目录。原文“等待DNS/证书”段落为首次部署时状态，已由此条更新取代。

## 搭子小馆合集：2026-11-03

已发布四个新游戏及五店首页，当前版本 `20261103T095931Z`，保留 `20261103T090810Z` 供回退。使用hash入口，无需修改HTTPS或Nginx重写。线上手机/桌面共10组游戏流程通过。

## 每日金币与会员（最新）

当前版本 `20261103T112758Z`，上一版本 `20261103T105249Z` 保留。每日自动100金币、下单消费、取消退款与累计消费会员已上线。44个发布文件校验通过，线上五店和数据边界验证通过。服务继续使用原Nginx静态站点，未修改其他站点。当前HTTPS已启用，首次部署时的DNS/证书等待说明为历史。

## 用餐互动精修（最新）

当前 `20261103T141421Z`，上一版 `20261103T112758Z` 保留。48个发布文件验证通过，五店用餐、可选音效及减少动效已上线，手机与桌面线上回归通过。金币规则保持每日礼金和累计消费会员。

## 烧烤修正（2026-11-04，最新）

当前 `20261104T004029Z`，上一版 `20261103T141421Z` 保留。50个静态文件校验通过，待烤/上炉分离、专用串型与裸露烤网已上线。线上手机/桌面六串交互及五店付费用餐回归通过。

## 其余四店修正（最新）

当前 `20261104T014034Z`，上一版 `20261104T004029Z` 保留。52个静态文件验证通过，杯/饼/锅/碗画面与流程已统一修正，手机与桌面专项及五店回归通过。

## 制作信息就地显示（最新）

当前 `20261104T021257Z`，上一版 `20261104T014034Z` 保留。52文件校验通过，串、锅内食材、早餐和碗内食材增加就地信息；线上手机/桌面回归通过。

## 烧烤食物动效（最新）

当前 `20261104T024402Z`，上一版 `20261104T021257Z` 保留。54文件校验，食物连续熟化与翻面/撒料动效上线，手机与桌面实际动效帧及五店流程回归通过。

## 直接点串翻面（最新）

当前 `20261104T025035Z`，上一版 `20261104T024402Z` 保留。移除正反面和百分比展示，直接点击即可翻面。54文件验证、线上手机与桌面专项通过。

## 直接点食物操作（最新）

当前20261104T031238Z，上一版20261104T025035Z保留。54文件SHA与字节数校验、线上390/1280四店直接操作与烧烤回归通过。退款、余额不足、键盘、暂停与减少动效通过。

## 三店食物动效精修（最新）

当前20261104T032309Z，上一版20261104T031238Z保留。55文件校验，线上390/1280动效、四店吃喝与烧烤回归通过。实际手机视口操作录屏已保存。

## 麻辣烫夹菜与用餐动效（最新）

当前20261104T051151Z，上一版20261104T032309Z保留。57文件校验，线上390/1280麻辣烫专项、四店吃喝与烧烤回归及动效边界通过。正式站点手机视口实际操作录屏已保存。

## 五店整体检查与统一（最新）

当前20261104T053057Z，上一版20261104T051151Z保留。59文件SHA与字节验证；线上320/390/横屏844/1280五店20组流程及触摸、满盘命中、动效、金币回归通过。

## 正式构建/HTTP2/哈希缓存（最新）

当前20261104T065934Z，上一版20261104T053057Z保留。37产物（含gzip）校验，哈希资源共享保存在shared/assets，保留旧哈希；本域Nginx开启HTTP2和静态gzip，HTML no-cache。配置备份在backups/nginx-before-20261104T065934Z.conf，需完整回退时先切旧release，再按需恢复该配置并nginx -t/reload。不要清空shared/assets。构建依赖以package-lock.json固定，npm ci后npm run build:static。PWA本轮不加。

## CSS/推荐/分享精修（最新）

当前20261104T073554Z，上一版20261104T065934Z保留。39文件验证，共享哈希资产保留，Nginx/HTTP2缓存策略不变。公开share-cover-v1.png及sitemap.xml已验证；线上推荐/五店/缓存/钱包回归通过。
