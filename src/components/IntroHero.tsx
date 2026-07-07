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

const FONT_PINK_AVERAGE = {
  fontFamily: "'Pink Average', 'Instrument Serif', Georgia, serif",
  fontStyle: 'normal' as const,
}

const HERO_NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Approach', href: '#process' },
  { label: 'FAQS', href: '#faq' },
] as const

const RESUME_HREF = '/resume.pdf'

const heroMetaTextClass =
  'text-[clamp(0.72rem,min(1.2vw,1.85svh),1.05rem)] font-semibold uppercase leading-none tracking-[0.1em] text-[#0B0B0A]'

const heroStaticMetaTextClass =
  'text-[clamp(0.72rem,min(1.2vw,1.85svh),1.05rem)] font-semibold uppercase leading-[1.15] tracking-[0.1em] text-[#0B0B0A]'

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

const HERO_NAME_LINES = ['Marco', 'Suteja'] as const

const buildNameChars = (text: string, loadOrderStart: number) =>
  text.split('').map((char, index) => ({
    char,
    key: `${loadOrderStart}-${index}-${char}`,
    loadOrder: loadOrderStart + index,
  }))

const HERO_NAME_LINE_CHARS = HERO_NAME_LINES.map((line, lineIndex) =>
  buildNameChars(
    line,
    HERO_NAME_LINES.slice(0, lineIndex).reduce((sum, entry) => sum + entry.length, 0),
  ),
)

const HERO_NAME_DESKTOP_CHARS = buildNameChars('Marco Suteja', 0)

const SUBTITLE_TEXT = 'Full-Stack Developer'

const SUBTITLE_GRADIENTS = [
  'linear-gradient(90deg, #ff004c, #ff7a00)',
  'linear-gradient(90deg, #ff7a00, #ffd400)',
  'linear-gradient(90deg, #ffd400, #7cff00)',
  'linear-gradient(90deg, #7cff00, #00ffd5)',
  'linear-gradient(90deg, #00ffd5, #008cff)',
  'linear-gradient(90deg, #008cff, #7a00ff)',
  'linear-gradient(90deg, #7a00ff, #ff00d4)',
] as const

const SUBTITLE_CHARS = SUBTITLE_TEXT.split('').map((char, index) => ({
  char,
  key: `${index}-${char}`,
  gradient: SUBTITLE_GRADIENTS[index % SUBTITLE_GRADIENTS.length],
}))

type IntroPhase = 'intro' | 'exit' | 'done'

const IntroPhoto = () => (
  <motion.div
    className="relative flex w-full items-end justify-center overflow-hidden"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: EASE }}
  >
    <div
      className="pointer-events-none absolute right-[calc(50%+clamp(8rem,13vw,16rem))] top-[44%] z-30 -translate-y-1/2 text-right"
      aria-hidden
    >
      <motion.p
        className="text-[clamp(3.5rem,10vw,12rem)] leading-none tracking-[-0.04em] text-[#E5E5E0]"
        style={FONT_PINK_AVERAGE}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
      >
        Hi!
      </motion.p>
    </div>

    <motion.img
      src={HERO_PORTRAIT}
      alt="Marco Suteja"
      className="h-[100dvh] w-auto max-w-[100vw] object-contain object-bottom grayscale"
      initial={{ y: '108%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.85, ease: EASE }}
    />

    <div
      className="pointer-events-none absolute left-[calc(50%+clamp(8rem,13vw,16rem))] top-[44%] z-30 -translate-y-1/2 text-left"
      aria-hidden
    >
      <motion.p
        className="text-[clamp(3.5rem,10vw,12rem)] leading-none tracking-[-0.04em] text-[#E5E5E0]"
        style={FONT_PINK_AVERAGE}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.7, ease: EASE }}
      >
        I&apos;m
      </motion.p>
    </div>
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

const HoverFillLink = ({
  href,
  children,
  className = '',
  target,
  rel,
  ariaLabel,
}: {
  href: string
  children: string
  className?: string
  target?: string
  rel?: string
  ariaLabel?: string
}) => (
  <a
    href={href}
    target={target}
    rel={rel}
    aria-label={ariaLabel}
    className={`group relative inline-flex items-center px-[0.7em] py-[0.45em] -mx-[0.7em] -my-[0.45em] outline outline-2 outline-dashed outline-transparent transition-[outline-color] duration-150 hover:outline-[#0B0B0A] ${className}`}
    style={FONT_DISPLAY}
  >
    <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-[#0B0B0A]/12 transition-transform duration-300 ease-out group-hover:scale-x-100" />
    <span className="relative z-10">{children}</span>
  </a>
)

const HeroNav = ({
  visible,
  skipMotion,
}: {
  visible: boolean
  skipMotion: boolean
}) => (
  <motion.nav
    className="absolute inset-x-0 top-0 z-30 px-3 pt-4 sm:px-4 md:px-5 md:pt-5 lg:px-6"
    initial={skipMotion ? false : { opacity: 0, y: -10 }}
    animate={visible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: skipMotion ? 0 : 0.04, ease: EASE }}
    aria-label="Primary"
  >
    <div className="flex items-center justify-between gap-4">
      <ul className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 md:gap-x-8">
        {HERO_NAV_LINKS.map((link) => (
          <li key={link.label}>
            <HoverFillLink href={link.href} className={heroMetaTextClass}>
              {link.label}
            </HoverFillLink>
          </li>
        ))}
      </ul>

      <HoverFillLink href="#contact" className={`${heroMetaTextClass} shrink-0`}>
        Contacts
      </HoverFillLink>
    </div>
  </motion.nav>
)

