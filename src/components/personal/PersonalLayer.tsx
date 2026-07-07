import { ArrowLeft } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import PanelContent from './PanelContent'
import PersonalSidebar from './PersonalSidebar'
import PersonalRightColumn from './PersonalRightColumn'
import { type PersonalTab } from './types'
import './personal-os.css'

type PersonalLayerProps = {
  onBackToProfessional?: () => void
}

/** Retro-mode identity dashboard — fixed three-column layout matching Personal.OS mockup. */
const PersonalLayer = ({ onBackToProfessional }: PersonalLayerProps) => {
  const [active, setActive] = useState<PersonalTab>('about')
  const [clock, setClock] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const timeStr = clock.toLocaleTimeString('en-GB', { hour12: false })

  const handleBack = () => {
    if (onBackToProfessional) {
      onBackToProfessional()
      return
    }

    const url = new URL(window.location.href)
    url.searchParams.delete('layer')
    window.location.assign(`${url.pathname}${url.search}${url.hash}`)
  }

  return (
    <section
      className="personal-os-root personal-os-shell relative z-0 flex h-full min-h-0 w-full flex-col overflow-hidden"
      aria-label="Personal identity dashboard"
    >
      <header className="personal-os-chrome relative z-10 flex shrink-0 items-center justify-between gap-3 pl-5 pr-5 pt-4 pb-3 sm:gap-4 sm:pl-7 sm:pr-7 sm:pt-5 sm:pb-3.5">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="personal-os-back-btn shrink-0"
            aria-label="Back to professional portfolio"
          >
            <ArrowLeft className="personal-os-back-btn__icon" strokeWidth={2} aria-hidden />
          </button>
          <div className="truncate text-[22px] uppercase tracking-[0.14em] text-[#ffb000]">@ PERSONAL.OS</div>
        </div>
        <time className="text-[22px] tabular-nums text-[#ffb000]" dateTime={clock.toISOString()}>
          {timeStr}
        </time>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col p-2 sm:p-3">
        <div className="personal-os-frame flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-[#ffb000] lg:grid-cols-[minmax(200px,240px)_minmax(0,1fr)_minmax(200px,240px)] lg:divide-x lg:divide-y-0">
            <PersonalSidebar active={active} onSelect={setActive} />
            <main className="flex min-h-0 min-w-0 flex-col bg-black">
              <AnimatePresence mode="wait">
                <PanelContent key={active} tab={active} />
              </AnimatePresence>
            </main>
            <PersonalRightColumn />
          </div>
        </div>
      </div>

      <footer className="personal-os-footer-bar relative z-10 flex shrink-0 flex-wrap items-center gap-3 px-3 py-2 sm:px-4">
        <p className="text-[18px] uppercase tracking-[0.12em] text-[#ffb000]/65">STATUS: BUILDING MY LEGACY...</p>
        <div className="flex min-w-[120px] flex-1 items-center justify-center px-2">
          <div className="personal-os-progress-track h-1 w-full max-w-md" aria-hidden>
            <div className="personal-os-progress-fill" />
          </div>
        </div>
        <span className="text-[22px] tabular-nums text-[#ffb000]/85">34%</span>
      </footer>
    </section>
  )
}

export default PersonalLayer
