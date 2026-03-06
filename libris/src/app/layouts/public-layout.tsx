import { Outlet } from "@tanstack/react-router"

export function PublicLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Outlet />
    </div>
  )
}