const HERO_CURSOR_LABEL_OFFSET = 18

const HeroCursorScrollLabel = ({
  cursor,
  visible,
}: {
  cursor: { x: number; y: number } | null
  visible: boolean
}) => {
  if (!visible || !cursor) return null

  return (
    <span
      className="pointer-events-none fixed z-40 hidden whitespace-nowrap text-[clamp(0.72rem,min(1.2vw,1.85svh),1.05rem)] font-medium uppercase leading-none tracking-[0.1em] text-[#0B0B0A] [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{
        left: cursor.x + HERO_CURSOR_LABEL_OFFSET,
        top: cursor.y,
        transform: 'translateY(-50%)',
        ...FONT_DISPLAY,
      }}
      aria-hidden
    >
      scroll down
    </span>
  )
}

const HeroBottomMeta = ({
  visible,
  skipMotion,
}: {
  visible: boolean
  skipMotion: boolean
}) => (
  <>
    <motion.div
      className={`pointer-events-none absolute bottom-4 left-3 z-30 max-w-[46%] text-left sm:bottom-5 sm:left-4 sm:max-w-none md:bottom-6 md:left-5 lg:left-6 ${heroStaticMetaTextClass}`}
      style={FONT_DISPLAY}
      initial={skipMotion ? false : { opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: skipMotion ? 0 : REEL_REVEAL_DELAY, ease: EASE }}
    >
      <span className="block">Available for full-time roles</span>
      <span className="mt-1 block">Vancouver / Remote</span>
    </motion.div>

    <motion.div
      className="absolute bottom-4 right-3 z-30 shrink-0 text-right sm:bottom-5 sm:right-4 md:bottom-6 md:right-5 lg:right-6"
      initial={skipMotion ? false : { opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: skipMotion ? 0 : REEL_REVEAL_DELAY, ease: EASE }}
    >
      <HoverFillLink
        href={RESUME_HREF}
        target="_blank"
        rel="noreferrer"
        ariaLabel="Preview my resume"
        className={heroStaticMetaTextClass}
      >
        My Resume
      </HoverFillLink>
    </motion.div>
  </>
)

const HeroLocationPlace = ({
  visible,
  skipMotion,
}: {
  visible: boolean
  skipMotion: boolean
}) => (
  <motion.span
    className="pointer-events-none block min-w-0 text-left text-[clamp(0.5rem,2.35vw,1.05rem)] font-semibold uppercase leading-[1.15] tracking-[0.05em] text-[#0B0B0A] sm:whitespace-nowrap sm:leading-none sm:tracking-[0.1em]"
    style={FONT_DISPLAY}
    initial={skipMotion ? false : { opacity: 0, y: 10 }}
    animate={visible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: skipMotion ? 0 : REEL_REVEAL_DELAY, ease: EASE }}
  >
    <span className="sm:hidden">
      <span className="block whitespace-nowrap">Burnaby, BC</span>
      <span className="block whitespace-nowrap">Canada</span>
    </span>
    <span className="hidden sm:inline">Burnaby, BC, Canada</span>
  </motion.span>
)

const HeroLocationLabel = ({
  visible,
  skipMotion,
  children,
  align,
}: {
  visible: boolean
  skipMotion: boolean
  children: string
  align: 'left' | 'right'
}) => (
  <motion.span
    className={`pointer-events-none block min-w-0 whitespace-nowrap text-[clamp(0.5rem,2.35vw,1.05rem)] font-semibold uppercase leading-none tracking-[0.05em] text-[#0B0B0A] sm:tracking-[0.1em] ${
      align === 'right' ? 'text-right' : 'text-left'
    }`}
    style={FONT_DISPLAY}
    initial={skipMotion ? false : { opacity: 0, y: 10 }}
    animate={visible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: skipMotion ? 0 : REEL_REVEAL_DELAY, ease: EASE }}
  >
    {children}
  </motion.span>
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
      className="relative inline-block cursor-default overflow-hidden align-top leading-none pb-[0.12em] -mb-[0.12em]"
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

