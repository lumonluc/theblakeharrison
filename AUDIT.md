# theblakeharrison.com — Audit

Measured 2026-08-04 against the live site and `source/` at commit `1d45f88`.

---

## First-30-seconds test

At 1440×900 the entire first viewport is: an "Open to work · Grad Aug 2026" pill, a 150px circular headshot, "OKLAHOMA STATE UNIVERSITY · MIS", the name "Blake Harrison" set at 68px in Fraunces, a one-sentence tagline, two buttons, and three stats — 3.78 GPA, Aug 2026, "6+ Systems Built."

There is no work above the fold. Not a project name, not a company, not an outcome. The first screen is 100% identity and credential, 0% proof. The first evidence of anything built appears at roughly 1,300px of scroll, past a hero and a full About section that restate the same claim.

**What a recruiter concludes in 30 seconds:** college senior, good grades, graduates in a year, "I do automation" — a resume rendered as a web page. They click Download Resume and never scroll. The site adds nothing the PDF doesn't already have, which is precisely the job it was built to do.

**What a technical lead concludes:** the H1 is a name, not a proposition. The tagline is three abstract nouns followed by two more. The one hard external validation on the site — a $75,000 funded trading account earned through evaluation — is the tail clause of the third bullet of the second card. Nothing is linked, nothing is measured, nothing can be checked. They will assume the systems are smaller than described, because nothing on offer lets them assume otherwise.

**Three specific above-the-fold liabilities:**

1. **"6+ Systems Built"** is the weakest element on the page. It is unfalsifiable, it invites "what are the other four?", and it contradicts the two-project reality. A vanity number where a fact should be.
2. **"Aug 2026 / OSU GRADUATION"** duplicates the badge sitting directly above it. One of three prime stat slots spent restating a line already on screen.
3. **The headshot** is a crop from a candid — a second person's shoulder is visible at the left edge and the background is a busy interior. At 150px it reads student photo, not professional portrait. It is also the OG image (see Technical health).

---

## Copy audit

### Head / metadata

| Line | Copy | Finding |
|---|---|---|
| 8 | meta description: "…unattended Linux pipelines, trading & risk platforms, and business automation" | **Overstates.** Every noun is plural; there is one pipeline and one platform. |
| 9 | title: "Blake Harrison · MIS · Automation & Full-Stack Systems" | "Full-Stack Systems" isn't a term anyone searches or hires for. No DFW, no target role. |
| 29 | JSON-LD `jobTitle`: "Management Information Systems Candidate · Automation & Full-Stack Developer" | "Candidate" is not a job title. `knowsAbout` lists 13 items including "Algorithmic Trading" — noise for a cybersecurity or BI reader. |

### Hero

- **`role="status"` on the badge** — an ARIA live region applied to static text. Wrong semantics (see Technical health).
- **H1 "Blake Harrison"** — the name is already in the header logo and the `<title>`. Spending the H1 on it wastes the strongest scan target and the strongest SEO signal on information the reader already has.
- **Tagline:** *"I build and operate automation systems, API integrations, and full-stack apps — from unattended Linux pipelines to trading and risk platforms."*
  - "API integrations" is a task, not a thing you build.
  - Plural again — one pipeline, one platform.
  - **Reads AI-generated.** Triple-noun list → em-dash → "from X to Y" range is the single most recognizable LLM cadence, and it is deployed in the most important sentence on the site.
- **Stats:** 3.78 GPA is legitimate and the strongest signal for a non-technical recruiter — keep. The other two are dead weight (see above).

### About

- *"focused on automation, systems integration, troubleshooting, and digital operations"* — four-noun filler list. "Digital operations" has no fixed meaning.
- *"I build and operate real systems for live businesses and clients"* — **the site's biggest honesty stretch.** "Clients," plural, implies a roster. There is one real client and it is the family agency. Separately, "real" is a tell: if you have to assert that the systems are real, you've conceded the rest of the page doesn't demonstrate it.
- *"an unattended Linux pipeline that publishes AI video content three times a day"* — concrete and checkable-sounding. **The best clause in this section.** Keep.
- *"a multi-account algorithmic trading and risk platform"* — "multi-account" is a config flag dressed as scale.
- *"the website, analytics, and automation behind a working insurance agency"* — "working" does no work.
- *"I like taking a system from broken or nonexistent to running, tested, and monitored."* — **the best sentence on the site.** The only line that says something about how you think rather than what you touched. It is buried at the bottom of paragraph two of section one. Promote it.
- **`about-highlights` list** ("Focus / Automation, integrations & full-stack"; "Builds / Linux pipelines, APIs & web apps") — the third and fourth restatements of the same claim. By the end of About the visitor has read the identical positioning four times and seen zero evidence.

