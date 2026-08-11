import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FONT_BODY, FONT_DISPLAY } from '../theme/fonts'
import Reveal, { RevealWords } from './Reveal'

type ExperienceItem = {
  id: string
  org: string
  title: string
  paragraphs: string[]
  panelColor: string
}

const ITEMS: ExperienceItem[] = [
  {
    id: 'blueprint',
    org: 'Blueprint',
    title: 'Building in Teams',
    paragraphs: [
      'At Blueprint I worked inside a collaborative engineering workflow, helping ship production UI against a shared design system.',
      'That environment taught me how to keep interfaces consistent, responsive, and maintainable when multiple people are building the same product.',
    ],
    panelColor: '#2563eb',
  },
  {
    id: 'kosick',
    org: 'Kosick Communications',
    title: 'Owning Product Work',
    paragraphs: [
      'At Kosick Communications, I own full stack product work end to end, turning business requirements into production features used across dealer and admin workflows.',
      'I build and improve core systems including dashboards, messaging, authentication, reporting, and internal tools.',
    ],
    panelColor: '#16a34a',
  },
  {
    id: 'projects',
    org: 'Projects',
    title: 'Shipping Ideas',
    paragraphs: [
      'Across my own projects, I take ideas from concept to release across AI, full stack development, and product design.',
      'I enjoy figuring out what makes a product genuinely useful, turning that into a working experience, refining the details, and shipping something people can actually use.',
    ],
    panelColor: 'var(--site-accent)',
  },
]

const TEXT_COLOR = '#F4F4F4'
const DIM_COLOR = '#8a8787'
const LINE_BOX = '1.25em'
const PANEL_EASE = [0.22, 1, 0.36, 1] as const

type ExperienceSectionProps = {
  id?: string
}

const CARD_GAP = 12

const ExperienceCard = ({ item }: { item: ExperienceItem }) => (
  <div
    className="flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[1.5rem] px-[clamp(1.25rem,4vw,2.75rem)] pt-[clamp(1.5rem,4vw,3.5rem)] pb-[clamp(1.25rem,3.5vw,2.75rem)] text-[#F4F4F4] sm:min-h-[22rem]"
    style={{ backgroundColor: item.panelColor }}
  >
    <Reveal y={10}>
      <p
        className="shrink-0 text-left text-[clamp(0.95rem,3vw,1.15rem)] font-normal leading-none tracking-[-0.02em] text-[#F4F4F4]/75"
        style={FONT_DISPLAY}
      >
        {item.title}
      </p>
      <p
        className="mt-3 shrink-0 text-left text-[clamp(1.5rem,3.8vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.04em] text-[#F4F4F4]"
        style={FONT_DISPLAY}
      >
        {item.org}
      </p>
    </Reveal>
    <Reveal delay={0.08} className="mt-5 flex min-h-0 flex-1 flex-col justify-start gap-4 sm:mt-8">
      {item.paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="text-[clamp(1rem,3.8vw,1.45rem)] leading-[1.55] tracking-[-0.02em] text-[#F4F4F4]"
          style={FONT_BODY}
        >
          {paragraph}
        </p>
      ))}
    </Reveal>
  </div>
)

/**
 * Experience — desktop: list pill + detail panel.
 * Mobile: swipeable colored cards.
 */
