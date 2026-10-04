# MIST রিভিশন হাব (static site)

Open `index.html` through any static host. Deploy to Cloudflare Pages:

    npx wrangler pages deploy . --project-name mist-revision

Layout: `data/data.js` (chapters, priority scores, question lists), `qb/` (question-bank page scans),
`rev/<chapter>/` (question + hidden-solution crops per revision card), `pdf/` (original revision PDFs).
To add a new chapter's revision sheet: crop cards into `rev/<key>/`, add the entry to `DATA.rev` and set `rev:"<key>"` on the chapter.

## Past-question bank
All 234 original MIST questions (2015-16 → 2023-24) are typed in `data/qs.js` (KaTeX math, figures cropped into `fig/`).
Keys are `year|Subject|questionNo`; each chapter page and the প্রশ্নব্যাংক page read from it.
