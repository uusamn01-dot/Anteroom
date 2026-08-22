# Oels

Marketing site for **Oels** — AI systems for regulated professional firms.
**Anteroom** is the product (the AI receptionist), not the company.

Static HTML, no build step. Open `index.html` in a browser, or serve the folder.

## Files

| File | What it is |
|---|---|
| `index.html` | Home. Hero ledger, four service lines, live demo, controls, pricing, booking. |
| `pricing.html` | Full pricing: reception tiers, project scoping, procurement questions. |
| `trust.html` | Data residency, retention, sub-processors, and what we don't hold yet. |
| `ai-receptionists.html` | Anteroom. Live transcript with field extraction. |
| `automations.html` | Clickable workflow canvas with a run animation. |
| `custom-bots.html` | Corpus search with citations, and a toggle to show the uncited answer. |
| `self-hosted.html` | Architecture toggle — components move across the perimeter. |
| `for-law-firms.html` | Practice-area configurator, SRA notes, escalation promise. |
| `for-financial-services.html` | Firm-type configurator, advice boundary, Consumer Duty. |
| `for-healthcare.html` | Deliberately an entry page. States what is missing and why. |
| `privacy.html` / `terms.html` / `dpa.html` | **Drafts. Not solicitor-reviewed.** |
| `brand.html` | Brand reference: palette, mark, type, component states. Not linked from the site. |
| `assets/oels.css` | All styles. Tokens at the top. |
| `assets/oels.js` | All behaviour. Every module no-ops if its markup is absent. |

## Deploying

Cloudflare Pages, connected to this repo:

- Build command: none
- Build output directory: `/`
- Every push to `main` deploys automatically

Netlify, Vercel and GitHub Pages work the same way.

## Before this goes live

Genuine blockers, not polish.

- [ ] **Booking form has no backend.** It looks like it works and silently discards submissions. Replace the `.bk` block with a Cal.com embed before launch or you will lose real enquiries without knowing.
- [ ] **Legal pages are unreviewed drafts.** `privacy.html`, `terms.html` and `dpa.html` carry a visible "draft for review" banner and contain `[BRACKETED]` placeholders (company address, company number, ICO registration, liability cap). A solicitor must review them, and the placeholders must be filled, before the site collects a single email address.
- [ ] **ICO registration.** £52/year. The privacy notice has a placeholder for the number.
- [ ] Hammad Khan's headshot and LinkedIn URL. Both marked as placeholders.
- [ ] Written confirmation that Saudi Aramco and SLB can be named publicly.
- [ ] **HTTPS.** The site is served over plain HTTP at the time of writing. The booking form collects names and emails.

## Notes for editing

- Colours and spacing come from CSS custom properties at the top of `assets/oels.css`. Change them there, never inline, or light and dark will drift apart.
- **Never set `grid-template-columns` inline.** Inline styles beat the responsive media queries and break the mobile layout. Use a modifier class in a `min-width` query — see `.strip-4`.
- Brass is a background behind *dark* text, in both themes. Small brass text on a light background fails AA. Use `--brass-text` for text, `--brass` for fills.
- `.on-deep` re-declares the tokens locally so children inherit dark-appropriate values in both themes. Add new deep-green bands with that class rather than a background override.
- Light and dark are both supported via `data-theme` on `<html>`. Check any change in both — and reload rather than toggling, because toggling at runtime doesn't always recompute `var()` references.
- No `localStorage` anywhere. Theme state is in-memory by design.
- Transcripts name fictional firms (Whitfield and Co, Hartley Financial) and are labelled illustrative. Replace with a real client once one exists and has given permission.
- `prefers-reduced-motion` is respected throughout: the ledger, transcript, workflow run and corpus typing all show their end state immediately. Keep it that way.

## Do not commit here

Strategy documents (cashflow model, market research, build playbook, launch checklist, website brief) contain pricing margins, client quotas and market analysis. They now live in `../Anteroom-internal/` and are covered by `.gitignore`.

**Note:** these documents were previously committed to this public repo and remain in git history. Removing them from the working tree does not remove them from history — treat their contents as already disclosed.
