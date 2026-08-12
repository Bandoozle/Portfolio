/**
 * PortfolioMiddle — FAQ + Contact footer for the live portfolio.
 */

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import about1 from '../images/about1.jpeg'
import about3 from '../images/about3.jpeg'
import footerMarcoImage from '../images/footer_marco.jpg'
import { cssInk } from '../theme/palette'
import { FONT_BODY, FONT_DISPLAY } from '../theme/fonts'
import ContactDraw from './ContactDraw'
import Reveal, { RevealWords } from './Reveal'

type FaqPart =
  | { type: 'text'; value: string }
  | { type: 'pill'; value: string; bg: string; border: string; ink: string }

const PILL = {
  orange: { bg: '#FFE8DE', border: '#F5C4B0', ink: '#9A3D1C' },
  blue: { bg: '#E8EEF8', border: '#B8C6E0', ink: '#2F4A7A' },
  green: { bg: '#E7F3EA', border: '#B7D9C0', ink: '#2F6B3C' },
  teal: { bg: '#EAF6FB', border: '#A9D2E4', ink: '#1F5F78' },
  yellow: { bg: '#FFF3D6', border: '#E6C98A', ink: '#8A5A12' },
  purple: { bg: '#F5EAF2', border: '#D9B8CF', ink: '#7A3D66' },
} as const

const pill = (value: string, tone: keyof typeof PILL): FaqPart => ({
  type: 'pill',
  value,
  ...PILL[tone],
})

const text = (value: string): FaqPart => ({ type: 'text', value })

const faqs: { q: FaqPart[]; a: FaqPart[] }[] = [
  {
    q: [text('What kind of '), pill('roles', 'purple'), text(' are you looking for?')],
    a: [
      text('Interested in '),
      pill('software', 'orange'),
      text(', '),
      pill('ML', 'blue'),
      text(', and '),
      pill('research-adjacent', 'purple'),
      text(' roles, especially '),
      pill('applied ML', 'blue'),
      text(', '),
      pill('real-time', 'teal'),
      text(' systems, and '),
      pill('full-stack', 'orange'),
      text(' product development.'),
    ],
  },
  {
    q: [text("What's your strongest "), pill('technical', 'blue'), text(' area?')],
    a: [
      text('Building '),
      pill('end-to-end', 'green'),
      text(' systems that ship, from '),
      pill('model training', 'purple'),
      text(' to '),
      pill('FastAPI', 'yellow'),
      text(' backend to '),
      pill('React', 'teal'),
      text(' frontend. Most fluent in '),
      pill('Python', 'yellow'),
      text(', '),
      pill('TypeScript', 'blue'),
      text(', and '),
      pill('React', 'teal'),
      text('.'),
    ],
  },
  {
    q: [text("What's your "), pill('stack', 'orange'), text('?')],
    a: [
      pill('Python', 'yellow'),
      text(' + '),
      pill('PyTorch', 'purple'),
      text(' for '),
      pill('ML', 'blue'),
      text('. '),
      pill('React', 'teal'),
      text(' + '),
      pill('TypeScript', 'blue'),
      text(' for frontend. '),
      pill('FastAPI', 'yellow'),
      text(' + '),
      pill('Node.js', 'green'),
      text(' for backend. '),
      pill('PostgreSQL', 'green'),
      text(', '),
      pill('Firebase', 'orange'),
      text(', and '),
      pill('Convex', 'teal'),
      text(' for data. '),
      pill('Docker', 'blue'),
      text(' and '),
      pill('Vercel', 'purple'),
      text(' for deployment.'),
    ],
  },
  {
    q: [text('Are you available for '), pill('full-time', 'green'), text(' roles?')],
    a: [
      text('Yes. Recent '),
      pill('SFU', 'blue'),
      text(' '),
      pill('Computer Science', 'purple'),
      text(' grad, actively looking. Open to '),
      pill('relocating', 'orange'),
      text(' or '),
      pill('remote', 'teal'),
      text('.'),
    ],
  },
  {
    q: [text('How do I '), pill('reach', 'purple'), text(' you?')],
    a: [
      pill('LinkedIn', 'blue'),
      text(' is fastest. '),
      pill('GitHub', 'orange'),
      text(' has all the code. Both are linked in the footer.'),
    ],
  },
]

