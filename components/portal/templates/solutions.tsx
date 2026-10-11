'use client';
import { Localized } from '@/components/portal/locale';
import Link from 'next/link';
import {
  ArrowUpRight,
  Check,
  ScanLine,
  Layers3,
  Ruler,
  FileCheck2,
} from 'lucide-react';
import {
  ActionLink,
  ContactBand,
  PageHero,
  SectionHeading,
} from '@/components/portal/ui';

const stages = [
  {
    id: 'bid',
    number: '01',
    title: '招投标与成本研判',
    subtitle: '让项目从充分的判断开始。',
    icon: Ruler,
    description:
      '把工程量、成本与施工策略前置，为商务与技术决策提供模型和数据依据。',
    input: '项目招标图、招标要求与拟采用的技术路线。',
    items: [
      ['成本核算', '基于招标图计算工程量，开展单价与成本分析。'],
      ['商务标制作', '结合地区清单与主流软件平台组织商务资料。'],
      ['技术标制作', '施工组织设计、重难点专项方案与投标动画。'],
      ['投标 BIM', '搭建投标模型，编制 BIM 专项实施方案。'],
    ],
    output: '工程量与成本分析、商务及技术标资料、投标模型。',
  },
  {
    id: 'design',
    number: '02',
    title: '深化设计与加工资料',
    subtitle: '让设计信息成为可执行的资料。',
    icon: Layers3,
    description:
      '从深化图纸、三维下单到技术交底，围绕工厂加工和现场实施组织技术服务。',
    input: '设计图纸、现场条件、材料要求与施工分区计划。',
    items: [
      ['深化与优化设计', '图纸深化、优化，以及样品签认和检测送检的技术支持。'],
      [
        '三维下单与提料',
        'Rhino 三维下单模型、材料总台账，按施工计划分区分批提料。',
      ],
      ['加工与现场协同', '加工单、加工图、技术交底与驻场技术协调。'],
      ['BIM 与成本管控', 'Revit 模型、全专业 BIM 配合，以及余料和错废料统计。'],
    ],
    output: '深化图纸、三维下单模型、材料台账、加工图与技术交底资料。',
  },
  {
    id: 'complex',
    number: '03',
    title: '复杂表皮与异形专项',
    subtitle: '让复杂形态具备建造的秩序。',
    icon: ScanLine,
    description:
      '以点云和几何分析为基础，统筹建筑效果、材料特性与加工安装条件。',
    input: '建筑表皮模型或图纸、基层结构资料、现场扫描与测量条件。',
    items: [
      [
        '点云扫描与表皮重建',
        '数字化基层结构，结合扫描结果重建表皮，并开展专业碰撞分析。',
      ],
      ['曲率与分割优化', '曲面拟合、表皮有序分割与材料套裁优化。'],
      ['测量放线', '布置测量控制网，提取并定位异形构造控制点。'],
      ['异形加工下单', '根据单曲、双曲线材与板材特点，组织加工图和加工模型。'],
    ],
    output: '点云与表皮模型、分割方案、测量控制点、异形加工资料。',
  },
  {
    id: 'handover',
    number: '04',
    title: '竣工交付与结算支持',
    subtitle: '让每一项交付都有完整依据。',
    icon: FileCheck2,
    description: '从竣工资料到工程量核对，为项目保留清晰、可核查的技术成果。',
    input: '实施记录、变更资料、竣工图纸与工程量核对要求。',
    items: [
      ['竣工资料', '编制竣工图与竣工模型。'],
      ['工程量分析', '实际工程量对比分析，配合超额工程量的沟通。'],
      ['审计对量', '提供跟踪服务，配合审计单位核对工程量。'],
      ['模型应用培训', '提供模型算量软件基础培训。'],
    ],
    output: '竣工图与模型、工程量对比资料及对量支持。',
  },
];

const faqs = [
  {
    question: '可以只委托其中一个专项吗？',
    answer:
      '可以围绕项目当前问题沟通专项范围，例如异形表皮分析、三维下单或竣工工程量核对。具体工作内容、成果格式与协作方式在需求确认时明确。',
  },
  {
    question: '开始沟通前，需要准备哪些资料？',
    answer:
      '建议提供项目所处阶段、图纸或模型的基本情况、主要技术难点和期望成果。涉及项目内部资料时，可以先沟通资料交换与保密要求，再提供完整文件。',
  },
  {
    question: '如何确定模型深度和交付格式？',
    answer:
      '根据成果用途确定模型深度、材料分类、图纸与清单格式，并明确项目坐标、版本和复核要求。加工、现场核对与竣工交付可分别约定成果清单。',
  },
  {
    question: '技术服务会使用哪些数字工具？',
    answer:
      '结合任务采用 BIM、Rhino、点云扫描及参数化几何等方法。自研 BCDT、BCDC、BCV 的使用范围与条件，可在产品页查看并预约演示。',
  },
  {
    question: '数字孪生是否提供标准软件安装包？',
    answer:
      '目前按定制服务方向开展需求沟通。围绕具体场景确认模型、数据来源、物联网设备与展示需求，再约定接口、实施范围和验收方式。',
  },
];

