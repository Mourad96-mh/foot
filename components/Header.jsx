'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeMeta } from '@/i18n/config';
import { navKeys, href } from '@/lib/routes';
import Icon from './Icon';
import styles from './Header.module.css';

// Same page, other language: swap the first path segment.
const switchLocale = (pathname, target) => {
  const parts = (pathname || '/').split('/');
  parts[1] = target;
  const path = parts.join('/');
  return path.endsWith('/') ? path : `${path}/`;
};

export default function Header({ locale, dict }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (key) => pathname?.startsWith(href(locale, key));

  const langLinks = locales.map((l) => (
    <Link
      key={l}
      href={switchLocale(pathname, l)}
      hrefLang={l}
      lang={l}
      className={`${styles.lang} ${l === locale ? styles.langActive : ''}`}
      aria-current={l === locale ? 'true' : undefined}
      title={localeMeta[l].label}
    >
      {localeMeta[l].short}
    </Link>
  ));

  return (
    <header className={`${styles.header} no-print`}>
      <div className={`container ${styles.bar}`}>
        <Link href={href(locale)} className={styles.brand}>
          <img src="/img/crest-sm.webp" alt="" width="46" height="53" className={styles.crest} />
          <span className={styles.wordmark}>
            <strong>GEPU</strong>
            <small>International Football Academy</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={dict.nav.menu}>
          {navKeys.map((key) => (
            <Link key={key} href={href(locale, key)} className={`${styles.link} ${isActive(key) ? styles.active : ''}`} aria-current={isActive(key) ? 'page' : undefined}>
              {dict.nav[key]}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.langs} role="group" aria-label={dict.nav.language}>
            {langLinks}
          </div>
          <Link href={href(locale, 'registration')} className={`btn btn--gold ${styles.cta}`}>
            {dict.cta.register}
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${styles.panel} ${open ? styles.panelOpen : ''}`} hidden={!open}>
        <nav className="container" aria-label={dict.nav.menu}>
          <Link href={href(locale)} className={styles.mLink}>{dict.nav.home}</Link>
          {navKeys.map((key) => (
            <Link key={key} href={href(locale, key)} className={`${styles.mLink} ${isActive(key) ? styles.active : ''}`}>
              {dict.nav[key]}
            </Link>
          ))}
          <Link href={href(locale, 'registration')} className={`btn btn--gold ${styles.mCta}`}>
            {dict.cta.register}
          </Link>
          <div className={styles.mLangs} role="group" aria-label={dict.nav.language}>
            {locales.map((l) => (
              <Link key={l} href={switchLocale(pathname, l)} hrefLang={l} lang={l} className={`${styles.mLang} ${l === locale ? styles.langActive : ''}`}>
                {localeMeta[l].label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
