/**
 * The white ribbon.
 *
 * One living Catmull-Rom path threaded through the whole bento. Its control
 * points drift on slow, out-of-phase sine waves (so it never resets and loops
 * seamlessly), it draws itself in on scroll, and it is rendered in two layers:
 *   • a back layer under every illustration, and
 *   • a front layer, masked to a few regions, that passes OVER selected art —
 *     together they weave the ribbon through the composition.
 */

import { motion } from 'framer-motion'
import { useEffect, useId, useRef } from 'react'
import { C, cleanId } from './shared'
import type { Pt, Rect } from './layout'

type RibbonProps = {
  w: number
  h: number
  points: Pt[]
  thickness: number
  amp: number
  front: Rect[]
  /** draw-in has been triggered */
  play: boolean
  /** ambient motion is allowed (in view, motion not reduced) */
  run: boolean
  reduceMotion: boolean
}

/** Catmull-Rom → cubic Bézier through every point. */
const toPath = (pts: Pt[]): string => {
  const n = pts.length
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(n - 1, i + 2)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

const Ribbon = ({ w, h, points, thickness, amp, front, play, run, reduceMotion }: RibbonProps) => {
  const uid = cleanId(useId())
  const shapeId = `rb-shape-${uid}`
  const revealId = `rb-reveal-${uid}`
  const frontId = `rb-front-${uid}`
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  const staticD = toPath(points)

  useEffect(() => {
    const apply = (d: string) => {
      for (const el of pathRefs.current) el?.setAttribute('d', d)
    }
    apply(staticD)
    if (!run || reduceMotion) return

    const n = points.length
    // fixed pseudo-random phases/frequencies keep the motion organic but deterministic
    const phase = points.map((_, i) => ({
      a: i * 1.37 + 0.6,
      b: i * 0.91 + 2.1,
      fa: 0.42 + ((i * 37) % 17) / 40,
      fb: 0.38 + ((i * 53) % 13) / 38,
    }))
    let raf = 0
    let start = 0
    let lastApply = 0

    const frame = (now: number) => {
      if (!start) start = now
      // ~45fps is plenty for slow drift and halves the paint cost
      if (now - lastApply > 22) {
        lastApply = now
        const t = (now - start) / 1000
        const moved: Pt[] = points.map((p, i) => {
          // end points sit behind illustrations — keep them calmer
          const k = i === 0 || i === n - 1 ? 0.35 : 1
          return [
            p[0] + Math.sin(t * phase[i].fa + phase[i].a) * amp * k,
            p[1] + Math.cos(t * phase[i].fb + phase[i].b) * amp * k,
          ]
        })
        apply(toPath(moved))
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [run, reduceMotion, points, amp, staticD])

  const reg = (i: number) => (el: SVGPathElement | null) => {
    pathRefs.current[i] = el
  }

  const svgProps = {
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: 'none' as const,
    className: 'pointer-events-none absolute inset-0 h-full w-full',
    'aria-hidden': true,
  }

  return (
    <>
      <svg {...svgProps} style={{ zIndex: 1 }}>
        <defs>
          <g id={shapeId}>
            {/* thin dark outline */}
            <path ref={reg(0)} d={staticD} fill="none" stroke={C.ink} strokeWidth={thickness + 3.4} strokeLinecap="round" strokeLinejoin="round" />
            {/* white body */}
            <path ref={reg(1)} d={staticD} fill="none" stroke="#fff" strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
            {/* stitched centre line that flows along the ribbon */}
            <path
              ref={reg(2)}
              d={staticD}
              fill="none"
              stroke={C.ink}
              strokeOpacity={0.22}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeDasharray="1 8"
            >
              {!reduceMotion && (
                <animate attributeName="stroke-dashoffset" from="0" to="-9" dur="1.1s" repeatCount="indefinite" />
              )}
            </path>
          </g>

          {/* draw-in reveal */}
          <mask id={revealId} maskUnits="userSpaceOnUse" x={-40} y={-40} width={w + 80} height={h + 80}>
            <motion.path
              ref={reg(3) as never}
              d={staticD}
              fill="none"
              stroke="#fff"
              strokeWidth={thickness + 30}
              pathLength={1}
              strokeDasharray="1 1"
              initial={{ strokeDashoffset: reduceMotion ? 0 : 1 }}
              animate={{ strokeDashoffset: play ? 0 : reduceMotion ? 0 : 1 }}
              transition={{ duration: 2.6, delay: 0.5, ease: [0.65, 0, 0.2, 1] }}
            />
          </mask>

          {/* regions where the ribbon crosses in front of the artwork */}
          <mask id={frontId} maskUnits="userSpaceOnUse" x={0} y={0} width={w} height={h}>
            {front.map((r, i) => (
              <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="#fff" />
            ))}
          </mask>
        </defs>

        <g mask={`url(#${revealId})`}>
          <use href={`#${shapeId}`} />
        </g>
      </svg>

      {front.length > 0 && (
        <svg {...svgProps} style={{ zIndex: 3 }}>
          <g mask={`url(#${revealId})`}>
            <g mask={`url(#${frontId})`}>
              <use href={`#${shapeId}`} />
            </g>
          </g>
        </svg>
      )}
    </>
  )
}

export default Ribbon
