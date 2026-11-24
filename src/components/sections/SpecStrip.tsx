import { motion } from 'motion/react'
import { fadeUp, stagger, viewport } from '../../animations/variants'
import { verifiedFigures } from '../../data/company'
import { Counter } from '../common/Counter'

/** Brochure-stated technical figures only – no invented statistics. */
export function SpecStrip() {
  return (
    <section aria-label="Technical highlights" className="border-y border-steel-200 bg-white">
      <motion.dl
        className="container-x grid grid-cols-2 lg:grid-cols-4"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {verifiedFigures.map((f, i) => (
          <motion.div
            key={f.label}
            variants={fadeUp}
            className={`group flex flex-col-reverse gap-2 py-10 sm:py-12 ${i % 2 === 1 ? 'border-l border-steel-200 pl-6 sm:pl-10' : 'lg:pr-6'} ${i === 2 ? 'lg:border-l lg:border-steel-200 lg:pl-10' : ''} ${i >= 2 ? 'max-lg:border-t max-lg:border-steel-200' : ''}`}
          >
            <dt className="text-sm text-steel-500">{f.label}</dt>
            <dd className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold tracking-tight text-ink-800 [font-stretch:110%] transition-colors duration-500 group-hover:text-forge-500">
              <Counter value={f.value} decimals={f.decimals} prefix={f.prefix} suffix={f.suffix} />
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  )
}
