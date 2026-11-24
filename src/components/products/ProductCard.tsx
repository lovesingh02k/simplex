import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeUp } from '../../animations/variants'
import type { Product } from '../../data/products'
import { cn } from '../../utils/cn'

type Props = { product: Product; className?: string }

/**
 * Full-bleed product card. At rest the photo is muted; on hover it comes to full colour,
 * the title lifts and the key specifications slide up from below.
 */
export function ProductCard({ product, className }: Props) {
  const specs = product.specifications.slice(0, 2)
  return (
    <motion.article variants={fadeUp} layout="position" className={cn('group relative', className)}>
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-ink-850 text-white sm:aspect-[5/6]"
      >
        <img
          src={product.image.src}
          alt={product.image.alt}
          loading="lazy"
          decoding="async"
          className="photo-grade absolute inset-0 h-full w-full object-cover grayscale-[0.55] brightness-[0.8] transition-[transform,filter] duration-[1.4s] ease-industrial group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-100"
          style={{ objectPosition: product.image.position }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/40 to-transparent transition-opacity duration-700 group-hover:opacity-90"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <span className="bg-ink-900/60 px-2 py-1 text-[0.7rem] font-semibold tracking-[0.1em] backdrop-blur-sm">{product.number}</span>
          <span
            aria-hidden
            className="grid size-11 translate-x-2 -translate-y-2 place-items-center bg-forge-500 opacity-0 transition-all duration-500 ease-industrial group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
          <div className="translate-y-0 transition-transform duration-700 ease-industrial sm:translate-y-[var(--lift)] sm:group-hover:translate-y-0" style={{ ['--lift' as string]: `${specs.length * 2.6 + 1}rem` }}>
            <h3 className="font-display text-[1.45rem] leading-tight font-bold tracking-tight [font-stretch:106%]">{product.shortName}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-steel-300">{product.summary}</p>
            <dl className="mt-5 border-t border-white/15 opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:delay-150">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-white/10 py-2 text-[0.8rem]">
                  <dt className="text-steel-400">{s.label}</dt>
                  <dd className="text-right font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-forge-500 transition-transform duration-700 ease-industrial group-hover:scale-x-100"
        />
      </Link>
    </motion.article>
  )
}
