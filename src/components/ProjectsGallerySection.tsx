import { AnimatePresence, motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { portfolioProjects, type PortfolioProject } from '../data/portfolioProjects'
import ProjectDetailView from './ProjectDetailView'

import { FONT_DISPLAY } from '../theme/fonts'
import Reveal, { RevealWords } from './Reveal'

const EASE = [0.22, 1, 0.36, 1] as const
const LINE_COLOR = 'var(--site-border)'

type ViewMode = 'grid' | 'list'

/** Uniform small landscape panels for every grid card */
const GRID_IMAGE_CLASS = 'aspect-[4/3] w-full'

const PLACEHOLDER_TINTS = ['#191816', '#1e1d1a', '#161614', '#222220']

/** Column scroll speeds (px) — odd/even columns move opposite directions */
const COLUMN_Y_SPEED = [-36, 28, -30, 24]

const formatIndex = (index: number) => `/${String(index + 1).padStart(3, '0')}`

const getColumnCount = (width: number) => {
  if (width >= 1024) return 4
  if (width >= 768) return 3
  if (width >= 480) return 2
  return 1
}

/** Desktop grid: 3 / 3 / 3 / 3 projects per column (project ids). */
const DESKTOP_GRID_LAYOUT: readonly number[][] = [
  [13, 12, 10],
  [1, 2, 6],
  [7, 11, 3],
  [4, 8, 5],
]

const buildGridColumns = (columnCount: number, projects: PortfolioProject[]) => {
  if (columnCount === 4 && projects.length === portfolioProjects.length) {
    return DESKTOP_GRID_LAYOUT.map((projectIds) =>
      projectIds.map((id) => {
        const index = projects.findIndex((project) => project.id === id)
        return { project: projects[index], index }
      }),
    )
  }

  const cols = Array.from({ length: columnCount }, () => [] as { project: PortfolioProject; index: number }[])
  projects.forEach((project, index) => {
    cols[index % columnCount].push({ project, index })
  })
  return cols
}

const filterProjects = (query: string) => {
  const q = query.trim().toLowerCase()
  if (!q) return portfolioProjects
  return portfolioProjects.filter((project) => {
    const haystack = [
      project.title,
      project.subtitle,
      project.category,
      project.year,
      project.tagline,
      ...project.stack,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

/** Static wave — columns 1 & 3 raised, 2 & 4 lowered (kept modest so title stays clear) */
const waveOffsetClass = (colIndex: number) =>
  colIndex % 2 === 0
    ? '-translate-y-2 sm:-translate-y-3 md:-translate-y-4 lg:-translate-y-5'
    : 'translate-y-2 sm:translate-y-3 md:translate-y-4 lg:translate-y-5'

const collectScrollRoots = (el: HTMLElement) => {
  const roots: (Element | Window)[] = [window]
  let node: HTMLElement | null = el.parentElement
  while (node) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      roots.push(node)
    }
    node = node.parentElement
  }
  const main = el.closest('main')
  if (main && !roots.includes(main)) roots.push(main)
  return roots
}

/** One rAF per frame for scroll-driven updates (shared by wave + opacity). */
const scheduleFrame = (pending: { id: number }, fn: () => void) => {
  if (pending.id) return
  pending.id = requestAnimationFrame(() => {
    pending.id = 0
    fn()
  })
}

const useWaveScrollProgress = (sectionRef: RefObject<HTMLDivElement | null>) => {
  // 0.5 = zero column offset until the first real measure (avoids a post-wipe jump)
  const progress = useMotionValue(0.5)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const roots = collectScrollRoots(section)
    const pending = { id: 0 }

    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      progress.set(Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height))))
    }

    const onScroll = () => scheduleFrame(pending, update)

    roots.forEach((root) => root.addEventListener('scroll', onScroll, { passive: true }))
    window.addEventListener('resize', onScroll, { passive: true })
    window.addEventListener('projects-wipe-complete', onScroll)
    update()

    return () => {
      if (pending.id) cancelAnimationFrame(pending.id)
      roots.forEach((root) => root.removeEventListener('scroll', onScroll))
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('projects-wipe-complete', onScroll)
    }
  }, [sectionRef, progress])

  return progress
}

