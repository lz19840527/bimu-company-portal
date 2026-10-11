'use client';
import { Localized } from '@/components/portal/locale';
import { ArrowUpRight, Download, FileText, MonitorPlay } from 'lucide-react';
import { PageHero, SectionHeading, ContactBand } from '@/components/portal/ui';
import { MediaPlayer } from '@/components/portal/media';

const videos = [
  {
    id: 'bcdt',
    title: 'BCDT · 幕墙设计与加工资料',
    duration: '03:50',
    note: '11 类模块，按设计到交付的业务流程展开。',
  },
  {
    id: 'bcdc',
    title: 'BCDC · 工程数据组织与追溯',
    duration: '02:40',
    note: '项目、料单、材料、文件与知识的实际业务界面。',
  },
  {
    id: 'bcv',
    title: 'BCV · 移动模型查看与测量',
    duration: '03:00',
    note: 'Android 实际界面，包含点到线、点到面与面积测量。',
  },
];

export default function ResourcesPage() {
  return (
    <Localized>
      {
        <main id="main-content">
          <PageHero
            eyebrow="RESOURCES / 资源中心"
            title="让理解，更直观。"
            description="公司影像、产品演示与技术资料，帮助你了解彼慕的工作方式。"
          />
          <section className="section container" id="company-film">
            <SectionHeading
              eyebrow="01 / COMPANY FILM"
              title="200 秒，认识彼慕智造。"
              description="从工程经验，到设计、数据与现场的数字化路径。"
            />
            <MediaPlayer
              src="/media/company-film.mp4"
              poster="/media/company-poster.jpg"
              title="彼慕智造公司宣传片"
              captions="/media/company-film.vtt"
              duration="03:20"
              recorded="影像制作于 2026 年 9 月 · 网页版原创配乐"
            />
          </section>
          <section className="section tint-section" id="product-videos">
            <div className="container">
              <SectionHeading
                eyebrow="02 / PRODUCT DEMOS"
                title="在真实界面中，了解每款产品。"
                description="演示录制于 2026 年 9 月 6 日。功能与使用范围请结合对应产品页的当前说明。"
              />
              <div className="resource-video-list">
                {videos.map((v) => (
                  <article key={v.id}>
                    <div className="resource-video-copy">
                      <span className="resource-product-id">
                        {v.id.toUpperCase()}
                      </span>
                      <h3>{v.title}</h3>
                      <p>{v.note}</p>
                      <p className="muted">功能讲解与操作片段 · 中文字幕</p>
                      <a className="text-link" href={`/products/${v.id}`}>
                        产品说明
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                    <MediaPlayer
                      src={`/media/${v.id}-demo.mp4`}
                      poster={`/media/${v.id}-poster.jpg`}
                      title={v.title}
                      captions={`/media/${v.id}-demo.vtt`}
                      duration={v.duration}
                      recorded="录制于 2026-09-06"
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="section container">
            <SectionHeading
              eyebrow="03 / DOWNLOADS & GUIDES"
              title="把资料，带回你的工作中。"
            />
            <div className="grid-3">
              <a
                className="resource-download panel"
                href="/bimu-2026.pdf"
                download="彼慕智造2026.pdf"
              >
                <FileText size={30} />
                <h3>2026 公司宣传册</h3>
                <p>公司服务、数字工法、数字孪生方向与项目业绩。</p>
                <span className="text-link">
                  下载 PDF <Download size={17} />
                </span>
              </a>
              <a className="resource-download panel" href="/products">
                <MonitorPlay size={30} />
                <h3>产品使用范围</h3>
                <p>查看适用角色、支持环境、版本与当前体验方式。</p>
                <span className="text-link">
                  浏览产品 <ArrowUpRight size={17} />
                </span>
              </a>
              <a
                className="resource-download panel"
                href="/contact?intent=support"
              >
                <FileText size={30} />
                <h3>安装与技术支持</h3>
                <p>已有用户可联系彼慕，获取适配版本及使用帮助。</p>
                <span className="text-link">
                  联系技术支持 <ArrowUpRight size={17} />
                </span>
              </a>
            </div>
          </section>
          <ContactBand
            title="需要结合你的项目，看一次演示？"
            description="告诉我们工作场景，我们会与你沟通适合的产品和使用范围。"
          />
        </main>
      }
    </Localized>
  );
}
