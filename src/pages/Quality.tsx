import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { fadeUp, stagger, viewport } from '../animations/variants'
import { CornerTicks } from '../components/common/EngineeringMarks'
import { Reveal } from '../components/common/Reveal'
import { SectionHeading } from '../components/common/SectionHeading'
import { Seo } from '../components/common/Seo'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { materials, standards, testingFacilities } from '../data/facilities'
import { cn } from '../utils/cn'

export default function Quality() {
  const [active, setActive] = useState(0)
  const current = testingFacilities[active]

  return (
    <>
      <Seo
        title="Quality & Testing – Spectrometer, UTM, Ultrasonic, MPI"
        description="In-house testing at Simplex Metals: spectrometer chemical testing, universal testing machine, ultrasonic testing, MPI and dimensional checking. Standards: IS, BS, DIN, GOST, ASTM, IRS, IBR."
      />
      <PageHero
        eyebrow="Quality & Testing"
        title={['Tested Before', 'It Leaves the Works.']}
        intro="From chemical analysis of raw material to final dimensional inspection, testing is part of how every Simplex component is made – not an afterthought."
        drawing="shaft"
        crumbs={[{ label: 'Quality & Testing' }]}
        feature={{ src: '/assets/site/ultrasonic-testing.jpg', alt: 'Ultrasonic flaw detector showing echo readings', label: 'Ultrasonic Testing', caption: 'Internal soundness checked without damaging the part' }}
      />

      {/* Testing facility gallery */}
      <section aria-labelledby="facilities-title" className="bg-steel-50 py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading
            id="facilities-title"
            eyebrow="Testing Facility"
            title={['Five Ways We Verify', 'Every Order.']}
            accentLast
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div role="tablist" aria-label="Testing facilities" aria-orientation="vertical" className="border-t border-steel-200 lg:col-span-5">
              {testingFacilities.map((t, i) => {
                const isActive = i === active
                return (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={isActive}
                    aria-controls="facility-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="group relative flex w-full items-baseline gap-6 border-b border-steel-200 py-6 text-left"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute bottom-[-1px] left-0 h-0.5 bg-forge-500 transition-all duration-700 ease-industrial',
                        isActive ? 'w-full' : 'w-0',
                      )}
                    />
                    <span className={cn('font-sans text-xs transition-colors', isActive ? 'text-forge-600' : 'text-steel-400')}>{t.number}</span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          'block font-display text-xl font-bold tracking-tight [font-stretch:108%] transition-colors sm:text-2xl',
                          isActive ? 'text-ink-800' : 'text-steel-500 group-hover:text-ink-800',
                        )}
                      >
                        {t.name}
                      </span>
                      <span className="mt-1 block font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">{t.purpose}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div id="facility-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="relative lg:col-span-7">
              <div className="grain relative aspect-[4/3] overflow-hidden bg-ink-800">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.img
                    key={current.id}
                    src={current.image.src}
                    alt={current.image.alt}
                    className="photo-grade absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-900/90 to-transparent" />
                <AnimatePresence mode="wait">
                  <motion.figcaption
                    key={current.id}
                    className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="font-sans text-[0.65rem] tracking-[0.1em] text-forge-400 uppercase">{current.purpose}</p>
                    <p className="mt-2 font-display text-2xl font-bold [font-stretch:108%]">{current.name}</p>
                    <p className="mt-2 max-w-md text-sm text-steel-300">{current.description}</p>
                  </motion.figcaption>
                </AnimatePresence>
              </div>
              <CornerTicks tone="dark" className="-m-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Standards & materials */}
      <section aria-labelledby="standards-title" className="bg-white py-24 lg:py-36">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <SectionHeading id="standards-title" eyebrow="Standards & Materials" title={['Specified. Verified.', 'Delivered.']} accentLast />
            <p className="max-w-lg text-steel-600 lg:pb-2">
              We regularly manufacture to the following national and international standards, in carbon, high tensile and low alloy
              steels.
            </p>
          </div>

          <Reveal className="mt-16">
            <p className="font-sans text-[0.68rem] font-semibold tracking-[0.1em] text-steel-500 uppercase">Standards served regularly</p>
            <motion.ul className="mt-5 grid grid-cols-3 gap-px bg-steel-200 sm:grid-cols-4 lg:grid-cols-7" variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewport}>
              {standards.map((s) => (
                <motion.li
                  key={s}
                  variants={fadeUp}
                  className="grid aspect-[4/3] place-items-center bg-steel-50 font-display text-2xl font-extrabold tracking-wide text-ink-800 [font-stretch:115%] transition-colors duration-500 hover:bg-ink-900 hover:text-forge-400 sm:text-3xl"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>

          <motion.div className="mt-16 grid gap-5 lg:grid-cols-3" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
            {materials.map((m) => (
              <motion.div key={m.group} variants={fadeUp} className="card-lift border border-steel-200 bg-steel-50 p-8 hover:bg-white">
                <h3 className="font-display text-xl font-bold tracking-tight text-ink-800 [font-stretch:108%]">{m.group}</h3>
                <ul className="mt-6 divide-y divide-steel-200 border-y border-steel-200">
                  {m.grades.map((g) => (
                    <li key={g} className="py-3 font-tech text-sm text-ink-700 transition-[color,padding] duration-300 hover:pl-2 hover:text-forge-600">
                      {g}
                    </li>
                  ))}
                </ul>
                {m.note && <p className="mt-4 text-sm text-steel-500">{m.note}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <HardeningLink />
      <FinalCta title={['Specify It.', 'We’ll Test It.']} image="/assets/industries/steel-rolling-mill.jpg" />
    </>
  )
}

/** Short pointer to the full hardening section on the Products page (kept in one place only). */
function HardeningLink() {
  return (
    <section aria-label="Hardening process" className="bg-ink-900 text-white">
      <Link to="/products#hardening" className="group container-x flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="block text-[0.72rem] font-semibold tracking-[0.1em] text-forge-400 uppercase">Sobritising Process</span>
          <span className="mt-1 block font-display text-xl font-bold [font-stretch:106%] sm:text-2xl">
            300–350 BHN surface · 12–15 mm hardened depth · ductile core
          </span>
        </span>
        <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] uppercase">
          See the hardening process
          <ArrowRight className="size-4 text-forge-400 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  )
}
