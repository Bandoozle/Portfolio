import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, Terminal } from 'lucide-react'
import Modal from '../components/Modal'
import Cable from '../components/Cable'

interface Project {
  id: number
  title: string
  command: string
  tagline: string
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
    tagline: '3D Medical Image Segmentation | PyTorch',
    problem: 'Accurate brain tumor segmentation from MRI scans is crucial for diagnosis. Manual segmentation is time-consuming and prone to variability.',
    solution: 'Built a 3D U-Net in PyTorch for volumetric MRI tumor segmentation, with automated preprocessing using NumPy and Pandas to reduce manual data prep time by 40%.',
    stack: ['Python', 'PyTorch', 'NumPy', 'Pandas'],
    contribution: 'Designed 3D U-Net architecture, automated preprocessing pipeline, and integrated experiment tracking to improve training stability, reducing failed runs by 30%.',
    result: 'Improved validation Dice scores on BraTS dataset. Reduced manual data preparation time by 40% and failed training runs by 30%.',
    github: 'https://github.com/marco-suteja/BrainTumor3DSegNet'
  },
  {
    id: 2,
    title: 'Monkeypox Lesion Classifier',
    command: 'run monkeypox_classifier.py',
    tagline: 'Lesion Severity Classification | TensorFlow/Keras',
    problem: 'Rapid Monkeypox diagnosis is critical but visual severity assessment is subjective and inconsistent, especially with imbalanced clinical datasets.',
    solution: 'Built a CNN classifier in TensorFlow/Keras for lesion severity on imbalanced datasets, applying class balancing and cross-validation techniques.',
    stack: ['Python', 'TensorFlow', 'Keras'],
    contribution: 'Designed classification pipeline, applied class balancing strategies, and automated the training workflow to accelerate experimentation cycles.',
    result: 'Improved validation accuracy by 15% through class balancing and cross-validation. Reduced experimentation time by 30% via automated training pipeline.',
    github: 'https://github.com/marco-suteja/MonkeypoxClassifier'
  },
  {
    id: 3,
    title: 'SpeakEasy',
    command: 'run speakeasy_server.py',
    tagline: 'Real-Time Sign Language Interpreter | sub-100ms latency',
    problem: 'ASL users face communication barriers because real-time sign language interpretation tools are either too slow or inaccessible to deploy.',
    solution: 'Built real-time ASL recognition using MediaPipe for hand landmark extraction and TensorFlow for gesture classification, achieving sub-100ms latency.',
    stack: ['FastAPI', 'React', 'TensorFlow', 'MediaPipe', 'Vercel', 'Render'],
    contribution: 'Designed FastAPI backend reducing API response time by 35%, built React frontend, integrated MediaPipe + TensorFlow inference pipeline, and deployed on Vercel and Render.',
    result: 'Achieved sub-100ms inference latency. Deployed full-stack app with 35% improvement in API response time.',
    github: 'https://github.com/marco-suteja/SpeakEasy'
  },
  {
    id: 4,
    title: 'BargAI',
    command: 'run bargai.py',
    tagline: 'Real-Time AI Meeting Assistant | <3s latency',
    problem: 'Professionals need real-time decision support during meetings but have no tool that can passively listen, understand context, and surface relevant insights without disruption.',
    solution: 'Built a real-time meeting assistant that captures live captions from Google Meet/Zoom via Selenium and pipes them through Gemini 2.5 Flash for contextual AI reasoning with <3s latency.',
    stack: ['Python', 'Gemini API', 'Selenium', 'JavaScript'],
    contribution: 'Designed low-latency caption capture pipeline using Selenium, developed JavaScript overlay interface, and integrated Gemini 2.5 Flash for real-time AI reasoning.',
    result: 'Achieved under 3-second pipeline latency for live caption-to-insight generation. Enabled contextual decision support during live conversations.',
    github: 'https://github.com/marco-suteja/BargAI'
  },
  {
    id: 5,
    title: 'UAV Multi-Agent Pathfinding',
    command: 'run mapf_uav.py --env 3d',
    tagline: 'CBS / ECBS / 3D-SIPP | 1.5–2.5x speedup',
    problem: 'Coordinating multiple UAVs in 3D environments without collisions is computationally expensive, and existing algorithms struggle to balance optimality with runtime at scale.',
    solution: 'Implemented CBS, ECBS, and 3D-SIPP algorithms for multi-drone pathfinding in 3D environments simulated in ROS 2 and Gazebo, analyzing runtime and makespan trade-offs.',
    stack: ['Python', 'ROS 2', 'Gazebo'],
    contribution: 'Implemented all three pathfinding algorithms, designed 3D environment configurations with varying agent and obstacle densities, and benchmarked performance across scenarios.',
    result: 'Achieved 1.5–2.5x runtime speedup using ECBS while maintaining near-optimal path cost. Provided comprehensive analysis of trade-offs across algorithms.',
    github: 'https://github.com/marco-suteja/mapf-uav'
  },
  {
    id: 6,
    title: 'Planner Buddy',
    command: 'run planner_buddy.js',
    tagline: 'Collaborative Task Management | Real-time Sync',
    problem: 'Teams and students need a real-time collaborative task manager, but most tools either lack live sync or have clunky drag-and-drop interfaces.',
    solution: 'Built a real-time collaborative task app using React, Convex, and Node.js with drag-and-drop task management and live multi-user sync.',
    stack: ['React', 'Convex', 'Node.js'],
    contribution: 'Implemented drag-and-drop UI improving interaction efficiency by 25%, built real-time sync with Convex, and added validation logic to reduce data inconsistencies.',
    result: 'Achieved 25% improvement in interaction efficiency through drag-and-drop. Reduced data inconsistencies by 20% through validation logic.',
    github: 'https://github.com/marco-suteja/PlannerBuddy'
  },
  {
    id: 7,
    title: 'Herd',
    command: 'run herd_server.ts',
    tagline: 'Music Review Platform | In Progress',
    problem: 'Music listeners have no dedicated social space to write, share, and discover album reviews — existing platforms mix music reviews with unrelated content.',
    solution: 'Building a music review platform where users can rate and review albums, follow other listeners, and discover music through curated community reviews.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    contribution: 'Designing and building full-stack platform from scratch — architecting the database schema, building the REST API, and developing the React frontend.',
    result: 'Currently in active development. Core review and rating features underway with social follow/discovery mechanics planned.',
    github: 'https://github.com/marco-suteja/herd'
  },
  {
    id: 8,
    title: 'CareConnect',
    command: 'run careconnect.py',
    tagline: 'Real-Time Mood Tracking Platform | Firebase',
    problem: 'Mental health apps often lack real-time mood tracking with meaningful analytics, making it hard for users to identify patterns and trends over time.',
    solution: 'Developed a mood tracking app using React and Firebase with real-time sync, and built analytics dashboards to visualize emotional trends and improve user self-awareness.',
    stack: ['React', 'Firebase'],
    contribution: 'Built real-time mood logging with Firebase sync, developed analytics dashboards for trend visualization, and collaborated in an agile team delivering iterative frontend improvements.',
    result: 'Delivered real-time mood tracking with live sync across devices and analytics dashboards that surface emotional trend insights.',
    github: 'https://github.com/marco-suteja/CareConnect'
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
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="terminal-window static-noise rounded-xl overflow-hidden h-full flex flex-col">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-[#E9A53F]/30">
                  <Terminal size={16} className="text-[#E9A53F]" />
                  <span className="text-[#E9A53F] text-xs font-mono flex-1">
                    [project: {project.title}]
                  </span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70 group-hover:animate-pulse"></div>
                  </div>
                </div>

                {/* Command Line */}
                <div className="px-4 py-2 bg-black/40 font-mono text-xs border-b border-[#E9A53F]/20">
                  <span className="text-[#E9A53F]">$ </span>
                  <span className="text-white/80">{project.command}</span>
                </div>

                {/* Project Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">{project.title}</h3>
                    <p className="text-white/70 text-sm">{project.tagline}</p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="text-[10px] px-2 py-1 bg-[#E9A53F]/20 text-[#E9A53F] rounded border border-[#E9A53F]/30 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-[10px] px-2 py-1 bg-white/10 text-white/60 rounded font-mono">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-auto w-full py-2 bg-[#E9A53F]/10 hover:bg-[#E9A53F]/20 text-[#E9A53F] rounded-lg border border-[#E9A53F]/30 hover:border-[#E9A53F]/60 transition-all font-mono text-sm group-hover:shadow-lg group-hover:shadow-[#E9A53F]/20"
                  >
                    <span className="text-[#E9A53F] mr-2">{'>'}</span>
                    View Details
                  </button>
                </div>

                {/* Bottom Status Bar */}
                <div className="px-4 py-2 bg-black/40 border-t border-[#E9A53F]/20 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-white/50">STATUS: <span className="text-[#00E5C4]">READY</span></span>
                  <span className="text-white/50">v1.0</span>
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

            {/* Problem */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    <span className="text-[#E9A53F]">$ </span>cat problem.txt
                  </h3>
                  <div className="glass p-4 rounded-lg border-l-4 border-red-500/50">
                    <p className="text-white/90 leading-relaxed text-justify">{selectedProject.problem}</p>
                  </div>
                </div>

                {/* Solution */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    <span className="text-[#E9A53F]">$ </span>cat solution.txt
                  </h3>
                  <div className="glass p-4 rounded-lg border-l-4 border-[#00E5C4]/50">
                    <p className="text-white/90 leading-relaxed text-justify">{selectedProject.solution}</p>
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
                    <p className="text-white/90 leading-relaxed text-justify">{selectedProject.contribution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    <span className="text-[#E9A53F]">$ </span>cat results.txt
                  </h3>
                  <div className="glass p-4 rounded-lg border-l-4 border-green-500/50">
                    <p className="text-white/90 leading-relaxed text-justify">{selectedProject.result}</p>
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
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

export default Projects
