# Anteroom — Build Playbook

How each of the four service lines is actually delivered, and how each service page proves it in the browser. Companion to the website brief.

---

## Part 1 — How we build it

### A note before the shopping lists
You are assembling, not inventing. Every competitor in this market is doing the same, so nothing below is a moat on its own. The moat is per-firm configuration, published pricing, handing over the controls, and self-hosting. Choose boring, well-documented components and spend the saved effort on the client relationship.

Self-hosting appears throughout because it is the commercial centre of gravity. Wherever there is a choice between a component that can run on a client's own infrastructure and one that cannot, take the self-hostable one even at some cost in polish. Otherwise the flagship promise quietly stops being true.

---

### 1. AI receptionists (voice and web chat)

**Voice pipeline.** Speech in, text out, model, text back, speech out, all inside about 800ms or the caller notices. Do not build this from parts at the start. Use an orchestration platform:

| Layer | Options | Notes |
|---|---|---|
| Orchestration | Retell AI, Vapi, Bland | Handles turn-taking, interruption, latency. Retell and Vapi expose more control; Bland is more turnkey. |
| Telephony | Twilio, Telnyx | Numbers, SIP trunking, call recording. Telnyx is usually cheaper at volume. |
| Speech to text | Deepgram (usually bundled) | Accent handling matters; test on real UK regional callers, not on yourself. |
| Text to speech | ElevenLabs, Cartesia (usually bundled) | Cartesia is faster, ElevenLabs warmer. |
| Reasoning | Claude or GPT via the platform | Where the intake logic and guardrails live. |

**Web chat.** Much simpler. A custom widget plus a small backend calling the same model with the same system prompt gives full control over disclosure wording and escalation. Do not use a chat SaaS that injects its own branding into a solicitor's front door.

**Integrations that actually close deals.** Calendar via Cal.com API, Google Calendar API or Microsoft Graph. Case management via Clio, LEAP or Actionstep for law; HubSpot or the client's existing CRM for finance. Confirm which system the firm already uses *before* the sales call, because "does it work with LEAP?" is often the only question that matters.

**Guardrails are engineering, not prompt decoration.**
- Disclosure is a hard-coded opening turn, not a model instruction. The model cannot skip it because it never gets the chance.
- Blocklisted topics are checked before the model sees the turn.
- Escalation triggers are classifier calls running alongside the conversation, not something the model decides for itself. A model asked to notice distress will sometimes not notice.
- Every escalation writes a log entry with the trigger, timestamp and destination. This is the artifact the compliance officer wants.

**Cost model.** Roughly $0.07–0.24 per minute all-in. At £449/month with 400 calls averaging four minutes, that is around 1,600 minutes, so £110–£310 in platform cost. Margin is real but thinner than it looks at the top of the range. Track it per client from day one.

---

### 2. Automations and workflows

**Use n8n, and self-host it.** This is the single most important tooling decision in the whole stack. Zapier and Make cannot run inside a client's network, so every automation built on them undermines the self-hosting promise. n8n self-hosts on a small VPS or the client's own server, has a visual editor the client can actually look at, and handles the ninety percent case.

Write custom Node or Python services only for the remaining ten percent: anything needing real logic, a proper database, or an API n8n has no node for.

**What firms actually want automated,** in rough order of how often it comes up:
- Client onboarding: engagement letter out, ID verification chased, matter opened, file created
- Document chasing: knowing what is outstanding and nagging politely on a schedule
- Conflict checks against existing client and matter lists
- Matter opening: one form, then records created in every system that needs one
- Reporting: the weekly or monthly numbers someone currently rebuilds by hand
- Post-matter follow-up and review requests

**Discovery method.** Sit with whoever does the work and ask them to show you their week. Watch for the moment they copy something from one window into another. That is the automation. Do not ask "what would you like automated", because people describe the work they find annoying rather than the work that is expensive.

---

### 3. Custom and machine learning bots

**Almost always RAG, almost never fine-tuning.** Firms think they want a model trained on their documents. What they want is a model that can *look things up* in their documents, which is retrieval-augmented generation. It is cheaper, updates the moment a document changes, and can cite its source. Fine-tuning is for changing behaviour and tone, not for adding knowledge, and it goes stale immediately.

**Stack:**
- **Vector store: Qdrant.** Self-hostable, fast, good filtering. pgvector is a reasonable alternative if the client already runs Postgres and you want one less service to maintain.
- **Chunking:** semantic or section-aware, not fixed character counts. Legal documents have structure; use it.
- **Embeddings:** a hosted embedding model for cloud deployments, a local open-weight one for self-hosted. Note that changing embedding model later means re-embedding everything, so decide before you index.
- **Retrieval:** hybrid search (dense plus keyword) beats pure vector search on legal and financial text, because exact terms, section numbers and party names matter and semantic similarity misses them.
- **Always cite.** Every answer returns the source document and section. An uncited answer from an internal research bot is worse than useless in a professional firm, because someone will rely on it.

