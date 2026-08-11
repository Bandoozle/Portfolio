/**
 * Warm the browser cache for Projects / Experience / About media while the user
 * is still on the Hi! / hero intro — so later sections feel instant.
 */
import about1 from './images/about1.jpeg'
import about2 from './images/about2.jpeg'
import about3 from './images/about3.jpeg'
import about4 from './images/about4.jpeg'
import { portfolioProjects } from './data/portfolioProjects'

type QueueItem =
  | { kind: 'image'; url: string }
  | { kind: 'video'; url: string }

let started = false

const unique = (urls: (string | undefined)[]) =>
  [...new Set(urls.filter((url): url is string => Boolean(url)))]

const collectQueue = (): QueueItem[] => {
  const videos = unique(portfolioProjects.map((project) => project.video))
  const projectImages = unique(portfolioProjects.map((project) => project.image))
  const trailImages = [about1, about2, about3, about4]

  return [
    ...videos.map((url) => ({ kind: 'video' as const, url })),
    ...unique([...projectImages, ...trailImages]).map((url) => ({
      kind: 'image' as const,
      url,
    })),
  ]
}

const idle = (fn: () => void, timeout = 900) => {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => fn(), { timeout })
  } else {
    window.setTimeout(fn, 48)
  }
}

const preloadImage = (url: string) =>
  new Promise<void>((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    const done = () => resolve()
    img.onload = done
    img.onerror = done
    img.src = url
    if (typeof img.decode === 'function') {
      void img.decode().then(done).catch(done)
    }
  })

const preloadVideo = (url: string) =>
  new Promise<void>((resolve) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    // Keep out of layout; browser still caches the response.
    video.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px'
    document.body.appendChild(video)

    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      video.removeAttribute('src')
      video.load()
      video.remove()
      resolve()
    }

    video.addEventListener('loadeddata', done, { once: true })
    video.addEventListener('error', done, { once: true })
    // Cap wait so one huge file can't stall the rest of the queue
    window.setTimeout(done, 12000)
    video.src = url
    video.load()
  })

/**
 * Start background preloads. Safe to call multiple times — runs once.
 * Begins after a short delay so the Hi! paint isn't competing for bandwidth.
 */
export const preloadPortfolioAssets = () => {
  if (started || typeof window === 'undefined') return
  started = true

  const queue = collectQueue()
  let index = 0

  const pump = () => {
    const item = queue[index]
    if (!item) return
    index += 1

    const next = () => idle(pump, 1200)

    if (item.kind === 'image') {
      void preloadImage(item.url).finally(next)
      return
    }

    void preloadVideo(item.url).finally(next)
  }

  // Let the Hi! intro settle, then chew through videos → images on idle time
  window.setTimeout(() => idle(pump, 600), 500)
}
