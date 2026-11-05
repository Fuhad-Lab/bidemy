#!/usr/bin/env node
/**
 * Bidemy static site server — zero-dependency Node HTTP server that serves
 * the Next.js `out/` static export (trailingSlash routing).
 *
 * Used on Render: startCommand = `node scripts/static-server.js`
 * Binds 0.0.0.0:$PORT (Render) or PORT (default 3000).
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(process.cwd(), 'out');
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.pdf': 'application/pdf',
  '.csv': 'text/csv',
  '.xml': 'application/xml',
  '.zip': 'application/zip',
  '.glb': 'model/gltf-binary',
  '.visuals': 'application/octet-stream',
  '.webmanifest': 'application/manifest+json',
};

function resolveFile(urlPath) {
  // decode + normalise, prevent traversal
  let p;
  try {
    p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  } catch {
    return null;
  }
  const safe = path.normalize(p).replace(/^(\.\.[/\\])+/, '');
  const abs = path.join(ROOT, safe);
  if (!abs.startsWith(ROOT)) return null;
  return abs;
}

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/html; charset=utf-8',
    'Cache-Control': status === 200 ? 'public, max-age=0, must-revalidate' : 'no-store',
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url || '/');
  if (!file) return send(res, 403, 'Forbidden', 'text/plain');

  fs.stat(file, (err, stat) => {
    if (!err && stat.isDirectory()) {
      // trailing-slash directory routing → index.html
      const idx = path.join(file, 'index.html');
      return fs.readFile(idx, (e2, buf) => {
        if (e2) return send(res, 404, fs.readFileSync(path.join(ROOT, '404.html')));
        send(res, 200, buf);
      });
    }
    if (err) {
      // try .html variant (clean URLs without trailing slash)
      const htmlVariant = file + '.html';
      return fs.readFile(htmlVariant, (e3, buf3) => {
        if (!e3) return send(res, 200, buf3);
        // fall back to 404.html
        fs.readFile(path.join(ROOT, '404.html'), (e4, buf404) => {
          send(res, 404, e4 ? 'Not Found' : buf404);
        });
      });
    }
    if (stat.isDirectory()) {
      const idx = path.join(file, 'index.html');
      return fs.readFile(idx, (e2, buf) => {
        if (e2) return send(res, 404, 'Not Found', 'text/plain');
        send(res, 200, buf);
      });
    }
    fs.readFile(file, (e2, buf) => {
      if (e2) return send(res, 500, 'Server error', 'text/plain');
      const ext = path.extname(file).toLowerCase();
      // immutable cache for build assets
      const immutable = file.includes(path.join('_next', 'static'));
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': immutable
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=0, must-revalidate',
      });
      res.end(buf);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Bidemy static server listening on http://${HOST}:${PORT}`);
});
