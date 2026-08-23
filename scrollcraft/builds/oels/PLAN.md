# PLAN — Oels

Reads from `BRIEF.md`. Written before any page markup.

---

## Grammar: Chaptered editorial (§2.2)

The page is a printed feature. Chapters are the unit. Hard cuts between grounds,
a folio in the margin rather than a fixed nav bar, a title page rather than a
media hero, and a colophon close where the ask sits in running text.

**Why the other seven lost:**

| Grammar | Why not |
|---|---|
| Filmic one-shot | Requires `scrub`. There is no footage, no ffmpeg and no API key, so the anchor device is unavailable. It also carries the skill's burden of proof and would be the fourth-wall default. |
| Live surface | Genuinely tempting: Oels is software and the control panel already computes. But it forbids marketing chrome, display headings and persuasion copy, and this is a whole marketing site with pricing, sector pages and legal documents. The grammar would have to be broken by page three. |
| Continuous world | Ruled out by the human directly: they chose distinct scenes. It also requires worldflight, the most fragile and expensive build available. |
| Typographic poster | The closest runner-up, and right about having no assets. Rejected because it bans cards and photographic ground entirely and the site has to carry tables, a pricing grid and three legal documents. Type-as-imagery cannot hold a DPA. |
| Gallery / catalog | Built for a range of objects. Oels sells four services and an argument, not a collection. Museum labels would strip the persuasion the page needs. |
| Split stage | Fits one act well (missed enquiry against captured enquiry) but not a whole site. Forcing thirteen pages into a two-column tension would flatten pricing and legal pages. |
| Rhythmic cutlist | Built for energy brands: streetwear, sport, drinks. Exactly wrong for a compliance-led sale to solicitors. |

**Chaptered editorial wins on three counts:** it needs no photographic assets, it
maps onto the ink-and-manuscript half of the vibe answer directly, and its stated
fit is "a method, a manifesto, a research-backed product, anything where the
visitor should feel they read something rather than watched something." That is
the exact feeling a practice manager assessing vendor risk needs to have.

It also extends to thirteen pages coherently: every page is a chapter of one
publication, and the folio system unifies them. The other grammars are
single-page shapes.

---

## Signature move: the rubric margin

A persistent rule down the left of the entire publication, present on every page.

- It is the same red margin rule a scribe ruled onto a page before writing, and
  the same one already down the side of the attendance note in the product.
- As the visitor passes each chapter, the margin **stamps a mark** that stays.
  By the colophon the margin is a complete record of what they just read.
- The marks are **navigation**: clicking one jumps to that chapter.
- At the peak the rule **breaks**. The red line stops, a gap opens, and a single
  rubricated annotation reads `intake halted`. The page's own record does what
  the product does.

Why it is not a kit device: nothing in the kit draws a persistent cross-page
trace, accumulates state from scroll history, doubles as navigation, or breaks
itself. It is the "running receipt" family in spirit but it is a manuscript
margin rather than a totals panel, it survives page navigation, and the break is
the page's peak rather than a summary.

Cost: one fixed SVG plus CSS custom properties. No video, no images, no layout
work per frame. It is the cheapest thing on the page, which is why it can be on
every page.

---

## Feeling curve and score

Curve is in `BRIEF.md` and was written first. Devices assigned after.

| # | Chapter | Feeling | Device | Why this one |
|---|---|---|---|---|
| 0 | Title page | Composure | `flow` + `in` | A title page is set type on paper. It does not move, and that is the point. |
| I | The front door | Recognition | `reveal` (iris, once) + `parallax` | A wipe is a change of state, and the lattice literally becoming ruled lines is a change of state. The page's one iris. |
| II | **The call that stops itself** | **Alarm, then relief** | `pin` + bespoke margin break | The frame must hold while the record accrues and then stops. Pin is the only device that lets the stage stay still while content advances. |
| III | What we build | Steadying | `flow` + `in` | Deliberately ordinary after the peak. Four things stated flatly. |
| IV | The keys | Agency | `pin` + pointer | The page stops moving and starts responding. They operate it. |
| V | The price | Trust | `pan` | Lateral travel reads as breadth. Three tiers side by side is a range, not an argument. |
| VI | Colophon | Resolution | `reveal` (up) | The margin's record resolves. The ask sits in running text, as the grammar requires. |

**Checks:**

- Device families used: `flow`, `reveal`, `pin`, `pan`, `parallax`, pointer. Six, against a floor of four.
- No family twice in a row: flow, reveal, pin, flow, pin, pan, reveal. `pin` appears at II and IV, separated by III.
- `scrub` acts: **zero**. Below the cap of two, forced by having no assets, and correct for the performance requirement.
- `count`: **banned on this build.** Oels has no clients and no verified figures, so every number a counter could show would be invented.
- Adjacent feelings all differ.
- Peak is II, with the largest span. Chapter I is quieter than II by design.
- Total length target 9 to 11 viewport-heights. Avoids the 13.6 to 13.8 band the skill flags as a fingerprint.
- Grammar bans respected: no `scrub` past one chapter, no `spotlight`, no `magnet`, no full-bleed scrub hero, no pinned crossfade type act, no drift as a continuous gradient. Grounds hard-cut per chapter instead.

---

## Fingerprint row

Registry `../../FINGERPRINTS.md` was empty before this build, so the 4-of-6 gate
is cleared automatically. Row recorded for the next build to clear.

| Dimension | Value |
|---|---|
| Grammar | Chaptered editorial |
| Nav treatment | Folio in the rubric margin, updating by chapter, clickable |
| Hero device | Title page. Set type on stone, no media above the fold |
| Act-sequence shape | flow, reveal, pin, flow, pin, pan, reveal. 7 chapters, 9 to 11vh |
| Close pattern | Colophon. Margin record resolves, CTA as a line of running text |
| Signature move | The rubric margin that accumulates marks and breaks at the peak |
| World | Stone and ink. No photography. Lattice as the only texture |
| Port | Static HTML, no build step |

---

## Performance budget

The human's constraint, treated as a hard requirement rather than a preference:

> "so if i were to run this on my janky laptop I would have no issues"

| Item | Budget | Why it holds |
|---|---|---|
| Video | **None** | No assets and no encoder. The heaviest possible element is simply absent. |
| Images | **None** | The world is type, rule and SVG lattice. |
| Total page weight | under 150KB | Engine 73KB raw, roughly 20KB gzipped, plus markup and one stylesheet. |
| Animated properties | `transform`, `opacity`, `clip-path` only | Never width, height, top, left, or `transition: all`. |
| Scroll work | One shared rAF, passive listeners | The engine already does this. Bespoke margin logic hooks the same loop. |
| Offscreen | Idle | Chapters outside the viewport do no per-frame work. |
| Reduced motion | Full fallback | Marks stamp instantly, the break is drawn statically, meaning survives. |

Verification is by measurement, not assertion. The skill's own harness needs
node and playwright, neither of which is on this machine, so the substitute is
the same programmatic audit already used on this site: computed contrast on every
text node in both grounds, horizontal overflow at 360px, and console errors,
across every page.
