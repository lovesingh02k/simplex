import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Crosshair, ShieldCheck, Factory } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '../common/Button'
import { CornerTicks } from '../common/EngineeringMarks'

const ease = [0.22, 1, 0.36, 1] as const
const intro = 0.35 // delay so the hero plays after the navbar

const trust = [
  { icon: Crosshair, title: 'Precision Engineering', text: 'Machined to your drawing' },
  { icon: ShieldCheck, title: 'Quality-Focused Manufacturing', text: 'In-house material testing' },
  { icon: Factory, title: 'Industrial Applications', text: 'Built for core sector duty' },
]

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.18])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%'])
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-22%'])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-clip bg-ink-900 text-white">
      {/* background photograph */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY }}>
        <motion.img
          src="/assets/industries/steel-rolling-mill.jpg"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-[70%_50%]"
          style={{ scale: bgScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/88 to-ink-900/45" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/60" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-12 pt-32 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
        <motion.div style={{ y: contentY }}>
          <motion.p
            className="flex items-center gap-2.5 text-[0.75rem] font-semibold tracking-[0.1em] text-steel-300 uppercase"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: intro }}
          >
            <span className="size-1.5 bg-forge-500" />
            Engineering Excellence <span className="hidden text-steel-500 sm:inline">|</span> <span className="hidden sm:inline">Simplex Metals</span>
          </motion.p>

          <h1 id="hero-title" className="display-tight mt-7 text-[clamp(2.6rem,5.6vw,4.9rem)] font-extrabold">
            {['Engineering Strength.', 'Built for Industries.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={i === 1 ? 'block text-forge-500' : 'block'}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease, delay: intro + 0.1 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-[1.08rem] leading-relaxed text-steel-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: intro + 0.45 }}
          >
            Delivering reliable mechanical spares and precision-engineered components for demanding industrial applications.
            Quality, durability and performance you can trust.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: intro + 0.6 }}
          >
            <Button to="/products">Explore Our Products</Button>
            <Button to="/contact" variant="outline-light">
              Discuss Your Requirements
            </Button>
          </motion.div>

          <motion.ul
            className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: intro + 0.8 } } }}
          >
            {trust.map(({ icon: Icon, title, text }) => (
              <motion.li
                key={title}
                className="flex items-start gap-3"
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              >
                <span className="grid size-10 shrink-0 place-items-center border border-white/15 text-forge-400">
                  <Icon className="size-[1.1rem]" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{title}</span>
                  <span className="mt-0.5 block text-xs text-steel-400">{text}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* framed product photograph */}
        <motion.div className="relative hidden lg:block" style={{ y: frameY }}>
          <motion.div
            className="relative ml-auto aspect-[1/1] w-full max-w-[480px]"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease, delay: intro + 0.2 }}
          >
            <img
              src="/assets/site/wheelsets-journals.jpg"
              alt="Railway wheel sets with fitted axle journals"
              className="photo-grade h-full w-full object-cover object-[45%_50%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
            <CornerTicks className="-m-3" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-[0.62rem] tracking-[0.1em] text-forge-400 uppercase">Wheels – Forged / Cast</p>
                <p className="mt-1 font-display text-2xl font-bold [font-stretch:110%]">Ø160 – Ø1000 mm</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
