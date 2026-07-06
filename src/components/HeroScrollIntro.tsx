import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { portfolioProjects } from '../data/portfolioProjects'
import PortfolioPill from './PortfolioPill'

type HeroScrollIntroProps = {
  scrollRef: React.RefObject<HTMLElement | null>
}

const FONT_DISPLAY = {
  fontFamily: "'Roboto Flex', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const FONT_BODY = {
  fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

const EASE = [0.22, 1, 0.36, 1] as const

const heroTitles = ['Marco Suteja', 'Full-Stack Developer'] as const

const heroStats = [
  { value: '2024', label: 'SFU CS graduate' },
  { value: `${portfolioProjects.length}+`, label: 'projects shipped' },
] as const

const introStats = [
  { value: `${portfolioProjects.length}+`, label: 'Projects delivered' },
  { value: 'ML + Web', label: 'Core focus areas' },
  { value: 'SFU', label: 'Computer Science' },
] as const

const HeroTitleRotator = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroTitles.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[clamp(4.5rem,14vw,11rem)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={heroTitles[index]}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="absolute inset-x-0 top-0 text-[clamp(3.5rem,13vw,10rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-[#0B0B0A]"
          style={FONT_DISPLAY}
        >
          {heroTitles[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}

const HeroScrollIntro = (_props: HeroScrollIntroProps) => {
  return (
    <div id="hero" className="bg-[#E5E5E0] text-[#0B0B0A]">
      {/* ── Nexola-style hero viewport ── */}
      <section className="relative flex min-h-[100dvh] flex-col px-3 sm:px-4 md:px-5 lg:px-6" aria-label="Portfolio introduction">
        <header className="flex items-center justify-between gap-4 pt-6 md:pt-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#0B0B0A]" style={FONT_DISPLAY}>
            Marco Suteja®
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden items-center gap-2 sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0B0B0A]/25" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0B0B0A]" />
              </span>
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#0B0B0A]/55" style={FONT_DISPLAY}>
                Available for work
              </span>
            </span>
            <PortfolioPill href="#projects" size="md" variant="primary" showArrow>
              View projects
            </PortfolioPill>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center pb-16 pt-10 md:pb-20 md:pt-14">
          <HeroTitleRotator />

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-8 md:mt-14 md:gap-12">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-none tracking-[-0.03em] text-[#0B0B0A]"
                  style={FONT_DISPLAY}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.12em] text-[#0B0B0A]/45" style={FONT_BODY}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
            <PortfolioPill href="#projects" size="md" variant="primary" showArrow>
              View projects
            </PortfolioPill>
            <PortfolioPill
              href="https://linkedin.com/in/marcosuteja"
              target="_blank"
              rel="noreferrer"
              size="md"
              variant="outline"
              showArrow
            >
              Book a call
            </PortfolioPill>
          </div>
        </div>

        <div className="overflow-hidden border-t border-solid py-5" style={{ borderColor: 'rgba(11, 11, 10, 0.08)' }}>
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="mx-6 text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[#0B0B0A]/[0.06]"
                    style={FONT_DISPLAY}
                  >
                    Marco Suteja
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nexola-style introduction block ── */}
      <section className="border-t border-solid px-3 py-[12vh] sm:px-4 md:px-5 md:py-[14vh] lg:px-6" style={{ borderColor: 'rgba(11, 11, 10, 0.08)' }}>
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(280px,36%)] lg:gap-20">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#0B0B0A]/40" style={FONT_DISPLAY}>
              Introduction
            </p>

            <h2
              className="mt-5 max-w-[18ch] text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#0B0B0A]"
              style={FONT_DISPLAY}
            >
              Full-stack developer focused on systems that ship.
            </h2>

            <blockquote className="instrument-serif-italic mt-8 max-w-[42ch] text-[1.05rem] leading-[1.6] text-[#0B0B0A]/62 md:text-[1.15rem]">
              &ldquo;Great software shouldn&apos;t just work — it should solve real problems with clarity,
              performance, and intent.&rdquo;
            </blockquote>

            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-solid pt-10 sm:grid-cols-3 sm:gap-6" style={{ borderColor: 'rgba(11, 11, 10, 0.08)' }}>
              {introStats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-none tracking-[-0.02em] text-[#0B0B0A]"
                    style={FONT_DISPLAY}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-[#0B0B0A]/42" style={FONT_BODY}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:items-end">
            <div className="w-full max-w-[320px] overflow-hidden bg-[#191816] lg:ml-auto">
              <img src="/hero_marco.png" alt="Marco Suteja" className="aspect-[4/5] w-full object-cover object-top" />
            </div>

            <div className="lg:text-right">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#0B0B0A]/40" style={FONT_DISPLAY}>
                Marco Suteja
              </p>
              <p className="mt-1 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[#0B0B0A]" style={FONT_DISPLAY}>
                Full-Stack Developer
              </p>
              <p className="mt-4 max-w-[28ch] text-[0.88rem] leading-[1.65] text-[#0B0B0A]/58 lg:ml-auto" style={FONT_BODY}>
                Burnaby, BC — open to full-time roles, remote work, and relocation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroScrollIntro
