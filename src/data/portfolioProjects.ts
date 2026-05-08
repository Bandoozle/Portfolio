/** Professional-layer project entries (mirrors retro portfolio projects). */

export interface PortfolioProject {
  id: number
  /** Short label for the index nav (uppercase, monospace). */
  navLabel: string
  title: string
  tagline: string
  stack: string[]
  problem: string
  solution: string
  contribution: string
  result: string
  github?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    navLabel: 'BRAINTUMOR3DSEGNET',
    title: 'BrainTumor3DSegNet',
    tagline: '3D Medical Image Segmentation | PyTorch',
    problem:
      'Accurate brain tumor segmentation from MRI scans is crucial for diagnosis. Manual segmentation is time-consuming and prone to variability.',
    solution:
      'Built a 3D U-Net in PyTorch for volumetric MRI tumor segmentation, with automated preprocessing using NumPy and Pandas to reduce manual data prep time by 40%.',
    stack: ['Python', 'PyTorch', 'NumPy', 'Pandas'],
    contribution:
      'Designed 3D U-Net architecture, automated preprocessing pipeline, and integrated experiment tracking to improve training stability, reducing failed runs by 30%.',
    result:
      'Improved validation Dice scores on BraTS dataset. Reduced manual data preparation time by 40% and failed training runs by 30%.',
    github: 'https://github.com/marco-suteja/BrainTumor3DSegNet',
  },
  {
    id: 2,
    navLabel: 'MONKEYPOX CLASSIFIER',
    title: 'Monkeypox Lesion Classifier',
    tagline: 'Lesion Severity Classification | TensorFlow/Keras',
    problem:
      'Rapid Monkeypox diagnosis is critical but visual severity assessment is subjective and inconsistent, especially with imbalanced clinical datasets.',
    solution:
      'Built a CNN classifier in TensorFlow/Keras for lesion severity on imbalanced datasets, applying class balancing and cross-validation techniques.',
    stack: ['Python', 'TensorFlow', 'Keras'],
    contribution:
      'Designed classification pipeline, applied class balancing strategies, and automated the training workflow to accelerate experimentation cycles.',
    result:
      'Improved validation accuracy by 15% through class balancing and cross-validation. Reduced experimentation time by 30% via automated training pipeline.',
    github: 'https://github.com/marco-suteja/MonkeypoxClassifier',
  },
  {
    id: 3,
    navLabel: 'SPEAKEASY',
    title: 'SpeakEasy',
    tagline: 'Real-Time Sign Language Interpreter | sub-100ms latency',
    problem:
      'ASL users face communication barriers because real-time sign language interpretation tools are either too slow or inaccessible to deploy.',
    solution:
      'Built real-time ASL recognition using MediaPipe for hand landmark extraction and TensorFlow for gesture classification, achieving sub-100ms latency.',
    stack: ['FastAPI', 'React', 'TensorFlow', 'MediaPipe', 'Vercel', 'Render'],
    contribution:
      'Designed FastAPI backend reducing API response time by 35%, built React frontend, integrated MediaPipe + TensorFlow inference pipeline, and deployed on Vercel and Render.',
    result: 'Achieved sub-100ms inference latency. Deployed full-stack app with 35% improvement in API response time.',
    github: 'https://github.com/marco-suteja/SpeakEasy',
  },
  {
    id: 4,
    navLabel: 'BARGAI',
    title: 'BargAI',
    tagline: 'Real-Time AI Meeting Assistant | <3s latency',
    problem:
      'Professionals need real-time decision support during meetings but have no tool that can passively listen, understand context, and surface relevant insights without disruption.',
    solution:
      'Built a real-time meeting assistant that captures live captions from Google Meet/Zoom via Selenium and pipes them through Gemini 2.5 Flash for contextual AI reasoning with <3s latency.',
    stack: ['Python', 'Gemini API', 'Selenium', 'JavaScript'],
    contribution:
      'Designed low-latency caption capture pipeline using Selenium, developed JavaScript overlay interface, and integrated Gemini 2.5 Flash for real-time AI reasoning.',
    result:
      'Achieved under 3-second pipeline latency for live caption-to-insight generation. Enabled contextual decision support during live conversations.',
    github: 'https://github.com/marco-suteja/BargAI',
  },
  {
    id: 5,
    navLabel: 'UAV PATHFINDING',
    title: 'UAV Multi-Agent Pathfinding',
    tagline: 'CBS / ECBS / 3D-SIPP | 1.5–2.5x speedup',
    problem:
      'Coordinating multiple UAVs in 3D environments without collisions is computationally expensive, and existing algorithms struggle to balance optimality with runtime at scale.',
    solution:
      'Implemented CBS, ECBS, and 3D-SIPP algorithms for multi-drone pathfinding in 3D environments simulated in ROS 2 and Gazebo, analyzing runtime and makespan trade-offs.',
    stack: ['Python', 'ROS 2', 'Gazebo'],
    contribution:
      'Implemented all three pathfinding algorithms, designed 3D environment configurations with varying agent and obstacle densities, and benchmarked performance across scenarios.',
    result:
      'Achieved 1.5–2.5x runtime speedup using ECBS while maintaining near-optimal path cost. Provided comprehensive analysis of trade-offs across algorithms.',
    github: 'https://github.com/marco-suteja/mapf-uav',
  },
  {
    id: 6,
    navLabel: 'PLANNER BUDDY',
    title: 'Planner Buddy',
    tagline: 'Collaborative Task Management | Real-time Sync',
    problem:
      'Teams and students need a real-time collaborative task manager, but most tools either lack live sync or have clunky drag-and-drop interfaces.',
    solution:
      'Built a real-time collaborative task app using React, Convex, and Node.js with drag-and-drop task management and live multi-user sync.',
    stack: ['React', 'Convex', 'Node.js'],
    contribution:
      'Implemented drag-and-drop UI improving interaction efficiency by 25%, built real-time sync with Convex, and added validation logic to reduce data inconsistencies.',
    result:
      'Achieved 25% improvement in interaction efficiency through drag-and-drop. Reduced data inconsistencies by 20% through validation logic.',
    github: 'https://github.com/marco-suteja/PlannerBuddy',
  },
  {
    id: 7,
    navLabel: 'HERD',
    title: 'Herd',
    tagline: 'Music Review Platform | In Progress',
    problem:
      'Music listeners have no dedicated social space to write, share, and discover album reviews — existing platforms mix music reviews with unrelated content.',
    solution:
      'Building a music review platform where users can rate and review albums, follow other listeners, and discover music through curated community reviews.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    contribution:
      'Designing and building full-stack platform from scratch — architecting the database schema, building the REST API, and developing the React frontend.',
    result:
      'Currently in active development. Core review and rating features underway with social follow/discovery mechanics planned.',
    github: 'https://github.com/marco-suteja/herd',
  },
  {
    id: 8,
    navLabel: 'CARECONNECT',
    title: 'CareConnect',
    tagline: 'Real-Time Mood Tracking Platform | Firebase',
    problem:
      'Mental health apps often lack real-time mood tracking with meaningful analytics, making it hard for users to identify patterns and trends over time.',
    solution:
      'Developed a mood tracking app using React and Firebase with real-time sync, and built analytics dashboards to visualize emotional trends and improve user self-awareness.',
    stack: ['React', 'Firebase'],
    contribution:
      'Built real-time mood logging with Firebase sync, developed analytics dashboards for trend visualization, and collaborated in an agile team delivering iterative frontend improvements.',
    result:
      'Delivered real-time mood tracking with live sync across devices and analytics dashboards that surface emotional trend insights.',
    github: 'https://github.com/marco-suteja/CareConnect',
  },
]
