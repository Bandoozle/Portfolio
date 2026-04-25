import { motion } from 'framer-motion'

interface InputProps {
  type?: 'text' | 'email' | 'textarea'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
  name?: string
  rows?: number
}

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  name,
  rows = 4
}: InputProps) => {
  const baseStyles = 'w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 text-white placeholder-gray-400'

  if (type === 'textarea') {
    return (
      <motion.textarea
        whileFocus={{ scale: 1.01 }}
        className={`${baseStyles} resize-none`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        rows={rows}
      />
    )
  }

  return (
    <motion.input
      whileFocus={{ scale: 1.01 }}
      type={type}
      className={baseStyles}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
    />
  )
}

export default Input

