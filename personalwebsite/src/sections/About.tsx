import { motion } from 'framer-motion'
import Cable from '../components/Cable'
import ElectricBorder from '../components/ElectricBorder'
import LogoLoop from '../components/LogoLoop'
import { 
  SiPython, 
  SiPytorch, 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiPostgresql, 
  SiDocker, 
  SiAmazonwebservices
} from 'react-icons/si'

const techLogos = [
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiAmazonwebservices />, title: "AWS", href: "https://aws.amazon.com" },
];

const About = () => {
  return (
    <section id="about" className="relative py-24 bg-[#0B0B0F] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E9A53F]/10 via-transparent to-[#00E5C4]/10"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E9A53F' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'pulse 4s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Left Cable */}
      <div className="absolute left-0 top-0 w-[50px] h-full">
        <Cable variant="left" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="text-[#E9A53F]">{'$ '}</span>whoami
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-xl border-l-4 border-[#E9A53F]">
              <h3 className="text-2xl font-bold mb-4 text-white">The Journey</h3>
              <p className="text-white/90 leading-relaxed mb-4 text-left">
                I'm a 4th-year Computer Science student at Simon Fraser University, passionate about leveraging 
                <span className="text-[#E9A53F] font-semibold"> AI and data-driven design </span> 
                to build intelligent experiences that solve real-world problems.
              </p>
              <p className="text-white/90 leading-relaxed mb-4 text-left">
                My journey began with curiosity about how machines learn, which evolved into building end-to-end 
                ML pipelines and full-stack applications. I love exploring the intersection of 
                <span className="text-[#00E5C4] font-semibold"> machine learning, full-stack development, </span> 
                and product innovation.
              </p>
              <p className="text-white/90 leading-relaxed text-left">
                Whether it's training neural networks for medical imaging, architecting scalable backends, or 
                designing intuitive UIs, I'm driven by the challenge of turning complex problems into elegant solutions.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '6+', label: 'AI Projects', icon: '🧠' },
                { value: '10+', label: 'Technologies', icon: '⚡' },
                { value: '3+', label: 'Years Coding', icon: '💻' },
                { value: '2', label: 'Startups', icon: '🚀' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass p-4 rounded-lg text-center hover:bg-white/10 transition-all"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-[#E9A53F] mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ElectricBorder
              color="#E9A53F"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 12 }}
            >
              <div className="terminal-window p-6 rounded-xl relative overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#E9A53F]/30">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-white/60 text-sm ml-4 font-mono">marco@terminal:~$</span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-3 font-mono text-sm">
                <div>
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">cat profile.txt</span>
                </div>
                
                <div className="space-y-2 text-white/90 pl-2">
                  <div><span className="text-[#00E5C4]">Name:</span> Marco Areliano Suteja</div>
                  <div><span className="text-[#00E5C4]">Location:</span> Vancouver, BC 🇨🇦</div>
                  <div><span className="text-[#00E5C4]">Education:</span> SFU - Computer Science</div>
                  <div><span className="text-[#00E5C4]">Specialization:</span> AI & Machine Learning</div>
                  <div><span className="text-[#00E5C4]">Status:</span> <span className="text-[#E9A53F]">Actively Building</span></div>
                </div>

                <div className="pt-4">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">ls skills/</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pl-2 text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> Python
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> PyTorch
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> React
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> TypeScript
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> Node.js
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> PostgreSQL
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> Docker
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5C4]">📁</span> AWS
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">echo $MOTTO</span>
                </div>

                <div className="pl-2 text-[#E9A53F] italic">
                  "Building Intelligence into Experience"
                </div>

                <div className="pt-2">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="terminal-cursor text-white">_</span>
                </div>
              </div>

              {/* Scanline effect */}
              <div className="scanline absolute inset-0 pointer-events-none"></div>
              </div>
            </ElectricBorder>

            {/* Pixelated Avatar Alternative */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 glass p-4 rounded-xl text-center"
            >
              <div className="text-6xl mb-2">👨‍💻</div>
              <div className="text-white/80 text-sm font-mono">
                <span className="text-[#E9A53F]">{'> '}</span>Ready to collaborate
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tech Stack Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white font-mono">
            <span className="text-[#E9A53F]">$ </span>tech --stack
          </h3>
        </motion.div>
      </div>

      {/* Edge-to-edge LogoLoop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        style={{ height: '120px', position: 'relative', overflow: 'hidden', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
      >
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={48}
          gap={48}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#0B0B0F"
          ariaLabel="Technology stack"
        />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
      </div>
    </section>
  )
}

export default About
