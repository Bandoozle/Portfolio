import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import AboutMeSection from './AboutMeSection'
import HeroAboutDraw from './HeroAboutDraw'
import about1 from '../images/about1.jpeg'
import about2 from '../images/about2.jpeg'
import about3 from '../images/about3.jpeg'
import about4 from '../images/about4.jpeg'
import { preloadPortfolioAssets } from '../preloadPortfolioAssets'
import { FONT_DISPLAY } from '../theme/fonts'

const EASE = [0.22, 1, 0.36, 1] as const

/** Same set used by the cursor image spawn trail */
const ARC_IMAGES = [about1, about2, about3, about4] as const

/** Repeat so the denser ribbon still fills the wheel */
const ARC_ITEMS = [...ARC_IMAGES, ...ARC_IMAGES, ...ARC_IMAGES, ...ARC_IMAGES, ...ARC_IMAGES] as const

/** Slow continuous orbit (deg/sec) */
const ARC_SPEED_DEG = 2.5

/**
 * Landscape cards (~5:4). Radius + slot count keep neighbor gaps close to
 * the earlier ~4.4vw clear spacing while the crest stays dramatic.
 */
const CARD_W = '21vw'
const CARD_H = '16.5vw'

/**
 * Tighter radius → steeper crest. Fewer slots (20) preserve card gaps.
 */
const ARC_RADIUS = '82vw'

/** How far the apex card-center sits below the stage top — extra room so crest isn’t clipped */
const APEX_INSET = `calc(${CARD_H} / 2 + 2.25rem)`

/**
 * Crest band tall enough for the upper arc. Lower-half spokes are hidden in JS
 * so the bottom of the wheel never shows; overflow is a safety clip only.
 */
const STAGE_H = `calc(${CARD_H} + 28vw)`

/** Even black frame around the media */
const CARD_FRAME = '0.35em'

const MENU_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Questions', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const

/**
 * Per-tab landing offset (px). Change these, save, then click the tab again.
 * +N → section sits lower (more space above)
 * -N → section sits higher
 * Start with ±80 or ±120 if you want a very obvious move.
 */
const NAV_SCROLL_OFFSET: Record<string, number> = {
  hero: 0,
  about: 100,
  projects: -160,
  experience: -120,
  faq: -110,
  contact: -140,
}

/** Sticky nav clearance before per-tab offsets apply. */
const NAV_SCROLL_PAD_MOBILE = 96
const NAV_SCROLL_PAD_DESKTOP = 112

/** Ease-out cubic — snappy section swipes inside the portfolio scroller. */
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

let navScrollRaf = 0

const scrollMainToHash = (hash: string) => {
  const id = hash.replace(/^#/, '')
  if (!id) return

  const scroller = document.querySelector('[data-main] main')
  const target = document.getElementById(id)
  if (!(scroller instanceof HTMLElement) || !target) return

  const desktop = window.matchMedia('(min-width: 640px)').matches
  const pad = desktop ? NAV_SCROLL_PAD_DESKTOP : NAV_SCROLL_PAD_MOBILE
  const extra = NAV_SCROLL_OFFSET[id] ?? 0

  // Hero always pins to the top of the scroller (+ optional offset).
  const nextTop =
    id === 'hero'
      ? Math.max(0, -extra)
      : scroller.scrollTop +
        (target.getBoundingClientRect().top - scroller.getBoundingClientRect().top) -
        pad -
        extra

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scroller.scrollTo({ top: nextTop, behavior: 'auto' })
    return
  }

  const start = scroller.scrollTop
  const delta = nextTop - start
  if (Math.abs(delta) < 1) return

  // Fast swipe: short floor, hard cap so long jumps stay quick
  const duration = Math.min(520, Math.max(240, Math.abs(delta) * 0.28))
  const t0 = performance.now()

  cancelAnimationFrame(navScrollRaf)
  const tick = (now: number) => {
    const t = Math.min(1, (now - t0) / duration)
    scroller.scrollTo({ top: start + delta * easeOutCubic(t), behavior: 'auto' })
    if (t < 1) navScrollRaf = requestAnimationFrame(tick)
  }
  navScrollRaf = requestAnimationFrame(tick)
}

const onNavHashClick = (event: MouseEvent<HTMLAnchorElement>) => {
  const href = event.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return
  event.preventDefault()
  scrollMainToHash(href)
  history.pushState(null, '', href)
}

