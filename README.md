# caseinn.web.id

Personal portfolio for Dito Rifki Irawan (Caseinn), web developer in Lampung, Indonesia. Live at [caseinn.web.id](https://caseinn.web.id).

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript, Framer Motion, Lenis for smooth scroll.

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
| Hero headline and intro | `components/hero-section.tsx` |
| About headline and bio | `components/description-section.tsx` (`PHRASE` and the subtext) |
| Contact headline | `components/ui/footer.tsx` |
| Contact email and site metadata | `lib/site.ts` |
| Project list | `data/index.ts` (`projects`) |
| Social links | `lib/site.ts` (`socialLinks`) |
| Tech stack marquee | `components/marquee-section.tsx` |

The animated about headline highlights specific words: `ACCENT` in `description-section.tsx` holds normalized words, so punctuation is ignored (`interface,` matches `interface`).

## Deployment

Vercel: import the repo, leave the defaults, deploy. `app/layout.tsx` sets `metadataBase`, `sitemap.ts` and `robots.ts` generate themselves from it.