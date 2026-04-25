import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useRef } from 'react'
import FaultyTerminal from '../components/FaultyTerminal'
import VariableProximity from '../components/VariableProximity'
import ShinyText from '../components/ShinyText'
import StarBorder from '../components/StarBorder'

const Hero = () => {
  const containerRef = useRef(null)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0F]">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0B0B0F]" />

      {/* Faulty Terminal Background */}
      <div className="absolute inset-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.2}
          tint="#E9A53F"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={0.4}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: [0.22, 1, 0.36, 1] // Custom easing for smooth, purposeful motion
          }}
        >

          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5, 
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
            style={{ position: 'relative' }}
          >
            <div className="block mb-2 text-white">
              <VariableProximity
                label="MARCO ARELIANO"
                className="text-white"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
              />
            </div>
            <div className="block text-white">
              <VariableProximity
                label="SUTEJA"
                className="text-white"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.8, 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Building Intelligence into Experience. CS Graduate from Simon Fraser University specializing in AI, Machine Learning, and full-stack development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.1, 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="flex justify-center items-center"
          >
            <StarBorder
              as="a"
              href="/resume.pdf"
              color="#E9A53F"
              speed="5s"
              className="cursor-target inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300"
            >
              <Download size={20} />
              <ShinyText text="Download Resume" speed={3} />
            </StarBorder>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
