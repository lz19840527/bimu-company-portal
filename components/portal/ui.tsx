'use client';
import { Localized } from '@/components/portal/locale';
import type { ReactNode } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Localized>
      {
        <a
          className={`button${secondary ? ' button-secondary' : ''}`}
          href={href}
        >
          {children}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      }
    </Localized>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  image?: string;
}) {
  return (
    <Localized>
      {
        <section className={`page-hero${image ? ' page-hero-image' : ''}`}>
          {image && <img className="page-hero-backdrop" src={image} alt="" />}
          <div className="container page-hero-inner">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="page-lead">{description}</p>
            {children && <div className="hero-actions">{children}</div>}
          </div>
          <span className="page-hero-index" aria-hidden="true">
            BIMU / DIGITAL CONSTRUCTION
          </span>
        </section>
      }
    </Localized>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Localized>
      {
        <div className="section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          {description && <p>{description}</p>}
        </div>
      }
    </Localized>
  );
}

export function ContactBand({
  title = '把你的下一个项目，交给专业的对话。',
  description = '从工程难题到产品应用，告诉我们你正在面对的挑战。',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Localized>
      {
        <section className="contact-band">
          <div className="container">
            <div>
              <p className="eyebrow">LET’S BUILD TOGETHER</p>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <ActionLink href="/contact?intent=project">沟通项目需求</ActionLink>
          </div>
        </section>
      }
    </Localized>
  );
}

export function BuildingSignal() {
  return (
    <Localized>
      {
        <svg
          className="building-signal"
          viewBox="0 0 440 320"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="signal-stroke"
              x1="40"
              y1="40"
              x2="380"
              y2="290"
            >
              <stop stopColor="#9adfc8" />
              <stop offset="1" stopColor="#3a7468" />
            </linearGradient>
          </defs>
          <ellipse cx="228" cy="273" rx="180" ry="32" stroke="#28554c" />
          <ellipse cx="228" cy="273" rx="144" ry="23" stroke="#28554c" />
          {[0, 1, 2].map((tower) => (
            <g
              key={tower}
              className={`signal-tower tower-${tower}`}
              stroke="url(#signal-stroke)"
              strokeWidth=".9"
            >
              {Array.from({ length: tower === 1 ? 19 : 12 }, (_, floor) => {
                const x = 90 + tower * 92;
                const y = 250 - floor * 10;
                const drift = Math.sin(floor / 10) * 9;
                return (
                  <path
                    key={floor}
                    d={`M${x + drift},${y} l52,-22 l40,20 l-52,22 Z`}
                  />
                );
              })}
              {[0, 1, 2, 3].map((edge) => {
                const x = 90 + tower * 92;
                const top = tower === 1 ? 70 : 140;
                return (
                  <path
                    key={edge}
                    d={`M${x + [0, 52, 92, 40][edge]},${250 + [0, -22, -2, 20][edge]} L${x + 8 + [0, 52, 92, 40][edge]},${top + [0, -22, -2, 20][edge]}`}
                  />
                );
              })}
            </g>
          ))}
          <path
            className="signal-scan"
            d="M38 175 L217 95 L412 175 L226 255 Z"
            stroke="#bef8d9"
            strokeOpacity=".5"
          />
          <circle
            className="signal-orbit"
            cx="62"
            cy="273"
            r="4"
            fill="#bcebd9"
          />
        </svg>
      }
    </Localized>
  );
}

export function DownLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Localized>
      {
        <a className="text-link" href={href}>
          {children}
          <ArrowDown size={17} aria-hidden="true" />
        </a>
      }
    </Localized>
  );
}
