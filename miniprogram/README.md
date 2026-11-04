# 微信 WebView 验证工程

当前 AppID 仍在申请，工程使用 touristappid 占位，未上传/发布、未做真机微信验收。

微信开发者工具导入本目录，换成申请后的真实 AppID，确认账号具备 web-view 和业务域名权限，业务域名填 https://fandazi.oneplums.cn ，上传微信要求的域名校验文件。request/downloadFile合法域名也配置同域名。服务端只使用HTTPS；不要在生产关闭域名校验。

首页先提供麻辣烫、烧烤两家。H5不打进主包；店铺入口与存档/相册桥接放shops分包，源码远小于2MB（最终大小以开发者工具上传统计为准）。原站其他游戏仍在H5可访问，不作为本轮小程序主入口。

## 原生桥接

- 分享菜单用原生 onShareAppMessage，分享返回小程序页面与同域分享封面。
- H5通过官方JS-SDK wx.miniProgram.postMessage排队发送白名单本机存档；原生web-view bindmessage接到后写入wx.setStorage。此事件在返回、销毁、分享等时机派发，不能声称每次post立即确认落盘。
- 用户主动点击“带回小程序保存的存档”，原生读取wx.getStorage，通过同源内容服务换取5分钟一次性恢复票据，再进入H5恢复。已有消费的新站记录不覆盖。
- H5保存小票时，小程序环境将PNG换成一次性票据，打开原生桥接页downloadFile并调用saveImageToPhotosAlbum；权限失败可回H5长按保存。图片/恢复票据仅保留服务内存，限量且5分钟过期。

待AppID可用后需实机核验：业务域名资格、JS-SDK环境识别、postMessage实际派发时机、退出/重开存档、微信相册授权及拒绝、原生分享、iOS/安卓WebView渲染、主包及分包大小。H5浏览器通过不等于上述微信验收。
