import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, ExternalLink, Terminal } from 'lucide-react'
import Modal from '../components/Modal'
import Cable from '../components/Cable'

interface Project {
  id: number
  title: string
  command: string
  tagline: string
  image: string
  problem: string
  solution: string
  stack: string[]
  contribution: string
  result: string
  github?: string
  live?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'BrainTumor3DSegNet',
    command: 'run brain_tumor_segnet.py',
    tagline: '3D Medical Image Segmentation | Dice: 0.89',
    image: 'https://via.placeholder.com/800x600/0B0B0F/E9A53F?text=BrainTumor3DSegNet',
    problem: 'Accurate brain tumor segmentation from MRI scans is crucial for diagnosis. Manual segmentation is time-consuming and prone to variability.',
    solution: 'Developed a 3D U-Net CNN for automated brain tumor segmentation, processing volumetric MRI data with custom loss functions to handle class imbalance.',
    stack: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'NiBabel'],
    contribution: 'Designed 3D U-Net architecture, preprocessed MRI datasets, trained model, and built robust data pipeline. Achieved state-of-the-art performance.',
    result: 'Achieved Dice score of 0.89 on BraTS 2020, significantly outperforming 2D methods. Reduced segmentation time from hours to minutes.',
    github: 'https://github.com/marco-suteja/BrainTumor3DSegNet',
    live: '#'
  },
  {
    id: 2,
    title: 'SpeakEasy',
    command: 'run speakeasy_server.js',
    tagline: 'Real-time Speech Translation | WebRTC + NLP',
    image: 'https://via.placeholder.com/800x600/0B0B0F/00E5C4?text=SpeakEasy',
    problem: 'Communication barriers due to language differences make real-time conversations difficult. Existing tools are slow and lack real-time capabilities.',
    solution: 'Built full-stack app with real-time speech-to-text and translation using Google Cloud APIs, WebSockets, and React for seamless UX.',
    stack: ['React', 'Node.js', 'Express', 'WebSockets', 'Google Cloud APIs', 'Tailwind'],
    contribution: 'Developed front-end UI, implemented real-time audio streaming, integrated Google Cloud APIs, and designed back-end architecture.',
    result: 'Enabled real-time bidirectional communication with minimal latency. High accuracy in transcription and translation.',
    github: 'https://github.com/marco-suteja/SpeakEasy',
    live: '#'
  },
  {
    id: 3,
    title: 'CareConnect',
    command: 'run careconnect.py',
    tagline: 'Patient Management System | HIPAA Compliant',
    image: 'https://via.placeholder.com/800x600/0B0B0F/F5B73A?text=CareConnect',
    problem: 'Healthcare clinics struggle with inefficient patient management, leading to administrative overhead and potential errors.',
    solution: 'Designed comprehensive full-stack system with secure patient registration, appointment booking, EHR, and messaging.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'GraphQL', 'AWS Amplify'],
    contribution: 'Led full-stack development, architected database, built secure GraphQL APIs, developed responsive front-end, ensured HIPAA compliance.',
    result: 'Reduced administrative tasks by 30%, improved appointment adherence by 15%. Enhanced data security and patient satisfaction.',
    github: 'https://github.com/marco-suteja/CareConnect',
    live: '#'
  },
  {
    id: 4,
    title: 'PlannerBuddy',
    command: 'run planner_buddy.py',
    tagline: 'AI Academic Planner | ML Recommendations',
    image: 'https://via.placeholder.com/800x600/0B0B0F/E9A53F?text=PlannerBuddy',
    problem: 'Students struggle with managing workload and prioritizing tasks. Generic planners lack personalization and intelligent recommendations.',
    solution: 'Developed AI-powered planner using ML to analyze preferences and provide personalized course/study material recommendations.',
    stack: ['Python', 'Django', 'React', 'Scikit-learn', 'PostgreSQL', 'Celery', 'Redis'],
    contribution: 'Built recommendation engine with collaborative filtering, developed Django REST API, designed React front-end, integrated async processing.',
    result: 'Improved student productivity with tailored plans. 20% increase in task completion rates among beta testers.',
    github: 'https://github.com/marco-suteja/PlannerBuddy',
    live: '#'
  },
  {
    id: 5,
    title: 'MonkeypoxClassifier',
    command: 'run monkeypox_classifier.py',
    tagline: 'Medical Image Classification | 95% Accuracy',
    image: 'https://via.placeholder.com/800x600/0B0B0F/00E5C4?text=MonkeypoxClassifier',
    problem: 'Rapid Monkeypox diagnosis is critical. Visual diagnosis is challenging, and lab tests are slow. Need accessible diagnostic tool.',
    solution: 'Created deep learning model for classifying Monkeypox from skin lesions. Used transfer learning with pre-trained CNN and Streamlit deployment.',
    stack: ['Python', 'PyTorch', 'FastAI', 'Streamlit', 'Docker'],
    contribution: 'Collected/preprocessed datasets, implemented fine-tuned model, developed Streamlit interface, containerized with Docker.',
    result: '95% accuracy in classification. Fast, reliable preliminary diagnostic tool accessible to healthcare professionals.',
    github: 'https://github.com/marco-suteja/MonkeypoxClassifier',
    live: '#'
  },
  {
    id: 6,
    title: 'FOUR Clothing',
    command: 'run four_analytics.js',
    tagline: 'E-commerce Analytics | Real-time Insights',
    image: 'https://via.placeholder.com/800x600/0B0B0F/F5B73A?text=FOURClothing',
    problem: 'E-commerce businesses need actionable insights but lack comprehensive, easy-to-understand analytics dashboards.',
    solution: 'Developed interactive analytics dashboard visualizing sales trends, demographics, product performance, and inventory with drill-down analysis.',
    stack: ['React', 'D3.js', 'Chart.js', 'Node.js', 'MongoDB', 'Express', 'AWS EC2'],
    contribution: 'Designed data visualizations with D3.js/Chart.js, built RESTful API, developed React dashboard, deployed on AWS EC2.',
    result: '10% increase in marketing effectiveness, 15% reduction in overstock. Clear real-time business performance insights.',
    github: 'https://github.com/marco-suteja/FOURClothing',
    live: '#'
  }
]


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative py-32 bg-[#0B0B0F] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E9A53F]/10 via-transparent to-[#00E5C4]/10"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-15"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23E9A53F' stroke-opacity='0.3' stroke-width='1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'pulse 5s ease-in-out infinite'
          }}
        ></div>
      </div>

      {/* Corner Cables */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] opacity-70">
        <Cable variant="top-right" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white font-mono">
            <span className="text-[#E9A53F]">$ </span>ls projects/
          </h2>
          <p className="text-white text-lg md:text-xl max-w-3xl mx-auto font-mono">
            <span className="text-[#00E5C4]">{'> '}</span>Building intelligent solutions that solve real-world problems
          </p>
        </motion.div>


        {/* Lab Rack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="terminal-window static-noise rounded-xl overflow-hidden h-full flex flex-col group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#E9A53F]/20 transition-all duration-300 ease-out border border-transparent group-hover:border-[#E9A53F]/50 group-hover:shadow-[0_0_30px_rgba(233,165,63,0.3)]">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-[#E9A53F]/30 group-hover:bg-black/80 group-hover:border-[#E9A53F]/60 transition-all duration-300">
                  <Terminal size={16} className="text-[#E9A53F] group-hover:text-[#E9A53F] group-hover:drop-shadow-[0_0_8px_rgba(233,165,63,0.8)] transition-all duration-300" />
                  <span className="text-[#E9A53F] text-xs font-mono flex-1 group-hover:text-[#E9A53F] group-hover:drop-shadow-[0_0_4px_rgba(233,165,63,0.6)] transition-all duration-300">
                    [project: {project.title}]
                  </span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/70 group-hover:bg-red-500 group-hover:shadow-[0_0_6px_rgba(239,68,68,0.8)] transition-all duration-300"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70 group-hover:bg-yellow-500 group-hover:shadow-[0_0_6px_rgba(234,179,8,0.8)] transition-all duration-300"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70 group-hover:bg-green-500 group-hover:shadow-[0_0_6px_rgba(34,197,94,0.8)] transition-all duration-300"></div>
                  </div>
                </div>

                {/* Command Line */}
                <div className="px-4 py-2 bg-black/40 font-mono text-xs border-b border-[#E9A53F]/20 group-hover:bg-black/60 group-hover:border-[#E9A53F]/40 transition-all duration-300">
                  <span className="text-[#E9A53F] group-hover:text-[#E9A53F] group-hover:drop-shadow-[0_0_4px_rgba(233,165,63,0.8)] transition-all duration-300">$ </span>
                  <span className="text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_2px_rgba(255,255,255,0.3)] transition-all duration-300">{project.command}</span>
                </div>

                {/* Project Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Image */}
                  <div className="relative mb-4 rounded-lg overflow-hidden border border-[#E9A53F]/30 group-hover:border-[#E9A53F]/60 group-hover:shadow-[0_0_20px_rgba(233,165,63,0.4)] transition-all duration-300">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-[#E9A53F] group-hover:drop-shadow-[0_0_8px_rgba(233,165,63,0.6)] transition-all duration-300">{project.title}</h3>
                    <p className="text-white/70 text-sm group-hover:text-white/90 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] transition-all duration-300">{project.tagline}</p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="text-[10px] px-2 py-1 bg-[#E9A53F]/20 text-[#E9A53F] rounded border border-[#E9A53F]/30 font-mono group-hover:bg-[#E9A53F]/30 group-hover:text-[#E9A53F] group-hover:border-[#E9A53F]/50 group-hover:shadow-[0_0_6px_rgba(233,165,63,0.4)] transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-[10px] px-2 py-1 bg-white/10 text-white/60 rounded font-mono group-hover:bg-white/20 group-hover:text-white/80 group-hover:shadow-[0_0_4px_rgba(255,255,255,0.3)] transition-all duration-300">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-auto w-full py-2 bg-[#E9A53F]/10 hover:bg-[#E9A53F]/20 text-[#E9A53F] rounded-lg border border-[#E9A53F]/30 hover:border-[#E9A53F]/60 transition-all font-mono text-sm group-hover:bg-[#E9A53F]/20 group-hover:border-[#E9A53F]/70 group-hover:shadow-[0_0_15px_rgba(233,165,63,0.5)] group-hover:scale-105 duration-300"
                  >
                    <span className="text-[#E9A53F] mr-2 group-hover:drop-shadow-[0_0_4px_rgba(233,165,63,0.8)] transition-all duration-300">{'>'}</span>
                    View Details
                  </button>
                </div>

                {/* Bottom Status Bar */}
                <div className="px-4 py-2 bg-black/40 border-t border-[#E9A53F]/20 flex justify-between items-center text-[10px] font-mono group-hover:bg-black/60 group-hover:border-[#E9A53F]/40 transition-all duration-300">
                  <span className="text-white/50 group-hover:text-white/70 transition-all duration-300">STATUS: <span className="text-[#00E5C4] group-hover:text-[#00E5C4] group-hover:drop-shadow-[0_0_6px_rgba(0,229,196,0.8)] transition-all duration-300">READY</span></span>
                  <span className="text-white/50 group-hover:text-white/70 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.3)] transition-all duration-300">v1.0</span>
                </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-8">
            {/* Terminal-style Header */}
            <div className="terminal-window p-4 rounded-lg">
              <div className="font-mono text-sm space-y-1">
                <div><span className="text-[#E9A53F]">{'> '}</span><span className="text-white">PROJECT: {selectedProject.title}</span></div>
                <div><span className="text-[#E9A53F]">{'> '}</span><span className="text-white/70">{selectedProject.tagline}</span></div>
                <div><span className="text-[#E9A53F]">{'> '}</span><span className="text-[#00E5C4]">STATUS: DEPLOYED</span></div>
              </div>
            </div>

            {/* Image */}
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-80 object-cover rounded-xl border border-[#E9A53F]/30"
            />

            {/* Problem */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    <span className="text-[#E9A53F]">$ </span>cat problem.txt
                  </h3>
                  <div className="glass p-4 rounded-lg border-l-4 border-red-500/50">
                    <p className="text-white/90 leading-relaxed text-left">{selectedProject.problem}</p>
                  </div>
                </div>

                {/* Solution */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    <span className="text-[#E9A53F]">$ </span>cat solution.txt
                  </h3>
                  <div className="glass p-4 rounded-lg border-l-4 border-[#00E5C4]/50">
                    <p className="text-white/90 leading-relaxed text-left">{selectedProject.solution}</p>
                  </div>
                </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white font-mono">
                <span className="text-[#E9A53F]">$ </span>ls tech_stack/
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-[#E9A53F]/20 text-[#E9A53F] rounded-lg border border-[#E9A53F]/30 font-mono text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

                {/* Contribution */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    <span className="text-[#E9A53F]">$ </span>cat contribution.txt
                  </h3>
                  <div className="glass p-4 rounded-lg border-l-4 border-[#E9A53F]/50">
                    <p className="text-white/90 leading-relaxed text-left">{selectedProject.contribution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    <span className="text-[#E9A53F]">$ </span>cat results.txt
                  </h3>
                  <div className="glass p-4 rounded-lg border-l-4 border-green-500/50">
                    <p className="text-white/90 leading-relaxed text-left">{selectedProject.result}</p>
                  </div>
                </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-semibold text-[#0B0B0F] hover:shadow-lg hover:shadow-white/50 transition-all font-mono"
                >
                  <Github size={20} /> View GitHub
                </a>
              )}
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border-2 border-[#E9A53F] text-[#E9A53F] hover:bg-[#E9A53F]/10 rounded-xl font-semibold transition-all font-mono"
                >
                  <ExternalLink size={20} /> Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Projects
