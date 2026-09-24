import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import PageHero from '@/components/PageHero';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale, 'legal');
}

export default async function Legal({ params }) {
  const { locale } = await params;
  const { legal } = getDict(locale);
  return (
    <>
      <PageHero eyebrow={legal.hero.eyebrow} title={legal.hero.title} />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          {legal.sections.map((s) => (
            <article key={s.title} style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: '1.4rem' }}>{s.title}</h2>
              <p>{s.text.replaceAll('{email}', site.email)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
