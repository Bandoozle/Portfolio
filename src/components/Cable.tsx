import { motion } from 'framer-motion'

interface CableProps {
  variant?: 'left' | 'right' | 'top-right' | 'bottom-left' | 'coiled' | 'vertical'
  className?: string
  glow?: boolean
}

const Cable = ({ variant = 'left', className = '', glow = true }: CableProps) => {
  const cables = {
    left: (
      <svg viewBox="0 0 50 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${glow ? 'cable-glow' : ''}`}>
        <path 
          d="M 10 0 L 10 50 Q 10 100 30 120 L 30 200 Q 30 250 15 280 L 15 400" 
          stroke="#E9A53F" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M 10 0 L 10 50 Q 10 100 30 120 L 30 200 Q 30 250 15 280 L 15 400" 
          stroke="#F5B73A" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    ),
    right: (
      <svg viewBox="0 0 50 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${glow ? 'cable-glow' : ''}`}>
        <path 
          d="M 40 0 L 40 50 Q 40 100 20 120 L 20 200 Q 20 250 35 280 L 35 400" 
          stroke="#E9A53F" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M 40 0 L 40 50 Q 40 100 20 120 L 20 200 Q 20 250 35 280 L 35 400" 
          stroke="#F5B73A" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    ),
    'top-right': (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${glow ? 'cable-glow' : ''}`}>
        <path 
          d="M 0 10 Q 50 10 80 40 Q 100 60 120 100 L 150 180 Q 160 190 180 190" 
          stroke="#E9A53F" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="180" cy="190" r="5" fill="#E9A53F" opacity="0.8" />
      </svg>
    ),
    'bottom-left': (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${glow ? 'cable-glow' : ''}`}>
        <path 
          d="M 10 10 Q 30 20 50 60 L 80 120 Q 100 160 150 180 L 190 190" 
          stroke="#E9A53F" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="10" cy="10" r="5" fill="#E9A53F" opacity="0.8" />
      </svg>
    ),
    coiled: (
      <svg viewBox="0 0 100 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${glow ? 'cable-glow' : ''}`}>
        <path 
          d="M 50 0 L 50 30 
             Q 50 50 65 60 
             Q 80 70 65 80 
             Q 50 90 65 100 
             Q 80 110 65 120 
             Q 50 130 65 140 
             Q 80 150 65 160 
             Q 50 170 50 190 
             L 50 300" 
          stroke="#E9A53F" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M 50 0 L 50 30 
             Q 50 50 65 60 
             Q 80 70 65 80 
             Q 50 90 65 100 
             Q 80 110 65 120 
             Q 50 130 65 140 
             Q 80 150 65 160 
             Q 50 170 50 190 
             L 50 300" 
          stroke="#F5B73A" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    ),
    vertical: (
      <svg viewBox="0 0 20 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${glow ? 'cable-glow' : ''}`}>
        <path 
          d="M 10 0 L 10 400" 
          stroke="#E9A53F" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M 10 0 L 10 400" 
          stroke="#F5B73A" 
          strokeWidth="2" 
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* Connector nodes */}
        {[100, 200, 300].map((y) => (
          <g key={y}>
            <circle cx="10" cy={y} r="6" fill="#E9A53F" opacity="0.3" />
            <circle cx="10" cy={y} r="4" fill="#E9A53F" />
          </g>
        ))}
      </svg>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="pointer-events-none"
      style={{ mixBlendMode: 'soft-light' }}
    >
      {cables[variant]}
    </motion.div>
  )
}

export default Cable

