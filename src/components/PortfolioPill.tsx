import type { CSSProperties, ReactNode } from 'react'

type PortfolioPillSize = 'sm' | 'md' | 'lg'
type PortfolioPillVariant = 'primary' | 'outline'

type PortfolioPillProps = {
  href: string
  children: ReactNode
  variant?: PortfolioPillVariant
  size?: PortfolioPillSize
  className?: string
  style?: CSSProperties
  showArrow?: boolean
  target?: string
  rel?: string
}

const sizeClasses: Record<PortfolioPillSize, { root: string; rootPlain: string; icon: string }> = {
  sm: {
    root: 'gap-1 pl-2 pr-0.5 py-0.5 text-[0.65rem] uppercase tracking-[0.14em]',
    rootPlain: 'px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em]',
    icon: 'h-5 w-5 rounded-[3px]',
  },
  md: {
    root: 'gap-1 pl-2.5 pr-0.5 py-1 text-[0.78rem] uppercase tracking-[0.14em]',
    rootPlain: 'px-2.5 py-1 text-[0.78rem] uppercase tracking-[0.14em]',
    icon: 'h-7 w-7 rounded-[3px]',
  },
  lg: {
    root: 'gap-1.5 pl-3 pr-0.5 py-1 text-[28px] font-semibold lowercase leading-none tracking-[-0.05em]',
    rootPlain: 'px-3 py-1 text-[28px] font-semibold lowercase leading-none tracking-[-0.05em]',
    icon: 'h-9 w-9 rounded-[4px]',
  },
}

const variantClasses: Record<PortfolioPillVariant, { root: string; icon: string }> = {
  primary: {
    root: 'bg-[#191816] text-[#E5E5E0] hover:bg-[#222220]',
    icon: 'bg-[#2a2926] text-[#E5E5E0] group-hover:bg-[#333330]',
  },
  outline: {
    root: 'border border-[#0B0B0A]/15 bg-[#E5E5E0] text-[#0B0B0A] hover:bg-[#E5E5E0]/80',
    icon: 'bg-[#191816] text-[#E5E5E0] group-hover:bg-[#222220]',
  },
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    className={className ?? 'h-3.5 w-3.5'}
    aria-hidden
  >
    <path
      d="M4.5 11.5L11.5 4.5M11.5 4.5H6.25M11.5 4.5V9.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PortfolioPill = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  showArrow = false,
  target,
  rel,
}: PortfolioPillProps) => (
  <a
    href={href}
    target={target}
    rel={rel}
    style={style}
    className={[
      'group inline-flex items-center rounded-[4px] transition-colors duration-200',
      showArrow ? sizeClasses[size].root : sizeClasses[size].rootPlain,
      variantClasses[variant].root,
      className,
    ].join(' ')}
  >
    <span className="whitespace-nowrap">{children}</span>

    {showArrow ? (
      <span
        className={[
          'inline-flex shrink-0 items-center justify-center transition-colors duration-200',
          sizeClasses[size].icon,
          variantClasses[variant].icon,
        ].join(' ')}
        aria-hidden
      >
        <ArrowIcon />
      </span>
    ) : null}
  </a>
)

export default PortfolioPill