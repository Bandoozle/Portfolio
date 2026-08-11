/** Site color system — warm white / charcoal + orange accent */
export const palette = {
  bg: '#F4F4F4',
  text: '#201D1D',
  border: '#E0E0E0',
  /** Soft gray for rounded content containers (About, FAQ, Contact, etc.) */
  surface: '#eaeaea',
  /** Accent for links, buttons, and small interactive pops */
  accent: '#f15720',
} as const

export const SITE_BG = palette.bg
export const SITE_INK = palette.text
export const SITE_BORDER = palette.border
export const SITE_SURFACE = palette.surface
export const SITE_ACCENT = palette.accent

export const cssBg = 'var(--site-bg)'
export const cssInk = 'var(--site-ink)'
export const cssBorder = 'var(--site-border)'
export const cssSurface = 'var(--site-surface)'
export const cssAccent = 'var(--site-accent)'
