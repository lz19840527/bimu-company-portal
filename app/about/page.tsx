import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import {
  PageHero,
  SectionHeading,
  ContactBand,
  ActionLink,
  BuildingSignal,
} from '@/components/portal/ui';
export const metadata: Metadata = {
  title: '关于彼慕',
  description:
    '江苏彼慕智造建筑科技有限公司，专注幕墙、复杂建筑表皮与建筑数字化技术服务，以工程经验推动数字工法与自研产品。',
  alternates: { canonical: '/about' },
};
export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="ABOUT BIMU / 关于彼慕"
        title="理解建筑，更理解如何建造。"
        description="江苏彼慕智造建筑科技有限公司，以工程技术经验为基础，让数字工法服务真实的设计与建造。"
        image="/images/wenling.jpg"
      />
      <section className="section container split about-intro">
        <div>
          <p className="eyebrow">SINCE 2013</p>
          <h2>
            从工程现场出发，
            <br />
            向数字建造前行。
          </h2>
          <div className="large-year">
            2013<span>专注建筑数字工法</span>
          </div>
        </div>
        <div className="prose">
          <p className="large-copy">
            彼慕智造专注建筑幕墙及建筑装饰，围绕设计深化、材料加工、现场实施与竣工交付，提供数字工法与全过程技术服务。
          </p>
          <p>
            从常规幕墙到复杂异形表皮，我们将
            BIM、点云扫描、参数化几何与项目技术经验结合，让建筑效果、材料特性和加工安装条件共同进入设计判断。
          </p>
          <p>
            工程实践中的实际问题，也是自研产品的起点。BCDT、BCDC、BCV
            分别面向深化设计、工程数据组织与模型核对，持续探索更清晰的协作方式。
          </p>
          <ActionLink href="/bimu-2026.pdf" secondary>
            阅读公司宣传册
          </ActionLink>
        </div>
      </section>
      <section className="section tint-section">
        <div className="container">
          <SectionHeading
            eyebrow="OUR APPROACH / 工作方式"
            title="把复杂问题，变成清晰的工程依据。"
          />
          <div className="grid-3">
            {[
              [
                '01',
                '先理解工程',
                '从设计意图、现场条件和交付要求出发，明确真正需要解决的问题。',
              ],
              [
                '02',
                '让信息可核对',
                '以模型、图纸、材料与版本资料为依据，在关键环节保留清晰的判断与交付记录。',
              ],
              [
                '03',
                '把经验变成工具',
                '将重复的专业工作沉淀为数字工法与产品功能，围绕实际项目持续改进。',
              ],
            ].map(([n, t, d]) => (
              <article className="panel principle" key={n}>
                <span className="principle-number">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container split">
        <div>
          <p className="eyebrow">ENGINEERING & TECHNOLOGY</p>
          <h2>专业服务，与产品共同生长。</h2>
          <p className="section-description">
            从点云与复杂表皮，到设计工具和工程数据管理，以真实需求连接技术积累。
          </p>
          <div className="about-links">
            <a className="text-link" href="/solutions">
              技术服务与解决方案
              <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="/products#roadmap">
              产品与研发路线
              <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="/projects">
              工程实践
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="about-signal">
          <BuildingSignal />
          <span>DESIGN / DATA / FIELD</span>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
