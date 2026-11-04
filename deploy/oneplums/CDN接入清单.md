# 国内 CDN 接入准备

用户当前没有CDN账号，本轮没有创建付费资源、没有改DNS、没有声称已启用CDN。现有源站保留直连HTTPS。

开通具备中国内地节点的CDN服务后：

1. 加速域名 fandazi.oneplums.cn，源站真实地址仅在服务商控制台填写，不提交Git；回源Host/SNI保持 fandazi.oneplums.cn，HTTPS回源并校验证书。
2. 上传加速域名证书并开启HTTP/2、Brotli；/assets/哈希资源缓存365天；HTML/ops.html不强缓存；/api/*、/.well-known/*不缓存；/api/ops与/ops.html可配置访问限制。
3. 保留Content-Type、Content-Encoding、Vary、Cache-Control及安全响应头，缓存键考虑Accept-Encoding，不能把.br误发给不支持的客户端。
4. 不缓存管理认证头、点评POST和native一次性票据；release-manifest.json与.map维持404。旧域名保留迁移，不直接301。
5. 先用服务商分配CNAME/测试域核验冷热缓存、五店、PNG、迁移、点评，再把DNS从A切到该CNAME。按服务商要求确认备案与域名归属。
6. 若要隐藏源站，需同时限制源站只允许可信CDN回源流量；仅从Git删掉IP无法撤回历史或隐藏DNS已公开的信息。不要直接限制现有其他站点。

验收须从多个实际国内网络重复测DNS/TCP/TLS/TTFB及首个可操作画面，区分代理、冷缓存、热缓存和服务端本机；不把加载占位的FCP当游戏已可操作。
