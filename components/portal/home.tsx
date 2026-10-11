import {
  ArrowUpRight,
  ArrowRight,
  Layers3,
  Compass,
  ClipboardCheck,
  ScanLine,
  Play,
  Download,
} from 'lucide-react';
import { products } from '@/lib/products';
import { projects } from '@/lib/projects';
import { ActionLink, SectionHeading, ContactBand, BuildingSignal } from './ui';

const scenarios = [
  {
    number: '01',
    icon: Compass,
    title: '复杂表皮，如何落地？',
    description: '从几何分析、表皮拟合到材料与系统选择，让设计回应建造条件。',
    href: '/solutions#complex',
  },
  {
    number: '02',
    icon: Layers3,
    title: '设计成果，如何交付？',
    description: '组织构件、提料与加工资料，让模型中的信息进入工程流程。',
    href: '/products/bcdt',
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: '项目资料，如何追溯？',
    description: '围绕项目管理材料、文件与版本，让团队有据可查。',
    href: '/products/bcdc',
  },
  {
    number: '04',
    icon: ScanLine,
    title: '工作现场，如何核对？',
    description: '在移动端查看模型、定位构件，通过剖切与测量理解空间。',
    href: '/products/bcv',
  },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <img
          className="home-hero-image"
          src="/images/deqing.jpg"
          alt="德清科技新城联合国地信大会永久会址建筑与水面倒影"
          fetchPriority="high"
        />
        <div className="home-hero-shade" />
        <div className="container home-hero-content">
          <p className="eyebrow">
            <span className="live-dot" />
            BIMU · DIGITAL CONSTRUCTION
          </p>
          <h1>
            让建筑的想象，
            <br />
            成为<span>精准的现实。</span>
          </h1>
          <p className="home-hero-description">
            以工程经验和自研工具，
            <br />
            连接深化设计、工程数据与现场核对。
          </p>
          <div className="hero-actions">
            <ActionLink href="/contact?intent=project">沟通项目需求</ActionLink>
            <a className="hero-product-link" href="/products">
              了解数字产品
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="container home-hero-foot">
          <span>
            SINCE 2013 <i /> 建筑数字工法
          </span>
          <span>工程实践 / 德清科技新城</span>
          <a href="#scenarios" aria-label="向下了解业务场景">
            向下探索 ↓
          </a>
        </div>
        <span className="hero-side-label" aria-hidden="true">
          DESIGN · DATA · FIELD
        </span>
      </section>

      <section className="section container" id="scenarios">
        <SectionHeading
          eyebrow="01 / FROM CHALLENGE TO DELIVERY"
          title="从工程问题出发。"
          description="把几何、材料、加工和现场条件放在一起，寻找切实可行的技术路径。"
        />
        <div className="scenario-grid">
          {scenarios.map((s) => (
            <a className="scenario-card" href={s.href} key={s.number}>
              <div className="scenario-top">
                <span>{s.number}</span>
                <s.icon size={26} strokeWidth={1.3} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ArrowUpRight
                size={20}
                className="scenario-arrow"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="section tint-section">
        <div className="container">
          <SectionHeading
            eyebrow="02 / ENGINEERING IN PRACTICE"
            title="在真实项目中，积累专业。"
            description="每一项技术方法，都有具体的建筑条件与工程任务。"
          />
          <div className="home-project-grid">
            {projects
              .filter((p) => p.slug !== 'deqing')
              .map((p, i) => (
                <a
                  className={`home-project-card project-${i}`}
                  href={`/projects/${p.slug}`}
                  key={p.slug}
                >
                  <div className="home-project-image">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <span>{p.location}</span>
                    <span className="image-arrow">
                      <ArrowUpRight size={25} />
                    </span>
                  </div>
                  <div className="home-project-info">
                    <p>{p.category}</p>
                    <h3>{p.name}</h3>
                    <span>{p.subtitle}</span>
                  </div>
                </a>
              ))}
          </div>
          <div className="section-end">
            <p className="muted">
              以明确的服务职责与实际交付，记录彼慕的工程实践。
            </p>
            <a className="text-link" href="/projects">
              查看工程案例
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="03 / DIGITAL PRODUCTS"
          title="让工程经验，成为随手可用的工具。"
          description="设计、数据、现场。三款产品，面向不同的工程角色。"
        />
        <div className="home-product-grid">
          {products.map((p, i) => (
            <article className="home-product-card" key={p.slug}>
              <div className="product-sequence">
                <span>0{i + 1}</span>
                <span>{i === 0 ? 'DESIGN' : i === 1 ? 'DATA' : 'FIELD'}</span>
              </div>
              <a href={`/products/${p.slug}`}>
                <h3>
                  {p.id}
                  <span>{p.name}</span>
                </h3>
              </a>
              <p className="home-product-tagline">{p.tagline}</p>
              <p>{p.summary}</p>
              <div className="tags">
                {p.features.slice(0, 3).map((f) => (
                  <span className="tag" key={f}>
                    {f}
                  </span>
                ))}
              </div>
              <a className="text-link" href={`/products/${p.slug}`}>
                了解产品
                <ArrowUpRight size={18} />
              </a>
            </article>
          ))}
        </div>
        <div className="product-path">
          <span>
            BCDT <small>设计成果</small>
          </span>
          <ArrowRight size={18} />
          <span>
            BCDC <small>资料组织</small>
          </span>
          <ArrowRight size={18} />
          <span>
            BCV <small>现场核对</small>
          </span>
          <a href="/products#roadmap">查看研发路线 ↗</a>
        </div>
      </section>

      <section className="dark-section service-overview">
        <div className="container split">
          <div>
            <p className="eyebrow">04 / ENGINEERING EXPERTISE</p>
            <h2>
              数字工法，
              <br />
              贯穿建造全过程。
            </h2>
            <p className="service-lead">
              从项目早期判断，到施工深化与竣工交付，
              <br />
              用连续的技术服务，回应每个阶段的需要。
            </p>
            <ActionLink href="/solutions" secondary>
              了解解决方案
            </ActionLink>
            <BuildingSignal />
          </div>
          <div className="service-stage-list">
            {[
              [
                '01',
                '招投标与成本',
                '工程量、成本分析、商务与技术标、BIM 方案。',
                'bid',
              ],
              [
                '02',
                '深化与加工资料',
                '深化设计、三维下单、材料提料、加工图与现场技术协作。',
                'design',
              ],
              [
                '03',
                '异形表皮专项',
                '点云扫描、表皮重建、曲面与分割优化、测量放线。',
                'complex',
              ],
              [
                '04',
                '竣工与交付',
                '竣工图与模型、工程量核对、审计配合及应用培训。',
                'handover',
              ],
            ].map(([n, title, desc, id]) => (
              <a key={n} href={`/solutions#${id}`}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <ArrowUpRight size={22} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow="05 / INSIDE BIMU"
          title="先看见，再深入了解。"
          description="通过实际界面、工程影像与公司资料，了解彼慕的技术与产品。"
        />
        <div className="home-resource-grid">
          <a href="/resources#company-film" className="film-teaser">
            <img
              src="/media/company-poster.jpg"
              alt="彼慕智造公司宣传片封面"
              loading="lazy"
            />
            <span className="film-play">
              <Play size={25} fill="currentColor" />
            </span>
            <div>
              <span>COMPANY FILM / 03:20</span>
              <h3>彼慕智造，从工程走向数字。</h3>
            </div>
          </a>
          <div className="resource-summary">
            <p className="eyebrow">2026 / COMPANY PROFILE</p>
            <h3>
              理解建筑。
              <br />
              更理解如何建造。
            </h3>
            <p>
              公司服务、技术方法与项目业绩，
              <br />
              收录于《彼慕智造 2026》公司宣传册。
            </p>
            <a
              className="button button-secondary"
              href="/bimu-2026.pdf"
              download="彼慕智造2026.pdf"
            >
              下载公司宣传册
              <Download size={18} />
            </a>
            <a className="text-link" href="/resources">
              全部视频与资料
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
