# 交付物与媒体说明

整理日期：2026-10-22。网站源码及四支网页视频纳入 Git；历史高质量原片和中间渲染保留本地，不批量上传 `output/` 或 `video-production/`。下面明确区分 Git 内文件、历史本地交付和待后续实施的功能。

## 网站与源码

- 最近一次发布记录：2026-10-11，版本 2，<https://bimu-portal.early-wren-9437.chatgpt.site>，当时仅所有者可访问。
- 对应已发布源码：`67d5ffb3e904143454188469a5524758402caf87`。本次文档提交在该基线之上，不改变该历史发布指向。
- 运行及维护入口见 [README](../README.md)；完整宣传册见 [PDF](../public/bimu-2026.pdf)。
- 全部项目名称、页码和图片数见[业绩清单](portfolio.md)。

## Git 内可直接取得的网页媒体

| 视频 | 时长 | Git 内文件 | 字幕 |
| --- | ---: | --- | --- |
| 公司宣传片 · 门户原创配乐版 | 200 秒 | [company-film.mp4](../public/media/company-film.mp4) | [VTT](../public/media/company-film.vtt) |
| BCDT 产品功能演示 | 230 秒 | [bcdt-demo.mp4](../public/media/bcdt-demo.mp4) | [VTT](../public/media/bcdt-demo.vtt) |
| BCDC 产品功能演示 | 160 秒 | [bcdc-demo.mp4](../public/media/bcdc-demo.mp4) | [VTT](../public/media/bcdc-demo.vtt) |
| BCV 产品功能演示 | 180 秒 | [bcv-demo.mp4](../public/media/bcv-demo.mp4) | [VTT](../public/media/bcv-demo.vtt) |

网页媒体使用 H.264/AAC、1280×720 和点击播放，不在首屏自动加载整段视频；本地高质量原片为 1080p。公司片网页版本保留 v6 画面、女声及中文字幕，将第三方钢琴配乐替换为原创 Precision Lines；三支产品片保留各自原创配乐。英文网页没有改配英文语音，既有视频保持中文内容。

文件大小和 SHA-256 见[网页媒体清单](media/web-media-manifest.json)。该清单的哈希由本次归档直接读取 Git 内文件计算；时长与转换依据来自已有媒体适配记录。

## 高质量本地原片

仓库所在目录为 `E:\Codex\Projects\公司网站`。下面的路径相对于该本地项目，不是 GitHub 下载链接；旧聊天中的 C: 目录是历史路径。

| 成片 | 本地相对路径 |
| --- | --- |
| 120 秒公司片初版 | `output/video/彼慕智造-公司宣传片-120秒.mp4` |
| 120 秒真实界面修订版 | `output/video/v2/彼慕智造-公司宣传片-120秒-真实界面修订版.mp4` |
| 180 秒全模块与业绩快切版 | `output/video/v3/彼慕智造-公司宣传片-180秒-全模块与业绩快切版.mp4` |
| 200 秒品牌片头版 | `output/video/v4/彼慕智造-公司宣传片-200秒-品牌片头完整版.mp4` |
| 200 秒流程与数字建筑版 | `output/video/v5/彼慕智造-公司宣传片-200秒-业务流程与数字建筑版.mp4` |
| 200 秒钢琴配乐版 | `output/video/v6/彼慕智造-公司宣传片-200秒-钢琴配乐版.mp4` |
| BCDT 独立原片 | `output/video/产品独立演示/BCDT-产品功能演示-230秒.mp4` |
| BCDC 独立原片 | `output/video/产品独立演示/BCDC-产品功能演示-160秒.mp4` |
| BCV 独立原片 | `output/video/产品独立演示/BCV-产品功能演示-180秒.mp4` |

## 解说词、字幕与制作说明

- [公司片解说词](media/company-narration.zh.txt)、[公司片 SRT](media/company-subtitles.zh.srt)、[钢琴版本来源说明](media/company-piano-production.md)。
- [BCDT 解说词](media/bcdt-narration.zh.txt)、[SRT](media/bcdt-subtitles.zh.srt)。
- [BCDC 解说词](media/bcdc-narration.zh.txt)、[SRT](media/bcdc-subtitles.zh.srt)。
- [BCV 解说词](media/bcv-narration.zh.txt)、[SRT](media/bcv-subtitles.zh.srt)。
- [独立产品片制作说明、章节与功能目录](media/product-video-production.md)。

上述文件是从既有交付中选择的文本副本，便于离开本机后继续维护；原文件保留。音乐说明记录当时来源及页面标注，不新增版权授权结论。不同历史版本的音乐不同，不应把钢琴原片说明套用于原创配乐网页版本。

## 后续阶段

正式域名绑定、公开访问范围、受控安装包、申请处理与统一账号/产品协同未因本次 Git 归档自动完成。详细边界及待办见[对话整理](conversation-summary.md)。
