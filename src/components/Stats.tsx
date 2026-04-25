import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatItemProps {
  value: string
  label: string
  delay: number
}

const StatItem = ({ value, label, delay }: StatItemProps) => {
  const [count, setCount] = useState(0)
  const target = parseInt(value.replace('+', ''))

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}+
      </div>
      <div className="text-gray-400 text-sm md:text-base">{label}</div>
    </motion.div>
  )
}

interface StatsProps {
  stats: Array<{ value: string; label: string }>
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16">
      {stats.map((stat, index) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          label={stat.label}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}

export default Stats

