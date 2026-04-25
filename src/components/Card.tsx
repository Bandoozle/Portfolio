import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glowing?: boolean
}

const Card = ({ children, className = '', hover = true, glowing = false }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={`glass rounded-2xl p-6 ${glowing ? 'glow-box-hover' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card