const useColumnOffsetY = (progress: MotionValue<number>, columnIndex: number) => {
  const speed = COLUMN_Y_SPEED[columnIndex % COLUMN_Y_SPEED.length]
  return useTransform(progress, (p) => (p - 0.5) * speed * 1.6)
}

const MIN_PANEL_BRIGHTNESS = 0.38
const MAX_PANEL_BRIGHTNESS = 1
const MIN_PANEL_OPACITY = 0.42

/**
 * Mid-viewport brightness/opacity fade for project panels.
 * Disabled on the light cream canvas — re-enable for dark mode.
 */
const PANEL_CENTER_DIM_ENABLED = false

type DimCard = {
  el: HTMLElement
  brightness: MotionValue<number>
  opacity: MotionValue<number>
}

/** Single scroll/rAF batch for all grid card brightness — mid-view bright, edges dim. */
const dimCards = new Set<DimCard>()
const dimPending = { id: 0 }
let dimListenerCount = 0

const flushCardDim = () => {
  dimPending.id = 0
  if (!PANEL_CENTER_DIM_ENABLED || dimCards.size === 0) return
  const vh = window.innerHeight || 1
  const viewportCenter = vh * 0.5
  const fadeRange = vh * 0.68
  dimCards.forEach(({ el, brightness, opacity }) => {
    const rect = el.getBoundingClientRect()
    if (rect.height <= 0) return
    const panelCenter = rect.top + rect.height * 0.5
    const dist = Math.abs(panelCenter - viewportCenter)
    const t = Math.min(1, Math.max(0, 1 - dist / fadeRange))
    const smooth = t * t * (3 - 2 * t)
    brightness.set(
      MIN_PANEL_BRIGHTNESS + smooth * (MAX_PANEL_BRIGHTNESS - MIN_PANEL_BRIGHTNESS),
    )
    opacity.set(MIN_PANEL_OPACITY + smooth * (1 - MIN_PANEL_OPACITY))
  })
}

const kickCardDim = () => scheduleFrame(dimPending, flushCardDim)

const bindDimScroll = () => {
  dimListenerCount += 1
  if (dimListenerCount !== 1) return
  // Capture catches the Projects pane scroll (overflow is toggled after mount)
  document.addEventListener('scroll', kickCardDim, { passive: true, capture: true })
  window.addEventListener('resize', kickCardDim, { passive: true })
  window.addEventListener('projects-wipe-complete', kickCardDim)
}

const unbindDimScroll = () => {
  dimListenerCount = Math.max(0, dimListenerCount - 1)
  if (dimListenerCount !== 0) return
  if (dimPending.id) cancelAnimationFrame(dimPending.id)
  dimPending.id = 0
  document.removeEventListener('scroll', kickCardDim, true)
  window.removeEventListener('resize', kickCardDim)
  window.removeEventListener('projects-wipe-complete', kickCardDim)
}

const useBatchedCenterDim = (ref: RefObject<HTMLElement | null>) => {
  const brightness = useMotionValue(
    PANEL_CENTER_DIM_ENABLED ? MIN_PANEL_BRIGHTNESS : MAX_PANEL_BRIGHTNESS,
  )
  const opacity = useMotionValue(PANEL_CENTER_DIM_ENABLED ? MIN_PANEL_OPACITY : 1)
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  useLayoutEffect(() => {
    if (!PANEL_CENTER_DIM_ENABLED) return
    const el = ref.current
    if (!el) return

    const entry: DimCard = { el, brightness, opacity }
    dimCards.add(entry)
    bindDimScroll()
    kickCardDim()

    return () => {
      dimCards.delete(entry)
      unbindDimScroll()
    }
  }, [ref, brightness, opacity])

  return { filter, opacity }
}

const ListRule = ({ className = '' }: { className?: string }) => (
  <div className={`relative h-px w-full ${className}`} style={{ backgroundColor: LINE_COLOR }}>
    <span
      className="absolute left-0 top-0 h-2 w-px -translate-y-full"
      style={{ backgroundColor: LINE_COLOR }}
      aria-hidden
    />
    <span
      className="absolute right-0 top-0 h-2 w-px -translate-y-full"
      style={{ backgroundColor: LINE_COLOR }}
      aria-hidden
    />
  </div>
)

