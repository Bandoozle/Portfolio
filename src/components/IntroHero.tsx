import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import reel1 from '../images/reel1.jpeg'
import reel2 from '../images/reel2.jpeg'
import reel3 from '../images/reel3.jpeg'
import reel4 from '../images/reel4.jpeg'

const INTRO_BG = '#0B0B0A'
const HERO_BG = '#E5E5E0'
const HERO_TEXT = '#0B0B0A'
const EASE = [0.22, 1, 0.36, 1] as const

const FONT_DISPLAY = {
  fontFamily: "'Roboto Flex', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const HERO_NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Approach', href: '#process' },
  { label: 'FAQS', href: '#faq' },
] as const

const navLinkClass =
  'text-[0.8rem] font-semibold uppercase leading-none tracking-[0.08em] text-[#0B0B0A] transition-opacity duration-200 hover:opacity-55 sm:text-[0.85rem]'

const HERO_PORTRAIT = '/hero_marco.png'

const REEL_IMAGES = [
  { src: reel1, alt: 'Portfolio reel image 1' },
  { src: reel2, alt: 'Portfolio reel image 2' },
  { src: reel3, alt: 'Portfolio reel image 3' },
  { src: reel4, alt: 'Portfolio reel image 4' },
] as const

const TIMING = {
  holdEnd: 1400,
  exitMs: 900,
} as const

const REEL_INTERVAL_MS = 1600
const LETTER_HOVER_MS = 0.58

const NAME_LOAD_BASE_DELAY = 0.08
const NAME_LOAD_STAGGER = 0.045
const SUBTITLE_REVEAL_DELAY = 1.05
const REEL_REVEAL_DELAY = 1.9

const HERO_NAME_LETTERS = 'Marco Suteja'.split('')

const HERO_NAME_CHARS = HERO_NAME_LETTERS.map((char, index) => ({
  char,
  key: `${index}-${char}`,
  loadOrder: HERO_NAME_LETTERS.slice(0, index).filter((letter) => letter !== ' ').length,
}))

type IntroPhase = 'intro' | 'exit' | 'done'

const IntroPhoto = () => (
  <motion.div
    className="flex w-full items-end justify-center overflow-hidden"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: EASE }}
  >
    <motion.img
      src={HERO_PORTRAIT}
      alt="Marco Suteja"
      className="h-[100dvh] w-auto max-w-[100vw] object-contain object-bottom grayscale"
      initial={{ y: '108%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.85, ease: EASE }}
    />
  </motion.div>
)

const IntroOverlay = ({ phase, skipMotion }: { phase: IntroPhase; skipMotion: boolean }) => {
  if (phase === 'done') return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: INTRO_BG }}
      initial={false}
      animate={
        skipMotion || phase === 'exit'
          ? { clipPath: 'inset(0 0 100% 0)' }
          : { clipPath: 'inset(0 0 0 0)' }
      }
      transition={{ duration: TIMING.exitMs / 1000, ease: EASE }}
      aria-hidden={phase === 'exit'}
    >
      <IntroPhoto />
    </motion.div>
  )
}

const HeroNav = ({
  visible,
  skipMotion,
}: {
  visible: boolean
  skipMotion: boolean
}) => (
  <motion.nav
    className="absolute inset-x-0 top-0 z-20 px-3 pt-5 sm:px-4 md:px-5 md:pt-6 lg:px-6"
    initial={skipMotion ? false : { opacity: 0, y: -10 }}
    animate={visible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: skipMotion ? 0 : 0.04, ease: EASE }}
    aria-label="Primary"
  >
    <div className="flex items-center justify-between gap-4">
      <ul className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 md:gap-x-8">
        {HERO_NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={navLinkClass} style={FONT_DISPLAY}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className={`${navLinkClass} shrink-0`} style={FONT_DISPLAY}>
        Contacts
      </a>
    </div>
  </motion.nav>
)

