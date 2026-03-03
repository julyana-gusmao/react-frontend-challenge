import { type ReactNode, useEffect } from "react"
import { useAuthStore } from "../model/auth-store"

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const login = useAuthStore((s) => s.login)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      login(token)
    }
  }, [login])

  return <>{children}</>
}