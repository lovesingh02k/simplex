import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Phone } from 'lucide-react'
import { useRef } from 'react'
import { company } from '../../data/company'
import { Button } from '../common/Button'
import { Eyebrow } from '../common/Eyebrow'
import { Reveal } from '../common/Reveal'

export function FinalCta({
  title = ['Let’s Build Something', 'Stronger Together.'],
  text = 'Looking for reliable industrial components or customised mechanical manufacturing solutions? Connect with our team to discuss your requirements.',
  image = '/assets/site/heavy-machine-shop.jpg',
}: {
  title?: string[]
  text?: string
  image?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])

  return (
    <section ref={ref} aria-labelledby="cta-title" className="grain relative isolate overflow-clip bg-ink-900 py-28 text-white lg:py-44">
      <motion.img
        src={image}
        alt=""
        loading="lazy"
        className="photo-grade absolute inset-x-0 -top-[15%] -z-20 h-[130%] w-full object-cover object-[65%_50%]"
        style={{ y }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-ink-900 via-ink-900/85 to-ink-900/40" />
      <div className="container-x">
        <Reveal>
          <Eyebrow tone="light">Start a Conversation</Eyebrow>
        </Reveal>
        <h2 id="cta-title" className="display-tight mt-6 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] font-extrabold">
          {title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={i === title.length - 1 ? 'block text-forge-500' : 'block'}
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <Reveal className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-steel-300">
          <p>{text}</p>
        </Reveal>
        <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to="/contact">Request a Quotation</Button>
          <Button href={company.contact.phoneHref} variant="outline-light" icon={<Phone className="size-4" />}>
            {company.contact.phone}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
