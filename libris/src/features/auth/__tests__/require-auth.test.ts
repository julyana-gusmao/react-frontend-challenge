import { describe, it, expect, vi } from "vitest"
import { useAuthStore } from "@/features/auth/model/auth-store"
import { requireAuth } from "../lib/require-auth"

vi.mock("@tanstack/react-router", () => ({ redirect: vi.fn(() => { throw "redirect" }) }))

describe("requireAuth", () => {
    it("throws redirect when there is no token", () => {
        useAuthStore.setState({ token: null })
        expect(() => requireAuth()).toThrow()
    })

    it("does not launch redirect when there is a token", () => {
        useAuthStore.setState({ token: "fake-token" })
        expect(() => requireAuth()).not.toThrow()
    })
})