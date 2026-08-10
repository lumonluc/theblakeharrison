# Deploying theblakeharrison.com

Everything here was learned the hard way on 2026-08-05. Read the first two
sections before touching a deploy — they cover the two failure modes that
have actually bitten this project.

---

## The one command

```bash
npm run verify && git add -A && git commit -m "..." && git push origin main
```

That lints, typechecks, builds, commits, and deploys. Netlify picks it up
automatically and the site is live in about a minute.

---

## Gotcha #1: there are TWO GitHub repos, and Netlify watches the one you'd
## least expect

| Remote | URL | Role |
|---|---|---|
| `origin` (fetch) | `github.com/harriibb/theblakeharrison` | your code repo |
| `lumon` | `github.com/lumonluc/theblakeharrison` | **what Netlify actually builds from** |

Netlify's *Build & deploy → Repository* is pointed at **`lumonluc/theblakeharrison`**,
not `harriibb`. Pushing only to `harriibb` succeeds, reports nothing wrong,
and does not deploy. This cost a full debugging round.

**This is already solved.** `origin` is configured with two push URLs, so one
push reaches both repos:

```bash
git config --get-all remote.origin.pushurl
# https://github.com/harriibb/theblakeharrison.git
# https://github.com/lumonluc/theblakeharrison.git
```

A correct `git push origin main` prints its result **twice** — once per repo.
**If you only see one block of output, the dual-push config is gone.** Restore it:

```bash
git config --unset-all remote.origin.pushurl
git remote set-url --add --push origin "https://github.com/harriibb/theblakeharrison.git"
git remote set-url --add --push origin "https://github.com/lumonluc/theblakeharrison.git"
```

Paste that as one line per command — the URLs are long enough to wrap in a
terminal, and a wrapped paste silently runs half the command.

---

## Gotcha #2: the commit author email decides whether the build runs

Netlify's plan only builds commits from **verified account members**. A commit
from any other author is rejected with:

> Build blocked: This commit is from an unrecognized Git contributor.
> This plan allows only verified account members to push.

Evidence from this repo's history: commit `67dc990` was authored from a
university address and was **blocked**; every commit authored from the
address currently in `git config user.email` has **built successfully**.

The working identity is already configured locally. Check it before
troubleshooting anything else:

```bash
git config user.email   # must match the verified member on the Netlify account
```

This is *not* the Netlify login email and *not* necessarily the GitHub
account email. It is the **git commit author** email, and that is the only
thing Netlify checks.

If a build is blocked, re-author the commit with the working identity and
push again:

```bash
git commit --amend --reset-author --no-edit
git push origin main
```

A `Co-Authored-By:` trailer for a non-member has **not** blocked a build here
(commit `9c67048` shipped with one). If a build ever fails and the author is
already correct, strip the trailer as the next thing to try.

---

---

## Gotcha #3: if deploys stop entirely, check the GitHub connection first

On 2026-08-05 five consecutive commits pushed successfully to both repos and
none of them published. The site sat on an old build for over an hour while
`git push` reported success every time.

**The cause was Netlify's GitHub account connection, not anything in this
repository.** Nothing in the code, the commits, or the config was wrong.

Things that were investigated and ruled out — check these *after* the
connection, not before:

| Suspected | Verdict |
|---|---|
| Pushed to the wrong repo | No — both remotes had the commit |
| Commit author not a verified member | No — same identity had built fine before |
| Repository private vs public | No — tested both, neither deployed |
| Stale edge cache | No — the `.netlify.app` subdomain served the same stale build, which rules out CDN caching |
| `command = "npm run build"` in netlify.toml | No — this was reverted during debugging and later restored; it was never the problem |

**The diagnostic that actually settles it:** open the Deploys tab.

```
app.netlify.com/projects/theblakeharrison/deploys
```

