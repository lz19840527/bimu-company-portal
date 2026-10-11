import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ActionLink, PageHero, SectionHeading } from '@/components/portal/ui';
import { MediaPlayer } from '@/components/portal/media';
import type { Product } from '@/lib/products';

export function ProductDetail({ product }: { product: Product }) {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={`数字产品 / ${product.id}`}
        title={product.tagline}
        description={product.summary}
      >
        <div className="product-identity">
          <span className="tag">
            {product.id} {product.name}
          </span>
          <span className="status">{product.status}</span>
        </div>
        <div className="actions">
          <ActionLink href={product.action.href}>
            {product.action.label}
          </ActionLink>
          <ActionLink href="#demo" secondary>
            观看产品演示
          </ActionLink>
        </div>
      </PageHero>

      <section className="section container" aria-label="典型工作流程">
        <SectionHeading
          eyebrow="WORKFLOW / 典型流程"
          title={product.workflowTitle}
        />
        <div className="product-audience">
          <span className="muted">适用角色</span>
          {product.audience.map((role) => (
            <span className="tag" key={role}>
              {role}
            </span>
          ))}
        </div>
        <div className="workflow grid-4">
          {product.workflow.map((step, index) => (
            <article className="workflow-step panel" key={step.title}>
              <span className="step-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section section-tint"
        aria-label={`${product.id} 功能分组`}
      >
        <div className="container">
          <SectionHeading
            eyebrow="CAPABILITIES / 功能范围"
            title="围绕真实工作，组织常用能力。"
          />
          <div className="grid-2">
            {product.groups.map((group) => (
              <article className="feature-group panel" key={group.title}>
                <h3>{group.title}</h3>
                <p className="muted">{group.description}</p>
                <ul className="feature-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" /> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section container"
        aria-label={`${product.id} 真实产品界面`}
      >
        <div className="split product-screen-section">
          <div>
            <SectionHeading
              eyebrow="IN PRACTICE / 真实界面"
              title={product.screenTitle}
              description={product.screenDescription}
            />
            <p className="muted">
              界面记录于 2026-09-06，后续版本可能有所调整。
            </p>
            <a className="text-link" href="#demo">
              在演示中了解工作方式 <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <figure className={`product-screen product-screen-${product.slug}`}>
            <Image
              src={product.image}
              alt={`${product.id} ${product.name}真实操作界面`}
              loading="lazy"
              width={1280}
              height={800}
              unoptimized
            />
            <figcaption>
              {product.id} · {product.name}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="section container detail-section"
        aria-label="输入与输出"
      >
        <SectionHeading
          eyebrow="INPUT & OUTPUT / 工作成果"
          title="需要准备什么，可以得到什么。"
        />
        <div className="grid-2 product-io">
          <article className="panel">
            <p className="eyebrow">01 / 输入</p>
            <h3>开始前准备</h3>
            <ul className="feature-list">
              {product.inputs.map((item) => (
                <li key={item}>
                  <ArrowRight size={16} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="panel">
            <p className="eyebrow">02 / 输出</p>
            <h3>工作中的成果</h3>
            <ul className="feature-list">
              {product.outputs.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        className="section dark-section"
        id="demo"
        aria-label={`${product.id} 产品演示`}
      >
        <div className="container">
          <SectionHeading
            eyebrow="PRODUCT FILM / 产品演示"
            title={`走进 ${product.id} 的工作流程。`}
            description={product.demoNote}
          />
          <MediaPlayer
            src={product.video.src}
            poster={product.video.poster}
            title={`${product.id} ${product.name}功能演示`}
            captions={product.video.captions}
            recorded="2026-09-06"
            duration={product.video.duration}
          />
        </div>
      </section>

      <section className="section container" aria-label="使用条件与常见问题">
        <div className="split product-conditions">
          <div>
            <SectionHeading
              eyebrow="GETTING STARTED / 使用条件"
              title="让工具适合您的工作。"
              description="从实际项目、资料和使用环境出发，确认适配范围。"
            />
            <div className="panel product-version">
              <span className="status">{product.status}</span>
              <h3>{product.version}</h3>
              <p className="product-environment">{product.environment}</p>
              <p className="muted">{product.versionNote}</p>
              <p className="muted product-update-date">
                产品信息更新：2026-10-03
              </p>
            </div>
          </div>
          <div className="faq-list">
            {product.faqs.map((faq, index) => (
              <details
                className="faq-item"
                key={faq.question}
                open={index === 0}
              >
                <summary>
                  {faq.question}
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-tint product-contact"
        aria-label="产品咨询"
      >
        <div className="container split">
          <div>
            <p className="eyebrow">NEXT STEP / 下一步</p>
            <h2>从您的实际工作开始。</h2>
            <p className="muted">
              告诉我们典型项目、使用角色与想解决的问题，一起确认 {product.id}{' '}
              的适用方式。
            </p>
          </div>
          <div className="actions">
            <ActionLink href={product.action.href}>
              {product.action.label}
            </ActionLink>
            <ActionLink href="/products" secondary>
              查看全部产品
            </ActionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
