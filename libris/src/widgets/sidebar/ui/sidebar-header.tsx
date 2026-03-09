import { PanelLeft } from "lucide-react"

interface Props {
  collapsed: boolean
  toggle: () => void
}

export function SidebarHeader({ collapsed, toggle }: Props) {
  return (
    <header
      className={`flex items-center border-b p-4 ${
        collapsed ? "justify-center" : "justify-between"
      }`}
    >
      {!collapsed && (
        <span className="font-semibold text-lg whitespace-nowrap">
          Libris
        </span>
      )}

      <button
        onClick={toggle}
        className="p-2 rounded hover:bg-muted shrink-0"
      >
        <PanelLeft size={18} />
      </button>
    </header>
  )
}