**What these are actually for:** internal research assistants over precedent banks, matter triage and classification, document classifiers for incoming post, and knowledge bases over the firm's own accumulated know-how. Internal tools for staff, not client-facing. Keep it that way until the firm is confident.

---

### 4. Self-hosted deployment

**Be honest about the difficulty gradient.** These are not equally hard, and pretending otherwise will burn a client:

- **Automations self-hosted: easy.** n8n in Docker. Genuinely a solved problem.
- **RAG and chat self-hosted: moderate.** Qdrant plus a local model via Ollama or vLLM. Open-weight models (Llama, Mistral, Qwen) are good enough for retrieval and summarisation over the firm's own documents. Needs a GPU for reasonable speed.
- **Voice self-hosted: hard.** Local speech-to-text (Whisper) is fine. Local text-to-speech that does not sound obviously synthetic, inside the latency budget, is a genuine engineering problem. Do not promise a fully air-gapped voice receptionist until you have built one and heard it.

**The honest middle option** most regulated clients will accept: automations, RAG and data storage entirely on their infrastructure, with only the voice layer using a processor under a signed DPA with UK or EEA residency and zero retention. Say exactly that rather than implying everything is air-gapped. Overclaiming here is the one mistake that ends the relationship permanently.

**Infrastructure:** Docker Compose for a single client server, Kubernetes only if they already run it. UK regions if it is cloud (Azure UK South, AWS eu-west-2). Hand over documented runbooks and a backup procedure. Agree upfront who is on the hook when it breaks at 2am, and price the support retainer accordingly.

---

## Part 2 — Making each service page interactive

Every service page carries one signature interactive element that demonstrates the thing it sells. A screenshot proves nothing. Something the visitor can touch proves it in about four seconds. All four inherit the same layout template and brand tokens; only the interactive block differs.

### `/ai-receptionists` — the live transcript
Already built on the homepage: scenario tabs cycling real transcripts, with escalation lines highlighted. On this page, extend it:
- Add a fourth scenario the visitor picks from a dropdown of practice areas, so it reflects *their* work
- Show the structured data being extracted in a side panel as the transcript runs (matter type, urgency, contact captured), because that is the actual product output
- Keep the distress-call scenario prominent, since it is the most persuasive thing on the site

### `/automations` — a clickable workflow canvas
The strongest possible demo, and nobody in this market has one. Build a small node-graph:
- Pre-load three real workflows (client onboarding, document chasing, conflict check) the visitor switches between
- Clicking a node expands it to show what it does and which system it touches
- A "Run it" button animates a token travelling through the graph, nodes lighting up in sequence, ending in a result card
- Since it visually resembles n8n, it doubles as a preview of what the client will actually be handed

Implementation: SVG or absolutely-positioned divs with CSS transitions. No graph library needed for a fixed three-workflow demo.

### `/custom-bots` — ask the sample corpus
- A search box over a small fixed set of sample documents, with three or four suggested questions pre-written
- Answers stream in, then the citation appears underneath with the source document and section highlighted
- A toggle showing the same question answered *without* retrieval, so the visitor sees the difference between a confident guess and a cited answer

Implementation: a fixed question-to-answer map is honest and sufficient for a marketing page, provided the page says the answers are illustrative. A live model on a public page invites prompt injection and unpredictable output in front of a compliance-minded buyer.

### `/self-hosted` — the architecture toggle
- A diagram with a single switch: **Cloud** / **Your infrastructure**
- Flipping it re-draws the boundary line, showing which components move inside the client's perimeter and which do not
- Components outside the perimeter are labelled with what protects them (DPA, UK residency, zero retention)
- This visualises the honest middle option above, which turns a potentially awkward caveat into a credibility signal

Implementation: two SVG states cross-fading, with the boundary as an animated dashed rectangle.

### Rules across all four
- One interactive element per page. Two competes with itself.
- Every one must work on mobile. If it cannot, it does not ship.
- Respect `prefers-reduced-motion` throughout: show the end state immediately rather than animating.
- Label anything illustrative as illustrative. The entire pitch is honesty with a compliance-minded buyer, and a demo that overstates what the product does poisons that on the first page they visit.
- No `localStorage` anywhere.

---

## Part 3 — Sequencing, and an argument against building all of this

Four service lines with zero clients is a real risk, not just an ambitious plan. The failure mode is four half-built offers, none demonstrable, and a website describing capabilities that have never run for anyone.

Sensible order:
1. **Build reception properly and land one paying firm.** It has the clearest pitch and the shortest path to a case study.
2. **Sell automation into that same client.** They already trust you, you already know their systems, and it is the easiest second sale in the business.
3. **Add custom bots** once you have real documents from a real firm to build against.
4. **Offer self-hosting** when a client asks and will pay for the extra work, rather than as a headline promise you have not yet delivered on.

The website can describe all four from day one, provided each page is honest about what is live and what is in development. The healthcare page already sets that precedent. What it must not do is imply four mature service lines exist when they do not, because the first technical conversation with a serious buyer will expose it, and that buyer talks to other firms.
