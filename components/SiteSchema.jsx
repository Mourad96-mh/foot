import { site } from '@/lib/site';

// Organisation + website structured data, on every page.
export default function SiteSchema({ locale, dict }) {
  const sameAs = Object.values(site.social).filter(Boolean);
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SportsOrganization',
        '@id': `${site.url}/#org`,
        name: site.name,
        alternateName: ['GEPU Academy', 'أكاديمية GEPU الدولية لكرة القدم'],
        sport: 'Soccer',
        url: site.url,
        logo: `${site.url}/img/crest.png`,
        image: `${site.url}/og.jpg`,
        description: dict.meta.siteDescription,
        email: site.email,
        telephone: site.phone,
        address: { '@type': 'PostalAddress', addressLocality: 'San Luis', addressRegion: 'San Luis', addressCountry: 'AR' },
        founder: { '@id': `${site.url}/#founder` },
        knowsAbout: ['Youth football development', 'Talent scouting', 'Argentine football methodology', 'Spanish football methodology'],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'Person',
        '@id': `${site.url}/#founder`,
        name: 'Pelayo Morón Pendás',
        jobTitle: 'Founder, talent scout',
        knowsLanguage: ['en', 'es'],
        knowsAbout: ['Youth football recruitment', 'Talent scouting', 'Sports law'],
        worksFor: { '@id': `${site.url}/#org` },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ['ar', 'fr', 'en', 'es'],
        publisher: { '@id': `${site.url}/#org` },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
