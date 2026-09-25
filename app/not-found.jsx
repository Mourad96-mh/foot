import { Barlow_Condensed } from 'next/font/google';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['800'], variable: '--font-barlow' });

export const metadata = { title: '404 — GEPU Academy', robots: { index: false } };

// Global 404 (exported as out/404.html). It sits outside [locale],
// so it speaks all four languages.
export default function NotFound() {
  return (
    <html lang="en" className={barlow.variable}>
      <body>
        <main className="nf">
          <img src="/img/crest-md.webp" alt="GEPU" width="140" height="160" />
          <h1>404</h1>
          <p dir="rtl" lang="ar">الصفحة غير موجودة — <a href="/ar/">العودة إلى الرئيسية</a></p>
          <p lang="fr">Page introuvable — <a href="/fr/">Retour à l’accueil</a></p>
          <p lang="en">Page not found — <a href="/en/">Back to home</a></p>
          <p lang="es">Página no encontrada — <a href="/es/">Volver al inicio</a></p>
        </main>
        <style>{`body{font-family:system-ui,'Segoe UI',Tahoma,sans-serif}.nf h1{font-family:var(--font-barlow),sans-serif}.nf{min-height:100vh;display:grid;place-content:center;justify-items:center;text-align:center;padding:24px;background:var(--sky-50)}
.nf h1{font-size:6rem;color:var(--navy);margin:8px 0}.nf img{width:120px;height:auto}.nf p{margin:.3em 0}`}</style>
      </body>
    </html>
  );
}
