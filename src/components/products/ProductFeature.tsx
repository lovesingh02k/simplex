import { motion } from 'motion/react'
import { fadeUp, stagger, viewport } from '../../animations/variants'
import type { Product } from '../../data/products'
import { cn } from '../../utils/cn'
import { Button, TextLink } from '../common/Button'
import { CornerTicks } from '../common/EngineeringMarks'
import { Photo } from '../common/Photo'
import { ProductSpecs } from './ProductSpecs'

/** Editorial product row: photograph stays pinned while the technical detail scrolls past. */
export function ProductFeature({ product, flip }: { product: Product; flip?: boolean }) {
  return (
    <motion.article
      id={product.slug}
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="grid scroll-mt-40 gap-10 border-t border-steel-200 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24"
    >
      <div className={cn('lg:col-span-6', flip && 'lg:order-2')}>
        <div className="relative isolate lg:sticky lg:top-40">
          <Photo src={product.image.src} alt={product.image.alt} position={product.image.position} reveal className="aspect-[4/3] w-full" />
          <CornerTicks className="-m-3" tone="dark" />
          <span className="absolute -top-6 right-0 font-display text-[5rem] leading-none font-extrabold text-steel-200 [font-stretch:115%] -z-10 select-none lg:-top-12 lg:text-[7rem]" aria-hidden>
            {product.number}
          </span>
        </div>
      </div>

      <motion.div className={cn('lg:col-span-6', flip && 'lg:order-1')} variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
        <motion.p variants={fadeUp} className="font-sans text-[0.7rem] tracking-[0.1em] text-forge-600 uppercase">
          Product {product.number}
        </motion.p>
        <motion.h2 variants={fadeUp} className="display-tight mt-4 text-[clamp(2rem,3.8vw,3rem)] font-extrabold text-ink-800">
          {product.name}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-[1.05rem] leading-relaxed text-steel-600">
          {product.description}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <ProductSpecs product={product} compact />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Button to={`/contact?product=${product.slug}`}>Enquire About This Product</Button>
          <TextLink to={`/products/${product.slug}`}>Full Details</TextLink>
        </motion.div>
      </motion.div>
    </motion.article>
  )
}
