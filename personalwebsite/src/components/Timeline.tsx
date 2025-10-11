import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TimelineItemProps {
  date: string
  title: string
  company: string
  description: string | ReactNode
  index: number
}

const TimelineItem = ({ date, title, company, description, index }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-8 pb-12 border-l-2 border-primary-500/30"
    >
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-500 shadow-lg shadow-primary-500/50" />
      
      {/* Content */}
      <div className="glass rounded-xl p-6 ml-4">
        <span className="text-primary-400 text-sm font-semibold">{date}</span>
        <h3 className="text-2xl font-bold mt-2 mb-1">{title}</h3>
        <p className="text-accent-400 font-semibold mb-3">{company}</p>
        <div className="text-white/90 leading-relaxed">{description}</div>
      </div>
    </motion.div>
  )
}

interface TimelineProps {
  items: Array<{
    date: string
    title: string
    company: string
    description: string | ReactNode
  }>
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} index={index} />
      ))}
    </div>
  )
}

export default Timeline

