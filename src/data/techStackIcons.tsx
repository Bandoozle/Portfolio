import type { ComponentType } from 'react'
import {
  SiFastapi,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGooglegemini,
  SiJavascript,
  SiKeras,
  SiMediapipe,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRender,
  SiRos,
  SiSelenium,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si'

type TechIconProps = { className?: string; 'aria-hidden'?: boolean }

export type TechStackIconDef = {
  Icon?: ComponentType<TechIconProps>
  /** Simple Icons CDN fallback when react-icons has no export */
  iconUrl?: string
}

/** Maps portfolio `stack` strings to icon components or CDN logos. */
export const techStackIconMap: Record<string, TechStackIconDef> = {
  Python: { Icon: SiPython },
  PyTorch: { Icon: SiPytorch },
  NumPy: { Icon: SiNumpy },
  Pandas: { Icon: SiPandas },
  TensorFlow: { Icon: SiTensorflow },
  Keras: { Icon: SiKeras },
  FastAPI: { Icon: SiFastapi },
  React: { Icon: SiReact },
  MediaPipe: { Icon: SiMediapipe },
  Vercel: { Icon: SiVercel },
  Render: { Icon: SiRender },
  'Gemini API': { Icon: SiGooglegemini },
  Selenium: { Icon: SiSelenium },
  JavaScript: { Icon: SiJavascript },
  'ROS 2': { Icon: SiRos },
  'Node.js': { Icon: SiNodedotjs },
  TypeScript: { Icon: SiTypescript },
  PostgreSQL: { Icon: SiPostgresql },
  Firebase: { Icon: SiFirebase },
  Convex: { iconUrl: 'https://cdn.simpleicons.org/convex/0B0B0A' },
  'Next.js': { Icon: SiNextdotjs },
  Supabase: { Icon: SiSupabase },
  'Tailwind CSS': { Icon: SiTailwindcss },
  Vite: { Icon: SiVite },
  Git: { Icon: SiGit },
  'Framer Motion': { Icon: SiFramer },
  'Deep Learning': { Icon: SiPytorch },
}
