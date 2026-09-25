import { locales } from '@/i18n/config';
import { pages, href } from '@/lib/routes';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

// One entry per page, with its language alternates.
export default function sitemap() {
  const lastModified = new Date();
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${site.url}${href(locale, page)}`,
      lastModified,
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1 : page === 'registration' ? 0.9 : page === 'legal' ? 0.2 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, page)}`])),
      },
    })),
  );
}