const ViewToggle = ({
  mode,
  onChange,
}: {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}) => (
  <div
    role="group"
    aria-label="Project view"
    className="inline-flex items-center gap-1 text-[clamp(1.05rem,1.8vw,1.3rem)]"
    style={FONT_DISPLAY}
  >
    {(
      [
        { id: 'grid', label: 'Grid view' },
        { id: 'list', label: 'List view' },
      ] as const
    ).map(({ id, label }) => {
      const active = mode === id
      return (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={active}
          className={`rounded-full px-[1.2em] py-[0.55em] font-normal leading-none tracking-[-0.01em] transition-colors duration-200 ${
            active
              ? 'bg-[var(--site-accent)] text-[#F4F4F4]'
              : 'bg-transparent text-[var(--site-ink)]/70 hover:text-[var(--site-ink)]'
          }`}
        >
          {label}
        </button>
      )
    })}
  </div>
)

const ProjectSearch = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => (
  <label className="relative inline-flex w-full max-w-[20rem] min-w-0 items-center sm:min-w-[min(16rem,72vw)] sm:w-auto">
    <span className="sr-only">Search projects</span>
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="pointer-events-none absolute left-[0.95em] h-[1em] w-[1em] text-[var(--site-ink)]/45"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search projects"
      className="w-full rounded-full border border-[var(--site-ink)]/15 bg-[var(--site-ink)]/[0.04] py-[0.55em] pl-[2.55em] pr-[1.2em] text-[clamp(1.05rem,1.8vw,1.3rem)] font-normal leading-none tracking-[-0.01em] text-[var(--site-ink)] outline-none placeholder:text-[var(--site-ink)]/40 transition-[border-color,background-color] duration-200 focus:border-[var(--site-ink)]/30 focus:bg-[var(--site-ink)]/[0.06]"
      style={FONT_DISPLAY}
    />
  </label>
)

const ProjectImage = ({
  project,
  index,
  className = '',
  eager = false,
}: {
  project: PortfolioProject
  index: number
  className?: string
  /** When true, skip viewport gating (e.g. list cursor preview). */
  eager?: boolean
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rectRef = useRef({ left: 0, top: 0 })
  const hasMedia = Boolean(project.video || project.image)
  const mediaClass = 'relative z-0 block h-auto w-full'
  const panelClass = hasMedia
    ? `relative isolate overflow-hidden w-full rounded-[5px] ${className}`
    : `relative isolate overflow-hidden rounded-[5px] bg-[#191816] ${GRID_IMAGE_CLASS} ${className}`

  useEffect(() => {
    const video = videoRef.current
    if (!video || eager) {
      if (video && eager) void video.play().catch(() => {})
      return
    }

    const root = video.closest('#projects')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      {
        root: root instanceof Element ? root : null,
        threshold: [0, 0.2, 0.5],
        rootMargin: '40px 0px',
      },
    )
    io.observe(video)
    return () => {
      io.disconnect()
      video.pause()
    }
  }, [eager, project.video])

  const handlePointerEnter = () => {
    const panel = panelRef.current
    if (!panel) return
    const rect = panel.getBoundingClientRect()
    rectRef.current = { left: rect.left, top: rect.top }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current
    if (!panel) return
    const { left, top } = rectRef.current
    panel.style.setProperty('--spot-x', `${event.clientX - left}px`)
    panel.style.setProperty('--spot-y', `${event.clientY - top}px`)
    panel.style.setProperty('--spot-opacity', '1')
  }

  const handlePointerLeave = () => {
    panelRef.current?.style.setProperty('--spot-opacity', '0')
  }

  return (
    <div
      ref={panelRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        !project.image && !project.video
          ? { backgroundColor: PLACEHOLDER_TINTS[index % PLACEHOLDER_TINTS.length] }
          : undefined
      }
      className={panelClass}
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          className={mediaClass}
          loop
          muted
          playsInline
          preload="none"
          aria-label={`${project.title} preview`}
        />
      ) : project.image ? (
        <img
          src={project.image}
          alt=""
          className={mediaClass}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="relative z-0 flex h-full w-full items-end p-5">
          <p
            className="text-[0.62rem] uppercase tracking-[0.2em] text-[#E5E5E0]/18"
            style={FONT_DISPLAY}
          >
            {project.category}
          </p>
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-[opacity] duration-300 ease-out"
        style={{
          opacity: 'var(--spot-opacity, 0)',
          background:
            'radial-gradient(130px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(229,229,224,0.28) 0%, transparent 68%)',
        }}
      />
    </div>
  )
}

