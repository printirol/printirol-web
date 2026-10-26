// Genera copias livianas en media/ a partir de las fotos originales, que no se tocan.
// Uso: npm run images
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCES = ['fotos', 'pod', 'catalogo', 'img/productos'];
const OUT = 'media';
const MAX_SIDE = 1000;
const QUALITY = 72;

let before = 0;
let after = 0;

for (const dir of SOURCES) {
  const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  const outDir = path.join(OUT, dir.replace('img/', ''));
  await mkdir(outDir, { recursive: true });

  for (const file of files) {
    const src = path.join(dir, file);
    const dest = path.join(outDir, file.replace(/\.(jpe?g|png|webp)$/i, '.webp'));
    await sharp(src)
      .rotate()
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(dest);
    const [a, b] = await Promise.all([stat(src), stat(dest)]);
    before += a.size;
    after += b.size;
    console.log(`${dest}  ${Math.round(a.size / 1024)} KB -> ${Math.round(b.size / 1024)} KB`);
  }
}

console.log(`\nTotal: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
