import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { LocaleProvider } from '@/components/portal/locale';
import './portal.css';
import './pages.css';
import './responsive.css';
import './bilingual.css';
import { SiteHeader, SiteFooter } from '@/components/portal/chrome';
export const metadata: Metadata = {
  metadataBase: new URL('https://bim-u.com'),
  title: {
    default: '彼慕智造 BIMU｜建筑数字工法与幕墙技术服务',
    template: '%s｜彼慕智造 BIMU',
  },
  description:
    '江苏彼慕智造建筑科技有限公司，以 BCDC、BCDT、BCV 为数字工具，提供幕墙深化设计、材料加工资料、BIM 咨询及全过程技术服务。',
  icons: { icon: '/images/bimu-logo.png' },
  openGraph: {
    siteName: '彼慕智造 BIMU',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/images/deqing.jpg',
        width: 1600,
        height: 900,
        alt: '彼慕智造工程实践',
      },
    ],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const english = requestHeaders.get('x-bimu-locale') === 'en';
  return (
    <html lang={english ? 'en' : 'zh-CN'}>
      <body>
        <LocaleProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
