import { describe, it, expect, beforeEach } from "vitest"
import { useAuthStore } from "@/features/auth/model/auth-store"

describe("useAuthStore", () => {
    beforeEach(() => {
        localStorage.clear()
        useAuthStore.setState({ token: null })
    })

    it("login stores token and updates state", () => {
        useAuthStore.getState().login("fake-token")
        expect(localStorage.getItem("token")).toBe("fake-token")
        expect(useAuthStore.getState().token).toBe("fake-token")
    })

    it("logout removes token and theme, cleans dark class", () => {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
        useAuthStore.getState().logout()
        expect(localStorage.getItem("token")).toBeNull()
        expect(localStorage.getItem("theme")).toBeNull()
        expect(document.documentElement.classList.contains("dark")).toBe(false)
        expect(useAuthStore.getState().token).toBeNull()
    })
})