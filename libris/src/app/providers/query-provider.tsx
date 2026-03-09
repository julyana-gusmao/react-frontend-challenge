import { queryClient } from "@/shared/lib/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}