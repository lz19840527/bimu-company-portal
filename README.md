# 彼慕智造 BIMU 公司门户

公司门户网站源码及本对话的项目归档。内容基于用户提供的《彼慕智造2026.pdf》与 BCDT、BCDC、BCV 产品资料，包含工程技术服务、数字产品、全部工程业绩、公司和产品视频、资源下载与合作咨询。

归档整理日期：**2026-10-22**。最近一次已记录的网站发布：**2026-10-11 / 版本 2**，对应源码提交 `67d5ffb3e904143454188469a5524758402caf87`。

## 对话与项目文档

| 文档 | 内容 |
| --- | --- |
| [对话整理](docs/conversation-summary.md) | 目标、需求演进、重要决策、交付结果、边界与后续事项 |
| [需求时间线](docs/requirements-timeline.md) | 18 个用户轮次的要求及阶段结果 |
| [交付物与媒体](docs/deliverables.md) | 网站、四支网页视频、原片、字幕、解说词和音乐说明 |
| [全部工程业绩](docs/portfolio.md) | 宣传册第 34–67 页的 34 个项目、43 张图片 |
| [门户规划](docs/portal-plan-2026-10-03.md) | 2026-10-03 的历史规划快照，后续执行结果见对话整理 |

文档是经过整理的记录，不是原始聊天、工具日志或推理记录导出。登录凭据不纳入归档。本仓库保持私有；本次 Git 上传不触发网站重新部署。

## 已有网站

- [最近一次已发布的私有站点](https://bimu-portal.early-wren-9437.chatgpt.site)
- 中文与 English 页面；`/en` 为英文入口，导航可切换语言。
- 每种语言 44 个主要内容页；34 个业绩项目、43 张项目图片，支持分类和双语关键词搜索。
- BCDT / BCDC / BCV 产品页、解决方案、资源中心、关于与咨询入口。
- 公司片 200 秒；BCDT 230 秒、BCDC 160 秒、BCV 180 秒，附海报和中文字幕。
- BCDC 平台入口：`http://146.56.217.147:5556/`。仅接入链接，门户不代为保存账号密码。

正式公司域名为 **bim-u.com**，代码 metadataBase / canonical 使用 `https://bim-u.com/`；最近一次发布记录未确认该域名已实际绑定。私有站点权限与 GitHub 仓库权限分别管理。

## 本地开发

使用 Node.js 22.13+ 与 npm，在仓库根目录执行：

```sh
npm ci
npm run dev
```

类型检查与生产构建：

```sh
node node_modules/typescript/bin/tsc --noEmit --incremental false
npm run build
```

项目使用 React、TypeScript、Vinext 与 Cloudflare Workers。构建后可使用 `npm run start` 启动本地 Wrangler 预览。部署时保留现有 `.openai/hosting.json` 中的 Site 身份；GitHub 是源码和文档归档，不替代 Sites 发布流程。

## 目录与维护入口

| 路径 | 用途 |
| --- | --- |
| `app/` | 页面路由、metadata、sitemap、样式与英文路由 |
| `components/portal/` | 导航、首页、产品、项目、图库、媒体、咨询和语言组件 |
| `components/portal/templates/` | 解决方案、产品总览、工程列表、资源、关于、咨询页面主体 |
| `lib/products.ts` | 产品说明、使用范围、状态和功能 |
| `lib/projects.ts` | 详细案例与完整业绩数据映射 |
| `lib/portfolio.json` | 34 个业绩的中英名称、服务、分类、页码及图片 |
| `lib/i18n.ts`、`lib/translations/` | 路径本地化与英文文案 |
| `app/portal.css`、`app/pages.css`、`app/responsive.css`、`app/bilingual.css` | 共用、详情、响应式和双语适配样式 |
| `public/images/` | 公司标识、产品画面和项目图片 |
| `public/bimu-2026.pdf` | 用户提供的完整公司宣传册 |
| `public/media/` | 四支网页适配视频、海报、VTT 字幕 |
| `docs/` | 对话整理、历史规划、业绩和媒体说明 |
| `scripts/` | 媒体适配、内容提取、HTTP、交互及渲染检查脚本 |

`app/portal.tsx`、`app/sections.tsx` 和 `app/globals.css` 是保留的上一版源文件，当前入口不使用它们。

## 验证记录与检查命令

2026-10-11 的发布记录：类型检查与生产构建通过；HTTP 检查覆盖 98 个页面地址、1,564 个站内链接和 62 个资源，0 个错误；44 个英文路由及 9 项主要交互通过。桌面与手机宽度已检查。98 个访问地址包含参数化地址，不等于独立内容页数量。

启动本地服务后：

```sh
node scripts/check-site.mjs
node scripts/check-bilingual.mjs
node scripts/check-interactions.mjs
```

通过 `BASE_URL` 指定已有本地服务。浏览器检查使用已有 Playwright 运行时；`check-interactions.mjs` 支持 `PLAYWRIGHT_PACKAGE`，`check-bilingual.mjs` 使用编写时的 Windows 运行时路径，换机时应先适配该路径。浏览器检查不会发送邮件，咨询正文复制测试使用模拟剪贴板。

原始生产素材、中间渲染、依赖、缓存和本地检查输出由 `.gitignore` 排除；四支经过筛选的网页视频已经随 `public/` 纳入源码。高质量本地成片的位置和音乐来源见[交付物说明](docs/deliverables.md)。

## 内容边界与后续工作

三产品的业务路径为“BCDT 设计与加工资料 → BCDC 项目数据组织 → BCV 模型与现场核对”，不因此宣称自动同步或统一账号已完成。历史案例体现工程服务经历，不默认等同于软件部署记录。产品演示录制于 2026-09-06，门户产品资料核对基线为 2026-10-03；本次归档不构成最新版本重新验收。

咨询表单整理需求后由用户在邮件应用确认发送，或复制正文；门户不自动发送邮件，不显示虚构的服务器收件成功，不提供模型上传或料单管理工作台。

后续待确认正式域名与对外权限、可公开安装包及产品入口；受控下载、申请处理、FAQ、账号与产品协同属于后续阶段，按实际验收推进。
