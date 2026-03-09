import { describe, it, expect } from "vitest"
import { login } from "@/features/auth/api/login"

describe("login API", () => {
    it("returns token and user for valid credentials", async () => {
        const response = await login("test@example.com", "123456")
        expect(response).toHaveProperty("token")
        expect(response.user.email).toBe("test@example.com")
    })

    it("throws error for invalid credentials", async () => {
        await expect(login("", "")).rejects.toThrow("Credenciais inválidas")
    })
})