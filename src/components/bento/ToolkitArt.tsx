/**
 * Toolkit illustration (purple card).
 * Six hand-drawn technology tiles arranged in a zig-zag along a checkered rail.
 * Each tile reacts on its own: lift, tilt, a glyph-specific micro animation,
 * and a name sticker. Neighbours shift out of the way.
 */

import { motion } from 'framer-motion'
import { useEffect, useId, useState, type ReactNode } from 'react'
import { C, CheckerPattern, SPRING_LOOSE, SPRING_SNAP, SPRING_SOFT, SW, cleanId, outline, type ArtProps } from './shared'

type Variants = React.ComponentProps<typeof motion.g>['variants']

const FONT = { fontFamily: "'PolySans', system-ui, sans-serif" } as const

/* ── glyphs (drawn in a 100×100 tile) ─────────────────────────────────────── */

const TsGlyph = () => (
  <>
    <rect width={100} height={100} rx={22} fill="#3178C6" />
    <motion.text
      x={88}
      y={88}
      textAnchor="end"
      fontSize={46}
      fill="#fff"
      style={{ ...FONT, fontWeight: 800, originX: 0.8, originY: 0.8 }}
      variants={{ off: { rotate: 0, scale: 1 }, on: { rotate: -7, scale: 1.1, transition: SPRING_SNAP } }}
    >
      TS
    </motion.text>
    <motion.text
      x={16}
      y={34}
      fontSize={20}
      fill="#fff"
      style={{ ...FONT, fontWeight: 500 }}
      variants={{ off: { opacity: 0.35, x: -4 }, on: { opacity: 1, x: 0, transition: SPRING_SNAP } }}
    >
      {'<T>'}
    </motion.text>
  </>
)