### Projects

**Structural finding first: every project bullet is copy-pasted verbatim from the resume PDF.** The site delivers exactly zero information the PDF doesn't. As a "LinkedIn alternative" it currently has no reason to exist.

**AI Content Automation System — Harrison Insurance Agency**

- Bullet 1 ("…generates, schedules, publishes, and monitors AI video content across four social platforms three times daily for a live business") is the strongest bullet on the site. But **"for a live business" is redundant and hedging** — you named the agency one line above.
- Bullet 3: *"shifted production… toward higher-performing comedy and skit formats"* — **an unfalsifiable performance claim.** Give the number or drop the claim.
- **Zero outcomes across three bullets.** No runtime, no volume, no hours saved, no failure rate.
- **Disclosure flag:** nothing indicates Harrison Insurance Agency is family. A technical lead who notices the shared surname will feel they caught something. Pre-empt it — "my family's agency" or "a Frisco insurance agency" costs you nothing and removes the trap.

**Algorithmic Trading & Risk Platform — Independent Project**

- Bullet 1 is a five-item feature list — brochure copy. No architecture, no scale, no tradeoff.
- Bullet 2 (*"live-order failures caused by a broker filling-mode incompatibility"*) is **the best technical sentence on the site** — specific, shows real debugging. Buried as bullet 2 of card 2.
- Bullet 3 tail: *"$75,000 funded account through an external evaluation"* — the only hard third-party validation anywhere on the page, and it's a subordinate clause. Two risks as written: a non-technical recruiter reads "he has $75,000," and a technical reader reads "unnamed prop-firm challenge." Name the evaluator.

**"Also building" block (ClipBot, TCP Risk Dashboard, Debian Home-Lab Appliance)**

- **As currently written this is padding** — three projects at one vague line each, no evidence, and it supplies the arithmetic behind "6+ Systems Built." *(Resolved: the new resume gives all three real descriptions and its own two-tier structure — see Resume alignment. The block stays, rebuilt on that structure.)*
- **"TCP Risk Dashboard" is the only cybersecurity-adjacent item on the entire site** — one clause inside a dashed-border afterthought box, while cybersecurity is one of three target role families.

### Experience

- **"Technology & Digital Operations, Mar 2020 – Present"** at the family agency — a self-assigned title spanning six years from roughly age 17. The progression line partially discloses this; the title doesn't. A hiring manager who does the arithmetic will discount the whole entry.
- *"Operate the agency's AI content automation and social media systems"* — verbatim duplicate of the project card two sections up.
- **Dallas Digital:** *"Optimized Google Ads campaigns"* — "optimized" with no metric is the most common junior tell in existence. *"Delivered analytics reports tracking performance, reach, and conversions"* describes the job description, not what you did.
- **Earlier Roles:** *"ran a service business end to end, managing budgets, scheduling, and a small team"* — "managing budgets" is inflated for 2021 lawn care. This entire block dilutes a systems/security/BI pitch.

### Skills

- **"Claude Code" and "Cursor" listed as skills.** A technical lead reads this two ways, both bad: your differentiator is that you use AI tools, or the code isn't yours. Remove from the skills list. If an AI-assisted workflow is a genuine strength, it belongs in prose about how you work, not in a tag cloud beside Docker.
- **28 tags, one visual weight.** "Excel" sits next to "PostgreSQL" and "Docker." A flat tag cloud communicates "I have heard of these."
- **"Monitoring," "Process Improvement," "Workflow Documentation"** — unverifiable resume-speak.
- **SQL and PostgreSQL are listed but no project on the site uses a database.** Unbacked.
- **Nothing for two of the three target role families.** No Power BI, Tableau, dbt, or warehouse tooling for data/BI. No Splunk, Wireshark, nmap, NIST, or CIS for security. As written, the skills section argues you are an automation person and nothing else.

### Education & Honors

The most verifiable section on the site, sitting at position 5 of 6.

- **"CERTIFICATION — Anthropic Academy AI Fluency (2026)" and "Claude 101 (2026)"** are listed above two President's Lists and tagged with equal weight. These are short free courses. Labeling them "Certification" and ranking them first **overstates them.**
- The University of Arkansas 2022 Dean's List silently discloses a transfer with no context. Neutral, but readers notice.

