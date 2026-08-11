import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const STROKE = 148

/**
 * Enter off left → shallow loop near About → exit straight off the right.
 * No clipPath / overflow-hidden — stroke may paint freely past the box.
 */
const PATH =
  'M -1000 220 ' +
  'C -620 60, -260 320, 80 270 ' +
  'C 340 220, 460 90, 620 190 ' +
  'C 800 320, 640 460, 460 500 ' +
  'C 280 540, 300 640, 520 610 ' +
  'C 760 580, 980 520, 1200 480 ' +
  'C 1480 430, 1800 400, 2200 380 ' +
  'C 2700 350, 3300 330, 4200 310'

const HeroAboutDraw = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const path = pathRef.current
    if (!root || !path) return

    const length = path.getTotalLength()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 })
      return
    }

    const scroller = document.querySelector('[data-main] main')
    if (!(scroller instanceof HTMLElement)) return

    const about = document.getElementById('about')
    const triggerEl = about ?? root

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerEl,
        scroller,
        start: 'top 75%',
        endTrigger: root,
        end: 'bottom top',
        scrub: 1,
      },
    })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400)

    return () => {
      window.clearTimeout(refreshTimer)
      window.removeEventListener('resize', onResize)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute left-1/2 top-[-58%] z-0 h-[min(110vw,56rem)] w-screen max-w-none -translate-x-1/2 overflow-visible sm:top-[-30%]"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="-80 -120 1600 940"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
        style={{ overflow: 'visible' }}
      >
        <path
          ref={pathRef}
          d={PATH}
          stroke="var(--site-accent)"
          strokeWidth={STROKE}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default HeroAboutDraw
