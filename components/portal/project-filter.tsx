'use client';
import { Localized } from '@/components/portal/locale';
import { useId, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@/lib/projects';
import { translateText } from '@/lib/i18n';
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<'全部' | ProjectCategory>('全部');
  const [query, setQuery] = useState('');
  const id = useId();
  const q = query.trim().toLowerCase();
  const shown = projects.filter(
    (p) =>
      (category === '全部' || p.category === category) &&
      (!q ||
        [
          p.name,
          p.location,
          p.service,
          translateText(p.name, 'en'),
          translateText(p.location, 'en'),
          translateText(p.service, 'en'),
        ]
          .join(' ')
          .toLowerCase()
          .includes(q)),
  );
  return (
    <Localized>
      {
        <>
          <div className="portfolio-search">
            <Search size={19} aria-hidden="true" />
            <label htmlFor="portfolio-query" className="sr-only">
              搜索项目名称、地点或服务
            </label>
            <input
              id="portfolio-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索项目名称、地点或服务"
            />
            {query && (
              <button
                type="button"
                aria-label="清除搜索"
                onClick={() => setQuery('')}
              >
                <X size={17} />
              </button>
            )}
          </div>
          <fieldset
            className="filter-row"
            aria-label="按建筑类型筛选项目"
            style={{ border: 0, padding: 0, minWidth: 0 }}
          >
            {(['全部', ...projectCategories] as const).map((item) => (
              <button
                type="button"
                key={item}
                className={`filter-button${category === item ? ' active' : ''}`}
                aria-pressed={category === item}
                aria-controls={id}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </fieldset>
          <output className="muted portfolio-count" aria-live="polite">
            {category === '全部' ? '全部业绩' : category} · {shown.length} /{' '}
            {projects.length}
          </output>
          <div className="project-grid portfolio-grid" id={id}>
            {shown.map((p) => (
              <Link
                className="project-card"
                href={`/projects/${p.slug}`}
                key={p.slug}
              >
                <div className="project-image">
                  <Image
                    src={p.image}
                    alt={`${p.name}建筑外观`}
                    width={1200}
                    height={750}
                    unoptimized
                    loading="lazy"
                  />
                  <span className="portfolio-image-count">
                    {p.images?.length || 1} 图片
                  </span>
                </div>
                <div className="project-info">
                  <p className="eyebrow">{p.category}</p>
                  <h2>
                    {p.name}
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </h2>
                  <p>{p.service}</p>
                  <span className="portfolio-page">
                    宣传册页码 · {p.brochurePage || p.sourcePage}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {!shown.length && (
            <p className="portfolio-empty">
              暂无匹配项目，请调整关键词或分类。
            </p>
          )}
        </>
      }
    </Localized>
  );
}
