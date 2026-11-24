import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { fadeUp, stagger, viewport } from '../../animations/variants'
import { standards, testingFacilities } from '../../data/facilities'
import { cn } from '../../utils/cn'
import { Button } from '../common/Button'
import { SectionHeading } from '../common/SectionHeading'
import { SteelBackdrop } from '../common/SteelBackdrop'

const ease = [0.22, 1, 0.36, 1] as const

/** Hovering (or focusing) a test in the list swaps the photograph beside it. */
export function QualityPreview() {
  const [active, setActive] = useState(0)
  const current = testingFacilities[active]

  return (
    <section aria-labelledby="quality-title" className="isolate relative overflow-clip bg-ink-850 py-24 text-white lg:py-36">
      <SteelBackdrop />
      <div className="container-x relative grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="quality-title"
            tone="light"
            eyebrow="Quality & Testing"
            title={['Quality Is Built Into', 'Every Component.']}
            accentLast
            intro="Material is verified before machining begins and components are inspected before they leave the works."
          />

          <motion.ol
            className="mt-12 border-t border-white/10"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {testingFacilities.map((t, i) => {
              const isActive = i === active
              return (
                <motion.li key={t.id} variants={fadeUp} className="border-b border-white/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group relative flex w-full items-center gap-6 overflow-hidden py-5 text-left"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-y-0 left-0 -z-0 bg-white/[0.04] transition-[width] duration-700 ease-industrial',
                        isActive ? 'w-full' : 'w-0',
                      )}
                    />
                    <span className={cn('relative w-8 pl-1 text-xs font-semibold transition-colors', isActive ? 'text-forge-400' : 'text-steel-500')}>
                      {t.number}
                    </span>
                    <span
                      className={cn(
                        'relative flex-1 font-display text-lg font-semibold [font-stretch:105%] transition-[color,transform] duration-500 ease-industrial sm:text-xl',
                        isActive ? 'translate-x-2 text-white' : 'text-steel-400',
                      )}
                    >
                      {t.name}
                    </span>
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        'relative mr-2 size-4 text-forge-400 transition-all duration-500',
                        isActive ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0',
                      )}
                    />
                  </button>
                </motion.li>
              )
            })}
          </motion.ol>

          <div className="mt-12">
            <Button to="/quality">Explore Our Quality Standards</Button>
          </div>
        </div>

        <div className="self-center">
          <div className="grain relative aspect-[4/3] overflow-hidden bg-ink-800">
            <AnimatePresence initial={false}>
              <motion.img
                key={current.id}
                src={current.image.src}
                alt={current.image.alt}
                className="photo-grade absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.2 } }}
                transition={{ duration: 0.8, ease }}
              />
            </AnimatePresence>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-900/90 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-[0.7rem] font-semibold tracking-[0.1em] text-forge-400 uppercase">{current.purpose}</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-steel-200">{current.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-[0.72rem] font-semibold tracking-[0.12em] text-steel-400 uppercase">Standards served</span>
            {standards.map((s) => (
              <span
                key={s}
                className="border border-white/15 px-3 py-1.5 text-xs font-semibold tracking-wider text-steel-200 transition-colors duration-300 hover:border-forge-500 hover:bg-forge-500 hover:text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
