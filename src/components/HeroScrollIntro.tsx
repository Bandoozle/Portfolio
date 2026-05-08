import { motion, type Transition } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type HeroScrollIntroProps = {
  scrollRef: React.RefObject<HTMLElement | null>
}

const navItems = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
]

const heroSkillPills = [
  { label: 'Full-Stack Apps', className: 'left-[5%] bottom-[8%]', hoverClass: 'hover:bg-[#576A8F]' },
  { label: 'AI Products', className: 'left-[17%] bottom-[17.9%] rotate-[15deg]', hoverClass: 'hover:bg-[#46b683]' },
  { label: 'React Interfaces', className: 'left-[5%] bottom-[30.2%] rotate-[-5deg]', hoverClass: 'hover:bg-[#eba12e]' },
  { label: 'Machine Learning', className: 'right-[3%] bottom-[8%] ', hoverClass: 'hover:bg-[#f06b45]' },
  { label: 'Product Systems', className: 'right-[15%] bottom-[17.5%] -rotate-[6deg]', hoverClass: 'hover:bg-[#8bb7ff]' },
  { label: 'Clean UX', className: 'right-[5%] bottom-[26.3%] -rotate-[-25deg]', hoverClass: 'hover:bg-[#f3a6c8]' },
  { label: 'Intelligent Systems', className: 'right-[4%] bottom-[40.3%] -rotate-[10deg]', hoverClass: 'hover:bg-[#d8c7ff]' },
]

const stateKey = (state: number) => `state${state}`

