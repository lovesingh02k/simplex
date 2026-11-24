import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, viewport } from '../../animations/variants'
import { industries } from '../../data/industries'
import { cn } from '../../utils/cn'
import { SectionHeading } from '../common/SectionHeading'
import { SteelBackdrop } from '../common/SteelBackdrop'

/** Expanding-panel gallery on desktop, stacked cards on smaller screens. */
export function IndustriesShowcase() {
  const [active, setActive] = useState(0)

  return (
    <section aria-labelledby="industries-title" className="overflow-clip isolate relative bg-steel-50 py-24 lg:py-36">
      <SteelBackdrop tone="light" />
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            id="industries-title"
            eyebrow="Industries We Serve"
            title={['Powering the Industries', 'That Move the World.']}
            accentLast
          />
          <p className="max-w-sm text-steel-600 lg:pb-2">
            Our components serve the core sector – where downtime is expensive and every part must perform.
          </p>
        </div>

        <motion.ul
          className="mt-16 flex flex-col gap-3 lg:h-[560px] lg:flex-row"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {industries.map((ind, i) => {
            const isActive = active === i
            return (
              <motion.li
                key={ind.id}
                variants={fadeUp}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  'relative min-h-[300px] overflow-hidden bg-ink-800 transition-[flex-grow] duration-700 ease-industrial lg:min-h-0',
                  isActive ? 'lg:flex-[3.2]' : 'lg:flex-1',
                )}
              >
                <Link to={`/industries#${ind.id}`} className="group absolute inset-0 block text-white">
                  <img
                    src={ind.image.src}
                    alt={ind.image.alt}
                    loading="lazy"
                    className={cn(
                      'photo-grade absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1.2s] ease-industrial',
                      isActive ? 'scale-100' : 'scale-110 lg:grayscale-[0.6]',
                    )}
                    style={{ objectPosition: ind.image.position }}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      'absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/50 to-ink-900/10 transition-opacity duration-700',
                      isActive ? 'opacity-90' : 'opacity-80',
                    )}
                  />
                  <span className="absolute top-6 left-6 font-sans text-xs tracking-[0.1em] text-forge-400">{ind.number}</span>

                  {/* collapsed label (desktop) */}
                  <span
                    className={cn(
                      'absolute bottom-8 left-1/2 hidden origin-center -translate-x-1/2 font-display text-lg font-bold tracking-wide whitespace-nowrap uppercase [writing-mode:vertical-rl] rotate-180 transition-opacity duration-500 lg:block',
                      isActive ? 'opacity-0' : 'opacity-100',
                    )}
                  >
                    {ind.name}
                  </span>

                  {/* expanded content */}
                  <div
                    className={cn(
                      'absolute inset-x-0 bottom-0 p-6 transition-[opacity,transform] duration-700 ease-industrial sm:p-8',
                      isActive ? 'lg:translate-y-0 lg:opacity-100 lg:delay-200' : 'lg:translate-y-6 lg:opacity-0',
                    )}
                  >
                    <h3 className="font-display text-2xl font-extrabold tracking-tight [font-stretch:110%] sm:text-3xl">{ind.name}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-steel-300">{ind.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-sans text-[0.68rem] tracking-[0.1em] text-forge-400 uppercase">
                      View sector <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
