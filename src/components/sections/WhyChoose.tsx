import { motion } from 'motion/react'
import { Cog, Factory, Handshake, Microscope } from 'lucide-react'
import { fadeUp, stagger, viewport } from '../../animations/variants'
import { Photo } from '../common/Photo'
import { SectionHeading } from '../common/SectionHeading'
import { SteelBackdrop } from '../common/SteelBackdrop'

const reasons = [
  {
    icon: Factory,
    title: 'Industrial Experience',
    text: 'Understanding of the loads, shocks and duty cycles that core sector plants demand.',
    image: '/assets/industries/steel-rolling-mill.jpg',
  },
  {
    icon: Cog,
    title: 'Engineering Expertise',
    text: 'Manufacturing knowledge and technical capability in forging, machining and hardening of heavy components.',
    image: '/assets/site/lathe-chuck.jpg',
  },
  {
    icon: Microscope,
    title: 'Quality Commitment',
    text: 'Focus on dependable materials, with every order verified before dispatch.',
    image: '/assets/site/universal-testing-machine.jpg',
  },
  {
    icon: Handshake,
    title: 'Reliable Partnership',
    text: 'Commitment to timely and dependable service: quality spares on time, at a competitive price.',
    image: '/assets/site/wheelset-geared.jpg',
  },
]

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="overflow-clip isolate relative bg-white py-24 lg:py-36">
      <SteelBackdrop tone="light" />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="why-title" eyebrow="Why Simplex Metals" title={['Why Choose', 'Simplex Metals?']} accentLast />
          <p className="mt-6 max-w-md leading-relaxed text-steel-600">
            Plant maintenance teams need spares that fit, last and arrive when promised. That is the standard we work to.
          </p>
          <div className="relative isolate mt-10 hidden lg:block">
            <Photo
              src="/assets/site/forging-hot.jpg"
              alt="Glowing steel bar in a forging die"
              parallax={8}
              reveal
              className="aspect-square w-full"
            />
            <span aria-hidden className="absolute -right-3 -bottom-3 -z-10 h-2/5 w-2/5 bg-forge-500" />
          </div>
        </div>

        <motion.ul
          className="grid gap-4 self-end sm:grid-cols-2 lg:col-span-7"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {reasons.map(({ icon: Icon, title, text, image }, i) => (
            <motion.li
              key={title}
              variants={fadeUp}
              tabIndex={0}
              className="group relative isolate flex min-h-[320px] flex-col overflow-hidden border border-steel-200 bg-steel-50 p-8 outline-none lg:min-h-[380px]"
            >
              {/* photo fills the top of the card at rest and expands to the whole card on hover */}
              <img
                src={image}
                alt=""
                loading="lazy"
                className="photo-grade absolute inset-0 -z-20 h-full w-full scale-105 object-cover grayscale-[0.3] transition-[clip-path,transform,filter] duration-[900ms] ease-industrial [clip-path:inset(0_0_55%_0)] group-hover:scale-100 group-hover:grayscale-0 group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:scale-100 group-focus-visible:[clip-path:inset(0_0_0_0)]"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-t from-ink-900 via-ink-900/75 to-ink-900/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
              />

              <span className="flex items-center justify-between">
                <span className="grid size-14 place-items-center bg-white text-forge-500 shadow-sm transition-[background-color,color,transform] duration-500 group-hover:-rotate-6 group-hover:bg-forge-500 group-hover:text-white">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <span className="font-display text-4xl font-extrabold text-white/80 [font-stretch:115%] drop-shadow transition-colors duration-500 group-hover:text-white/30">
                  0{i + 1}
                </span>
              </span>
              <h3 className="mt-auto pt-12 font-display text-xl font-bold tracking-tight text-ink-800 [font-stretch:106%] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-600 transition-colors duration-500 group-hover:text-steel-200 group-focus-visible:text-steel-200">
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
