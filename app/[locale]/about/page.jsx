import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import s from '@/components/content.module.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale, 'about');
}

export default async function About({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { hero, story, founder, philosophy, commitment } = dict.about;

  return (
    <>
      <PageHero {...hero} />

      <section className="section">
        <div className={`container ${s.split}`}>
          <div className={s.prose}>
            <h2 className="h2">{story.title}</h2>
            {story.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <figure className={s.photo} style={{ margin: 0 }}>
            <img src="/img/huddle.webp" alt={dict.gallery.captions.huddle} loading="lazy" />
            <figcaption>{dict.gallery.captions.huddle}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--tint">
        <div className={`container ${s.split} ${s.splitReverse}`}>
          <div>
            <p className={`eyebrow`}>{founder.talentsTitle}</p>
            <ul className={s.talentList}>
              {founder.talents.map((t) => (
                <li key={t.name}>
                  <strong>{t.name}</strong>
                  <span>{t.club}</span>
                </li>
              ))}
            </ul>
          </div>
          <article className={s.founderCard}>
            <span className="eyebrow" style={{ color: 'var(--sky)' }}>{founder.eyebrow}</span>
            <h2 className="h2">{founder.name}</h2>
            <p className={s.role}>{founder.role}</p>
            {founder.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </article>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className={s.motto}>
            <span className="eyebrow">{philosophy.eyebrow}</span>
            <blockquote>{philosophy.motto}</blockquote>
            <p>{philosophy.motto2}</p>
          </div>
          <div className="grid grid--4">
            {philosophy.items.map((item) => (
              <article key={item.title} className={`${s.navyCard} ${s.feature}`}>
                <span className="icon-badge icon-badge--gold"><Icon name={item.icon} size={24} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2 className="h2">{commitment.title}</h2>
          </div>
          <ul className={s.pillars}>
            {commitment.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
