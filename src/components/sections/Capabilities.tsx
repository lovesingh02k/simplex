import { motion } from 'motion/react'
import { stagger, viewport } from '../../animations/variants'
import { products } from '../../data/products'
import { Button } from '../common/Button'
import { SectionHeading } from '../common/SectionHeading'
import { ProductCard } from '../products/ProductCard'
import { SteelBackdrop } from '../common/SteelBackdrop'

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="isolate relative overflow-clip bg-ink-900 py-24 lg:py-36">
      <SteelBackdrop drawing="gear" />
      <div className="container-x relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="capabilities-title"
            tone="light"
            eyebrow="Manufacturing Capabilities"
            title={['Components Engineered', 'for Heavy Duty.']}
            accentLast
            intro="From forged wheels to hardened gears, each component is manufactured, heat treated and tested for continuous industrial service."
          />
          <Button to="/products" variant="outline-light" className="shrink-0 self-start lg:self-auto">
            View All Products
          </Button>
        </div>

        <motion.div
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
