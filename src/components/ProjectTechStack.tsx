import { techStackIconMap } from '../data/techStackIcons'

const FONT_BODY = {
  fontFamily: "'Satoshi', 'Inter', 'Helvetica Neue', Arial, sans-serif",
  fontStyle: 'normal' as const,
}

type ProjectTechStackProps = {
  stack: string[]
  className?: string
  variant?: 'paper' | 'dark'
}

const ProjectTechStack = ({ stack, className = '', variant = 'paper' }: ProjectTechStackProps) => {
  if (stack.length === 0) return null

  const isDark = variant === 'dark'

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {stack.map((tech) => {
        const def = techStackIconMap[tech]

        return (
          <span
            key={tech}
            title={tech}
            className={`inline-flex h-9 items-center gap-2 rounded-[4px] px-2.5 transition-colors duration-200 ${
              isDark
                ? 'bg-[#E5E5E0]/[0.06] text-[#E5E5E0]/75 hover:bg-[#E5E5E0]/[0.1] hover:text-[#E5E5E0]'
                : 'bg-[#0B0B0A]/[0.06] text-[#0B0B0A]/75 hover:bg-[#0B0B0A]/[0.1] hover:text-[#0B0B0A]'
            }`}
          >
            {def?.Icon ? (
              <def.Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
            ) : def?.iconUrl ? (
              <img
                src={def.iconUrl}
                alt=""
                className="h-[18px] w-[18px] shrink-0 object-contain"
                loading="lazy"
              />
            ) : (
              <span
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-[9px] font-bold uppercase leading-none tracking-tight"
                style={FONT_BODY}
                aria-hidden
              >
                {tech.slice(0, 2)}
              </span>
            )}
            <span className="text-[12px] font-medium leading-none tracking-[-0.01em]" style={FONT_BODY}>
              {tech}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default ProjectTechStack
