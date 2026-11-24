import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/common/Seo'
import { ProductFeature } from '../components/products/ProductFeature'
import { FinalCta } from '../components/sections/FinalCta'
import { HardeningProcess } from '../components/sections/HardeningProcess'
import { PageHero } from '../components/sections/PageHero'
import { productCategories, products, type ProductCategory } from '../data/products'
import { cn } from '../utils/cn'
import { SteelBackdrop } from '../components/common/SteelBackdrop'

/** Thumbnail for a category card: the first product's photo, or a shop-floor view for "All". */
const categoryImage = (id: ProductCategory | 'all') =>
  id === 'all' ? '/assets/site/heavy-machine-shop.jpg' : (products.find((p) => p.category === id)?.image.src ?? '')

export default function Products() {
  const [params, setParams] = useSearchParams()
  const active = (params.get('category') as ProductCategory | null) ?? 'all'
  const list = active === 'all' ? products : products.filter((p) => p.category === active)

  const select = (id: string) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <Seo
        title="Products – Wheels, Shafts, Rings, Gears & Rope Drums"
        description="Forged and cast wheels Ø160–Ø1000 mm, shafts and axles machined to 0.02 mm, rings Ø100–Ø1400 mm, hardened gears and pinions and rope drums for EOT cranes."
      />
      <PageHero
        eyebrow="Product Portfolio"
        title={['Mechanical Spares,', 'Built to Perform.']}
        intro="Wheels, shafts, rings, gears and rope drums for core sector industries – manufactured in carbon and alloy steels, heat treated and tested in-house."
        drawing="gear"
        crumbs={[{ label: 'Products' }]}
        feature={{ src: '/assets/site/gear-pinion-mesh.jpg', alt: 'Forged and hardened pinion', label: 'Gear & Pinion', caption: 'Forged, then flame, induction, volume or case hardened' }}
      />

      {/* Category picker: photo cards instead of plain text tabs */}
      <div className="relative z-30 border-b border-steel-200 bg-steel-50">
        <div className="container-x py-6">
          <LayoutGroup>
            <div role="tablist" aria-label="Filter products by category" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {productCategories.map((c) => {
                const isActive = active === c.id
                const count = c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(c.id)}
                    className={cn(
                      'group relative isolate aspect-[4/3] overflow-hidden bg-ink-800 text-left text-white outline-offset-2 lg:aspect-[5/4]',
                      c.id === 'all' && 'col-span-2 aspect-[8/3] sm:col-span-1 sm:aspect-[4/3] lg:aspect-[5/4]',
                    )}
                  >
                    <img
                      src={categoryImage(c.id)}
                      alt=""
                      loading="lazy"
                      className={cn(
                        'absolute inset-0 -z-20 h-full w-full object-cover transition-[transform,filter] duration-700 ease-industrial group-hover:scale-110 group-hover:grayscale-0',
                        isActive ? 'scale-105 grayscale-0' : 'grayscale-[0.75]',
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-0 -z-10 bg-linear-to-t transition-opacity duration-500',
                        isActive ? 'from-ink-900/90 via-ink-900/30 to-transparent' : 'from-ink-900/90 via-ink-900/55 to-ink-900/25',
                      )}
                    />
                    <span className="absolute top-2 right-2 bg-ink-900/70 px-1.5 py-0.5 text-[0.65rem] font-semibold backdrop-blur-sm">{count}</span>
                    <span className="absolute inset-x-0 bottom-0 p-3">
                      <span className="block text-[0.78rem] leading-tight font-semibold tracking-[0.04em] uppercase">{c.label}</span>
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="filter-active"
                        className="absolute inset-x-0 bottom-0 h-1 bg-forge-500"
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>
      </div>

      <section aria-label="Products" className="overflow-clip isolate relative bg-steel-50 pb-12">
        <SteelBackdrop tone="light" />
        <div className="container-x">
          <p className="pt-10 font-sans text-[0.68rem] font-semibold tracking-[0.1em] text-steel-500 uppercase" aria-live="polite">
            Showing {list.length} of {products.length} product groups
          </p>
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <ProductFeature key={p.slug} product={p} flip={i % 2 === 1} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      <HardeningProcess />
      <FinalCta title={['Need a Component', 'Built to Drawing?']} image="/assets/industries/aluminium-plant.jpg" />
    </>
  )
}