const HeroLocation = ({
  visible,
  skipMotion,
}: {
  visible: boolean
  skipMotion: boolean
}) => (
  <motion.p
    className="absolute bottom-6 left-3 z-20 text-left text-[0.72rem] font-semibold uppercase leading-none tracking-[0.12em] text-[#0B0B0A] sm:bottom-7 sm:left-4 sm:text-[0.78rem] md:bottom-8 md:left-5 lg:left-6"
    style={FONT_DISPLAY}
    initial={skipMotion ? false : { opacity: 0, y: 10 }}
    animate={visible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: skipMotion ? 0 : REEL_REVEAL_DELAY, ease: EASE }}
  >
    Based in Burnaby, BC, Canada
  </motion.p>
)

const HoverLetter = ({
  char,
  loadOrder,
  textVisible,
  skipMotion,
}: {
  char: string
  loadOrder: number
  textVisible: boolean
  skipMotion: boolean
}) => {
  const [cycle, setCycle] = useState(0)
  const [introDone, setIntroDone] = useState(skipMotion)

  const isSpace = char === ' '
  const glyph = isSpace ? '\u00A0' : char

  useEffect(() => {
    if (skipMotion) {
      setIntroDone(true)
      return
    }

    if (!textVisible) {
      setIntroDone(false)
      return
    }

    const timer = window.setTimeout(() => {
      setIntroDone(true)
    }, (NAME_LOAD_BASE_DELAY + loadOrder * NAME_LOAD_STAGGER + LETTER_HOVER_MS) * 1000)

    return () => window.clearTimeout(timer)
  }, [textVisible, skipMotion, loadOrder])

  if (isSpace) {
    return <span className="inline-block w-[0.32em] align-top leading-none" aria-hidden="true" />
  }

  return (
    <span
      className="relative inline-block cursor-default overflow-hidden align-top leading-none pb-[0.14em] -mb-[0.14em]"
      onMouseEnter={() => {
        if (textVisible && introDone && !skipMotion) {
          setCycle((current) => current + 1)
        }
      }}
      aria-hidden="true"
    >
      <motion.span
        className="relative inline-block overflow-hidden leading-none"
        initial={skipMotion ? false : { x: '105%' }}
        animate={textVisible ? { x: 0 } : { x: '105%' }}
        transition={{
          duration: skipMotion ? 0 : LETTER_HOVER_MS,
          delay: skipMotion ? 0 : NAME_LOAD_BASE_DELAY + loadOrder * NAME_LOAD_STAGGER,
          ease: EASE,
        }}
      >
        <span className="invisible block select-none leading-none">{glyph}</span>

        <AnimatePresence initial={false}>
          <motion.span
            key={cycle}
            className="absolute inset-0 block leading-none will-change-transform"
            initial={cycle === 0 ? false : { x: '105%', y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: '-105%', y: 0 }}
            transition={{
              duration: LETTER_HOVER_MS,
              ease: EASE,
            }}
          >
            {glyph}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  )
}

const HeroReel = ({
  visible,
  skipMotion,
}: {
  visible: boolean
  skipMotion: boolean
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!visible || skipMotion) return

    let intervalTimer: number | undefined

    const revealTimer = window.setTimeout(() => {
      intervalTimer = window.setInterval(() => {
        setIndex((current) => (current + 1) % REEL_IMAGES.length)
      }, REEL_INTERVAL_MS)
    }, REEL_REVEAL_DELAY * 1000)

    return () => {
      window.clearTimeout(revealTimer)
      if (intervalTimer) window.clearInterval(intervalTimer)
    }
  }, [visible, skipMotion])

  return (
    <motion.div
      className="relative w-[clamp(8rem,21vw,13.5rem)] shrink-0 overflow-hidden"
      initial={skipMotion ? false : { opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: skipMotion ? 0 : REEL_REVEAL_DELAY, ease: EASE }}
      aria-live="polite"
      aria-label={`Portfolio preview ${index + 1} of ${REEL_IMAGES.length}`}
    >
      <img
        src={REEL_IMAGES[index].src}
        alt={REEL_IMAGES[index].alt}
        className="aspect-[4/5] w-full object-cover saturate-[1.12] contrast-[1.04]"
      />
    </motion.div>
  )
}

