# Website Build Brief: Anteroom — AI Systems for Regulated Professional Firms

## How to use this
Paste this whole brief to Claude Code, a fresh Claude chat, or another AI builder (v0, Lovable, Bolt, etc.) and ask it to build the site. Default tech assumption below is React + Tailwind — say so explicitly if you'd rather have plain HTML/CSS/JS.

**Name status:** "Anteroom" is the working name — the room where someone waits before being admitted, which is exactly what this product governs. Two existing AI companies use the same word (anteroom.ai, a self-hosted AI gateway for regulated enterprises; anteroom.so, AI regulatory launch-readiness), both adjacent to the "AI for regulated industries" space. Different product and different buyer, and a .co.uk domain would signal a UK-only business, but run a proper UK trademark search before spending money on branding. If it comes back messy, the concept survives a rename.

## The business, in one paragraph
Anteroom builds AI systems for firms where a missed enquiry is expensive and a regulator is watching, starting with solicitors' firms and financial advisers. Four service lines: **AI receptionists** (voice and web chat), **automations and workflows** (the repetitive work between systems), **custom and machine learning bots** (trained on the firm's own documents and precedents), and **self-hosted deployment** (all of the above running inside the client's own infrastructure). None of it runs off a shared script or a template. The buyer is a partner, practice manager or operations lead who is nervous about liability, not a consumer excited about AI.

**Self-hosting is the commercial centre of gravity.** Every competitor makes promises about how carefully they handle client data. Self-hosting removes the question entirely: the data never leaves the building. For law and finance that is close to unanswerable, and no venture-funded platform selling one shared product to five thousand customers can offer it.

## What this site has to beat
Researched the category already — Belix.io and the wider AI-receptionist market (Bland AI, Synthflow, Retell, Vapi, and others). The pattern across nearly all of them:
- No pricing shown anywhere, only "book a demo"
- Testimonials with no name, company, or logo attached
- No named integrations, no visible security or compliance posture
- One generic pitch for "service businesses," nothing industry-specific

Build the opposite of all four, from the homepage down.

## Differentiation strategy — the spine of the whole site
Be honest internally about this: Anteroom will run on the same underlying voice platforms as its competitors (Retell, Vapi, Bland). Same models, same voices, same latency. So "better AI," "more natural conversations," and "24/7 availability" are **not** differentiators — they are table stakes that any competitor matches next week. The site must never lead with them.

The real differentiation is in five things a platform company serving 5,000 generic businesses structurally cannot be bothered to do. Every one of these should be visible on the site.

**1. Compliance artifacts, not compliance claims.** Competitors say "GDPR compliant" and hand the buyer nothing. Anteroom ships things a compliance officer can actually use: an adaptable DPIA template, a DPA ready to sign, an exportable audit log fit to put in front of the SRA or FCA, and a quarterly compliance report showing disclosure rates and escalation events. Tedious, unglamorous, doesn't scale across unrelated verticals — which is exactly why it's defensible. It also reframes the purchase from "should we risk this?" to "this makes our next audit easier."

**2. The escalation path is the product, not the edge case.** Everyone engineers what the AI says; almost nobody engineers what happens when it shouldn't speak. In these verticals that inverts — the SRA cares about safeguarding and distress, the FCA about vulnerable customers, healthcare about clinical triage. Make "it knows when to stop talking" a headline claim, backed by visible detection rules, routing, and a logged record of every escalation and why it fired. No competitor is making this pitch.

**3. Hand the firm real control** — see the Control panel section below. This is the largest single differentiator.

**4. Report the metric that matters.** Competitors report calls answered. Anteroom reports enquiries that became instructed matters or booked advice appointments — tied to the firm's actual revenue event. This changes the renewal conversation from cost to return.

**5. Smallness as the weapon.** Anteroom can spend a day in a firm's office mapping how intake genuinely works — which enquiries matter, which fee earner gets what, where the current process leaks. A platform company cannot do this at their price point. It isn't scalable, and that's the point: it can't be copied precisely because it doesn't scale.

**6. Self-hosting nobody else offers.** A platform company running one multi-tenant product physically cannot deploy inside a client's network; the whole business model forbids it. Anteroom can, because it builds per firm anyway. This converts the hardest objection in regulated sales ("where does our data actually go?") into a closed question. Lead with it.

**7. Leadership the buyer recognises.** CEO Hammad Khan is a former CFO and board member of 10+ years at Arabian Minerals and Chemicals Co. Ltd., a Saudi industrial supplier to the oil and gas sector with client engagements including Saudi Aramco and SLB. Competitors in this space are either faceless platforms or technical founders with no finance-side credibility. Someone who has personally signed off vendor procurement at that level is a trust signal no VC-backed competitor can manufacture, and it directly answers the "why trust a new company?" objection. See the Leadership section under the homepage plan for the accuracy constraints on how this is stated.

**Internal caveat, not for the site:** none of this is patentable and all of it is copyable given motivation. The moat is depth of relationship and speed of response in a niche too small for a platform company to care about. Real, but continuously earned rather than built once.

## Design process — work through this before writing code
Ground every decision in the real subject: a business answering the phone or chat for a solicitor's firm or financial adviser, at the exact moment a nervous prospective client is deciding whether to trust them. The audience is a partner or practice manager weighing vendor risk, not a consumer. The page's one job: make that person feel this was built by people who understand their liability, not by a generic AI-tools reseller.

Work in two passes. **Note: the palette, typography, and logo are already decided — see the Brand system section below. Do not re-pick them.** The two-pass process now applies to layout and the signature element only:
1. **Brainstorm a layout plan first.** A layout concept described in a sentence or sketched in ASCII, and one signature element — the single thing this page gets remembered by — both derived from the locked brand tokens.
2. **Critique the plan before building anything.** Check the layout isn't the generic default you'd produce for any similar page. If it is, revise and say what changed and why.

One idea worth testing, not a mandate — swap it for something better if it fits the brief harder: this business's entire product is a conversation happening on someone's behalf. A signature element built around a live or animated transcript/waveform — an enquiry actually being handled in real time — is grounded in the real subject, rather than a decorative icon grid or gradient.

Spend the one bold move on that signature element. Keep everything around it quiet and disciplined — this buyer reads over-decoration as unserious. Hit a quality floor regardless of style: responsive down to mobile, visible keyboard focus, reduced motion respected, fast load.

## Brand system — locked, build against this exactly

### Name and logo
**Anteroom.** The mark is an arch that is structurally already the letter A, so the threshold and the initial are one object rather than an icon bolted onto a wordmark. Stroke-only SVG, no fills, no gradients — it scales from favicon to business card in a single colour. An inner arch line in brass suggests depth: a doorway you can see through. The wordmark is set in Libre Caslon Display beside it.

```svg
<svg width="34" height="38" viewBox="0 0 34 38" fill="none">
  <path d="M3 37V16C3 8.3 9.3 2 17 2C24.7 2 31 8.3 31 16V37" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="square"/>
  <path d="M10 37V17C10 13.1 13.1 10 17 10C20.9 10 24 13.1 24 17V37" stroke="var(--brass)" stroke-width="2.2" stroke-linecap="square"/>
  <path d="M10 25H24" stroke="var(--brass)" stroke-width="2.2"/>
</svg>
```
On dark backgrounds the outer stroke becomes Paper and the inner strokes become Brass Lift.

### Colour tokens — light and dark mode both required
The palette carries deliberate Saudi heritage, because the CEO's background is Saudi enterprise and the Middle East is a planned future market. Deep green comes from Najdi and wider Gulf visual tradition — the palm and the oasis — and limestone from the mud-brick and stone of Diriyah. Brass is the bridge: it is simultaneously the nameplate outside a solicitor's chambers and the gold that runs through Gulf premium branding.

**Do not use the Saudi flag green (`#006C35`).** The flag carries the shahada; a private company appropriating it reads as presumptuous rather than respectful. The deep desaturated green below gets the heritage without the overreach.

| Token | Light mode | Dark mode | Use |
|---|---|---|---|
| `--ink` | `#101F1A` | `#F1EEE7` | Primary text |
| `--bg` | `#F1EEE7` | `#101F1A` | Page background (Limestone / Najd Ink) |
| `--surface` | `#FFFFFF` | `#172C25` | Cards, panels |
| `--deep` | `#1B4034` | `#1B4034` | Feature sections and the demo panel — same in both modes |
| `--secondary` | `#4A5F57` | `#9FB0A8` | Secondary text, captions (Sage) |
| `--brass` | `#A87E3C` | `#D9B173` | Brass *text* — the light value is darkened to pass AA on limestone |
| `--brass-solid` | `#C0954E` | `#D9B173` | Button fills, the mark, live indicators |
| `--brass-hover` | `#8E6930` | `#E5C795` | Hover state |
| `--border` | `#DFDAD0` | `#2A3F37` | Borders, dividers, disabled fills (Sand) |

Note the two brass values. `#C0954E` is correct as a *background* behind dark text, but fails AA as small text on limestone — use `#A87E3C` for brass text in light mode. Getting this wrong is the single most likely accessibility failure in this palette.

### The mashrabiya motif
The mashrabiya is the carved lattice screen set into a doorway: it filters what passes through while letting light in, and lets the person inside see out without being seen. That is a near-literal description of the product, which is why it earns its place — it's a product metaphor that happens to be heritage, not decoration that happens to be relevant.

Implement as an SVG `<pattern>` of interlocking eight-point geometry in brass. Rules: 10–18% opacity as texture behind deep-green sections, or as a hairline frame around the live-demo panel. Never full strength, never coloured beyond brass, never combined with a second decorative pattern. The arch stays logo-only and does not become a repeating element — the mashrabiya covers that job.

Implement as CSS custom properties swapped by a `[data-theme]` attribute on `<html>`, with a visible toggle in the header. Default to the user's `prefers-color-scheme`, and persist their explicit choice in React state for the session. **Do not use localStorage — it fails in this environment.**

Contrast rules that hold in both modes: brass is used as a *background* behind dark text, or as brass-hover on dark — never as small brass text on a light background, which fails AA. Brass is never the only signal for anything; always pair it with a label or icon.

### Typography
- **Display — Libre Caslon Display.** An English typeface from 18th-century London, the letterform of legal printing. Headlines and wordmark only. Never body copy, never UI labels, never buttons.
- **Body — IBM Plex Sans.** Chosen for small-size legibility, because this site carries an unusual amount of disclosure and compliance text that must stay clear at 13–14px.
- **Utility — IBM Plex Mono.** Reserved strictly for the live-transcript signature element, timestamps, and genuine data readouts. Not for decorative eyebrows.

**Typography stays unchanged despite the heritage palette.** Resist any pull toward a decorative Arabic-inspired Latin display face — that is the fastest way to make a heritage-aware brand look like a themed restaurant. Caslon carries authority in both markets without costume. If Arabic-language pages are added later, pair with a real Arabic typeface (IBM Plex Sans Arabic matches the body face exactly) rather than styling Latin type to imitate Arabic script.

Both families are free on Google Fonts:
`https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap`

### Coherence rules
- **Corners:** 3–4px throughout — buttons, cards, inputs. Not pill-shaped, not square.
- **The arch is logo-only.** The mashrabiya is the only recurring graphic motif. Nothing else gets invented alongside either.
- **Deep green carries meaning.** In light mode, reserve `--deep` sections for the hero and live demo, so it signals "this is the live product" rather than being ambient.
- **Buttons:** primary is always brass, secondary is always outlined. Never two brass buttons side by side. Hover, focus, active, and disabled must all be visually distinct, with focus a visible outline rather than a removed default.
- **Future verticals inherit this system unchanged.** Verticals differ in copy and compliance content, never in palette or type.

### The tension to hold — read this before deviating
The buyer today is a UK solicitor or financial adviser; the Middle East market comes later. This palette is built so the heritage reads as *quietly architectural and premium* to the first audience and as *familiar* to the second — deep green and brass are at home in Lincoln's Inn and in Riyadh alike. That dual reading is the whole design achievement, and it breaks the moment anything becomes overtly themed. If a decision ever forces a choice between the two audiences, serve the buyer you have now. Heritage that costs the first client is expensive decoration.

## Design execution requirements
These apply no matter what the two-pass process above lands on:
- **Motion** — deliberate, not scattered: subtle scroll-triggered reveals as sections enter view, micro-interactions on buttons and cards that respond within roughly 150–250ms (nothing sluggish), and the signature element doing something alive — a waveform pulsing, a transcript appearing line by line — rather than sitting static. No parallax gimmicks, no scroll-jacking, no animation for its own sake; this is a trust-driven B2B buyer. Respect prefers-reduced-motion throughout.
- **Graphics** — no stock photography, no generic icon packs. Custom, subject-grounded visuals: an actual mockup of the transcript or dashboard view, simple line-art or abstract shapes drawn from the real subject (waveforms, chat bubbles, a stylised docket or ledger mark) rather than decoration for its own sake. One consistent custom icon set if icons are used at all, never mixed styles.
- **Fonts** — set by the Brand system above (Libre Caslon Display / IBM Plex Sans / IBM Plex Mono). Hold the discipline: display for headlines only, mono only where real machine output is shown.
- **Colour and buttons, functionally** — WCAG AA contrast minimum for all text in *both* light and dark modes, checked separately for each. Brass always reads as "the action to take," never scattered decoratively, and never the only signal for something important. Every button needs real hover, active/pressed, focus, and disabled states, not just a colour swap, with an unambiguous hierarchy between primary and secondary. Touch targets sized for a finger, not a mouse cursor.

## Site architecture
Build service pages and sector pages as two repeatable templates sharing one layout and design system. Adding a fifth service or a fourth sector should cost a day, not a rebuild.

**Core**
- **Home** — the four service lines, the live demo, the controls, pricing, booking
- **Pricing** — reception tiers with real numbers, plus how the other three lines are scoped
- **Trust & Security** — data residency, self-hosting, DPA, audit logs, retention

**Service pages** (one template, four instances, each with its own interactive element — see the build playbook)
- `/ai-receptionists`
- `/automations`
- `/custom-bots`
- `/self-hosted`

**Sector pages** (one template, three instances)
- `/for-law-firms` — fully built at launch
- `/for-financial-services` — fully built at launch
- `/for-healthcare` — entry point only at launch; see the healthcare section below

## Homepage, section by section
Structure deliberately follows the conventions of the modern AI-company site (short, dense, dark-first, video high up, bento grid), because the earlier editorial version read as a professional-services brochure rather than a software company. Substance stays differentiated even though the skin is conventional.

- **Header** — sticky, blurred, logo, four nav links, theme toggle, one primary CTA.
- **Hero** — centred. Status pill, one big claim, one subhead naming all four service lines, two CTAs, then a mono line carrying the three hard differentiators (UK/EEA residency, self-hosting available, pricing published below).
- **Video** — directly under the hero, before any feature copy. Ninety seconds of a real enquiry being answered and booked. Unedited beats polished.
- **What we build** — the four service lines in a bento grid, each with an icon, two sentences and three capability tags. This is the section that replaced "AI receptionist" as the centre of the page.
- **Live demo** — scenario tabs cycling real transcripts (conveyancing, mortgage, distress call), beside cards pointing to the chat widget and the booking flow. Headline should be a flat contradiction of the category's usual claim, e.g. "Not a mockup. The actual thing."
- **Your controls** — the working console: editable script, approval workflow, confidence slider, blocklist, review queue, and an arming kill switch. Followed by a five-item trust strip.
- **Pricing** — three reception tiers with an annual toggle, and a plain statement that automations, custom bots and self-hosted work are scoped separately.
- **Who is behind this** — the founding-client offer and Hammad Khan's background in one bento block. Requirements and accuracy constraints unchanged (see below).
- **Book a demo** — a real calendar: month grid, weekday-only, sixty-day window, time slots, details form including which service line they want, confirmation state.
- **Footer** — four columns, the four service lines under "Build", and the legal disclaimer that Anteroom provides no legal, financial or medical advice.

**Leadership block requirements (unchanged):**
- Full name, real company, real dates, LinkedIn link. `[PLACEHOLDER — LINKEDIN URL]`
- Written confirmation Hammad is free to name Aramco and SLB publicly.
- Use the full legal name **Arabian Minerals and Chemicals Co. Ltd.**, not "Arabian Minerals Company".
- **Never imply Aramco or SLB are Anteroom's clients.** They were AMC's.
- One real professional headshot is the sole exception to the no-stock-photography rule.

## /for-law-firms — must include
- Plain, upfront language that the AI is intake and triage only, never legal advice, and discloses itself as automated at the start of every conversation
- Proof that the workflow flexes by practice area — conveyancing, family law, and personal injury each need different qualifying questions and different routing, and the page should show the firm's actual practice mix gets built in, not one generic legal-intake script
- A line addressing personal injury specifically if that's a target practice area — the SRA has extra restrictions on unsolicited approaches and paid lead access there
- An explicit escalation promise: distress, safeguarding, or urgent matters reach a human immediately
- Data handling specifics: UK/EEA residency, a DPA, a stated retention period

## /for-financial-services — must include
- Clear, visible language that the AI gives no recommendations and isn't regulated advice — it books time with someone who is
- Proof that the workflow flexes by firm type — a mortgage broker, a wealth manager, and an insurance adviser need different screening questions and plug into different systems, and the page should show that gets configured around the firm, not handed over as one generic finance script
- A line on how vulnerable-customer situations (financial distress, confusion) get detected and handed to a human
- Something on Consumer Duty in plain English — "we help you evidence good outcomes," not jargon
- Named accountability: who at the client firm owns sign-off, mentioned as part of onboarding

## /for-healthcare — entry page only at launch, and why
Healthcare is a planned third vertical, not a launch bet. At launch this page states the intent and invites conversation; it does not claim compliance depth that can't yet be evidenced. The bar is materially higher than law or finance:
- Patient data is special-category data under UK GDPR — it needs an Article 6 lawful basis *and* a separate Article 9 condition, and a Data Protection Impact Assessment is effectively mandatory
- The CQC applies the same governance standard to administrative AI as to clinical AI — there's no lighter touch for "just reception"
- Every call must open with a recording-consent notice before any patient information is shared
- Clinical triage must stay human. The AI cannot assess urgency or give health advice, and must escalate the moment a caller describes symptoms or pain. This is a harder, brighter line than the law and finance boundaries
- Buyers will ask for DSPT evidence and ISO 27001 as proof layers — neither of which exists on day one
- It's also the most crowded of the three UK markets, with named incumbents already holding real mindshare among private clinics

Build this page out fully only once one of the other verticals has a paying client and the compliance groundwork (DPIA, DPA covering special-category data, evidenced retention and escalation) is genuinely in place.

## Copywriting voice
Write from the visitor's side of the screen, not the system's — say what a partner or adviser actually gets, never "leverages" or "unlocks." Active voice: a button says what happens when it's used ("Book a demo," not "Learn more"). Plain and specific beats clever. Cut filler adjectives — "seamless," "revolutionary," "cutting-edge" — if the sentence still works without one, it didn't need it. Two headline directions to test, not to copy verbatim:
- "Your firm's first impression, covered around the clock."
- "Every enquiry answered. Every one inside your rules."

Any testimonial that's real gets a full name, firm, and role — never "— [Business] client."

**Never lead with, anywhere on the site:** "better AI," "more natural conversations," "advanced models," "24/7 availability," or anything else a competitor can match next week. These are table stakes. Lead with control, compliance artifacts, escalation, and the revenue metric instead. If a headline would still be true on a competitor's site, rewrite it.

## Explicitly avoid
- Stock photography of people shaking hands or pointing at laptops. One real professional headshot of the CEO in the Leadership section is the sole exception.
- Any of the three AI-default looks named above
- Numbered dividers (01/02/03) used purely as decoration where there's no real sequence behind them
- A vague "Trusted by 500+ businesses" line with no logos or names behind it
- A pricing page that's just another "book a call" button

## Pricing — build these tiers into the page

### Where the market actually sits
- Commodity tools: £20–99/month (Upfirst $24.95, Dialzara $29, various UK budget tools) — generic, template-driven, no vertical depth
- The regulated-vertical tier, where Anteroom competes: Softomate flat £299/month for UK legal and property; LegalClerk AI $400/month unlimited calls with legal-specific intake; Smith.ai hybrid from ~$285/month; Moneypenny £160–500/month
- Setup fees are a separate, normal revenue line: £0–2,000 in the UK, $500–2,500 for done-for-you voice AI builds
- Underlying platform cost is roughly $0.07–0.24/minute — that's the margin floor

### Scope: these tiers cover reception only
Automations, custom bots and self-hosted deployment are project work and get scoped and quoted individually. Say so plainly on the page rather than inventing tiers for work that varies by an order of magnitude. Indicative internal anchors, not for publication: automation builds £1,500–6,000 depending on system count; custom RAG bots £4,000–15,000; self-hosted deployment £6,000+ plus infrastructure, with an ongoing support retainer on all three.

### The reception tiers
| Tier | Price | Includes |
|---|---|---|
| **Practice** | £249/mo | One vertical, core intake and booking, one calendar or CRM integration, ~150 calls |
| **Chambers** | £449/mo | Phone + web chat, practice-area routing, PMS/CRM integration, full compliance pack, ~400 calls |
| **Bespoke** | From £849/mo | Multi-office, multiple practice areas, custom integrations, priority support |
| **Setup** | £495 one-off | Workflow mapping, script design, integration, testing — **waived for founding clients** |

### Positioning logic — keep this in the copy
£249 clears the commodity tools without being unreachable. £449 sits alongside LegalClerk and above Softomate's flat £299, and that premium is justified by custom workflow configuration rather than a template — say so plainly on the page. Do not undercut the recurring price to compensate for having no track record; discount the setup fee instead, or the business anchors low permanently.

### Keeping it versatile
- Show an annual toggle (two months free) — standard, and it improves cash flow while you're small
- State call allowances as guides with a named overage rate, not hard caps, so a busy month doesn't feel like a penalty
- Every tier gets the same compliance floor — disclosure, escalation, DPA, UK/EEA residency. Never make compliance an upsell; for this buyer that reads as a red flag
- The same applies to the control panel. Script editing, the kill switch, the blocklist, and the approval workflow are in every tier. Gating control behind a higher tier would destroy the exact thing that differentiates the business
- Add a plain "your volume doesn't fit these? talk to us" line rather than inventing a fourth tier
- Prices are a starting position, not a commitment. Revisit after the first three clients, when real call volumes and margins are known

## Build notes
Default to React + Tailwind, single-file components where reasonable. Treat /for-law-firms and /for-financial-services as real routes sharing a layout and design system, not copy-pasted homepages with find-and-replace.

Set the brand tokens up as CSS custom properties once, at the root, and derive everything from them — no hardcoded hex values scattered through components, or light/dark mode will drift. Ship the theme toggle from the start rather than retrofitting it; both modes need checking as you build, not at the end. Use React state for theme preference, never localStorage.

Ship the live-demo section as a genuine interactive component even if the AI call/chat backend behind it is mocked for now — that demo is doing most of the persuading. Build the control panel section as a real clickable mock too: toggles that move, a threshold slider that slides, a kill switch that visibly arms. A static screenshot of a control panel proves nothing; a panel the visitor can touch proves the whole differentiation argument in about four seconds.
