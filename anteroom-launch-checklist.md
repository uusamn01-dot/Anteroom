# Anteroom — Launch Checklist

Ordered by what actually blocks what. Costs are real, not estimates.

---

## Stage 1 — Get it live (a weekend, about £10)

| Task | Cost | Notes |
|---|---|---|
| Buy `anteroom.co.uk` | ~£10/yr | Cloudflare Registrar sells at cost. Buy `.com` too if it's free-ish, purely defensively. |
| Trademark check | Free | Search the IPO register and Companies House for "Anteroom" before spending on branding. Two AI companies already use the name in adjacent spaces. |
| Deploy on Cloudflare Pages | Free | GitHub repo → Pages → custom domain. Unlimited bandwidth, free SSL. |
| Email routing | Free | Cloudflare Email Routing for receiving; Zoho free tier if you want to send from the domain too. |
| Cookieless analytics | Free | Cloudflare Web Analytics. No cookie banner needed, which suits the positioning. |

---

## Stage 2 — Legal minimum before you take one booking

**Do not skip this.** The booking form collects personal data the moment it goes live.

| Task | Cost | Why |
|---|---|---|
| **Privacy notice** | Free to write | Legally required under UK GDPR. The footer already links to it. |
| **Terms of service** | Free to write | Sets out what you provide and, more importantly, what you don't. |
| **ICO registration** | £52/yr | Most UK data controllers must pay the data protection fee. Selling data protection competence while unregistered yourself is indefensible. |
| **Companies House registration** | £50 | You can be a director at 18. Law firm procurement takes a limited company more seriously, and it separates personal liability. |
| **Business bank account** | Free | Starling, Tide or Monzo Business. Do not run business money through a personal account. |
| **Template DPA** | Free to draft, worth paying to review | You promise one on the site. You need one that exists before the first client asks. |

**Total unavoidable: about £112 in year one.** Everything else on the list is free or optional.

Professional indemnity insurance is not legally required but a law firm's procurement may ask for it. Roughly £300–600 a year for a small tech consultancy. Wait until a client asks rather than buying it speculatively.

---

## Stage 3 — Finish the site content

| Gap | Owner | Notes |
|---|---|---|
| Hammad's headshot | Hammad | Real photo, plain background. The only stock-photo exception on the site. |
| Hammad's LinkedIn URL | Hammad | Ask him directly. Searching returns several unrelated people with the same name. |
| Exact AMC tenure dates | Hammad | So "over ten years" can be stated precisely. |
| Written OK to name Aramco and SLB | Hammad | Enterprise supply agreements often restrict this. Get it in writing. |
| Demo video | You | Ninety seconds, screen recording of a real call. Unedited beats polished. |
| Booking backend | You | Cal.com embed. Currently the form silently discards submissions. |
| Fictional firm names | You | "Whitfield and Co" and "Hartley Financial" are invented. Fine while labelled illustrative; replace with a real client once you have one. |

---

## Stage 4 — Build something you can actually demo

The site describes four service lines. Before a serious buyer conversation you need at least one of them working on a real phone number.

1. Set up a Retell or Vapi account and a Twilio number.
2. Build one intake flow for one practice area, most likely conveyancing.
3. Hard-code the disclosure as the opening turn. Not a prompt instruction, an actual first message the model cannot skip.
4. Add one escalation classifier, distress detection being the most persuasive.
5. Connect it to a Cal.com booking.
6. Ring it yourself thirty times. Ring it from a noisy room. Get someone with a strong accent to ring it. Fix what breaks.
7. Record the best call. That is your video.

This is roughly a fortnight of evenings, and it is the difference between a website and a business.

---

## Stage 5 — First client

Nothing above matters until this happens.

1. **Build the list.** Every law firm within a 45-minute journey of Romford. Expect 40 to 80. Filter to 5–20 fee earners: big enough to have the problem, small enough that the decision-maker is reachable.
2. **Walk in.** Ask for the practice manager. One question: how many enquiries do you think you miss outside office hours? Do not pitch on the first visit.
3. **Come back with their demo.** Rebuild the intake flow using their practice areas and their fee earners' names. That second visit is where deals happen.
4. **Ask Hammad for three Eastern Province introductions** in parallel. Take one discovery call before building anything for Saudi.

---

## Ordering note, said plainly

The website is sales support, not lead generation. No solicitor in Romford is going to find anteroom.co.uk by searching. The site's job is to make you look real *after* you have spoken to someone, and to let them show it to a partner who wasn't in the room.

So do not wait for the site to be perfect before starting Stage 5. Stages 1 and 2 are genuinely blocking, because you cannot legally collect data without them. Stages 3 and 4 can run in parallel with knocking on doors.

The single highest-value thing you can do this month is have one honest conversation with one practice manager about how many calls they miss. Everything else in this document is preparation for that conversation.
