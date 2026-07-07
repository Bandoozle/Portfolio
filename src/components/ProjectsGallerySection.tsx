import { AnimatePresence, motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { portfolioProjects, type PortfolioProject } from '../data/portfolioProjects'
import ProjectDetailView from './ProjectDetailView'

const FONT_DISPLAY = {
  fontFamily: "'Roboto Flex', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const EASE = [0.22, 1, 0.36, 1] as const
const LINE_COLOR = 'rgba(229, 229, 224, 0.22)'

type ViewMode = 'grid' | 'list'

/** Uniform small landscape panels for every grid card */
const GRID_IMAGE_CLASS = 'aspect-[4/3] w-full'

const PLACEHOLDER_TINTS = ['#191816', '#1e1d1a', '#161614', '#222220']

/** Column scroll speeds (px) — odd/even columns move opposite directions */
const COLUMN_Y_SPEED = [-88, 62, -72, 54]

const formatIndex = (index: number) => `/${String(index + 1).padStart(3, '0')}`

const getColumnCount = (width: number) => {
  if (width >= 1024) return 4
  if (width >= 768) return 3
  return 2
}

/** Desktop grid: 3 / 2 / 3 / 2 projects per column (project ids). */
const DESKTOP_GRID_LAYOUT: readonly number[][] = [
  [1, 5, 10],
  [2, 6],
  [7, 11, 3],
  [4, 8],
]

const buildGridColumns = (columnCount: number) => {
  if (columnCount === 4) {
    return DESKTOP_GRID_LAYOUT.map((projectIds) =>
      projectIds.map((id) => {
        const index = portfolioProjects.findIndex((project) => project.id === id)
        return { project: portfolioProjects[index], index }
      }),
    )
  }

  const cols = Array.from({ length: columnCount }, () => [] as { project: PortfolioProject; index: number }[])
  portfolioProjects.forEach((project, index) => {
    cols[index % columnCount].push({ project, index })
  })
  return cols
}

/** Static wave — columns 1 & 3 raised, 2 & 4 lowered */
const waveOffsetClass = (colIndex: number) =>
  colIndex % 2 === 0
    ? '-translate-y-4 sm:-translate-y-8 md:-translate-y-12 lg:-translate-y-16'
    : 'translate-y-4 sm:translate-y-8 md:translate-y-12 lg:translate-y-16'

const useWaveScrollProgress = (sectionRef: RefObject<HTMLDivElement | null>) => {
  const progress = useMotionValue(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const scroller = section.closest('main') ?? window

    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      progress.set(Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height))))
    }

    scroller.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      scroller.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionRef, progress])

  return progress
}

const columnOffsetY = (progress: MotionValue<number>, columnIndex: number) => {
  const speed = COLUMN_Y_SPEED[columnIndex % COLUMN_Y_SPEED.length]
  return useTransform(progress, (p) => (p - 0.5) * speed * 2.2)
}

const MIN_PANEL_OPACITY = 0.4

/** Opacity peaks at viewport center; fades toward min when entering from below or exiting above. */
const useViewportCenterOpacity = (ref: RefObject<HTMLElement | null>) => {
  const opacity = useMotionValue(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const scroller = el.closest('main') ?? window

    const update = () => {
      const rect = el.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      const dist = Math.abs(centerY - viewportCenter)
      const fadeRange = window.innerHeight * 0.48
      const linear = Math.max(0, 1 - dist / fadeRange)
      const smooth = linear * linear * (3 - 2 * linear)
      opacity.set(MIN_PANEL_OPACITY + smooth * (1 - MIN_PANEL_OPACITY))
    }

    scroller.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      scroller.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref, opacity])

  return opacity
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
  onToggle,
}: {
  mode: ViewMode
  onToggle: () => void
}) => (
  <div className="flex justify-center pt-12 md:pt-8">
    <button
      type="button"
      onClick={onToggle}
      className="group inline-flex items-center gap-4 border border-dashed px-5 py-2.5 transition-colors duration-300 hover:border-[#E5E5E0]/50"
      style={{ borderColor: LINE_COLOR }}
      aria-label={mode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
    >
      <span
        className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#E5E5E0]/70 transition-colors duration-300 group-hover:text-[#E5E5E0]"
        style={FONT_DISPLAY}
      >
        {mode === 'grid' ? 'List View' : 'Grid View'}
      </span>
      {mode === 'grid' ? (
        <span className="flex items-center gap-0.5 text-[#E5E5E0]/45 transition-colors duration-300 group-hover:text-[#E5E5E0]/70" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="text-[0.55rem] tracking-tighter">
              &gt;&gt;&gt;
            </span>
          ))}
        </span>
      ) : (
        <span className="grid grid-cols-2 gap-[3px] text-[#E5E5E0]/45 transition-colors duration-300 group-hover:text-[#E5E5E0]/70" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="text-[0.45rem] leading-none">
              ×
            </span>
          ))}
        </span>
      )}
    </button>
  </div>
)

