import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ShinyText from './ShinyText'

interface MenuItem {
  label: string
  href: string
}

const menuItems: MenuItem[] = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Experience', href: 'experience' },
  { label: 'Contact', href: 'contact' }
]

interface StaggerMenuProps {
  scrollToSection: (section: string) => void
}

const StaggerMenu = ({ scrollToSection }: StaggerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuClick = (href: string) => {
    scrollToSection(href)
    setIsOpen(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    show: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <>
      {/* Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-target fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg' 
            : 'bg-white/5 backdrop-blur-sm border border-white/10'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ShinyText text="✕" speed={2} className="text-2xl" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ShinyText text="☰" speed={2} className="text-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 flex items-start justify-end pt-32 pr-8 pointer-events-none"
          >
            {/* 
              Using flex-col items-end ensures proper right alignment:
              - flex-col: Stacks menu items vertically
              - items-end: Aligns each item to the right edge of its container
              - This approach is more reliable than text-right for consistent alignment
            */}
            <div className="flex flex-col items-end space-y-4 pointer-events-auto">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  variants={itemVariants}
                  onClick={() => handleMenuClick(item.href)}
                  className="cursor-target block text-3xl font-normal text-white hover:text-white/80 hover:text-[#00E5C4] hover:drop-shadow-[0_0_8px_rgba(0,229,196,0.8)] transition-all duration-300"
                  style={{ 
                    fontFamily: "'Clarity City', 'Clash Display', 'Satoshi', 'Inter', sans-serif"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    x: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default StaggerMenu