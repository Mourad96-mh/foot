# GEPU International Football Academy — website

Multilingual website (Arabic by default, RTL · French · English · Spanish) for GEPU International Football Academy (San Luis, Argentina).
Built with Next.js 15 as a **static export** (plain HTML, no server). See `PLAN.md` for the engineering plan and decisions.

## Commands

```bash
npm install
npm run dev       # http://localhost:3000  (redirects to /ar/)
npm run build     # static site in out/ + automatic QA check (scripts/check-build.mjs)
npm run images    # regenerate web images from assets-src/
```

Deploy: upload the content of `out/` to any static host (Vercel, Netlify, Hostinger, cPanel).

## Before launch: what the client must send

All in **`lib/site.js`** unless noted:

| Item | Where |
|---|---|
| Final domain (the brief's "gepu.international.academy.com" is a sub-domain of academy.com, so it can't be bought as written) | `site.url` + links in `public/llms.txt` |
| WhatsApp number (digits, international format) | `site.whatsapp` |
| Phone, e-mail, registration e-mail | `site.phone`, `site.phoneHref`, `site.email`, `site.registrationEmail` |
| Social media links | `site.social` |
| Real photos/videos of the campus | `public/img/` + `data/gallery.js` (current images are crops of the recruitment poster) |
| Confirmation of the founder claims (Fulham, players scouted) | `i18n/*.js` → `about.founder`, `home.founder` |
| Hosting provider for the legal page | `i18n/*.js` → `legal.sections` |
| Arabic copy review by a native Gulf speaker | `i18n/ar.js` |

## How it works

- **All text** is in `i18n/ar.js`, `i18n/fr.js`, `i18n/en.js`, `i18n/es.js` (same structure in each; the build check fails if the keys differ).
- **Pages**: `app/[locale]/…` → home, about, presentation, programme, registration, gallery, contact, legal.
- **Registration form** (`components/RegistrationForm/`): the same 5 sections as the paper form + a review/consent step. The fields are defined in `schema.js`. On submit it opens WhatsApp or the e-mail app with a structured message; the site stores nothing (a draft is kept in the browser's sessionStorage until it's sent). It can also be printed or saved as a PDF.
- **Gallery**: add an entry to `data/gallery.js` (photo or YouTube video). No other code change is needed.
- **SEO**: per-page title/description + canonical + hreflang, `sitemap.xml`, `robots.txt` (AI crawlers allowed), JSON-LD (SportsOrganization + founder + WebSite), OG image `public/og.jpg`, `public/llms.txt`.

## Quality results (2026-09-24)

- Build: 32 pages (8 × 4 languages) + redirect + 404. The QA check passes (unique titles, meta lengths, one H1, hreflang, JSON-LD).
- Lighthouse (mobile, simulated slow 4G): Performance 92–93 · Accessibility 100 · Best Practices 100 · SEO 100 · CLS 0.
- No horizontal overflow at any width from 320 to 1440px in AR/EN/FR/ES; mobile menu tested.
- Registration form: 26/26 functional checks pass (validation, conditional fields, age calculation, draft restore, WhatsApp message content).
