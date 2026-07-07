/**
 * PortfolioMiddle — main content sections below the hero through the footer.
 *
 * Fonts (Monolog-adjacent editorial system):
 *   Roboto Flex      →  section headings, project titles
 *   Satoshi         →  body copy, descriptions
 *   Instrument Serif italic → small labels, meta, section markers
 *
 * Backgrounds: clean paper tones, no texture.
 */

import { motion, useInView, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { Github, Linkedin, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import diagnoseImage from '../images/diagnose.jpg'
import footerMarcoImage from '../images/footer_marco.jpg'
import shipImage from '../images/ship.jpg'
import solveImage from '../images/solve.jpg'
import ProjectsGallerySection from './ProjectsGallerySection'

// ─────────────────────────────────────────────────────────────────────────────
// Font constants
// ─────────────────────────────────────────────────────────────────────────────

const FONT_DISPLAY = {
  fontFamily: "'Roboto Flex', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const FONT_BODY = {
  fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const FONT_PINK_AVERAGE = {
  fontFamily: "'Pink Average', 'Instrument Serif', Georgia, serif",
  fontStyle: 'normal' as const,
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROJECTS
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// 2. WHAT I BUILD
// ─────────────────────────────────────────────────────────────────────────────

const COMPETENCY_GRADIENTS = [
  'linear-gradient(90deg, #ff004c, #ff7a00)',
  'linear-gradient(90deg, #ff7a00, #ffd400)',
  'linear-gradient(90deg, #ffd400, #7cff00)',
  'linear-gradient(90deg, #7cff00, #00ffd5)',
  'linear-gradient(90deg, #00ffd5, #008cff)',
  'linear-gradient(90deg, #7a00ff, #ff00d4)',
] as const

const competencies = [
  {
    label: 'Machine Learning Systems',
    caption: 'Model logic turned into shipped software — inference, evaluation, and product-facing ML.',
    gradient: COMPETENCY_GRADIENTS[0],
  },
  {
    label: 'Real-Time Applications',
    caption: 'Interfaces where data updates instantly — live sync, low latency, clean state.',
    gradient: COMPETENCY_GRADIENTS[1],
  },
  {
    label: 'Full-Stack Web Apps',
    caption: 'End-to-end web products — frontend, backend, database, auth, and deployment.',
    gradient: COMPETENCY_GRADIENTS[2],
  },
  {
    label: 'Computer Vision Tools',
    caption: 'Images and video turned into predictions, measurements, and classifications.',
    gradient: COMPETENCY_GRADIENTS[3],
  },
  {
    label: 'Data Pipelines',
    caption: 'Reliable flows for collecting, cleaning, validating, and moving data.',
    gradient: COMPETENCY_GRADIENTS[4],
  },
  {
    label: 'Research Prototypes',
    caption: 'Technical ideas made testable fast — demos, POCs, and early product validation.',
    gradient: COMPETENCY_GRADIENTS[5],
  },
] as const

const useFinePointer = () => {
  const [isFinePointer, setIsFinePointer] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setIsFinePointer(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isFinePointer
}

type CompetencyRowProps = {
  item: (typeof competencies)[number]
  index: number
  sectionInView: boolean
  isFinePointer: boolean
  hoverIndex: number | null
  setHoverIndex: (index: number | null) => void
  setScrollIndex: (index: number) => void
  scrollIndex: number | null
}

const CompetencyRow = ({
  item,
  index,
  sectionInView,
  isFinePointer,
  hoverIndex,
  setHoverIndex,
  setScrollIndex,
  scrollIndex,
}: CompetencyRowProps) => {
  const rowRef = useRef<HTMLLIElement>(null)
  const rowCentered = useInView(rowRef, {
    margin: '-42% 0px -42% 0px',
    amount: 0,
  })

  useEffect(() => {
    if (!isFinePointer && rowCentered) {
      setScrollIndex(index)
    }
  }, [rowCentered, index, isFinePointer, setScrollIndex])

  const isActive = isFinePointer ? hoverIndex === index : scrollIndex === index

  return (
    <li
      ref={rowRef}
      className="cursor-default"
      onMouseEnter={isFinePointer ? () => setHoverIndex(index) : undefined}
      onMouseLeave={isFinePointer ? () => setHoverIndex(null) : undefined}
    >
      <motion.span
        className="block py-2 text-[clamp(2.35rem,11vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.01em] transition-colors duration-500 ease-out sm:text-[clamp(3rem,8.5vw,7.5rem)] md:py-2"
        style={{
          ...FONT_DISPLAY,
          color: isActive ? '#E5E5E0' : 'rgba(229, 229, 224, 0.16)',
        }}
        initial={{ opacity: 0, y: 28 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {item.label}
      </motion.span>
    </li>
  )
}

const WhatIBuildSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const isFinePointer = useFinePointer()
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [scrollIndex, setScrollIndex] = useState<number | null>(null)

  const activeIndex = isFinePointer ? hoverIndex : scrollIndex
  const activeItem = activeIndex !== null ? competencies[activeIndex] : null

  return (
    <section ref={ref} id="competencies" className="bg-[#0B0B0A] py-[14vh] text-[#E5E5E0]">
      <div className="mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(240px,28%)_1fr] md:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex w-full flex-col gap-8 md:sticky md:top-[14vh] md:ml-auto md:max-w-[320px]"
          >
            <div className="flex items-start justify-center gap-3 pt-2 md:justify-start">
              <p
                className="text-center text-[clamp(1rem,1.6vw,1.45rem)] font-semibold uppercase leading-[1.35] tracking-[0.18em] text-[#E5E5E0] md:text-left"
                style={FONT_DISPLAY}
              >
                What I build
              </p>
            </div>

            <motion.div
              className="relative hidden aspect-[4/5] w-full overflow-hidden bg-[#191816] md:block"
              animate={{
                background: activeItem?.gradient ?? '#191816',
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
              aria-label={activeItem ? `Description for ${activeItem.label}` : 'Competency description'}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-5 uppercase sm:p-6 md:justify-between">
                <div className="hidden items-center justify-between gap-4 md:flex">
                  <p
                    className="text-[0.72rem] font-bold leading-none tracking-[0.14em]"
                    style={{
                      ...FONT_DISPLAY,
                      color: activeItem ? 'rgba(11, 11, 10, 0.62)' : 'rgba(229, 229, 224, 0.35)',
                    }}
                  >
                    Selected focus
                  </p>

                  <p
                    className="text-[0.72rem] font-bold leading-none"
                    style={{
                      ...FONT_DISPLAY,
                      color: activeItem ? 'rgba(11, 11, 10, 0.62)' : 'rgba(229, 229, 224, 0.25)',
                    }}
                  >
                    {activeIndex !== null ? String(activeIndex + 1).padStart(2, '0') : '00'}
                  </p>
                </div>

                <p
                  className="text-center text-[0.95rem] font-bold leading-[1.5] tracking-[0.02em] md:text-left"
                  style={{
                    ...FONT_DISPLAY,
                    color: activeItem ? '#0B0B0A' : 'rgba(229, 229, 224, 0.52)',
                  }}
                >
                  {activeItem?.caption ?? 'Select a skill to preview.'}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <ul className="flex flex-col">
            {competencies.map((item, i) => (
              <CompetencyRow
                key={item.label}
                item={item}
                index={i}
                sectionInView={isInView}
                isFinePointer={isFinePointer}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                scrollIndex={scrollIndex}
                setScrollIndex={setScrollIndex}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. PROCESS
// ─────────────────────────────────────────────────────────────────────────────

const PROCESS_PANEL_TINTS = ['#191816', '#1c1b18', '#222220']

const processCards = [
  {
    number: '01',
    title: 'Diagnose',
    description: 'Understand the problem before writing code.',
    image: diagnoseImage,
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
    image: solveImage,
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
    image: shipImage,
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

const PROCESS_FLIP_EASE = [0.22, 1, 0.36, 1] as const

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
  const [flipped, setFlipped] = useState(false)

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
      <button
        type="button"
        onClick={() => setFlipped((current) => !current)}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `${card.title}: hide details`
            : `${card.title}: reveal approach details`
        }
        className="group relative h-full w-full cursor-pointer overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B0B0A]"
      >
        <div className="relative h-full w-full overflow-hidden shadow-[0_12px_40px_rgba(11,11,10,0.12)] transition-[box-shadow,transform] duration-300 group-hover:shadow-[0_28px_70px_rgba(11,11,10,0.24)] group-focus-visible:shadow-[0_28px_70px_rgba(11,11,10,0.24)]">
          <div
            className="relative h-full w-full overflow-hidden"
            style={
              card.image ? undefined : { backgroundColor: PROCESS_PANEL_TINTS[index % PROCESS_PANEL_TINTS.length] }
            }
          >
            {card.image ? (
              <img
                src={card.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out ${
                  flipped ? 'scale-100' : 'group-hover:scale-[1.06] group-focus-visible:scale-[1.06]'
                }`}
                loading="lazy"
              />
            ) : null}

            <motion.div
              className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
              initial={false}
              animate={{ opacity: flipped ? 0 : 1 }}
              transition={{ duration: 0.25, ease: PROCESS_FLIP_EASE }}
            >
              <span className="border border-[#E5E5E0]/70 bg-[#0B0B0A]/55 px-4 py-2 text-[0.62rem] font-semibold tracking-[0.1em] text-[#E5E5E0] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                CLICK TO REVEAL
              </span>
            </motion.div>

            <motion.div
              className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-[#0B0B0A]/90 via-[#0B0B0A]/50 to-transparent p-5 md:p-6"
              initial={false}
              animate={{ opacity: flipped ? 0 : 1 }}
              transition={{ duration: 0.35, ease: PROCESS_FLIP_EASE }}
            >
              <p
                className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#E5E5E0]/55"
                style={FONT_DISPLAY}
              >
                {card.number}
              </p>
              <p
                className="mt-1 text-[clamp(1.35rem,2.8vw,2.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#E5E5E0]"
                style={FONT_DISPLAY}
              >
                {card.title}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-[4] bg-[#0B0B0A]"
            initial={false}
            animate={{ opacity: flipped ? 1 : 0 }}
            transition={{ duration: 0.58, ease: PROCESS_FLIP_EASE }}
            aria-hidden
          />

          <motion.div
            className="pointer-events-none absolute inset-0 z-[5] flex flex-col p-4 text-[#E5E5E0] sm:p-5 md:p-6"
            initial={false}
            animate={{ opacity: flipped ? 1 : 0 }}
            transition={{
              duration: 0.42,
              delay: flipped ? 0.28 : 0,
              ease: PROCESS_FLIP_EASE,
            }}
          >
            <motion.div
              className="flex flex-1 flex-col justify-center"
              initial={false}
              animate={{ y: flipped ? 0 : 18, opacity: flipped ? 1 : 0 }}
              transition={{
                duration: 0.45,
                delay: flipped ? 0.34 : 0,
                ease: PROCESS_FLIP_EASE,
              }}
            >
              <p
                className="text-center text-[0.88rem] font-bold uppercase leading-[1.45] tracking-[0.05em] text-[#E5E5E0] sm:text-[1rem] md:text-[1.1rem]"
                style={FONT_DISPLAY}
              >
                {card.description}
              </p>
              <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-center text-[0.78rem] font-bold uppercase leading-[1.45] tracking-[0.04em] text-[#E5E5E0] sm:text-[0.92rem] md:text-[1rem]"
                    style={FONT_DISPLAY}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
            <p
              className="mt-auto w-full pt-6 text-center text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#E5E5E0] sm:text-[0.9rem]"
              style={FONT_DISPLAY}
            >
              Click to hide
            </p>
          </motion.div>
        </div>
      </button>
    </motion.div>
  )
}

const APPROACH_LETTER_GAP = '0.05em'
const APPROACH_LETTER_MASK_RIGHT = '0.08em'
const APPROACH_HEADING_LINES = ['Project', 'Approach'] as const
const APPROACH_HEADING_CHAR_COUNT = APPROACH_HEADING_LINES.reduce((sum, line) => sum + line.length, 0)

const APPROACH_HEADING_SCROLL_VH = 0.32
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
  isLast,
}: {
  char: string
  charIndex: number
  scrollProgress: MotionValue<number>
  isLast: boolean
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

  const isSpace = char === ' '

  return (
    <span
      className="inline-block overflow-hidden align-top"
      style={{
        height: '1.05em',
        width: isSpace ? '0.28em' : undefined,
        paddingRight: isSpace ? undefined : APPROACH_LETTER_MASK_RIGHT,
        marginRight: !isLast && !isSpace
          ? `calc(${APPROACH_LETTER_GAP} - ${APPROACH_LETTER_MASK_RIGHT})`
          : undefined,
      }}
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
}) => {
  const chars = line.split('')

  return (
    <span className="block whitespace-nowrap uppercase">
      {chars.map((char, i) => (
        <ApproachSlotLetter
          key={`${lineIndex}-${i}`}
          char={char}
          charIndex={charOffset + i}
          scrollProgress={scrollProgress}
          isLast={i === chars.length - 1}
        />
      ))}
    </span>
  )
}

const ProcessApproachHeading = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => (
  <div className="pointer-events-none absolute inset-x-3 top-4 z-[110] text-center sm:inset-x-auto sm:right-4 sm:top-[5vh] sm:text-right md:right-5 md:top-[6vh] lg:right-6">
    <p
      aria-label="Project Approach"
      className="text-center text-[clamp(1.75rem,8.5vw,2.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] text-[#0B0B0A] sm:text-right sm:text-[clamp(2.25rem,7vw,4.5rem)]"
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
      className="relative bg-[#E5E5E0] text-[#0B0B0A]"
      id="process"
      style={{ minHeight: `calc(100vh + ${headingScrollExtra + sectionExtra}px)` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
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
  {
    q: 'What kind of roles are you looking for?',
    a: "Software engineering, ML engineering, or research-adjacent roles where I can build systems end-to-end, from model training to deployed product. Especially interested in applied ML, real-time systems, and full-stack product work.",
  },
  {
    q: "What's your strongest technical area?",
    a: 'Building end-to-end systems that ship, from model training to FastAPI backend to React frontend. Most fluent in Python, TypeScript, and React.',
  },
  {
    q: "What's your stack?",
    a: 'Python + PyTorch/TensorFlow for ML. React + TypeScript + Tailwind for frontend. FastAPI + Node.js for backend. PostgreSQL + Firebase + Convex for data. Docker + Vercel + Render for deployment.',
  },
  {
    q: 'Are you available for full-time roles?',
    a: 'Yes. Recent SFU Computer Science grad, actively looking. Open to relocating or remote.',
  },
  {
    q: 'How do I reach you?',
    a: 'LinkedIn is fastest. GitHub has all the code. Both are linked in the footer.',
  },
]

const BookCallButton = () => (
  <a
    href="https://linkedin.com/in/marcosuteja"
    target="_blank"
    rel="noreferrer"
    className="group inline-flex w-fit items-center gap-2 rounded-[4px] bg-[#E5E5E0] py-1.5 pl-3 pr-1.5 text-[0.82rem] font-semibold text-[#0B0B0A] transition-colors duration-200 hover:bg-[#d8d8d3]"
    style={FONT_DISPLAY}
  >
    <span>Book a call with Marco</span>

    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] bg-[#0B0B0A] text-[#E5E5E0] transition-colors duration-200 group-hover:bg-[#222220]">
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
)

const FaqContactCard = () => (
  <div
    className="flex w-full max-w-fit flex-col items-end border-t border-solid pt-6 text-right md:pt-8"
    style={{ borderColor: 'rgba(229, 229, 224, 0.08)' }}
  >
    <p className="text-[0.9rem] leading-snug text-[#E5E5E0]/55" style={FONT_BODY}>
      Got more questions?
    </p>

    <p className="mt-1 text-[1.05rem] font-semibold leading-snug text-[#E5E5E0]" style={FONT_DISPLAY}>
      Chat with Marco.
    </p>
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
                className="mt-4 max-w-[24ch] text-[clamp(1.05rem,1.9vw,1.4rem)] leading-[1.45] text-[#E5E5E0]/65"
                style={FONT_BODY}
              >
                What you need to know before reaching out.
              </p>
            </div>
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
                    className="flex w-full items-center justify-between gap-3 px-1 py-5 text-left sm:py-6 md:py-8"
                  >
                    <h3
                      className="min-w-0 pr-2 text-[clamp(1.45rem,6.5vw,3.5rem)] font-normal leading-[0.94] tracking-[0.01em] transition-colors duration-300"
                      style={{
                        ...FONT_PINK_AVERAGE,
                        color: isHighlighted ? '#E5E5E0' : 'rgba(229, 229, 224, 0.28)',
                      }}
                    >
                      {item.q}
                    </h3>
                    <span
                      className="ml-2 shrink-0 text-[clamp(1.75rem,5vw,3rem)] font-normal leading-none transition-all duration-300 sm:ml-6"
                      style={{
                        ...FONT_PINK_AVERAGE,
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
// 8. CTA / FOOTER
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_LINE = 'rgba(229, 229, 224, 0.18)'

const footerNavLinks = [
  { label: 'Projects', href: '#projects', external: false },
  { label: 'Approach', href: '#process', external: false },
  { label: 'FAQ', href: '#faq', external: false },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/marcosuteja',
    external: true,
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Bandoozle',
    external: true,
    Icon: Github,
  },
  { label: 'Contact', href: 'mailto:marcosuteja@gmail.com', external: false },
] as const

const FooterNavRow = ({
  label,
  href,
  external,
  index,
  isInView,
  Icon,
}: {
  label: string
  href: string
  external: boolean
  index: number
  isInView: boolean
  Icon?: LucideIcon
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

        {Icon ? (
          <Icon
            className="h-4 w-4 shrink-0 text-[#E5E5E0]/45 transition-colors duration-300 group-hover:text-[#E5E5E0]/80 md:h-5 md:w-5"
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
          <nav aria-label="Footer navigation">
            {footerNavLinks.map((link, i) => (
              <FooterNavRow key={link.label} {...link} index={i} isInView={isInView} />
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-8 md:gap-10">
              <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-10 lg:gap-14">
                <p
                  className="max-w-[34ch] text-left text-[clamp(0.95rem,2.1vw,1.25rem)] font-bold uppercase leading-[1.2] tracking-[0.02em] text-[#E5E5E0]/88"
                  style={FONT_DISPLAY}
                >
                  Full-stack software developer and Simon Fraser University CS graduate building at the
                  intersection of machine learning, real-time systems, and product engineering.
                </p>

                <div className="flex flex-col items-start gap-6 sm:items-end sm:gap-8">
                  <img
                    src={footerMarcoImage}
                    alt="Marco Suteja"
                    className="h-24 w-auto max-w-full shrink-0 object-contain object-left sm:h-32 sm:object-right md:h-40 lg:h-48"
                  />

                  <FaqContactCard />
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <a
                  href="?layer=retro-embed"
                  className="text-[clamp(0.95rem,2.1vw,1.25rem)] font-bold uppercase leading-[1.2] tracking-[0.02em] text-[#E5E5E0]/55 transition-colors duration-300 hover:text-[#E5E5E0]"
                  style={FONT_DISPLAY}
                >
                  get to know marco more
                </a>

                <BookCallButton />
              </div>
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