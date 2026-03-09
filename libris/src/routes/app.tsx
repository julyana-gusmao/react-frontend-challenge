
import { PrivateLayout } from "@/app/layouts/private-layout"
import { requireAuth } from "@/features/auth/lib/require-auth"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app")({
  beforeLoad: requireAuth,
  component: PrivateLayout,
})