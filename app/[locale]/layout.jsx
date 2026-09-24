import { notFound } from 'next/navigation';
import { Cairo, Barlow_Condensed, Inter } from 'next/font/google';
import { locales, localeMeta, isLocale } from '@/i18n/config';
import { getDict } from '@/i18n';
import { site } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import SiteSchema from '@/components/SiteSchema';

const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700', '800'], variable: '--font-cairo', display: 'optional' });
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-barlow', display: 'optional' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'optional' });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.siteTitle, template: `%s | GEPU Academy` },
    description: dict.meta.siteDescription,
    applicationName: site.shortName,
    formatDetection: { telephone: false },
  };
}

export const viewport = { themeColor: '#0b2a5b' };

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <html lang={locale} dir={localeMeta[locale].dir} className={`${cairo.variable} ${barlow.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">{dict.nav.skip}</a>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFab label={dict.cta.whatsapp} />
        <SiteSchema locale={locale} dict={dict} />
      </body>
    </html>
  );
}
