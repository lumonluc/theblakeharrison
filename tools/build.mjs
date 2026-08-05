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

  const resumeHash = createHash('sha256')
    .update(await readFile(join(SRC, RESUME)))
    .digest('hex')
    .slice(0, 8);

  let copied = 0;
  for (const file of files) {
    const rel = relative(SRC, file);
    const dest = join(OUT, rel);
    await mkdir(dirname(dest), { recursive: true });

    if (rel.endsWith('.html')) {
      const html = await readFile(file, 'utf8');
      await writeFile(dest, html.replaceAll(`${RESUME}"`, `${RESUME}?v=${resumeHash}"`));
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
