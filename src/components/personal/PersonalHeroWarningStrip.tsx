const WARNING_LINES: { text: string; flickerClass: string }[] = [
  { text: '[!] SYSTEM: DISPLAY UNSTABLE', flickerClass: 'personal-hero-warning-line--a' },
  { text: 'WARN: VIDEO SYNC LOST', flickerClass: 'personal-hero-warning-line--b' },
  { text: 'ERR_SIGNAL — FLICKER_DETECTED', flickerClass: 'personal-hero-warning-line--c' },
  { text: '>>> BUFFER UNDERRUN (recovering)', flickerClass: 'personal-hero-warning-line--d' },
  { text: 'CHECKSUM 0xE4B2 ▒▒ MISMATCH', flickerClass: 'personal-hero-warning-line--e' },
]

/** Full-width banner below PersonalHeroVisual — faulty-terminal warnings */
const PersonalHeroWarningStrip = () => (
  <aside className="personal-hero-warning w-full" aria-hidden>
    <div className="personal-hero-warning-inner">
      {WARNING_LINES.map(({ text, flickerClass }) => (
        <span key={text} className={`personal-hero-warning-line ${flickerClass}`}>
          {text}
        </span>
      ))}
    </div>
  </aside>
)

export default PersonalHeroWarningStrip
