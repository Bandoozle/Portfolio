import { Check, Github } from 'lucide-react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { portfolioProjects, type PortfolioProject } from '../data/portfolioProjects'
import CircularGallery from './CircularGallery'
import HeroScrollIntro from './HeroScrollIntro'

interface ProfessionalLayerProps {
  onEnterRetro: () => void
}

interface StyledTextSegment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: StyledTextSegment[]
  className?: string
}

interface AnimatedLetterProps {
  letter: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}

type ScrollContainerRef = React.RefObject<HTMLElement | null>

interface SkillCategory {
  title: string
  tagline: string
  number: string
  items: string[]
}

const featureVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4'

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    tagline: 'Programming Languages',
    number: '01',
    items: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Java', 'C++'],
  },
  {
    title: 'ML & Data',
    tagline: 'Machine Learning & Data',
    number: '02',
    items: ['PyTorch', 'TensorFlow', 'NumPy', 'Pandas'],
  },
  {
    title: 'Frontend',
    tagline: 'Frontend & UI',
    number: '03',
    items: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    title: 'Backend',
    tagline: 'Backend & DevOps',
    number: '04',
    items: ['FastAPI', 'Docker', 'Vercel', 'Render'],
  },
  {
    title: 'Databases',
    tagline: 'Data Storage',
    number: '05',
    items: ['PostgreSQL', 'Firestore', 'Convex'],
  },
]

const glitchFragments = [
  { left: '8%', top: '18%', width: '18%', delay: 0 },
  { left: '64%', top: '14%', width: '22%', delay: 0.08 },
  { left: '18%', top: '62%', width: '16%', delay: 0.16 },
  { left: '72%', top: '58%', width: '19%', delay: 0.24 },
  { left: '42%', top: '38%', width: '14%', delay: 0.32 },
]

