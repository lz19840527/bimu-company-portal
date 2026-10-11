'use client';
import { Localized } from '@/components/portal/locale';
import Image from 'next/image';
import { SectionHeading } from './ui';
export function ProjectGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  if (images.length < 2) return null;
  return (
    <Localized>
      {
        <section className="section container project-gallery">
          <SectionHeading eyebrow="PROJECT GALLERY" title="项目图库" />
          <div className="gallery-grid">
            {images.slice(1).map((src, i) => (
              <figure key={src}>
                <a href={src} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={src}
                    alt={`${name} ${i + 2}`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    unoptimized
                  />
                </a>
                <figcaption>
                  {name} · {i + 2} / {images.length}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      }
    </Localized>
  );
}
