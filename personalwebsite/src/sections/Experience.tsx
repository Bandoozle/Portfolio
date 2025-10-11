import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'

interface ExperienceItem {
  date: string
  title: string
  company: string
  description: React.ReactNode
  type: 'work' | 'education'
}

const experiences: ExperienceItem[] = [
  {
    date: '2023 - Present',
    title: 'Co-Founder & Analytics Developer',
    company: 'FOUR Clothing',
    type: 'work',
    description: (
          <div className="space-y-2 text-left">
            <p>Building a modern e-commerce platform for fashion retail with focus on data-driven decisions.</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Developed custom analytics dashboard tracking customer behavior and conversion metrics</li>
              <li>Implemented recommendation engine increasing average order value by 35%</li>
              <li>Built automated inventory management system using predictive analytics</li>
              <li>Managed full-stack development using React, Node.js, and PostgreSQL</li>
            </ul>
          </div>
    )
  },
  {
    date: '2022 - 2023',
    title: 'Kitchen Staff',
    company: 'Kokoro Tokyo Mazesoba',
    type: 'work',
    description: (
      <div className="space-y-2 text-left">
        <p>Gained valuable experience in fast-paced operations and team collaboration.</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Maintained high-quality standards during peak hours serving 200+ customers daily</li>
          <li>Optimized food preparation workflows to reduce wait times by 20%</li>
          <li>Collaborated with team members to ensure smooth kitchen operations</li>
          <li>Developed strong time management and multitasking skills</li>
        </ul>
      </div>
    )
  },
  {
    date: '2021 - 2025 (Expected)',
    title: 'Bachelor of Science in Computer Science',
    company: 'Simon Fraser University',
    type: 'education',
    description: (
      <div className="space-y-2 text-left">
        <p><strong>Specialization:</strong> Artificial Intelligence & Machine Learning</p>
        <p><strong>Relevant Coursework:</strong> Deep Learning, Computer Vision, Natural Language Processing, Data Structures & Algorithms, Database Systems, Software Engineering</p>
        <p><strong>Activities:</strong> AI/ML Club, Hackathon Participant, Open Source Contributor</p>
      </div>
    )
  }
]

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 bg-[#0B0B0F] overflow-hidden">
      {/* Circuit Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#00E5C4]/10 via-transparent to-[#E9A53F]/10"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300E5C4' stroke-opacity='0.3' stroke-width='1'%3E%3Cpath d='M20 20h40M20 20v40M60 20v40M20 60h40'/%3E%3Ccircle cx='20' cy='20' r='2' fill='%2300E5C4' fill-opacity='0.3'/%3E%3Ccircle cx='60' cy='20' r='2' fill='%2300E5C4' fill-opacity='0.3'/%3E%3Ccircle cx='20' cy='60' r='2' fill='%2300E5C4' fill-opacity='0.3'/%3E%3Ccircle cx='60' cy='60' r='2' fill='%2300E5C4' fill-opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'pulse 4.5s ease-in-out infinite'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-mono">
            <span className="text-[#E9A53F]">$ </span>cat timeline.log
          </h2>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto font-mono">
            <span className="text-[#00E5C4]">{'> '}</span>Professional journey and continuous learning
          </p>
        </motion.div>

        {/* Vertical Data Cable Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Central Cable */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
            {/* Cable Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#E9A53F] via-[#E9A53F] to-[#00E5C4] opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#E9A53F] via-[#E9A53F] to-[#00E5C4] opacity-60 animate-pulse"></div>
            
            {/* Cable Nodes */}
            {experiences.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{ top: `${(index / (experiences.length - 1)) * 100}%` }}
              >
                <div className="relative">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 w-6 h-6 -m-3 bg-[#E9A53F] rounded-full blur-md opacity-60 animate-pulse"></div>
                  {/* Inner Connector */}
                  <div className="relative w-6 h-6 bg-[#E9A53F] rounded-full border-4 border-[#0B0B0F] shadow-lg shadow-[#E9A53F]/50">
                    <div className="absolute inset-0 bg-[#F5B73A] rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Experience Cards */}
          <div className="space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0
              const Icon = exp.type === 'work' ? Briefcase : GraduationCap
              
              return (
                <ExperienceNode 
                  key={index} 
                  experience={exp} 
                  index={index} 
                  isLeft={isLeft}
                  Icon={Icon}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ExperienceNodeProps {
  experience: ExperienceItem
  index: number
  isLeft: boolean
  Icon: any
}

const ExperienceNode = ({ experience, index, isLeft, Icon }: ExperienceNodeProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8' : 'pl-8'}`}>
        <div className="terminal-window p-6 rounded-xl relative group">
          {/* Terminal Header */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E9A53F]/30">
            <div className="p-2 bg-[#E9A53F]/20 rounded-lg">
              <Icon size={20} className="text-[#E9A53F]" />
            </div>
            <div className="flex-1">
              <div className="text-[#E9A53F] text-xs font-mono mb-1">{experience.date}</div>
              <h3 className="text-white font-bold text-lg">{experience.title}</h3>
            </div>
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <div className="font-mono text-sm">
              <span className="text-[#00E5C4]">@</span>
              <span className="text-white/90 ml-1">{experience.company}</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-white/80 text-sm leading-relaxed">
            {experience.description}
          </div>

          {/* Type Badge */}
          <div className="mt-4 pt-4 border-t border-[#E9A53F]/20">
            <span className="text-xs font-mono px-2 py-1 bg-[#E9A53F]/20 text-[#E9A53F] rounded border border-[#E9A53F]/30">
              {experience.type === 'work' ? 'WORK_EXPERIENCE' : 'EDUCATION'}
            </span>
          </div>

          {/* Scanline Effect */}
          <div className="scanline absolute inset-0 pointer-events-none rounded-xl"></div>

          {/* Connection Line to Cable */}
          <div 
            className={`absolute top-1/2 ${isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} w-8 h-0.5 bg-gradient-to-${isLeft ? 'r' : 'l'} from-[#E9A53F] to-transparent`}
            style={{ transform: `translateY(-50%) ${isLeft ? 'translateX(100%)' : 'translateX(-100%)'}` }}
          ></div>
        </div>
      </div>
    </motion.div>
  )
}

export default Experience
