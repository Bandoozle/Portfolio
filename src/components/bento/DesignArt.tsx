/**
 * UI / UX illustration (pink card).
 * A design canvas where an illustrated cursor selects components, handles
 * follow, and shapes swap places and morph on click.
 */

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import {
  C,
  CheckerPattern,
  DotPattern,
  SPRING_SNAP,
  SPRING_SOFT,
  SW,
  cleanId,
  outline,
  toSvgPoint,
  type ArtProps,
} from './shared'

const SLOTS = [
  { x: 82, y: 80 },
  { x: 214, y: 76 },
  { x: 150, y: 168 },
] as const

type ShapeDef = { w: number; h: number; rx: [number, number]; rot: number }

/** Resting vs morphed corner radius for each shape. */
const SHAPES: ShapeDef[] = [
  { w: 100, h: 66, rx: [10, 33], rot: -3 },
  { w: 60, h: 60, rx: [30, 10], rot: 4 },
  { w: 112, h: 36, rx: [18, 6], rot: -2 },
]

const HANDLE = 8
const PAD = 6

const DesignArt = ({ ready, running, hovered, reduceMotion }: ArtProps) => {
  const uid = cleanId(useId())
  const svgRef = useRef<SVGSVGElement>(null)
  const [slotOf, setSlotOf] = useState<number[]>([0, 1, 2])
  const [morph, setMorph] = useState<boolean[]>([false, false, false])
  const [sel, setSel] = useState(0)
  const [pointerIn, setPointerIn] = useState(false)
  const [clickKey, setClickKey] = useState(0)

  const cx = useMotionValue(120)
  const cy = useMotionValue(110)
  const sx = useSpring(cx, { stiffness: 140, damping: 18, mass: 0.7 })
  const sy = useSpring(cy, { stiffness: 140, damping: 18, mass: 0.7 })

  const center = (i: number) => SLOTS[slotOf[i]]

  const selCenter = center(sel)
  const selShape = SHAPES[sel]

  /** Which shape (if any) is under the point. */
  const hit = (p: { x: number; y: number }) => {
    for (let i = 0; i < SHAPES.length; i++) {
      const c = center(i)
      const s = SHAPES[i]
      if (Math.abs(p.x - c.x) <= s.w / 2 + 6 && Math.abs(p.y - c.y) <= s.h / 2 + 6) return i
    }
    return -1
  }

  const aimAt = (i: number) => {
    const c = center(i)
    const s = SHAPES[i]
    cx.set(c.x + s.w * 0.18)
    cy.set(c.y + s.h * 0.2)
  }

  const swapNext = (i: number) => {
    setSlotOf((prev) => {
      const next = [...prev]
      const j = (i + 1) % next.length
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
    setMorph((prev) => prev.map((m, k) => (k === i ? !m : m)))
  }

  // Ambient: the cursor tours the canvas on its own until the pointer arrives.
  const tourStep = useRef(0)
  useEffect(() => {
    if (!ready || !running || reduceMotion || pointerIn || hovered) return
    const tick = () => {
      const step = tourStep.current++
      const target = step % 3
      setSel(target)
      aimAt(target)
      // every full lap, rearrange a pair so the canvas feels alive
      if (step % 3 === 2) {
        window.setTimeout(() => {
          setClickKey((k) => k + 1)
          swapNext(target)
        }, 650)
      }
    }
    const first = window.setTimeout(tick, 600)
    const id = window.setInterval(tick, 2300)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, running, reduceMotion, pointerIn, hovered, slotOf])

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current || e.pointerType !== 'mouse') return
    const p = toSvgPoint(svgRef.current, e)
    if (!p) return
    setPointerIn(true)
    cx.set(Math.max(8, Math.min(292, p.x)))
    cy.set(Math.max(8, Math.min(222, p.y)))
    const h = hit(p)
    if (h >= 0) setSel(h)
  }

  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    const p = toSvgPoint(svgRef.current, e)
    if (!p) return
    const h = hit(p)
    const target = h >= 0 ? h : sel
    setSel(target)
    cx.set(p.x)
    cy.set(p.y)
    setClickKey((k) => k + 1)
    swapNext(target)
  }

  const flat = reduceMotion
  const dropIn = (i: number) => ({
    initial: flat ? false : { opacity: 0, y: -26, scale: 0.9 },
    animate: ready
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: -26, scale: 0.9 },
    transition: { ...SPRING_SOFT, delay: 0.1 + i * 0.1 },
  })

  const rulerId = `ds-ruler-${uid}`
  const dotId = `ds-dots-${uid}`
  const checkId = `ds-check-${uid}`
  const checkSmId = `ds-check-sm-${uid}`

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 230"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Design canvas with a cursor selecting and rearranging components"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setPointerIn(false)}
      onClick={onClick}
    >
      <defs>
        <DotPattern id={dotId} gap={12} r={1} fill="rgba(32,29,29,0.28)" />
        <CheckerPattern id={checkId} s={7} a={C.yellow} b={C.yellowSoft} />
        <CheckerPattern id={checkSmId} s={4} a={C.ink} b={C.paper} />
        <pattern id={rulerId} width={12} height={10} patternUnits="userSpaceOnUse">
          <line x1={0.5} y1={10} x2={0.5} y2={4} stroke={C.ink} strokeWidth={0.8} />
          <line x1={6.5} y1={10} x2={6.5} y2={7} stroke={C.ink} strokeWidth={0.8} />
        </pattern>
      </defs>

      {/* canvas */}
      <motion.g
        initial={flat ? false : { opacity: 0, scale: 0.94 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        transition={{ ...SPRING_SOFT, delay: 0 }}
      >
        <rect x={6} y={8} width={288} height={214} rx={14} fill={C.paper} {...outline()} />
        <rect x={7} y={9} width={286} height={212} rx={13} fill={`url(#${dotId})`} />
        <rect x={20} y={10} width={260} height={10} fill={`url(#${rulerId})`} opacity={0.6} />
        {/* pixel checker sticker bottom-right */}
        <rect x={262} y={192} width={22} height={22} rx={5} fill={`url(#${checkSmId})`} {...outline()} />
      </motion.g>

      {/* shapes */}
      {SHAPES.map((s, i) => {
        const c = SLOTS[slotOf[i]]
        const drop = dropIn(i)
        return (
          <motion.g key={i} {...drop}>
            <motion.g
              animate={{ x: c.x, y: c.y, rotate: s.rot }}
              initial={false}
              transition={SPRING_SOFT}
            >
              {i === 0 && (
                <g>
                  <motion.rect
                    x={-s.w / 2}
                    y={-s.h / 2}
                    width={s.w}
                    height={s.h}
                    fill={C.blue}
                    {...outline()}
                    initial={{ rx: s.rx[0] }}
                    animate={{ rx: s.rx[morph[0] ? 1 : 0] }}
                    transition={SPRING_SNAP}
                  />
                  <circle cx={-28} cy={-10} r={9} fill={C.cream} {...outline({ strokeWidth: 1.2 })} />
                  <rect x={-12} y={-17} width={46} height={6} rx={3} fill={C.cream} />
                  <rect x={-12} y={-6} width={30} height={5} rx={2.5} fill={C.cream} opacity={0.6} />
                  <rect x={-34} y={11} width={68} height={8} rx={4} fill={C.cream} opacity={0.4} />
                </g>
              )}
              {i === 1 && (
                <motion.rect
                  x={-s.w / 2}
                  y={-s.h / 2}
                  width={s.w}
                  height={s.h}
                  fill={`url(#${checkId})`}
                  {...outline()}
                  initial={{ rx: s.rx[0] }}
                  animate={{ rx: s.rx[morph[1] ? 1 : 0] }}
                  transition={SPRING_SNAP}
                />
              )}
              {i === 2 && (
                <g>
                  <motion.rect
                    x={-s.w / 2}
                    y={-s.h / 2}
                    width={s.w}
                    height={s.h}
                    fill={C.mint}
                    {...outline()}
                    initial={{ rx: s.rx[0] }}
                    animate={{ rx: s.rx[morph[2] ? 1 : 0] }}
                    transition={SPRING_SNAP}
                  />
                  <rect x={-30} y={-3} width={60} height={6} rx={3} fill={C.ink} />
                </g>
              )}
            </motion.g>
          </motion.g>
        )
      })}

      {/* selection box + handles */}
      <motion.g
        initial={{ x: selCenter.x, y: selCenter.y, opacity: 0 }}
        animate={{ x: selCenter.x, y: selCenter.y, opacity: ready ? 1 : 0 }}
        transition={{ ...SPRING_SOFT, opacity: { duration: 0.4, delay: 0.6 } }}
      >
        <motion.rect
          initial={false}
          animate={{
            x: -selShape.w / 2 - PAD,
            y: -selShape.h / 2 - PAD,
            width: selShape.w + PAD * 2,
            height: selShape.h + PAD * 2,
          }}
          transition={SPRING_SOFT}
          fill="none"
          stroke={C.purpleDeep}
          strokeWidth={1.4}
          strokeDasharray="4 3"
        />
        {[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([dx, dy], k) => (
          <motion.rect
            key={k}
            initial={false}
            animate={{
              x: dx * (selShape.w / 2 + PAD) - HANDLE / 2,
              y: dy * (selShape.h / 2 + PAD) - HANDLE / 2,
            }}
            transition={{ ...SPRING_SOFT, delay: k * 0.025 }}
            width={HANDLE}
            height={HANDLE}
            rx={2}
            fill={C.paper}
            stroke={C.purpleDeep}
            strokeWidth={1.4}
          />
        ))}
        <motion.g
          initial={false}
          animate={{ y: selShape.h / 2 + PAD + 14 }}
          transition={SPRING_SOFT}
        >
          <rect x={-27} y={-8} width={54} height={16} rx={8} fill={C.purpleDeep} />
          <text
            x={0}
            y={3.3}
            textAnchor="middle"
            fontSize={8.6}
            fill="#fff"
            style={{ fontFamily: "'PolySans', system-ui, sans-serif" }}
          >
            {selShape.w} × {selShape.h}
          </text>
        </motion.g>
      </motion.g>

      {/* cursor */}
      <motion.g style={{ x: sx, y: sy }} initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}>
        <motion.g
          key={clickKey}
          animate={{ scale: [1, 0.78, 1] }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          <path
            d="M0 0 L0 17 L4.6 13 L7.4 19.6 L10 18.4 L7.2 12 L13 12 Z"
            fill={C.ink}
            stroke={C.paper}
            strokeWidth={1.3}
            strokeLinejoin="round"
          />
        </motion.g>
        <g transform="translate(11 17)">
          <rect x={0} y={0} width={38} height={15} rx={7.5} fill={C.pinkDeep} {...outline({ strokeWidth: SW * 0.75 })} />
          <text
            x={19}
            y={10.6}
            textAnchor="middle"
            fontSize={8.6}
            fill="#fff"
            style={{ fontFamily: "'PolySans', system-ui, sans-serif", fontWeight: 500 }}
          >
            marco
          </text>
        </g>
      </motion.g>
    </svg>
  )
}

export default DesignArt