const HeroScrollIntro = ({ scrollRef }: HeroScrollIntroProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isWheelLockedRef = useRef(false)
  const currentStateRef = useRef(0)
  const [currentState, setCurrentState] = useState(0)
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

      if (!shouldAdvanceState && !shouldReverseState) {
        return
      }

      event.preventDefault()

      if (isWheelLockedRef.current || Math.abs(event.deltaY) < 6) {
        return
      }

      isWheelLockedRef.current = true
      setCurrentState((previous) => previous + (isScrollingDown ? 1 : -1))
      unlockWheel()
    }

    section.addEventListener('wheel', handleWheel, { passive: false })
    return () => section.removeEventListener('wheel', handleWheel)
  }, [scrollRef])

  const activeState = stateKey(currentState)

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
      width: '15vw',
      height: '40vh',
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    },
    state1: {
      top: '43%',
      width: '38vw',
      height: '28vh',
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 18px 55px rgba(0,0,0,0.08)',
    },
    state2: {
      top: '22%',
      width: '72vw',
      height: '58vh',
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 24px 70px rgba(0,0,0,0.1)',
    },
    state3: {
      top: '0%',
      width: '100vw',
      height: '85vh',
      borderRadius: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      boxShadow: '0 28px 80px rgba(0,0,0,0.12)',
    },
  }

  const imageContentVariants = {
    state0: { top: '80%', scale: 1, objectPosition: 'center center' },
    state1: { top: '105%', scale: 1, objectPosition: 'center center' },
    state2: { top: '60%', scale: 1, objectPosition: 'center center' },
    state3: { top: '65%', scale: 1.5, objectPosition: 'center center' },
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

  const pillVariants = {
    state0: { opacity: 1, y: 0, scale: 1 },
    state1: { opacity: 0, y: -18, scale: 0.96 },
    state2: { opacity: 0, y: -18, scale: 0.96 },
    state3: { opacity: 0, y: -18, scale: 0.96 },
  }

  const curiosityStoryVariants = {
    state0: { opacity: 0, y: 18 },
    state1: { opacity: 1, y: 0 },
    state2: { opacity: 0, y: -18 },
    state3: { opacity: 0, y: -18 },
  }

  const sfuStoryVariants = {
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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen bg-[#ece7dc] text-[#171818]"
      aria-label="Portfolio introduction"
    >
      <div className="relative h-screen overflow-hidden bg-[#ece7dc]">
        <motion.div
          className="absolute left-2 top-3 z-20 w-[calc(100vw-1rem)] sm:left-4 sm:top-4 sm:w-[calc(100vw-2rem)] md:left-5 md:top-5 md:w-[calc(100vw-2.5rem)]"
          animate={activeState}
          variants={titleVariants}
          transition={springTransition}
        >
          <h1
            className="text-[clamp(6rem,12.5vw,14rem)] font-normal lowercase leading-[0.8] tracking-[-0.04em] lg:text-[275px]"
            style={{ fontFamily: "'BlurWeb Medium W03', Inter, sans-serif" }}
          >
            Marco Suteja
          </h1>
        </motion.div>

        <motion.p
          className="instrument-serif-italic absolute left-1/2 z-4 whitespace-nowrap text-[2px] font-semibold leading-none tracking-[-0.02em] sm:text-[65px]"
          animate={activeState}
          variants={subtitleVariants}
          transition={springTransition}
        >
          Personal Portfolio Website
        </motion.p>

        <div className="pointer-events-none absolute inset-0 z-[8] hidden sm:block" aria-hidden>
          {heroSkillPills.map((pill, index) => (
            <motion.span
              key={pill.label}
              className={`pointer-events-auto absolute rounded-full bg-white px-10 py-5 text-[42px] font-medium leading-none text-[#171818] transition-colors duration-200 hover:text-white ${pill.hoverClass} ${pill.className}`}
              animate={activeState}
              variants={pillVariants}
              transition={{ ...springTransition, delay: activeState === 'state0' ? index * 0.035 : 0 }}
            >
              {pill.label}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="absolute left-1/2 z-10 -translate-x-1/2 overflow-hidden bg-[#ece7dc]"
          animate={activeState}
          variants={imageVariants}
          transition={springTransition}
        >
          <motion.img
            src="/hero_marco.png"
            alt="Marco Areliano S portrait"
            className="absolute left-1/2 top-1/2 h-[78vh] w-screen max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply"
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
              className={`pointer-events-none absolute h-5 w-5 bg-[#171818] ${cornerClass}`}
              animate={activeState}
              variants={frameDotVariants}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
          ))}
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-5 top-[75%] z-30 max-w-[25rem] text-[#171818] sm:left-8 md:left-14"
          animate={activeState}
          variants={curiosityStoryVariants}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-3 text-[24px] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-[34px]">
            i started by taking things apart, asking how interfaces, systems, and intelligence
            actually work.
          </p>
          
        </motion.div>

        <motion.div
          className="pointer-events-none absolute right-5 top-[38%] z-30 max-w-[27rem] text-right text-[#171818] sm:right-8 md:right-35"
          animate={activeState}
          variants={sfuStoryVariants}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-3 text-[24px] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-[34px]">
            that curiosity became a computer science degree from simon fraser university, shaped by
            ai, full-stack products, and usable systems.
          </p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 text-[20px] font-black lowercase tracking-[-0.05em] text-[#171818] sm:bottom-8 sm:text-[28px] md:bottom-10"
          animate={activeState}
          variants={finalMetaVariants}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>◎ burnaby, bc</p>
          <span aria-hidden>·</span>
          <time dateTime={time}>{time} pt</time>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[#171818] sm:bottom-10"
          animate={activeState}
          variants={scrollHintVariants}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.span
            className="block text-[34px] leading-none sm:text-[42px]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.div>

        <motion.p
          className="absolute bottom-6 left-5 z-30 text-[20px] font-black lowercase tracking-[-0.05em] text-[#171818] sm:bottom-8 sm:left-8 sm:text-[28px] md:bottom-10 md:left-10"
          animate={activeState}
          variants={roleVariants}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          full-stack software developer
        </motion.p>

        <motion.nav
          className="absolute bottom-6 right-5 z-30 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10"
          animate={activeState}
          variants={navVariants}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Portfolio sections"
        >
          <ul className="flex items-center gap-3 text-[20px] font-black lowercase tracking-[-0.05em] text-[#171818] sm:text-[28px]">
            {navItems.map((item, index) => (
              <li key={item.href} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden>·</span> : null}
                <a href={item.href} className="transition-opacity hover:opacity-55">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  )
}

export default HeroScrollIntro
