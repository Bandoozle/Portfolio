import { motion } from 'framer-motion'
import { type PersonalTab } from './types'
import PersonalHeroVisual from './PersonalHeroVisual'
import PersonalHeroWarningStrip from './PersonalHeroWarningStrip'

const panelTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const journeyMoments = [
  {
    year: 'Origin',
    text: 'Started coding out of curiosity — small scripts, games, and anything that made the machine feel alive.',
  },
  {
    year: 'SFU',
    text: 'Computer Science at Simon Fraser University — depth in AI/ML, systems thinking, and shipping real projects.',
  },
  {
    year: 'Build',
    text: 'Hackathons, coursework, and SFU Blueprint — software for real organizations and tight iteration loops.',
  },
  {
    year: 'Now',
    text: 'Graduated. Building products (including Herd), sharpening ML and full-stack craft, open to what is next.',
  },
]

const mindsetLogs = [
  'I build systems, not just features.',
  'Curiosity drives everything.',
  'I optimize for learning and iteration.',
]

const tabTitle = (tab: PersonalTab): string => {
  switch (tab) {
    case 'about':
      return 'ABOUT ME'
    case 'playlist':
      return 'PLAYLIST'
    case 'bucket':
      return 'BUCKET LIST'
    case 'photos':
      return 'PHOTOS'
    default:
      return tab.toUpperCase()
  }
}

type PanelContentProps = {
  tab: PersonalTab
}

const PanelContent = ({ tab }: PanelContentProps) => {
  const title = tabTitle(tab)

  return (
    <motion.div
      initial={panelTransition.initial}
      animate={panelTransition.animate}
      exit={panelTransition.exit}
      transition={{ duration: 0.12 }}
      className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto p-3 lg:p-5"
    >
      <h2 className="mb-5 text-[22px] uppercase tracking-[0.2em] text-[#ffb000]">&gt; {title}</h2>

      {tab === 'about' && (
        <div className="max-w-2xl space-y-5">
          <p className="text-[22px] leading-relaxed text-[#ffb000]/92">
            I&apos;m Marco, a computer science student who loves building things that live at the intersection of AI,
            systems, and beautiful experiences.
          </p>
          <p className="text-[22px] leading-relaxed text-[#ffb000]/85">
            I&apos;m driven by curiosity, problem solving, and the desire to create impact.
          </p>
          <div className="flex w-full flex-col gap-4">
            <div className="personal-os-border w-full overflow-hidden">
              <PersonalHeroVisual />
            </div>
            <PersonalHeroWarningStrip />
          </div>
        </div>
      )}

      {tab === 'journey' && (
        <ul className="relative max-w-2xl space-y-0 border-l border-[#ffb000]/35 pl-5">
          {journeyMoments.map((m, i) => (
            <li key={i} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[21px] top-1.5 h-2 w-2 bg-[#ffb000]" />
              <p className="text-[18px] uppercase tracking-[0.18em] text-[#ffb000]/45">{m.year}</p>
              <p className="mt-2 text-[22px] leading-relaxed text-[#ffb000]/88">{m.text}</p>
            </li>
          ))}
        </ul>
      )}

      {tab === 'mindset' && (
        <div className="space-y-3">
          {mindsetLogs.map((line, i) => (
            <div key={line} className="personal-os-border bg-black px-4 py-3 text-[22px] text-[#ffb000]/88">
              <span className="text-[#ffb000]/40">[{String(i + 1).padStart(2, '0')}]</span> {line}
            </div>
          ))}
        </div>
      )}

      {tab === 'interests' && (
        <div className="max-w-2xl space-y-4 text-[22px] leading-relaxed text-[#ffb000]/88">
          <p>
            I chase depth in games, sound, movement, flavor, places, and frames — different lenses, same curiosity.
          </p>
          <p className="text-[#ffb000]/65">See the list on the right for the short version.</p>
        </div>
      )}

      {tab === 'playlist' && (
        <p className="max-w-2xl text-[22px] leading-relaxed text-[#ffb000]/88">
          Focus beats, synthwave, and whatever survives the shuffle at 2am — headphones on, world off.
        </p>
      )}

      {tab === 'bucket' && (
        <ul className="max-w-2xl space-y-3 text-[22px] text-[#ffb000]/88">
          <li className="flex gap-3">
            <span className="text-[#ffb000]/40">▸</span>
            Ship something people reach for every week.
          </li>
          <li className="flex gap-3">
            <span className="text-[#ffb000]/40">▸</span>
            See the northern lights with my own eyes.
          </li>
          <li className="flex gap-3">
            <span className="text-[#ffb000]/40">▸</span>
            Give a talk that helps someone take the next step.
          </li>
        </ul>
      )}

      {tab === 'photos' && (
        <div className="flex max-w-3xl flex-col gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="personal-os-border w-full overflow-hidden">
              <PersonalHeroVisual />
            </div>
            <PersonalHeroWarningStrip />
          </div>
          <p className="text-[20px] leading-relaxed text-[#ffb000]/55">
            Same hero treatment as the portfolio home — terminal shader and name.
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default PanelContent
