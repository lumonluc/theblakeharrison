# theblakeharrison.com

Professional personal site for **Charles Blake Harrison** — Oklahoma State University, MIS · Quantitative trading & algorithmic research.

---

## Folder layout

```
theblakeharrison/
├── source/     # Edit here (dev)
└── dist/       # Deploy this folder (production)
```

### source/ (dev)

Edit content, styles, and scripts here.

```
source/
├── index.html
├── favicon.svg
├── unnamed.jpg
├── ovr-logo.jpg
├── ovr-logo.png
├── C.BlakeHarrison_resume.pdf
├── C.BlakeHarrison_resume.md   # Editable resume source
├── css/styles.css
├── js/main.js
├── vercel.json
└── _headers
```

### dist/ (deploy)

Self-contained production build. Copy from `source/` when ready to deploy (exclude `.md` files).

---

## Run locally

```powershell
cd source
python -m http.server 8000
```

Visit `http://localhost:8000`

---

## Update & deploy

1. Edit files in **`source/`**
2. Copy changed files into **`dist/`** (or copy the whole folder minus `.md`)
3. Push to GitHub — Vercel/Netlify/Cloudflare can deploy from **`dist/`**

---

## GitHub

Repo: https://github.com/harriibb/theblakeharrison

**On another computer:**

```powershell
git clone https://github.com/harriibb/theblakeharrison.git
cd theblakeharrison
# edit source/, sync to dist/, then:
git add .
git commit -m "Update site"
git push
```

---

## Brinkley site

Brinkley Harrison's site lives separately at `Desktop\brinkley\` (not in this repo).
