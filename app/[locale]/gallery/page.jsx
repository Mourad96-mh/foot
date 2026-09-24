import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import { gallery } from '@/data/gallery';
import PageHero from '@/components/PageHero';
import Gallery from '@/components/Gallery/Gallery';
import CtaBand from '@/components/CtaBand';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale, 'gallery');
}

export default async function GalleryPage({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  return (
    <>
      <PageHero {...dict.gallery.hero} />
      <section className="section">
        <div className="container">
          <Gallery items={gallery} locale={locale} t={dict.gallery} />
        </div>
      </section>
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
