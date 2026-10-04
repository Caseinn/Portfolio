# caseinn.web.id

Personal portfolio for Dito Rifki Irawan (Caseinn), web developer in Lampung, Indonesia. Live at [caseinn.web.id](https://caseinn.web.id).

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript, Framer Motion, GSAP, Lenis for smooth scroll.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # eslint
npm run build   # production build
npm run start   # serve the production build
```

Git hooks install themselves via the `prepare` script (`.githooks/`).

## Editing content

| What | Where |
| --- | --- |
| Hero headline and intro | `components/hero-section.tsx:33` |
| About headline and bio | `components/description-section.tsx:7` (`PHRASE`) and the subtext at line 51 |
| Contact headline and email | `components/ui/footer.tsx:17` (`HEADLINE`) and the `mailto:` at line 122 |
| Project list | `data/index.ts:28` |
| Tech stack marquee | `components/marquee-section.tsx:9` |
| SEO descriptions | `app/layout.tsx:10` (`siteDescription`) |

The animated headlines highlight specific words, so accent lists need to match:

- `ACCENT` in `description-section.tsx` holds normalized words (`interface,` matches `interface`).
- `ACCENTED_HEADLINE_WORDS` in `footer.tsx` holds word indexes, not words.

## Deployment

Vercel: import the repo, leave the defaults, deploy. `app/layout.tsx` sets `metadataBase`, `sitemap.ts` and `robots.ts` generate themselves from it.