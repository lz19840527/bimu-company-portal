import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Home from '@/app/page';
import Products from '@/app/products/page';
import Solutions from '@/app/solutions/page';
import Projects from '@/app/projects/page';
import Resources from '@/app/resources/page';
import About from '@/app/about/page';
import Contact from '@/app/contact/page';
import Bcdt from '@/app/products/bcdt/page';
import Bcdc from '@/app/products/bcdc/page';
import Bcv from '@/app/products/bcv/page';
import { ProjectDetail } from '@/components/portal/project-detail';
import { projects } from '@/lib/projects';
import { translateText } from '@/lib/i18n';
const pages: Record<string, typeof Home> = {
  '': Home,
  products: Products,
  solutions: Solutions,
  projects: Projects,
  resources: Resources,
  about: About,
  contact: Contact,
  'products/bcdt': Bcdt,
  'products/bcdc': Bcdc,
  'products/bcv': Bcv,
};
const titles: Record<string, string> = {
  '': 'Architecture, Engineering and Digital Tools',
  products: 'Digital Products',
  solutions: 'Solutions and Services',
  projects: 'Project Portfolio',
  resources: 'Videos and Resources',
  about: 'About BIMU',
  contact: 'Contact BIMU',
  'products/bcdt': 'BCDT Curtain Wall Design Tools',
  'products/bcdc': 'BCDC Engineering Data Center',
  'products/bcv': 'BCV Mobile Model Viewer',
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> {
  const { path = [] } = await params;
  const key = path.join('/');
  const p = key.startsWith('projects/')
    ? projects.find((x) => x.slug === path[1])
    : undefined;
  const title = p
    ? translateText(p.name, 'en')
    : titles[key] || 'Page not found';
  const canonical = '/en' + (key ? '/' + key : '');
  return {
    title: { absolute: title + ' | BIMU' },
    description: p
      ? translateText(p.service, 'en')
      : 'BIMU combines engineering expertise with digital tools for curtain wall detailing, project data and field model review.',
    alternates: {
      canonical,
      languages: { 'zh-CN': key ? '/' + key : '/', en: canonical },
    },
    openGraph: { title, siteName: 'BIMU', locale: 'en_US', url: canonical },
  };
}
export default async function EnglishPage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path = [] } = await params;
  const key = path.join('/');
  const Page = pages[key];
  if (Page) return <Page />;
  if (path.length === 2 && path[0] === 'projects') {
    const p = projects.find((x) => x.slug === path[1]);
    if (p) return <ProjectDetail project={p} />;
  }
  notFound();
}
