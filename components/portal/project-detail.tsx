import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { type Project, projects } from '@/lib/projects';
import {
  ActionLink,
  ContactBand,
  PageHero,
  SectionHeading,
} from '@/components/portal/ui';

export function ProjectDetail({ project }: { project: Project }) {
  const related = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <main id="main-content">
      <PageHero
        eyebrow={`${project.category} / ${project.location}`}
        title={project.name}
        description={project.subtitle}
        image={project.image}
      >
        <ActionLink href="/contact?intent=project">交流类似项目</ActionLink>
        <ActionLink href="/projects" secondary>
          全部工程实践
        </ActionLink>
      </PageHero>

      <section
        className="section container case-body"
        aria-labelledby="case-background"
      >
        <div className="metric-strip">
          <div>
            <span className="eyebrow">项目地点</span>
            <p>{project.location}</p>
          </div>
          <div>
            <span className="eyebrow">建筑类型</span>
            <p>{project.category}</p>
          </div>
          <div>
            <span className="eyebrow">彼慕服务</span>
            <p>{project.service}</p>
          </div>
        </div>
        <div className="split">
          <div>
            <p className="eyebrow">01 / PROJECT CONTEXT</p>
            <h2 id="case-background">项目背景</h2>
          </div>
          <div>
            <p>{project.background}</p>
            <p className="muted">{project.summary}</p>
          </div>
        </div>
      </section>

      <section
        className="section dark-section"
        aria-labelledby="case-responsibility"
      >
        <div className="container split">
          <div>
            <p className="eyebrow">02 / OUR ROLE</p>
            <h2 id="case-responsibility">彼慕承担的工作</h2>
          </div>
          <div>
            <p>{project.responsibility}</p>
            <div>
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="case-method">
        <div className="split">
          <div>
            <p className="eyebrow">03 / TECHNICAL APPROACH</p>
            <h2 id="case-method">工程难点与技术方法</h2>
          </div>
          <p>{project.challenge}</p>
        </div>
        {project.methods.length > 0 && (
          <div className="grid-2">
            {project.methods.map((method, index) => (
              <article className="panel" key={method.title}>
                <p className="eyebrow">0{index + 1}</p>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section container" aria-labelledby="case-delivery">
        <div className="split">
          <div>
            <p className="eyebrow">04 / PROJECT OUTCOMES</p>
            <h2 id="case-delivery">交付与公开成果</h2>
          </div>
          <div>
            <p>{project.delivery}</p>
            {project.outcomes.length > 0 && (
              <ul className="feature-list">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <Check size={18} aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <aside className="quote-block" aria-label="项目资料来源">
          <p className="eyebrow">资料来源</p>
          <p>
            项目图片、服务范围与技术内容依据《彼慕智造 2026》公司宣传册第{' '}
            {project.sourcePages} 页。
          </p>
          <p className="muted">
            本页记录工程技术服务经验。数字产品的功能与使用条件，请参阅产品中心。
          </p>
          <a
            className="text-link"
            href={`/bimu-2026.pdf#page=${project.sourcePage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            阅读项目原始介绍 <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </aside>
      </section>

      <section className="section container" aria-label="更多工程实践">
        <SectionHeading eyebrow="MORE PROJECTS" title="继续了解工程实践" />
        <div className="project-grid">
          {related.map((item) => (
            <Link
              className="project-card"
              key={item.slug}
              href={`/projects/${item.slug}`}
            >
              <div className="project-image">
                <Image
                  src={item.image}
                  alt={`${item.name}建筑外观`}
                  width={1600}
                  height={1000}
                  unoptimized
                  loading="lazy"
                />
              </div>
              <div className="project-info">
                <p className="eyebrow">
                  {item.location} / {item.category}
                </p>
                <h3>
                  {item.name} <ArrowUpRight size={20} aria-hidden="true" />
                </h3>
                <p>{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/projects">
          <ArrowLeft size={17} aria-hidden="true" /> 返回全部案例
        </Link>
      </section>
      <ContactBand
        title="把项目难点带到讨论中。"
        description="从建筑效果、材料条件与交付需求开始，一起明确适合项目的技术服务范围。"
      />
    </main>
  );
}
