import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, Terminal } from 'lucide-react'
import Cable from '../components/Cable'

const Contact = () => {
  const [command, setCommand] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'marco@example.com',
      href: 'mailto:marco@example.com',
      command: 'email'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/marcoarelianosuteja',
      href: 'https://linkedin.com/in/marcoarelianosuteja',
      command: 'linkedin'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/marco-suteja',
      href: 'https://github.com/marco-suteja',
      command: 'github'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Vancouver, BC',
      href: null,
      command: 'location'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Command executed:', command)
    setCommand('')
  }

  return (
    <section id="contact" className="relative py-24 bg-[#0B0B0F] overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E9A53F]/10 via-transparent to-[#00E5C4]/10"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23E9A53F' stroke-opacity='0.4' stroke-width='2'%3E%3Cpath d='M0 30c20-10 40 10 60 0s40-10 60 0M0 50c20-10 40 10 60 0s40-10 60 0M0 70c20-10 40 10 60 0s40-10 60 0'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'pulse 5.5s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Coiled Cables */}
      <div className="absolute bottom-0 left-1/4 w-[100px] h-[300px] opacity-70">
        <Cable variant="coiled" className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 right-1/4 w-[100px] h-[300px] opacity-70 transform scale-x-[-1]">
        <Cable variant="coiled" className="w-full h-full" />
      </div>

      <div className="relative container mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-mono">
            <span className="text-[#E9A53F]">$ </span>./connect
          </h2>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto font-mono">
            <span className="text-[#00E5C4]">{'> '}</span>Let's build something amazing together
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left: Terminal Prompt */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="terminal-window p-6 rounded-xl relative">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#E9A53F]/30">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-white/60 text-sm ml-4 font-mono">contact@marco-terminal</span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">cat instructions.txt</span>
                </div>

                <div className="pl-2 text-white/80 space-y-2">
                  <p>Available commands:</p>
                  <ul className="space-y-1">
                    {contactInfo.map((info) => (
                      <li key={info.command}>
                        <span className="text-[#00E5C4]">connect --to=</span>
                        <span className="text-[#E9A53F]">{info.command}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white">echo "Ready for collaboration"</span>
                </div>

                <div className="pl-2 text-[#E9A53F]">
                  Ready for collaboration
                </div>

                {/* Interactive Command Input */}
                <form onSubmit={handleSubmit} className="pt-4">
                  <div className="flex items-center">
                    <span className="text-[#E9A53F] mr-2">$ connect --to=</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="email"
                      className="flex-1 bg-transparent text-white outline-none border-b border-[#E9A53F]/30 focus:border-[#E9A53F] transition-all"
                    />
                    {isFocused && (
                      <span className="terminal-cursor text-[#E9A53F] ml-1">_</span>
                    )}
                  </div>
                </form>

                <div className="pt-2 text-xs text-white/50">
                  Press Enter to execute command
                </div>
              </div>

              {/* Scanline Effect */}
              <div className="scanline absolute inset-0 pointer-events-none rounded-xl"></div>
            </div>

            {/* Easter Egg Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-4 text-center text-xs text-white/40 font-mono"
            >
              <span className="text-[#E9A53F]">💡 TIP:</span> Type "help" for more commands
            </motion.div>
          </motion.div>

          {/* Right: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="glass p-4 rounded-xl border-l-4 border-[#E9A53F] hover:bg-white/10 transition-all group"
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 bg-[#E9A53F]/20 rounded-lg group-hover:bg-[#E9A53F]/30 transition-all">
                        <Icon className="text-[#E9A53F]" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white/60 font-mono">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                      <Terminal className="text-[#E9A53F] opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#E9A53F]/20 rounded-lg">
                        <Icon className="text-[#E9A53F]" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 font-mono">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}

            {/* Quick Contact Button */}
            <motion.a
              href="mailto:marco@example.com"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="block w-full p-4 bg-[#E9A53F] text-[#0B0B0F] rounded-xl font-bold text-center hover:shadow-lg hover:shadow-[#E9A53F]/50 transition-all group"
            >
              <div className="flex items-center justify-center gap-2 font-mono">
                <Send size={20} />
                <span>Send Email</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </motion.a>
          </motion.div>
        </div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 mb-4 font-mono text-sm">
            <span className="text-[#E9A53F]">$ </span>ls social_links/
          </p>
          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: 'https://github.com/marco-suteja', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/marcoarelianosuteja', label: 'LinkedIn' },
            ].map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-4 glass rounded-xl hover:bg-white/10 transition-all group"
                  title={social.label}
                >
                  <Icon className="text-[#E9A53F] group-hover:text-[#F5B73A]" size={28} />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
