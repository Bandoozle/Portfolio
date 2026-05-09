import { motion, type Transition } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type HeroScrollIntroProps = {
  scrollRef: React.RefObject<HTMLElement | null>
}

const DESIGN_WIDTH = 1536
const DESIGN_HEIGHT = 864
const GITHUB_USERNAME = 'Bandoozle'

const navItems = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
]

const contactLinks = [
  { label: 'github', href: 'https://github.com/Bandoozle' },
  { label: 'linkedin', href: 'https://linkedin.com/in/marcosuteja' },
  { label: 'instagram', href: 'https://instagram.com/marcostja' },
]

const resumeHref = '/resume.pdf'

const curiosityFragments = [
  { label: 'interfaces', x: 160, y: 30, bg: '#F7C8D8' },
  { label: 'logic', x: 30, y: 30, bg: '#C9D8FF' },
  { label: 'systems', x: 30, y: 100, bg: '#CDEED6' },
  { label: 'patterns', x: 210, y: 100, bg: '#FFE1A8' },
  { label: 'curiosity', x: 30, y: 170, bg: '#D8C7FF' },
]

const stateKey = (state: number) => `state${state}`

const HeroScrollIntro = ({ scrollRef }: HeroScrollIntroProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isWheelLockedRef = useRef(false)
  const currentStateRef = useRef(0)

  const [currentState, setCurrentState] = useState(0)
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === 'undefined' ? DESIGN_WIDTH : window.innerWidth,
    height: typeof window === 'undefined' ? DESIGN_HEIGHT : window.innerHeight,
  }))

  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Vancouver',
    }).format(new Date()),
  )

  useEffect(() => {
    currentStateRef.current = currentState
  }, [currentState])

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(
        new Intl.DateTimeFormat('en-CA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'America/Vancouver',
        }).format(new Date()),
      )
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const unlockWheel = () => {
      window.setTimeout(() => {
        isWheelLockedRef.current = false
      }, 720)
    }

    const handleWheel = (event: WheelEvent) => {
      const state = currentStateRef.current
      const isScrollingDown = event.deltaY > 0
      const isScrollingUp = event.deltaY < 0

      const shouldAdvanceState = isScrollingDown && state < 3
      const shouldReverseState = isScrollingUp && state > 0

      if (!shouldAdvanceState && !shouldReverseState) return

      event.preventDefault()

      if (isWheelLockedRef.current || Math.abs(event.deltaY) < 6) return

      isWheelLockedRef.current = true
      setCurrentState((previous) => previous + (isScrollingDown ? 1 : -1))
      unlockWheel()
    }

    section.addEventListener('wheel', handleWheel, { passive: false })
    return () => section.removeEventListener('wheel', handleWheel)
  }, [scrollRef])

  const activeState = stateKey(currentState)

  const scale = viewport.width / DESIGN_WIDTH
  const scaledHeight = DESIGN_HEIGHT * scale
  const offsetX = 0
  const offsetY = Math.max(0, (viewport.height - scaledHeight) / 2)

  const springTransition: Transition = {
    type: 'spring',
    stiffness: 120,
    damping: 24,
    mass: 0.85,
  }

  const titleVariants = {
    state0: { y: 0, opacity: 1, scale: 1 },
    state1: { y: -310, opacity: 0, scale: 1 },
    state2: { y: -310, opacity: 0, scale: 1 },
    state3: { y: -310, opacity: 0, scale: 1 },
  }

  const subtitleVariants = {
    state0: { top: '18rem', color: '#171818', opacity: 1, x: '-50%' },
    state1: { top: '18rem', color: '#818283', opacity: 1, x: '-50%' },
    state2: { top: '2rem', color: '#818283', opacity: 0, x: '-50%' },
    state3: { top: '2rem', color: '#818283', opacity: 0, x: '-50%' },
  }

  const imageVariants = {
    state0: {
      top: '50%',
      width: 230,
      height: 278,
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      backgroundColor: '#F8E8E2',
    },

    state1: {
      top: '43%',
      width: 584,
      height: 195,
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 18px 55px rgba(0,0,0,0.08)',
      backgroundColor: '#F3EAD8',
    },

    state2: {
      top: '22%',
      width: 1106,
      height: 403,
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 24px 70px rgba(0,0,0,0.1)',
      backgroundColor: '#E8EFE5',
    },

    state3: {
      top: '0%',
      width: DESIGN_WIDTH,
      height: 720,
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 28px 80px rgba(0,0,0,0.12)',
      backgroundColor: '#ece7dc',
    },
  }

  const imageContentVariants = {
    state0: {
      top: '80%',
      scale: 1,
      objectPosition: 'center center',
    },

    state1: {
      top: '105%',
      scale: 1,
      objectPosition: 'center center',
    },

    state2: {
      top: '60%',
      scale: 1,
      objectPosition: 'center center',
    },

    state3: {
      top: '78%',
      scale: 2,
      objectPosition: 'center center',
    },
  }

  const frameVariants = {
    state0: {
      borderWidth: 1,
      borderColor: '#a9a9a0',
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    },
    state1: {
      borderWidth: 1,
      borderColor: '#9f9f96',
      boxShadow: '0 18px 55px rgba(0,0,0,0.08)',
    },
    state2: {
      borderWidth: 1,
      borderColor: '#8f8f86',
      boxShadow: '0 24px 70px rgba(0,0,0,0.1)',
    },
    state3: {
      borderWidth: 0,
      borderColor: '#7f7f77',
      boxShadow: '0 28px 80px rgba(0,0,0,0.12)',
    },
  }

  const frameDotVariants = {
    state0: { opacity: 1 },
    state1: { opacity: 1 },
    state2: { opacity: 1 },
    state3: { opacity: 0 },
  }

  const navVariants = {
    state0: { opacity: 0, y: 18, pointerEvents: 'none' as const },
    state1: { opacity: 0, y: 18, pointerEvents: 'none' as const },
    state2: { opacity: 0, y: 18, pointerEvents: 'none' as const },
    state3: { opacity: 1, y: 0, pointerEvents: 'auto' as const },
  }

  const roleVariants = {
    state0: { opacity: 0, y: 18 },
    state1: { opacity: 0, y: 18 },
    state2: { opacity: 0, y: 18 },
    state3: { opacity: 1, y: 0 },
  }

  const scrollHintVariants = {
    state0: { opacity: 1, y: 0 },
    state1: { opacity: 0, y: -10 },
    state2: { opacity: 0, y: -10 },
    state3: { opacity: 0, y: -10 },
  }

  const cornerIntroVariants = {
    state0: { opacity: 1, y: 0 },
    state1: { opacity: 0, y: 10 },
    state2: { opacity: 0, y: 10 },
    state3: { opacity: 0, y: 10 },
  }

  const curiosityStoryVariants = {
    state0: { opacity: 0, y: 18 },
    state1: { opacity: 1, y: 0 },
    state2: { opacity: 0, y: -18 },
    state3: { opacity: 0, y: -18 },
  }

  const fragmentContainerVariants = {
    state0: { opacity: 0, y: 16, scale: 0.96 },
    state1: { opacity: 1, y: 0, scale: 1 },
    state2: { opacity: 0, y: -16, scale: 0.96 },
    state3: { opacity: 0, y: -16, scale: 0.96 },
  }

  const sfuStoryVariants = {
    state0: { opacity: 0, y: 18 },
    state1: { opacity: 0, y: 18 },
    state2: { opacity: 1, y: 0 },
    state3: { opacity: 0, y: -18 },
  }

  const githubContributionVariants = {
    state0: { opacity: 0, y: 18 },
    state1: { opacity: 0, y: 18 },
    state2: { opacity: 1, y: 0 },
    state3: { opacity: 0, y: -18 },
  }

  const finalMetaVariants = {
    state0: { opacity: 0, y: -12 },
    state1: { opacity: 0, y: -12 },
    state2: { opacity: 0, y: -12 },
    state3: { opacity: 1, y: 0 },
  }

  const finalContactVariants = {
    state0: { opacity: 0, y: 18, pointerEvents: 'none' as const },
    state1: { opacity: 0, y: 18, pointerEvents: 'none' as const },
    state2: { opacity: 0, y: 18, pointerEvents: 'none' as const },
    state3: { opacity: 1, y: 0, pointerEvents: 'auto' as const },
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100dvh] overflow-hidden bg-[#ece7dc] text-[#171818]"
      aria-label="Portfolio introduction"
    >
      <div
        className="absolute left-0 top-0 overflow-hidden bg-[#ece7dc]"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <motion.div
          className="absolute left-2 top-3 z-20 w-[1520px]"
          animate={activeState}
          variants={titleVariants}
          transition={springTransition}
        >
          <h1 className="px-6 text-[200px] font-bold leading-[1.05] tracking-[-0.04em]">
            MARCO SUTEJA
          </h1>
        </motion.div>

        <motion.p
          className="instrument-serif-italic absolute left-1/2 z-[4] whitespace-nowrap text-[65px] font-semibold leading-none tracking-[-0.02em]"
          animate={activeState}
          variants={subtitleVariants}
          transition={springTransition}
        >
          Personal Portfolio Website
        </motion.p>

        <motion.div
          className="pointer-events-none absolute bottom-20 left-10 z-[35] max-w-[25rem] text-[#171818]"
          animate={activeState}
          variants={cornerIntroVariants}
          transition={springTransition}
        >
          <p className="text-[34px] font-semibold leading-[0.95] tracking-[-0.05em]">
            i&apos;m a full-stack software developer and simon fraser university computer science
            graduate, based in burnaby, british columbia.
          </p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-20 right-10 z-[35] max-w-[27rem] text-right text-[#171818]"
          animate={activeState}
          variants={cornerIntroVariants}
          transition={springTransition}
        >
          <p className="text-[34px] font-semibold leading-[0.95] tracking-[-0.05em]">
            i help teams ship usable products by blending machine learning, modern web stacks, and
            interfaces that stay clear and human-centered.
          </p>
        </motion.div>

        <motion.div
          className="absolute left-1/2 z-10 -translate-x-1/2 overflow-hidden bg-[#ece7dc]"
          animate={activeState}
          variants={imageVariants}
          transition={springTransition}
        >
          <motion.img
            src="/hero_marco.png"
            alt="Marco Areliano S portrait"
            className="absolute left-1/2 top-1/2 h-[542px] w-[1536px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply"
            animate={activeState}
            variants={imageContentVariants}
            transition={springTransition}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 border-solid"
            animate={activeState}
            variants={frameVariants}
            transition={springTransition}
            aria-hidden
          />

          {[
            'left-0 top-0 -translate-x-1/2 -translate-y-1/2',
            'right-0 top-0 translate-x-1/2 -translate-y-1/2',
            'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
            'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
          ].map((cornerClass) => (
            <motion.span
              key={cornerClass}
              className={`pointer-events-none absolute bg-[#171818] ${cornerClass}`}
              animate={activeState}
              variants={frameDotVariants}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
          ))}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-14 top-[45%] z-30 max-w-[25rem] text-[#171818]"
          animate={activeState}
          variants={curiosityStoryVariants}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-3 text-[34px] font-semibold leading-[0.95] tracking-[-0.05em]">
            i started by taking things apart, asking how interfaces, systems, and intelligence
            actually work.
          </p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-[70%] top-[40%] z-30 h-[20rem] w-[26rem]"
          animate={activeState}
          variants={fragmentContainerVariants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          {curiosityFragments.map((fragment, index) => (
            <motion.span
              key={fragment.label}
              className="absolute transform-gpu rounded-full px-5 py-2 text-[34px] font-semibold lowercase leading-none tracking-[-0.05em] text-[#171818]"
              style={{
                left: fragment.x,
                top: fragment.y,
                backgroundColor: fragment.bg,
              }}
              animate={
                activeState === 'state1'
                  ? {
                      y: [0, -5, 0],
                    }
                  : {
                      y: 0,
                    }
              }
              transition={{
                duration: 4.5 + index * 0.25,
                repeat: activeState === 'state1' ? Infinity : 0,
                ease: 'easeInOut',
                delay: index * 0.18,
              }}
            >
              {fragment.label}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute right-[16rem] top-[35%] z-30 max-w-[27rem] text-right text-[#171818]"
          animate={activeState}
          variants={sfuStoryVariants}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-3 text-[34px] font-semibold leading-[0.95] tracking-[-0.05em]">
            that curiosity became a computer science degree from simon fraser university, shaped by
            ai, full-stack products, and usable systems.
          </p>
        </motion.div>

        <motion.p
          className="instrument-serif-italic absolute left-[250px] top-[25%] z-40 text-[65px] font-semibold leading-none tracking-[-0.02em] text-[#171818]"
          animate={activeState}
          variants={githubContributionVariants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Recent
          <br />
          Contributions
        </motion.p>

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[72%] z-40 flex -translate-x-1/2 flex-col items-center"
          animate={activeState}
          variants={githubContributionVariants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-[1100px] overflow-hidden bg-[#ece7dc] px-2 py-1">
            <img
              src={`https://ghchart.rshah.org/ec4002/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME} GitHub contribution chart`}
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute left-10 top-10 z-50 flex items-center gap-3"
          animate={activeState}
          variants={finalContactVariants}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-2 text-[28px] font-semibold lowercase leading-none tracking-[-0.05em] text-[#171818] transition-transform hover:-translate-y-1"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          className="absolute right-10 top-10 z-50"
          animate={activeState}
          variants={finalContactVariants}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            className="block rounded-full bg-[#F7C8D8] px-6 py-3 text-[28px] font-semibold lowercase leading-none tracking-[-0.05em] text-[#171818] transition-transform hover:-translate-y-1 hover:bg-[#ec4002] hover:text-white"
          >
            resume
          </a>
        </motion.div>

        <motion.div
          className="absolute right-[210px] top-[47px] z-50 flex items-center gap-3 text-[28px] font-black lowercase tracking-[-0.05em] text-[#171818]"
          animate={activeState}
          variants={finalContactVariants}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>◎ burnaby, bc</p>
          <span aria-hidden>·</span>
          <time dateTime={time}>{time} pt</time>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-[#171818]"
          animate={activeState}
          variants={scrollHintVariants}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.span
            className="block text-[42px] leading-none"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>

        <motion.p
          className="instrument-serif-italic absolute bottom-10 left-10 z-30 text-[65px] font-semibold leading-none tracking-[-0.03em] text-[#171818]"
          animate={activeState}
          variants={roleVariants}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          Full-Stack Software Developer
        </motion.p>

        <motion.nav
  className="absolute bottom-10 right-10 z-30"
  animate={activeState}
  variants={navVariants}
  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
  aria-label="Portfolio sections"
>
  <ul className="flex items-center gap-4">
    {navItems.map((item, index) => {
      const pillColors = [
        '#F7C8D8',
        '#C9D8FF',
        '#CDEED6',
      ]

      return (
        <li key={item.href}>
          <a
            href={item.href}
            className="block rounded-full px-6 py-3 text-[28px] font-semibold lowercase leading-none tracking-[-0.05em] text-[#171818] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ec4002] hover:text-white"
            style={{
              backgroundColor: pillColors[index % pillColors.length],
            }}
          >
            {item.label}
          </a>
        </li>
      )
    })}
  </ul>
</motion.nav>
      </div>
    </section>
  )
}

export default HeroScrollIntro