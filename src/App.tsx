import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import Dock from './components/Dock'
import TargetCursor from './components/TargetCursor'
import { Home, User, Briefcase, FolderGit2, Mail } from 'lucide-react'

type SectionType = 'home' | 'about' | 'projects' | 'experience' | 'contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState<SectionType>('home')

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId as SectionType)
  }

  const dockItems = [
    {
      icon: <Home size={24} />,
      label: 'Home',
      onClick: () => scrollToSection('home'),
      className: 'cursor-target'
    },
    {
      icon: <User size={24} />,
      label: 'About',
      onClick: () => scrollToSection('about'),
      className: 'cursor-target'
    },
    {
      icon: <FolderGit2 size={24} />,
      label: 'Projects',
      onClick: () => scrollToSection('projects'),
      className: 'cursor-target'
    },
    {
      icon: <Briefcase size={24} />,
      label: 'Experience',
      onClick: () => scrollToSection('experience'),
      className: 'cursor-target'
    },
    {
      icon: <Mail size={24} />,
      label: 'Contact',
      onClick: () => scrollToSection('contact'),
      className: 'cursor-target'
    }
  ]

  return (
    <AnimatePresence mode="wait">
      {!isLoading && (
        <div className="relative h-screen bg-black text-white overflow-hidden">
          {/* Custom Cursor */}
          <TargetCursor 
            spinDuration={2}
            hideDefaultCursor={true}
          />
          
          {/* Single Section Display */}
          <main className="h-full">
            <AnimatePresence mode="wait">
              {currentSection === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <Hero />
                </motion.div>
              )}
              
              {currentSection === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="h-full overflow-y-auto"
                >
                  <About />
                </motion.div>
              )}
              
              {currentSection === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="h-full overflow-y-auto"
                >
                  <Projects />
                </motion.div>
              )}
              
              {currentSection === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="h-full overflow-y-auto"
                >
                  <Experience />
                </motion.div>
              )}
              
              {currentSection === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="h-full overflow-y-auto"
                >
                  <Contact />
                  <Footer />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
          
          {/* Dock at the bottom */}
          <Dock 
            items={dockItems}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      )}
    </AnimatePresence>
  )
}

export default App
