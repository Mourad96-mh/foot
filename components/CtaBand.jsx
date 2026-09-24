import Link from 'next/link';
import { whatsappLink } from '@/lib/site';
import { href } from '@/lib/routes';
import { WhatsAppIcon } from './Icon';
import styles from './CtaBand.module.css';

// "From Saudi Arabia to Argentina" closing band, reused on every page.
export default function CtaBand({ locale, dict }) {
  const { band } = dict.home;
  return (
    <section className={styles.band}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.lines}>
          <span>{band.line1}</span>
          <span className={styles.gold}>{band.line2}</span>
        </p>
        <span className="star-sep" aria-hidden="true">★</span>
        <p className={styles.text}>{band.text}</p>
        <div className={styles.actions}>
          <Link href={href(locale, 'registration')} className="btn btn--gold">{dict.cta.register}</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">
            <WhatsAppIcon size={20} /> {dict.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
