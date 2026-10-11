'use client';
import { Localized } from '@/components/portal/locale';
import { ProjectFilter } from '@/components/portal/project-filter';
import {
  ActionLink,
  ContactBand,
  PageHero,
  SectionHeading,
} from '@/components/portal/ui';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <Localized>
      {
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
              title="完整工程业绩"
              description="共 34 个业绩项目，43 张项目图片。"
            />
            <ProjectFilter projects={projects} />
            <p className="muted">
              业绩资料依据公司宣传册第 34–67 页，英文项目名为参考译名。
            </p>
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
      }
    </Localized>
  );
}
