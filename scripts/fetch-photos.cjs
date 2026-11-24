// Downloads freely licensed photographs from Wikimedia Commons into public/assets and writes
// their attribution to src/data/credits.json (shown on the /credits page).
// These are REPRESENTATIVE photographs of the industries, products and processes – they are
// not photographs of Simplex Metals' own works, products or customers.
// Re-run with: node scripts/fetch-photos.cjs
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ASSETS = path.join(__dirname, '..', 'public', 'assets')
const CREDITS = path.join(__dirname, '..', 'src', 'data', 'credits.json')
const UA = { 'User-Agent': 'SimplexMetalsSiteBuild/1.0 (website build script)' }

const photos = [
  // industries served
  ['industries/steel-plant.jpg', 'File:Filling the ladle.jpg'],
  ['industries/steel-rolling-mill.jpg', 'File:Proizvodnja valjane pločevine v Acroni Jesenice 2.jpg'],
  ['industries/aluminium-plant.jpg', 'File:Bratsk Aluminium Smelter (34988122195).jpg'],
  ['industries/cement-plant.jpg', 'File:Hoping Taiwan-Cement-Corporation-Hoping-Plant-02.jpg'],
  ['industries/railways.jpg', 'File:Indian Railways WAP-4 class electric locomotive..JPG'],
  ['industries/railways-locomotives.jpg', 'File:Three different generations of Indian railway locomotives.jpg'],
  ['industries/power-plant.jpg', 'File:Tuticorin Thermal Power Station at Night.jpg'],
  // product types
  ['site/wheelsets-track.jpg', 'File:Колёсные пары f001.jpg'],
  ['site/wheelsets-journals.jpg', 'File:Wheelsets of rail vehicles with fitted journals.jpg'],
  ['site/wheelset-geared.jpg', 'File:SNCB 1203 wheelset 01.jpg'],
  ['site/forged-shaft.jpg', 'File:Crankshaft jap grayscale.jpg'],
  ['site/heat-treated-castings.jpg', 'File:Castings fresh from the heat treatment furnace.jpg'],
  ['site/gear-pinion-mesh.jpg', 'File:Cog wheel on a huge crane claw - 1.jpg'],
  ['site/gear-hobbing.jpg', 'File:Gear-hobbing-spur-gear-on-cnc-cutting-machine.jpg'],
  ['site/large-gear.jpg', 'File:Abandoned concrete factory mechanism.jpg'],
  ['site/rope-drum.jpg', 'File:Tuna-Hästbergs gruva 2014-07-20 lintrumma 02.jpg'],
  ['site/grooved-drum.jpg', 'File:The steam engine at Ellenroad Mill in 2015.jpg'],
  // processes
  ['site/heavy-lathe.jpg', 'File:Metal lathe used to produce flywheels.JPG'],
  ['site/lathe-chuck.jpg', 'File:Univerzální hrotový soustruh Masturn 50 CNC 4.jpg'],
  ['site/lathe-turning.jpg', 'File:Lathe Center Drilling.jpg'],
  ['site/heavy-machine-shop.jpg', 'File:Heavy Machine Shop.jpg'],
  ['site/machine-shop.jpg', 'File:NOIRLab HQ Machine Shop (6V6A0724-CC).jpg'],
  ['site/forging-hot.jpg', 'File:4-die forging device1.jpg'],
  ['site/forging-manipulator.jpg', 'File:Schienengebundener Schmiedemanipulator.jpg'],
  ['site/forging-press.jpg', 'File:Forging hammers.jpg'],
  ['site/heat-treatment-furnace.jpg', 'File:Computerised Heat Treatment Furnance.jpg'],
  // testing
  ['site/spectrometer.jpg', 'File:ICP-OES von Shimadzu.jpg'],
  ['site/universal-testing-machine.jpg', 'File:阿姆斯勒式拉力試驗機.jpg'],
  ['site/ultrasonic-testing.jpg', 'File:Ultrasonic Testing Machine showing readings.jpg'],
  ['site/magnetic-particle-inspection.jpg', 'File:Inspection lab keeps aircraft healthy 130731-F-LR266-974.jpg'],
  ['site/micrometer.jpg', 'File:Micrometer screw gauge.jpg'],
]

/** Fetch with retries – Commons rate-limits bursts (429) and occasionally returns HTML. */
async function fetchOk(url, wantImage) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, { headers: UA })
    const type = res.headers.get('content-type') ?? ''
    if (res.ok && (!wantImage || type.startsWith('image/'))) return res
    await new Promise((r) => setTimeout(r, attempt * 4000))
  }
  throw new Error(`Could not download ${url}`)
}

const strip = (html = '') => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

;(async () => {
  const credits = []
  for (const [file, title] of photos) {
    const api =
      'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1280&titles=' +
      encodeURIComponent(title)
    const page = Object.values((await (await fetchOk(api)).json()).query.pages)[0]
    const ii = page.imageinfo[0]
    const dest = path.join(ASSETS, file)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    if (!fs.existsSync(dest) || process.argv.includes('--force')) {
      const buf = Buffer.from(await (await fetchOk(ii.thumburl, true)).arrayBuffer())
      await sharp(buf)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .sharpen({ sigma: 0.5 })
        .jpeg({ quality: 74, mozjpeg: true, progressive: true })
        .toFile(dest)
      await new Promise((r) => setTimeout(r, 1500))
    }
    const m = ii.extmetadata
    credits.push({
      image: `/assets/${file}`,
      title: title.replace(/^File:/, '').replace(/\.(jpe?g)$/i, ''),
      author: strip(m.Artist?.value) || 'Unknown',
      license: m.LicenseShortName?.value,
      licenseUrl: m.LicenseUrl?.value ?? null,
      source: ii.descriptionurl,
    })
    console.log('✓', file, '|', m.LicenseShortName?.value)
  }
  fs.writeFileSync(CREDITS, JSON.stringify(credits, null, 2) + '\n')
})()
