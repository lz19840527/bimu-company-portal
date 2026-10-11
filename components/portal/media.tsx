'use client';
import { Localized } from '@/components/portal/locale';
import { useRef, useState } from 'react';
import { Play, ArrowDownToLine } from 'lucide-react';

export function MediaPlayer({
  src,
  poster,
  title,
  captions,
  recorded,
  duration,
}: {
  src: string;
  poster: string;
  title: string;
  captions?: string;
  recorded?: string;
  duration?: string;
}) {
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  function play() {
    setStarted(true);
    requestAnimationFrame(() => ref.current?.focus());
    void ref.current?.play().catch(() => {
      /* Native controls remain available if autoplay is blocked. */
    });
  }
  return (
    <Localized>
      {
        <figure className="media-shell">
          <div className={`video-stage${started ? ' is-playing' : ''}`}>
            <video
              ref={ref}
              tabIndex={0}
              controls={started}
              preload="none"
              poster={poster}
              playsInline
              onPlay={() => setStarted(true)}
              onError={() => setError(true)}
              aria-label={title}
            >
              <source src={src} type="video/mp4" />
              {captions && (
                <track
                  kind="subtitles"
                  src={captions}
                  srcLang="zh"
                  label="中文字幕"
                />
              )}
              您的浏览器暂不支持在线播放，请下载视频观看。
            </video>
            {!started && (
              <button
                type="button"
                className="video-play"
                onClick={play}
                aria-label={`播放${title}`}
              >
                <span>
                  <Play size={23} fill="currentColor" aria-hidden="true" />
                </span>
                <strong>播放演示</strong>
                {duration && <small>{duration}</small>}
              </button>
            )}
          </div>
          <figcaption>
            <div>
              <strong>{title}</strong>
              {recorded && <span>{recorded}</span>}
            </div>
            <a
              href={src}
              download
              className="text-link"
              aria-label={`下载${title}`}
            >
              <ArrowDownToLine size={16} aria-hidden="true" />
              下载视频
            </a>
          </figcaption>
          {error && (
            <p className="media-error" role="status">
              视频未能加载，可尝试
              <a href={src} download>
                下载后播放
              </a>
              。
            </p>
          )}
        </figure>
      }
    </Localized>
  );
}