If recent commits are **not listed at all**, nothing is triggering — look at
the GitHub connection and the Netlify GitHub App's repository access. If they
are listed as **Failed**, the error text names the fix.

Netlify does not post commit statuses to GitHub on this repo, so
`gh api .../status` returns nothing useful. It is not a signal either way.

A useful outside-in check, since the custom domain caches aggressively:

```bash
curl -s https://theblakeharrison.netlify.app/ | grep -o 'css/styles\.css[^"]*'
```

If the `.netlify.app` subdomain and the custom domain agree, you are looking
at the published build — not a cache artifact.

## How the build works

`netlify.toml` is the source of truth and **overrides the Netlify UI**. The UI
shows "Build command: Not set" — ignore that, the file wins.

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"
```

Netlify runs `npm ci` then `npm run build`. Verified working from a clean
checkout. Node is pinned so a Netlify default bump can't change the output.

### Never edit `dist/` by hand

`tools/build.mjs` **wipes and regenerates `dist/`** from `source/`. Any manual
edit there is destroyed on the next build. Edit `source/` only.

The build also:

- content-hashes every asset the HTML references — CSS, JS, the portrait and
  the resume all get `?v=<hash>`. Without this, production once served a
  stylesheet 1.5KB behind the markup: the HTML had updated and the edge still
  held the old `css/styles.css`, which had no version in its URL and so no way
  to be invalidated per deploy
- excludes `Charles_Blake_Harrison_Resume.md` from the published output (it's
  the editable source for the PDF, not for visitors)

---

## Quality gates

`npm run verify` runs lint + typecheck + build. Run it before every push.

| Command | Checks |
|---|---|
| `npm run lint` | html-validate, stylelint, prettier |
| `npm run typecheck` | `tsc --noEmit`, strict, `checkJs` on the browser JS |
| `npm run build` | source → dist |
| `npm run serve` | serves `dist/` on :8000 with `no-store` |

Targets currently met in production: **desktop 100/100/100/100, mobile
98/100/100/100** (perf / a11y / best-practices / SEO).

Two constraints that are easy to break:

- **Accessibility must stay at 100.** `--accent` (`#fe5c00`) is only 3.11:1 on
  white and **fails AA as text**. Use `--accent-ink` (`#b84000`) for any orange
  text on a light surface; use `--ink` for text on an orange fill. The vivid
  accent is for fills, borders, and dots only.
- **Never gate content behind JavaScript.** A scroll-reveal enhancement once
  made every section below the hero invisible. If you add an animation that
  hides something, the content must render without JS.

---

## Verifying a deploy actually landed

```bash
curl -s https://theblakeharrison.com/ | grep -c "Information Assurance"
```

Non-zero means the new build is live. Netlify's edge caches aggressively, so
check content rather than trusting the dashboard.

Local dev caveat: `tools/serve.mjs` sends `no-store` precisely because a stale
cached stylesheet produced several false diagnoses during the rebuild. If you
serve `dist/` with anything else, expect to chase ghosts.

---

## Keeping the resume in sync

`source/Charles_Blake_Harrison_Resume.md` is the editable source;
`source/Charles_Blake_Harrison_Resume.pdf` is what visitors download. **Update
both** — the build does not generate the PDF from the markdown.

**Open item — the PDF and the site still disagree on one thing.** A recruiter
reads the site, clicks Download Resume, and sees both.

| | Site says | PDF says |
|---|---|---|
| GPA | 3.60 | 3.6 — **resolved 2026-08-10** |
| Concentration | **Information Assurance** | still not mentioned |

The site leads with the Information Assurance concentration in the hero, the
education card, the page title, the meta description and the JSON-LD. The
resume's Education line does not carry it. Add it and re-export:

> Bachelor of Science in Business Administration, Management Information
> Systems · Concentration: Information Assurance | GPA: 3.6

The PDF is a separate artifact — the build does not generate it from
`Charles_Blake_Harrison_Resume.md`. Update both.
