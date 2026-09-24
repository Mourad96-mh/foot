import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import s from '@/components/content.module.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale, 'presentation');
}

export default async function Presentation({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { hero, campus, model, saudi } = dict.presentation;

  return (
    <>
      <PageHero {...hero} />

      <section className="section">
        <div className={`container ${s.split}`}>
          <div>
            <h2 className="h2">{campus.title}</h2>
            <ul className={s.facts}>
              {campus.items.map((item) => (
                <li key={item.text}>
                  <span className="icon-badge"><Icon name={item.icon} size={22} /></span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className={s.photo} style={{ margin: 0 }}>
            <img src="/img/campus.webp" alt={dict.gallery.captions.campus} loading="lazy" />
            <figcaption>{dict.gallery.captions.campus}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{model.eyebrow}</span>
            <h2 className="h2">{model.title}</h2>
          </div>
          <div className="grid grid--2">
            {model.items.map((item) => (
              <article key={item.title} className={`card card--stripe ${s.feature}`}>
                <span className="icon-badge"><Icon name={item.icon} size={24} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{saudi.eyebrow}</span>
            <h2 className="h2">{saudi.title}</h2>
          </div>
          <div className="grid grid--4">
            {saudi.items.map((item) => (
              <article key={item.title} className={`${s.navyCard} ${s.feature}`}>
                <span className="icon-badge icon-badge--gold"><Icon name={item.icon} size={24} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
