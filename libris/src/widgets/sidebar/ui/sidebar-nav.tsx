import { MENU } from "@/widgets/sidebar/lib/sidebar-menu"
import { SidebarItem } from "./sidebar-item"
import type { NavigateFn } from "@tanstack/react-router"

interface Props {
  collapsed: boolean
  pathname: string
  navigate: NavigateFn
}

export function SidebarNav({
  collapsed,
  pathname,
  navigate,
}: Props) {
  return (
    <nav className="flex-1 p-3 space-y-2">
      {MENU.map((item) => (
        <SidebarItem
          key={item.key}
          collapsed={collapsed}
          active={pathname === item.path}
          label={item.label}
          icon={item.icon}
          onClick={() => navigate({ to: item.path })}
        />
      ))}
    </nav>
  )
}