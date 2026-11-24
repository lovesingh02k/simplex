import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { imageReveal, viewport } from '../../animations/variants'
import { cn } from '../../utils/cn'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  position?: string
  /** Vertical parallax travel in % of the frame (0 = none). */
  parallax?: number
  reveal?: boolean
  /** Zoom when an ancestor `.group` is hovered (e.g. a whole card), instead of the photo itself. */
  zoomOnHover?: boolean
  /** Disable the default hover zoom (for photos inside elements that handle hover themselves). */
  still?: boolean
  eager?: boolean
}

/**
 * Framed, graded photograph. With parallax the image is oversized inside its frame so the
 * movement never exposes an edge; object-fit keeps industrial subjects undistorted.
 * Hover: slow zoom, a touch brighter, and a soft light sweep across the frame.
 */
export function Photo({ src, alt, className, imgClassName, position, parallax = 0, reveal, zoomOnHover, still, eager }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`])
  const active = parallax > 0 && !reduce
  // zoom is driven either by this frame (`group/photo`) or by a parent card (`group`)
  const zoom = still
    ? ''
    : zoomOnHover
      ? 'group-hover:scale-[1.07] group-hover:brightness-110'
      : 'group-hover/photo:scale-[1.06] group-hover/photo:brightness-110'

  return (
    <div ref={ref} className={cn('grain group/photo relative overflow-hidden bg-ink-800', className)}>
      {/* outer layer: scroll parallax · inner layer: reveal (kept separate so the two `y` values don't fight) */}
      <motion.div
        className="absolute inset-x-0"
        style={active ? { y, top: `-${parallax}%`, bottom: `-${parallax}%` } : { top: 0, bottom: 0 }}
      >
        <motion.div
          className="h-full w-full"
          {...(reveal ? { variants: imageReveal, initial: 'hidden', whileInView: 'show', viewport } : {})}
        >
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            {...(eager ? { fetchPriority: 'high' as const } : {})}
            className={cn(
              'photo-grade h-full w-full object-cover transition-[transform,filter] duration-[1.2s] ease-industrial',
              zoom,
              imgClassName,
            )}
            style={{ objectPosition: position ?? '50% 50%' }}
          />
        </motion.div>
      </motion.div>
      {!still && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 z-[1] w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent opacity-0 transition-[transform,opacity] duration-[1.1s] ease-industrial group-hover/photo:translate-x-[300%] group-hover/photo:opacity-100"
        />
      )}
    </div>
  )
}
