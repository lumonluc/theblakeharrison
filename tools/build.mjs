/**
 * Build: source/ -> dist/
 *
 * Replaces the manual copy step the README used to document. That step was
 * silently skippable, which meant dist/ could ship stale markup with no
 * warning. This is the only supported way to produce dist/.
 *
 * Also stamps a content hash onto the resume link so a new PDF busts cache
 * without anyone hand-editing a ?v= string in several places.
 */
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'source');
const OUT = join(root, 'dist');

const RESUME = 'Charles_Blake_Harrison_Resume.pdf';
/** Files that live in source/ but must never be published. */
const EXCLUDE = new Set(['Charles_Blake_Harrison_Resume.md']);

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const files = (await walk(SRC)).filter((f) => !EXCLUDE.has(relative(SRC, f)));

  /** @param {string} rel @returns {Promise<string>} */
  const hashOf = async (rel) =>
    createHash('sha256')
      .update(await readFile(join(SRC, rel)))
      .digest('hex')
      .slice(0, 8);

  const resumeHash = await hashOf(RESUME);

  /**
   * Content-hash every asset the HTML references. Without this, Netlify's edge
   * can serve a stale stylesheet against fresh HTML after a deploy — observed
   * in production, where the CSS was 1.5KB behind the markup for minutes.
   */
  const assetHashes = [
    ['css/styles.css', await hashOf('css/styles.css')],
    ['js/main.js', await hashOf('js/main.js')],
    ['portrait.jpg', await hashOf('portrait.jpg')],
    [RESUME, resumeHash],
  ];

  let copied = 0;
  for (const file of files) {
    const rel = relative(SRC, file);
    const dest = join(OUT, rel);
    await mkdir(dirname(dest), { recursive: true });

    if (rel.endsWith('.html')) {
      let html = await readFile(file, 'utf8');
      for (const [asset, hash] of assetHashes) {
        html = html.replaceAll(`"${asset}"`, `"${asset}?v=${hash}"`);
      }
      await writeFile(dest, html);
    } else {
      await cp(file, dest);
    }
    copied += 1;
  }

  const bytes = (
    await Promise.all(files.map(async (/** @type {string} */ f) => (await stat(f)).size))
  ).reduce((a, b) => a + b, 0);

  process.stdout.write(
    `build ok — ${copied} files, ${(bytes / 1024).toFixed(1)} KB, resume v=${resumeHash}\n`,
  );
}

await main();
