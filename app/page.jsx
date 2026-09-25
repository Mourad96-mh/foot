import { site } from '@/lib/site';

export const metadata = {
  title: site.name,
  robots: { index: false, follow: true },
  alternates: { canonical: '/ar/' },
};

// Static export has no middleware: send visitors to their language here.
// Arabic is the default; French/English/Spanish browsers go to their version.
const script = `(function(){var l=(navigator.language||'').slice(0,2);var t=l==='fr'?'fr':l==='en'?'en':l==='es'?'es':'ar';location.replace('/'+t+'/');})();`;

export default function RootRedirect() {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta httpEquiv="refresh" content="1; url=/ar/" />
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '15vh 16px' }}>
        <p>
          <a href="/ar/">العربية</a> · <a href="/fr/">Français</a> · <a href="/en/">English</a> · <a href="/es/">Español</a>
        </p>
      </body>
    </html>
  );
}
