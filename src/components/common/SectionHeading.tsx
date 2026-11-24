import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, lineReveal, stagger, viewport } from '../../animations/variants'
import { cn } from '../../utils/cn'
import { Eyebrow } from './Eyebrow'

type Props = {
  eyebrow: string
  /** Each array entry is rendered as its own masked line. */
  title: string[]
  intro?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
  accentLast?: boolean
  as?: 'h1' | 'h2'
  id?: string
}

export function SectionHeading({ eyebrow, title, intro, tone = 'dark', align = 'left', className, accentLast, as = 'h2', id }: Props) {
  const H = motion[as]
  return (
    <motion.div
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <motion.div variants={fadeUp}>
        <Eyebrow tone={tone} className={cn(align === 'center' && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
      </motion.div>
      <H
        id={id}
        className={cn(
          'display-tight mt-5 text-[clamp(2.1rem,4.6vw,3.6rem)] font-extrabold text-balance',
          tone === 'dark' ? 'text-ink-800' : 'text-white',
        )}
        variants={stagger(0.08)}
      >
        {title.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className={cn('block', accentLast && i === title.length - 1 && (tone === 'dark' ? 'text-steel-400' : 'text-steel-500'))}
              variants={lineReveal}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </H>
      {intro && (
        <motion.div
          variants={fadeUp}
          className={cn(
            'mt-6 max-w-2xl text-[1.05rem] leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-steel-600' : 'text-steel-300',
          )}
        >
          {intro}
        </motion.div>
      )}
    </motion.div>
  )
}