export default function SolutionsPage() {
  return (
    <Localized>
      {
        <main id="main-content">
          <PageHero
            eyebrow="SOLUTIONS & SERVICES"
            title="从工程问题出发，组织可执行的技术方案。"
            description="设计深化、异形表皮、加工资料与竣工交付。彼慕智造把工程经验与数字工法结合，服务幕墙及复杂建筑的实际建造需求。"
            image="/images/wenling.jpg"
          >
            <ActionLink href="/contact?intent=project">沟通项目需求</ActionLink>
            <ActionLink href="/projects" secondary>
              查看工程实践
            </ActionLink>
          </PageHero>

          <section className="section container">
            <SectionHeading
              eyebrow="FROM DESIGN TO DELIVERY"
              title="围绕项目阶段，明确工作与成果"
              description="可以从完整技术服务开始，也可以聚焦一个需要解决的专项。服务内容按项目条件与约定范围组织。"
            />
            <nav className="grid-4" aria-label="查看技术服务方向">
              {stages.map((stage) => (
                <a className="panel" href={`#${stage.id}`} key={stage.id}>
                  <p className="eyebrow">{stage.number} / SERVICE</p>
                  <stage.icon size={28} aria-hidden="true" />
                  <h3>{stage.title}</h3>
                  <span className="text-link">
                    了解服务 <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </a>
              ))}
            </nav>
          </section>

          {stages.map((stage) => (
            <section className="section container" id={stage.id} key={stage.id}>
              <SectionHeading
                eyebrow={`${stage.number} / ${stage.title}`}
                title={stage.subtitle}
                description={stage.description}
              />
              <div className="split">
                <div className="panel">
                  <p className="eyebrow">沟通起点</p>
                  <p>{stage.input}</p>
                  <p className="eyebrow">成果形态</p>
                  <p>{stage.output}</p>
                  <ActionLink href="/contact?intent=project" secondary>
                    交流这一阶段的需求
                  </ActionLink>
                </div>
                <ul className="feature-list">
                  {stage.items.map(([title, description]) => (
                    <li key={title}>
                      <Check size={20} aria-hidden="true" />
                      <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <section className="section dark-section">
            <div className="container split">
              <div>
                <p className="eyebrow">CUSTOM DEVELOPMENT</p>
                <h2>数字孪生与物联网定制</h2>
                <p>
                  围绕具体业务场景，将空间模型、业务信息与设备数据的应用需求放在一起讨论。
                </p>
              </div>
              <div>
                <ul className="feature-list">
                  <li>
                    <Check size={20} aria-hidden="true" />
                    <div>
                      <h3>数字化定制</h3>
                      <p>
                        从展示、管理与业务协作场景出发，明确需要组织的模型和数据。
                      </p>
                    </div>
                  </li>
                  <li>
                    <Check size={20} aria-hidden="true" />
                    <div>
                      <h3>物联网平台搭建</h3>
                      <p>
                        结合设备接入与数据使用目标，沟通接口、运行条件和实施范围。
                      </p>
                    </div>
                  </li>
                  <li>
                    <Check size={20} aria-hidden="true" />
                    <div>
                      <h3>云产品与系统衔接</h3>
                      <p>
                        结合现有系统评估定制需求，按约定成果与验收条件推进。
                      </p>
                    </div>
                  </li>
                </ul>
                <ActionLink href="/contact?intent=project">
                  沟通定制场景
                </ActionLink>
              </div>
            </div>
          </section>

          <section className="section container">
            <SectionHeading
              eyebrow="PROJECT REFERENCES"
              title="在项目中理解技术方法"
              description="材料选型、表皮分割与曲面拟合，分别对应不同的工程判断。"
            />
            <div className="grid-3">
              <Link className="panel" href="/projects/deqing">
                <p className="eyebrow">材料与系统</p>
                <h3>德清科技新城</h3>
                <p>异形装饰构架与自适应屋面系统。</p>
                <span className="text-link">
                  查看案例 <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </Link>
              <Link className="panel" href="/projects/fuyang">
                <p className="eyebrow">表皮分割</p>
                <h3>阜阳科技文化中心</h3>
                <p>双曲冲孔铝板与双曲玻璃的渐变分割。</p>
                <span className="text-link">
                  查看案例 <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </Link>
              <Link className="panel" href="/projects/wenling">
                <p className="eyebrow">曲面拟合</p>
                <h3>温岭博物馆</h3>
                <p>面向材料条件的折线钻石型拟合。</p>
                <span className="text-link">
                  查看案例 <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </section>

          <section className="section container">
            <SectionHeading
              eyebrow="QUESTIONS BEFORE WE START"
              title="开始合作前，你可能关心"
            />
            <div>
              {faqs.map((faq) => (
                <details className="panel" key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <p className="muted">
              服务内容依据《彼慕智造 2026》公司宣传册第 5–13、18
              页，具体范围与成果以项目约定为准。
            </p>
            <a
              className="text-link"
              href="/bimu-2026.pdf#page=5"
              target="_blank"
              rel="noopener noreferrer"
            >
              阅读完整服务介绍 <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </section>

          <ContactBand
            title="从一个具体问题开始合作。"
            description="告诉我们项目阶段、当前难点与期望成果，一起确定可执行的技术服务范围。"
          />
        </main>
      }
    </Localized>
  );
}
