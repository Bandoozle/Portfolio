import { useRef } from 'react'
import IntroHero from './IntroHero'
import PortfolioMiddle from './PortfolioMiddle'

const ProfessionalLayer = () => {
  const scrollRef = useRef<HTMLElement>(null)

  return (
    <main ref={scrollRef} className="h-[100dvh] overflow-x-clip overflow-y-auto overscroll-y-contain bg-[#0B0B0A] text-primary [-webkit-overflow-scrolling:touch]">
      <IntroHero />
      <PortfolioMiddle />
    </main>
  )
}

export default ProfessionalLayer