const WordsPullUpMultiStyle = ({ segments, className = '' }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })
  const words = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({
      word,
      className: segment.className ?? '',
    })),
  )

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map(({ word, className: wordClassName }, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.75,
            delay: index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`mr-[0.22em] inline-block ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

const AnimatedLetter = ({ letter, index, total, scrollYProgress }: AnimatedLetterProps) => {
  const charProgress = index / total
  const opacity = useTransform(scrollYProgress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])

  return (
    <motion.span style={{ opacity }}>
      {letter}
    </motion.span>
  )
}

const AnimatedParagraph = ({
  text,
  containerRef,
}: {
  text: string
  containerRef: ScrollContainerRef
}) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const chars = Array.from(text)

  return (
    <p ref={ref} className="mx-auto mt-9 max-w-[34rem] whitespace-normal px-4 text-center text-xs leading-5 text-[#DEDBC8] sm:text-sm sm:leading-6 md:text-sm md:leading-6">
      {chars.map((letter, index) => (
        <AnimatedLetter
          key={`${letter}-${index}`}
          letter={letter}
          index={index}
          total={chars.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  )
}

const SkillCard = ({ skill, index }: { skill: SkillCategory; index: number }) => (
  <motion.article
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="flex h-full min-h-[360px] flex-col justify-between bg-[#212121] p-5 sm:p-6"
  >
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-primary/45">
        {skill.tagline}
      </p>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-normal leading-tight text-primary sm:text-3xl">
          {skill.title}.
        </h3>
        <span className="text-sm text-gray-500">{skill.number}</span>
      </div>
    </div>

    <div className="mt-10 space-y-3">
      {skill.items.map((item) => (
        <div key={item} className="flex gap-3 text-sm leading-5 text-gray-400">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div className="mt-10 text-[10px] uppercase tracking-[0.22em] text-primary/40">
      Toolkit / {skill.number}
    </div>
  </motion.article>
)

const ProjectDetailPanel = ({
  project,
  index,
  total,
  density = 'comfortable',
}: {
  project: PortfolioProject
  index: number
  total: number
  density?: 'comfortable' | 'compact'
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={`flex h-full flex-col border-0 bg-[#0a0a0a] p-6 sm:p-8 lg:min-h-full ${
      density === 'compact' ? 'min-h-0 md:min-h-[280px]' : 'min-h-[400px] md:min-h-[480px]'
    }`}
  >
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#E1E0CC]/12 pb-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/40">
          {String(index + 1).padStart(3, '0')} / {String(total).padStart(3, '0')} — case file
        </p>
        <h3 className="mt-2 text-2xl font-normal leading-tight text-primary sm:text-3xl md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary/50">{project.tagline}</p>
      </div>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#E1E0CC]/25 bg-black px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      )}
    </div>

    <div className="mb-6 flex flex-wrap gap-2">
      {project.stack.map((tech) => (
        <span
          key={tech}
          className="border border-[#E1E0CC]/15 bg-black px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary/70"
        >
          {tech}
        </span>
      ))}
    </div>

    <div className="grid flex-1 gap-8 sm:grid-cols-1 lg:grid-cols-2 lg:gap-10">
      <div className="space-y-3">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/35">Problem</h4>
        <p className="text-sm leading-relaxed text-primary/65">{project.problem}</p>
      </div>
      <div className="space-y-3">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/35">Solution</h4>
        <p className="text-sm leading-relaxed text-primary/65">{project.solution}</p>
      </div>
      <div className="space-y-3 lg:col-span-2">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/35">Contribution</h4>
        <p className="text-sm leading-relaxed text-primary/65">{project.contribution}</p>
      </div>
      <div className="space-y-3 lg:col-span-2">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/35">Outcome</h4>
        <p className="text-sm leading-relaxed text-primary/65">{project.result}</p>
      </div>
    </div>

    <div className="mt-8 hidden border-t border-[#E1E0CC]/10 pt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-primary/25 sm:block">
      Marco Areliano Suteja — portfolio index
    </div>
  </motion.div>
)

const ProjectsCatalogSection = () => {
  const [selected, setSelected] = useState(0)
  const [layout, setLayout] = useState<'column' | 'list'>('column')
  const project = portfolioProjects[selected]
  const tabStripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (layout !== 'list') return
    const el = tabStripRef.current?.querySelector<HTMLButtonElement>(`[data-tab-index="${selected}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [selected, layout])

  return (
    <section id="projects" className="relative border-t border-[#E1E0CC]/10 bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mx-auto max-w-4xl text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Selected work — systems, research, and products.', className: 'text-primary' },
                { text: 'Pick an index to open the case file.', className: 'text-gray-500' },
              ]}
            />
          </h2>
        </div>

        <div className="border border-[#E1E0CC]/25 bg-[#101010]">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E1E0CC]/20 p-3 sm:p-4">
            <button
              type="button"
              onClick={() => setLayout('column')}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                layout === 'column'
                  ? 'bg-primary text-black'
                  : 'border border-[#E1E0CC]/25 text-primary/55 hover:text-primary/85'
              }`}
            >
              Column
            </button>
            <button
              type="button"
              onClick={() => setLayout('list')}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                layout === 'list'
                  ? 'bg-primary text-black'
                  : 'border border-[#E1E0CC]/25 text-primary/55 hover:text-primary/85'
              }`}
            >
              List
            </button>
            {layout === 'list' && (
              <p className="ml-1 w-full pl-0 text-[9px] font-mono uppercase tracking-[0.2em] text-primary/35 sm:ml-auto sm:w-auto sm:pl-3">
                Scroll tabs · case file below
              </p>
            )}
          </div>

          {layout === 'column' ? (
            <div className="flex min-h-0 flex-col lg:min-h-[520px] lg:flex-row">
              <aside className="border-b border-[#E1E0CC]/20 p-4 sm:p-6 lg:w-[32%] lg:shrink-0 lg:border-b-0 lg:border-r">
                <nav className="flex flex-col" aria-label="Projects index">
                  {portfolioProjects.map((p, i) => {
                    const isActive = i === selected
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelected(i)}
                        className={`w-full border-b border-[#E1E0CC]/10 py-3.5 pl-1 pr-2 text-left font-mono text-[10px] uppercase leading-snug tracking-[0.12em] transition-colors sm:text-[11px] ${
                          isActive
                            ? 'border-t border-b border-[#E1E0CC]/60 bg-primary/[0.04] text-primary'
                            : 'text-primary/38 hover:text-primary/60'
                        }`}
                      >
                        <span className={isActive ? 'text-primary/90' : 'text-primary/35'}>
                          {String(i + 1).padStart(3, '0')}
                        </span>{' '}
                        {p.navLabel}
                      </button>
                    )
                  })}
                </nav>
              </aside>

              <div className="min-w-0 flex-1">
                <ProjectDetailPanel
                  key={project.id}
                  project={project}
                  index={selected}
                  total={portfolioProjects.length}
                  density="comfortable"
                />
              </div>
            </div>
          ) : (
            <>
              <div
                ref={tabStripRef}
                role="tablist"
                aria-label="Projects"
                className="projects-tab-strip flex snap-x snap-mandatory gap-px overflow-x-auto overflow-y-hidden border-b border-[#E1E0CC]/15 bg-[#080808] px-2 pt-2"
              >
                {portfolioProjects.map((p, i) => {
                  const isActive = i === selected
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      id={`project-tab-${p.id}`}
                      data-tab-index={i}
                      title={`${String(i + 1).padStart(3, '0')} ${p.title}`}
                      onClick={() => setSelected(i)}
                      className={`relative shrink-0 snap-start border border-b-0 px-2 py-1.5 text-left font-mono transition-colors sm:px-3 sm:py-2 ${
                        isActive
                          ? 'z-[1] border-[#E1E0CC]/45 bg-[#0a0a0a] text-primary'
                          : 'border-[#E1E0CC]/10 bg-[#141414] text-primary/45 hover:bg-[#1a1a1a] hover:text-primary/75'
                      }`}
                    >
                      <span className="block text-[8px] uppercase tracking-[0.22em] text-primary/40">
                        {String(i + 1).padStart(3, '0')}
                      </span>
                      <span className="mt-0.5 block max-w-[6.5rem] truncate text-[9px] uppercase leading-tight tracking-[0.08em] sm:max-w-[8.5rem] sm:text-[10px]">
                        {p.navLabel}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div
                className="min-w-0"
                role="tabpanel"
                aria-labelledby={`project-tab-${project.id}`}
              >
                <ProjectDetailPanel
                  key={project.id}
                  project={project}
                  index={selected}
                  total={portfolioProjects.length}
                  density="compact"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

const RealityBreak = ({
  onEnterRetro,
  containerRef,
}: ProfessionalLayerProps & { containerRef: ScrollContainerRef }) => {
  const ref = useRef<HTMLElement>(null)
  const enteredRef = useRef(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start end', 'end start'],
  })

  const cleanOpacity = useTransform(scrollYProgress, [0.1, 0.36, 0.62], [1, 0.8, 0.12])
  const gridOpacity = useTransform(scrollYProgress, [0.22, 0.48, 0.7], [0, 0.42, 1])
  const tearScale = useTransform(scrollYProgress, [0.2, 0.72], [0.92, 1.08])
  const tearOpacity = useTransform(scrollYProgress, [0.18, 0.46, 0.74], [0, 0.52, 1])
  const scanY = useTransform(scrollYProgress, [0.2, 0.78], ['-45%', '115%'])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.6 && !enteredRef.current) {
      enteredRef.current = true
      window.setTimeout(onEnterRetro, 500)
    }
  })

  return (
    <section ref={ref} id="reality-break" className="relative min-h-[160vh] overflow-hidden bg-black">
      <div
        role="button"
        tabIndex={0}
        onClick={onEnterRetro}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onEnterRetro()
          }
        }}
        aria-label="Break into retro mode"
        className="sticky top-0 flex h-screen w-full cursor-pointer items-center justify-center px-6"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage:
              'linear-gradient(rgba(233,165,63,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(233,165,63,0.28) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,165,63,0.28),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.8))]"
          style={{ opacity: gridOpacity }}
        />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl text-center"
          style={{ opacity: cleanOpacity }}
        >
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-primary/45 sm:text-xs">
            Keep scrolling
          </p>
          <h2 className="text-4xl leading-[0.92] tracking-[-0.05em] text-primary sm:text-6xl md:text-7xl lg:text-8xl">
            The clean layer cannot hold forever.
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-sm leading-6 text-primary/55">
            Under the polished surface is a stranger, louder system. Scroll through the fracture to
            enter the retro portfolio.
          </p>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[58vh] w-[72vw] -translate-x-1/2 -translate-y-1/2 border border-[#E9A53F]/50 bg-black/30 shadow-[0_0_120px_rgba(233,165,63,0.38)]"
          style={{ opacity: tearOpacity, scale: tearScale }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(233,165,63,0.18)_0px,rgba(233,165,63,0.18)_1px,transparent_1px,transparent_5px)]" />
          <motion.div
            className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#E9A53F]/40 to-transparent blur-sm"
            style={{ top: scanY }}
          />
          <div className="absolute inset-x-8 top-1/2 h-px bg-[#E9A53F]/80 shadow-[0_0_34px_rgba(233,165,63,0.95)]" />
          <div className="absolute inset-y-8 left-1/2 w-px bg-[#E9A53F]/60 shadow-[0_0_34px_rgba(233,165,63,0.8)]" />
        </motion.div>

        {glitchFragments.map((fragment, index) => (
          <motion.div
            key={index}
            aria-hidden="true"
            className="pointer-events-none absolute z-30 h-12 border border-[#E9A53F]/40 bg-[#E9A53F]/15 backdrop-invert"
            style={{
              left: fragment.left,
              top: fragment.top,
              width: fragment.width,
              opacity: tearOpacity,
            }}
            animate={{ x: [0, index % 2 === 0 ? 18 : -18, 0], opacity: [0.2, 0.9, 0.35] }}
            transition={{
              duration: 0.32,
              delay: fragment.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.p
          className="absolute bottom-10 left-1/2 z-40 -translate-x-1/2 text-center text-xs uppercase tracking-[0.28em] text-[#E9A53F]"
          style={{ opacity: tearOpacity }}
        >
          Reality break detected — keep scrolling or tap to enter
        </motion.p>
      </div>
    </section>
  )
}

const ProfessionalLayer = ({ onEnterRetro }: ProfessionalLayerProps) => {
  const scrollRef = useRef<HTMLElement>(null)

  return (
    <main ref={scrollRef} className="h-screen overflow-y-auto bg-black text-primary">
      <HeroScrollIntro scrollRef={scrollRef} />

      <section id="about" className="bg-black px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl overflow-hidden bg-[#101010] px-6 py-16 text-center sm:px-10 md:py-24">
          <p className="mb-8 text-[10px] text-primary sm:text-xs">Personal portfolio</p>
          <h2
            className="mx-auto max-w-4xl text-3xl leading-[1] sm:text-4xl sm:leading-[0.98] md:text-5xl lg:text-6xl xl:text-6xl"
            style={{ color: '#E1E0CC' }}
          >
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Marco Areliano Suteja,', className: 'font-normal' },
                { text: 'a builder of intelligent products.', className: 'instrument-serif-italic' },
                {
                  text: 'I work across machine learning, full-stack development, and product-focused user experiences.',
                  className: 'font-normal',
                },
              ]}
            />
          </h2>
          <AnimatedParagraph
            text="I am a Computer Science graduate from Simon Fraser University specializing in AI and Machine Learning. My work spans medical imaging models, real-time interpretation tools, meeting assistants, UAV pathfinding, collaborative apps, and software for non-profit organizations through SFU Blueprint."
            containerRef={scrollRef}
          />
        </div>
      </section>

      <section id="skills" className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-4xl text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
              <WordsPullUpMultiStyle
                segments={[
                  { text: 'A toolkit shaped by years of AI, full-stack, and product work.', className: 'text-primary' },
                  { text: 'Languages, frameworks, and platforms I reach for.', className: 'text-gray-500' },
                ]}
              />
            </h2>
          </div>

          <CircularGallery itemWidth={340} gap={16} scrollSpeed={2} scrollEase={0.06} height={480}>
            <motion.article
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full min-h-[360px] overflow-hidden bg-[#212121]"
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={featureVideo}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-3xl leading-none sm:text-4xl" style={{ color: '#E1E0CC' }}>
                Building intelligence into experience.
              </p>
            </motion.article>

            {skillCategories.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index + 1} />
            ))}
          </CircularGallery>

          <p className="mt-8 text-center text-[10px] uppercase tracking-[0.28em] text-primary/45 sm:text-xs">
            Drag, swipe, or trackpad-swipe to explore
          </p>
        </div>
      </section>

      <ProjectsCatalogSection />

      <RealityBreak onEnterRetro={onEnterRetro} containerRef={scrollRef} />
    </main>
  )
}

export default ProfessionalLayer
