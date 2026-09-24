// Builds every web image from the client's source files in assets-src/.
// Run with: npm run images
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'assets-src';
const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// 1. Crest with a transparent background: flood-fill the white paper from the
//    corners. The navy outline of the shield stops the fill, so the white areas
//    inside the crest are kept.
async function crest() {
  const { data, info } = await sharp(`${SRC}/logo.jpeg`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const isPaper = (i) => data[i] > 225 && data[i + 1] > 225 && data[i + 2] > 225;
  const seen = new Uint8Array(w * h);
  const stack = [0, w - 1, (h - 1) * w, h * w - 1];
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    if (!isPaper(p * 4)) continue;
    data[p * 4 + 3] = 0;
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }
  const png = sharp(data, { raw: info }).trim();
  const buf = await png.png().toBuffer();
  await sharp(buf).resize(480).webp({ quality: 88 }).toFile(`${OUT}/crest.webp`);
  await sharp(buf).resize(640).png().toFile(`${OUT}/crest.png`);
  await sharp(buf).resize(120).webp({ quality: 90 }).toFile(`${OUT}/crest-sm.webp`);
  await sharp(buf).resize(320).webp({ quality: 88 }).toFile(`${OUT}/crest-md.webp`);
  await sharp(buf).resize(180, 180, { fit: 'contain', background: '#ffffff' }).png().toFile('app/apple-icon.png');
  await sharp(buf).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('app/icon.png');
  return buf;
}

// 2. Scenes cropped from the recruitment poster (placeholders until the
//    client sends real photos).
const crops = {
  'players': { left: 0, top: 300, width: 480, height: 430 },
  'skyline': { left: 0, top: 60, width: 370, height: 380 },
  'huddle': { left: 712, top: 752, width: 318, height: 140 },
  'campus': { left: 712, top: 906, width: 318, height: 146 },
  'ball': { left: 722, top: 1068, width: 308, height: 168 },
};

async function scenes() {
  for (const [name, box] of Object.entries(crops)) {
    await sharp(`${SRC}/poster.png`).extract(box).webp({ quality: 82 }).toFile(`${OUT}/${name}.webp`);
  }
  await sharp(`${SRC}/poster.png`).resize(800).webp({ quality: 80 }).toFile(`${OUT}/poster.webp`);
  // Blank paper form, offered as a download for families who prefer paper.
  await sharp(`${SRC}/registration-form.png`).png({ compressionLevel: 9 }).toFile('public/gepu-registration-form.png');
  await sharp(`${SRC}/registration-form.png`).resize(600).webp({ quality: 80 }).toFile(`${OUT}/registration-form.webp`);
}

// 3. Open Graph image 1200x630: navy background, sky stripes, crest.
async function ogImage(crestBuf) {
  const stripes = Array.from({ length: 6 }, (_, i) =>
    `<rect x="${i * 200 + 60}" y="0" width="80" height="630" fill="#6CACE4" opacity="0.10"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#0B2A5B"/>${stripes}
    <rect x="0" y="600" width="1200" height="30" fill="#E9A21B"/>
    <text x="560" y="270" font-family="Arial Black, Arial" font-weight="900" font-size="120" fill="#ffffff">GEPU</text>
    <text x="564" y="335" font-family="Arial" font-weight="700" font-size="36" fill="#6CACE4" letter-spacing="3">INTERNATIONAL</text>
    <text x="564" y="380" font-family="Arial" font-weight="700" font-size="36" fill="#6CACE4" letter-spacing="3">FOOTBALL ACADEMY</text>
    <text x="564" y="450" font-family="Arial" font-weight="700" font-size="30" fill="#E9A21B" letter-spacing="6">ARGENTINA · SAN LUIS</text>
  </svg>`;
  const crestSmall = await sharp(crestBuf).resize(420, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: crestSmall, left: 90, top: 70 }])
    .jpeg({ quality: 86 })
    .toFile('public/og.jpg');
}

const buf = await crest();
await scenes();
await ogImage(buf);
console.log('images done');
