'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Download, Mail, Phone, MapPin, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const services = [
 { id: 'bid', short: '招投标阶段', title: '让项目从充分的判断开始。', text: '把工程量、成本与施工策略前置，为商务与技术决策提供模型和数据依据。', items: [['成本核算', '基于招标图计算工程量，开展单价与成本分析。'], ['商务标制作', '支持各省市清单与主流软件平台。'], ['技术标制作', '施工组织设计、重难点专项方案与投标动画。'], ['BIM 模型搭建', '投标 BIM 建模与专项实施方案。']] },
 { id: 'build', short: '施工阶段', title: '让设计信息成为可执行的资料。', text: '从深化图纸、三维下单到技术交底，围绕现场与加工需求组织全过程技术服务。', items: [['深化与优化设计', '图纸深化、样品签认及检测送检技术服务。'], ['三维下单与提料', 'Rhino 三维下单模型、材料总台账及分区分批提料。'], ['加工与现场服务', '加工单、加工图、技术交底和驻场协调。'], ['BIM 与成本管控', 'Revit LOD100–400 建模及余料、错废料统计。']] },
 { id: 'complex', short: '异形专项', title: '让复杂表皮具备建造的秩序。', text: '以点云和几何分析为基础，统筹建筑效果、材料特性与加工安装条件。', items: [['点云扫描与表皮重建', '数字化基层结构，结合扫描结果重建建筑表皮。'], ['曲率与分割优化', '开展曲面拟合、表皮有序分割与材料套裁优化。'], ['测量放线', '布置测量控制网，提取并定位异形构造控制点。'], ['异形加工下单', '为单曲、双曲线材和板材提供加工图与模型。']] },
 { id: 'close', short: '竣工结算', title: '让每一项交付都有完整依据。', text: '从竣工资料到工程量核对，帮助项目保留清晰、可核查的技术成果。', items: [['竣工资料', '编制竣工图与竣工模型。'], ['工程量分析', '实际工程量对比分析及超额工程量沟通。'], ['审计对量', '跟踪服务，配合审计单位核对工程量。'], ['模型应用培训', '提供模型算量软件基础培训。']] },
];
const projects = [
 { name: '德清科技新城', subtitle: '联合国地信大会永久会址', image: 'deqing', service: '幕墙全过程技术服务', location: '浙江 · 德清', text: '围绕异形装饰构架与屋面系统开展幕墙全过程技术服务。宣传册介绍了双层不锈钢压花复合板的材料选用，以及彼慕智造自研的自适应半抱箍独立板块屋面系统。', tags: ['异形表皮', '材料与系统选型'], page: '11–12、42' },
 { name: '阜阳科技文化中心', subtitle: '有序分割，回应复杂曲面', image: 'fuyang', service: '幕墙全过程技术服务', location: '安徽 · 阜阳', text: '结合建筑效果、系统形式与材料特性，对异形双曲冲孔铝板和异形双曲玻璃进行有序化渐变分割，服务于建筑表皮的数字化建造。', tags: ['双曲表皮', '渐变分割'], page: '13、43' },
 { name: '温岭博物馆', subtitle: '从曲面分析到表皮拟合', image: 'wenling', service: '幕墙全过程技术服务', location: '浙江 · 温岭', text: '根据建筑效果与材料物理特性，将无序曲面进行有序化处理。项目采用折线钻石型拟合，为复杂建筑表皮的设计与建造提供几何依据。', tags: ['曲面分析', '折线拟合'], page: '10、44' },
 { name: '深圳机场卫星厅', subtitle: '大型公共建筑的技术协同', image: 'shenzhen', service: '幕墙全过程技术服务', location: '广东 · 深圳', text: '彼慕智造项目业绩中的大型交通建筑案例，服务范围为幕墙全过程技术服务。', tags: ['交通建筑', '全过程服务'], page: '38' },
];