### Contact

- *"Looking for opportunities in automation, systems integration, full-stack development, and digital operations."* — **cybersecurity and data/BI are absent.** Two of the three target role families do not appear anywhere in the site's own positioning statement.
- *"The fastest way to reach me is below."* — filler; delete.

### Resume alignment — new PDF supplied 2026-08-04

`Charles_Blake_Harrison_Resume_.pdf` (49,744 B, one page) replaces the shipped `C.BlakeHarrison_resume.pdf` (31,595 B). **It contradicts the live site on your current status.**

| | Site says | New resume says |
|---|---|---|
| Status | "MIS **candidate**", JSON-LD `jobTitle` "…Candidate" | "MIS **graduate** who builds, deploys, and operates production systems end to end" |
| Graduation | "**Expected** August 2026" | "August 2026" — flat, no hedge |
| Hero badge | "Open to work · **Grad Aug 2026**" (future tense) | past tense throughout |

Today is 2026-08-04. **A recruiter downloads a resume that says "graduate" from a page that says "candidate, expected August 2026."** That inconsistency is visible in one sitting, and the resume header now lists `theblakeharrison.com` — so the resume actively drives traffic to the page that contradicts it.

**Other deltas, all improvements:**

- **Certifications moved into Education** and are no longer badged "CERTIFICATION" above two President's Lists. This resolves fix #28 at the source; the site still needs to follow.
- **Skills regrouped 3 → 4 categories,** with Claude Code / Cursor / OpenClaw / MetaTrader 5 quarantined into "AI & Developer Tooling" rather than sitting beside Docker. A real improvement on the site's flat tag cloud — though it segregates the AI tools rather than removing them, so the "is the code yours" read is narrowed, not closed.
- **ClipBot is now genuinely specific:** "transcribes long-form video with faster-whisper, selects clip-worthy moments from the transcript, and cuts captioned short-form videos with FFmpeg." That is a real pipeline description, and it is better writing than anything on the site.
- Still **no BI tooling and no security tooling** — findings under Skills stand unchanged.

**What did not change: the two featured project bullets are word-for-word identical to the old resume and to the live site.** Zero metrics, "higher-performing" still unfalsifiable, "for a live business" still redundant. Every copy finding above survives the new resume intact.

**Decisions taken 2026-08-04:**

