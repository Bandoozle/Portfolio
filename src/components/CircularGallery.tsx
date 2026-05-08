import { Children, useEffect, useRef, type ReactNode } from 'react'
import './CircularGallery.css'

interface CircularGalleryProps {
  children: ReactNode
  itemWidth?: number
  gap?: number
  scrollSpeed?: number
  scrollEase?: number
  height?: number | string
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function CircularGallery({
  children,
  itemWidth = 360,
  gap = 24,
  scrollSpeed = 2,
  scrollEase = 0.06,
  height = 480,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const original = Children.toArray(children)
  const duplicated = [...original, ...original]
  const totalCount = duplicated.length

  useEffect(() => {
    const container = containerRef.current
    if (!container || totalCount === 0) return

    const stride = itemWidth + gap
    const totalWidth = stride * totalCount

    const scroll = { current: 0, target: 0, last: 0 }
    const extras: number[] = new Array(totalCount).fill(0)

    let raf = 0
    let isDown = false
    let startX = 0
    let scrollPos = 0

    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scrollEase)
      const direction = scroll.current > scroll.last ? 'right' : 'left'
      const containerWidth = container.clientWidth

      for (let i = 0; i < totalCount; i++) {
        const el = itemRefs.current[i]
        if (!el) continue

        let x = i * stride - scroll.current - extras[i]

        if (direction === 'right' && x + itemWidth < 0) {
          extras[i] -= totalWidth
        }
        if (direction === 'left' && x > containerWidth) {
          extras[i] += totalWidth
        }

        x = i * stride - scroll.current - extras[i]
        el.style.transform = `translate3d(${x}px, 0, 0)`
      }

      scroll.last = scroll.current
      raf = requestAnimationFrame(update)
    }

    const snapToNearest = () => {
      const snap = stride * Math.round(scroll.target / stride)
      scroll.target = snap
    }

    const handleMouseDown = (event: MouseEvent) => {
      isDown = true
      startX = event.clientX
      scrollPos = scroll.current
      container.classList.add('cg-grabbing')
      event.preventDefault()
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDown) return
      const dx = startX - event.clientX
      scroll.target = scrollPos + dx * scrollSpeed * 0.5
    }

    const handleMouseUp = () => {
      if (!isDown) return
      isDown = false
      container.classList.remove('cg-grabbing')
      snapToNearest()
    }

    const handleTouchStart = (event: TouchEvent) => {
      isDown = true
      startX = event.touches[0].clientX
      scrollPos = scroll.current
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDown) return
      const dx = startX - event.touches[0].clientX
      scroll.target = scrollPos + dx * scrollSpeed * 0.5
    }

    const handleTouchEnd = () => {
      if (!isDown) return
      isDown = false
      snapToNearest()
    }

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        scroll.target += event.deltaX * scrollSpeed * 0.5
        event.preventDefault()
      }
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('wheel', handleWheel, { passive: false })

    raf = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(raf)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [totalCount, itemWidth, gap, scrollSpeed, scrollEase])

  return (
    <div ref={containerRef} className="circular-gallery" style={{ height }}>
      {duplicated.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el
          }}
          className="circular-gallery-item"
          style={{
            width: itemWidth,
            transform: `translate3d(${i * (itemWidth + gap)}px, 0, 0)`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
