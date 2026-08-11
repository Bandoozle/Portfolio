import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { FONT_SERIF } from '../theme/fonts'

const ABOUT_TEXT =
  "I'm a full-stack developer who enjoys turning ideas into simple, useful digital products. I care about clean design, thoughtful engineering, and building things people enjoy using."

/** Explicit hex — GSAP can't interpolate CSS vars cleanly (flashes white). */
const START_COLOR = '#8a8686'
const END_COLOR = '#201D1D'
const WAVE_DURATION = 0.35
/** Total time for the wave to travel across the full paragraph */
const WAVE_TRAVEL = 2.2

const splitWords = (text: string) => text.split(/(\s+)/)

type AboutMeSectionProps = {
  /** Section id used by nav */
  id?: string
}

/**
 * About Me — centered paragraph with OSMO gradient-wave character reveal
 * when the section scrolls into view.
 */
const AboutMeSection = ({ id = 'about' }: AboutMeSectionProps) => {
  const rootRef = useRef<HTMLElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const activeCharsRef = useRef(new Set<HTMLElement>())
  const progressTweenRef = useRef<gsap.core.Tween | null>(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const chars = () => charRefs.current.filter(Boolean) as HTMLSpanElement[]

    const resetWave = () => {
      progressTweenRef.current?.kill()
      progressTweenRef.current = null
      playedRef.current = false
      const nodes = chars()
      nodes.forEach((char) => gsap.killTweensOf(char))
      gsap.set(nodes, { color: START_COLOR })
      activeCharsRef.current.clear()
    }

    const playWave = () => {
      if (playedRef.current) return
      playedRef.current = true

      const nodes = chars()
      if (!nodes.length) return

      const activeChars = activeCharsRef.current
      activeChars.clear()
      nodes.forEach((char) => gsap.killTweensOf(char))
      gsap.set(nodes, { color: START_COLOR })

      const progress = { value: 0 }

      progressTweenRef.current = gsap.to(progress, {
        value: 1,
        duration: WAVE_TRAVEL,
        ease: 'none',
        onUpdate: () => {
          const activeCount = Math.round(progress.value * nodes.length)

          nodes.forEach((char, index) => {
            const isActive = index < activeCount

            if (isActive && !activeChars.has(char)) {
              activeChars.add(char)
              gsap.killTweensOf(char)
              gsap.to(char, {
                color: END_COLOR,
                duration: WAVE_DURATION,
                ease: 'power2.out',
              })
            }

            if (!isActive && activeChars.has(char)) {
              activeChars.delete(char)
              gsap.killTweensOf(char)
              gsap.to(char, {
                color: START_COLOR,
                duration: WAVE_DURATION * 0.5,
                ease: 'none',
              })
            }
          })
        },
      })
    }

    gsap.set(chars(), { color: START_COLOR })

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35
        if (visible) {
          playWave()
        } else {
          resetWave()
        }
      },
      {
        root: root.closest('main'),
        threshold: [0, 0.35, 0.6],
        rootMargin: '0px',
      },
    )
    io.observe(root)

    return () => {
      io.disconnect()
      progressTweenRef.current?.kill()
      chars().forEach((char) => gsap.killTweensOf(char))
    }
  }, [id])

  let charIndex = 0
  const tokens = splitWords(ABOUT_TEXT)

  return (
    <section
      ref={rootRef}
      id={id}
      className="relative mx-auto w-full max-w-[min(64rem,96vw)] px-2 py-2 text-[var(--site-ink)]"
      aria-label="About me"
    >
      <div className="rounded-[1.75rem] bg-[var(--site-surface)] px-[clamp(1.25rem,5vw,5.5rem)] py-[clamp(1.5rem,4vw,3.75rem)] sm:rounded-full">
        <p
          className="text-center text-[clamp(1.35rem,4.5vw,3.15rem)] font-normal leading-[1.3] tracking-[-0.03em]"
          style={FONT_SERIF}
        >
          {tokens.map((token, tokenIndex) => {
            if (/^\s+$/.test(token)) {
              return <span key={`sp-${tokenIndex}`}>{' '}</span>
            }

            return (
              <span key={`w-${tokenIndex}`} className="inline-block whitespace-nowrap">
                {token.split('').map((char) => {
                  const i = charIndex
                  charIndex += 1
                  return (
                    <span
                      key={`c-${i}`}
                      ref={(el) => {
                        charRefs.current[i] = el
                      }}
                      className="inline-block"
                      style={{ color: START_COLOR }}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}

export default AboutMeSection
