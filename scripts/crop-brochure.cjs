// Crops individual photographs from the photographed brochure pages in /brochure-source
// into /public/assets. Re-run with: node scripts/crop-brochure.cjs
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '..', 'brochure-source');
const OUT = path.join(__dirname, '..', 'public', 'assets');

// [sourcePage, outPath, left, top, width, height]
// Crops are inset a few pixels from each printed photo so no paper edge or border shows.
const crops = [
  ['1', 'brand/simplex-logo-source.png', 418, 200, 148, 150],
  ['1', 'hero/cover-banner.jpg', 100, 488, 785, 140],
  ['2', 'manufacturing/lathe-shaft-turning.jpg', 456, 909, 480, 207],
  ['3', 'products/wheels/forged-wheels.jpg', 449, 199, 192, 122],
  ['3', 'products/wheels/wheel-sets-track.jpg', 661, 194, 167, 132],
  ['3', 'manufacturing/sobritising-wheel.jpg', 154, 436, 197, 117],
  ['3', 'manufacturing/sobritising-furnace.jpg', 378, 406, 194, 135],
  ['3', 'products/shafts/shafts-stack.jpg', 470, 616, 202, 150],
  ['3', 'products/shafts/hardened-surface.jpg', 704, 608, 208, 148],
  ['3', 'products/gears/gear-pinion.jpg', 154, 894, 218, 152],
  ['3', 'products/rings/rings-stack.jpg', 394, 876, 204, 174],
  ['4', 'products/rope-drums/rope-drum.jpg', 616, 190, 228, 96],
  ['4', 'testing/spectrometer.jpg', 647, 322, 197, 142],
  ['4', 'testing/mpi.jpg', 154, 522, 212, 148],
  ['4', 'testing/uts-machine.jpg', 650, 492, 198, 148],
  ['4', 'testing/ultrasonic.jpg', 652, 666, 208, 152],
  ['4', 'manufacturing/shaft-lathe-operator.jpg', 82, 949, 424, 247],
  ['4', 'manufacturing/wheel-lathe-operator.jpg', 516, 932, 417, 264],
  ['4', 'manufacturing/shop-floor-wide.jpg', 82, 932, 852, 264],
  // Detail crops – give each section its own view instead of repeating the same frame.
  ['4', 'manufacturing/shaft-turning-detail.jpg', 84, 952, 250, 170],
  ['4', 'manufacturing/wheel-face-detail.jpg', 640, 934, 292, 222],
  ['4', 'manufacturing/lathe-operator-portrait.jpg', 516, 990, 190, 205],
  ['3', 'products/gears/gear-teeth-detail.jpg', 190, 900, 150, 140],
  ['3', 'products/wheels/forged-wheel-single.jpg', 452, 205, 110, 112],
  ['3', 'products/rings/rings-detail.jpg', 470, 920, 126, 126],
  ['4', 'testing/spectrometer-detail.jpg', 690, 360, 150, 100],
  ['1', 'hero/cover-wheelset.jpg', 110, 522, 214, 86],
  ['1', 'hero/cover-wheelsets-row.jpg', 610, 512, 268, 86],
];

/**
 * Restoration for photographed print. Sharpening tiny prints only amplifies halftone dots and
 * JPEG blocks, so the approach is the opposite: clean first, enlarge smoothly, then add back
 * only broad (large-radius) contrast.
 *  1. median denoise at source size (phone noise, halftone dots)
 *  2. grey-world white balance (removes most of the yellow/green paper cast) + auto-levels
 *  3. 4× upscale with the smooth Mitchell kernel, then a soft blur to melt block edges
 *  4. large-radius unsharp mask = gentle "clarity" without re-introducing noise
 */
async function refine(input, dest, width) {
  const base = input.median(3)
  const { channels } = await base.clone().stats()
  const [r, g, b] = channels.map((c) => c.mean)
  const grey = (r + g + b) / 3
  // Only correct part of the cast so warm steel and orange paint keep some character.
  const k = (m) => 1 + 0.7 * (grey / m - 1)
  const balanced = await base
    .recomb([
      [k(r), 0, 0],
      [0, k(g), 0],
      [0, 0, k(b)],
    ])
    .normalise({ lower: 0.5, upper: 99.5 })
    .png()
    .toBuffer()
  await sharp(balanced)
    .resize({ width: width * 4, kernel: 'mitchell' })
    .blur(1.6)
    .sharpen({ sigma: 3, m1: 0.5, m2: 0.6 })
    .linear(1.06, -6)
    .modulate({ saturation: 1.02 })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true, chromaSubsampling: '4:4:4' })
    .toFile(dest)
}

(async () => {
  for (const [page, out, left, top, width, height] of crops) {
    const dest = path.join(OUT, out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const img = sharp(path.join(SRC, `${page}.jpg`)).extract({ left, top, width, height });
    if (out.endsWith('.png')) await img.png().toFile(dest);
    else await refine(img, dest, width);
    console.log('✓', out);
  }
})();

// Logo: lift the original white mark off the navy brochure background (luminance → alpha).
// The mark itself is not redrawn. Replace with a clean vector from the client when available.
(async () => {
  const { data, info } = await sharp(path.join(SRC, '1.jpg'))
    .extract({ left: 422, top: 205, width: 142, height: 140 })
    .resize({ width: 568, kernel: 'lanczos3' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const a = Math.max(0, Math.min(255, ((lum - 95) / (175 - 95)) * 255));
    out[j] = out[j + 1] = out[j + 2] = 255;
    out[j + 3] = a;
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png()
    .toFile(path.join(OUT, 'brand', 'simplex-logo-white.png'));
  console.log('✓ brand/simplex-logo-white.png');
})();
