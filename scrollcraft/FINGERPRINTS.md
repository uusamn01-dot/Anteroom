# Fingerprint registry

One row per shipped build. A new build must differ from **every** row on at
least 4 of the 6 dimensions, checked against each row individually. If a plan
fails, change the plan, not this file. This is a record of what exists, not a
description of what you wish existed.

---

## oels — 2026-08-24

| Dimension | Value |
|---|---|
| **Grammar** | Chaptered editorial |
| **Nav treatment** | Two layers: a conventional sticky bar (kept, see deviation below) plus the rubric margin, a fixed rule carrying clickable chapter marks that accumulate as you read |
| **Hero device** | Title page. A rule, a running head, the headline and a standfirst set on stone. No media above the fold anywhere on the site |
| **Act-sequence shape** | flow, reveal, pin, flow, pin, pan, reveal. 7 chapters plus back matter, 9.0vh desktop. Peak is act 2 at 1.64vh against a 1.31vh next-largest |
| **Close pattern** | Colophon on stone: masthead plate, bio, the ask as a line of running text. The booking form is separate back matter behind it, carrying no folio and taking no mark |
| **Signature move** | The rubric margin. A scribe's ruled margin that stamps a mark per chapter, doubles as navigation, and **breaks** at the peak when the record writes "intake halted" |
| **World** | Stone, ink and Najd green. No photography and no video anywhere. Mashrabiya lattice is the only texture |
| **Port** | Static HTML, no build step. 13 pages on one shared stylesheet and one shared script |

**Shared with prior rows:** nothing. This is the first row in this registry.

**What the next build must avoid inheriting:** the title-page hero, the
stone/ink hard-cut alternation, the colophon-plus-back-matter close, and any
persistent left-margin trace. Four of those five are structural, so a second
chaptered-editorial build would fail the gate on grammar plus hero plus close
and would need to change at least three of the remaining dimensions.

---

## Recorded deviations from the grammar

Honest notes, so a later build does not inherit these as if they were the
grammar's own rules.

1. **Chaptered editorial forbids a fixed bar; this site keeps one.** The
   grammar assumes a single page. This is a thirteen-page site with service,
   sector and legal routes, and removing the nav would cost real usability for
   a compliance buyer who arrives on `/for-law-firms` from a search. The folio
   and margin carry the chaptering; the bar carries the routes.

2. **Only the homepage is chaptered end to end.** Inner pages take the title
   page, the running head, the hard-cut grounds and the margin, but their
   sections are not numbered chapters, because their sections are not a
   sequence the reader needs in order. Numbering them would be decoration, which
   `taste.md` bans.

3. **No `scrub` act anywhere.** Forced rather than chosen: no footage, no
   ffmpeg, no API key. It happens to serve the stated performance requirement,
   since video scrubbing is the heaviest thing a scroll page can carry.

4. **No `count` device.** Oels has no clients and no verified figures, so every
   number a counter could show would be invented.
