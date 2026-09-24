# GEPU International Football Academy — Website Plan

_Engineering plan, written 2026-09-24, before any code._

---

## 1. Discovery — what the client gave us

| File | Content | Use on the site |
|---|---|---|
| `file.txt` | 6 pages: Qui sommes-nous, Présentation, Fiche d'inscription, Programme, Photos/Vidéos, Nous contacter. Domain "gepu.international.academy.com". References: juventusacademy.ma, frmclinicsacademy.fr (the domain is dead) | Sitemap, tone |
| `WhatsApp Image …jpeg` | Crest logo: navy / sky-blue stripes / gold Argentine sun | Brand identity, favicon, OG image |
| `ChatGPT Image …16_04_38.png` | Arabic registration form: 5 sections + guardian consent | Online multi-step form (same fields) |
| `ChatGPT Image …16_12_31.png` | Arabic recruitment poster: Saudi talents 8–18, San Luis (Argentina), 6 benefits, "From Saudi Arabia… to Argentina" | Home hero copy, benefits, temporary imagery |
| `gepu_slides-ar.pptx` | 10-slide pitch deck: founder Pelayo Morón Pendás, Argentina+Spain method, San Luis campus, 5 selection criteria, training programme, philosophy, Saudi Vision 2030, 2-phase programme | All long-form content |

The slide images are empty backgrounds. **There are no real photos.** The only usable visuals are the logo and the AI-generated scenes on the poster.

### Decisions already made with the client/owner
- **Languages:** Arabic (default, RTL) + French + English.
- **Registration:** static site. The form builds a structured message and sends it by **WhatsApp or e-mail**. It also has a print/PDF version. No server and no database.

## 2. Requirements

### Goals
1. Give credibility to a new academy aimed at **Saudi families** (the payers) and young players.
2. Turn visitors into **registrations** (main KPI) and contacts (WhatsApp).
3. Explain the offer clearly: who we are, the method, San Luis, the 2-phase programme.

### Audiences
- **Primary:** Saudi parents (Arabic, mostly on mobile, used to WhatsApp).
- **Secondary:** partners, clubs and federations (EN/FR); the young players themselves.

### Functional requirements
- FR1: 6 client pages + home + legal/privacy + 404, in all 3 languages.
- FR2: Language switcher that keeps the current page; Arabic uses RTL.
- FR3: Registration form with the paper form's fields, validation, and a "send via WhatsApp / e-mail / print" step.
- FR4: Gallery for photos and videos, driven by data, so the client's media can go in later without code changes.
- FR5: A WhatsApp button always visible; tap-to-call; e-mail.

### Non-functional requirements
- Mobile-first, Lighthouse ≥ 90 on all 4 categories, no horizontal scroll from 360px up.
- Accessibility: semantic HTML, focus states, labels on every field, contrast AA.
- SEO: per-page metadata, canonical + hreflang, sitemap, robots, JSON-LD (SportsOrganization).
- Privacy: minors' health data is **never stored** by the site. It goes only to the academy's own WhatsApp/e-mail.
- Cheap and zero-maintenance hosting: a static export.

## 3. Content gaps and risks (to send to the client)

| # | Item | Status / mitigation |
|---|---|---|
| 1 | **Domain** "gepu.international.academy.com" is a sub-domain of academy.com, so it can't be bought as written | Suggest `gepu-academy.com` or `gepuacademy.com`. Set in one constant `lib/site.js` |
| 2 | Phone, WhatsApp, e-mail, address, social links | Placeholders in `lib/site.js`, marked `TODO` |
| 3 | Real photos/videos of the campus and players | For now, crops of the client poster. `data/gallery.js` is ready for real media |
| 4 | Age range conflict: poster says **8–18**, deck says **14–17** for the elite programme | Both shown: academy 8–18, International Excellence Programme 14–17 |
| 5 | Fees, dates and intake calendar | Not published; CTA "ask us" |
| 6 | Claims about the founder (Fulham recruiter; scouted Ansu Fati, Brahim Díaz…) | Written as in the deck; **the client must confirm before launch** |
| 7 | Saudi flag contains the Shahada, which is religiously sensitive on decorative use | Not used as a graphic element; text only |
| 8 | Legal notice / company entity | Generic page with placeholders |

## 4. Information architecture

```
/                       → redirect to /ar/ (static page, meta refresh + JS)
/{ar|fr|en}/            Home
/{l}/about/             Qui sommes-nous: story, founder, philosophy, values
/{l}/presentation/      The academy: San Luis centre, Argentina×Spain method, why Saudi Arabia (Vision 2030)
/{l}/programme/         Age groups, 2 phases, selection criteria, weekly training content, day in the life
/{l}/registration/      Fiche d'inscription (multi-step form)
/{l}/gallery/           Photos & videos (filterable)
/{l}/contact/           Contact channels + quick-message form (→ WhatsApp)
/{l}/legal/             Legal notice + privacy
404
```
Slugs are English in all locales (simpler; the audience reads the menu, not the URL).

### Home sections
Hero (crest, headline, 2 CTAs) → key figures (8–18 yrs, 9-month minimum, 20+ yrs scouting, 30+ residence places) → "the academy offers" (6 benefits) → method (Argentina × Spain) → 2-phase programme teaser → founder teaser → gallery strip → final "From Saudi Arabia to Argentina" CTA band.

## 5. Architecture and stack

