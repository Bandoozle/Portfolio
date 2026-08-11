import { useRef } from 'react'
import IntroHero from './IntroHero'
import ExperienceSection from './ExperienceSection'
import { CtaSection, FaqSection } from './PortfolioMiddle'
import ProjectsGallerySection from './ProjectsGallerySection'
import { cssBg, cssInk } from '../theme/palette'

const ProfessionalLayer = () => {
  const scrollRef = useRef<HTMLElement>(null)

  return (
    <div
      data-main
      className="relative z-[2] h-[100dvh] w-full"
      style={{ backgroundColor: cssBg, color: cssInk }}
    >
      <main
        ref={scrollRef}
        className="h-full overflow-x-clip overflow-y-auto overscroll-y-contain scroll-pt-24 pb-[3.75rem] [-webkit-overflow-scrolling:touch] sm:pb-0 sm:scroll-pt-28"
        style={{ backgroundColor: cssBg, color: cssInk }}
      >
        <IntroHero />
        <ProjectsGallerySection />
        <ExperienceSection />
        <FaqSection />
        <CtaSection />
      </main>
    </div>
  )
}

export default ProfessionalLayer