const HoverGradientSubtitleLetter = ({
  char,
  gradient,
}: {
  char: string
  gradient: string
}) => {
  const [hovered, setHovered] = useState(false)

  if (char === ' ') {
    return <span className="inline-block w-[0.28em]" aria-hidden="true" />
  }

  return (
    <span
      className="inline-block cursor-default transition-transform duration-300 ease-out hover:-translate-y-[0.035em]"
      style={
        hovered
          ? {
              backgroundImage: gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }
          : undefined
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      {char}
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
      className="relative w-[clamp(8.5rem,22vw,min(14rem,22svh))] shrink-0 overflow-hidden sm:w-[clamp(10rem,25vw,min(17rem,26svh))]"
      initial={skipMotion ? false : { opacity: 0, y: 12 }}
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
}) => {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const [cursorInHero, setCursorInHero] = useState(false)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFinePointer(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
  <section
    id="hero"
    className="relative flex h-[100svh] min-h-[100svh] overflow-hidden px-3 text-center sm:px-4 md:px-5 lg:px-6"
    style={{ backgroundColor: HERO_BG, color: HERO_TEXT }}
    aria-label="Portfolio hero"
    onPointerMove={
      finePointer
        ? (event) => {
            setCursor({ x: event.clientX, y: event.clientY })
            setCursorInHero(true)
          }
        : undefined
    }
    onPointerLeave={
      finePointer
        ? () => {
            setCursorInHero(false)
            setCursor(null)
          }
        : undefined
    }
  >
    <HeroNav visible={visible} skipMotion={skipMotion} />
    <HeroBottomMeta visible={textVisible} skipMotion={skipMotion} />
    {finePointer ? (
      <HeroCursorScrollLabel cursor={cursorInHero ? cursor : null} visible={textVisible} />
    ) : null}

    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[clamp(0.2rem,1.1svh,0.85rem)] pb-[clamp(1.5rem,4svh,3rem)] pt-[clamp(3.5rem,8svh,5.25rem)]">
      <h1 className="hero-mega-type flex w-full flex-col items-center justify-center overflow-visible text-[clamp(6.4rem,33vw,min(24rem,54svh))] leading-[0.88] sm:text-[clamp(4rem,18.5vw,min(15rem,34svh))]">
        <span className="sr-only">Marco Suteja</span>

        <span className="flex flex-col items-center sm:hidden" aria-hidden>
          {HERO_NAME_LINE_CHARS.map((lineChars, lineIndex) => (
            <span key={HERO_NAME_LINES[lineIndex]} className="inline-flex items-center justify-center overflow-visible">
              {lineChars.map(({ char, key, loadOrder }) => (
                <HoverLetter
                  key={key}
                  char={char}
                  loadOrder={loadOrder}
                  textVisible={textVisible}
                  skipMotion={skipMotion}
                />
              ))}
            </span>
          ))}
        </span>

        <span className="hidden flex-wrap items-center justify-center overflow-visible sm:inline-flex" aria-hidden>
          {HERO_NAME_DESKTOP_CHARS.map(({ char, key, loadOrder }) => (
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

      <div className="overflow-hidden pt-[0.42em] pb-[0.24em] -mt-[0.42em] -mb-[0.24em]">
        <motion.p
          className="hero-subtitle-type flex flex-wrap items-center justify-center text-[clamp(2rem,8.5vw,min(6.5rem,15svh))] leading-[1.12] tracking-[0.02em]"
          initial={skipMotion ? false : { y: '120%' }}
          animate={textVisible ? { y: 0 } : { y: '120%' }}
          transition={{
            duration: 0.8,
            delay: skipMotion ? 0 : SUBTITLE_REVEAL_DELAY,
            ease: EASE,
          }}
          aria-label="Full-Stack Developer"
        >
          {SUBTITLE_CHARS.map(({ char, key, gradient }) => (
            <HoverGradientSubtitleLetter key={key} char={char} gradient={gradient} />
          ))}
        </motion.p>
      </div>

      <div className="grid w-full max-w-[min(92vw,64rem)] grid-cols-[1fr_auto_1fr] items-center gap-x-1 sm:gap-x-[clamp(0.75rem,2vw,2rem)]">
        <div className="flex justify-end">
          <HeroLocationLabel visible={textVisible} skipMotion={skipMotion} align="right">
            Based In
          </HeroLocationLabel>
        </div>

        <HeroReel visible={textVisible} skipMotion={skipMotion} />

        <div className="flex justify-start">
          <HeroLocationPlace visible={textVisible} skipMotion={skipMotion} />
        </div>
      </div>
    </div>
  </section>
  )
}

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