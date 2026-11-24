// Generates brushed-steel background textures in public/assets/textures.
// Brushed metal is long, fine directional streaks – made here by stretching random noise
// horizontally and layering a finer grain on top. Re-run with: node scripts/make-textures.cjs
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, '..', 'public', 'assets', 'textures')
const W = 1800
const H = 1100

// deterministic PRNG so the texture is stable between runs
let seed = 7
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

function noise(w, h) {
  const buf = Buffer.alloc(w * h)
  for (let i = 0; i < buf.length; i++) buf[i] = Math.floor(rand() * 255)
  return sharp(buf, { raw: { width: w, height: h, channels: 1 } })
}

async function brushed() {
  // long streaks: very few columns stretched across the full width
  const streaks = await noise(48, H).resize(W, H, { kernel: 'cubic', fit: 'fill' }).png().toBuffer()
  // finer streaks for detail
  const fine = await noise(220, H).resize(W, H, { kernel: 'cubic', fit: 'fill' }).png().toBuffer()
  return sharp(streaks)
    .composite([{ input: fine, blend: 'soft-light' }])
    .blur(0.6)
    .png()
    .toBuffer()
}

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const base = await brushed()

  // Dark: navy steel with a soft sheen band across the upper third
  const sheen = Buffer.from(
    `<svg width="${W}" height="${H}"><defs>
      <radialGradient id="g" cx="0.7" cy="0.25" r="0.75"><stop offset="0" stop-color="#fff" stop-opacity="0.16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.45"/></linearGradient>
    </defs><rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#v)"/></svg>`,
  )
  await sharp(base)
    .linear(0.16, 8) // compress to a narrow dark range
    .toColourspace('srgb')
    .tint({ r: 18, g: 30, b: 58 })
    .composite([{ input: sheen }])
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, 'brushed-steel-dark.jpg'))

  // Light: pale machined steel for light sections
  await sharp(base)
    .linear(0.07, 228)
    .toColourspace('srgb')
    .tint({ r: 236, g: 239, b: 244 })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, 'brushed-steel-light.jpg'))

  console.log('✓ textures')
})()
