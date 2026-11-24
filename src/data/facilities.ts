/**
 * Testing facilities, standards, materials, hardening process and infrastructure.
 * Brochure-sourced. Do not alter grades, standards or measurements without client confirmation.
 */

export const testingFacilities = [
  {
    id: 'spectrometer',
    number: '01',
    name: 'Spectrometer',
    purpose: 'Chemical Testing',
    description: 'Chemical composition of incoming and finished material is checked to confirm the specified grade.',
    image: { src: '/assets/site/spectrometer.jpg', alt: 'Optical emission spectrometer in a laboratory' },
  },
  {
    id: 'uts',
    number: '02',
    name: 'Universal Testing Machine',
    purpose: 'Mechanical Testing',
    description: 'Mechanical properties of material are tested on a universal testing machine.',
    image: { src: '/assets/site/universal-testing-machine.jpg', alt: 'Universal testing machine with load dial' },
  },
  {
    id: 'ultrasonic',
    number: '03',
    name: 'Ultrasonic Testing',
    purpose: 'Internal Soundness',
    description: 'Ultrasonic inspection checks components for internal discontinuities without damaging them.',
    image: { src: '/assets/site/ultrasonic-testing.jpg', alt: 'Ultrasonic flaw detector showing echo readings' },
  },
  {
    id: 'mpi',
    number: '04',
    name: 'MPI Testing',
    purpose: 'Surface Crack Detection',
    description: 'Magnetic particle inspection reveals surface and near-surface cracks in ferrous components.',
    image: { src: '/assets/site/magnetic-particle-inspection.jpg', alt: 'Fluorescent magnetic particle inspection of a ring-shaped component' },
  },
  {
    id: 'dimensional',
    number: '05',
    name: 'Dimensional Checking',
    purpose: 'Geometry & Tolerance',
    description: 'Dimensions are checked against drawing requirements before dispatch.',
    image: { src: '/assets/site/micrometer.jpg', alt: 'Micrometer used for dimensional checking' },
  },
]

export const standards = ['IS', 'BS', 'DIN', 'GOST', 'ASTM', 'IRS', 'IBR']

export const materials = [
  {
    group: 'Carbon Steel',
    grades: ['C20 – C65', 'EN 8 & EN 9', 'Class I to IV'],
  },
  {
    group: 'High Tensile Steel',
    grades: ['20Mn2', 'ST52.3', 'IS 2062 Grade 350 – 550'],
  },
  {
    group: 'Low Alloy Steels',
    // Brochure reads "En18, 19, 24, 25 & 111" – confirm EN111 with client.
    grades: ['EN18', 'EN19', 'EN24', 'EN25', 'EN111'],
    note: 'and their equivalents in IS, DIN, AISI, GOST',
  },
]

/** Spelling "Sobritising" as printed in the brochure – confirm with client before final publication. */
export const hardeningProcess = {
  name: 'Sobritising Process',
  title: 'Hardening by Sobritising',
  summary:
    'Hardening by the Sobritising process gives a hard, wear-resistant surface for longer life with a ductile core for greater shock absorption.',
  specs: [
    { label: 'Surface hardness', value: '300 – 350', unit: 'BHN', note: 'and more' },
    { label: 'Hardened depth', value: '12 – 15', unit: 'mm', note: 'up to' },
    { label: 'Core', value: 'Ductile', unit: '', note: 'for shock absorption' },
  ],
  benefits: [
    { title: 'Hard wearing surface', text: 'Surface hardness of 300–350 BHN and more resists wear in service.' },
    { title: 'Deep hardened case', text: 'Hardened depth of up to 12–15 mm for longer component life.' },
    { title: 'Ductile core', text: 'A tougher core absorbs shock loads, helping reduce the risk of brittle failure.' },
  ],
  images: [
    { src: '/assets/site/heat-treatment-furnace.jpg', alt: 'Industrial heat treatment furnace' },
    { src: '/assets/site/heat-treated-castings.jpg', alt: 'Steel components glowing after heat treatment' },
  ],
}

/**
 * Manufacturing process story. Photographs are representative (Wikimedia Commons, see credits)
 * and illustrate each process – replace with photographs of the Simplex works when available.
 */
type Img = { src: string; alt: string; position?: string }

export const infrastructure: { id: string; title: string; caption: string; image: Img; detail: Img }[] = [
  {
    id: 'heavy-turning',
    title: 'Heavy-Duty Turning',
    caption: 'Large-diameter wheels are turned on heavy-duty lathes.',
    image: { src: '/assets/site/heavy-lathe.jpg', alt: 'Large wheel mounted on a heavy-duty lathe' },
    detail: { src: '/assets/site/lathe-chuck.jpg', alt: 'Lathe chuck' },
  },
  {
    id: 'shaft-machining',
    title: 'Shaft Machining',
    caption: 'Long stepped shafts and axles are machined between centres and finished to tight tolerances.',
    image: { src: '/assets/site/lathe-turning.jpg', alt: 'Shaft being turned and centre drilled on a lathe' },
    detail: { src: '/assets/site/forged-shaft.jpg', alt: 'Machined shaft' },
  },
  {
    id: 'hardening',
    title: 'Heat Treatment',
    caption: 'Components are hardened by the Sobritising process for a hard surface and ductile core.',
    image: { src: '/assets/site/heat-treated-castings.jpg', alt: 'Steel components glowing after heat treatment' },
    detail: { src: '/assets/site/heat-treatment-furnace.jpg', alt: 'Heat treatment furnace' },
  },
  {
    id: 'finished',
    title: 'Finished Components',
    caption: 'Wheel sets, shafts, rings and gears are inspected and prepared for dispatch.',
    image: { src: '/assets/site/wheelsets-track.jpg', alt: 'Railway wheel sets on track' },
    detail: { src: '/assets/site/wheelset-geared.jpg', alt: 'Geared wheel set' },
  },
  {
    id: 'testing',
    title: 'In-House Testing',
    caption: 'Spectrometer, universal testing machine, ultrasonic and MPI testing support every order.',
    image: { src: '/assets/site/magnetic-particle-inspection.jpg', alt: 'Fluorescent magnetic particle inspection' },
    detail: { src: '/assets/site/ultrasonic-testing.jpg', alt: 'Ultrasonic flaw detector' },
  },
]

export const infrastructureGallery = [
  { src: '/assets/site/heavy-machine-shop.jpg', alt: 'Heavy machine shop with large lathes', caption: 'Heavy machining' },
  { src: '/assets/site/forging-hot.jpg', alt: 'Glowing steel bar in a forging die', caption: 'Hot forging' },
  { src: '/assets/site/gear-hobbing.jpg', alt: 'Gear being cut on a hobbing machine', caption: 'Gear cutting' },
  { src: '/assets/site/forging-press.jpg', alt: 'Heavy forging press', caption: 'Forging press' },
  { src: '/assets/site/grooved-drum.jpg', alt: 'Large grooved drum', caption: 'Grooved drums' },
  { src: '/assets/site/heat-treatment-furnace.jpg', alt: 'Heat treatment furnace', caption: 'Heat treatment' },
  { src: '/assets/site/wheelsets-journals.jpg', alt: 'Wheel sets with fitted journals', caption: 'Wheel sets' },
  { src: '/assets/site/universal-testing-machine.jpg', alt: 'Universal testing machine', caption: 'Mechanical testing' },
  { src: '/assets/site/machine-shop.jpg', alt: 'Machine shop with lathes', caption: 'Precision turning' },
]
