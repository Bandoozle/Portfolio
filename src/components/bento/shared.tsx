/**
 * Shared primitives for the "What I Do" bento illustrations.
 * Palette, patterns, and pointer helpers.
 */

export const C = {
  ink: '#201D1D',
  cream: '#FFF8EC',
  paper: '#FFFDF8',
  orange: '#FF8A57',
  orangeDeep: '#F15720',
  pink: '#F8A9D2',
  pinkDeep: '#EE6FB0',
  yellow: '#FFC83A',
  yellowSoft: '#FFE08A',
  purple: '#A68CF2',
  purpleDeep: '#6840FF',
  lilac: '#D8CBFF',
  blue: '#4C7DF0',
  sky: '#9FD3FF',
  mint: '#7FDDB4',
  plum: '#2C2433',
} as const

/** Thin outline weight used across every illustration (viewBox units). */
export const SW = 1.6

/** Soft, damped springs shared by the illustrations. */
export const SPRING_SOFT = { type: 'spring', stiffness: 130, damping: 17, mass: 0.9 } as const
export const SPRING_SNAP = { type: 'spring', stiffness: 260, damping: 22, mass: 0.7 } as const
export const SPRING_LOOSE = { type: 'spring', stiffness: 90, damping: 14, mass: 1 } as const
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export type ArtProps = {
  /** Entrance finished — illustration may settle into place. */
  ready: boolean
  /** Section is in the viewport — ambient motion may run. */
  running: boolean
  /** Pointer (mouse) is over the card. */
  hovered: boolean
  /** Compact (mobile) composition. */
  compact: boolean
  reduceMotion: boolean
}

/** Checkerboard pattern tile. `s` is the size of one square. */
export const CheckerPattern = ({
  id,
  s = 6,
  a,
  b,
}: {
  id: string
  s?: number
  a: string
  b: string
}) => (
  <pattern id={id} width={s * 2} height={s * 2} patternUnits="userSpaceOnUse">
    <rect width={s * 2} height={s * 2} fill={a} />
    <rect width={s} height={s} fill={b} />
    <rect x={s} y={s} width={s} height={s} fill={b} />
  </pattern>
)

/** Dot-grid pattern for canvases. */
export const DotPattern = ({
  id,
  gap = 12,
  r = 1,
  fill,
}: {
  id: string
  gap?: number
  r?: number
  fill: string
}) => (
  <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
    <circle cx={gap / 2} cy={gap / 2} r={r} fill={fill} />
  </pattern>
)

/** Convert a pointer event to SVG user-space coordinates (works with preserveAspectRatio). */
export const toSvgPoint = (
  svg: SVGSVGElement,
  e: { clientX: number; clientY: number },
): { x: number; y: number } | null => {
  const m = svg.getScreenCTM()
  if (!m) return null
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
  return { x: p.x, y: p.y }
}

/** Outline helper — ink stroke at the shared weight. */
export const outline = (extra: { strokeWidth?: number; strokeDasharray?: string } = {}) => ({
  stroke: C.ink,
  strokeWidth: SW,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
  ...extra,
})

/** Strip characters that are awkward inside url(#id) references. */
export const cleanId = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, '')