const StickyNav = () => {
  const [overExperience, setOverExperience] = useState(false)

  useEffect(() => {
    const scroller = document.querySelector('[data-main] main')
    if (!(scroller instanceof HTMLElement)) return

    const update = () => {
      const experience = document.getElementById('experience')
      if (!experience) {
        setOverExperience(false)
        return
      }
      const rect = experience.getBoundingClientRect()
      const mobile = window.matchMedia('(max-width: 639px)').matches
      if (mobile) {
        const navBand = window.innerHeight - 72
        setOverExperience(rect.top < window.innerHeight && rect.bottom > navBand)
      } else {
        const navBand = 96
        setOverExperience(rect.top < navBand && rect.bottom > navBand)
      }
    }

    scroller.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      scroller.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const barBg = overExperience ? '#2E2B2B' : '#201D1D'
  const barBorder = '2px solid rgba(244, 244, 244, 0.28)'

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:bottom-auto sm:top-0 sm:px-4 sm:pb-0 sm:pt-6 md:px-5 md:pt-7">
      <nav
        className="pointer-events-auto flex w-fit max-w-[calc(100vw-1.5rem)] items-center justify-center gap-2 text-[#F4F4F4] sm:gap-4"
        style={FONT_DISPLAY}
        aria-label="Primary"
      >
        <a
          href="#hero"
          onClick={onNavHashClick}
          className="flex h-11 shrink-0 items-center justify-center rounded-[10px] px-3 transition-[background-color,border-color,opacity] duration-300 ease-out hover:opacity-70 sm:h-[clamp(2.75rem,4.5vw,3.35rem)] sm:px-5"
          style={{ backgroundColor: barBg, border: barBorder }}
        >
          <span className="whitespace-nowrap text-[0.85rem] font-normal leading-none tracking-[-0.015em] sm:text-[clamp(0.95rem,1.7vw,1.15rem)]">
            Home
          </span>
        </a>

        <ul
          className="flex h-11 min-w-0 max-w-[min(100%,calc(100vw-5.25rem))] items-center gap-x-3 overflow-x-auto rounded-[10px] px-3 transition-[background-color,border-color] duration-300 ease-out sm:h-[clamp(2.75rem,4.5vw,3.35rem)] sm:max-w-none sm:gap-x-6 sm:px-6 md:gap-x-7 md:px-7"
          style={{ backgroundColor: barBg, border: barBorder }}
        >
          {MENU_LINKS.map((link) => (
            <li key={link.label} className="shrink-0">
              <a
                href={link.href}
                onClick={onNavHashClick}
                className="block whitespace-nowrap text-[0.85rem] font-normal leading-none tracking-[-0.015em] transition-opacity hover:opacity-70 sm:text-[clamp(0.95rem,1.7vw,1.15rem)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

type CaptionPart =
  | { type: 'text'; value: string }
  | { type: 'pill'; value: string; bg: string; border: string; ink: string }

const CAPTION_PARTS: CaptionPart[] = [
  { type: 'text', value: 'A portfolio of ' },
  {
    type: 'pill',
    value: 'full-stack',
    bg: '#FFE8DE',
    border: '#F5C4B0',
    ink: '#9A3D1C',
  },
  { type: 'text', value: ' products, ' },
  {
    type: 'pill',
    value: 'ML',
    bg: '#E8EEF8',
    border: '#B8C6E0',
    ink: '#2F4A7A',
  },
  { type: 'text', value: ', and ' },
  {
    type: 'pill',
    value: 'AI',
    bg: '#E7F3EA',
    border: '#B7D9C0',
    ink: '#2F6B3C',
  },
  { type: 'text', value: ' tools, shipped with ' },
  {
    type: 'pill',
    value: 'React',
    bg: '#EAF6FB',
    border: '#A9D2E4',
    ink: '#1F5F78',
  },
  { type: 'text', value: ', ' },
  {
    type: 'pill',
    value: 'Python',
    bg: '#FFF3D6',
    border: '#E6C98A',
    ink: '#8A5A12',
  },
  { type: 'text', value: ', and clean ' },
  {
    type: 'pill',
    value: 'product',
    bg: '#F5EAF2',
    border: '#D9B8CF',
    ink: '#7A3D66',
  },
  { type: 'text', value: ' thinking.' },
]

const HeroCaption = () => (
  <p
    className="mx-auto mt-[clamp(1.25rem,4vw,3.75rem)] mb-[clamp(1.25rem,3vw,2.75rem)] max-w-[52rem] px-3 text-center text-[clamp(1.15rem,3.6vw,2.25rem)] leading-[1.45] text-[var(--site-ink)] sm:leading-[1.55]"
    style={FONT_DISPLAY}
  >
    {CAPTION_PARTS.map((part, i) =>
      part.type === 'pill' ? (
        <span
          key={`${part.value}-${i}`}
          className="mx-[0.08em] inline-flex translate-y-[-0.05em] items-center rounded-full px-[0.5em] py-[0.08em] text-[0.92em] leading-none"
          style={{
            backgroundColor: part.bg,
            border: `1px solid ${part.border}`,
            color: part.ink,
          }}
        >
          {part.value}
        </span>
      ) : (
        <span key={`t-${i}`}>{part.value}</span>
      ),
    )}
  </p>
)

/**
 * OSMO-style image arc: cards are bolted to spokes on a spinning wheel.
 * Only the upper half is visible — lower-half spokes are hidden every frame
 * so the crest never needs aggressive clipping that would cut the top cards.
 */
const ImageArc = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const wheelRef = useRef<HTMLDivElement>(null)
  const spokeRefs = useRef<(HTMLDivElement | null)[]>([])
  const slot = 360 / ARC_ITEMS.length

  useEffect(() => {
    const wheel = wheelRef.current
    if (!wheel) return

    let rot = 0
    let raf = 0
    let last = performance.now()

    const syncUpperHalf = (rotDeg: number) => {
      spokeRefs.current.forEach((spoke, index) => {
        if (!spoke) return
        let angleDeg = (slot * index + rotDeg) % 360
        if (angleDeg < 0) angleDeg += 360
        // 0° = apex; cos > 0 ⇒ upper semicircle only
        const onUpper = Math.cos((angleDeg * Math.PI) / 180) > 0.02
        spoke.style.visibility = onUpper ? 'visible' : 'hidden'
        spoke.style.opacity = onUpper ? '1' : '0'
      })
    }

    syncUpperHalf(rot)
    if (reducedMotion) return

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      rot = (rot + dt * ARC_SPEED_DEG) % 360
      wheel.style.transform = `rotate(${rot}deg)`
      syncUpperHalf(rot)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [reducedMotion, slot])

  return (
    <div
      className="relative z-[2] w-screen max-w-none overflow-x-hidden overflow-y-hidden"
      style={{
        height: STAGE_H,
        marginLeft: 'calc(50% - 50vw)',
        ['--arc-radius' as string]: ARC_RADIUS,
      }}
      aria-hidden
    >
      {/* Crest band — wheel spokes only; no guide ring */}
      <div
        ref={wheelRef}
        className="absolute left-1/2 z-[2] will-change-transform"
        style={{
          top: `calc(${APEX_INSET} + ${ARC_RADIUS})`,
          width: 0,
          height: 0,
        }}
      >
        {ARC_ITEMS.map((src, index) => (
          <div
            key={`${src}-${index}`}
            ref={(el) => {
              spokeRefs.current[index] = el
            }}
            className="absolute left-0 top-0 will-change-[opacity,visibility]"
            style={{
              width: 0,
              height: 0,
              transform: `rotate(${slot * index}deg)`,
              visibility: 'hidden',
            }}
          >
            <div
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `calc(${CARD_W} / -2)`,
                top: `calc((var(--arc-radius) * -1) - (${CARD_H} / 2))`,
              }}
            >
              <div
                className="box-border h-full w-full overflow-hidden rounded-[8px] bg-[#201D1D]"
                style={{ padding: CARD_FRAME }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[5px] bg-[#2a2727]">
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 block h-full w-full object-cover"
                    draggable={false}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const IntroHero = () => {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = prefersReducedMotion === true

  useEffect(() => {
    preloadPortfolioAssets()
  }, [])

  return (
    <div id="hero" className="hero-section-scope relative overflow-visible" style={{ color: 'var(--site-ink)' }}>
      <section
        className="relative flex flex-col items-center pt-[clamp(3.5rem,10svh,12.5rem)] pb-[4.5rem] text-center sm:pb-0 sm:pt-[clamp(6.5rem,18svh,12.5rem)]"
        aria-label="Portfolio hero"
      >
        <StickyNav />

        <div className="relative z-20 w-full px-3 sm:px-4 md:px-5 lg:px-6">
          <motion.h1
            className="hero-mega-type mt-4 w-full font-normal text-[clamp(2.75rem,12vw,min(10rem,20svh))] leading-[0.82] tracking-[-0.05em] sm:mt-8"
            style={{ textTransform: 'none', fontWeight: 400 }}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Marco Areliano Suteja
          </motion.h1>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            <HeroCaption />
          </motion.div>
        </div>

        <div className="relative mt-2 w-full overflow-visible sm:mt-3">
          <motion.div
            className="relative z-[2] w-full"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
          >
            <ImageArc reducedMotion={reducedMotion} />
          </motion.div>

          {/* Draw starts at About — path origin sits with this block */}
          <div className="relative z-[1] mx-auto mt-8 w-full max-w-[min(64rem,96vw)] overflow-visible bg-transparent px-3 pb-[clamp(2rem,5vw,3.5rem)] sm:-mt-[clamp(5rem,12vw,11rem)] sm:mt-0 sm:px-6">
            <HeroAboutDraw />
            <div className="relative z-[1]">
              <AboutMeSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IntroHero
