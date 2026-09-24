import Link from 'next/link';
import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import { href } from '@/lib/routes';
import { whatsappLink } from '@/lib/site';
import Icon, { WhatsAppIcon } from '@/components/Icon';
import CtaBand from '@/components/CtaBand';
import styles from './home.module.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale);
}

const strip = ['players', 'huddle', 'campus', 'ball'];

export default async function Home({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { hero, stats, offers, method, phases, founder, gallery } = dict.home;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroName}>{hero.title}</span>
              <span className={styles.heroHighlight}>{hero.highlight}</span>
            </h1>
            <p className={styles.heroLead}>{hero.lead}</p>
            <div className={styles.heroActions}>
              <Link href={href(locale, 'registration')} className="btn btn--gold">
                {dict.cta.register} <Icon name="arrow" size={20} className="flip-rtl" />
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn--outline-light">
                <WhatsAppIcon size={20} /> {dict.cta.whatsapp}
              </a>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.heroPhoto}>
              <img src="/img/players.webp" alt={dict.gallery.captions.players} width="480" height="430" fetchPriority="high" />
            </div>
            <img src="/img/crest-md.webp" alt="" width="160" height="178" className={styles.heroCrest} />
            <div className={styles.heroBadge}>
              <strong>{stats[0].value}</strong>
              <span>{stats[0].label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key figures */}
      <section className={`container ${styles.statsWrap}`} aria-label={hero.eyebrow}>
        <ul className={styles.stats}>
          {stats.map((s) => (
            <li key={s.label}>
              <strong><bdi dir="ltr">{s.value}</bdi></strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What the academy offers */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">{offers.eyebrow}</span>
            <h2 className="h2">{offers.title}</h2>
          </div>
          <div className="grid grid--3">
            {offers.items.map((item) => (
              <article key={item.title} className={`card card--stripe ${styles.offer}`}>
                <span className="icon-badge"><Icon name={item.icon} size={26} /></span>
                <div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Method: Argentina x Spain */}
      <section className="section section--tint">
        <div className={`container ${styles.method}`}>
          <div>
            <span className="eyebrow">{method.eyebrow}</span>
            <h2 className="h2">{method.title}</h2>
            <p className={styles.methodText}>{method.text}</p>
            <Link href={href(locale, 'presentation')} className="link-arrow">
              {method.link} <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className={styles.schools}>
            <article className={`${styles.school} ${styles.argentina}`}>
              <h3>{method.argentina.title}</h3>
              <p>{method.argentina.text}</p>
            </article>
            <span className={styles.plus} aria-hidden="true">+</span>
            <article className={`${styles.school} ${styles.spain}`}>
              <h3>{method.spain.title}</h3>
              <p>{method.spain.text}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Two phases */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{phases.eyebrow}</span>
            <h2 className="h2">{phases.title}</h2>
          </div>
          <div className={`grid grid--2 ${styles.phases}`}>
            {phases.items.map((p) => (
              <article key={p.step} className={styles.phase}>
                <span className={styles.phaseNum}>{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link href={href(locale, 'programme')} className="link-arrow">
              {phases.link} <Icon name="arrow" size={18} />
            </Link>
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="section section--navy">
        <div className={`container ${styles.founder}`}>
          <div className={styles.talents}>
            <p className={styles.talentsTitle}>{dict.about.founder.talentsTitle}</p>
            <ul>
              {dict.about.founder.talents.map((t) => (
                <li key={t.name}>
                  <Icon name="star" size={18} />
                  <strong>{t.name}</strong>
                  <span>{t.club}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">{founder.eyebrow}</span>
            <h2 className="h2">{founder.title}</h2>
            <p className={styles.founderText}>{founder.text}</p>
            <Link href={href(locale, 'about')} className="btn btn--outline-light">
              {founder.link} <Icon name="arrow" size={18} className="flip-rtl" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="section">
        <div className="container">
          <div className={styles.galleryHead}>
            <div>
              <span className="eyebrow">{gallery.eyebrow}</span>
              <h2 className="h2">{gallery.title}</h2>
            </div>
            <Link href={href(locale, 'gallery')} className="link-arrow">
              {gallery.link} <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className={styles.strip}>
            {strip.map((name) => (
              <li key={name}>
                <img src={`/img/${name}.webp`} alt={dict.gallery.captions[name]} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
