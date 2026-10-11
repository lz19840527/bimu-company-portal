import type { Metadata } from 'next';
import { ProjectFilter } from '@/components/portal/project-filter';
import {
  ActionLink,
  ContactBand,
  PageHero,
  SectionHeading,
} from '@/components/portal/ui';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: '工程实践',
  description:
    '了解德清科技新城、阜阳科技文化中心、温岭博物馆、深圳机场卫星厅的幕墙技术服务实践与公开成果。',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="ENGINEERING PRACTICE"
        title="让工程经验，成为下一次判断的依据。"
        description="从复杂表皮到大型公共建筑，了解彼慕承担的工作、采用的技术方法与公开成果。"
        image="/images/deqing.jpg"
      >
        <ActionLink href="/contact?intent=project">沟通项目需求</ActionLink>
      </PageHero>
      <section className="section container">
        <SectionHeading
          eyebrow="SELECTED PROJECTS"
          title="从真实项目中了解彼慕"
          description="按建筑类型浏览，进一步查看各项目的技术服务范围与资料来源。"
        />
        <ProjectFilter projects={projects} />
        <p className="muted">
          项目图片与服务范围来自《彼慕智造
          2026》公司宣传册。案例介绍聚焦工程技术服务经验。
        </p>
      </section>
      <ContactBand
        title="你的项目，面对怎样的技术难题？"
        description="提供项目阶段、建筑图纸与当前难点，我们一起梳理服务范围和成果要求。"
      />
    </main>
  );
}
