import Link from 'next/link';
import { site, whatsappLink } from '@/lib/site';
import { navKeys, href } from '@/lib/routes';
import Icon, { WhatsAppIcon } from './Icon';
import styles from './Footer.module.css';

export default function Footer({ locale, dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <img src="/img/crest-sm.webp" alt="GEPU International Football Academy" width="96" height="107" loading="lazy" />
          <p>{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.explore}>
          <h2 className={styles.title}>{dict.footer.explore}</h2>
          <ul className={styles.list}>
            {['', ...navKeys, 'registration'].map((key) => (
              <li key={key || 'home'}>
                <Link href={href(locale, key)}>{key ? dict.nav[key] : dict.nav.home}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.title}>{dict.footer.contact}</h2>
          <ul className={styles.contact}>
            <li>
              <WhatsAppIcon size={20} />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><bdi dir="ltr">{site.phone}</bdi></a>
            </li>
            <li>
              <Icon name="mail" size={20} />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <Icon name="pin" size={20} />
              <span>{site.address}</span>
            </li>
          </ul>
          <Link href={href(locale, 'registration')} className="btn btn--gold" style={{ marginTop: 20 }}>
            {dict.cta.register}
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>© {year} GEPU International Football Academy. {dict.footer.rights}</span>
          <Link href={href(locale, 'legal')}>{dict.nav.legal}</Link>
        </div>
      </div>
    </footer>
  );
}
