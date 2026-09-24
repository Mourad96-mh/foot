'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import styles from './Gallery.module.css';

const caption = (item, locale, captions) => item.caption?.[locale] ?? captions[item.captionKey] ?? '';

export default function Gallery({ items, locale, t }) {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);

  const shown = items.filter((i) => filter === 'all' || (filter === 'photos' ? i.type === 'photo' : i.type === 'video'));
  const photos = shown.filter((i) => i.type === 'photo');
  const hasVideos = items.some((i) => i.type === 'video');

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open != null && !d.open) d.showModal();
    if (open == null && d.open) d.close();
  }, [open]);

  const step = (delta) => setOpen((i) => (i + delta + photos.length) % photos.length);

  useEffect(() => {
    if (open == null) return undefined;
    const rtl = document.documentElement.dir === 'rtl';
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(rtl ? -1 : 1);
      if (e.key === 'ArrowLeft') step(rtl ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const current = open != null ? photos[open] : null;

  return (
    <>
      <div className={styles.filters} role="group">
        {['all', 'photos', 'videos'].map((f) => (
          <button key={f} type="button" className={`${styles.filter} ${filter === f ? styles.on : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {t.filters[f]}
          </button>
        ))}
      </div>

      <ul className={styles.grid}>
        {shown.map((item) =>
          item.type === 'photo' ? (
            <li key={item.src} className={item.tall ? styles.tall : ''}>
              <button type="button" className={styles.tile} onClick={() => setOpen(photos.indexOf(item))}>
                <img src={item.src} alt={caption(item, locale, t.captions)} loading="lazy" />
                <span className={styles.cap}>{caption(item, locale, t.captions)}</span>
              </button>
            </li>
          ) : (
            <li key={item.youtubeId} className={styles.video}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                title={caption(item, locale, t.captions)}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </li>
          ),
        )}
        {!hasVideos && filter !== 'photos' ? (
          <li className={styles.soon}>
            <span className="icon-badge icon-badge--gold"><Icon name="play" size={24} /></span>
            <h3>{t.video.title}</h3>
            <p>{t.video.text}</p>
          </li>
        ) : null}
      </ul>

      <p className={styles.notice}>{t.notice}</p>

      <dialog ref={dialogRef} className={styles.dialog} onClose={() => setOpen(null)} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        {current ? (
          <figure className={styles.figure}>
            <img src={current.src} alt={caption(current, locale, t.captions)} />
            <figcaption>{caption(current, locale, t.captions)}</figcaption>
            <button type="button" className={`${styles.ctrl} ${styles.close}`} onClick={() => setOpen(null)} aria-label={t.close}>
              <Icon name="close" size={24} />
            </button>
            {photos.length > 1 ? (
              <>
                <button type="button" className={`${styles.ctrl} ${styles.prev}`} onClick={() => step(-1)} aria-label={t.prev}>
                  <Icon name="arrow" size={24} className={styles.flip} />
                </button>
                <button type="button" className={`${styles.ctrl} ${styles.next}`} onClick={() => step(1)} aria-label={t.next}>
                  <Icon name="arrow" size={24} className="flip-rtl" />
                </button>
              </>
            ) : null}
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
