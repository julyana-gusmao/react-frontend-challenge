import { useState } from "react"
import { Home, Book, LogOut, PanelLeft, Moon, Sun } from "lucide-react"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { useTheme } from "next-themes"

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

  const menu = [
    {
      key: "home",
      label: "Explorar Livros",
      icon: Home,
      path: "/app/books",
    },
    {
      key: "bookshelf",
      label: "Minha Estante",
      icon: Book,
      path: "/app/bookshelf",
    },
  ]

  return (
    <aside
      className={`
        h-screen border-r bg-background flex flex-col
        transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
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
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-muted shrink-0"
        >
          <PanelLeft size={18} />
        </button>
      </header>

      <nav className="flex-1 p-3 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon
          const active = pathname === item.path

          return (
            <button
              key={item.key}
              onClick={() => navigate({ to: item.path })}
              title={collapsed ? item.label : ""}
              className={`
                w-full flex items-center
                ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"}
                rounded-lg transition-colors
                ${
                  active
                    ? "bg-muted font-medium"
                    : "hover:bg-muted/50"
                }
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
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <footer className="p-3 border-t space-y-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={collapsed ? "Alternar tema" : ""}
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"}
            rounded-lg hover:bg-muted
          `}
        >
          {theme === "dark" ? (
            <Sun size={18} className="shrink-0" />
          ) : (
            <Moon size={18} className="shrink-0" />
          )}

          <span
            className={`
              whitespace-nowrap overflow-hidden
              transition-all duration-200
              ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
            `}
          >
            Tema
          </span>
        </button>

        <button
          onClick={handleLogout}
          title={collapsed ? "Sair" : ""}
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"}
            rounded-lg hover:bg-muted
          `}
        >
          <LogOut size={18} className="shrink-0" />

          <span
            className={`
              whitespace-nowrap overflow-hidden
              transition-all duration-200
              ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
            `}
          >
            Sair
          </span>
        </button>
      </footer>
    </aside>
  )
}