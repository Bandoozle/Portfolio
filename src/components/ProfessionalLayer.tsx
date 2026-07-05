import { useRef } from 'react'
import HeroScrollIntro from './HeroScrollIntro'
import PortfolioMiddle from './PortfolioMiddle'

const ProfessionalLayer = () => {
  const scrollRef = useRef<HTMLElement>(null)

  return (
    <main ref={scrollRef} className="h-screen overflow-y-auto bg-[#0B0B0A] text-primary">
      <HeroScrollIntro scrollRef={scrollRef} />
      <PortfolioMiddle />
    </main>
  )
}

export default ProfessionalLayer