const ExperienceSection = ({ id = 'experience' }: ExperienceSectionProps) => {
  const [active, setActive] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const item = ITEMS[active] ?? ITEMS[0]

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => setCardWidth(el.offsetWidth)
    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const stride = cardWidth > 0 ? cardWidth + CARD_GAP : 0

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(ITEMS.length - 1, next))
    setActive(clamped)
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!stride) return
    const { offset, velocity } = info
    const projected = -active * stride + offset.x + velocity.x * 0.2
    const next = Math.round(-projected / stride)
    goTo(next)
  }

  return (
    <section
      id={id}
      className="relative flex min-h-0 flex-col justify-start bg-[#201D1D] pt-[clamp(3.5rem,9vw,10rem)] pb-[clamp(1.25rem,3.5vw,2.25rem)] text-[#F4F4F4] md:min-h-[100dvh] md:pb-[clamp(3rem,8vw,9rem)]"
      aria-label="Experience"
    >
      <div className="mx-auto mb-8 w-full px-3 text-center sm:mb-12 sm:px-4 md:mb-16 md:px-5 lg:mb-24 lg:px-6">
        <RevealWords
          text="Experience"
          className="w-full text-[clamp(3rem,14vw,min(11rem,20svh))] font-normal leading-[0.88] tracking-[-0.045em] text-[#F4F4F4]"
          style={FONT_DISPLAY}
        />
        <Reveal delay={0.18}>
          <p
            className="mx-auto mt-6 max-w-[34ch] text-balance text-[clamp(1rem,3.6vw,1.55rem)] leading-[1.5] text-[#F4F4F4]/70 sm:mt-10 sm:max-w-none md:mt-12"
            style={FONT_DISPLAY}
          >
            Teams, products, and shipped work that shaped how I build.
          </p>
        </Reveal>
      </div>

      {/* Mobile — each slide is its own rounded card */}
      <div className="mx-auto w-full max-w-[min(82rem,96vw)] px-3 md:hidden">
        <div ref={trackRef} className="relative overflow-x-clip">
          <motion.div
            className="flex cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ gap: CARD_GAP }}
            drag={reduceMotion || !stride ? false : 'x'}
            dragConstraints={
              stride
                ? { left: -stride * (ITEMS.length - 1), right: 0 }
                : { left: 0, right: 0 }
            }
            dragElastic={0.12}
            onDragEnd={onDragEnd}
            animate={{ x: stride ? -active * stride : 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 320, damping: 34, mass: 0.85 }
            }
          >
            {ITEMS.map((entry) => (
              <div
                key={entry.id}
                className="w-full shrink-0 grow-0"
                style={cardWidth ? { width: cardWidth } : undefined}
              >
                <ExperienceCard item={entry} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2" aria-label="Experience slides">
          {ITEMS.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              aria-label={`Show ${entry.org}`}
              aria-current={active === i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-[width,background-color] duration-250 ${
                active === i ? 'w-6 bg-[#F4F4F4]' : 'w-2 bg-[#F4F4F4]/35'
              }`}
            />
          ))}
        </div>
        <p
          className="mt-3 text-center text-[0.78rem] tracking-[-0.01em] text-[#F4F4F4]/45"
          style={FONT_DISPLAY}
        >
          Swipe to explore
        </p>
      </div>

      {/* Desktop — list + panel */}
      <Reveal className="mx-auto hidden w-full max-w-[min(82rem,96vw)] grid-cols-1 items-stretch gap-4 px-3 sm:gap-6 sm:px-4 md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.9fr)] md:gap-6 md:px-5 lg:gap-7 lg:px-6">
        <div className="flex min-h-0 w-full items-center justify-center self-stretch rounded-[1.75rem] bg-[#2E2B2B] px-[clamp(1.25rem,4vw,3.75rem)] py-[clamp(1.5rem,4vw,3rem)] sm:rounded-full">
          <ul className="flex w-full flex-col items-center gap-[clamp(1rem,3vw,2.1rem)]">
            {ITEMS.map((entry, i) => {
              const isActive = active === i
              const color = isActive ? TEXT_COLOR : DIM_COLOR

              return (
                <li key={entry.id} className="w-full text-center">
                  <button
                    type="button"
                    className="cursor-pointer text-center text-[clamp(1.2rem,5vw,min(2.85rem,7svh))] font-normal tracking-[-0.045em]"
                    style={FONT_DISPLAY}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-label={`${entry.title} — ${entry.org}`}
                  >
                    <span
                      className="inline-block overflow-hidden align-top"
                      style={{ height: LINE_BOX }}
                    >
                      <span
                        className="flex flex-col will-change-transform"
                        style={{
                          transform: isActive ? `translateY(-${LINE_BOX})` : 'translateY(0)',
                          transition: reduceMotion
                            ? 'none'
                            : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <span
                          className="block leading-none whitespace-nowrap"
                          style={{
                            height: LINE_BOX,
                            lineHeight: LINE_BOX,
                            color,
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {entry.title}
                        </span>
                        <span
                          aria-hidden
                          className="block leading-none whitespace-nowrap"
                          style={{
                            height: LINE_BOX,
                            lineHeight: LINE_BOX,
                            color,
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {entry.title}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] text-[#F4F4F4] transition-[background-color] duration-300"
          style={{ backgroundColor: item.panelColor }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: PANEL_EASE }}
              className="absolute inset-0 flex flex-col px-[clamp(1.25rem,4vw,2.75rem)] pt-[clamp(1.75rem,5vw,3.5rem)] pb-[clamp(1.5rem,4vw,2.75rem)]"
            >
              <p
                className="shrink-0 text-left text-[clamp(1.5rem,3.8vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.04em] text-[#F4F4F4]"
                style={FONT_DISPLAY}
              >
                {item.org}
              </p>
              <div className="mt-5 flex min-h-0 flex-1 flex-col justify-start gap-4 sm:mt-8">
                {item.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[clamp(1rem,3.8vw,1.45rem)] leading-[1.55] tracking-[-0.02em] text-[#F4F4F4]"
                    style={FONT_BODY}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}

export default ExperienceSection
