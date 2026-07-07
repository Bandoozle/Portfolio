import { motion } from 'framer-motion'
import { useEffect } from 'react'
import type { PortfolioProject } from '../data/portfolioProjects'
import ProjectTechStack from './ProjectTechStack'

const FONT_DISPLAY = {
  fontFamily: "'Roboto Flex', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const FONT_BODY = {
  fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const EASE = [0.22, 1, 0.36, 1] as const

type ProjectDetailViewProps = {
  project: PortfolioProject
  onClose: () => void
}

const ProjectDetailView = ({ project, onClose }: ProjectDetailViewProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const main = document.querySelector('main')
    const prevOverflow = main?.style.overflow ?? ''
    if (main) main.style.overflow = 'hidden'

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (main) main.style.overflow = prevOverflow
    }
  }, [onClose])

  const hasMedia = Boolean(project.video || project.image)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[120] flex items-end justify-center bg-[#0B0B0A]/92 pt-[min(14vh,4.5rem)] sm:items-center sm:p-4 sm:pt-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex max-h-full w-full max-w-[1100px] flex-col overflow-hidden rounded-t-[6px] bg-[#191816] text-[#E5E5E0] sm:max-h-[88vh] sm:rounded-[4px]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-3 border-b border-[#E5E5E0]/10 bg-[#191816] px-4 py-3 sm:absolute sm:inset-x-0 sm:top-0 sm:z-10 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
          <p
            className="min-w-0 truncate text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#E5E5E0]/40 sm:hidden"
            style={FONT_DISPLAY}
          >
            {project.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-11 min-w-[2.75rem] shrink-0 items-center justify-center gap-2 rounded-[3px] border border-solid px-3 text-[#E5E5E0]/70 transition-colors duration-200 hover:border-[#E5E5E0]/40 hover:text-[#E5E5E0] sm:absolute sm:right-4 sm:top-4 sm:px-0"
            style={{ borderColor: 'rgba(229, 229, 224, 0.15)' }}
            aria-label="Close project details"
          >
            <span className="text-xl leading-none" aria-hidden>
              ×
            </span>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] sm:hidden" style={FONT_DISPLAY}>
              Close
            </span>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-stretch">
            <div
              className={`relative flex items-center justify-center bg-[#0B0B0A] ${
                hasMedia ? 'min-h-[180px] sm:min-h-[280px]' : 'min-h-[180px] sm:min-h-[280px] md:min-h-full'
              }`}
              style={!hasMedia ? { backgroundColor: '#161614' } : undefined}
            >
              {project.video ? (
                <video
                  src={project.video}
                  className="max-h-[34dvh] w-full object-contain sm:max-h-[50vh] md:max-h-full"
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
                  className="max-h-[34dvh] w-full object-contain sm:max-h-[50vh] md:max-h-full"
                />
              ) : (
                <div className="flex h-full min-h-[180px] items-end p-6 md:min-h-full">
                  <p
                    className="text-[0.65rem] uppercase tracking-[0.2em] text-[#E5E5E0]/25"
                    style={FONT_DISPLAY}
                  >
                    {project.category}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 p-6 md:p-8 lg:p-10">
            <div>
              <p
                className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#E5E5E0]/40"
                style={FONT_DISPLAY}
              >
                {project.year} · {project.category}
              </p>
              <h2
                id="project-detail-title"
                className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold uppercase leading-[0.94] tracking-[-0.02em] text-[#E5E5E0]"
                style={FONT_DISPLAY}
              >
                {project.title}
              </h2>
              <p
                className="mt-2 text-[0.95rem] font-medium leading-snug text-[#E5E5E0]/65"
                style={FONT_BODY}
              >
                {project.subtitle}
              </p>
            </div>

            <ProjectTechStack stack={project.stack} variant="dark" />

            <p className="text-[0.95rem] leading-[1.75] text-[#E5E5E0]/60" style={FONT_BODY}>
              {project.description}
            </p>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 border border-solid px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#E5E5E0] transition-colors duration-200 hover:bg-[#E5E5E0]/[0.06]"
                style={{ ...FONT_DISPLAY, borderColor: 'rgba(229, 229, 224, 0.2)' }}
              >
                View on GitHub
                <span aria-hidden>↗</span>
              </a>
            ) : null}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default ProjectDetailView
