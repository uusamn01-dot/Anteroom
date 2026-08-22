# Anteroom

Marketing site for Anteroom, AI systems for regulated professional firms.

Static, single file, no build step. Open `index.html` in a browser to work on it.

## Files

| File | What it is |
|---|---|
| `index.html` | The site. Everything is inline: styles, scripts, SVG. |
| `brand.html` | Brand reference: palette, logo, type, component states. Not linked from the site. |

## Deploying

Cloudflare Pages, connected to this repo:

- Build command: none
- Build output directory: `/`
- Every push to `main` deploys automatically

Netlify, Vercel and GitHub Pages all work the same way for a static site like this.

## Before this goes live

These are genuine blockers, not polish.

- [ ] **Booking form has no backend.** It currently looks like it works and silently discards submissions. Replace the `.bk` block with a Cal.com embed before launch or you will lose real enquiries without knowing.
- [ ] **Privacy notice and terms do not exist.** The footer links to them. Legally required under UK GDPR once the form collects a name and email.
- [ ] **ICO registration.** £52/year for small organisations.
- [ ] Hammad Khan's headshot and LinkedIn URL. Both marked as placeholders in the leadership section.
- [ ] Written confirmation that Saudi Aramco and SLB can be named publicly.
- [ ] Demo video. Replace the `.vid` placeholder block. Comment in the source shows the markup.

## Notes for editing

- Colours and spacing come from CSS custom properties at the top of the `<style>` block. Change them there, not inline, or light and dark mode will drift apart.
- Light and dark are both supported via `data-theme` on `<html>`. Check any change in both.
- No `localStorage` anywhere. Theme state is in-memory by design.
- Transcripts name fictional firms (Whitfield and Co, Hartley Financial). Fine while labelled illustrative. Replace with a real client once one exists and has given permission.
- `prefers-reduced-motion` is respected throughout. Keep it that way if you add animation.

## Do not commit here

Strategy documents (cashflow model, market research, build playbook, launch checklist, website brief) contain pricing margins, client quotas and market analysis. Keep them in a separate private repo or out of version control entirely. If this repo is ever made public or connected to Pages, anything in it is readable.
