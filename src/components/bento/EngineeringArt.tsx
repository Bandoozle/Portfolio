/**
 * Creative Engineering illustration (yellow card).
 * Geometric bodies orbit a checkered core with light spring physics:
 * the cursor repels them, a bezier handle follows the pointer, and a
 * click sends a shockwave through the whole system.
 */

import { motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { C, CheckerPattern, SPRING_SOFT, SW, cleanId, outline, toSvgPoint, type ArtProps } from './shared'

const CENTER = { x: 150, y: 108 }

type Orbit = { rx: number; ry: number; tilt: number }
const ORBITS: Orbit[] = [
  { rx: 122, ry: 56, tilt: -16 },
  { rx: 70, ry: 94, tilt: 26 },
  { rx: 46, ry: 30, tilt: 0 },
]

type Body = {
  orbit: number
  angle: number
  speed: number
  kind: 'triangle' | 'square' | 'circle' | 'diamond' | 'plus'
  size: number
  fill: string
}

const BODIES: Body[] = [
  { orbit: 0, angle: 0.6, speed: 0.5, kind: 'triangle', size: 19, fill: C.pink },
  { orbit: 0, angle: 3.7, speed: 0.5, kind: 'square', size: 15, fill: C.cream },
  { orbit: 1, angle: 1.3, speed: -0.62, kind: 'circle', size: 15, fill: C.purple },
  { orbit: 1, angle: 4.5, speed: -0.62, kind: 'diamond', size: 17, fill: C.mint },
  { orbit: 2, angle: 2.2, speed: 1.05, kind: 'plus', size: 11, fill: C.orangeDeep },
]

const CURVE_A = { x: 16, y: 206 }
const CURVE_B = { x: 284, y: 206 }
const CTRL_HOME = { x: 150, y: 168 }

const BodyShape = ({ b }: { b: Body }) => {
  const s = b.size
  const o = outline()
  switch (b.kind) {
    case 'triangle':
      return <polygon points={`0,${-s} ${s * 0.95},${s * 0.62} ${-s * 0.95},${s * 0.62}`} fill={b.fill} {...o} />
    case 'square':
      return <rect x={-s} y={-s} width={s * 2} height={s * 2} rx={3} fill={b.fill} {...o} />
    case 'circle':
      return <circle r={s} fill={b.fill} {...o} />
    case 'diamond':
      return <polygon points={`0,${-s * 1.2} ${s * 1.1},0 0,${s * 1.2} ${-s * 1.1},0`} fill={b.fill} {...o} />
    case 'plus': {
      const t = s * 0.38
      return (
        <path
          d={`M${-t} ${-s} h${t * 2} v${s - t} h${s - t} v${t * 2} h${-(s - t)} v${s - t} h${-t * 2} v${-(s - t)} h${-(s - t)} v${-t * 2} h${s - t} Z`}
          fill={b.fill}
          {...o}
        />
      )
    }
  }
}

const EngineeringArt = ({ ready, running, reduceMotion }: ArtProps) => {
  const uid = cleanId(useId())
  const svgRef = useRef<SVGSVGElement>(null)
  const bodyRefs = useRef<(SVGGElement | null)[]>([])
  const spinRef = useRef<SVGGElement>(null)
  const ringRef = useRef<SVGGElement>(null)
  const curveRef = useRef<SVGPathElement>(null)
  const guideARef = useRef<SVGLineElement>(null)
  const guideBRef = useRef<SVGLineElement>(null)
  const ctrlRef = useRef<SVGGElement>(null)

  const mouse = useRef({ x: 0, y: 0, active: false })
  const impulse = useRef<{ x: number; y: number; t: number } | null>(null)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const rippleId = useRef(0)
  const checkId = `en-check-${uid}`

  useEffect(() => {
    const phys = BODIES.map(() => ({ ox: 0, oy: 0, vx: 0, vy: 0, spin: Math.random() * 360 }))
    const ctrl = { x: CTRL_HOME.x, y: CTRL_HOME.y, vx: 0, vy: 0 }
    let boost = 0
    let t = 0
    let raf = 0
    let last = 0

    const ellipse = (b: Body, time: number) => {
      const o = ORBITS[b.orbit]
      const th = b.angle + b.speed * time * (1 + boost)
      const ex = o.rx * Math.cos(th)
      const ey = o.ry * Math.sin(th)
      const a = (o.tilt * Math.PI) / 180
      return {
        x: CENTER.x + ex * Math.cos(a) - ey * Math.sin(a),
        y: CENTER.y + ex * Math.sin(a) + ey * Math.cos(a),
      }
    }

    const render = (dt: number) => {
      const m = mouse.current
      const imp = impulse.current
      impulse.current = null

      BODIES.forEach((b, i) => {
        const p = phys[i]
        const base = ellipse(b, t)
        let fx = -48 * p.ox - 5.5 * p.vx
        let fy = -48 * p.oy - 5.5 * p.vy

        if (m.active) {
          const dx = base.x + p.ox - m.x
          const dy = base.y + p.oy - m.y
          const d = Math.hypot(dx, dy) || 1
          const R = 64
          if (d < R) {
            const k = (1 - d / R) ** 2 * 1400
            fx += (dx / d) * k
            fy += (dy / d) * k
          }
        }
        if (imp) {
          const dx = base.x + p.ox - imp.x
          const dy = base.y + p.oy - imp.y
          const d = Math.hypot(dx, dy) || 1
          const kick = 210 / (1 + d / 70)
          p.vx += (dx / d) * kick
          p.vy += (dy / d) * kick
        }

        p.vx += fx * dt
        p.vy += fy * dt
        p.ox += p.vx * dt
        p.oy += p.vy * dt
        p.spin += (38 + Math.hypot(p.vx, p.vy) * 0.9) * dt * (b.speed < 0 ? -1 : 1)

        bodyRefs.current[i]?.setAttribute(
          'transform',
          `translate(${(base.x + p.ox).toFixed(2)} ${(base.y + p.oy).toFixed(2)}) rotate(${p.spin.toFixed(1)})`,
        )
      })

      spinRef.current?.setAttribute('transform', `rotate(${(t * 22).toFixed(1)} ${CENTER.x} ${CENTER.y})`)
      ringRef.current?.setAttribute('transform', `rotate(${(-t * 14).toFixed(1)} ${CENTER.x} ${CENTER.y})`)

      // bezier handle: spring towards pointer (or home)
      const tx = m.active ? Math.max(30, Math.min(270, m.x)) : CTRL_HOME.x
      const ty = m.active ? Math.max(118, Math.min(250, m.y + 40)) : CTRL_HOME.y
      ctrl.vx += ((tx - ctrl.x) * 70 - ctrl.vx * 9) * dt
      ctrl.vy += ((ty - ctrl.y) * 70 - ctrl.vy * 9) * dt
      ctrl.x += ctrl.vx * dt
      ctrl.y += ctrl.vy * dt
      curveRef.current?.setAttribute(
        'd',
        `M${CURVE_A.x} ${CURVE_A.y} Q${ctrl.x.toFixed(1)} ${ctrl.y.toFixed(1)} ${CURVE_B.x} ${CURVE_B.y}`,
      )
      ctrlRef.current?.setAttribute('transform', `translate(${ctrl.x.toFixed(1)} ${ctrl.y.toFixed(1)})`)
      for (const [el, p] of [
        [guideARef.current, CURVE_A],
        [guideBRef.current, CURVE_B],
      ] as const) {
        el?.setAttribute('x1', String(p.x))
        el?.setAttribute('y1', String(p.y))
        el?.setAttribute('x2', ctrl.x.toFixed(1))
        el?.setAttribute('y2', ctrl.y.toFixed(1))
      }
    }

    // Static pose for reduced motion / before the loop starts.
    render(0)
    if (reduceMotion || !running) return

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - (last || now)) / 1000)
      last = now
      t += dt
      boost *= Math.exp(-dt * 1.8)
      render(dt)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onKick = () => {
      boost = 1.8
    }
    svgRef.current?.addEventListener('bento-kick', onKick)
    const svg = svgRef.current
    return () => {
      cancelAnimationFrame(raf)
      last = 0
      svg?.removeEventListener('bento-kick', onKick)
    }
  }, [running, reduceMotion])

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current || e.pointerType !== 'mouse') return
    const p = toSvgPoint(svgRef.current, e)
    if (!p) return
    mouse.current = { x: p.x, y: p.y, active: true }
  }

  const onPointerLeave = () => {
    mouse.current.active = false
  }

  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const p = toSvgPoint(svgRef.current, e)
    if (!p) return
    impulse.current = { ...p, t: performance.now() }
    svgRef.current.dispatchEvent(new Event('bento-kick'))
    if (!reduceMotion) {
      const id = ++rippleId.current
      setRipples((r) => [...r.slice(-3), { id, x: p.x, y: p.y }])
    }
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 230"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Geometric shapes orbiting a core, reacting to the cursor"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <defs>
        <CheckerPattern id={checkId} s={6} a={C.ink} b={C.cream} />
      </defs>

      <motion.g
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* orbit rails */}
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx={CENTER.x}
            cy={CENTER.y}
            rx={o.rx}
            ry={o.ry}
            transform={`rotate(${o.tilt} ${CENTER.x} ${CENTER.y})`}
            fill="none"
            stroke={C.ink}
            strokeWidth={SW * 0.75}
            strokeDasharray={i === 1 ? '2 5' : i === 2 ? '1 4' : undefined}
            opacity={0.8}
          />
        ))}

        {/* bezier playground */}
        <path ref={curveRef} d={`M${CURVE_A.x} ${CURVE_A.y} Q${CTRL_HOME.x} ${CTRL_HOME.y} ${CURVE_B.x} ${CURVE_B.y}`} fill="none" {...outline({ strokeWidth: 2.2 })} />
        <line ref={guideARef} x1={CURVE_A.x} y1={CURVE_A.y} x2={CTRL_HOME.x} y2={CTRL_HOME.y} stroke={C.ink} strokeWidth={0.9} strokeDasharray="2 3" opacity={0.6} />
        <line ref={guideBRef} x1={CURVE_B.x} y1={CURVE_B.y} x2={CTRL_HOME.x} y2={CTRL_HOME.y} stroke={C.ink} strokeWidth={0.9} strokeDasharray="2 3" opacity={0.6} />
        {[CURVE_A, CURVE_B].map((p, i) => (
          <rect key={i} x={p.x - 4} y={p.y - 4} width={8} height={8} rx={1.5} fill={C.paper} {...outline({ strokeWidth: 1.3 })} />
        ))}
        <g ref={ctrlRef} transform={`translate(${CTRL_HOME.x} ${CTRL_HOME.y})`}>
          <circle r={6} fill={C.pinkDeep} {...outline({ strokeWidth: 1.4 })} />
          <circle r={1.8} fill={C.paper} />
        </g>

        {/* core */}
        <g ref={ringRef}>
          <circle cx={CENTER.x} cy={CENTER.y} r={31} fill="none" stroke={C.ink} strokeWidth={1.2} strokeDasharray="1 5.5" strokeLinecap="round" />
        </g>
        <g ref={spinRef}>
          <circle cx={CENTER.x} cy={CENTER.y} r={21} fill={`url(#${checkId})`} {...outline()} />
        </g>
        <circle cx={CENTER.x} cy={CENTER.y} r={7} fill={C.yellow} {...outline()} />

        {/* orbiting bodies */}
        {BODIES.map((b, i) => (
          <motion.g
            key={i}
            initial={reduceMotion ? false : { scale: 0 }}
            animate={ready ? { scale: 1 } : { scale: 0 }}
            transition={{ ...SPRING_SOFT, delay: 0.15 + i * 0.09 }}
          >
            <g
              ref={(el) => {
                bodyRefs.current[i] = el
              }}
            >
              <BodyShape b={b} />
            </g>
          </motion.g>
        ))}

        {/* click shockwaves */}
        {ripples.map((r) => (
          <motion.circle
            key={r.id}
            cx={r.x}
            cy={r.y}
            fill="none"
            stroke={C.ink}
            strokeWidth={1.6}
            initial={{ r: 4, opacity: 0.9 }}
            animate={{ r: 72, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setRipples((list) => list.filter((x) => x.id !== r.id))}
          />
        ))}
      </motion.g>
    </svg>
  )
}

export default EngineeringArt
