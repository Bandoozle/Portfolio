import { motion } from 'framer-motion'
import { useRef } from 'react'
import FaultyTerminal from '../FaultyTerminal'
import VariableProximity from '../VariableProximity'

/** Hero-style title + FaultyTerminal background for Personal.OS embed (warning strip lives in PanelContent). */
const PersonalHeroVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-[#0B0B0F]">
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

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div
            ref={containerRef}
            className="text-3xl font-bold leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ position: 'relative' }}
          >
            <div className="mb-1 block sm:mb-2">
              <VariableProximity
                label="MARCO ARELIANO"
                className="text-white"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={120}
                falloff="linear"
              />
            </div>
            <div className="block">
              <VariableProximity
                label="SUTEJA"
                className="text-white"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={120}
                falloff="linear"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PersonalHeroVisual
