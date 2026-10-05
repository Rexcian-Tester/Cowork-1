---
name: add-revision-sheet
description: Add a newly finished chapter's revision-sheet PDF to the MIST Revision website (site/), the same way as Vector, Magnetism, Straight Line, Circle and Conics. Use when the user gives a new revision PDF and says "add this to the website".
---

# Add a chapter revision sheet to MIST Revision

Site: `site/` (static, Bengali UI). Live: https://1-revision.pages.dev/ (Cloudflare Pages auto-deploys from GitHub `Rexcian-Tester/Cowork-1`, branch `main`; root `_redirects` sends `/` → `/site/`).

## Steps
1. **Identify the chapter.** Match the PDF to a chapter in `site/data/data.json` → `subjects.<Phy|Chem|Math>.chapters[]` (by `en`/`bn` name). Pick a short key (e.g. `envchem`). Ask the user only if the chapter is ambiguous.
2. **Read the PDF.** Render pages to images (PDFKit via a small Swift script: `PDFDocument` → draw each page at ~2000px wide → JPG). Text PDFs can also be read with `PDFDocument.string`, but Bengali extraction is garbled — rely on images.
3. **Split into cards** (one per question), as earlier sheets:
   - question image `site/rev/<key>/cNN_q.jpg` and hidden solution image `cNN_a.jpg` (1300px wide, JPEG q≈80);
   - if the question shows options with the correct/wrong answer already marked (green/red boxes, ✓/✗, "তোমার উত্তর"), produce a *sanitised* question image with those marks removed and set `mcq:true` + `full:"…_full.jpg"` (the unsanitised card, shown on reveal);
   - sheets with section headers (e.g. "বই থেকে" / "প্র্যাক্টিস শিট থেকে") → add `sections:[[from,to,"label"],…]`.
   - Visually check a contact sheet of the crops; no answer may leak into a question image.
4. **Register it.** Copy the PDF to `site/pdf/<name>.pdf`. Add `DATA.rev[<key>] = {title, sub, pdf, kind, cards:[{n,q,a,full,qs:[w,h],as:[w,h],mcq}], sections?}` and set `rev:"<key>"` on the chapter — in BOTH `site/data/data.json` and `site/data/data.js` (`window.DATA=…;`).
5. **Bump cache-busters**: replace every `?v=<number>` in `site/index.html` with the current timestamp.
6. **Verify locally**: `python3 -m http.server 8765 --directory site`, open the chapter page in the Browser pane (desktop + 390px mobile): cards render, "সমাধান দেখো" reveals, subject page count went up (e.g. ৩/২১), no console errors, no horizontal scroll.
7. **Show the user and wait for their OK** ("after our checking").
8. **Then commit and push**: `git add -A && git commit -m "Add <chapter> revision sheet" && git push origin main` (credentials in macOS keychain; `gh` not installed). Confirm the live site updates.

## Extras (added with Environmental Chemistry & Matrix)
All optional per-chapter extras live in `site/data/extra.js` (`window.EXTRA`), not in data.json:
- `theory[key]` — HTML+KaTeX quick-revision sheet; set `theory:true` on the rev entry. Shows a "📝 প্রশ্ন কার্ড | ⚡ দ্রুত থিওরি" switch. Wrap sections in `<section class="ths" id="th-…">`; TOC links use `<a data-jump="th-…">` (never `href="#…"` — the router owns the hash).
- `secTheory[key][sectionIndex] = [anchorId, label]` — "⚡ … →" button under a section header.
- `sols[key][n]` — typed step-by-step solution replacing the sheet's image (card gets "★ ধাপে ধাপে"; "মূল শিটের সমাধান দেখো" still shows the original). Use when the user says the sheet's solutions are too short. One row-operation per line, every entry computed, end with `.ans-box` and a `.tip` shortcut/check.
- `notes[key][n]` — one-line typed fix when the sheet's highlight box has missing glyphs (check every card's highlight!).
- `weak[Phy|Chem|Math]` — homepage "আরও যত্ন দরকার" items `{id, sec, t, d, more}`; link goes to `#/c/<id>/s<sec>` (deep links: `/s<N>` scroll to section N, `/th` open theory).
- After editing, render-check: every `EXTRA` string through KaTeX with zero `.katex-error`.
- MCQ sanitising: detect the green box (g−r>40, g>b+10, g<210 — the blue MCQ badge must not match), unblend the fill to white, redraw a neutral rounded border (≈3.4px, rgb(204,207,211), radius 18 at 1300px) so it matches the other options, and erase the trailing √ cluster (gap ≤6px).

## Rules
- Ignore `porimangoto-rosayon-revision.pdf` unless the user says it's finished.
- Don't add priority tiers to subject pages (the system site handles planning); subject pages show only revision material + "সব অধ্যায় দেখো".
- Past questions (`site/data/qs.js`, key `year|Subject|qNo`) are already typed for all 234 questions — don't rebuild them.
- Keep every deployed file < 25 MiB.
