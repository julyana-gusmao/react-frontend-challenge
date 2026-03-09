import { generateFakeToken } from "../lib/token"
import { type LoginResponse } from "../model/types"

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    await new Promise((r) => setTimeout(r, 500))

    if (!email || !password) {
        throw new Error("Credenciais inválidas")
    }

    return {
        token: generateFakeToken(),
        user: {
            email,
        },
    }
}