| Choice | Why |
|---|---|
| **Next.js 15 App Router, `output: 'export'`** | Static HTML per page per locale gives the best SEO and cheap hosting. Same stack as my other client sites |
| **JavaScript + pure CSS (CSS Modules + tokens)** | No UI library means a small bundle and full control of RTL |
| `app/[locale]/layout.jsx` as root layout | Sets `<html lang dir>` per locale. `generateStaticParams` gives 3 locales |
| Dictionaries `i18n/{ar,fr,en}.js` | All text lives in them, so nothing is hard-coded. They're JS, not JSON, so lists (benefits, phases…) stay structured |
| `data/*.js` | Gallery, programme and criteria are data, with text keys taken from the dictionaries |
| CSS logical properties (`margin-inline`, `inset-inline-start`) | One stylesheet works for LTR and RTL |
| `next/font` (Cairo for Arabic, Barlow Condensed for display, Inter for body) | Self-hosted fonts, no layout shift |
| Client components only where needed | Header menu, language switcher, form, gallery lightbox |
| `sharp` (dev only) scripts | Crop the poster, and build the favicon and OG image |

Static export has no middleware, so the root `/` is a small static page that redirects to `/ar/`. It uses the browser language when that is FR or EN.

### Folder layout
```
app/
  page.jsx                 root redirect
  not-found.jsx
  sitemap.js, robots.js    (static export compatible)
  [locale]/layout.jsx, page.jsx, about/, presentation/, programme/,
           registration/, gallery/, contact/, legal/
components/  Header, Footer, LangSwitch, WhatsAppFab, PageHero, Section,
             CtaBand, RegistrationForm/, Gallery/, icons
i18n/        config.js, ar.js, fr.js, en.js, index.js (getDict)
lib/         site.js (contact info, domain), seo.js (metadata + hreflang), whatsapp.js
data/        gallery.js
public/      img/, logo, og.jpg, registration-form.png (blank printable form)
scripts/     make-images.mjs
```

## 6. Design system

- **Colours (from the crest):** navy `#0B2A5B` (primary text/surfaces), sky `#6CACE4` (Argentine stripe), deep sky `#2F7FC1` (links/CTA hover), gold `#E9A21B` (sun: accent, stars), off-white `#F5F8FC`, ink `#0A1628`.
- **Motifs** from the client material: diagonal double lines (form and poster header), sky/white vertical stripes, gold stars as separators.
- **Type:** Arabic uses Cairo (700/800 headlines). Latin uses Barlow Condensed for uppercase sporty headlines and Inter for body text.
- **Components:** pill buttons (gold primary, navy/outline secondary), rounded cards with a sky top border, icon badges in navy circles (as on the poster).
- Motion is limited to a subtle hover lift and respects `prefers-reduced-motion`.

## 7. Registration form (key feature)

- **5 steps**, with the same sections as the paper form: ① child ② sport ③ health ④ guardian ⑤ emergency contact. Then ⑥ review + consent.
- Progress bar; "Next" validates only the current step. Native constraint validation plus custom error messages in the page language.
- Radio buttons for gender/foot/yes-no. Conditional "explain" fields appear only when the answer is "yes".
- Age is **computed from the date of birth** (the paper form asks for both), and the form warns when it is outside 8–18.
- Submit options:
  1. **WhatsApp**: `wa.me/<number>?text=<encoded>`. It's a structured message with labels in the page language. Links use `encodeURIComponent`, not a sanitiser that strips `%0A`.
  2. **E-mail**: `mailto:` with the same body.
  3. **Print / PDF**: a print stylesheet that shows the filled answers + a signature line.
- Photo: the upload can't be sent without a server, so the success screen asks the family to attach the photo in WhatsApp.
- The draft is kept in `sessionStorage` (try/catch) so a reload doesn't lose the answers. It's cleared after sending.
- Privacy note on the form: the site stores nothing.
- A download link for the blank paper form (client image) for families who prefer paper.

## 8. SEO
Per-page `generateMetadata` (title/description per locale), canonical + `hreflang` (ar, fr, en, x-default→ar), `sitemap.xml` with alternates, `robots.txt`, JSON-LD `SportsOrganization` + `WebSite` + `BreadcrumbList`, OG image 1200×630 generated from the crest, and `lang`/`dir` on `<html>`. Headings follow one H1 per page.

## 9. Quality plan (definition of done)
1. `npm run build` passes clean. 1 + 3×8 pages exported.
2. Every route returns 200 in all 3 locales from a static server (`out/`). Links are checked by a crawl script.
3. RTL check: layout mirrors correctly, and icons/arrows flip where they should.
4. Responsive sweep at 360 / 390 / 768 / 1024 / 1440: no horizontal overflow (measured in the browser via JS, not by eye).
5. Form test: validation blocks empty required fields, conditional fields appear, and the WhatsApp URL decodes to the expected message (line breaks kept).
6. Lighthouse on home + registration.
7. Screenshots of key pages reviewed.

## 10. Delivery
- Hosting: Vercel (static) or any cPanel/Hostinger: upload `out/`.
- Before launch: real contact details, domain, founder claims confirmed, real photos, and an Arabic copy review by a native Gulf speaker.

## 11. Milestones
1. Scaffold, tokens, i18n, layout (header/footer/lang switch/WhatsApp).
2. Content pages: home, about, presentation, programme.
3. Registration form.
4. Gallery, contact, legal, 404.
5. SEO layer + images/OG.
6. QA sweep + fixes, then a handover README.
