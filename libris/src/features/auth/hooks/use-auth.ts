import { useAuthStore } from "../model/auth-store"

export function useAuth() {
    const token = useAuthStore((s) => s.token)
    const login = useAuthStore((s) => s.login)
    const logout = useAuthStore((s) => s.logout)

    const isAuthenticated = !!token

    return {
        token,
        isAuthenticated,
        login,
        logout,
    }
}