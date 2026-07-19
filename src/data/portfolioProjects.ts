/** Professional-layer project entries (mirrors retro portfolio projects). */

import bargaiImage from '../images/bargai.png'
import blueprintVideo from '../images/blueprint.mp4'
import brainVideo from '../images/brain.mp4'
import droneImage from '../images/drone.png'
import fourVideo from '../images/four.mp4'
import gitwrappedImage from '../images/gitwrapped.png'
import plannerImage from '../images/planner.png'
import careconnectVideo from '../images/careconnect.mp4'
import herdImage from '../images/herd.png'
import speakEasyImage from '../images/speakeasy.png'
import monkeyVideo from '../images/monkeypox.mp4'

export type ProjectGroup = 'main' | 'professional'

export interface PortfolioProject {
  id: number
  /** Short label for the index nav (uppercase, monospace). */
  navLabel: string
  title: string
  /** One-line role descriptor shown on detail page. */
  subtitle: string
  tagline: string
  /** Long-form description for project detail view. */
  description: string
  stack: string[]
  problem: string
  solution: string
  contribution: string
  result: string
  github?: string
  image?: string
  /** Looping panel preview video (replaces image when set). */
  video?: string
  /** Use contain for non-landscape assets so nothing important gets cropped. */
  imageFit?: 'cover' | 'contain'
  /** Display year in grid/list meta (PODIUM-style). */
  year: string
  /** Short category label — list/grid meta column. */
  category: string
  group: ProjectGroup
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 12,
    navLabel: 'GITWRAPPED',
    title: 'GitWrapped',
    subtitle: 'GitHub → Shareable Project Carousel',
    tagline: 'Turn any repo into a recruiter-ready carousel | Next.js',
    description:
      'GitWrapped turns any GitHub repository into a beautiful, shareable 4-card carousel for LinkedIn, X, portfolios, and resumes. Sign in with GitHub OAuth, import a repo, edit project / features / engineering / shipped cards, then publish a live share link at /s/[id] or export PNGs for social uploads.',
    stack: ['Next.js', 'TypeScript', 'Auth.js', 'Vercel Blob', 'GitHub OAuth'],
    problem:
      'Developers struggle to present GitHub work as polished, shareable stories for recruiters and social — screenshots and READMEs do not travel well on LinkedIn or X.',
    solution:
      'Built a Next.js app that imports a repo via GitHub OAuth, generates a recruiter-ready 4-card carousel, and publishes durable share links plus PNG exports for LinkedIn, Instagram, and X.',
    contribution:
      'Designed the import → template → edit → publish flow, wired GitHub OAuth with minimal scopes, share persistence via Vercel Blob for live /s/[id] links, and PNG export for social uploads. Drafts stay in localStorage; only owners can overwrite published shares.',
    result:
      'Shipped an end-to-end product: OAuth sign-in, repo import, editable carousel cards, shareable live links, and downloadable PNGs — distinguishing GitHub signals, system suggestions, and user edits.',
    github: 'https://github.com/marco-suteja/GitWrapped',
    image: gitwrappedImage,
    year: '2026',
    category: 'Developer Tool',
    group: 'main',
  },
  {
    id: 1,
    navLabel: 'BARGAI',
    title: 'BargAI',
    subtitle: 'Real-Time AI Meeting Assistant',
    tagline: 'Real-Time AI Meeting Assistant | <3s latency',
    description:
      'BargAI is a real-time AI meeting assistant that captures live captions from meetings and turns them into useful summaries, insights, and follow-up points. I built a low-latency Python processing pipeline with Selenium caption capture and Gemini API integration, delivering AI-generated meeting insights in under 3 seconds.',
    stack: ['Python', 'JavaScript', 'Gemini API', 'Selenium'],
    problem:
      'Professionals need real-time decision support during meetings but have no tool that can passively listen, understand context, and surface relevant insights without disruption.',
    solution:
      'Built a real-time meeting assistant that captures live captions from Google Meet/Zoom via Selenium and pipes them through Gemini 2.5 Flash for contextual AI reasoning with <3s latency.',
    contribution:
      'Designed low-latency caption capture pipeline using Selenium, developed JavaScript overlay interface, and integrated Gemini 2.5 Flash for real-time AI reasoning.',
    result:
      'Achieved under 3-second pipeline latency for live caption-to-insight generation. Enabled contextual decision support during live conversations.',
    github: 'https://github.com/marco-suteja/BargAI',
    image: bargaiImage,
    year: '2025',
    category: 'AI Assistant',
    group: 'main',
  },
  {
    id: 2,
    navLabel: 'BRAIN TUMOR SEGMENTATION',
    title: 'Brain Tumor Segmentation Tool',
    subtitle: '3D Medical Image Segmentation',
    tagline: '3D Medical Image Segmentation | PyTorch',
    description:
      'BrainTumor3DSegNet is a deep learning project for automated brain tumor MRI segmentation using 3D medical imaging data. I built preprocessing, training, validation, and evaluation pipelines to support segmentation-quality analysis and reduce failed training iterations through better validation checks and metric tracking.',
    stack: ['Python', 'PyTorch', 'NumPy', 'Pandas'],
    problem:
      'Accurate brain tumor segmentation from MRI scans is crucial for diagnosis. Manual segmentation is time-consuming and prone to variability.',
    solution:
      'Built a 3D U-Net in PyTorch for volumetric MRI tumor segmentation, with automated preprocessing using NumPy and Pandas to reduce manual data prep time by 40%.',
    contribution:
      'Designed 3D U-Net architecture, automated preprocessing pipeline, and integrated experiment tracking to improve training stability, reducing failed runs by 30%.',
    result:
      'Improved validation Dice scores on BraTS dataset. Reduced manual data preparation time by 40% and failed training runs by 30%.',
    github: 'https://github.com/marco-suteja/BrainTumor3DSegNet',
    video: brainVideo,
    year: '2024',
    category: 'Medical ML',
    group: 'main',
  },
  {
    id: 7,
    navLabel: 'MONKEYPOX CLASSIFIER',
    title: 'Monkeypox / HFMD Image Classification',
    subtitle: 'Monkeypox / HFMD Image Classification',
    tagline: 'Lesion Severity Classification | TensorFlow/Keras',
    description:
      'This medical image classification project focused on distinguishing visual patterns across infectious skin-condition image datasets. I worked on preprocessing, model training, evaluation, and classification-performance analysis to support automated image-based disease screening workflows.',
    stack: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
    problem:
      'Rapid Monkeypox diagnosis is critical but visual severity assessment is subjective and inconsistent, especially with imbalanced clinical datasets.',
    solution:
      'Built a CNN classifier in TensorFlow/Keras for lesion severity on imbalanced datasets, applying class balancing and cross-validation techniques.',
    contribution:
      'Designed classification pipeline, applied class balancing strategies, and automated the training workflow to accelerate experimentation cycles.',
    result:
      'Improved validation accuracy by 15% through class balancing and cross-validation. Reduced experimentation time by 30% via automated training pipeline.',
    github: 'https://github.com/marco-suteja/MonkeypoxClassifier',
    year: '2023',
    category: 'Computer Vision',
    video: monkeyVideo,
    group: 'main',
  },
  {
    id: 4,
    navLabel: 'PLANNER BUDDY',
    title: 'Planner Buddy',
    subtitle: 'Collaborative Task Management Platform',
    tagline: 'Collaborative Task Management | Real-time Sync',
    description:
      'PlannerBuddy is a collaborative productivity platform for managing tasks, reminders, status updates, and shared workflows. I built reusable task components, backend validation, and database-backed real-time state, reducing data inconsistencies by 20%.',
    stack: ['React', 'Convex', 'Node.js'],
    problem:
      'Teams and students need a real-time collaborative task manager, but most tools either lack live sync or have clunky drag-and-drop interfaces.',
    solution:
      'Built a real-time collaborative task app using React, Convex, and Node.js with drag-and-drop task management and live multi-user sync.',
    contribution:
      'Implemented drag-and-drop UI improving interaction efficiency by 25%, built real-time sync with Convex, and added validation logic to reduce data inconsistencies.',
    result:
      'Achieved 25% improvement in interaction efficiency through drag-and-drop. Reduced data inconsistencies by 20% through validation logic.',
    github: 'https://github.com/marco-suteja/PlannerBuddy',
    image: plannerImage,
    year: '2024',
    category: 'Productivity',
    group: 'main',
  },
  {
    id: 5,
    navLabel: 'CARECONNECT',
    title: 'CareConnect',
    subtitle: 'Real-Time Mood Tracking Platform',
    tagline: 'Real-Time Mood Tracking Platform | Firebase',
    description:
      'CareConnect is a real-time tracking platform designed to help users log mood data and visualize patterns over time. I built persistent React and Firebase data flows, analytics views, and real-time dashboard features to make engagement and behavior trends easier to understand.',
    stack: ['React', 'Firebase'],
    problem:
      'Mental health apps often lack real-time mood tracking with meaningful analytics, making it hard for users to identify patterns and trends over time.',
    solution:
      'Developed a mood tracking app using React and Firebase with real-time sync, and built analytics dashboards to visualize emotional trends and improve user self-awareness.',
    contribution:
      'Built real-time mood logging with Firebase sync, developed analytics dashboards for trend visualization, and collaborated in an agile team delivering iterative frontend improvements.',
    result:
      'Delivered real-time mood tracking with live sync across devices and analytics dashboards that surface emotional trend insights.',
    github: 'https://github.com/marco-suteja/CareConnect',
    year: '2023',
    category: 'Healthcare',
    video: careconnectVideo,
    group: 'main',
  },
  {
    id: 6,
    navLabel: 'UAV PATHFINDING',
    title: 'Multi-Agent Pathfinding for UAV Coordination',
    subtitle: 'Multi-Agent Pathfinding for UAV Coordination',
    tagline: 'CBS / ECBS / 3D-SIPP | 1.5–2.5x speedup',
    description:
      'This project simulates path planning for multiple UAV agents navigating shared environments with obstacles. I compared algorithms including CBS, ECBS, and 3D-SIPP, measuring runtime, makespan, success rate, and path quality across different agent counts and obstacle densities.',
    stack: ['Python', 'ROS 2', 'Gazebo'],
    problem:
      'Coordinating multiple UAVs in 3D environments without collisions is computationally expensive, and existing algorithms struggle to balance optimality with runtime at scale.',
    solution:
      'Implemented CBS, ECBS, and 3D-SIPP algorithms for multi-drone pathfinding in 3D environments simulated in ROS 2 and Gazebo, analyzing runtime and makespan trade-offs.',
    contribution:
      'Implemented all three pathfinding algorithms, designed 3D environment configurations with varying agent and obstacle densities, and benchmarked performance across scenarios.',
    result:
      'Achieved 1.5–2.5x runtime speedup using ECBS while maintaining near-optimal path cost. Provided comprehensive analysis of trade-offs across algorithms.',
    github: 'https://github.com/marco-suteja/mapf-uav',
    image: droneImage,
    year: '2024',
    category: 'Robotics',
    group: 'main',
  },
  {
    id: 11,
    navLabel: 'SFU BLUEPRINT',
    title: 'SFU Blueprint Website Revamp',
    subtitle: 'Nonprofit Website Revamp',
    tagline: 'SFU Blueprint | React + Vite',
    description:
      'This project involved building production-ready frontend features for nonprofit websites through SFU Blueprint. I translated Figma designs into responsive React/Vite components, refactored reusable layouts, shipped multiple production page updates, and improved site performance by 30%.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Git'],
    problem:
      'Non-profit clients needed responsive, production-ready web features delivered from design specs on tight volunteer timelines.',
    solution:
      'Translated Figma designs into responsive React/Vite components and shipped iterative production updates for nonprofit sites.',
    contribution:
      'Built responsive components, refactored reusable layouts, and improved site performance by 30%.',
    result: 'Delivered multiple production page updates for nonprofit clients through SFU Blueprint.',
    video: blueprintVideo,
    year: '2024',
    category: 'Nonprofit',
    group: 'professional',
  },
  {
    id: 8,
    navLabel: 'HERD',
    title: 'Herd',
    subtitle: 'Music Review Platform',
    tagline: 'Music Review Platform | In Progress',
    description:
      'Herd is a music review platform where users can rate and review albums, follow other listeners, and discover music through curated community reviews. I am designing and building the full-stack platform from scratch — architecting the database schema, REST API, and React frontend.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    problem:
      'Music listeners have no dedicated social space to write, share, and discover album reviews — existing platforms mix music reviews with unrelated content.',
    solution:
      'Building a music review platform where users can rate and review albums, follow other listeners, and discover music through curated community reviews.',
    contribution:
      'Designing and building full-stack platform from scratch — architecting the database schema, building the REST API, and developing the React frontend.',
    result:
      'Currently in active development. Core review and rating features underway with social follow/discovery mechanics planned.',
    github: 'https://github.com/marco-suteja/herd',
    year: '2025',
    category: 'Social Platform',
    image: herdImage,
    group: 'main',
  },
  {
    id: 10,
    navLabel: 'FOUR CLOTHING',
    title: 'FOUR Clothing',
    subtitle: 'E-Commerce Storefront',
    tagline: 'Fashion E-Commerce | Next.js',
    description:
      'FOUR Clothing is a production e-commerce website built for a fashion brand I co-founded. I developed the storefront, optimized page performance by 25%, implemented product and campaign sections, and added analytics tracking to improve visibility into customer behavior and sales funnels.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    problem:
      'A new fashion brand needed a fast, polished storefront with campaign-ready product pages and visibility into customer behavior.',
    solution:
      'Built a production Next.js e-commerce site with optimized performance, product/campaign sections, and analytics integration.',
    contribution:
      'Developed the storefront, improved page performance by 25%, and implemented analytics tracking for sales funnel visibility.',
    result: 'Shipped a production e-commerce site with measurably faster page loads and analytics-driven funnel insights.',
    video: fourVideo,
    year: '2024',
    category: 'E-Commerce',
    group: 'professional',
  },
  {
    id: 3,
    navLabel: 'SPEAKEASY',
    title: 'SpeakEasy',
    subtitle: 'Real-Time Sign Language Interpreter',
    tagline: 'Real-Time Sign Language Interpreter | sub-100ms latency',
    description:
      'SpeakEasy is a real-time sign language interpretation web app that converts hand gesture model outputs into user-facing predictions. I built the React frontend and FastAPI backend, optimized model inference endpoints, and improved latency by 35% for a smoother real-time experience.',
    stack: ['FastAPI', 'React', 'TensorFlow', 'MediaPipe'],
    problem:
      'ASL users face communication barriers because real-time sign language interpretation tools are either too slow or inaccessible to deploy.',
    solution:
      'Built real-time ASL recognition using MediaPipe for hand landmark extraction and TensorFlow for gesture classification, achieving sub-100ms latency.',
    contribution:
      'Designed FastAPI backend reducing API response time by 35%, built React frontend, integrated MediaPipe + TensorFlow inference pipeline, and deployed on Vercel and Render.',
    result: 'Achieved sub-100ms inference latency. Deployed full-stack app with 35% improvement in API response time.',
    github: 'https://github.com/marco-suteja/SpeakEasy',
    year: '2024',
    category: 'Real-Time ML',
    group: 'main',
    image: speakEasyImage,
  },
]