const HeroLanding = ({
  visible,
  textVisible,
  skipMotion,
}: {
  visible: boolean
  textVisible: boolean
  skipMotion: boolean
}) => (
  <section
    id="hero"
    className="relative flex h-[100dvh] min-h-[100dvh] overflow-hidden px-3 text-center sm:px-4 md:px-5 lg:px-6"
    style={{ backgroundColor: HERO_BG, color: HERO_TEXT }}
    aria-label="Portfolio hero"
  >
    <HeroNav visible={visible} skipMotion={skipMotion} />
    <HeroLocation visible={textVisible} skipMotion={skipMotion} />

    <div className="flex min-h-0 flex-1 flex-col items-center justify-center pb-[clamp(1.5rem,4vh,3rem)] pt-[clamp(4rem,8vh,5.5rem)]">
      <h1 className="hero-mega-type mb-[clamp(0.7rem,2.2vh,1.4rem)] flex w-full flex-wrap items-center justify-center overflow-visible text-[clamp(4rem,18.5vw,15rem)] leading-[0.88]">
        <span className="sr-only">Marco Suteja</span>

        <span className="inline-flex flex-wrap items-center justify-center overflow-visible" aria-hidden>
          {HERO_NAME_CHARS.map(({ char, key, loadOrder }) => (
            <HoverLetter
              key={key}
              char={char}
              loadOrder={loadOrder}
              textVisible={textVisible}
              skipMotion={skipMotion}
            />
          ))}
        </span>
      </h1>

      <div className="overflow-hidden pb-[0.16em] -mb-[0.16em]">
        <motion.p
          className="hero-subtitle-type text-[clamp(2rem,8.5vw,6.5rem)] leading-[0.95] tracking-[0.02em]"
          initial={skipMotion ? false : { y: '120%' }}
          animate={textVisible ? { y: 0 } : { y: '120%' }}
          transition={{
            duration: 0.8,
            delay: skipMotion ? 0 : SUBTITLE_REVEAL_DELAY,
            ease: EASE,
          }}
        >
          Full-Stack Developer
        </motion.p>
      </div>

      <div className="relative mt-[clamp(0.35rem,1.2vh,0.9rem)] flex w-full items-end justify-center">
        <HeroReel visible={textVisible} skipMotion={skipMotion} />
      </div>
    </div>
  </section>
)

const IntroHero = () => {
  const prefersReducedMotion = useReducedMotion()
  const skipMotion = prefersReducedMotion === true

  const [phase, setPhase] = useState<IntroPhase>(skipMotion ? 'done' : 'intro')
  const [heroVisible, setHeroVisible] = useState(skipMotion)
  const [heroTextVisible, setHeroTextVisible] = useState(skipMotion)

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    if (skipMotion) {
      setPhase('done')
      setHeroVisible(true)
      setHeroTextVisible(true)
      return
    }

    lockScroll()

    const exitTimer = window.setTimeout(() => {
      setPhase('exit')
      setHeroVisible(true)
    }, TIMING.holdEnd)

    const doneTimer = window.setTimeout(() => {
      setPhase('done')
      setHeroTextVisible(true)
      unlockScroll()
    }, TIMING.holdEnd + TIMING.exitMs)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      unlockScroll()
    }
  }, [skipMotion, lockScroll, unlockScroll])

  return (
    <div className="hero-section-scope overflow-hidden" style={{ backgroundColor: HERO_BG, color: HERO_TEXT }}>
      <IntroOverlay phase={phase} skipMotion={skipMotion} />
      <HeroLanding visible={heroVisible} textVisible={heroTextVisible} skipMotion={skipMotion} />
    </div>
  )
}

export default IntroHero