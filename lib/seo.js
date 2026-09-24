import { locales, localeMeta } from '@/i18n/config';
import { getDict } from '@/i18n';
import { site } from './site';
import { href } from './routes';

// Canonical + hreflang for one page. Set per page (not in the layout),
// otherwise the layout canonical would cascade to every child page.
export function pageMetadata(locale, page = '') {
  const dict = getDict(locale);
  const key = page || 'home';
  const { title, description } = dict.meta.pages[key];
  const languages = Object.fromEntries(locales.map((l) => [l, href(l, page)]));
  languages['x-default'] = href('ar', page);

  return {
    title: page ? title : { absolute: title },
    description,
    alternates: { canonical: href(locale, page), languages },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url: href(locale, page),
      locale: localeMeta[locale].ogLocale,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  };
}
