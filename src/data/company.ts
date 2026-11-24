/**
 * Central company information.
 * Everything here is taken from the Simplex Metals printed brochure unless marked otherwise.
 * Edit this file to update details across the whole website.
 */

export const company = {
  name: 'Simplex Metals',
  shortName: 'Simplex',
  tagline: 'Parts You Can Trust.',
  descriptor: 'Mechanical Spares & Equipment Manufacturers',
  summary:
    'Simplex Metals manufactures mechanical spares and equipment for core sector industries: forged and cast wheels, shafts and axles, rings, gears and pinions, and rope drums for EOT cranes, supported by in-house hardening and material testing.',

  logo: {
    /** White mark lifted from the brochure cover. Replace with the client's clean vector when supplied. */
    white: '/assets/brand/simplex-logo-white.png',
    source: '/assets/brand/simplex-logo-source.png',
  },

  vision: 'Recognition in Core Sector Industries for Quality.',
  mission: [
    'Provide quality spares on time.',
    'Maintain competitive pricing.',
    'Produce fail-safe parts for the safety of users.',
  ],
  coreValues: [
    { title: 'Transparency', text: 'Clear communication on specifications, timelines and pricing.' },
    { title: 'Strive for Excellence', text: 'Continuous attention to material, machining and finish.' },
    { title: 'Dynamism', text: 'Responsive to the changing needs of plant maintenance teams.' },
    { title: 'Passion for Learning', text: 'Building knowledge with every component we manufacture.' },
  ],

  contact: {
    phone: '0788-4040320',
    phoneHref: 'tel:+917884040320',
    email: 'hkssimplexmetals@gmail.com',
    addresses: [
      {
        label: 'City Office',
        lines: ['19/4, Nehru Nagar (West)', 'Bhilai – 490 020', 'Chhattisgarh, India'],
        // Search-based link. Verify the exact pin with the client and replace with a place URL.
        mapsUrl:
          'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent('19/4 Nehru Nagar West, Bhilai, Chhattisgarh 490020'),
      },
      {
        label: 'Works',
        lines: ['28, Industrial Estate', 'Tedesara, Rajnandgaon – 491 443', 'Chhattisgarh, India'],
        mapsUrl:
          'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent('28 Industrial Estate, Tedesara, Rajnandgaon, Chhattisgarh 491443'),
      },
    ],
  },

  /** Only add real, official URLs here. Empty = no social icons rendered. */
  social: [] as { label: string; href: string }[],

  /**
   * The brochure states "An ISO 9001-2008 Company". ISO 9001:2008 was withdrawn in 2018,
   * so this is NOT shown on the site until the client confirms a current certificate.
   */
  certification: {
    label: 'ISO 9001:2015',
    confirmed: false,
  },
}

/**
 * Editable company profile blocks for future content (history, leadership, milestones…).
 * Blocks with `published: false` are never rendered. Fill in real, client-approved content
 * and set `published: true` to show a block on the About page.
 */
export type ProfileBlock = {
  id: string
  eyebrow: string
  title: string
  body: string[]
  image?: { src: string; alt: string }
  published: boolean
}

export const profileBlocks: ProfileBlock[] = [
  { id: 'history', eyebrow: 'Our Story', title: 'Company History', body: [], published: false },
  { id: 'leadership', eyebrow: 'Leadership', title: 'Founder & Leadership', body: [], published: false },
  { id: 'message', eyebrow: 'From the Management', title: 'Management Message', body: [], published: false },
  { id: 'team', eyebrow: 'People', title: 'Our Manufacturing Team', body: [], published: false },
  { id: 'milestones', eyebrow: 'Milestones', title: 'Company Milestones', body: [], published: false },
  { id: 'certifications', eyebrow: 'Recognition', title: 'Certifications & Achievements', body: [], published: false },
]

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Industries', to: '/industries' },
  { label: 'Quality & Testing', to: '/quality' },
  { label: 'Infrastructure', to: '/infrastructure' },
  { label: 'Contact', to: '/contact' },
]

/** Brochure-stated figures only. Used for the animated spec strip. */
export const verifiedFigures = [
  { value: 0.02, decimals: 2, prefix: '', suffix: ' mm', label: 'Finish machining accuracy on shafts' },
  { value: 1400, decimals: 0, prefix: 'Ø', suffix: ' mm', label: 'Maximum ring diameter' },
  { value: 5, decimals: 0, prefix: '', suffix: '', label: 'In-house testing & inspection methods' },
  { value: 7, decimals: 0, prefix: '', suffix: '', label: 'Standards served regularly' },
]
