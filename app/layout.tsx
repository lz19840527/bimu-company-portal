import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: '彼慕智造 BIMU｜建筑数字工法与幕墙技术服务',
 description: '江苏彼慕智造建筑科技有限公司，以 BCDC、BCDT、BCV 为数字工具，提供幕墙深化设计、材料加工资料、BIM 咨询及全过程技术服务。',
 icons: { icon: '/images/bimu-logo.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="zh-CN"><body>{children}</body></html>;
}

