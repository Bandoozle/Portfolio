/**
 * Bento geometry. Everything lives in a fixed coordinate space (W × H) so the
 * ribbon always lines up with the cards; the whole composition scales with the
 * container width.
 */

export type Pt = [number, number]
export type Rect = { x: number; y: number; w: number; h: number }

export type CardId = 'fullstack' | 'design' | 'engineering' | 'toolkit'

export type CardLayout = {
  rect: Rect
  /** relative to the card */
  text: Rect
  /** relative to the card */
  art: Rect
}

export type BentoLayout = {
  W: number
  H: number
  compact: boolean
  radius: number
  title: number
  body: number
  cards: Record<CardId, CardLayout>
  ribbon: { points: Pt[]; thickness: number; amp: number }
  /** Regions where the ribbon passes IN FRONT of the illustrations. */
  front: Rect[]
}

export const DESKTOP: BentoLayout = {
  W: 1000,
  H: 780,
  compact: false,
  radius: 30,
  title: 35,
  body: 16.5,
  cards: {
    fullstack: {
      rect: { x: 0, y: 0, w: 480, h: 500 },
      text: { x: 34, y: 34, w: 380, h: 110 },
      art: { x: 0, y: 150, w: 480, h: 350 },
    },
    design: {
      rect: { x: 496, y: 0, w: 504, h: 242 },
      text: { x: 32, y: 32, w: 200, h: 170 },
      art: { x: 230, y: 8, w: 262, h: 226 },
    },
    engineering: {
      rect: { x: 496, y: 258, w: 504, h: 242 },
      text: { x: 32, y: 32, w: 200, h: 170 },
      art: { x: 230, y: 8, w: 262, h: 226 },
    },
    toolkit: {
      rect: { x: 0, y: 516, w: 1000, h: 264 },
      text: { x: 36, y: 34, w: 280, h: 170 },
      art: { x: 330, y: 6, w: 660, h: 252 },
    },
  },
  ribbon: {
    thickness: 30,
    amp: 9,
    points: [
      [210, 310],
      [340, 262],
      [452, 226],
      [540, 206],
      [630, 248],
      [760, 262],
      [880, 238],
      [960, 290],
      [950, 372],
      [860, 440],
      [800, 510],
      [770, 590],
      [690, 640],
      [600, 600],
      [500, 660],
      [400, 684],
    ],
  },
  // Regions where the ribbon passes over the artwork. Currently none: every
  // illustration sits in front of the ribbon so nothing interactive gets covered.
  front: [],
}

export const MOBILE: BentoLayout = {
  W: 360,
  H: 1428,
  compact: true,
  radius: 24,
  title: 29,
  body: 15,
  cards: {
    fullstack: {
      rect: { x: 0, y: 0, w: 360, h: 410 },
      text: { x: 22, y: 24, w: 250, h: 110 },
      art: { x: 0, y: 128, w: 360, h: 282 },
    },
    design: {
      rect: { x: 0, y: 424, w: 360, h: 300 },
      text: { x: 22, y: 24, w: 250, h: 100 },
      art: { x: 14, y: 100, w: 332, h: 192 },
    },
    engineering: {
      rect: { x: 0, y: 736, w: 360, h: 300 },
      text: { x: 22, y: 24, w: 250, h: 100 },
      art: { x: 14, y: 100, w: 332, h: 192 },
    },
    toolkit: {
      rect: { x: 0, y: 1048, w: 360, h: 380 },
      text: { x: 22, y: 24, w: 250, h: 100 },
      art: { x: 0, y: 120, w: 360, h: 250 },
    },
  },
  ribbon: {
    thickness: 22,
    amp: 5,
    points: [
      [100, 330],
      [230, 300],
      [318, 350],
      [326, 416],
      [322, 486],
      [270, 560],
      [130, 600],
      [110, 660],
      [230, 700],
      [322, 730],
      [326, 800],
      [270, 870],
      [130, 910],
      [110, 970],
      [240, 1010],
      [322, 1042],
      [322, 1110],
      [250, 1190],
      [170, 1230],
    ],
  },
  front: [],
}
