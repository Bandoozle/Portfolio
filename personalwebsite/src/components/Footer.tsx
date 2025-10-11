import { motion } from 'framer-motion'
import { Coffee, Heart, Terminal } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 pb-24 bg-[#0B0B0F] border-t border-[#E9A53F]/20 overflow-hidden">
      {/* Scanline Top Border */}
      <div className="scanline absolute top-0 left-0 right-0 h-px"></div>

      {/* PCB Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23E9A53F' stroke-opacity='0.3' stroke-width='0.5'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='80' cy='20' r='3'/%3E%3Ccircle cx='20' cy='80' r='3'/%3E%3Ccircle cx='80' cy='80' r='3'/%3E%3Cpath d='M20 20h60M20 80h60M20 20v60M80 20v60'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Terminal-style Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-window p-6 rounded-xl max-w-4xl mx-auto"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#E9A53F]/30">
            <Terminal size={16} className="text-[#E9A53F]" />
            <span className="text-white/60 text-xs font-mono flex-1">footer@marco-portfolio</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="space-y-3 font-mono text-sm">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left: Branding */}
              <div>
                <div className="mb-2">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">whoami</span>
                </div>
                <div className="pl-2 space-y-1 text-white/80">
                  <div className="text-xl font-bold text-white">Marco Suteja</div>
                  <div className="text-xs text-[#00E5C4]">AI & ML Developer</div>
                  <div className="text-xs text-white/60">Building Intelligence into Experience</div>
                </div>
              </div>

              {/* Middle: Quick Links */}
              <div>
                <div className="mb-2">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">ls sections/</span>
                </div>
                <div className="pl-2 space-y-1 text-white/70 text-xs">
                  {['about', 'projects', 'experience', 'contact'].map((section) => (
                    <a
                      key={section}
                      href={`#${section}`}
                      className="block hover:text-[#E9A53F] transition-colors"
                    >
                      <span className="text-[#00E5C4] mr-2">{'>'}</span>
                      {section}.html
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: Status */}
              <div>
                <div className="mb-2">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">status</span>
                </div>
                <div className="pl-2 space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-white/70">System: </span>
                    <span className="text-green-500">Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E9A53F]"></div>
                    <span className="text-white/70">Available: </span>
                    <span className="text-[#E9A53F]">For Hire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00E5C4]"></div>
                    <span className="text-white/70">Version: </span>
                    <span className="text-[#00E5C4]">2025.v1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E9A53F]/20 my-4"></div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="text-[#E9A53F]">$ </span>
                <span>echo "Built with</span>
                <Coffee size={14} className="text-[#E9A53F] inline" />
                <span>and</span>
                <Heart size={14} className="text-red-500 inline fill-red-500 animate-pulse" />
                <span>by Marco Suteja"</span>
              </div>
              
              <div>
                <span className="text-[#E9A53F]">© </span>
                <span>{currentYear}</span>
              </div>
            </div>

            {/* Command Prompt */}
            <div className="pt-2">
              <span className="text-[#E9A53F]">$ </span>
              <span className="terminal-cursor text-white">_</span>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-xs text-white/40 font-mono"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'].map((tech) => (
              <span key={tech} className="px-2 py-1 bg-white/5 rounded border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
