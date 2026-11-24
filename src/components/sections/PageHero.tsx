import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Eyebrow } from '../common/Eyebrow'
import { SteelBackdrop } from '../common/SteelBackdrop'

const ease = [0.22, 1, 0.36, 1] as const

type Feature = { src: string; alt: string; caption: string; label?: string; position?: string }

type Props = {
  eyebrow: string
  title: string[]
  intro?: ReactNode
  /** Engineering drawing shown faintly behind the header. */
  drawing?: 'wheel' | 'gear' | 'shaft'
  crumbs?: { label: string; to?: string }[]
  /** Framed photograph shown on the right on large screens. */
  feature?: Feature
  children?: ReactNode
}

/** Dark header for inner pages: copy on the left, a framed photograph on the right. */
export function PageHero({ eyebrow, title, intro, drawing = 'wheel', crumbs = [], feature, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const featureY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-14%'])

  return (
    <section ref={ref} className="relative isolate overflow-clip bg-ink-900 text-white">
      <SteelBackdrop drawing={drawing} glow />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-forge-500/60 to-transparent" />

      <div className="container-x grid min-h-[64svh] items-end gap-12 pt-36 pb-16 lg:min-h-[74svh] lg:grid-cols-[1.25fr_0.75fr] lg:pb-24">
        <div>
          <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <ol className="flex flex-wrap items-center gap-2 text-[0.72rem] tracking-[0.08em] text-steel-400 uppercase">
              {[{ label: 'Home', to: '/' }, ...crumbs].map((c, i, arr) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.to && i < arr.length - 1 ? (
                    <Link to={c.to} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-steel-200">
                      {c.label}
                    </span>
                  )}
                  {i < arr.length - 1 && <ChevronRight className="size-3" />}
                </li>
              ))}
            </ol>
          </motion.nav>

          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease, delay: 0.35 }}>
            <Eyebrow tone="light" className="mt-10">
              {eyebrow}
            </Eyebrow>
          </motion.div>
          <h1 className="display-tight mt-6 max-w-4xl text-[clamp(2.5rem,5.6vw,4.8rem)] font-extrabold">
            {title.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={i === title.length - 1 && title.length > 1 ? 'block text-steel-400' : 'block'}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease, delay: 0.45 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          {intro && (
            <motion.div
              className="mt-8 max-w-xl text-[1.06rem] leading-relaxed text-steel-300"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.75 }}
            >
              {intro}
            </motion.div>
          )}
          {children}
        </div>

        {feature && (
          <motion.figure className="group relative isolate hidden lg:block" style={{ y: featureY }}>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden bg-ink-800"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.3, ease, delay: 0.5 }}
            >
              <img
                src={feature.src}
                alt={feature.alt}
                className="photo-grade h-full w-full object-cover grayscale-[0.35] transition-[transform,filter] duration-[1.2s] ease-industrial group-hover:scale-105 group-hover:grayscale-0"
                style={{ objectPosition: feature.position }}
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-900/85 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                {feature.label && <p className="text-[0.7rem] font-semibold tracking-[0.1em] text-forge-400 uppercase">{feature.label}</p>}
                <p className="mt-1 font-display text-lg leading-snug font-bold [font-stretch:105%]">{feature.caption}</p>
              </figcaption>
            </motion.div>
            <span aria-hidden className="absolute -bottom-3 -left-3 -z-10 h-1/3 w-1/2 bg-forge-500" />
          </motion.figure>
        )}
      </div>
    </section>
  )
}