const GridProjectCard = ({
  project,
  index,
  onSelect,
  waveDelay,
  revealed,
}: {
  project: PortfolioProject
  index: number
  onSelect: (id: number) => void
  waveDelay: number
  revealed: boolean
}) => {
  const cardRef = useRef<HTMLElement>(null)
  const { filter, opacity: scrollOpacity } = useBatchedCenterDim(cardRef)

  return (
    <motion.article
      ref={cardRef}
      className="group min-w-0"
      initial={false}
      animate={
        revealed
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 42, scale: 0.97 }
      }
      transition={{
        duration: 0.75,
        delay: revealed ? waveDelay : 0,
        ease: EASE,
      }}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(project.id)}
        style={
          PANEL_CENTER_DIM_ENABLED
            ? { filter, opacity: scrollOpacity }
            : undefined
        }
        className={`block w-full min-w-0 cursor-pointer px-0.5 text-left${
          PANEL_CENTER_DIM_ENABLED ? ' will-change-[filter,opacity]' : ''
        }`}
      >
        <ProjectImage project={project} index={index} />
        <div className="mt-3 flex items-start justify-between gap-4 md:mt-4">
          <h3
            className="min-w-0 text-[clamp(0.85rem,1.4vw,1.15rem)] font-bold uppercase leading-[1.05] tracking-[0.04em] text-[var(--site-ink)]"
            style={FONT_DISPLAY}
          >
            {project.title}
          </h3>
          <div className="shrink-0 text-right">
            <p
              className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[var(--site-ink)]"
              style={FONT_DISPLAY}
            >
              {project.year}
            </p>
            <p
              className="mt-0.5 max-w-[14ch] text-[0.58rem] font-medium uppercase leading-tight tracking-[0.12em] text-[var(--site-ink)]"
              style={FONT_DISPLAY}
            >
              {project.category}
            </p>
          </div>
        </div>
      </motion.button>
    </motion.article>
  )
}

const WaveGridColumn = ({
  colIndex,
  items,
  scrollProgress,
  onSelect,
  revealed,
}: {
  colIndex: number
  items: { project: PortfolioProject; index: number }[]
  scrollProgress: MotionValue<number>
  onSelect: (id: number) => void
  revealed: boolean
}) => {
  const columnY = useColumnOffsetY(scrollProgress, colIndex)
  // Diagonal wave: left→right, top→bottom, with a slight column stagger like the static wave
  const colPhase = colIndex % 2 === 0 ? 0 : 0.06

  return (
    <div className={`min-w-0 flex-1 transform ${waveOffsetClass(colIndex)}`}>
      <motion.div
        style={{ y: columnY }}
        className="flex flex-col gap-5 will-change-transform sm:gap-y-6 md:gap-y-8"
      >
        {items.map(({ project, index }, rowIndex) => (
          <GridProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={onSelect}
            revealed={revealed}
            waveDelay={colIndex * 0.07 + rowIndex * 0.1 + colPhase}
          />
        ))}
      </motion.div>
    </div>
  )
}

const WaveGrid = ({
  sectionRef,
  onSelect,
  active,
  projects,
}: {
  sectionRef: RefObject<HTMLDivElement | null>
  onSelect: (id: number) => void
  active: boolean
  projects: PortfolioProject[]
}) => {
  const scrollProgress = useWaveScrollProgress(sectionRef)
  const [columnCount, setColumnCount] = useState(() =>
    typeof window !== 'undefined' ? getColumnCount(window.innerWidth) : 3,
  )
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const onResize = () => setColumnCount(getColumnCount(window.innerWidth))
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (active) setRevealed(true)
  }, [active])

  useEffect(() => {
    const reveal = () => setRevealed(true)
    window.addEventListener('projects-wipe-complete', reveal)
    return () => window.removeEventListener('projects-wipe-complete', reveal)
  }, [])

  const columns = useMemo(() => buildGridColumns(columnCount, projects), [columnCount, projects])

  if (projects.length === 0) {
    return (
      <p
        className="py-16 text-center text-[clamp(1.05rem,1.8vw,1.3rem)] text-[var(--site-ink)]/55"
        style={FONT_DISPLAY}
      >
        No projects match that search.
      </p>
    )
  }

  return (
    <div className="flex items-start gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6">
      {columns.map((items, colIndex) => (
        <WaveGridColumn
          key={`${columnCount}-${colIndex}`}
          colIndex={colIndex}
          items={items}
          scrollProgress={scrollProgress}
          onSelect={onSelect}
          revealed={revealed}
        />
      ))}
    </div>
  )
}