export default function Sections() {
 const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
 return <>
 <section className="services section" id="services"><div className="wrap">
 <div className="section-heading"><div><p className="eyebrow">02 / OUR EXPERTISE</p><h2>数字工法，贯穿建造全过程。</h2></div><p>以工程经验为基础，以数字技术为工具。<br />从投标研判到竣工结算，提供切实的技术支持。</p></div>
 <Tabs defaultValue="complex" className="service-tabs"><TabsList className="service-tab-list" aria-label="按项目阶段查看服务">{services.map((s, i) => <TabsTrigger className="service-tab" value={s.id} key={s.id}><span>0{i + 1}</span>{s.short}<ArrowUpRight size={16} /></TabsTrigger>)}</TabsList>{services.map(s => <TabsContent value={s.id} key={s.id} className="service-panel"><div className="service-intro"><h3>{s.title}</h3><p>{s.text}</p><a href="#contact" className="text-link">沟通项目需求 <ArrowRight size={17} /></a></div><div className="service-features">{s.items.map(([title, text]) => <div key={title}><Check size={18} /><div><h4>{title}</h4><p>{text}</p></div></div>)}</div></TabsContent>)}</Tabs>
 </div></section>
 <section className="projects section wrap" id="projects"><div className="section-heading"><div><p className="eyebrow green">03 / SELECTED PROJECTS</p><h2>在真实项目中，验证专业。</h2></div><a className="text-link" href="/bimu-2026.pdf" target="_blank" rel="noopener noreferrer">查看完整项目业绩 <ArrowUpRight size={18} /></a></div>
 <div className="project-grid">{projects.map((p, i) => <button className="project-item" key={p.image} onClick={() => setSelected(p)} aria-label={'查看' + p.name + '项目详情'}><div className="project-image"><img src={'/images/' + p.image + '.jpg'} alt={p.name + '建筑外观'} loading="lazy" /><span className="project-number">0{i + 1}</span><span className="project-open"><ArrowUpRight size={24} /></span></div><div className="project-meta"><div><p>{p.location} <span>/</span> {p.service}</p><h3>{p.name}</h3><span className="project-subtitle">{p.subtitle}</span></div><ArrowUpRight size={22} /></div></button>)}</div>
 <p className="source-note">项目图片与服务范围来自《彼慕智造 2026》公司宣传册。</p>
 </section>
 <section id="about" className="about section"><div className="wrap about-grid"><div><p className="eyebrow green">04 / ABOUT BIMU</p><h2>理解建筑。<br />更理解如何建造。</h2><span className="since">SINCE <strong>2013</strong></span></div><div className="about-copy"><p className="about-lead">江苏彼慕智造建筑科技有限公司</p><p>彼慕智造专注建筑幕墙及建筑装饰领域，围绕设计深化、材料加工、现场实施与竣工交付，提供数字工法与全过程技术服务。</p><p>从常规幕墙到复杂异形表皮，我们将 BIM、点云扫描、参数化几何与项目技术经验结合，让建筑效果、材料利用和建造条件共同进入设计判断。</p><div className="about-fields"><span>建筑数字工法</span><span>BIM 技术咨询</span><span>数字孪生与定制</span></div><a href="/bimu-2026.pdf" download="彼慕智造2026.pdf" className="brochure"><span><Download size={23} /><span>彼慕智造 · 2026 公司宣传册<small>公司服务 / 数字孪生 / 项目业绩 · PDF</small></span></span><ArrowDownIcon /></a></div></div></section>
 <section id="contact" className="contact section"><div className="wrap contact-grid"><div><p className="eyebrow">05 / LET’S BUILD TOGETHER</p><h2>下一个项目，<br />让我们一起实现。</h2><p>工程技术合作、产品演示或项目需求，<br />欢迎与彼慕智造联系。</p><a className="button contact-button" href={'mailto:lizhe@bim-u.com?subject=' + encodeURIComponent('彼慕智造项目合作咨询')}>发送合作邮件 <ArrowUpRight size={19} /></a></div><div className="contact-details"><a href="tel:13913665616"><Phone size={20} /><span><small>业务咨询</small><strong>139 1366 5616</strong></span><ArrowUpRight size={19} /></a><a href="mailto:lizhe@bim-u.com"><Mail size={20} /><span><small>电子邮箱</small><strong>lizhe@bim-u.com</strong></span><ArrowUpRight size={19} /></a><div><MapPin size={20} /><span><small>公司地址</small><p>南京市中山东路 532-1 号<br />中山坊产业园 C 栋 201</p></span></div></div></div></section>
 <Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="detail-dialog project-dialog">{selected && <><img src={'/images/' + selected.image + '.jpg'} alt={selected.name} /><p className="eyebrow green">{selected.location} / {selected.service}</p><DialogTitle className="project-dialog-title">{selected.name}</DialogTitle><DialogDescription className="dialog-description">{selected.text}</DialogDescription><div className="tags">{selected.tags.map(t => <span key={t}>{t}</span>)}</div><a className="text-link" href={'/bimu-2026.pdf#page=' + selected.page.split(/[、–]/)[0]} target="_blank" rel="noopener noreferrer">阅读宣传册中的项目介绍 <ArrowUpRight size={17} /></a><p className="detail-note">资料来源：公司宣传册第 {selected.page} 页。</p></>}</DialogContent></Dialog>
 </>;
}
function ArrowDownIcon() { return <Download size={18} />; }
