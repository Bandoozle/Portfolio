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

/** Static wave — columns 1 & 3 raised, 2 & 4 lowered */
const waveOffsetClass = (colIndex: number) =>
  colIndex % 2 === 0
    ? '-translate-y-8 md:-translate-y-12 lg:-translate-y-16'
    : 'translate-y-8 md:translate-y-12 lg:translate-y-16'

const useWaveScrollProgress = (sectionRef: RefObject<HTMLElement | null>) => {
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

/** Stable 0–1 value from project id — same panel always gets the same profile. */
const seededUnit = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

type PanelFadeProfile = {
  peak: number
  width: number
  maxOpacity: number
}

const getPanelFadeProfile = (projectId: number): PanelFadeProfile => {
  const r1 = seededUnit(projectId * 17 + 3)
  const r2 = seededUnit(projectId * 41 + 7)
  const r3 = seededUnit(projectId * 59 + 11)

  return {
    peak: 0.1 + r1 * 0.8,
    width: 0.12 + r2 * 0.24,
    maxOpacity: 0.78 + r3 * 0.22,
  }
}

const panelFadeProfiles = new Map(portfolioProjects.map((project) => [project.id, getPanelFadeProfile(project.id)]))

const MIN_PANEL_OPACITY = 0.32

const imagePanelOpacity = (progress: MotionValue<number>, projectId: number) => {
  const profile = panelFadeProfiles.get(projectId) ?? getPanelFadeProfile(projectId)

  return useTransform(progress, (p) => {
    const dist = Math.abs(p - profile.peak)
    const linear = Math.max(0, 1 - dist / profile.width)
    const smooth = linear * linear * (3 - 2 * linear)
    return MIN_PANEL_OPACITY + smooth * (profile.maxOpacity - MIN_PANEL_OPACITY)
  })
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
  <div className="flex justify-center pt-16 md:pt-20">
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
  imageOpacity,
  className = '',
}: {
  project: PortfolioProject
  index: number
  imageOpacity: MotionValue<number>
  className?: string
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const imageFit = project.imageFit ?? 'cover'

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
    <motion.div
      ref={panelRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        opacity: imageOpacity,
        ...(!project.image
          ? { backgroundColor: PLACEHOLDER_TINTS[index % PLACEHOLDER_TINTS.length] }
          : undefined),
      }}
      className={`relative isolate overflow-hidden bg-[#191816] ${GRID_IMAGE_CLASS} ${className}`}
    >
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className={`relative z-0 h-full w-full ${imageFit === 'contain' ? 'object-contain object-center' : 'object-cover object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
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
    </motion.div>
  )
}

const GridProjectCard = ({
  project,
  index,
  imageOpacity,
  onSelect,
}: {
  project: PortfolioProject
  index: number
  imageOpacity: MotionValue<number>
  onSelect: (id: number) => void
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
      className="group min-w-0"
    >
      <button
        type="button"
        onClick={() => onSelect(project.id)}
        className="block w-full min-w-0 cursor-pointer px-0.5 text-left"
      >
        <ProjectImage project={project} index={index} imageOpacity={imageOpacity} />
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
      </button>
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
        {items.map(({ project, index }, cardIndex) => (
          <WaveGridCard
            key={project.id}
            project={project}
            index={index}
            colIndex={colIndex}
            cardIndex={cardIndex}
            scrollProgress={scrollProgress}
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
  colIndex,
  cardIndex,
  scrollProgress,
  onSelect,
}: {
  project: PortfolioProject
  index: number
  colIndex: number
  cardIndex: number
  scrollProgress: MotionValue<number>
  onSelect: (id: number) => void
}) => {
  const imageOpacity = imagePanelOpacity(scrollProgress, project.id)

  return (
    <GridProjectCard
      project={project}
      index={index}
      imageOpacity={imageOpacity}
      onSelect={onSelect}
    />
  )
}

const WaveGrid = ({
  sectionRef,
  onSelect,
}: {
  sectionRef: RefObject<HTMLElement | null>
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

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => [] as { project: PortfolioProject; index: number }[])
    portfolioProjects.forEach((project, index) => {
      cols[index % columnCount].push({ project, index })
    })
    return cols
  }, [columnCount])

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

const ListProjectRow = ({
  project,
  index,
  onSelect,
}: {
  project: PortfolioProject
  index: number
  onSelect: (id: number) => void
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
        <div className="flex shrink-0 items-baseline gap-4 sm:ml-auto md:contents">
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
  const gridSectionRef = useRef<HTMLElement>(null)

  const selectedProject =
    selectedProjectId !== null
      ? portfolioProjects.find((project) => project.id === selectedProjectId) ?? null
      : null

  const openProject = (id: number) => setSelectedProjectId(id)
  const closeProject = () => setSelectedProjectId(null)

  return (
    <section id="projects" className="bg-[#0B0B0A] py-[10vh] text-[#E5E5E0] md:py-[12vh]">
      <div className="mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              ref={gridSectionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-visible pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
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
                <ListProjectRow key={project.id} project={project} index={i} onSelect={openProject} />
              ))}
              <ListRule />
            </motion.div>
          )}
        </AnimatePresence>

        <ViewToggle mode={viewMode} onToggle={() => setViewMode((v) => (v === 'grid' ? 'list' : 'grid'))} />
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailView key={selectedProject.id} project={selectedProject} onClose={closeProject} />
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsGallerySection
