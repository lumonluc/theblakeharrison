/** Minimal static server for local checks. Serves dist/ by default. */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const dir = resolve(process.argv[2] ?? 'dist');
const port = Number(process.env.PORT ?? 8000);

/** @type {Record<string, string>} */
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

createServer(
  async (
    /** @type {import('node:http').IncomingMessage} */ req,
    /** @type {import('node:http').ServerResponse} */ res,
  ) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
    // normalize before joining so ../ cannot escape the served directory
    const rel = normalize(url).replace(/^(\.\.[/\\])+/, '');
    let file = join(dir, rel);

    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      return res.end('404');
    }

    if (!file.startsWith(dir)) {
      res.writeHead(403, { 'content-type': 'text/plain' });
      return res.end('403');
    }

    try {
      await stat(file);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      return res.end('404');
    }

    res.writeHead(200, {
      'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
      // never cache locally — a stale stylesheet silently invalidates every visual check
      'cache-control': 'no-store, must-revalidate',
    });
    createReadStream(file).pipe(res);
  },
).listen(port, () => process.stdout.write(`serving ${dir} on http://localhost:${port}\n`));
