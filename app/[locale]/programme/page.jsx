import Link from 'next/link';
import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import { href } from '@/lib/routes';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import s from '@/components/content.module.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale, 'programme');
}

export default async function Programme({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { hero, ages, phases, criteria, recruitment, training } = dict.programme;

  return (
    <>
      <PageHero {...hero}>
        <p style={{ marginTop: 28 }}>
          <Link href={href(locale, 'registration')} className="btn btn--gold">{dict.cta.register}</Link>
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h2">{ages.title}</h2>
          </div>
          <div className="grid grid--2">
            {ages.items.map((a) => (
              <article key={a.range} className={`card ${s.ageCard}`}>
                <span className={s.ageRange}>{a.range}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{phases.eyebrow}</span>
            <h2 className="h2">{phases.title}</h2>
          </div>
          <div className={s.timeline}>
            {phases.items.map((p) => (
              <article key={p.step} className={s.phaseCard}>
                <div className={s.phaseTop}>
                  <h3>{p.title}</h3>
                  <span>{p.step}</span>
                </div>
                <ul className={`check-list ${s.phaseBody}`}>
                  {p.points.map((pt) => (
                    <li key={pt}><Icon name="check" size={20} /><span>{pt}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">{criteria.eyebrow}</span>
            <h2 className="h2">{criteria.title}</h2>
            <p>{criteria.intro}</p>
          </div>
          <ul className={s.criteria}>
            {criteria.items.map((c) => (
              <li key={c.title}>
                <span className="icon-badge icon-badge--gold"><Icon name={c.icon} size={24} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div>
            <span className="eyebrow">{training.eyebrow}</span>
            <h2 className="h2">{training.title}</h2>
            <div className="grid" style={{ marginTop: 24 }}>
              {training.blocks.map((b) => (
                <article key={b.title} className="card card--stripe">
                  <div className={s.blockHead}>
                    <span className="icon-badge"><Icon name={b.icon} size={24} /></span>
                    <h3>{b.title}</h3>
                  </div>
                  <ul className="check-list">
                    {b.items.map((it) => (
                      <li key={it}><Icon name="check" size={20} /><span>{it}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h2 className="h2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>{recruitment.title}</h2>
            <ol className={s.steps}>
              {recruitment.items.map((it) => <li key={it}>{it}</li>)}
            </ol>
            <figure className={s.photo} style={{ margin: '12px 0 0' }}>
              <img src="/img/ball.webp" alt={dict.gallery.captions.ball} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
