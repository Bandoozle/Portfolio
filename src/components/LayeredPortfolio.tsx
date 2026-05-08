import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import App from '../App'
import ProfessionalLayer from './ProfessionalLayer'

const LayeredPortfolio = () => {
  const [mode, setMode] = useState<'professional' | 'retro'>('professional')

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {mode === 'professional' ? (
          <motion.div
            key="professional"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20"
          >
            <ProfessionalLayer onEnterRetro={() => setMode('retro')} />
          </motion.div>
        ) : (
          <motion.div
            key="retro"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10"
          >
            <App onBackToProfessional={() => setMode('professional')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LayeredPortfolio
