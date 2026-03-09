import { QueryProvider } from "./query-provider"
import { AuthProvider } from "@/features/auth/provider/auth-provider"
import { Toaster } from "sonner"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  )
}