const ProjectImage = ({
  project,
  index,
  className = '',
}: {
  project: PortfolioProject
  index: number
  className?: string
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const hasMedia = Boolean(project.video || project.image)
  const mediaClass =
    'relative z-0 block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]'
  const panelClass = hasMedia
    ? `relative isolate overflow-hidden w-full ${className}`
    : `relative isolate overflow-hidden bg-[#191816] ${GRID_IMAGE_CLASS} ${className}`

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current
    if (!panel) return

    const rect = panel.getBoundingClientRect()
    panel.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    panel.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    panel.style.setProperty('--spot-opacity', '1')
  }

  const handlePointerLeave = () => {
    panelRef.current?.style.setProperty('--spot-opacity', '0')
  }

  return (
    <div
      ref={panelRef}
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
          src={project.video}
          className={mediaClass}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={`${project.title} preview`}
        />
      ) : project.image ? (
        <img
          src={project.image}
          alt=""
          className={mediaClass}
          loading="lazy"
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
      {/* Cursor light — only on image panels */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light transition-[opacity] duration-500 ease-out"
        style={{
          opacity: 'var(--spot-opacity, 0)',
          background:
            'radial-gradient(170px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.55) 0%, rgba(229,229,224,0.18) 42%, transparent 72%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] transition-[opacity] duration-500 ease-out"
        style={{
          opacity: 'var(--spot-opacity, 0)',
          background:
            'radial-gradient(120px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(229,229,224,0.22) 0%, transparent 62%)',
        }}
      />
    </div>
  )
}

const GridProjectCard = ({
  project,
  index,
  onSelect,
}: {
  project: PortfolioProject
  index: number
  onSelect: (id: number) => void
}) => {
  const cardRef = useRef<HTMLElement>(null)
  const scrollOpacity = useViewportCenterOpacity(cardRef)

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
      className="group min-w-0"
    >
      <motion.button
        type="button"
        onClick={() => onSelect(project.id)}
        style={{ opacity: scrollOpacity }}
        className="block w-full min-w-0 cursor-pointer px-0.5 text-left"
      >
        <ProjectImage project={project} index={index} />
        <div className="mt-3 flex items-start justify-between gap-4 md:mt-4">
          <h3
            className="min-w-0 text-[clamp(0.85rem,1.4vw,1.15rem)] font-bold uppercase leading-[1.05] tracking-[0.04em] text-[#E5E5E0] transition-opacity duration-300 group-hover:opacity-70"
            style={FONT_DISPLAY}
          >
            {project.title}
          </h3>
          <div className="shrink-0 text-right">
            <p
              className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#E5E5E0]/55"
              style={FONT_DISPLAY}
            >
              {project.year}
            </p>
            <p
              className="mt-0.5 max-w-[14ch] text-[0.58rem] font-medium uppercase leading-tight tracking-[0.12em] text-[#E5E5E0]/40"
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
}: {
  colIndex: number
  items: { project: PortfolioProject; index: number }[]
  scrollProgress: MotionValue<number>
  onSelect: (id: number) => void
}) => {
  const columnY = columnOffsetY(scrollProgress, colIndex)

  return (
    <div className={`min-w-0 flex-1 transform ${waveOffsetClass(colIndex)}`}>
      <motion.div style={{ y: columnY }} className="flex flex-col gap-8 sm:gap-y-10 md:gap-y-12">
        {items.map(({ project, index }) => (
          <WaveGridCard
            key={project.id}
            project={project}
            index={index}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    </div>
  )
}

const WaveGridCard = ({
  project,
  index,
  onSelect,
}: {
  project: PortfolioProject
  index: number
  onSelect: (id: number) => void
}) => (
  <GridProjectCard project={project} index={index} onSelect={onSelect} />
)

const WaveGrid = ({
  sectionRef,
  onSelect,
}: {
  sectionRef: RefObject<HTMLDivElement | null>
  onSelect: (id: number) => void
}) => {
  const scrollProgress = useWaveScrollProgress(sectionRef)
  const [columnCount, setColumnCount] = useState(() =>
    typeof window !== 'undefined' ? getColumnCount(window.innerWidth) : 3,
  )

  useEffect(() => {
    const onResize = () => setColumnCount(getColumnCount(window.innerWidth))
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const columns = useMemo(() => buildGridColumns(columnCount), [columnCount])

  return (
    <div className="flex items-start gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6">
      {columns.map((items, colIndex) => (
        <WaveGridColumn
          key={`${columnCount}-${colIndex}`}
          colIndex={colIndex}
          items={items}
          scrollProgress={scrollProgress}
          onSelect={onSelect}
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
  cursor,
  panelWidth,
  visible,
}: {
  project: PortfolioProject | null
  index: number
  cursor: { x: number; y: number }
  panelWidth: number
  visible: boolean
}) => {
  if (!project || !visible || !(project.video || project.image)) return null

  const maxLeft = typeof window !== 'undefined' ? window.innerWidth - panelWidth - 16 : cursor.x
  const left = Math.min(cursor.x + LIST_PREVIEW_OFFSET, maxLeft)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="pointer-events-none fixed z-[80]"
      style={{
        left,
        top: cursor.y,
        width: panelWidth,
        transform: 'translateY(-50%)',
      }}
      aria-hidden
    >
      <ProjectImage project={project} index={index} />
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
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
    >
      <ListRule />
      <button
        type="button"
        onClick={() => onSelect(project.id)}
        className="flex w-full min-w-0 cursor-pointer flex-col gap-2 py-7 text-left transition-colors duration-300 sm:flex-row sm:items-baseline sm:gap-4 md:grid md:grid-cols-[1fr_minmax(120px,22%)_56px_56px] md:items-baseline md:gap-6 md:py-9 lg:gap-10 hover:bg-[#E5E5E0]/[0.02]"
        onMouseEnter={() => {
          setHovered(true)
          onHoverStart(project, index)
        }}
        onMouseMove={onHoverMove}
        onMouseLeave={() => {
          setHovered(false)
          onHoverEnd()
        }}
      >
        <h3
          className="min-w-0 flex-1 text-[clamp(2rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.01em] transition-colors duration-300 md:col-span-1"
          style={{
            ...FONT_DISPLAY,
            color: hovered ? '#E5E5E0' : 'rgba(229, 229, 224, 0.88)',
          }}
        >
          {project.title}
        </h3>
        <div className="flex shrink-0 items-center gap-4 sm:ml-auto md:contents">
          <p
            className="text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 md:block"
            style={{
              ...FONT_DISPLAY,
              color: hovered ? 'rgba(229, 229, 224, 0.65)' : 'rgba(229, 229, 224, 0.38)',
            }}
          >
            {project.category}
          </p>
          <p
            className="text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 md:text-right"
            style={{
              ...FONT_DISPLAY,
              color: hovered ? 'rgba(229, 229, 224, 0.65)' : 'rgba(229, 229, 224, 0.38)',
            }}
          >
            {project.year}
          </p>
          <p
            className="text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 md:text-right"
            style={{
              ...FONT_DISPLAY,
              color: hovered ? 'rgba(229, 229, 224, 0.65)' : 'rgba(229, 229, 224, 0.38)',
            }}
          >
            {formatIndex(index)}
          </p>
        </div>
      </button>
    </motion.div>
  )
}

const ProjectsGallerySection = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [listHover, setListHover] = useState<{ project: PortfolioProject; index: number } | null>(
    null,
  )
  const [listCursor, setListCursor] = useState({ x: 0, y: 0 })
  const gridSectionRef = useRef<HTMLDivElement>(null)
  const projectsInnerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const panelWidth = useGridPanelWidth(projectsInnerRef)

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
    setListCursor({ x: event.clientX, y: event.clientY })
  }

  const handleListHoverEnd = () => {
    setListHover(null)
  }

  return (
    <section ref={sectionRef} id="projects" className="bg-[#0B0B0A] pt-[8vh] pb-12 text-[#E5E5E0] md:pt-[10vh] md:pb-16">
      <div ref={projectsInnerRef} className="mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              ref={gridSectionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-visible pb-10 pt-12 md:pb-0 md:pt-16 lg:pt-20"
            >
              <WaveGrid sectionRef={gridSectionRef} onSelect={openProject} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {portfolioProjects.map((project, i) => (
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
            </motion.div>
          )}
        </AnimatePresence>

        <ViewToggle
          mode={viewMode}
          onToggle={() => {
            setViewMode((v) => {
              const next = v === 'grid' ? 'list' : 'grid'
              if (next === 'grid') setListHover(null)
              if (next === 'list') {
                setListHover(null)
                requestAnimationFrame(() => {
                  sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
              }
              return next
            })
          }}
        />
      </div>

      <AnimatePresence>
        {viewMode === 'list' && listHover ? (
          <ListCursorPreview
            key={listHover.project.id}
            project={listHover.project}
            index={listHover.index}
            cursor={listCursor}
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
