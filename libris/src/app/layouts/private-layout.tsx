import { Outlet } from "@tanstack/react-router"
import { AppSidebar } from "../widgets/sidebar/sidebar"
import { ThemeProvider } from "../providers/theme-provider"

export function PrivateLayout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background text-foreground">

        <AppSidebar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>
    </ThemeProvider>
  )
}