const getColumnGap = (width: number) => {
  if (width >= 1024) return 24
  if (width >= 768) return 20
  if (width >= 640) return 16
  return 12
}

const useGridPanelWidth = (containerRef: RefObject<HTMLElement | null>) => {
  const [panelWidth, setPanelWidth] = useState(280)

  useEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return

      const contentWidth = container.clientWidth
      const columnCount = getColumnCount(window.innerWidth)
      const gap = getColumnGap(window.innerWidth)
      setPanelWidth((contentWidth - gap * (columnCount - 1)) / columnCount)
    }

    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [containerRef])

  return panelWidth
}

const LIST_PREVIEW_OFFSET = 20

const ListCursorPreview = ({
  project,
  index,
  cursorX,
  cursorY,
  panelWidth,
  visible,
}: {
  project: PortfolioProject | null
  index: number
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
  panelWidth: number
  visible: boolean
}) => {
  const left = useTransform(cursorX, (x) => {
    const maxLeft =
      typeof window !== 'undefined' ? window.innerWidth - panelWidth - 16 : x
    return Math.min(x + LIST_PREVIEW_OFFSET, maxLeft)
  })

  if (!project || !visible || !(project.video || project.image)) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="pointer-events-none fixed z-[80]"
      style={{
        left,
        top: cursorY,
        width: panelWidth,
        transform: 'translateY(-50%)',
      }}
      aria-hidden
    >
      <ProjectImage project={project} index={index} eager />
    </motion.div>
  )
}

const ListProjectRow = ({
  project,
  index,
  onSelect,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: {
  project: PortfolioProject
  index: number
  onSelect: (id: number) => void
  onHoverStart: (project: PortfolioProject, index: number) => void
  onHoverMove: (event: React.MouseEvent<HTMLButtonElement>) => void
  onHoverEnd: () => void
}) => {
  return (
    <div>
      <ListRule />
      <button
        type="button"
        onClick={() => onSelect(project.id)}
        className="flex w-full min-w-0 cursor-pointer flex-col gap-2 py-5 text-left transition-colors duration-300 sm:flex-row sm:items-baseline sm:gap-4 md:grid md:grid-cols-[1fr_minmax(120px,22%)_56px_56px] md:items-baseline md:gap-6 md:py-6 lg:gap-10 hover:bg-[var(--site-ink)]/[0.04]"
        onMouseEnter={() => onHoverStart(project, index)}
        onMouseMove={onHoverMove}
        onMouseLeave={onHoverEnd}
      >
        <h3
          className="min-w-0 flex-1 text-[clamp(2rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.01em] text-[var(--site-ink)] md:col-span-1"
          style={FONT_DISPLAY}
        >
          {project.title}
        </h3>
        <div className="flex shrink-0 items-center gap-4 sm:ml-auto md:contents">
          <p
            className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--site-ink)] md:block"
            style={FONT_DISPLAY}
          >
            {project.category}
          </p>
          <p
            className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--site-ink)] md:text-right"
            style={FONT_DISPLAY}
          >
            {project.year}
          </p>
          <p
            className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--site-ink)] md:text-right"
            style={FONT_DISPLAY}
          >
            {formatIndex(index)}
          </p>
        </div>
      </button>
    </div>
  )
}

