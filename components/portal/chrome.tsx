'use client';
import { Localized } from '@/components/portal/locale';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BCDC_URL } from '@/lib/i18n';
import { LanguageSwitcher } from './language-switcher';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const nav = [
  ['首页', '/'],
  ['解决方案', '/solutions'],
  ['数字产品', '/products'],
  ['工程实践', '/projects'],
  ['资源中心', '/resources'],
  ['关于彼慕', '/about'],
];

function Brand() {
  return (
    <Localized>
      {
        <a className="brand" href="/" aria-label="彼慕智造首页">
          <img src="/images/bimu-logo.png" alt="BIMU" width="104" height="40" />
          <span>
            彼慕智造<small>建筑科技</small>
          </span>
        </a>
      }
    </Localized>
  );
}

export function SiteHeader() {
  const path = usePathname().replace(/^\/en(?=\/|$)/, '') || '/';
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector('a')?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open]);
  return (
    <Localized>
      {
        <>
          <a className="skip-link" href="#main-content">
            跳至主要内容
          </a>
          <header className="site-header">
            <div className="header-inner">
              <Brand />
              <nav
                ref={navRef}
                id="main-navigation"
                className={`main-navigation${open ? ' is-open' : ''}`}
                aria-label="主导航"
              >
                {nav.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={
                      (href === '/' ? path === '/' : path.startsWith(href))
                        ? 'page'
                        : undefined
                    }
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <a
                className="platform-link"
                href={BCDC_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                BCDC 平台
                <ArrowUpRight size={14} />
              </a>
              <LanguageSwitcher />
              <a className="header-contact" href="/contact">
                项目咨询
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <button
                ref={menuRef}
                type="button"
                className="menu-toggle"
                aria-controls="main-navigation"
                aria-expanded={open}
                aria-label={open ? '关闭导航' : '打开导航'}
                onClick={() => setOpen(!open)}
              >
                {open ? <X /> : <Menu />}
              </button>
            </div>
          </header>
        </>
      }
    </Localized>
  );
}

export function SiteFooter() {
  return (
    <Localized>
      {
        <footer className="site-footer">
          <div className="container footer-main">
            <div className="footer-brand">
              <Brand />
              <p>
                以数字工法连接设计、数据与现场。
                <br />
                让工程经验，成为可交付的成果。
              </p>
            </div>
            <div>
              <p className="footer-title">数字产品</p>
              <a href={BCDC_URL} target="_blank" rel="noopener noreferrer">
                进入 BCDC 平台 ↗
              </a>
              <a href="/products/bcdt">BCDT · 幕墙设计工具</a>
              <a href="/products/bcdc">BCDC · 工程数据中心</a>
              <a href="/products/bcv">BCV · 移动模型浏览器</a>
            </div>
            <div>
              <p className="footer-title">了解彼慕</p>
              <a href="/solutions">解决方案</a>
              <a href="/projects">工程实践</a>
              <a href="/resources">视频与资料</a>
              <a href="/about">公司介绍</a>
            </div>
            <div>
              <p className="footer-title">建立联系</p>
              <a className="footer-phone" href="tel:13913665616">
                139 1366 5616
              </a>
              <a href="mailto:lizhe@bim-u.com">lizhe@bim-u.com</a>
              <p>
                南京市中山东路 532-1 号<br />
                中山坊产业园 C 栋 201
              </p>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© 2026 江苏彼慕智造建筑科技有限公司</span>
            <span>数字工法 / 数字产品 / 全过程技术服务</span>
            <a href="/contact?intent=support">技术支持 ↗</a>
          </div>
        </footer>
      }
    </Localized>
  );
}