const FaqRichText = ({ parts }: { parts: FaqPart[] }) => (
  <>
    {parts.map((part, i) =>
      part.type === 'pill' ? (
        <span
          key={`${part.value}-${i}`}
          className="mx-[0.06em] inline-flex translate-y-[-0.04em] items-center rounded-full px-[0.45em] py-[0.1em] text-[0.92em] leading-none"
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
  </>
)

const faqTopics = [
  { label: 'Roles?', shape: 'pill' as const, ...PILL.purple },
  { label: 'Stack?', shape: 'soft' as const, ...PILL.orange },
  { label: 'Availability?', shape: 'pill' as const, ...PILL.green },
  { label: 'Strengths?', shape: 'square' as const, ...PILL.blue },
  { label: 'Contact?', shape: 'pill' as const, ...PILL.teal },
]

const faqTopicLayout = [
  { rotate: '-8deg', y: '0.35rem' },
  { rotate: '4deg', y: '-0.55rem' },
  { rotate: '-3deg', y: '0.15rem' },
  { rotate: '7deg', y: '-0.35rem' },
  { rotate: '-5deg', y: '0.45rem' },
] as const

const FaqTopicChip = ({
  label,
  shape,
  bg,
  border,
  ink,
  rotate,
  y,
  delay,
  active,
}: {
  label: string
  shape: 'pill' | 'soft' | 'square'
  bg: string
  border: string
  ink: string
  rotate: string
  y: string
  delay: number
  active: boolean
}) => (
  <span style={{ transform: `rotate(${rotate}) translateY(${y})` }}>
    <motion.span
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap px-[0.95em] py-[0.5em] text-[clamp(0.95rem,3.8vw,2.35rem)] font-normal leading-none tracking-[-0.025em] sm:px-[1.2em] sm:py-[0.64em] ${
        shape === 'pill' ? 'rounded-full' : shape === 'soft' ? 'rounded-[1.25rem]' : 'rounded-[0.5rem]'
      }`}
      style={{
        ...FONT_DISPLAY,
        backgroundColor: bg,
        border: `2px solid ${border}`,
        color: ink,
      }}
    >
      {label}
    </motion.span>
  </span>
)

const FaqSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const reduceMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      ref={ref}
      className="flex min-h-0 flex-col justify-start pt-[clamp(3rem,7vw,6rem)] pb-[clamp(1.5rem,4vw,3rem)] md:min-h-[100dvh]"
      style={{ color: cssInk }}
      id="faq"
      aria-label="Questions"
    >
      <div className="mx-auto mb-8 w-full px-3 text-center sm:mb-12 sm:px-4 md:mb-16 md:px-5 lg:px-6">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-[clamp(3rem,14vw,min(11rem,20svh))] font-normal leading-[0.88] tracking-[-0.045em]"
          style={{ ...FONT_DISPLAY, color: cssInk }}
        >
          Questions?
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 text-[clamp(1rem,3.6vw,1.55rem)] leading-[1.5] sm:mt-10 md:mt-12"
          style={{ ...FONT_DISPLAY, color: 'var(--site-muted)' }}
        >
          Find your answers here.
        </motion.p>
      </div>

      <div className="mx-auto w-full max-w-[min(98vw,92rem)] overflow-visible px-2 sm:px-3 md:px-4 lg:px-5">
        <div className="relative overflow-visible">
          <div
            className="pointer-events-none absolute inset-x-0 top-[3.5%] z-20 hidden -translate-y-1/2 flex-wrap items-center justify-center gap-x-2 gap-y-2 px-3 sm:inset-x-[-2%] sm:top-[4%] sm:flex sm:flex-nowrap sm:gap-x-3.5 sm:px-0 md:top-[4.5%] md:gap-x-4"
            aria-hidden
          >
            {faqTopics.map((topic, i) => (
              <FaqTopicChip
                key={topic.label}
                {...topic}
                {...faqTopicLayout[i]}
                delay={0.14 + i * 0.06}
                active={isInView}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 flex w-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-[var(--site-surface)] md:aspect-square md:rounded-full"
          >
            <div className="flex w-full max-w-[52rem] flex-col items-center px-4 pt-[clamp(2rem,6vw,8.5rem)] pb-[clamp(2.5rem,6vw,5rem)] sm:w-[68%] sm:px-0 md:pt-[clamp(5.5rem,12vw,8.5rem)]">
              {faqs.map((item, i) => {
                const isOpen = openIndex === i

                return (
                  <Reveal
                  key={i}
                    delay={0.08 + i * 0.1}
                    y={18}
                    className={`w-full ${i > 0 ? 'border-t-2 border-solid border-[var(--site-ink)]/15' : ''}`}
                  >
                    {/* Mobile accordion */}
                    <div className="md:hidden">
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-3 py-4 text-left"
                        aria-expanded={isOpen}
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                      >
                        <h3
                          className="min-w-0 flex-1 text-[clamp(1.15rem,4.2vw,1.45rem)] font-normal leading-[1.25] tracking-[-0.03em] text-balance"
                          style={{ ...FONT_DISPLAY, color: cssInk }}
                        >
                          <FaqRichText parts={item.q} />
                        </h3>
                        <span
                          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--site-ink)]/20 transition-transform duration-200 ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                          aria-hidden
                        >
                          <Plus className="h-4 w-4" strokeWidth={2} />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p
                              className="pb-4 pr-10 text-[clamp(0.95rem,3.5vw,1.15rem)] font-normal leading-[1.5] tracking-[-0.015em] text-pretty"
                              style={{
                                ...FONT_DISPLAY,
                                color: 'color-mix(in srgb, var(--site-ink) 72%, transparent)',
                              }}
                            >
                              <FaqRichText parts={item.a} />
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* Desktop two-column */}
                    <div className="hidden grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start gap-x-14 py-7 md:grid">
                      <h3
                        className="-mr-8 ml-auto w-full max-w-[19ch] text-left text-[clamp(1.55rem,3.2vw,2.25rem)] font-normal leading-[1.18] tracking-[-0.035em] text-balance"
                    style={{ ...FONT_DISPLAY, color: cssInk }}
                  >
                    <FaqRichText parts={item.q} />
                  </h3>
                  <p
                        className="-ml-2 max-w-[28ch] text-left text-[clamp(1.12rem,1.95vw,1.4rem)] font-normal leading-[1.5] tracking-[-0.015em] text-pretty"
                        style={{
                          ...FONT_DISPLAY,
                          color: 'color-mix(in srgb, var(--site-ink) 72%, transparent)',
                        }}
                  >
                    <FaqRichText parts={item.a} />
                  </p>
                </div>
                  </Reveal>
                )
              })}

              <Reveal delay={0.08 + faqs.length * 0.1} y={16}>
              <a
                href="https://linkedin.com/in/marcosuteja"
                target="_blank"
                rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-[#6840FF] px-[1.2em] py-[0.7em] text-center text-[clamp(1.15rem,4.2vw,1.45rem)] font-normal leading-none tracking-[-0.03em] text-[#F4F4F4] transition-opacity duration-200 hover:opacity-85 sm:mt-8 sm:px-[1.35em] md:text-[clamp(1.55rem,3.2vw,2.25rem)]"
                style={FONT_DISPLAY}
              >
                More questions? Book a call
              </a>
              </Reveal>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CTA / FOOTER — image square + contacts square (experience-style pair)
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_TEXT = '#201D1D'
const CONTACT_DIM = '#8a8787'
const CONTACT_LINE = '1.25em'

const footerContacts = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/marcosuteja',
    image: footerMarcoImage,
    Icon: Linkedin,
    blurb:
      'You can reach me on LinkedIn for work, collaboration, or just to say hello. I am always open to connecting.',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Bandoozle',
    image: about1,
    Icon: Github,
    blurb:
      'GitHub is where my repositories live. Browse the projects I build, ship, and keep improving over time.',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:smarcoareliano@gmail.com',
    image: about3,
    Icon: Mail,
    blurb:
      'Prefer a direct message? Email is the best way to reach me for questions, ideas, or opportunities.',
  },
] as const

const CtaSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const activeContact = footerContacts[active] ?? footerContacts[0]

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-0 flex-col justify-center overflow-x-clip overflow-y-visible pt-[clamp(4.5rem,10vw,7rem)] pb-[clamp(1.5rem,4vw,2.75rem)]"
      style={{ color: cssInk, backgroundColor: 'var(--site-bg)' }}
      aria-labelledby="contact-heading"
    >
      <div className="relative w-full overflow-visible">
        <ContactDraw />

        <div className="relative z-[1] mx-auto mb-10 w-full px-3 text-center sm:mb-12 sm:px-4 md:mb-14 md:px-5 lg:mb-16 lg:px-6">
          <RevealWords
            id="contact-heading"
            text="Contact"
            className="w-full text-[clamp(3rem,14vw,min(11rem,20svh))] font-normal leading-[0.88] tracking-[-0.045em]"
            style={{ ...FONT_DISPLAY, color: cssInk }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[1] mx-auto grid w-full max-w-[min(82rem,96vw)] grid-cols-1 items-stretch gap-5 px-3 sm:gap-6 sm:px-4 md:grid-cols-[minmax(16rem,0.9fr)_minmax(14rem,0.7fr)_minmax(22rem,1.4fr)] md:gap-6 md:px-5 lg:gap-7 lg:px-6"
        >
        <div className="relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-full bg-[#2a2727] sm:max-w-[26rem] md:mx-0 md:max-w-none">
          <img
            src={activeContact.image}
            alt="Marco Suteja"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-3 flex w-full items-center justify-center self-stretch rounded-full bg-[var(--site-surface)] px-8 py-4 sm:mt-4 md:mt-0 md:h-full md:min-h-0 md:px-[clamp(1.5rem,4vw,2.75rem)] md:py-[clamp(1.5rem,4vw,2.75rem)]">
          <nav
            className="flex w-full flex-row items-center justify-center gap-8 md:flex-col md:gap-[clamp(1rem,2.8vw,1.65rem)]"
            aria-label="Contact links"
          >
            {footerContacts.map((link, i) => {
              const isActive = active === i
              const color = isActive ? CONTACT_TEXT : CONTACT_DIM
              const external = !link.href.startsWith('mailto:')
              const Icon = link.Icon

              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={link.label}
                  className="cursor-pointer text-center text-[clamp(1.65rem,4.2vw,2.85rem)] font-normal tracking-[-0.04em]"
                  style={FONT_DISPLAY}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="text-[var(--site-ink)] md:hidden">
                    <Icon className="h-8 w-8" strokeWidth={1.75} aria-hidden />
                  </span>

                  <span
                    className="hidden overflow-hidden align-top md:inline-block"
                    style={{ height: CONTACT_LINE }}
                  >
                    <span
                      className="flex flex-col will-change-transform"
                      style={{
                        transform: isActive ? `translateY(-${CONTACT_LINE})` : 'translateY(0)',
                        transition: reduceMotion
                          ? 'none'
                          : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <span
                        className="block leading-none whitespace-nowrap"
                        style={{
                          height: CONTACT_LINE,
                          lineHeight: CONTACT_LINE,
                          color,
                          transition: 'color 0.2s ease',
                        }}
                  >
                    {link.label}
                      </span>
                      <span
                        aria-hidden
                        className="block leading-none whitespace-nowrap"
                        style={{
                          height: CONTACT_LINE,
                          lineHeight: CONTACT_LINE,
                          color,
                          transition: 'color 0.2s ease',
                        }}
                  >
                    {link.label}
                      </span>
                    </span>
                  </span>
                  </a>
              )
            })}
              </nav>
            </div>

        <div className="hidden min-h-[14rem] w-full flex-col items-center justify-center self-stretch rounded-[1.75rem] bg-[#2E2B2B] px-[clamp(3.25rem,9vw,6rem)] py-[clamp(2.75rem,7vw,4.5rem)] md:flex md:h-full md:min-h-0 md:rounded-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={activeContact.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[28ch] text-center text-[clamp(1.25rem,3.2vw,1.85rem)] leading-[1.4] tracking-[-0.02em] text-[#F4F4F4]"
              style={FONT_BODY}
            >
              {activeContact.blurb}
            </motion.p>
          </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Composed export
// ─────────────────────────────────────────────────────────────────────────────

const PortfolioMiddle = () => (
  <>
    <FaqSection />
    <CtaSection />
  </>
)

export { FaqSection, CtaSection }
export default PortfolioMiddle