- **Degree is conferred.** All status copy moves to past tense — "MIS graduate", Education card "August 2026", JSON-LD `jobTitle` drops "Candidate", badge drops the future-dated hedge. The candidate/graduate contradiction is resolved in the resume's favour.
- **Follow the resume's structure.** The resume runs two tiers: two featured projects at three bullets each, then an "Additional Projects" list of three. The site mirrors that hierarchy, using the resume's new specific wording (notably ClipBot's faster-whisper/FFmpeg description) rather than the current padded one-liners. This supersedes the "exactly two projects" instruction — a two-tier list that matches the resume is not padding, and it preserves the TCP risk dashboard, the site's only cybersecurity signal.
- **"6+ Systems Built" still goes.** Listing real projects is not the same as asserting an unverifiable aggregate. The number has no source and invites a question you cannot answer.

### Cross-cutting AI-generated tells

1. Em-dash + "from X to Y" range construction in the tagline.
2. Abstract-noun lists of 3–4 items, everywhere: "automation, systems integration, troubleshooting, and digital operations" / "generates, schedules, publishes, and monitors" / "budgets, scheduling, and a small team."
3. **Mechanical symmetry.** Every project card has exactly three bullets. Every bullet is exactly one sentence. Openers are perfectly parallel: Built / Integrated / Reviewed, then Built / Diagnosed / Implemented. Human writing is lumpier than this.
4. Intensifiers standing in for numbers: "real systems," "live businesses," "higher-performing," "working."
5. **Four numbers on the entire site** — 3.78, $75,000, three-times-daily, four-platforms — and two of them are in the same bullet.

### Section numbering

"01 — Profile" through "06 — Let's talk" is a table of contents for a one-page site. It's decoration presenting itself as structure, and it's inconsistent: **"05 — Credentials" is numbered but absent from the nav.**

---

## Layout & hierarchy

**Information order is resume order, not portfolio order.** About → Projects → Experience → Skills → Education → Contact reproduces the PDF's sequence. A portfolio's job is the opposite: proposition and proof first, biography later.

**The page is 5,719px tall at 1440.** Projects begin around 1,300px. The reader must scroll past a hero and an About section that make the same claim in different words before reaching any work.

**Scannability within sections is fine.** Mono eyebrows, clear serif titles, consistent bullet glyphs, sensible line lengths (`max-width: 46ch` on the tagline, `52ch` on the contact intro).

**Scannability between sections fails.** Every section is the same white card on the same near-white ground with the same orange accent and the same shadow. `.section-alt` alternates `#f7f7f5` and `#ffffff` — a ~2% value difference that is effectively invisible, so the alternation does no work. Nothing on the page signals "this one matters more."

**Is the work provable? No.** This is the site's central failure.

- Zero outbound links to anything you built.
- **planoinsurance.com is named in the Experience copy as plain text and is not a link.** The single most clickable proof on the site is not clickable.
- The AI content system publishes to four social platforms. None are named or linked.
- No architecture, no diagram, no metric, no artifact, on either featured project.
- No GitHub, by design — which raises the bar on everything else, and nothing else clears it.
- No project detail pages. Six anchors on one page. A technical lead who wants depth has nowhere to go.

**Two structural defects found in the DOM:**

1. **All content below the hero is `opacity: 0` until an IntersectionObserver fires.** There is a fallback for browsers without IO, but none for JS that fails to load or is blocked. In that case a visitor sees the hero and nothing else. Content behind an animation gate is a real risk for a link on a job application.
2. **The active-nav IntersectionObserver marks multiple links active simultaneously.** Confirmed at scrollY 3600, where "Experience" and "Skills" are both underlined; and near the footer, where "Skills" and "Contact" are both underlined.

---

## Styling

**Current identity:** warm light-gray canvas (`#f7f7f5`), white cards, a single OSU orange accent (`#fe5c00`), Fraunces serif headings, DM Sans body, JetBrains Mono for labels and numerics. Depth entirely from soft ambient box-shadows. It is competent and safe. It is also a 2022-era SaaS template with an orange swapped in, and it does not read like it was designed for anything in particular.

**Diagnosis — six specific failures:**

1. **One accent doing every job.** `#fe5c00` is used for eyebrows, links, card top-borders, tag backgrounds, timeline dots and rails, bullet glyphs, the badge, the pulse dot, the logo mark, the primary button, honor tags, and org names. When everything is the accent, there is no emphasis hierarchy left to spend.
2. **Card monotony.** `.about-highlights`, `.project-card`, `.skill-group`, `.card`, `.honors-list li`, and `.contact-card` all resolve to: white background, 1px `--line` border, `--radius-lg`, `--shadow`. Six different content types, one visual treatment. The two featured projects — the entire point of the site — look identical to a list of honors.
3. **Depth is shadow-only.** `--shadow` and `--shadow-lg` are soft ambient blurs, the default SaaS look, and they are the sole mechanism for separating anything from anything.
4. **The type scale is flat.** Fraunces appears at 4.25rem, 2.2rem, 1.3rem, 1.25rem, 1.2rem, and 1.15rem — one enormous hero size and then five sizes clustered within 0.15rem of each other. There is no mid-scale, so everything below the hero carries identical typographic weight.
5. **No value rhythm.** The entire 5,719px page sits at one brightness. The CSS still carries `/* Hero (dark band) */` and `/* Contact (dark band) */` comments from a design that was reverted to light — the intent was there and got lost.
6. **Decoration that isn't earning its place:** the masked 46px grid overlay in the hero, the infinite pulse-dot animation, `translateY(-4px)` hover lift on every card including non-interactive ones, `▹` bullet glyphs, the dashed border on "Also building."

**Direction — more styling, less decoration:**

1. **Introduce value rhythm.** Commit one or two full-bleed bands to a deep ink surface (~`#101114`). The hero, or the projects section, or both. A page with two values has structure; a page with one value has none. This also solves the contrast failure for free — white on near-black passes AA trivially.
2. **Split the accent into roles.** Keep `#fe5c00` for large fills and borders only. Add `--accent-text` at ≥4.5:1 (around `#c44300`) for every orange-on-white text use. Required for the a11y-100 gate, and it forces the accent to mean one thing again.
3. **Build a real type scale.** Ratio-based, roughly 1.25, six steps. Use Fraunces at two of them, not six. The flatness is the reason the page reads templated.
4. **Differentiate surfaces by role, not by decoration.** The two featured projects get a distinct, heavier treatment — larger, numbered, with a metric strip and a diagram. Skills and honors get demoted to bare typographic lists with hairline rules: no cards, no shadows, no hover lift. Fewer boxes, greater contrast between the boxes that remain.
5. **Replace shadow-depth with line and space.** Hairline rules, deliberate whitespace, a grid that's legible in the layout itself. This reads "systems person" rather than "template," and it matches the audience — MIS and analyst hiring managers respond to structure and legibility, not gloss.
6. **Let one data element carry weight.** For an automation/BI candidate, an honest metric strip on each project card ("3×/day · 4 platforms · 18 months unattended") does more than any amount of visual polish. That is styling in service of proof, which is the only kind this site is short of.
7. **Retire the reveal animation,** or make it non-blocking. It buys nothing visually and currently gates all content behind JS.
8. **Replace the headshot.** A properly framed portrait on a plain ground, served at 2× (300px) in WebP/AVIF — not a 1179×1723 JPEG cropped from a candid.

---

## Technical health

### Lighthouse — desktop preset, live site, 2026-08-04

| Category | Score | Gate (≥95 / 100) |
|---|---|---|
| Performance | **96** | pass |
| Accessibility | **96** | **fail** — target is 100 |
| Best Practices | **100** | pass |
| SEO | **100** | pass |

Metrics: FCP 1.0s · LCP 1.0s · TBT 0ms · CLS 0.006 · Speed Index 1.1s.

**Failing audits:**

1. **`color-contrast` — score 0. The only thing between you and a11y 100.** Three nodes flagged, all `#fe5c00` at **3.11:1** against white (AA requires 4.5:1 for normal text):
   - `.logo-mark` "CBH" — white on orange, 11.52px
   - `.btn-primary` "View Projects" — white on orange, 15px
   - `.footer-top` "Back to top ↑" — orange on white, 14px

   **The same 3.11:1 orange is also used for `.section-eyebrow`, `.hero-label`, `.project-org`, `.tl-item .meta`, and `.honor-tag`.** axe sampled three nodes; **every orange-on-white text element on the page fails AA.** Patching only the three flagged nodes will score 100 and still fail a real audit. Fix the token, not the nodes.

2. **`render-blocking-resources` — 690ms estimated savings.** The Google Fonts stylesheet is the sole blocker: three families, 3–4 weights each, variable-axis. Critical path is html → fonts.googleapis.com CSS → fonts.gstatic.com woff2 — two extra round trips to a third-party origin (also flagged as `network-dependency-tree`).

3. **`uses-responsive-images` — 121KB savings; `modern-image-formats` — 46KB.** `unnamed.jpg` is **1179×1723 / 124,736 bytes rendered into a 150×150 circle — 98.98% wasted.** It is also the OG image, so it needs two derivatives rather than one resize.

### Console

**Zero errors and zero warnings from the site.** The four warnings captured (`ObjectMultiplex — orphaned data for stream "app-init-liveness"`) originate from a MetaMask browser extension content script, not from theblakeharrison.com. Site JS is clean.

### Responsive

| Width | Result |
|---|---|
| **1440** | Passes. Layout holds, no overflow. Caveat: nav can highlight two sections at once. |
| **768** | Passes structurally. Below the 860px breakpoint, so all grids collapse to one column; desktop nav still shows (drawer breakpoint is 700). **`hero-stats` is 2-column with 3 items — the third orphans onto its own row.** |
| **390** | Passes. See the correction below. |

**CORRECTION — this was originally reported as a P0 horizontal-overflow bug. It is not a bug.**

The original finding was based on `document.documentElement.scrollWidth = 977` against a 667px viewport, and inferred from that number that the page scrolls sideways on a phone. **That inference was wrong, and I did not test it before reporting it.**

Re-tested properly: the old page and the rebuilt page were served from the same origin and measured in identical 390px frames, then actually scrolled rather than just measured.

| | scrollWidth | clientWidth | `scrollX` after `scrollTo(500, 0)` | User can scroll sideways |
|---|---|---|---|---|
| Original site | 700 | 390 | 0 | **No** |
| Rebuilt site | 700 | 390 | 0 | **No** |

The inflated `scrollWidth` is a reporting artifact: `.nav` is `position: fixed`, and fixed-position elements are laid out against the viewport, so they inflate `scrollWidth` without creating any scrollable overflow. Nothing scrolled sideways on the original site, on any viewport.

An `overflow-x: clip` guard was added to `html` and `body` anyway — it is cheap insurance if the drawer ever stops being `position: fixed` — but it fixed nothing that was broken. **`scrollWidth > clientWidth` is not on its own evidence of a scroll bug, and I should have driven the scroll before calling it a P0.**

Also at 390: `hero-stats` stays 2-column until the 380px breakpoint, so "3.78 | Aug 2026" sit on row one and "6+" orphans below, left-aligned under the first column.

### Semantic HTML

**Good:** `lang="en"`; skip link; `<header>` / `<nav aria-label="Main">` / `<main id="main">` / `<footer>`; `<section>` + `<article>` for cards; 16 sectioning/landmark elements; exactly one H1; **no heading-level skips** (h1 → h2 → h3 throughout); every image has alt text.

**Defects:**

- **`aria-controls="primary-nav"` on `.nav-toggle` points at nothing — no element in the document has `id="primary-nav"`.** Broken ARIA reference.
- **`role="status"` on `<p class="hero-badge">`** — an ARIA live region on static text. Screen readers may announce it out of document order. Remove it.
- **Every `<ul>` is `list-style: none` with no `role="list"`.** Safari/VoiceOver strips list semantics when list-style is removed; 10+ lists lose their item counts.
- **No `:focus-visible` styles anywhere in `styles.css`.** Keyboard users get only the UA default outline, which is nearly invisible against the orange primary button and the near-black resume pill. WCAG 2.4.7 failure that Lighthouse does not catch.
- `.nav-toggle` keeps `aria-label="Open menu"` when open. `aria-expanded` does toggle, so this is minor.
- The three hero stats are a `<ul>` of bare `<span>`s with no programmatic association between number and label. A `<dl>` is the correct element.

### Meta / OG

**Present and complete:** description, `og:type`/`url`/`title`/`description`/`image`/`site_name`, `twitter:card`/`url`/`title`/`description`/`image`, JSON-LD `Person`, `favicon.svg`, CSP meta, referrer policy.

- **`og:image` is `unnamed.jpg` — a 1179×1723 portrait, aspect 0.68:1. `twitter:card` is `summary_large_image`, which expects ~1200×630 at 1.91:1.** Every share of this link — LinkedIn, Slack, iMessage — center-crops the portrait into a band across the face. **This is the link pasted on job applications; its preview card is broken on every platform.**
- Missing: `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale`, canonical link, `theme-color`, `apple-touch-icon`, `site.webmanifest`, `robots.txt`, `sitemap.xml`.
- CSP is delivered via `<meta http-equiv>`; `frame-ancestors` and `report-uri` are ignored in meta form. Covered in practice by the server header.

**Security headers — verified live via curl, all present and correct:** `strict-transport-security: max-age=31536000`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, full `permissions-policy` lockdown. Hosted on Netlify. **This is the strongest-executed part of the site.**

### Repo and build health

- **There is no build, no linter, no typechecker, and no test suite. No `package.json` exists anywhere in the repo.** "Build succeeds, zero warnings" and "lint + typecheck clean" are currently unmeasurable.
- **`source/` and `dist/` are byte-identical manual copies** — `diff -rq` differs only by two source-only files. There is no sync script; README step 2 is a human instruction. Any edit that skips the copy step ships stale code silently.
- Three orphaned images with zero references ship in the repo: `ovr-logo.png` (43KB) and `ovr-logo.jpg` (7KB) in `dist/`, `ovr2025-07-18 165732.jpg` in `source/` (filename contains a space).
- `vercel.json` is duplicated inside `source/` and `dist/`. Vercel reads it only from the project root, so **both copies are inert**; the live host is Netlify.
- `--container-narrow` is declared in `:root` and never referenced.
- Cache-busting is a hand-typed `?v=20260729` in three places × two folders = six manual edits per PDF revision.
- **`repo-audit.md` sits untracked in the working root of a repo that auto-deploys on push.** It is an account-wide audit unrelated to this site, and it documents the exact file paths of live credentials committed in other repositories (MT5 broker accounts, a Telegram bot token). Committing it would publish a map to those secrets. Gitignore it or move it out of the tree.

---

## Prioritized fix list

Effort: XS ≤30min · S ≤2h · M 2–6h · L 6–12h

### P0 — the site is failing at its job, or the gate cannot be met

| # | Fix | Effort |
|---|---|---|
| 1 | **Put proof above the fold.** Rebuild the hero to lead with a proposition and surface the two projects immediately. This is the whole reason the site underperforms. | M |
| 2 | ~~Fix horizontal overflow at ≤700px.~~ **Withdrawn — not a real defect.** Re-tested by driving an actual scroll at 390px: the original page never scrolled sideways. The high `scrollWidth` was a `position: fixed` reporting artifact. See the correction under Responsive. | — |
| 3 | **Fix the accent contrast token.** Add `--accent-text` at ≥4.5:1; replace every orange-on-white text use, not just the three Lighthouse flagged. Required for a11y 100. | S |
| 4 | **Fix `og:image`** — produce a 1200×630 landscape card from `IMG_5475.jpg` (graduation portrait, OSU Student Union background); add width/height/alt. The application link currently previews broken. | S |
| 5 | **Cut "6+ Systems Built."** Unverifiable aggregate with no source. Keep the additional-projects list, but rebuild it on the resume's two-tier structure and its specific new wording, styled as a plain list rather than a dashed afterthought box. | XS |
| 6 | **Fix `aria-controls="primary-nav"`** — add the missing id. | XS |
| 7 | **Ship the new resume and resolve the candidate/graduate contradiction.** Swap in `Charles_Blake_Harrison_Resume_.pdf`, then update the badge, hero label, About opener, Education card, and JSON-LD `jobTitle` to match. Needs your answer on status first (see below). | S |
| 8 | **Stand up the toolchain:** `package.json`, `html-validate`, `stylelint`, `prettier --check`, `lighthouse-ci`, and a real `source/` → `dist/` build script replacing the manual copy. Without this the Phase-2 gates cannot be evaluated. | M |

### P1 — materially changes what a reader concludes

| # | Fix | Effort |
|---|---|---|
| 9 | Rewrite hero, About, and both project cards. Strip the AI cadence, kill plural overstatement, promote the two buried strong sentences, add real metrics. | M |
| 10 | **Add evidence.** Link planoinsurance.com; add an inline-SVG architecture diagram per project; add a metric strip per project. | M–L |
| 11 | Reorder: proposition → work → experience → credentials → contact. Fold About into the hero. | M |
| 12 | **Styling pass.** One dark band for value rhythm; split accent roles; real type scale; differentiate surfaces by role; strip card monotony and unearned hover lift. | L |
| 13 | Retarget positioning copy to cover all three role families, or narrow the search. The contact section currently omits cybersecurity and data/BI entirely. | S |
| 14 | Rework Skills: remove "Claude Code"/"Cursor" as skills, tie tags to the projects that prove them, add depth for security and BI or drop those claims. | S |
| 15 | Self-host and subset fonts; drop to two families. Removes the 690ms render block. | S |
| 16 | **Replace the headshot with `IMG_5475.jpg`** (supplied 2026-08-04). Face crop is sharp at 460×460 native — ample for a 300px @2x avatar or a larger portrait treatment. Convert Display P3 → sRGB, serve WebP/AVIF, derive the OG card from the same source. | S |
| 17 | Add `:focus-visible` styles. | XS |
| 18 | Add `role="list"` to the delisted `<ul>`s. | XS |
| 19 | Fix the multi-active nav highlight. | XS |

### P2 — polish and hygiene

| # | Fix | Effort |
|---|---|---|
| 20 | Remove `role="status"` from the hero badge. | XS |
| 21 | Convert hero stats to a `<dl>`. | XS |
| 22 | Remove the reveal-on-scroll gate, or add a `<noscript>` fallback. | XS |
| 23 | Delete three orphaned images, both inert `vercel.json` copies, and the unused `--container-narrow`. | XS |
| 24 | Add `robots.txt`, `sitemap.xml`, canonical, `theme-color`, `apple-touch-icon`. | S |
| 25 | Drop the "01 — / 02 —" numbering, or make it consistent (Education is numbered but absent from nav). | XS |
| 26 | Reconsider "Earlier Roles" — restaurant and lawn care dilute a systems/security/BI pitch. *(Decision, not work.)* | XS |
| 27 | Gitignore or relocate `repo-audit.md`. | XS |
| 28 | Automate the `?v=` cache-bust in the build. | XS |
| 29 | Reframe the two Anthropic Academy entries so they don't outrank two President's Lists. | XS |
