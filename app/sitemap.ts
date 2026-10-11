import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/solutions',
    '/products',
    '/products/bcdt',
    '/products/bcdc',
    '/products/bcv',
    '/projects',
    '/resources',
    '/about',
    '/contact',
    ...projects.map((p) => '/projects/' + p.slug),
  ];
  return paths
    .flatMap((p) => [p, '/en' + p])
    .map((p) => ({
      url: 'https://bim-u.com' + (p || '/'),
      changeFrequency: 'monthly',
      priority: p === '' || p === '/en' ? 1 : 0.7,
    }));
}
