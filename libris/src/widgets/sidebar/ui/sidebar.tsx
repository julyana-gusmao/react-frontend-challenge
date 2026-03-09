import { useState } from "react"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useTheme } from "next-themes"
import { SidebarNav } from "./sidebar-nav"
import { SidebarHeader } from "./sidebar-header"
import { SidebarFooter } from "./sidebar-footer"

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()
  const { logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  })

  function handleLogout() {
    logout()
    navigate({ to: "/login" })
  }

  return (
    <aside
      className={`
        h-screen border-r bg-background flex flex-col
        transition-all duration-300 sticky top-0
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      <SidebarHeader
        collapsed={collapsed}
        toggle={() => setCollapsed(!collapsed)}
      />

      <SidebarNav
        collapsed={collapsed}
        pathname={pathname}
        navigate={navigate}
      />

      <SidebarFooter
        collapsed={collapsed}
        theme={theme}
        setTheme={setTheme}
        onLogout={handleLogout}
      />
    </aside>
  )
}