const ProjectsGallerySection = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [listHover, setListHover] = useState<{ project: PortfolioProject; index: number } | null>(
    null,
  )
  const listCursorX = useMotionValue(0)
  const listCursorY = useMotionValue(0)
  const [projectsActive, setProjectsActive] = useState(true)
  const gridSectionRef = useRef<HTMLDivElement>(null)
  const projectsInnerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const panelWidth = useGridPanelWidth(projectsInnerRef)

  const filteredProjects = useMemo(() => filterProjects(searchQuery), [searchQuery])

  const selectedProject =
    selectedProjectId !== null
      ? portfolioProjects.find((project) => project.id === selectedProjectId) ?? null
      : null

  const openProject = (id: number) => setSelectedProjectId(id)
  const closeProject = () => setSelectedProjectId(null)

  const handleListHoverStart = (project: PortfolioProject, index: number) => {
    setListHover({ project, index })
  }

  const handleListHoverMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    listCursorX.set(event.clientX)
    listCursorY.set(event.clientY)
  }

  const handleListHoverEnd = () => {
    setListHover(null)
  }

  useEffect(() => {
    const onSection = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id
      setProjectsActive(id === 'projects')
    }
    const onWipe = () => setProjectsActive(true)
    window.addEventListener('portfolio-active-section', onSection)
    window.addEventListener('projects-wipe-complete', onWipe)
    return () => {
      window.removeEventListener('portfolio-active-section', onSection)
      window.removeEventListener('projects-wipe-complete', onWipe)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative flex min-h-[100dvh] flex-col justify-start pt-[clamp(4rem,10vw,9rem)] pb-[clamp(3rem,7vw,6rem)] text-[var(--site-ink)]"
      aria-label="Projects"
    >
      <div className="relative z-20 mb-6 flex w-full shrink-0 flex-col items-center px-3 text-center sm:mb-10 sm:px-4 md:mb-12 md:px-5 lg:px-6">
        <RevealWords
          text="Projects"
          className="w-full text-[clamp(3rem,14vw,min(11rem,20svh))] font-normal leading-[0.88] tracking-[-0.045em] text-[var(--site-ink)]"
          style={FONT_DISPLAY}
        />
        <Reveal delay={0.18}>
          <p
            className="mx-auto mt-6 max-w-[34ch] text-balance text-[clamp(1rem,3.6vw,1.55rem)] leading-[1.5] text-[var(--site-ink)]/70 sm:mt-10 sm:max-w-none md:mt-12"
            style={FONT_DISPLAY}
          >
            Selected work across full-stack products, ML, and AI tools.
          </p>
        </Reveal>
        <Reveal delay={0.28} className="mt-5 flex w-full max-w-lg flex-col items-center justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
          <ViewToggle
            mode={viewMode}
            onChange={(next) => {
              if (next === viewMode) return
              setListHover(null)
              setViewMode(next)
              requestAnimationFrame(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              })
            }}
          />
          <ProjectSearch value={searchQuery} onChange={setSearchQuery} />
        </Reveal>
      </div>

      <div ref={projectsInnerRef} className="relative z-0 mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              ref={gridSectionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-visible pb-6 pt-6 sm:pb-10 sm:pt-12 md:pb-12 md:pt-14 lg:pt-16"
            >
              <WaveGrid
                sectionRef={gridSectionRef}
                onSelect={openProject}
                active={projectsActive}
                projects={filteredProjects}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {filteredProjects.length === 0 ? (
                <p
                  className="py-16 text-center text-[clamp(1.05rem,1.8vw,1.3rem)] text-[var(--site-ink)]/55"
                  style={FONT_DISPLAY}
                >
                  No projects match that search.
                </p>
              ) : (
                <>
                  {filteredProjects.map((project, i) => (
                    <ListProjectRow
                      key={project.id}
                      project={project}
                      index={i}
                      onSelect={openProject}
                      onHoverStart={handleListHoverStart}
                      onHoverMove={handleListHoverMove}
                      onHoverEnd={handleListHoverEnd}
                    />
                  ))}
                  <ListRule />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {viewMode === 'list' && listHover ? (
          <ListCursorPreview
            key={listHover.project.id}
            project={listHover.project}
            index={listHover.index}
            cursorX={listCursorX}
            cursorY={listCursorY}
            panelWidth={panelWidth}
            visible={typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailView key={selectedProject.id} project={selectedProject} onClose={closeProject} />
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsGallerySection
