# 彼慕智造公司门户

中文响应式公司门户第一期：14 个主要页面，包含 BCDT / BCDC / BCV 产品详情、解决方案、四个工程案例详情、资源中心、公司介绍与咨询入口。

正式公司域名：`bim-u.com`（用户确认）。网站规范地址为 `https://bim-u.com/`，已用于页面 metadataBase 和 canonical；这不代表域名已完成解析或上线。产品访问及下载地址仍需分别确认，不从公司域名推测产品子域名。

## 本地运行

Node.js 22.13+，使用 npm。首次执行 `npm ci`，然后 `npm run dev`；发布前执行 `npx tsc --noEmit` 和 `npm run build`。

## 内容维护

- `components/portal/home.tsx`：首页主视觉、场景、案例、产品与媒体入口。
- `components/portal/chrome.tsx`：共用导航、移动菜单和页脚。
- `components/portal/ui.tsx`：页面主视觉、标题、行动入口和建筑线框动画。
- `lib/products.ts`、`lib/projects.ts`：有来源的产品状态、功能和案例内容。
- `app/products/`、`app/projects/`：产品与案例独立页面。
- `app/solutions/`、`app/resources/`、`app/about/`、`app/contact/`：解决方案、资源、公司与咨询页面。
- `app/portal.css`、`app/pages.css`、`app/responsive.css`：共用视觉、详情页和响应式布局。
- `public/images/`：原始公司标识与宣传册项目图片。
- `public/bimu-2026.pdf`：用户提供的完整宣传册。
- `public/media/`：4 支适合网页播放的 MP4、海报和可选 VTT 字幕；视频不预加载，点击播放。

既有 `app/portal.tsx`、`app/sections.tsx` 和 `app/globals.css` 保留为上一版源文件，不再由当前入口使用。

产品没有填入未经确认的对外访问地址或安装包下载地址。咨询页面可按项目、演示、内测、开通或支持整理需求，生成邮件草稿或复制正文；由用户在邮件应用中确认发送，不自动发送邮件，也不显示服务器收件成功。门户自身不提供模型上传、账号认证或料单管理，产品能力说明不代表门户集成了产品服务。

## 内容依据

公司品牌、2013 起始年份、服务、项目图片、电话和地址来自用户提供的《彼慕智造2026.pdf》。服务对应第 5–9 页；德清对应第 11–12、42 页；阜阳对应第 13、43 页；温岭对应第 10、44 页；深圳机场卫星厅对应第 38 页；联系方式对应第 68 页。

BCDC 定位依据本地 CWOS 产品开发 README 与 BCDC 外部访问网关适配文档；BCDT 定位依据本地 CW-R README；BCV 定位依据本地 BCV README。公司全称及邮箱由 BCDT 产品资料确认。没有对外展示内部数据库、开发路径、技术凭据或未签名安装包。

宣传册中的经济收益估算未作为普遍承诺使用。三个产品以各自有依据的能力呈现，不宣称它们已实现自动集成。对外产品入口待公司提供后接入。

本项目绑定现有 Sites 项目，发布时保留仅所有者可访问的范围；正式域名和公开访问须按实际托管配置单独核准。部署状态以 Sites 返回结果为准。

## 检查与媒体维护

- `node node_modules/typescript/bin/tsc --noEmit --incremental false`：类型检查。
- 启动本地服务后执行 `node scripts/check-site.mjs`：校验 14 页、内部链接与锚点、静态资源、VTT 和视频 Range；可用 `BASE_URL` 指定服务地址。
- `node scripts/render-checks.mjs`：使用已有 Playwright 做本地无界面渲染，核对桌面与手机宽度、图片和运行时错误；通过 `PLAYWRIGHT_PACKAGE` 可指定已有运行时依赖位置。
- `scripts/prepare-media.py`：复现网页媒体转换；原始视频不被覆盖。网页公司片采用已生成的原创 Precision Lines 配乐，保留原女声；三支产品片保留各自原创配乐。
- `output/implementation/`：本地媒体来源、HTTP 和渲染检查报告。`output/`、`video-production/` 不纳入站点源码发布；仅经过筛选的 `public/` 文件作为网站资源。

演示录制于 2026-09-06，产品事实核对日期为 2026-10-03；页面将历史演示与产品当前使用范围分别说明。BCV 保留内测状态，未发布未核准的安装包。自动建模和 BCDC 规划中心位于产品研发路线，不标作已可使用功能。
