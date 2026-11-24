import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { fadeUp, stagger, viewport } from '../animations/variants'
import { CornerTicks } from '../components/common/EngineeringMarks'
import { Photo } from '../components/common/Photo'
import { SectionHeading } from '../components/common/SectionHeading'
import { Seo } from '../components/common/Seo'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { infrastructure, infrastructureGallery } from '../data/facilities'
import { cn } from '../utils/cn'
import { SteelBackdrop } from '../components/common/SteelBackdrop'

export default function Infrastructure() {
  return (
    <>
      <Seo
        title="Infrastructure – Machining, Hardening & Testing"
        description="Heavy-duty turning, shaft machining, heat treatment and in-house testing at Simplex Metals."
      />
      <PageHero
        eyebrow="Infrastructure"
        title={['Where Steel Becomes', 'Dependable Parts.']}
        intro="How heavy mechanical spares are made – heavy turning, shaft machining, heat treatment and testing."
        drawing="gear"
        crumbs={[{ label: 'Infrastructure' }]}
        feature={{ src: '/assets/site/heavy-machine-shop.jpg', alt: 'Heavy machine shop with large lathes', label: 'Process', caption: 'Turning, heat treatment and testing' }}
      />
      <StickyStory />
      <Gallery />
      <FinalCta title={['Have a Drawing?', 'We’ll Build It.']} image="/assets/industries/cement-plant.jpg" />
    </>
  )
}

/** Desktop: pinned image that changes as each step scrolls past. Mobile: simple stacked cards. */
function StickyStory() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(infrastructure.length - 1, Math.max(0, Math.floor(v * infrastructure.length))))
  })
  const current = infrastructure[active]

  return (
    <section aria-labelledby="story-title" className="overflow-clip isolate relative bg-ink-900 py-24 text-white lg:py-36">
      <SteelBackdrop />
      <div className="container-x">
        <SectionHeading
          id="story-title"
          tone="light"
          eyebrow="Manufacturing Process"
          title={['From the Shop Floor', 'to Your Plant.']}
          accentLast
        />

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* pinned visual (desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28">
              <div className="grain relative aspect-[4/3] overflow-hidden bg-ink-800">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={current.id}
                    src={current.image.src}
                    alt={current.image.alt}
                    className="photo-grade absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: current.image.position }}
                    initial={{ opacity: 0, y: 30, scale: 1.06 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.3 } }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
                <div className="absolute top-5 right-5 z-10 bg-ink-900/80 px-3 py-1.5 font-sans text-xs tracking-[0.1em] text-white backdrop-blur-sm">
                  {String(active + 1).padStart(2, '0')} / {String(infrastructure.length).padStart(2, '0')}
                </div>
              </div>
              <CornerTicks className="-m-3" />
              {/* progress */}
              <div className="mt-6 flex gap-2">
                {infrastructure.map((s, i) => (
                  <span key={s.id} className="h-0.5 flex-1 bg-white/10">
                    <span className={cn('block h-full bg-forge-500 transition-[width] duration-700', i <= active ? 'w-full' : 'w-0')} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* steps */}
          <ol className="lg:col-span-5">
            {infrastructure.map((s, i) => (
              <li key={s.id} className="flex flex-col justify-center border-t border-white/10 py-10 lg:min-h-[64vh] lg:py-0">
                <Photo src={s.image.src} alt={s.image.alt} position={s.image.position} reveal className="mb-8 aspect-[4/3] lg:hidden" />
                <p
                  className={cn(
                    'font-sans text-xs tracking-[0.1em] transition-colors duration-500',
                    i === active ? 'text-forge-400' : 'text-steel-500',
                  )}
                >
                  STEP {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className={cn(
                    'display-tight mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold transition-colors duration-500',
                    i === active ? 'text-white' : 'lg:text-steel-500',
                  )}
                >
                  {s.title}
                </h3>
                <p className="mt-5 max-w-md leading-relaxed text-steel-300">{s.caption}</p>
                {/* close-up detail beside each step (desktop – mobile shows the main photo above) */}
                <figure
                  className={cn(
                    'group relative mt-8 hidden aspect-[16/9] max-w-sm overflow-hidden transition-opacity duration-700 lg:block',
                    i === active ? 'opacity-100' : 'opacity-40',
                  )}
                >
                  <img
                    src={s.detail.src}
                    alt={s.detail.alt}
                    loading="lazy"
                    className="photo-grade h-full w-full object-cover transition-transform duration-[1.2s] ease-industrial group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-0 left-0 bg-ink-900/80 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.06em] text-steel-200 uppercase">
                    Detail · {s.detail.alt}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const layout = [
    'md:col-span-4 aspect-[4/3] md:aspect-auto md:row-span-2',
    'md:col-span-2 aspect-[4/3]',
    'md:col-span-2 aspect-[4/3]',
    'md:col-span-2 aspect-[4/3]',
    'md:col-span-2 aspect-[4/3]',
    'md:col-span-2 aspect-[4/3]',
  ]
  return (
    <section aria-labelledby="gallery-title" className="overflow-clip isolate relative bg-steel-50 py-24 lg:py-36">
      <SteelBackdrop tone="light" />
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Facility Gallery"
          title={['Process', 'Gallery.']}
          accentLast
          intro="Representative photographs of the processes used to make heavy mechanical spares."
        />
        <motion.ul className="mt-16 grid gap-4 md:grid-cols-6" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
          {infrastructureGallery.map((g, i) => (
            <motion.li key={g.src} variants={fadeUp} className={cn('group relative', layout[i] ?? 'aspect-[4/3] md:col-span-2')}>
              <figure className="relative h-full w-full overflow-hidden">
                <Photo src={g.src} alt={g.alt} zoomOnHover className="h-full w-full" />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-900/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-1 items-center justify-between p-5 text-white transition-transform duration-500 ease-industrial group-hover:-translate-y-1">
                  <span className="text-sm font-semibold">{g.caption}</span>
                  <span className="font-sans text-[0.65rem] text-steel-300">{String(i + 1).padStart(2, '0')}</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
