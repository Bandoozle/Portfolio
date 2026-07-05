/**
 * Position, size, and rotation for each text region on the projects collage.
 * Tune `projectsCaseDefaultLayout` for global placement, or add entries to
 * `projectsCaseLayoutByProjectId` to override per portfolio `id`.
 *
 * All positions are percentages of the stage box (same box as `projects_background.png` when
 * `background-size: contain` is applied to a layer with matching aspect ratio).
 */

export type ProjectTextSlotId =
  | 'caseIndex'
  | 'title'
  | 'tagline'
  | 'stack'
  | 'problem'
  | 'solution'
  | 'contribution'
  | 'outcome'
  | 'github'

export const PROJECT_TEXT_SLOT_IDS: ProjectTextSlotId[] = [
  'caseIndex',
  'title',
  'tagline',
  'stack',
  'problem',
  'solution',
  'contribution',
  'outcome',
  'github',
]

/** CSS length / % / clamp() strings */
export interface ProjectTextSlotLayout {
  left?: string
  top?: string
  right?: string
  bottom?: string
  /** e.g. `rotate(-1.5deg)` or `rotate(-2deg) translateX(6px)` */
  transform?: string
  fontSize?: string
  maxWidth?: string
  width?: string
  color?: string
  lineHeight?: string | number
  letterSpacing?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  fontWeight?: string | number
  zIndex?: number
  pointerEvents?: 'none' | 'auto'
  whiteSpace?: 'normal' | 'pre-line' | 'nowrap'
}

/** Stage width vs height — match your `projects_background.png` aspect for easiest alignment */
export const projectsCaseStage = {
  aspectRatio: '16 / 10' as const,
}

/** Starting layout (safe defaults); edit freely */
export const projectsCaseDefaultLayout: Record<ProjectTextSlotId, ProjectTextSlotLayout> = {
  caseIndex: {
    left: '6%',
    top: '8%',
    fontSize: 'clamp(0.55rem, 1.1vw, 0.7rem)',
    letterSpacing: '0.12em',
    color: '#2a2218',
    transform: 'rotate(-0.5deg)',
    maxWidth: '22%',
  },
  title: {
    left: '28%',
    top: '12%',
    fontSize: 'clamp(1rem, 2.4vw, 1.75rem)',
    fontWeight: 700,
    maxWidth: '52%',
    lineHeight: 1.15,
    color: '#14100c',
    transform: 'rotate(-0.8deg)',
  },
  tagline: {
    left: '28%',
    top: '22%',
    fontSize: 'clamp(0.65rem, 1.35vw, 0.9rem)',
    maxWidth: '48%',
    lineHeight: 1.35,
    color: '#3a3028',
    transform: 'rotate(0.4deg)',
  },
  stack: {
    left: '28%',
    top: '30%',
    fontSize: 'clamp(0.55rem, 1vw, 0.72rem)',
    maxWidth: '55%',
    letterSpacing: '0.08em',
    color: '#2a2218',
    transform: 'rotate(-0.3deg)',
  },
  problem: {
    left: '28%',
    top: '40%',
    fontSize: 'clamp(0.58rem, 1.05vw, 0.78rem)',
    maxWidth: '32%',
    lineHeight: 1.45,
    color: '#3a322b',
  },
  solution: {
    left: '62%',
    top: '40%',
    fontSize: 'clamp(0.58rem, 1.05vw, 0.78rem)',
    maxWidth: '32%',
    lineHeight: 1.45,
    color: '#3a322b',
    transform: 'rotate(0.5deg)',
  },
  contribution: {
    left: '28%',
    top: '62%',
    fontSize: 'clamp(0.58rem, 1.05vw, 0.78rem)',
    maxWidth: '32%',
    lineHeight: 1.45,
    color: '#3a322b',
  },
  outcome: {
    left: '62%',
    top: '62%',
    fontSize: 'clamp(0.58rem, 1.05vw, 0.78rem)',
    maxWidth: '32%',
    lineHeight: 1.45,
    color: '#3a322b',
    transform: 'rotate(-0.4deg)',
  },
  github: {
    left: '28%',
    top: '86%',
    fontSize: 'clamp(0.55rem, 1vw, 0.72rem)',
    letterSpacing: '0.14em',
    color: '#1a0f0c',
    textAlign: 'left',
    pointerEvents: 'auto',
    transform: 'rotate(-1deg)',
  },
}

/**
 * Per-project overrides. Example:
 * ```
 * 4: {
 *   title: { left: '30%', top: '14%', fontSize: 'clamp(1.2rem, 3vw, 2rem)', transform: 'rotate(-2deg)' },
 * },
 * ```
 */
export const projectsCaseLayoutByProjectId: Partial<
  Record<number, Partial<Record<ProjectTextSlotId, ProjectTextSlotLayout>>>
> = {}

export function getMergedProjectsCaseLayout(
  projectId: number,
): Record<ProjectTextSlotId, ProjectTextSlotLayout> {
  const patch = projectsCaseLayoutByProjectId[projectId]
  return Object.fromEntries(
    PROJECT_TEXT_SLOT_IDS.map((id) => [
      id,
      { ...projectsCaseDefaultLayout[id], ...patch?.[id] },
    ]),
  ) as Record<ProjectTextSlotId, ProjectTextSlotLayout>
}
