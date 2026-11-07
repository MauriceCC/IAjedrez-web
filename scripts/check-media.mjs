import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const manifest = JSON.parse(await readFile(resolve(publicDir, 'media.json'), 'utf8'));
for (const [session, path] of Object.entries(manifest)) {
  if (path === null) continue;
  if (typeof path !== 'string' || !path.startsWith('videos/') || !path.endsWith('.mp4')) {
    throw new Error(`Ruta de video inválida para ${session}.`);
  }
  const target = resolve(publicDir, path);
  const local = relative(publicDir, target);
  if (local.startsWith('..') || isAbsolute(local)) throw new Error('Video fuera de public/.');
  const file = await stat(target).catch(() => {
    throw new Error(`Falta ${path}. Incluye el MP4 en Git antes de publicar.`);
  });
  if (!file.isFile() || file.size === 0) throw new Error(`Video vacío o inválido: ${path}`);
}
// Check all publishable videos, including one not yet added to the manifest.
for (const file of await readdir(resolve(publicDir, 'videos'))) {
  if (!file.endsWith('.mp4')) continue;
  if ((await stat(resolve(publicDir, 'videos', file))).size >= 100 * 1024 * 1024) {
    throw new Error(`${file} alcanza 100 MiB. Comprímelo antes de subirlo a GitHub.`);
  }
}
console.log('Videos del manifiesto presentes; MP4 dentro del límite de GitHub.');
