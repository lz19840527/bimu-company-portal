'use client';
import { ArrowUpRight, ArrowRight, ArrowDown, Database, Boxes, ScanLine, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Sections from './sections';

export const products = [
 { id: 'BCDC', label: '幕墙数据平台', en: 'DATA & COLLABORATION', icon: Database, summary: '让每一份料单，都有据可循。', description: '围绕材料料单，组织版本、审批与下发，让项目协作和资料追溯有序开展。', tags: ['料单管理', '版本追溯', '审批协作'], details: ['Excel 料单导入与人工确认', '材料查询与版本差异比对', '审批、资料包下发及接收确认', '项目角色与审计记录'], audience: '项目管理 · 材料管理 · 协作单位' },
 { id: 'BCDT', label: '幕墙设计工具', en: 'DESIGN & DETAILING', icon: Boxes, summary: '从设计几何，到加工依据。', description: '基于 Rhino 的幕墙深化设计工具，将构件、材料与加工资料关联到同一设计流程。', tags: ['Rhino 插件', '构件建模', '加工资料'], details: ['铝型材、玻璃等幕墙构件设计', '截面与构件资产库管理', '提料、套裁及加工单与加工图', '正式资料的修订与发布管理'], audience: '深化设计师 · 幕墙技术团队' },
 { id: 'BCV', label: '模型浏览器', en: 'MODEL & FIELD VIEW', icon: ScanLine, summary: '把模型，带到需要它的现场。', description: '在 Android 与浏览器中查看 Rhino / GLB 模型，通过图层、剖切与测量理解每一个构件。', tags: ['离线查看', '模型测量', '多端浏览'], details: ['查看 3DM、GLB、GLTF 模型', '图层显隐、搜索定位与构件属性', '剖切、测量、隔离与爆炸查看', 'Android 离线缓存与 Web 本地文件查看'], audience: '现场工程师 · 项目团队 · 设计协作' },
];

export default function Portal() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
 return <>
 <a href="#main" className="skip-link">跳至主要内容</a>
 <header className="site-header">
 <a className="brand" href="#" aria-label="彼慕智造首页"><img src="/images/bimu-logo.png" alt="BIMU" /><span>彼慕智造<small>建筑科技</small></span></a>
 <nav aria-label="主导航" className={menuOpen ? 'nav open' : 'nav'}>
 {[['首页', '#main'], ['数字产品', '#products'], ['技术服务', '#services'], ['项目案例', '#projects'], ['关于彼慕', '#about']].map(([name, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{name}</a>)}
 </nav>
 <a href="#contact" className="header-contact">联系彼慕 <ArrowUpRight size={17} /></a>
 <button className="menu-toggle" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
 </header>
 <main id="main">
 <section className="hero" aria-labelledby="hero-title">
 <img className="hero-image" src="/images/deqing.jpg" alt="德清科技新城联合国地信大会永久会址，异形建筑表皮与水面倒影" fetchPriority="high" />
 <div className="hero-shade" />
 <div className="hero-content wrap">
 <p className="eyebrow"><span className="status-dot" /> BIMU · DIGITAL CONSTRUCTION</p>
 <h1 id="hero-title">让建筑的想象<br />成为<span>精准的现实。</span></h1>
 <p className="hero-description">以数字工法连接设计、数据与现场。<br />为每一处复杂建筑表皮，找到可建造的答案。</p>
 <a className="button button-green" href="#products">探索数字产品 <ArrowUpRight size={19} /></a>
 <a className="hero-secondary" href="#projects">查看项目实践 <ArrowRight size={18} /></a>
 </div>
 <div className="hero-bottom wrap"><span>SINCE 2013 <i /> 深耕建筑数字化</span><span className="hero-location">德清科技新城 · 联合国地信大会永久会址</span><a href="#products" aria-label="向下浏览"><ArrowDown size={20} /></a></div>
 </section>
 <section className="products section wrap" id="products">
 <div className="section-heading"><div><p className="eyebrow green">01 / DIGITAL PRODUCTS</p><h2>三个工具，一条数字化路径。</h2></div><p>从设计深化到数据协作，再到现场查看，<br />让专业能力延伸到项目的每一个环节。</p></div>
 <div className="product-grid">{products.map(p => <article className="product-card" key={p.id}><div className="product-top"><p.icon size={25} strokeWidth={1.4} /><span>{p.en}</span><ArrowUpRight size={20} /></div><h3>{p.id}<span>{p.label}</span></h3><h4>{p.summary}</h4><p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><button className="text-link" onClick={() => setSelectedProduct(p)} aria-label={'了解 ' + p.id + ' ' + p.label}>了解产品 <ArrowRight size={17} /></button></article>)}</div>
 </section>
 <Sections />
 </main>
 <footer className="footer"><div className="wrap footer-top"><a className="brand" href="#main"><img src="/images/bimu-logo.png" alt="BIMU" /><span>彼慕智造<small>建筑科技</small></span></a><p>江苏彼慕智造建筑科技有限公司</p><a href="#main" className="text-link">返回顶部 <ArrowUpRight size={17} /></a></div><div className="wrap footer-bottom"><span>© 2026 BIMU 彼慕智造 · 版权所有</span><span>数字工法 / 数字产品 / 全过程技术服务</span></div></footer>
 <Dialog open={!!selectedProduct} onOpenChange={open => { if (!open) setSelectedProduct(null); }}><DialogContent className="detail-dialog">{selectedProduct && <><p className="eyebrow green">{selectedProduct.en}</p><DialogTitle className="dialog-title">{selectedProduct.id}<span>{selectedProduct.label}</span></DialogTitle><DialogDescription className="dialog-description">{selectedProduct.description}</DialogDescription><ul className="feature-list">{selectedProduct.details.map(d => <li key={d}><span />{d}</li>)}</ul><p className="audience">适用团队：{selectedProduct.audience}</p>{selectedProduct.id === 'BCDT' && <p className="detail-note">用于设计与加工资料生成，正式输出截止于加工单和加工图。</p>}{selectedProduct.id === 'BCV' && <p className="detail-note">Android 版本目前适合内测；Web 端本地模型仅在当前浏览器内处理。</p>}<a className="button button-green" href={'mailto:lizhe@bim-u.com?subject=' + encodeURIComponent(selectedProduct.id + ' 产品演示咨询')}>咨询产品演示 <ArrowUpRight size={18} /></a></>}</DialogContent></Dialog>
 </>;
}

