/**
 * Full-Stack illustration (orange card).
 * A loosely scattered set of panels — browser, code editor, database, toast —
 * that snap together into a small working interface on hover / tap.
 */

import { motion } from 'framer-motion'
import { useEffect, useId, useState, type ReactNode } from 'react'
import {
  C,
  CheckerPattern,
  SPRING_LOOSE,
  SPRING_SNAP,
  SW,
  cleanId,
  outline,
  type ArtProps,
} from './shared'

type PartProps = {
  children: ReactNode
  rest: { x?: number; y?: number; rotate?: number; scale?: number; opacity?: number }
  from: { x?: number; y?: number; rotate?: number; scale?: number }
  delay?: number
}

/** A panel that eases between scattered → assembled. */
const Part = ({ children, rest, from, delay = 0 }: PartProps) => (
  <motion.g
    variants={{
      hidden: { opacity: 0, x: 0, y: 0, rotate: 0, scale: 1, ...from },
      rest: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        ...rest,
        transition: { ...SPRING_LOOSE, delay },
      },
      assembled: {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { ...SPRING_SNAP, delay: delay * 0.6 },
      },
    }}
  >
    {children}
  </motion.g>
)

const CODE_LINES: { dx: number; w: number; c: string }[][] = [
  [
    { dx: 0, w: 26, c: C.pink },
    { dx: 32, w: 44, c: C.cream },
    { dx: 82, w: 30, c: C.yellow },
  ],
  [
    { dx: 14, w: 40, c: C.mint },
    { dx: 60, w: 70, c: C.cream },
  ],
  [
    { dx: 14, w: 24, c: C.pink },
    { dx: 44, w: 56, c: C.sky },
    { dx: 106, w: 26, c: C.cream },
  ],
  [{ dx: 28, w: 92, c: C.cream }],
  [
    { dx: 28, w: 52, c: C.yellowSoft },
    { dx: 86, w: 40, c: C.mint },
  ],
  [{ dx: 14, w: 30, c: C.cream }],
  [{ dx: 0, w: 16, c: C.pink }],
]

const CYL_W = 40
const CYL_RY = 11
const CYL_H = 22

const Disc = ({ cy, fill, led }: { cy: number; fill: string; led: string }) => (
  <g>
    <path
      d={`M${400 - CYL_W} ${cy} v${CYL_H} a${CYL_W} ${CYL_RY} 0 0 0 ${CYL_W * 2} 0 v${-CYL_H}`}
      fill={fill}
      {...outline()}
    />
    <ellipse cx={400} cy={cy} rx={CYL_W} ry={CYL_RY} fill={fill} {...outline()} />
    <circle cx={400 + 26} cy={cy + CYL_H - 1} r={2.4} fill={led} {...outline({ strokeWidth: 0.9 })} />
    <rect x={400 - 30} y={cy + CYL_H - 3} width={22} height={4} rx={2} fill={C.ink} opacity={0.22} />
  </g>
)

const PARTICLES = [
  { x: -34, y: -42, r: 30, c: C.yellow },
  { x: 8, y: -56, r: -20, c: C.pink },
  { x: 40, y: -36, r: 60, c: C.mint },
  { x: 58, y: -8, r: -40, c: C.cream },
  { x: -52, y: -14, r: 25, c: C.lilac },
  { x: 24, y: -70, r: 80, c: C.ink },
]

