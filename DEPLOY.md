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

Evidence from this repo's history:

| Commit | Author | Result |
|---|---|---|
| `67dc990` | `Harrison, Blake <charr53@okstate.edu>` | **blocked** |
| `76568ee`, `1d45f88`, `9c67048` | `harriibb <blakeharrison2002@icloud.com>` | built |

**`blakeharrison2002@icloud.com` is the email that works.** It's already set
locally — verify with:

```bash
git config user.email   # must print blakeharrison2002@icloud.com
```

This is *not* your Netlify login email and *not* necessarily your GitHub
account email. It is the **git commit author** email, and that's the only
thing Netlify checks.

If a build gets blocked, fix the author and re-push:

```bash
git commit --amend --author="harriibb <blakeharrison2002@icloud.com>" --no-edit
git push origin main
```

A `Co-Authored-By:` trailer for a non-member has **not** blocked a build here
(commit `9c67048` shipped with one). If a build ever fails and the author is
already correct, strip the trailer as the next thing to try.

---

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

- stamps the resume link with a content hash (`?v=a91b2619`) so a new PDF
  busts cache with no manual edit — this replaced a hand-typed `?v=` string
  that had to be changed in 6 places
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

**Open item as of 2026-08-05:** the site claims a *concentration in Information
Assurance* in the hero, the education card, and page metadata. The resume PDF
does not mention it. A recruiter sees both. Fix the PDF's education line.
