import { PERSONAL_TABS, type PersonalTab } from './types'

type PersonalSidebarProps = {
  active: PersonalTab
  onSelect: (id: PersonalTab) => void
}

const PersonalSidebar = ({ active, onSelect }: PersonalSidebarProps) => {
  return (
    <aside className="flex min-h-0 min-w-0 flex-col bg-black p-3 lg:p-4">
      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto" aria-label="Personal OS sections">
        {PERSONAL_TABS.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`personal-os-nav-btn ${isActive ? 'personal-os-nav-btn--active' : ''}`}
            >
              {isActive ? `> ${item.label}` : item.label}
            </button>
          )
        })}
      </nav>

      <div className="personal-os-border mt-4 shrink-0 p-3">
        <p className="personal-os-section-title">&gt; QUOTE</p>
        <p className="text-[20px] leading-snug text-[#ffb000]/85">
          &quot;Code is how I shape ideas. Curiosity is why I never stop.&quot;
        </p>
      </div>
    </aside>
  )
}

export default PersonalSidebar