const ReactGlyph = () => (
  <>
    <rect width={100} height={100} rx={22} fill="#20232A" />
    <g transform="translate(50 50)">
      <motion.g
        variants={{ off: { rotate: 0 }, on: { rotate: 120, transition: { type: 'spring', stiffness: 40, damping: 10 } } }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        {[0, 60, 120].map((r) => (
          <ellipse key={r} rx={36} ry={13.5} transform={`rotate(${r})`} fill="none" stroke="#61DAFB" strokeWidth={3.4} />
        ))}
      </motion.g>
    </g>
    <motion.circle
      cx={50}
      cy={50}
      r={6.4}
      fill="#61DAFB"
      variants={{ off: { scale: 1 }, on: { scale: 1.35, transition: SPRING_SNAP } }}
    />
  </>
)

const NextGlyph = () => (
  <>
    <rect width={100} height={100} rx={22} fill={C.cream} />
    <circle cx={50} cy={50} r={35} fill={C.ink} />
    <path d="M39 36 V64" fill="none" stroke="#fff" strokeWidth={4.6} strokeLinecap="round" />
    <motion.path
      d="M39 36 L63 65"
      fill="none"
      stroke="#fff"
      strokeWidth={4.6}
      strokeLinecap="round"
      variants={{ off: { pathLength: 1 }, on: { pathLength: [0, 1], transition: { duration: 0.55, ease: 'easeOut' } } }}
    />
    <motion.path
      d="M63 36 V52"
      fill="none"
      stroke="#fff"
      strokeWidth={4.6}
      strokeLinecap="round"
      variants={{ off: { pathLength: 1, opacity: 0.6 }, on: { pathLength: [0, 1], opacity: 1, transition: { duration: 0.4, delay: 0.25 } } }}
    />
  </>
)

const PythonGlyph = () => (
  <>
    <rect width={100} height={100} rx={22} fill={C.cream} />
    <motion.g variants={{ off: { x: 0, y: 0 }, on: { x: -4, y: -4, transition: SPRING_SNAP } }}>
      <rect x={18} y={16} width={50} height={44} rx={18} fill="#3776AB" {...outline({ strokeWidth: 1.2 })} />
      <motion.circle
        cx={34}
        cy={30}
        r={3.6}
        fill="#fff"
        style={{ originY: 0.5 }}
        variants={{ off: { scaleY: 1 }, on: { scaleY: [1, 0.1, 1], transition: { duration: 0.35, delay: 0.2 } } }}
      />
    </motion.g>
    <motion.g variants={{ off: { x: 0, y: 0 }, on: { x: 4, y: 4, transition: SPRING_SNAP } }}>
      <rect x={32} y={40} width={50} height={44} rx={18} fill={C.yellow} {...outline({ strokeWidth: 1.2 })} />
      <motion.circle
        cx={66}
        cy={70}
        r={3.6}
        fill={C.ink}
        style={{ originY: 0.5 }}
        variants={{ off: { scaleY: 1 }, on: { scaleY: [1, 0.1, 1], transition: { duration: 0.35, delay: 0.3 } } }}
      />
    </motion.g>
  </>
)

const PgGlyph = () => (
  <>
    <rect width={100} height={100} rx={22} fill={C.sky} />
    <motion.g variants={{ off: { y: 0 }, on: { y: [0, -3, 0], transition: { duration: 0.5, delay: 0.1 } } }}>
      <path d="M22 34 v32 a28 12 0 0 0 56 0 v-32" fill="#336791" {...outline({ strokeWidth: 1.3 })} />
      <path d="M22 50 a28 12 0 0 0 56 0" fill="none" stroke={C.cream} strokeWidth={1.4} opacity={0.7} />
      <path d="M22 62 a28 12 0 0 0 56 0" fill="none" stroke={C.cream} strokeWidth={1.4} opacity={0.7} />
    </motion.g>
    <motion.ellipse
      cx={50}
      cy={34}
      rx={28}
      ry={12}
      fill="#5B93C4"
      {...outline({ strokeWidth: 1.3 })}
      variants={{ off: { y: 0 }, on: { y: [0, -9, 0], transition: { duration: 0.55, ease: 'easeOut' } } }}
    />
    <motion.circle
      cx={66}
      cy={72}
      r={2.4}
      fill={C.yellow}
      variants={{ off: { opacity: 0.6 }, on: { opacity: [0.3, 1, 0.3, 1], transition: { duration: 0.6 } } }}
    />
  </>
)

const TailwindGlyph = () => (
  <>
    <rect width={100} height={100} rx={22} fill={C.ink} />
    <motion.g
      variants={{ off: { x: 0 }, on: { x: [0, 6, -3, 0], transition: { duration: 0.9, ease: 'easeInOut' } } }}
    >
      <path
        d="M16 40 C 26 22, 42 22, 50 36 S 72 50, 84 30"
        fill="none"
        stroke="#38BDF8"
        strokeWidth={8.5}
        strokeLinecap="round"
      />
    </motion.g>
    <motion.g
      variants={{ off: { x: 0 }, on: { x: [0, -6, 3, 0], transition: { duration: 0.9, ease: 'easeInOut' } } }}
    >
      <path
        d="M16 68 C 26 50, 42 50, 50 64 S 72 78, 84 58"
        fill="none"
        stroke="#7DD3FC"
        strokeWidth={8.5}
        strokeLinecap="round"
      />
    </motion.g>
  </>
)

type TileDef = { id: string; name: string; Glyph: () => ReactNode; tilt: number }

const TILES: TileDef[] = [
  { id: 'ts', name: 'TypeScript', Glyph: TsGlyph, tilt: -6 },
  { id: 'react', name: 'React', Glyph: ReactGlyph, tilt: 5 },
  { id: 'next', name: 'Next.js', Glyph: NextGlyph, tilt: -4 },
  { id: 'py', name: 'Python', Glyph: PythonGlyph, tilt: 6 },
  { id: 'pg', name: 'PostgreSQL', Glyph: PgGlyph, tilt: -5 },
  { id: 'tw', name: 'Tailwind CSS', Glyph: TailwindGlyph, tilt: 4 },
]

const layoutFor = (compact: boolean) =>
  compact
    ? {
        w: 360,
        h: 230,
        size: 92,
        pos: [
          [16, 14],
          [134, 24],
          [252, 12],
          [18, 124],
          [136, 112],
          [254, 126],
        ] as const,
        rail: { y: 104, h: 20 },
      }
    : {
        w: 640,
        h: 250,
        size: 98,
        pos: [
          [10, 106],
          [114, 22],
          [218, 120],
          [322, 18],
          [426, 112],
          [530, 24],
        ] as const,
        rail: { y: 112, h: 22 },
      }

const stickerVariants: Variants = {
  off: { opacity: 0, y: 9, scale: 0.85 },
  on: { opacity: 1, y: 0, scale: 1, transition: SPRING_SNAP },
}

const ToolkitArt = ({ ready, running, compact, reduceMotion }: ArtProps) => {
  const uid = cleanId(useId())
  const [hover, setHover] = useState<number | null>(null)
  const [tapped, setTapped] = useState<number | null>(null)
  const [nudge, setNudge] = useState<number | null>(null)
  const L = layoutFor(compact)
  const active = hover ?? tapped
  const railId = `tk-rail-${uid}`

  // Ambient: one tile wiggles every few seconds as a hint.
  useEffect(() => {
    if (!ready || !running || reduceMotion) return
    let t2: number | undefined
    let n = 0
    const id = window.setInterval(() => {
      setNudge((n++ * 2 + 1) % TILES.length)
      t2 = window.setTimeout(() => setNudge(null), 800)
    }, 3600)
    return () => {
      window.clearInterval(id)
      if (t2) window.clearTimeout(t2)
    }
  }, [ready, running, reduceMotion])

  const center = (i: number) => ({ x: L.pos[i][0] + L.size / 2, y: L.pos[i][1] + L.size / 2 })

  return (
    <svg
      viewBox={`0 0 ${L.w} ${L.h}`}
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Toolkit: TypeScript, React, Next.js, Python, PostgreSQL and Tailwind CSS"
    >
      <defs>
        <CheckerPattern id={railId} s={7} a={C.purpleDeep} b={C.lilac} />
      </defs>

      {/* checkered rail the tiles ride on */}
      <motion.g
        initial={reduceMotion ? false : { opacity: 0, scaleX: 0.6 }}
        animate={ready ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <rect x={-4} y={L.rail.y} width={L.w + 8} height={L.rail.h} fill={`url(#${railId})`} {...outline()} />
      </motion.g>

      {TILES.map((t, i) => {
        const [x, y] = L.pos[i]
        const on = active === i
        let sx = 0
        let sy = 0
        if (active !== null && active !== i) {
          const a = center(active)
          const c = center(i)
          const dx = c.x - a.x
          const dy = c.y - a.y
          const d = Math.hypot(dx, dy)
          if (d < 150) {
            sx = (dx / d) * 8
            sy = (dy / d) * 4
          }
        }
        const wiggle = nudge === i && active === null

        const target = !ready
          ? { opacity: 0, x, y: y + 60, rotate: t.tilt + 10, scale: 0.9 }
          : on
            ? { opacity: 1, x, y: y - 12, rotate: 0, scale: 1.07 }
            : wiggle
              ? { opacity: 1, x: x + sx, y: [y, y - 8, y], rotate: [t.tilt, t.tilt - 8, t.tilt + 5, t.tilt], scale: 1 }
              : { opacity: 1, x: x + sx, y: y + sy, rotate: t.tilt, scale: 1 }

        return (
          <motion.g
            key={t.id}
            initial={reduceMotion ? false : { opacity: 0, x, y: y + 60, rotate: t.tilt + 10, scale: 0.9 }}
            animate={target}
            transition={
              !ready
                ? { duration: 0 }
                : wiggle
                  ? { duration: 0.7, ease: 'easeInOut' }
                  : { ...(on ? SPRING_SNAP : SPRING_SOFT), delay: ready && !hover && !tapped ? i * 0.07 : 0 }
            }
            style={{ originX: 0.5, originY: 0.5, cursor: 'pointer' }}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setHover((h) => (h === i ? null : h))}
            onClick={() => setTapped((cur) => (cur === i ? null : i))}
          >
            <motion.g animate={on ? 'on' : 'off'} initial={false}>
              {/* hard offset shadow */}
              <motion.rect
                width={L.size}
                height={L.size}
                rx={22 * (L.size / 100)}
                fill={C.ink}
                variants={{ off: { x: 0, y: 0, opacity: 0 }, on: { x: 6, y: 6, opacity: 1, transition: SPRING_LOOSE } }}
              />
              <g transform={`scale(${L.size / 100})`}>
                <t.Glyph />
                <rect width={100} height={100} rx={22} fill="none" stroke={C.ink} strokeWidth={SW / (L.size / 100)} />
                {/* pixel accents */}
                <rect x={80} y={10} width={6} height={6} fill="#fff" opacity={0.55} />
                <rect x={88} y={18} width={6} height={6} fill="#fff" opacity={0.3} />
              </g>
              {/* name sticker */}
              <g transform={`translate(${L.size / 2} ${L.size - 12})`}>
                <motion.g variants={stickerVariants}>
                  <rect x={-(L.size * 0.43)} y={-9} width={L.size * 0.86} height={18} rx={9} fill={C.ink} />
                  <text
                    x={0}
                    y={3.4}
                    textAnchor="middle"
                    fontSize={t.name.length > 10 ? 8.4 : 9.4}
                    fill={C.cream}
                    style={{ ...FONT, fontWeight: 500 }}
                  >
                    {t.name}
                  </text>
                </motion.g>
              </g>
            </motion.g>
          </motion.g>
        )
      })}
    </svg>
  )
}

export default ToolkitArt
