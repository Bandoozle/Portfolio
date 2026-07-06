/**
 * PortfolioMiddle — sections between HeroScrollIntro and footer.
 *
 * Fonts (Monolog-adjacent editorial system):
 *   Roboto Flex      →  section headings, project titles
 *   Satoshi         →  body copy, descriptions
 *   Instrument Serif italic → small labels, meta, section markers
 *
 * Backgrounds: clean paper tones, no texture.
 */

import { AnimatePresence, motion, useInView, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { ExternalLink, Github, Instagram, Linkedin } from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import ProjectsGallerySection from './ProjectsGallerySection'

// ─────────────────────────────────────────────────────────────────────────────
// Font constants
// ─────────────────────────────────────────────────────────────────────────────

/** Display headings — Roboto Flex */
const FONT_DISPLAY = {
  fontFamily: "'Roboto Flex', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

/** Body copy — Satoshi (clean grotesque, no italic) */
const FONT_BODY = {
  fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROJECTS — PODIUM-style grid / list gallery
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// 2. WHAT I BUILD — "What we can help with" vertical list
// ─────────────────────────────────────────────────────────────────────────────

const competencies = [
  { label: 'Machine Learning Systems', image: '' },
  { label: 'Real-Time Applications', image: '' },
  { label: 'Full-Stack Web Apps', image: '' },
  { label: 'Computer Vision Tools', image: '' },
  { label: 'Data Pipelines', image: '' },
  { label: 'Research Prototypes', image: '' },
] as const

const WhatIBuildSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = activeIndex !== null ? competencies[activeIndex] : null

  return (
    <section ref={ref} id="competencies" className="bg-[#0B0B0A] py-[14vh] text-[#E5E5E0]">
      <div className="mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(240px,28%)_1fr] md:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 md:sticky md:top-[14vh]"
          >
            <div className="flex items-start gap-3 pt-2">
              <p
                className="text-[clamp(1rem,1.6vw,1.45rem)] font-semibold uppercase leading-[1.35] tracking-[0.18em] text-[#E5E5E0]"
                style={FONT_DISPLAY}
              >
                What I build
              </p>
            </div>

            <div
              className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden bg-[#191816]"
              aria-live="polite"
              aria-label={activeItem ? `Preview for ${activeItem.label}` : 'Competency preview'}
            >
              <AnimatePresence mode="wait">
                {activeItem && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {activeItem.image ? (
                      <img
                        src={activeItem.image}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-full w-full items-end p-5">
                        <p
                          className="text-[0.65rem] uppercase tracking-[0.18em] text-[#E5E5E0]/25"
                          style={FONT_DISPLAY}
                        >
                          {activeItem.label}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <ul className="flex flex-col">
            {competencies.map((item, i) => {
              const isActive = activeIndex === i
              return (
                <li
                  key={item.label}
                  className="cursor-default"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <motion.span
                    className="block py-1 text-[clamp(3rem,8.5vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.01em] transition-colors duration-500 ease-out md:py-2"
                    style={{
                      ...FONT_DISPLAY,
                      color: isActive ? '#E5E5E0' : 'rgba(229, 229, 224, 0.16)',
                    }}
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.label}
                  </motion.span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PROCESS — scroll-driven card track logic only
// ─────────────────────────────────────────────────────────────────────────────

const PROCESS_PANEL_TINTS = ['#191816', '#1c1b18', '#222220']

const processCards = [
  {
    number: '01',
    title: 'Diagnose',
    description: 'Understand the problem before writing code.',
    bullets: [
      'Map users, constraints, and success metrics.',
      'Define what the system must do.',
      'Agree on what "done" actually looks like.',
    ],
  },
  {
    number: '02',
    title: 'Solve',
    description: 'Design and build the system with intent.',
    bullets: [
      'Architect the solution and prototype fast.',
      'Iterate on model quality, API design, or UX.',
      'Lock in the core workflow before scaling.',
    ],
  },
  {
    number: '03',
    title: 'Ship',
    description: 'Deploy, measure, and improve in the real world.',
    bullets: [
      'Ship to production and monitor real usage.',
      'Tighten performance and reliability.',
      'Polish based on feedback — not assumptions.',
    ],
  },
] as const

const PROCESS_CARD_COUNT = processCards.length

type CarouselLayout = {
  activeX: number
  activeY: number
  cardWidth: number
  cardHeight: number
  gapX: number
  gapY: number
}

const DEFAULT_CAROUSEL_LAYOUT: CarouselLayout = {
  activeX: -120,
  activeY: 28,
  cardWidth: 520,
  cardHeight: 430,
  gapX: 620,
  gapY: 118,
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const getCarouselCardMotion = (index: number, progress: number, layout: CarouselLayout) => {
  const activeStep = progress * (PROCESS_CARD_COUNT - 1)
  const distanceFromActive = index - activeStep
  const absDistance = Math.abs(distanceFromActive)

  return {
    x: layout.activeX + distanceFromActive * layout.gapX,
    y: layout.activeY + distanceFromActive * layout.gapY + Math.min(absDistance, 1.5) * 26,
    rotate: clamp(distanceFromActive / 2, -1, 1) * -4,
    scale: 1 - Math.min(absDistance * 0.055, 0.14),
    opacity: clamp(1 - Math.max(0, absDistance - 1.35) / 0.8),
    zIndex: Math.round(100 - absDistance * 10),
  }
}

const useProcessGalleryProgress = (sectionRef: RefObject<HTMLElement | null>) => {
  const progress = useMotionValue(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frame = 0

    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const scrollable = Math.max(1, section.offsetHeight - window.innerHeight)
        progress.set(clamp(-rect.top / scrollable))
      })
    }

    const main = section.closest('main')

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    main?.addEventListener('scroll', update, { passive: true })
    update()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      main?.removeEventListener('scroll', update)
    }
  }, [sectionRef, progress])

  return progress
}

const useProcessSectionHeight = (cardCount: number) => {
  const [sectionExtra, setSectionExtra] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollStep = Math.max(window.innerHeight * 0.95, 640)
      setSectionExtra(Math.max(0, cardCount - 1) * scrollStep)
    }

    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [cardCount])

  return sectionExtra
}

const useCarouselStageLayout = (stageRef: RefObject<HTMLDivElement | null>) => {
  const [layout, setLayout] = useState<CarouselLayout>(DEFAULT_CAROUSEL_LAYOUT)
  const layoutRef = useRef<CarouselLayout>(DEFAULT_CAROUSEL_LAYOUT)

  useEffect(() => {
    const update = () => {
      const stage = stageRef.current
      if (!stage) return

      const { width: stageW, height: stageH } = stage.getBoundingClientRect()
      if (stageW < 1 || stageH < 1) return

      const isMobile = stageW < 768
      const cardWidth = isMobile
        ? Math.min(Math.max(stageW * 0.82, 280), 420)
        : Math.min(Math.max(stageW * 0.34, 420), 640)
      const cardHeight = isMobile ? cardWidth * 1.12 : cardWidth * 0.82

      const next = {
        activeX: isMobile ? 0 : -stageW * 0.08,
        activeY: isMobile ? stageH * 0.07 : stageH * 0.05,
        cardWidth,
        cardHeight,
        gapX: isMobile ? cardWidth * 1.02 : cardWidth * 1.18,
        gapY: isMobile ? 46 : 112,
      }

      layoutRef.current = next
      setLayout(next)
    }

    update()
    window.addEventListener('resize', update, { passive: true })

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    if (stageRef.current) observer?.observe(stageRef.current)

    return () => {
      window.removeEventListener('resize', update)
      observer?.disconnect()
    }
  }, [stageRef])

  return { layout, layoutRef }
}

const ProcessCarouselCard = ({
  card,
  index,
  scrollProgress,
  layoutRef,
  layout,
}: {
  card: (typeof processCards)[number]
  index: number
  scrollProgress: MotionValue<number>
  layoutRef: RefObject<CarouselLayout>
  layout: CarouselLayout
}) => {
  const x = useTransform(scrollProgress, (p) => getCarouselCardMotion(index, p, layoutRef.current).x)
  const y = useTransform(scrollProgress, (p) => getCarouselCardMotion(index, p, layoutRef.current).y)
  const rotate = useTransform(scrollProgress, (p) => getCarouselCardMotion(index, p, layoutRef.current).rotate)
  const scale = useTransform(scrollProgress, (p) => getCarouselCardMotion(index, p, layoutRef.current).scale)
  const opacity = useTransform(scrollProgress, (p) => getCarouselCardMotion(index, p, layoutRef.current).opacity)
  const zIndex = useTransform(scrollProgress, (p) => getCarouselCardMotion(index, p, layoutRef.current).zIndex)

  const halfW = layout.cardWidth / 2
  const halfH = layout.cardHeight / 2

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex,
        width: layout.cardWidth,
        height: layout.cardHeight,
        marginLeft: -halfW,
        marginTop: -halfH,
      }}
      className="absolute left-1/2 top-1/2 will-change-transform"
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ backgroundColor: PROCESS_PANEL_TINTS[index % PROCESS_PANEL_TINTS.length] }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.1]">
          <span
            className="text-[clamp(3rem,8vw,5.5rem)] font-bold uppercase tracking-[-0.04em] text-[#E5E5E0]"
            style={FONT_DISPLAY}
            aria-hidden
          >
            {card.number}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-[#0B0B0A]/85 via-[#0B0B0A]/40 to-transparent p-5 md:p-6">
          <p
            className="text-[clamp(1.35rem,2.8vw,2.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#E5E5E0]"
            style={FONT_DISPLAY}
          >
            {card.title}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const APPROACH_HEADING_LINES = ['Project', 'Approach'] as const
const APPROACH_HEADING_CHAR_COUNT = APPROACH_HEADING_LINES.reduce((sum, line) => sum + line.length, 0)

/** Extra viewport height reserved for heading scroll before cards advance. */
const APPROACH_HEADING_SCROLL_VH = 0.32

/** Share of normalized section progress for heading reveal before carousel moves. */
const APPROACH_HEADING_SCROLL_PORTION = 0.24

const mapProcessScrollToCarouselProgress = (progress: number) => {
  if (progress <= APPROACH_HEADING_SCROLL_PORTION) return 0
  return clamp((progress - APPROACH_HEADING_SCROLL_PORTION) / (1 - APPROACH_HEADING_SCROLL_PORTION))
}

const clampProgress = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const ApproachSlotLetter = ({
  char,
  charIndex,
  scrollProgress,
}: {
  char: string
  charIndex: number
  scrollProgress: MotionValue<number>
}) => {
  const revealStart =
    (charIndex / APPROACH_HEADING_CHAR_COUNT) * APPROACH_HEADING_SCROLL_PORTION * 0.78
  const revealEnd = revealStart + APPROACH_HEADING_SCROLL_PORTION * 0.16
  const y = useTransform(scrollProgress, (p) => {
    if (p <= revealStart) return '120%'
    if (p >= revealEnd) return '0%'
    const t = (p - revealStart) / (revealEnd - revealStart)
    const eased = 1 - (1 - t) ** 3
    return `${120 - eased * 120}%`
  })
  const opacity = useTransform(scrollProgress, (p) => {
    if (p <= revealStart) return 0
    if (p >= revealStart + 0.025) return 1
    return clampProgress((p - revealStart) / 0.025)
  })

  return (
    <span
      className="inline-block overflow-hidden align-top"
      style={{ height: '1.05em', width: char === ' ' ? '0.28em' : undefined }}
    >
      <motion.span className="block will-change-transform" style={{ y, opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

const ApproachHeadingRow = ({
  line,
  lineIndex,
  charOffset,
  scrollProgress,
}: {
  line: string
  lineIndex: number
  charOffset: number
  scrollProgress: MotionValue<number>
}) => (
  <span className="block whitespace-nowrap uppercase">
    {line.split('').map((char, i) => (
      <ApproachSlotLetter
        key={`${lineIndex}-${i}`}
        char={char}
        charIndex={charOffset + i}
        scrollProgress={scrollProgress}
      />
    ))}
  </span>
)

const ProcessApproachHeading = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => (
  <div className="pointer-events-none absolute right-3 top-[6vh] z-[110] sm:right-4 md:right-5 lg:right-6">
    <p
      aria-label="Project Approach"
      className="text-right text-[clamp(2.25rem,7vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] text-[#0B0B0A]"
      style={FONT_DISPLAY}
    >
      {APPROACH_HEADING_LINES.map((line, i) => (
        <ApproachHeadingRow
          key={line}
          line={line}
          lineIndex={i}
          charOffset={APPROACH_HEADING_LINES.slice(0, i).reduce((sum, entry) => sum + entry.length, 0)}
          scrollProgress={scrollProgress}
        />
      ))}
    </p>
  </div>
)

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useProcessGalleryProgress(sectionRef)
  const carouselScrollProgress = useTransform(scrollProgress, mapProcessScrollToCarouselProgress)
  const sectionExtra = useProcessSectionHeight(processCards.length)
  const [headingScrollExtra, setHeadingScrollExtra] = useState(0)
  const { layout, layoutRef } = useCarouselStageLayout(stageRef)

  useEffect(() => {
    const update = () => setHeadingScrollExtra(window.innerHeight * APPROACH_HEADING_SCROLL_VH)
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-[#0B0B0A]"
      id="process"
      style={{ minHeight: `calc(100vh + ${headingScrollExtra + sectionExtra}px)` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ProcessApproachHeading scrollProgress={scrollProgress} />

        <div ref={stageRef} className="relative h-full w-full">
          {processCards.map((card, i) => (
            <ProcessCarouselCard
              key={card.number}
              card={card}
              index={i}
              scrollProgress={carouselScrollProgress}
              layoutRef={layoutRef}
              layout={layout}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. FAQ
// ─────────────────────────────────────────────────────────────────────────────

const faqs = [
  { q: 'What kind of roles are you looking for?', a: "Software engineering, ML engineering, or research-adjacent roles where I can build systems end-to-end — from model training to deployed product. Especially interested in applied ML, real-time systems, and full-stack product work." },
  { q: "What's your strongest technical area?", a: "Building end-to-end systems that ship — model training to FastAPI backend to React frontend. Most fluent in Python (ML/backend) and TypeScript (frontend)." },
  { q: "What's your stack?", a: "Python + PyTorch/TensorFlow for ML. React + TypeScript + Tailwind for frontend. FastAPI + Node.js for backend. PostgreSQL + Firebase + Convex for data. Docker + Vercel + Render for deployment." },
  { q: 'Are you available for full-time roles?', a: "Yes — recent SFU Computer Science grad, actively looking. Open to relocating or remote." },
  { q: 'How do I reach you?', a: "LinkedIn is fastest. GitHub has all the code. Both are linked in the footer." },
]

const FaqContactCard = () => (
  <div className="mt-12 border-t border-solid pt-8 md:mt-auto" style={{ borderColor: 'rgba(229, 229, 224, 0.08)' }}>
    <img
      src="/hero_marco.png"
      alt="Marco Suteja"
      className="mb-5 h-[88px] w-[88px] rounded-[4px] object-cover object-top"
    />
    <p className="text-[0.9rem] leading-snug text-[#E5E5E0]/55" style={FONT_BODY}>
      Got more questions?
    </p>
    <p className="mt-1 text-[1.05rem] font-semibold leading-snug text-[#E5E5E0]" style={FONT_DISPLAY}>
      Chat with Marco.
    </p>
    <a
      href="https://linkedin.com/in/marcosuteja"
      target="_blank"
      rel="noreferrer"
      className="group mt-5 inline-flex w-full items-center justify-between gap-3 rounded-[4px] bg-[#E5E5E0] py-1.5 pl-4 pr-1 text-[0.82rem] font-semibold text-[#0B0B0A] transition-colors duration-200 hover:bg-[#d8d8d3]"
      style={FONT_DISPLAY}
    >
      <span>Book a call with Marco</span>
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-[#0B0B0A] text-[#E5E5E0] transition-colors duration-200 group-hover:bg-[#222220]">
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M4.5 11.5L11.5 4.5M11.5 4.5H6.25M11.5 4.5V9.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  </div>
)

const FaqSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [open, setOpen] = useState<number | null>(null)
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null)

  return (
    <section ref={ref} className="bg-[#191816] py-[10vh] text-[#E5E5E0] md:py-[12vh]" id="faq">
      <div className="mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[minmax(260px,28%)_1fr] md:items-stretch md:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div>
              <p
                className="text-[clamp(3.25rem,8vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[#E5E5E0]"
                style={FONT_DISPLAY}
              >
                FAQs
              </p>
              <p
                className="mt-3 max-w-[20ch] text-[0.9rem] leading-relaxed text-[#E5E5E0]/55"
                style={FONT_BODY}
              >
                What you need to know before reaching out.
              </p>
            </div>

            <FaqContactCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((item, i) => {
              const isHighlighted = hoveredFaq === i || open === i
              return (
                <div
                  key={i}
                  className="border-b border-solid transition-colors duration-300 first:border-t hover:bg-[#E5E5E0]/[0.03]"
                  style={{ borderColor: 'rgba(229, 229, 224, 0.08)' }}
                  onMouseEnter={() => setHoveredFaq(i)}
                  onMouseLeave={() => setHoveredFaq(null)}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between px-1 py-6 text-left md:py-8"
                  >
                    <h3
                      className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.94] tracking-[-0.01em] transition-colors duration-300"
                      style={{
                        ...FONT_DISPLAY,
                        color: isHighlighted ? '#E5E5E0' : 'rgba(229, 229, 224, 0.28)',
                      }}
                    >
                      {item.q}
                    </h3>
                    <span
                      className="ml-6 shrink-0 text-[clamp(2rem,3.5vw,3rem)] font-light leading-none transition-all duration-300"
                      style={{
                        transform:
                          open === i
                            ? 'rotate(45deg) scale(1.08)'
                            : hoveredFaq === i
                              ? 'scale(1.08)'
                              : 'scale(1)',
                        color: isHighlighted ? '#E5E5E0' : 'rgba(229, 229, 224, 0.28)',
                      }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div className={`faq-content ${open === i ? 'open' : ''}`}>
                    <div className="overflow-hidden px-1">
                      <p className="pb-7 text-[0.95rem] leading-[1.75] text-[#E5E5E0]/55 md:pb-8" style={FONT_BODY}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CTA / FOOTER — Wolverine-style editorial footer
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_LINE = 'rgba(229, 229, 224, 0.18)'

const footerNavLinks = [
  { label: 'Projects', href: '#projects', external: false },
  { label: 'Approach', href: '#process', external: false },
  { label: 'FAQ', href: '#faq', external: false },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/marcosuteja', external: true },
  { label: 'GitHub', href: 'https://github.com/Bandoozle', external: true },
  { label: 'Contact', href: 'mailto:marcosuteja@gmail.com', external: false },
] as const

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/marcosuteja',
    handle: 'linkedin.com/in/marcosuteja',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Bandoozle',
    handle: 'github.com/Bandoozle',
    Icon: Github,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/marcostja',
    handle: '@marcostja',
    Icon: Instagram,
  },
] as const

const FooterNavRow = ({
  label,
  href,
  external,
  index,
  isInView,
}: {
  label: string
  href: string
  external: boolean
  index: number
  isInView: boolean
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-solid"
      style={{ borderColor: FOOTER_LINE }}
    >
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ x: hovered ? 16 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group flex items-center justify-between gap-4 py-2.5 md:py-3"
      >
        <span
          className="text-[clamp(1.35rem,3.5vw,2.5rem)] font-bold uppercase leading-[0.94] tracking-[-0.02em] transition-colors duration-300"
          style={{
            ...FONT_DISPLAY,
            color: hovered ? '#E5E5E0' : 'rgba(229, 229, 224, 0.88)',
          }}
        >
          {label}
        </span>
        {external ? (
          <ExternalLink
            className="h-4 w-4 shrink-0 text-[#E5E5E0]/45 transition-colors duration-300 group-hover:text-[#E5E5E0]/75 md:h-5 md:w-5"
            strokeWidth={1.5}
            aria-hidden
          />
        ) : null}
      </motion.a>
    </motion.div>
  )
}

const CtaSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} id="contact" className="bg-[#0B0B0A] py-[6vh] text-[#E5E5E0] md:py-[8vh]">
      <div className="mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          <nav aria-label="Footer navigation">
            {footerNavLinks.map((link, i) => (
              <FooterNavRow key={link.label} {...link} index={i} isInView={isInView} />
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-8"
          >
            <img
              src="/logo.png"
              alt="Marco Suteja"
              className="h-20 w-auto object-contain object-left sm:h-24 md:h-28 lg:h-32 md:object-right md:ml-auto"
            />
            <div className="md:ml-auto md:text-right">
              <p className="max-w-[34ch] text-[0.75rem] leading-[1.6] text-[#E5E5E0]/55 md:ml-auto" style={FONT_BODY}>
                Full-stack software developer and Simon Fraser University CS graduate building at the
                intersection of machine learning, real-time systems, and product engineering.
              </p>
              <ul className="mt-4 space-y-2 md:ml-auto md:w-fit">
                {socialLinks.map(({ label, href, handle, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2.5 text-[#E5E5E0]/70 transition-colors duration-300 hover:text-[#E5E5E0] md:flex-row-reverse"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
                      <span className="text-[0.75rem] leading-none" style={FONT_BODY}>
                        {handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Composed export
// ─────────────────────────────────────────────────────────────────────────────

const PortfolioMiddle = () => (
  <>
    <ProjectsGallerySection />
    <WhatIBuildSection />
    <ProcessSection />
    <FaqSection />
    <CtaSection />
  </>
)

export default PortfolioMiddle