import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { fadeUp, stagger, viewport } from '../animations/variants'
import { TextLink } from '../components/common/Button'
import { DimensionLine } from '../components/common/EngineeringMarks'
import { Eyebrow } from '../components/common/Eyebrow'
import { Photo } from '../components/common/Photo'
import { Reveal } from '../components/common/Reveal'
import { SectionHeading } from '../components/common/SectionHeading'
import { Seo } from '../components/common/Seo'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { company, profileBlocks } from '../data/company'
import { products } from '../data/products'
import { SteelBackdrop } from '../components/common/SteelBackdrop'

const valueImages = [
  '/assets/site/spectrometer.jpg',
  '/assets/site/forged-shaft.jpg',
  '/assets/site/wheelset-geared.jpg',
  '/assets/site/universal-testing-machine.jpg',
]

export default function About() {
  const published = profileBlocks.filter((b) => b.published)

  return (
    <>
      <Seo
        title="About Us – Vision, Mission & Core Values"
        description="Simplex Metals is a mechanical spares and equipment manufacturer in Bhilai, Chhattisgarh. Vision: Recognition in core sector industries for quality."
      />
      <PageHero
        eyebrow="About Simplex Metals"
        title={['Mechanical Spares.', 'Engineered for Trust.']}
        intro={company.summary}
        drawing="wheel"
        crumbs={[{ label: 'About Us' }]}
        feature={{ src: '/assets/site/heavy-lathe.jpg', alt: 'Large wheel mounted on a heavy-duty lathe', label: 'Mechanical Spares', caption: 'Wheels, shafts, rings, gears and rope drums' }}
      />

      {/* Overview */}
      <section aria-labelledby="overview-title" className="overflow-clip isolate relative bg-steel-50 py-24 lg:py-36">
        <SteelBackdrop tone="light" />
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="overview-title" eyebrow="Company Overview" title={['Who We Are']} />
            <div className="group relative isolate mt-10">
              <Photo
                src="/assets/site/forging-manipulator.jpg"
                alt="Hot steel being forged"
                reveal
                zoomOnHover
                className="aspect-[4/3] w-full"
              />
              <span aria-hidden className="absolute -bottom-3 -left-3 -z-10 h-1/2 w-1/3 bg-forge-500" />
            </div>
            <DimensionLine label="Bhilai · Chhattisgarh · India" className="mt-10 hidden max-w-sm lg:block" />
          </div>
          <div className="space-y-6 text-[1.08rem] leading-relaxed text-steel-600 lg:col-span-7">
            <Reveal>
              <p className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug font-semibold tracking-tight text-ink-800">
                Simplex Metals is a manufacturer of mechanical spares and equipment, supplying components to core sector industries
                where reliability is non-negotiable.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Our product range covers forged and cast wheels for cranes, bogies, locomotives and plant equipment; shafts and axles
                finish machined to 0.02 mm; rings up to Ø1400 mm; forged and hardened gears and pinions; and fabricated, stress relieved
                rope drums for EOT cranes.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Components are manufactured in carbon, high tensile and low alloy steels to national and international standards,
                with hardening and in-house testing supporting every order.
              </p>
            </Reveal>
            <Reveal className="pt-4">
              <TextLink to="/infrastructure">See Our Infrastructure</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section aria-label="Vision and mission" className="isolate relative overflow-clip bg-ink-900 text-white">
        <SteelBackdrop />
        <div className="relative grid lg:grid-cols-2">
          <Photo
            src="/assets/industries/steel-plant.jpg"
            alt="Molten steel being poured in a steel plant"
            position="50% 45%"
            parallax={10}
            className="min-h-[360px] lg:min-h-[640px]"
          />
          <div className="container-x flex flex-col justify-center gap-16 py-20 lg:max-w-none lg:px-16 xl:px-24">
            <Reveal>
              <Eyebrow tone="light">Vision</Eyebrow>
              <blockquote className="display-tight mt-6 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold">
                “Recognition in Core Sector Industries for <span className="text-forge-500">Quality.</span>”
              </blockquote>
            </Reveal>
            <div>
              <Reveal>
                <Eyebrow tone="light">Mission</Eyebrow>
              </Reveal>
              <motion.ol className="mt-6 border-t border-white/10" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport}>
                {company.mission.map((m, i) => (
                  <motion.li key={m} variants={fadeUp} className="flex items-baseline gap-6 border-b border-white/10 py-5 transition-[padding,background-color] duration-500 hover:bg-white/[0.03] hover:pl-3">
                    <span className="font-sans text-xs text-forge-400">0{i + 1}</span>
                    <span className="text-lg text-steel-100">{m}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section aria-labelledby="values-title" className="overflow-clip isolate relative bg-white py-24 lg:py-36">
        <SteelBackdrop tone="light" />
        <div className="container-x">
          <SectionHeading id="values-title" eyebrow="Core Values" title={['The Principles', 'Behind Every Part.']} accentLast />
          <motion.ul
            className="mt-16 grid gap-px bg-steel-200 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {company.coreValues.map((v, i) => (
              <motion.li
                key={v.title}
                variants={fadeUp}
                tabIndex={0}
                className="group relative isolate flex min-h-[340px] flex-col overflow-hidden bg-white p-8 outline-none lg:p-10"
              >
                {/* photo fills the top of the card at rest and expands on hover */}
                <img
                  src={valueImages[i]}
                  alt=""
                  loading="lazy"
                  className="photo-grade absolute inset-0 -z-20 h-full w-full scale-105 object-cover grayscale-[0.3] transition-[clip-path,transform,filter] duration-[900ms] ease-industrial [clip-path:inset(0_0_58%_0)] group-hover:scale-100 group-hover:grayscale-0 group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-ink-900/80 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span className="font-display text-6xl font-extrabold text-white/85 [font-stretch:115%] drop-shadow transition-colors duration-500 group-hover:text-forge-500">
                  0{i + 1}
                </span>
                <h3 className="mt-auto pt-8 font-display text-xl font-bold tracking-tight text-ink-800 [font-stretch:108%] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600 transition-colors duration-500 group-hover:text-steel-200 group-focus-visible:text-steel-200">
                  {v.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Manufacturing photographs + highlights */}
      <section aria-labelledby="highlights-title" className="overflow-clip isolate relative bg-steel-50 py-24 lg:py-36">
        <SteelBackdrop tone="light" />
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="relative grid grid-cols-6 gap-4 lg:col-span-7">
            <Photo src="/assets/site/wheelsets-journals.jpg" alt="Finished wheel sets" reveal parallax={6} className="col-span-4 aspect-[4/3]" />
            <Photo src="/assets/site/gear-pinion-mesh.jpg" alt="Forged pinion" reveal className="col-span-2 mt-12 aspect-[3/4]" />
            <Photo src="/assets/site/forging-manipulator.jpg" alt="Rings in production" reveal className="col-span-2 aspect-[3/4]" />
            <Photo src="/assets/site/rope-drum.jpg" alt="Rope drum for EOT crane" reveal className="col-span-4 -mt-12 aspect-[4/3]" />
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <SectionHeading id="highlights-title" eyebrow="Product Highlights" title={['What We', 'Manufacture.']} accentLast />
            <motion.ul className="mt-10 border-t border-steel-200" variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={viewport}>
              {products.map((p) => (
                <motion.li key={p.slug} variants={fadeUp} className="border-b border-steel-200">
                  <Link to={`/products/${p.slug}`} className="group flex items-center gap-5 py-3">
                    <span className="w-6 text-xs font-semibold text-forge-600">{p.number}</span>
                    <span className="flex-1 font-semibold text-ink-800 transition-[color,transform] duration-500 ease-industrial group-hover:translate-x-2 group-hover:text-forge-600">
                      {p.shortName}
                    </span>
                    {/* thumbnail slides open on hover */}
                    <span className="h-12 w-0 overflow-hidden transition-[width] duration-500 ease-industrial group-hover:w-20 group-focus-visible:w-20">
                      <img src={p.image.src} alt="" loading="lazy" className="photo-grade h-12 w-20 max-w-none object-cover" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Editable profile blocks – rendered only once the client supplies and approves content */}
      {published.length > 0 && (
        <section aria-label="Company profile" className="bg-white py-24 lg:py-36">
          <div className="container-x space-y-24">
            {published.map((b) => (
              <article key={b.id} id={b.id} className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <SectionHeading eyebrow={b.eyebrow} title={[b.title]} />
                </div>
                <div className="space-y-5 text-[1.05rem] leading-relaxed text-steel-600 lg:col-span-7">
                  {b.image && <Photo src={b.image.src} alt={b.image.alt} reveal className="mb-8 aspect-[16/9]" />}
                  {b.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <FinalCta title={['Partner With', 'Simplex Metals.']} image="/assets/industries/power-plant.jpg" />
    </>
  )
}
