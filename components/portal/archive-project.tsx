'use client';
import { Localized } from '@/components/portal/locale';
import { ActionLink, PageHero, ContactBand } from './ui';
import { ProjectGallery } from './project-gallery';
import type { Project } from '@/lib/projects';
export function ArchiveProject({ project }: { project: Project }) {
  return (
    <Localized>
      {
        <main id="main-content">
          <PageHero
            eyebrow={`工程业绩 / ${project.category}`}
            title={project.name}
            description={project.service}
            image={project.image}
          >
            <ActionLink href="/contact?intent=project">交流类似项目</ActionLink>
            <ActionLink href="/projects" secondary>
              全部业绩
            </ActionLink>
          </PageHero>
          <section className="section container split">
            <div>
              <p className="eyebrow">ENGINEERING SERVICES</p>
              <h2>工程服务范围</h2>
              <p className="large-copy">{project.service}</p>
              <div className="tags">
                <span className="tag">{project.category}</span>
                <span className="tag">宣传册页码 · {project.brochurePage}</span>
              </div>
            </div>
            <div className="prose">
              <p>
                此项目的公开资料包括项目影像和服务范围。具体工作内容可与彼慕进一步沟通。
              </p>
              <p className="muted">
                本页根据公司宣传册整理，不将工程服务经历等同于数字产品部署记录。
              </p>
              <a
                className="text-link"
                href={`/bimu-2026.pdf#page=${project.brochurePage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                阅读项目原始介绍 ↗
              </a>
            </div>
          </section>
          <ProjectGallery name={project.name} images={project.images || []} />
          <ContactBand title="你的项目，面对怎样的技术难题？" />
        </main>
      }
    </Localized>
  );
}
