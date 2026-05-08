import { Gamepad2, Music, Wrench, Hand, Plane, Camera } from 'lucide-react'

const interests = [
  { label: 'Gaming', Icon: Gamepad2 },
  { label: 'Music', Icon: Music },
  { label: 'Fitness', Icon: Wrench },
  { label: 'Food', Icon: Hand },
  { label: 'Travel', Icon: Plane },
  { label: 'Photography', Icon: Camera },
]

const PersonalRightColumn = () => {
  return (
    <aside className="flex min-h-0 min-w-0 flex-col bg-black p-3 lg:p-4">
      <div className="min-h-0 flex-1">
        <p className="personal-os-section-title">&gt; INTERESTS</p>
        <ul className="list-none space-y-1 p-0">
          {interests.map(({ label, Icon }) => (
            <li key={label} className="personal-os-interest-row">
              <Icon className="personal-os-interest-icon" aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="personal-os-border mt-4 shrink-0 p-3">
        <p className="personal-os-section-title">&gt; CURRENTLY</p>
        <p className="text-[20px] leading-snug text-[#ffb000]/90">
          Building cool things and becoming 1% better everyday.
        </p>
      </div>
    </aside>
  )
}

export default PersonalRightColumn
