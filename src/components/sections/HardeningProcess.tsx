import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { fadeUp, stagger, viewport } from '../../animations/variants'
import { hardeningProcess } from '../../data/facilities'
import { Photo } from '../common/Photo'
import { SectionHeading } from '../common/SectionHeading'
import { SteelBackdrop } from '../common/SteelBackdrop'

/**
 * Technical section for the Sobritising hardening process (brochure figures).
 * A cross-section diagram fills its hardened case as the section scrolls into view.
 */
export function HardeningProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 45%'] })
  const caseDepth = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])

  return (
    <section id="hardening" aria-labelledby="hardening-title" className="isolate relative overflow-clip bg-ink-900 py-24 text-white lg:py-36">
      <SteelBackdrop drawing="wheel" drawingSide="left" glow />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            id="hardening-title"
            tone="light"
            eyebrow={`Industrial Hardening · ${hardeningProcess.name}`}
            title={['Hard Outside.', 'Tough Inside.']}
            accentLast
          />
          <p className="max-w-lg text-[1.05rem] leading-relaxed text-steel-300 lg:pb-2">{hardeningProcess.summary}</p>
        </div>

        <div ref={ref} className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* cross-section diagram */}
          <div className="relative flex flex-col justify-between border border-white/10 bg-ink-850 p-8 lg:col-span-5 lg:p-10">
            <p className="font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-400 uppercase">Section A–A · Wheel tread (schematic)</p>
            <div className="relative mx-auto my-10 aspect-square w-full max-w-[320px]">
              <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Schematic cross-section showing a hardened outer case around a ductile core">
                <defs>
                  <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <circle cx="100" cy="100" r="92" fill="url(#hatch)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="84"
                  fill="none"
                  stroke="#f26a1b"
                  strokeWidth="16"
                  strokeOpacity="0.85"
                  style={{ pathLength: caseDepth }}
                  transform="rotate(-90 100 100)"
                />
                <circle cx="100" cy="100" r="26" fill="#0a1122" stroke="rgba(255,255,255,0.35)" />
                <line x1="8" y1="100" x2="192" y2="100" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" />
                <line x1="100" y1="8" x2="100" y2="192" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" />
              </svg>
              <span className="absolute top-[4%] -right-2 font-sans text-[0.6rem] tracking-[0.1em] text-forge-400 uppercase sm:-right-10">
                Case 12–15 mm
              </span>
              <span className="absolute bottom-[30%] left-1/2 -translate-x-1/2 font-sans text-[0.6rem] font-semibold tracking-[0.1em] text-steel-300 uppercase">
                Ductile core
              </span>
            </div>
            <div className="flex items-center gap-6 font-sans text-[0.62rem] font-semibold tracking-[0.1em] text-steel-400 uppercase">
              <span className="flex items-center gap-2">
                <span className="size-3 bg-forge-500" /> Hardened case
              </span>
              <span className="flex items-center gap-2">
                <span className="size-3 border border-white/40 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.15)_0_2px,transparent_2px_5px)]" /> Core
              </span>
            </div>
          </div>

          {/* specs + photos */}
          <div className="grid gap-6 lg:col-span-7">
            <motion.dl
              className="grid gap-px bg-white/10 sm:grid-cols-3"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {hardeningProcess.specs.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="flex flex-col-reverse gap-2 bg-ink-900 p-6 transition-colors duration-500 hover:bg-ink-800 lg:p-8">
                  <dt className="font-sans text-[0.65rem] font-semibold tracking-[0.1em] text-steel-400 uppercase">
                    {s.label} <span className="text-steel-500 normal-case">({s.note})</span>
                  </dt>
                  <dd className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-extrabold tracking-tight whitespace-nowrap [font-stretch:105%]">
                    {s.value}
                    {s.unit && <span className="ml-1.5 text-lg text-forge-400">{s.unit}</span>}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <div className="relative grid grid-cols-2 gap-6">
              {hardeningProcess.images.map((img) => (
                <Photo key={img.src} src={img.src} alt={img.alt} reveal className="aspect-[4/3]" />
              ))}
            </div>

            <motion.ul className="grid gap-6 sm:grid-cols-3" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
              {hardeningProcess.benefits.map((b) => (
                <motion.li key={b.title} variants={fadeUp} className="border-t border-forge-500/60 pt-4">
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-400">{b.text}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
