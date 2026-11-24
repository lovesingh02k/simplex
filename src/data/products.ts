/**
 * Product portfolio – sourced from the Simplex Metals brochure.
 * Do not add products, grades or sizes here unless supplied by the client.
 */

export type ProductImage = {
  src: string
  alt: string
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string
}

export type Product = {
  slug: string
  number: string
  category: ProductCategory
  name: string
  shortName: string
  summary: string
  description: string
  image: ProductImage
  gallery: ProductImage[]
  applications: { title: string; items: string[] }
  specifications: { label: string; value: string }[]
  capabilities: string[]
}

export type ProductCategory = 'wheels' | 'shafts' | 'rings' | 'gears' | 'rope-drums' | 'special'

export const productCategories: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'wheels', label: 'Wheels' },
  { id: 'shafts', label: 'Shafts & Axles' },
  { id: 'rings', label: 'Rings' },
  { id: 'gears', label: 'Gears & Pinions' },
  { id: 'rope-drums', label: 'Rope Drums' },
  { id: 'special', label: 'Specialised' },
]

export const products: Product[] = [
  {
    slug: 'wheels-forged-cast',
    number: '01',
    category: 'wheels',
    name: 'Wheels – Forged / Cast',
    shortName: 'Forged & Cast Wheels',
    summary: 'Crane, bogie, loco and plant-equipment wheels from Ø160 to Ø1000 mm.',
    description:
      'Forged and cast wheels for cranes, bogies, locomotives and heavy plant equipment, manufactured in carbon steel and alloy steel, and to IRS specification where required.',
    image: {
      src: '/assets/site/wheelsets-track.jpg',
      alt: 'Railway wheel sets with axles on track',
    },
    gallery: [
      { src: '/assets/site/wheelsets-journals.jpg', alt: 'Wheel sets with fitted axle journals' },
      { src: '/assets/site/heavy-lathe.jpg', alt: 'Large wheel mounted on a heavy-duty lathe' },
    ],
    applications: {
      title: 'Wheel types',
      items: [
        'Crane Wheels',
        'Bogie Wheels',
        'Loco Wheel Sets',
        'Transfer Car Wheels',
        'Pellet Car Wheels',
        'Stacker & Reclaimer Wheels',
      ],
    },
    specifications: [
      { label: 'Size range', value: 'Ø160 – Ø1000 mm' },
      { label: 'Route', value: 'Forged / Cast' },
      { label: 'Materials', value: 'Carbon Steel, Alloy Steel' },
      { label: 'Specification', value: 'As per IRS where applicable' },
    ],
    capabilities: ['Forging / Casting', 'Sobritising hardening', 'Precision machining', 'Ultrasonic testing'],
  },
  {
    slug: 'shafts-axles',
    number: '02',
    category: 'shafts',
    name: 'Shafts & Axles',
    shortName: 'Shafts & Axles',
    summary: 'Straight, step and flange shafts and axles, finish machined to 0.02 mm.',
    description:
      'All types of shafts – straight shafts, step shafts, flange shafts and axles – in carbon steel and alloy steels, with normalizing, surface hardening and volume hardening, finish machined with an accuracy of 0.02 mm.',
    image: {
      src: '/assets/site/forged-shaft.jpg',
      alt: 'Forged and machined steel shaft',
    },
    gallery: [
      { src: '/assets/site/lathe-turning.jpg', alt: 'Shaft being turned in a lathe chuck' },
      { src: '/assets/site/lathe-chuck.jpg', alt: 'Lathe chuck used for precision turning' },
    ],
    applications: {
      title: 'Shaft types',
      items: ['Straight Shafts', 'Step Shafts', 'Flange Shafts', 'Axles'],
    },
    specifications: [
      { label: 'Machining accuracy', value: '0.02 mm' },
      { label: 'Materials', value: 'Carbon Steel, Alloy Steels' },
      { label: 'Heat treatment', value: 'Normalizing, Surface & Volume Hardening' },
    ],
    capabilities: ['Normalizing', 'Surface Hardening', 'Volume Hardening', 'Finish Machining'],
  },
  {
    slug: 'rings',
    number: '03',
    category: 'rings',
    name: 'Rings',
    shortName: 'Industrial Rings',
    summary: 'Rings from Ø100 to Ø1400 mm for tyres, sleeves, flanges and gears.',
    description:
      'Rings from Ø100 to Ø1400 mm, suitable for wheel tyres, sleeves, flanges, gears and similar components.',
    image: {
      src: '/assets/site/forging-manipulator.jpg',
      alt: 'Hot steel being forged on a forging manipulator',
    },
    gallery: [{ src: '/assets/site/heat-treated-castings.jpg', alt: 'Steel components glowing after heat treatment' }],
    applications: {
      title: 'Suitable for',
      items: ['Wheel Tyres', 'Sleeves', 'Flanges', 'Gears'],
    },
    specifications: [{ label: 'Size range', value: 'Ø100 – Ø1400 mm' }],
    capabilities: ['Ring manufacturing', 'Machining', 'Material testing'],
  },
  {
    slug: 'gear-pinion',
    number: '04',
    category: 'gears',
    name: 'Gear & Pinion',
    shortName: 'Gears & Pinions',
    summary: 'Forged gears and pinions with flame, induction, volume or case hardening.',
    description:
      'Forged gears and pinions with hardening by flame hardening, induction hardening and volume hardening in carbon steel and alloy steel, and case hardening steels.',
    image: {
      src: '/assets/site/gear-pinion-mesh.jpg',
      alt: 'Pinion meshing with a large gear wheel',
    },
    gallery: [{ src: '/assets/site/gear-hobbing.jpg', alt: 'Spur gear being cut on a gear hobbing machine' }],
    applications: {
      title: 'Hardening methods',
      items: ['Flame Hardening', 'Induction Hardening', 'Volume Hardening', 'Case Hardening'],
    },
    specifications: [
      { label: 'Route', value: 'Forged' },
      { label: 'Materials', value: 'Carbon Steel, Alloy Steel, Case Hardening Steels' },
    ],
    capabilities: ['Forging', 'Gear cutting & machining', 'Flame / Induction hardening', 'Volume & Case hardening'],
  },
  {
    slug: 'rope-drum-eot-crane',
    number: '05',
    category: 'rope-drums',
    name: 'Rope Drum for EOT Crane',
    shortName: 'Rope Drums for EOT Cranes',
    summary: 'Fabricated, stress relieved and machined rope drums, Ø180 to Ø1000 mm.',
    description:
      'Rope drums for EOT cranes – fabricated, stress relieved and machined, from Ø180 to Ø1000 mm.',
    image: {
      src: '/assets/site/rope-drum.jpg',
      alt: 'Large wire rope drum',
    },
    gallery: [{ src: '/assets/site/grooved-drum.jpg', alt: 'Large grooved drum on a shaft' }],
    applications: {
      title: 'Process',
      items: ['Fabricated', 'Stress Relieved', 'Machined'],
    },
    specifications: [
      { label: 'Size range', value: 'Ø180 – Ø1000 mm' },
      { label: 'Application', value: 'EOT Cranes' },
    ],
    capabilities: ['Fabrication', 'Stress relieving', 'Rope groove machining'],
  },
  {
    slug: 'specialised-components',
    number: '06',
    category: 'special',
    name: 'Specialised Components',
    shortName: 'Special Mechanical Components',
    summary: 'Customised mechanical spares and equipment built to your drawings.',
    description:
      'Customised mechanical spares and equipment manufactured to customer drawings and specifications, drawing on the same forging, machining, hardening and testing capabilities used across our product range.',
    image: {
      src: '/assets/site/large-gear.jpg',
      alt: 'Heavy gear and drive mechanism in an industrial plant',
    },
    gallery: [{ src: '/assets/site/forging-press.jpg', alt: 'Hot forging in a heavy forging press' }],
    applications: {
      title: 'How we work',
      items: ['To customer drawings', 'To customer specifications', 'To applicable standards'],
    },
    specifications: [{ label: 'Scope', value: 'Discuss your requirement with our team' }],
    capabilities: ['Machining', 'Heat treatment', 'Material & dimensional testing'],
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
