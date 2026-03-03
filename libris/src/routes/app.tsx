import { requireAuth } from "@/features/auth/lib/require-auth"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/app")({
  beforeLoad: requireAuth,
  component: () => <Outlet />,
})