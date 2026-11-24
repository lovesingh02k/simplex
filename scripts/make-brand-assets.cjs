// Builds brand assets from the ORIGINAL Simplex logo (public/assets/brand/simplex-logo-white.png).
// The mark itself is never redrawn – it is only placed on a background at different sizes.
//   public/og-image.jpg          1200×630 link-preview image (WhatsApp, LinkedIn, Facebook, X)
//   public/favicon-16.png … 512  browser / home-screen icons
//   public/apple-touch-icon.png  iOS home screen
//   public/site.webmanifest      Android home screen
// Re-run with: node scripts/make-brand-assets.cjs
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const PUB = path.join(__dirname, '..', 'public')
const LOGO = path.join(PUB, 'assets', 'brand', 'simplex-logo-white.png')
const TEXTURE = path.join(PUB, 'assets', 'textures', 'brushed-steel-dark.jpg')
const NAVY = '#0b1430'
const ORANGE = '#f26a1b'

const logoAt = (h) => sharp(LOGO).resize({ height: h, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()

async function icon(size, file, { radius = 0.18, pad = 0.12 } = {}) {
  const inner = Math.round(size * (1 - pad * 2))
  const mark = await sharp(LOGO)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * radius)}" fill="${NAVY}"/></svg>`,
  )
  const off = Math.round((size - inner) / 2)
  await sharp(bg).composite([{ input: mark, left: off, top: off }]).png({ compressionLevel: 9 }).toFile(path.join(PUB, file))
}

async function ogImage() {
  const W = 1200
  const H = 630
  const base = await sharp(TEXTURE).resize(W, H, { fit: 'cover' }).toBuffer()
  const logo = await logoAt(250)
  const { width: lw } = await sharp(logo).metadata()
  const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="0.92" cy="0.05" r="0.7">
        <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.35"/><stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#glow)"/>
    <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${ORANGE}"/>
    <rect x="${80 + lw + 50}" y="190" width="4" height="250" fill="${ORANGE}"/>
    <g font-family="Arial Black, Arial, Helvetica, sans-serif" fill="#ffffff">
      <text x="${80 + lw + 90}" y="270" font-size="74" font-weight="900" letter-spacing="3">SIMPLEX</text>
      <text x="${80 + lw + 90}" y="350" font-size="74" font-weight="900" letter-spacing="3">METALS</text>
    </g>
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="${80 + lw + 92}" y="400" font-size="26" fill="#c3c9d4">Mechanical Spares &amp; Equipment Manufacturers</text>
      <text x="${80 + lw + 92}" y="440" font-size="22" font-weight="700" letter-spacing="5" fill="${ORANGE}">PARTS YOU CAN TRUST</text>
      <text x="80" y="${H - 44}" font-size="22" fill="#9aa3b3">Bhilai, Chhattisgarh, India  ·  0788-4040320</text>
    </g>
  </svg>`)
  await sharp(base)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: logo, left: 80, top: Math.round((H - 250) / 2) - 20 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(PUB, 'og-image.jpg'))
}

;(async () => {
  for (const s of [16, 32, 48, 192, 512]) await icon(s, `favicon-${s}.png`, s <= 32 ? { pad: 0.04, radius: 0.2 } : {})
  await icon(180, 'apple-touch-icon.png', { radius: 0, pad: 0.12 })
  await icon(64, 'favicon.png', { pad: 0.06 })
  fs.writeFileSync(
    path.join(PUB, 'site.webmanifest'),
    JSON.stringify(
      {
        name: 'Simplex Metals',
        short_name: 'Simplex',
        description: 'Mechanical Spares & Equipment Manufacturers – Parts You Can Trust',
        icons: [
          { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: '#070c18',
        background_color: '#070c18',
        display: 'standalone',
        start_url: '/',
      },
      null,
      2,
    ) + '\n',
  )
  await ogImage()
  console.log('✓ brand assets: favicons, apple-touch-icon, site.webmanifest, og-image.jpg')
})()
