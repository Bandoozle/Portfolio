import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  className?: string
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  href,
  className = '' 
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden group'
  
  const variants = {
    primary: 'bg-white text-[#0B0B0F] shadow-lg shadow-white/30 hover:shadow-white/50',
    secondary: 'bg-gradient-to-r from-[#F5B73A] to-[#E0A020] hover:from-[#F7C65B] hover:to-[#F5B73A] text-[#0B0B0F] shadow-lg shadow-[#F5B73A]/30 hover:shadow-[#F5B73A]/50',
    outline: 'border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm'
  }
  
  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg'
  }

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const ButtonContent = () => (
    <>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClass}
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <ButtonContent />
      </motion.a>
    )
  }

  return (
    <motion.button
      className={buttonClass}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <ButtonContent />
    </motion.button>
  )
}

export default Button
