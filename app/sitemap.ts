import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/solutions',
    '/products',
    '/products/bcdt',
    '/products/bcdc',
    '/products/bcv',
    '/projects',
    '/projects/deqing',
    '/projects/fuyang',
    '/projects/wenling',
    '/projects/shenzhen',
    '/resources',
    '/about',
    '/contact',
  ];
  return paths.map((path) => ({
    url: `https://bim-u.com${path || '/'}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path.split('/').length === 2 ? 0.8 : 0.7,
  }));
}
