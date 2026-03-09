import { LogOut, Moon, Sun } from "lucide-react"
import { SidebarItem } from "./sidebar-item"

interface Props {
  collapsed: boolean
  theme?: string
  setTheme: (theme: string) => void
  onLogout: () => void
}

export function SidebarFooter({
  collapsed,
  theme,
  setTheme,
  onLogout,
}: Props) {
  return (
    <footer className="p-3 border-t space-y-2">
      <SidebarItem
        collapsed={collapsed}
        label="Tema"
        icon={theme === "dark" ? Sun : Moon}
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
      />

      <SidebarItem
        collapsed={collapsed}
        label="Sair"
        icon={LogOut}
        onClick={onLogout}
      />
    </footer>
  )
}