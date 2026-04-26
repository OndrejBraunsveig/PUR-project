import { createReadStream, promises as fs } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = process.env.PORT || 8080;
const root = path.dirname(fileURLToPath(import.meta.url));

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
};

function safePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0]);
  const requestedPath = path.normalize(path.join(root, decodedPath));

  if (!requestedPath.startsWith(root)) {
    return null;
  }

  return requestedPath;
}

async function resolveFile(urlPath) {
  const requestedPath = safePath(urlPath);

  if (!requestedPath) {
    return null;
  }

  try {
    const stats = await fs.stat(requestedPath);

    if (stats.isFile()) {
      return requestedPath;
    }
  } catch {
    // Fall back to index.html for client-side routes.
  }

  return path.join(root, 'index.html');
}

createServer(async (request, response) => {
  const filePath = await resolveFile(request.url || '/');

  if (!filePath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    await fs.access(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
}).listen(port, () => {
  console.log(`Static site listening on port ${port}`);
});
