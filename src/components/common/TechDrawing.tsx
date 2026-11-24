import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../utils/cn'

type Variant = 'wheel' | 'gear' | 'shaft'

/**
 * Engineering-drawing line art of the components Simplex makes (wheel, gear, stepped shaft).
 * Strokes use currentColor – set a faint text colour on the wrapper. Lines draw in once.
 */
export function TechDrawing({ variant, className }: { variant: Variant; className?: string }) {
  const reduce = useReducedMotion()
  const draw = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] as const },
  }
  const thin = { fill: 'none', stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' as const }
  const centre = { ...thin, strokeDasharray: '14 4 2 4' }
  const label = { fill: 'currentColor', fillOpacity: 0.55, fontSize: 11, fontFamily: 'IBM Plex Sans, sans-serif', letterSpacing: 1.5 }

  return (
    <svg aria-hidden viewBox="0 0 600 600" className={cn('pointer-events-none select-none', className)}>
      {variant === 'wheel' && (
        <g>
          {[270, 248, 236, 150, 92, 46].map((r) => (
            <motion.circle key={r} cx={300} cy={300} r={r} {...thin} {...draw} />
          ))}
          {Array.from({ length: 6 }, (_, i) => {
            const a = (i / 6) * Math.PI * 2
            return <motion.circle key={i} cx={300 + Math.cos(a) * 120} cy={300 + Math.sin(a) * 120} r={14} {...thin} {...draw} />
          })}
          <circle cx={300} cy={300} r={120} {...centre} />
          <line x1={10} y1={300} x2={590} y2={300} {...centre} />
          <line x1={300} y1={10} x2={300} y2={590} {...centre} />
          {/* dimension */}
          <motion.path d="M30 560 H570 M30 550 V570 M570 550 V570 M30 560 l12 -5 v10 z M570 560 l-12 -5 v10 z" {...thin} {...draw} />
          <text x={300} y={550} textAnchor="middle" {...label}>
            Ø160 – Ø1000
          </text>
        </g>
      )}

      {variant === 'gear' && (
        <g>
          <motion.path d={gearPath(300, 300, 22, 250, 222)} {...thin} {...draw} />
          <circle cx={300} cy={300} r={236} {...centre} />
          <motion.circle cx={300} cy={300} r={150} {...thin} {...draw} />
          <motion.path d="M300 230 a70 70 0 1 0 0.01 0 M285 232 V214 H315 V232" {...thin} {...draw} />
          <line x1={20} y1={300} x2={580} y2={300} {...centre} />
          <line x1={300} y1={20} x2={300} y2={580} {...centre} />
          <text x={470} y={70} {...label}>
            Z = 22
          </text>
          <motion.path d="M440 76 L380 110" {...thin} {...draw} />
        </g>
      )}

      {variant === 'shaft' && (
        <g>
          <motion.path
            d="M20 270 H110 V245 H230 V225 H370 V245 H490 V270 H580 V330 H490 V355 H370 V375 H230 V355 H110 V330 H20 Z"
            {...thin}
            {...draw}
          />
          <motion.path d="M110 245 V355 M230 225 V375 M370 225 V375 M490 245 V355" {...thin} {...draw} />
          <motion.path d="M260 225 V375 M262 225 L268 219 M338 225 L332 219" {...thin} {...draw} />
          <line x1={0} y1={300} x2={600} y2={300} {...centre} />
          {/* dimensions */}
          <motion.path d="M230 180 H370 M230 172 V188 M370 172 V188 M20 430 H580 M20 422 V438 M580 422 V438" {...thin} {...draw} />
          <text x={300} y={170} textAnchor="middle" {...label}>
            ± 0.02
          </text>
          <text x={300} y={455} textAnchor="middle" {...label}>
            FINISH MACHINED
          </text>
        </g>
      )}
    </svg>
  )
}

/** Simple trapezoidal-tooth gear outline. */
function gearPath(cx: number, cy: number, teeth: number, outer: number, root: number) {
  const step = (Math.PI * 2) / teeth
  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const p = (r: number, t: number) => `${(cx + Math.cos(a + t * step) * r).toFixed(1)} ${(cy + Math.sin(a + t * step) * r).toFixed(1)}`
    pts.push(p(root, 0), p(root, 0.18), p(outer, 0.32), p(outer, 0.62), p(root, 0.76))
  }
  return `M${pts.join(' L')} Z`
}