const FullStackArt = ({ ready, running, hovered, reduceMotion }: ArtProps) => {
  const uid = cleanId(useId())
  const checkerId = `fs-check-${uid}`
  const stickerId = `fs-sticker-${uid}`
  const [pinned, setPinned] = useState(false)
  const [peek, setPeek] = useState(false)
  const [burst, setBurst] = useState(0)

  const assembled = reduceMotion || hovered || pinned || peek

  // Ambient hint: briefly assemble the interface now and then.
  useEffect(() => {
    if (!ready || !running || reduceMotion) return
    let t2: number | undefined
    const play = () => {
      setPeek(true)
      t2 = window.setTimeout(() => setPeek(false), 1900)
    }
    const first = window.setTimeout(play, 1200)
    const loop = window.setInterval(play, 9000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(loop)
      if (t2) window.clearTimeout(t2)
      setPeek(false)
    }
  }, [ready, running, reduceMotion])

  const state = !ready ? 'hidden' : assembled ? 'assembled' : 'rest'

  const onClick = (e: React.MouseEvent) => {
    const touch = (e.nativeEvent as PointerEvent).pointerType !== 'mouse'
    if (touch) {
      const next = !pinned
      setPinned(next)
      if (next) setBurst((b) => b + 1)
    } else {
      setBurst((b) => b + 1)
    }
  }

  return (
    <svg
      viewBox="0 0 480 330"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Browser window, code editor and database snapping together into an app"
      onClick={onClick}
    >
      <defs>
        <CheckerPattern id={checkerId} s={5} a={C.pink} b="#FBC4E0" />
        <CheckerPattern id={stickerId} s={7} a={C.ink} b={C.cream} />
      </defs>

      <motion.g initial={reduceMotion ? 'assembled' : 'hidden'} animate={state}>
        {/* wiring between the panels */}
        <motion.g
          variants={{
            hidden: { opacity: 0 },
            rest: { opacity: 0.35, transition: { duration: 0.4 } },
            assembled: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } },
          }}
        >
          <path
            d="M286 100 C 322 100, 330 70, 360 70"
            fill="none"
            {...outline({ strokeDasharray: '3 5' })}
          />
          <path d="M400 112 V128" fill="none" {...outline({ strokeDasharray: '3 5' })} />
          {assembled && !reduceMotion && (
            <circle r={4.2} fill={C.orangeDeep} {...outline({ strokeWidth: 1.2 })}>
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path="M286 100 C 322 100, 330 70, 360 70 L 400 112 L 400 128"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          )}
        </motion.g>

        {/* DATABASE — three discs that stack */}
        <g>
          <motion.g
            variants={{
              hidden: { opacity: 0, y: -30 },
              rest: { opacity: 1, y: 14, transition: { ...SPRING_LOOSE, delay: 0.3 } },
              assembled: { opacity: 1, y: 0, transition: { ...SPRING_SNAP, delay: 0.05 } },
            }}
          >
            <Disc cy={80} fill={C.purple} led={C.mint} />
          </motion.g>
          <motion.g
            variants={{
              hidden: { opacity: 0, y: -30 },
              rest: { opacity: 1, y: 2, transition: { ...SPRING_LOOSE, delay: 0.24 } },
              assembled: { opacity: 1, y: 0, transition: { ...SPRING_SNAP, delay: 0.1 } },
            }}
          >
            <Disc cy={58} fill={C.lilac} led={C.yellow} />
          </motion.g>
          <motion.g
            variants={{
              hidden: { opacity: 0, y: -30 },
              rest: { opacity: 1, y: -12, transition: { ...SPRING_LOOSE, delay: 0.18 } },
              assembled: { opacity: 1, y: 0, transition: { ...SPRING_SNAP, delay: 0.15 } },
            }}
          >
            <Disc cy={36} fill={C.cream} led={C.pinkDeep} />
          </motion.g>
        </g>

        {/* BROWSER WINDOW */}
        <Part rest={{ x: -3, y: 12, rotate: -4 }} from={{ x: -30, y: 50, rotate: -10 }} delay={0}>
          <rect x={24} y={38} width={262} height={196} rx={12} fill={C.cream} {...outline()} />
          <path
            d="M24 64 V50 a12 12 0 0 1 12 -12 H274 a12 12 0 0 1 12 12 V64 Z"
            fill="#F3E3CC"
            {...outline()}
          />
          <circle cx={40} cy={51} r={3.6} fill={C.orangeDeep} {...outline({ strokeWidth: 1 })} />
          <circle cx={53} cy={51} r={3.6} fill={C.yellow} {...outline({ strokeWidth: 1 })} />
          <circle cx={66} cy={51} r={3.6} fill={C.mint} {...outline({ strokeWidth: 1 })} />
          <rect x={96} y={44} width={128} height={14} rx={7} fill={C.paper} {...outline({ strokeWidth: 1 })} />
          <rect x={104} y={49} width={44} height={4} rx={2} fill={C.ink} opacity={0.35} />

          {/* sidebar */}
          <rect x={36} y={76} width={54} height={146} rx={8} fill="#F6E8D4" {...outline({ strokeWidth: 1 })} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx={48} cy={92 + i * 22} r={4} fill={i === 0 ? C.orangeDeep : C.ink} opacity={i === 0 ? 1 : 0.3} />
              <rect x={57} y={90 + i * 22} width={22} height={4} rx={2} fill={C.ink} opacity={0.4} />
            </g>
          ))}

          {/* hero banner */}
          <rect x={102} y={76} width={172} height={72} rx={10} fill={`url(#${checkerId})`} {...outline()} />
          <rect x={114} y={90} width={80} height={10} rx={5} fill={C.ink} />
          <rect x={114} y={106} width={54} height={6} rx={3} fill={C.ink} opacity={0.5} />
          <circle cx={240} cy={112} r={21} fill={C.yellow} {...outline()} />
          <circle cx={240} cy={112} r={21} fill="none" stroke={C.ink} strokeWidth={0.8} strokeDasharray="1.5 3.5" transform="scale(1.0)" />

          {/* component cards */}
          <rect x={102} y={158} width={82} height={64} rx={8} fill={C.paper} {...outline()} />
          <rect x={112} y={168} width={40} height={6} rx={3} fill={C.ink} opacity={0.55} />
          <rect x={112} y={179} width={58} height={4} rx={2} fill={C.ink} opacity={0.25} />
          <motion.rect
            x={112}
            y={198}
            width={42}
            height={15}
            rx={7.5}
            {...outline({ strokeWidth: 1.2 })}
            variants={{
              hidden: { fill: C.ink },
              rest: { fill: C.ink },
              assembled: { fill: C.orangeDeep, transition: { delay: 0.5, duration: 0.3 } },
            }}
          />
          <rect x={192} y={158} width={82} height={64} rx={8} fill={C.paper} {...outline()} />
          <rect x={202} y={168} width={34} height={6} rx={3} fill={C.ink} opacity={0.55} />
          <motion.rect
            x={202}
            y={196}
            width={36}
            height={18}
            rx={9}
            {...outline({ strokeWidth: 1.2 })}
            variants={{
              hidden: { fill: '#E6D8C4' },
              rest: { fill: '#E6D8C4' },
              assembled: { fill: C.mint, transition: { delay: 0.45, duration: 0.3 } },
            }}
          />
          <motion.circle
            cx={211}
            cy={205}
            r={6}
            fill={C.paper}
            {...outline({ strokeWidth: 1.2 })}
            variants={{
              hidden: { x: 0 },
              rest: { x: 0 },
              assembled: { x: 18, transition: { ...SPRING_SNAP, delay: 0.45 } },
            }}
          />
        </Part>

        {/* CODE EDITOR */}
        <Part rest={{ x: 12, y: 14, rotate: 3 }} from={{ x: 40, y: 60, rotate: 8 }} delay={0.08}>
          <rect x={190} y={128} width={250} height={170} rx={12} fill={C.plum} {...outline()} />
          <circle cx={206} cy={142} r={3.2} fill={C.orangeDeep} />
          <circle cx={218} cy={142} r={3.2} fill={C.yellow} />
          <circle cx={230} cy={142} r={3.2} fill={C.mint} />
          <rect x={252} y={134} width={62} height={16} rx={5} fill="#403449" />
          <text
            x={283}
            y={145.4}
            textAnchor="middle"
            fontSize={9}
            fill={C.cream}
            style={{ fontFamily: "'PolySans', system-ui, sans-serif" }}
          >
            api.ts
          </text>
          <line x1={190} y1={158} x2={440} y2={158} stroke={C.ink} strokeWidth={SW} />
          {CODE_LINES.map((line, i) => (
            <g key={i}>
              <rect x={202} y={170 + i * 17} width={7} height={5} rx={2} fill="#6A5C78" />
              {line.map((tok, j) => (
                <motion.rect
                  key={j}
                  x={224 + tok.dx}
                  y={169 + i * 17}
                  width={tok.w}
                  height={7}
                  rx={3.5}
                  fill={tok.c}
                  style={{ originX: 0, originY: 0.5 }}
                  variants={{
                    hidden: { scaleX: 0, opacity: 1 },
                    rest: {
                      scaleX: 0.6,
                      opacity: 0.8,
                      transition: { duration: 0.5, delay: 0.3 + i * 0.04 },
                    },
                    assembled: {
                      scaleX: 1,
                      opacity: 1,
                      transition: { type: 'spring', stiffness: 200, damping: 22, delay: 0.2 + i * 0.07 + j * 0.04 },
                    },
                  }}
                />
              ))}
            </g>
          ))}
          <motion.rect
            x={242}
            y={286}
            width={5}
            height={8}
            rx={1}
            fill={C.cream}
            animate={running && !reduceMotion ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
          />
        </Part>

        {/* pixel sticker — fills the corner until the toast arrives */}
        <motion.g
          variants={{
            hidden: { opacity: 0, scale: 0.6 },
            rest: { opacity: 1, scale: 1, transition: { ...SPRING_LOOSE, delay: 0.5 } },
            assembled: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
          }}
        >
          <rect x={26} y={262} width={46} height={46} rx={9} fill={`url(#${stickerId})`} {...outline()} />
          <circle cx={92} cy={284} r={9} fill={C.yellow} {...outline()} />
          <path d="M120 270 v28 M106 284 h28" fill="none" {...outline({ strokeWidth: 2.4 })} />
        </motion.g>

        {/* TOAST */}
        <motion.g
          variants={{
            hidden: { opacity: 0, y: 30 },
            rest: { opacity: 0, y: 26, transition: { duration: 0.25 } },
            assembled: { opacity: 1, y: 0, transition: { ...SPRING_SNAP, delay: 0.55 } },
          }}
        >
          <rect x={16} y={252} width={172} height={50} rx={13} fill={C.paper} {...outline()} />
          <circle cx={42} cy={277} r={12} fill={C.mint} {...outline()} />
          <path d="M36 277 l4.4 4.6 L49 272" fill="none" {...outline({ strokeWidth: 2 })} />
          <rect x={62} y={267} width={84} height={7} rx={3.5} fill={C.ink} />
          <rect x={62} y={281} width={58} height={5} rx={2.5} fill={C.ink} opacity={0.35} />
        </motion.g>

        {/* DEPLOY BUTTON */}
        <Part rest={{ x: 14, y: 8, rotate: 5 }} from={{ x: 30, y: 40, rotate: 14 }} delay={0.18}>
          <g>
            <rect x={338} y={290} width={94} height={30} rx={15} fill={C.ink} />
            <rect x={338} y={290} width={94} height={30} rx={15} fill="none" {...outline()} />
            <text
              x={366}
              y={309.5}
              textAnchor="middle"
              fontSize={12}
              fill={C.cream}
              style={{ fontFamily: "'PolySans', system-ui, sans-serif", fontWeight: 500 }}
            >
              deploy
            </text>
            <path d="M400 311 l7 -7 m-5 0 h5 v5" fill="none" stroke={C.cream} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Part>

        {/* ILLUSTRATED CURSOR — glides to the button */}
        <motion.g
          variants={{
            hidden: { opacity: 0, x: 262, y: 214 },
            rest: { opacity: 1, x: 262, y: 214, transition: { ...SPRING_LOOSE, delay: 0.4 } },
            assembled: {
              opacity: 1,
              x: 396,
              y: 302,
              transition: { type: 'spring', stiffness: 70, damping: 14, delay: 0.5 },
            },
          }}
        >
          <path
            d="M0 0 L0 17 L4.6 13 L7.4 19.6 L10 18.4 L7.2 12 L13 12 Z"
            fill={C.cream}
            {...outline({ strokeWidth: 1.5 })}
          />
        </motion.g>
      </motion.g>

      {/* click feedback — little confetti from the button */}
      {burst > 0 && !reduceMotion && (
        <g key={burst} style={{ pointerEvents: 'none' }}>
          {PARTICLES.map((p, i) => (
            <motion.rect
              key={i}
              x={381}
              y={298}
              width={7}
              height={7}
              fill={p.c}
              {...outline({ strokeWidth: 1 })}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.4 }}
              animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.r, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </g>
      )}
    </svg>
  )
}

export default FullStackArt
