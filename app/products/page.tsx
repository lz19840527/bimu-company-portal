import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import {
  ActionLink,
  ContactBand,
  PageHero,
  SectionHeading,
} from '@/components/portal/ui';
import { productRoadmap, products } from '@/lib/products';

export const metadata = {
  alternates: { canonical: '/products' },
  title: '数字产品｜BCDT · BCDC · BCV',
  description:
    '了解彼慕智造 BCDT 幕墙设计工具、BCDC 工程数据中心与 BCV 移动模型浏览器，选择适合设计、资料管理与现场核对的产品。',
};

export default function ProductsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="DIGITAL PRODUCTS / 数字产品"
        title="让工程经验，成为日常可用的工具。"
        description="从深化设计，到项目资料，再到现场模型核对。彼慕智造围绕工程中的具体问题，持续打磨三款数字产品。"
      >
        <div className="actions">
          <ActionLink href="#product-list">找到适合的产品</ActionLink>
          <ActionLink href="#roadmap" secondary>
            了解研发方向
          </ActionLink>
        </div>
      </PageHero>

      <section
        className="section container"
        id="product-list"
        aria-label="三款数字产品"
      >
        <SectionHeading
          eyebrow="THREE TOOLS / 三款产品"
          title="选择您正在解决的问题。"
          description="查看各产品的功能、使用环境与当前开放方式。"
        />
        <div className="product-grid grid-3">
          {products.map((product) => (
            <article className="product-card panel" key={product.id}>
              <a
                href={`/products/${product.slug}`}
                className={`product-card-image product-card-image-${product.slug}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={product.image}
                  alt=""
                  loading="lazy"
                  width={960}
                  height={600}
                  unoptimized
                />
              </a>
              <div className="product-card-content">
                <div className="product-card-topline">
                  <span className="eyebrow">{product.id}</span>
                  <span className="status">{product.status}</span>
                </div>
                <h2>
                  <a href={`/products/${product.slug}`}>{product.name}</a>
                </h2>
                <p>{product.summary}</p>
                <ul className="feature-list">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="product-card-audience muted">
                  适合 {product.audience.join('、')}
                </p>
                <a className="text-link" href={`/products/${product.slug}`}>
                  了解 {product.id} <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section dark-section" aria-label="产品之间的业务关系">
        <div className="container">
          <SectionHeading
            eyebrow="WORKING TOGETHER / 业务关系"
            title="设计成果、项目资料、现场核对。"
            description="三款产品服务工程中的不同环节，让团队在各自的工作场景中找到合适的工具。"
          />
          <div className="grid-3 product-relationship">
            {products.map((product, index) => (
              <article className="workflow-step" key={product.id}>
                <span className="step-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <p className="eyebrow">{product.id}</p>
                <h3>{product.stage}</h3>
                <p>
                  {
                    [
                      '从模型与构件出发，组织深化信息和加工资料。',
                      '围绕项目整理材料、文件、版本与知识资料。',
                      '在移动端查看模型，核对构件属性与空间关系。',
                    ][index]
                  }
                </p>
              </article>
            ))}
          </div>
          <p className="relationship-note">
            现阶段通过成果文件、受控交付与项目资料组织连接业务。自动同步、统一账号及跨产品实时联动，仍需按具体场景逐步验证。
          </p>
        </div>
      </section>

      <section className="section container" aria-label="产品适配参考">
        <SectionHeading
          eyebrow="FIND YOUR FIT / 适配参考"
          title="先看工作场景，再看产品选择。"
        />
        <div className="product-comparison-wrap">
          <table className="product-comparison">
            <caption className="sr-only">
              BCDT、BCDC、BCV 的适用角色、工作环境和开放方式对照
            </caption>
            <thead>
              <tr>
                <th scope="col">产品</th>
                <th scope="col">适合的工作</th>
                <th scope="col">使用环境</th>
                <th scope="col">下一步</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">
                    <a href={`/products/${product.slug}`}>
                      {product.id}
                      <span>{product.name}</span>
                    </a>
                  </th>
                  <td>
                    {product.stage}
                    <span className="muted">{product.audience.join('、')}</span>
                  </td>
                  <td>{product.environment}</td>
                  <td>
                    <a className="text-link" href={product.action.href}>
                      {product.action.label}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="section section-tint"
        id="roadmap"
        aria-label="研发与路线"
      >
        <div className="container">
          <SectionHeading
            eyebrow="RESEARCH & ROADMAP / 研发与路线"
            title="从已验证的工作，走向下一步。"
            description="持续围绕设计自动化、资料关联与现场协作展开研发。以下为阶段进展与方向，开放范围将随实际验证更新。"
          />
          <div className="roadmap-grid grid-3">
            {productRoadmap.map((item) => (
              <article className="roadmap-card panel" key={item.title}>
                <span className="status">{item.status}</span>
                <h3>{item.title}</h3>
                <p>{item.problem}</p>
                <dl>
                  <dt>目前进展</dt>
                  <dd>{item.progress}</dd>
                  <dt>下一步</dt>
                  <dd>{item.next}</dd>
                </dl>
              </article>
            ))}
          </div>
          <p className="muted product-update-date">
            路线信息更新：2026-10-03。自动建模作为现有产品与工程服务的能力延伸，按适用范围逐步推进。
          </p>
        </div>
      </section>

      <ContactBand
        title="带着一个具体问题，与我们聊聊。"
        description="无论是模型深化、资料整理，还是现场核对，都可以从实际项目与典型工作开始确认适配方式。"
      />
    </main>
  );
}
