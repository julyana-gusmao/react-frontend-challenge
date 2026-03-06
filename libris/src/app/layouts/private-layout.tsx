import { Outlet } from "@tanstack/react-router"
import { AppSidebar } from "../widgets/sidebar/sidebar"

export function PrivateLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">

      <AppSidebar />

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  )
}