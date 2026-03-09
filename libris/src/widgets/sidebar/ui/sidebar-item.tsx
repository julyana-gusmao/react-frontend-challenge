import type { LucideIcon } from "lucide-react"

interface Props {
  collapsed: boolean
  active?: boolean
  label: string
  icon: LucideIcon
  onClick: () => void
}

export function SidebarItem({
  collapsed,
  active,
  label,
  icon: Icon,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : ""}
      className={`
        w-full flex items-center
        ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"}
        rounded-lg transition-colors
        ${active ? "bg-muted font-medium" : "hover:bg-muted/50"}
      `}
    >
      <Icon size={18} className="shrink-0" />

      <span
        className={`
          whitespace-nowrap overflow-hidden
          transition-all duration-200
          ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
        `}
      >
        {label}
      </span>
    </button>
  )
}