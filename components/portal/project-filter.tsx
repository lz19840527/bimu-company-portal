'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@/lib/projects';

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<'全部' | ProjectCategory>('全部');
  const resultsId = useId();
  const visibleProjects =
    category === '全部'
      ? projects
      : projects.filter((project) => project.category === category);

  return (
    <>
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
            aria-controls={resultsId}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </fieldset>
      <output
        className="muted"
        aria-live="polite"
        aria-atomic="true"
        style={{ display: 'block', marginBottom: '1.5rem' }}
      >
        {category === '全部' ? '全部工程实践' : category} ·{' '}
        {visibleProjects.length} 个案例
      </output>
      <div className="project-grid" id={resultsId}>
        {visibleProjects.map((project) => (
          <Link
            className="project-card"
            href={`/projects/${project.slug}`}
            key={project.slug}
          >
            <div className="project-image">
              <Image
                src={project.image}
                alt={`${project.name}建筑外观`}
                width={1600}
                height={1000}
                unoptimized
                loading="lazy"
              />
            </div>
            <div className="project-info">
              <p className="eyebrow">
                {project.location} / {project.category}
              </p>
              <h2>
                {project.name} <ArrowUpRight size={22} aria-hidden="true" />
              </h2>
              <p>{project.subtitle}</p>
              <p className="muted">{project.summary}</p>
              <div>
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
