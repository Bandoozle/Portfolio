/**
 * "What I Do" — an illustrated, interactive bento.
 *
 * The composition lives in a fixed coordinate space (see layout.ts) and scales
 * with its container, so the white ribbon always threads through the same
 * spots in the cards. Two layouts: the asymmetric desktop/tablet bento and a
 * stacked mobile arrangement with its own ribbon route.
 */

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import { FONT_DISPLAY } from '../../theme/fonts'
import Reveal, { RevealWords } from '../Reveal'
import DesignArt from './DesignArt'
import EngineeringArt from './EngineeringArt'
import FullStackArt from './FullStackArt'
import ToolkitArt from './ToolkitArt'
import Ribbon from './Ribbon'
import { DESKTOP, MOBILE, type BentoLayout, type CardId } from './layout'
import { C, type ArtProps } from './shared'

type CardDef = {
  id: CardId
  title: string
  body: string
  bg: string
  Art: ComponentType<ArtProps>
  /** stagger order for the entrance */
  order: number
  /** title scale relative to the layout's title size */
  titleScale: number
}

const CARDS: CardDef[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    body: 'From polished interfaces to powerful backend systems.',
    bg: C.orange,
    Art: FullStackArt,
    order: 0,
    titleScale: 1,
  },
  {
    id: 'design',
    title: 'UI / UX Design',
    body: 'Thoughtful interfaces, built around real people.',
    bg: C.pink,
    Art: DesignArt,
    order: 1,
    titleScale: 0.8,
  },
  {
    id: 'engineering',
    title: 'Creative Engineering',
    body: 'Bringing ideas to life through motion and interaction.',
    bg: C.yellow,
    Art: EngineeringArt,
    order: 2,
    titleScale: 0.8,
  },
  {
    id: 'toolkit',
    title: 'My Toolkit',
    body: 'The technologies I use to turn ideas into working products.',
    bg: C.purple,
    Art: ToolkitArt,
    order: 3,
    titleScale: 1,
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

type CardProps = {
  def: CardDef
  layout: BentoLayout
  entered: boolean
  running: boolean
  reduceMotion: boolean
}

const BentoCard = ({ def, layout, entered, running, reduceMotion }: CardProps) => {
  const { W } = layout
  const L = layout.cards[def.id]
  const pct = (n: number, total: number) => `${((n / total) * 100).toFixed(4)}%`
  const u = (n: number) => `${((n * 100) / W).toFixed(4)}cqw`

  const [ready, setReady] = useState(reduceMotion)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!entered || reduceMotion) return
    const id = window.setTimeout(() => setReady(true), 450 + def.order * 130)
    return () => window.clearTimeout(id)
  }, [entered, reduceMotion, def.order])

  const variants = {
    hidden: { opacity: 0, y: 56, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        y: { duration: 0.9, ease: EASE, delay: def.order * 0.13 },
        scale: { duration: 0.9, ease: EASE, delay: def.order * 0.13 },
        opacity: { duration: 0.5, delay: def.order * 0.13 },
      },
    },
  }

  const box = {
    left: pct(L.rect.x, W),
    top: pct(L.rect.y, layout.H),
    width: pct(L.rect.w, W),
    height: pct(L.rect.h, layout.H),
    borderRadius: u(layout.radius),
  }

  const motionProps = {
    variants,
    initial: reduceMotion ? 'show' : 'hidden',
    animate: entered ? 'show' : 'hidden',
  } as const

  const Art = def.Art

  return (
    <>
      {/* card surface — sits under the ribbon's back layer */}
      <motion.div
        aria-hidden
        className="absolute"
        style={{ ...box, backgroundColor: def.bg, zIndex: 0 }}
        {...motionProps}
      />

      {/* card content — sits above the ribbon's back layer */}
      <motion.article
        className="absolute overflow-hidden"
        style={{ ...box, zIndex: 2, color: C.ink }}
        aria-label={def.title}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
        {...motionProps}
      >
        <div
          className="absolute"
          style={{
            left: pct(L.text.x, L.rect.w),
            top: pct(L.text.y, L.rect.h),
            width: pct(L.text.w, L.rect.w),
          }}
        >
          <h3
            className="font-normal"
            style={{
              ...FONT_DISPLAY,
              fontSize: u(layout.title * def.titleScale),
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              textWrap: 'balance',
            }}
          >
            {def.title}
          </h3>
          <p
            style={{
              ...FONT_DISPLAY,
              marginTop: u(layout.compact ? 10 : 12),
              fontSize: `max(12px, ${u(layout.body * (def.titleScale < 1 ? 0.92 : 1))})`,
              lineHeight: 1.35,
              letterSpacing: '-0.012em',
              opacity: 0.78,
              textWrap: 'pretty',
            }}
          >
            {def.body}
          </p>
        </div>

        <div
          className="absolute"
          style={{
            left: pct(L.art.x, L.rect.w),
            top: pct(L.art.y, L.rect.h),
            width: pct(L.art.w, L.rect.w),
            height: pct(L.art.h, L.rect.h),
          }}
        >
          <Art
            ready={ready}
            running={running && entered}
            hovered={hovered}
            compact={layout.compact}
            reduceMotion={reduceMotion}
          />
        </div>
      </motion.article>
    </>
  )
}

const WhatIDoSection = () => {
  const reduceMotion = !!useReducedMotion()
  const compact = useMediaQuery('(max-width: 719px)')
  const layout = compact ? MOBILE : DESKTOP

  const boxRef = useRef<HTMLDivElement>(null)
  const entered = useInView(boxRef, { once: true, amount: 0.18 })
  const inView = useInView(boxRef, { amount: 0 })

  return (
    <section
      id="what-i-do"
      className="relative flex min-h-0 flex-col justify-start pt-[clamp(3.5rem,9vw,9rem)] pb-[clamp(3rem,8vw,8rem)]"
      style={{ color: 'var(--site-ink)' }}
      aria-label="What I do"
    >
      <div className="mx-auto mb-8 w-full px-3 text-center sm:mb-12 sm:px-4 md:mb-14 md:px-5 lg:px-6">
        <RevealWords
          text="What I Do"
          className="w-full text-[clamp(3rem,14vw,min(11rem,20svh))] font-normal leading-[0.88] tracking-[-0.045em]"
          style={FONT_DISPLAY}
        />
        <Reveal delay={0.18}>
          <p
            className="mx-auto mt-6 max-w-[34ch] text-balance text-[clamp(1rem,3.6vw,1.55rem)] leading-[1.5] text-[var(--site-ink)]/70 sm:mt-10 sm:max-w-none md:mt-12"
            style={FONT_DISPLAY}
          >
            A few ways I like to build. Go on, poke around.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6" style={{ maxWidth: compact ? 540 : 1090 }}>
        <div
          ref={boxRef}
          className="relative mx-auto w-full"
          style={{
            aspectRatio: `${layout.W} / ${layout.H}`,
            containerType: 'inline-size',
            maxWidth: compact ? 520 : 1040,
          }}
        >
          {CARDS.map((def) => (
            <BentoCard
              key={def.id}
              def={def}
              layout={layout}
              entered={entered}
              running={inView}
              reduceMotion={reduceMotion}
            />
          ))}

          <Ribbon
            key={compact ? 'm' : 'd'}
            w={layout.W}
            h={layout.H}
            points={layout.ribbon.points}
            thickness={layout.ribbon.thickness}
            amp={layout.ribbon.amp}
            front={layout.front}
            play={entered}
            run={inView}
            reduceMotion={reduceMotion}
          />
        </div>
      </div>
    </section>
  )
}

export default WhatIDoSection
