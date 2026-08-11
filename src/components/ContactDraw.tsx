import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const STROKE = 148
const STROKE_COLOR = '#6840FF'

/**
 * Right → left with About-style loops: enter under the Contact title,
 * loop behind the three containers, exit off the left edge.
 */
const PATH =
  'M 2400 240 ' +
  'C 2000 200, 1750 160, 1550 240 ' +
  'C 1350 320, 1480 480, 1280 540 ' +
  'C 1080 600, 900 520, 980 400 ' +
  'C 1060 280, 920 180, 740 230 ' +
  'C 560 280, 480 420, 360 500 ' +
  'C 240 580, 80 560, -40 480 ' +
  'C -200 380, -420 320, -800 300 ' +
  'C -1400 280, -2200 265, -3200 250'

const ContactDraw = () => {
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

    const contact = document.getElementById('contact')
    const triggerEl = contact ?? root

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
        // Start later so the draw happens while you're in Contact,
        // not while the section is still mostly below the fold.
        start: 'top 45%',
        end: 'max',
        scrub: 1,
        invalidateOnRefresh: true,
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
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      <svg
        className="absolute left-1/2 top-[12%] h-[88%] w-screen max-w-none -translate-x-1/2 overflow-visible"
        viewBox="-200 -40 2000 780"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
        style={{ overflow: 'visible' }}
      >
        <path
          ref={pathRef}
          d={PATH}
          stroke={STROKE_COLOR}
          strokeWidth={STROKE}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default ContactDraw
