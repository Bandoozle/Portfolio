import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ElementType, ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Upward travel distance. Pass false for no translate. */
  y?: number | false
}

/**
 * First-view enter motion: rise + blur clear + fade.
 * Plays once when the element enters the viewport.
 */
const Reveal = ({ children, className, delay = 0, y = 22 }: RevealProps) => {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y === false ? 0 : y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

type RevealWordsProps = {
  text: string
  className?: string
  delay?: number
  as?: ElementType
  style?: CSSProperties
  id?: string
}

/**
 * Staggered word enter for display titles — each word rises and un-blurs.
 */
const RevealWords = ({
  text,
  className,
  delay = 0,
  as: Tag = 'h2',
  style,
  id,
}: RevealWordsProps) => {
  const reduceMotion = useReducedMotion()
  const words = text.split(/(\s+)/)

  if (reduceMotion) {
    return (
      <Tag id={id} className={className} style={style}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag id={id} className={className} style={style}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4, margin: '0px 0px -8% 0px' }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: delay },
          },
        }}
      >
        {words.map((word, i) =>
          /^\s+$/.test(word) ? (
            <span key={`sp-${i}`}>{' '}</span>
          ) : (
            <motion.span
              key={`w-${i}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {word}
            </motion.span>
          ),
        )}
      </motion.span>
    </Tag>
  )
}

export { RevealWords }
export default Reveal
