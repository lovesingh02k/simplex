/**
 * Industries served – as listed in the brochure.
 * Images: freely licensed sector photographs from Wikimedia Commons (see src/data/credits.json).
 * They illustrate each industry – they are not Simplex Metals sites or customers.
 */

export type Industry = {
  id: string
  number: string
  name: string
  description: string
  /** Brochure products relevant to the sector (links to product pages). */
  relatedProducts: string[]
  image: { src: string; alt: string; position?: string }
}

export const industries: Industry[] = [
  {
    id: 'steel',
    number: '01',
    name: 'Steel Plants',
    description:
      'Heavy-duty cranes, transfer cars and material-handling equipment depend on wheels, shafts and drums that can take continuous load and shock.',
    relatedProducts: ['wheels-forged-cast', 'rope-drum-eot-crane', 'shafts-axles'],
    image: { src: '/assets/industries/steel-plant.jpg', alt: 'Molten steel being poured into a ladle in a steel plant', position: '50% 40%' },
  },
  {
    id: 'aluminium',
    number: '02',
    name: 'Aluminium Plants',
    description:
      'Process and handling equipment in aluminium plants requires dependable rotating components and replacement spares.',
    relatedProducts: ['shafts-axles', 'gear-pinion', 'rings'],
    image: { src: '/assets/industries/aluminium-plant.jpg', alt: 'Equipment inside an aluminium smelter' },
  },
  {
    id: 'cement',
    number: '03',
    name: 'Cement Plants',
    description:
      'Stackers, reclaimers and drive systems in cement plants call for robust wheels, gears and pinions.',
    relatedProducts: ['wheels-forged-cast', 'gear-pinion'],
    image: { src: '/assets/industries/cement-plant.jpg', alt: 'Cement plant with preheater towers', position: '35% 50%' },
  },
  {
    id: 'railways',
    number: '04',
    name: 'Railways',
    description:
      'Bogie wheels and loco wheel sets, with wheels manufactured as per IRS specification where required.',
    relatedProducts: ['wheels-forged-cast', 'shafts-axles'],
    image: { src: '/assets/industries/railways.jpg', alt: 'Indian Railways WAP-4 electric locomotive', position: '45% 50%' },
  },
  {
    id: 'power',
    number: '05',
    name: 'Power Plants',
    description:
      'Material-handling and crane equipment in power plants relies on rope drums, wheels and shafts built for long service life.',
    relatedProducts: ['rope-drum-eot-crane', 'wheels-forged-cast', 'rings'],
    image: { src: '/assets/industries/power-plant.jpg', alt: 'Thermal power station at night', position: '30% 50%' },
  },
]
