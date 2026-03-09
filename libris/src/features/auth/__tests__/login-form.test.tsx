import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, vi, expect, beforeEach } from "vitest"
import * as api from "@/features/auth/api/login"
import { useAuthStore } from "@/features/auth/model/auth-store"
import { LoginForm } from "../ui/login-form"
import "@testing-library/jest-dom"

vi.mock("@tanstack/react-router", async () => {
  /* eslint-disable */
  const actual = await vi.importActual<any>("@tanstack/react-router")
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

describe("LoginForm", () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null })
  })

  it("renders inputs and button", () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText(/seu@email.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument()
  })

  it("calls login and loginStore when submitting a valid form", async () => {
    const loginMock = vi.spyOn(api, "login").mockResolvedValue({
      token: "fake-token",
      user: { email: "test@example.com" },
    })
    const loginStoreSpy = vi.spyOn(useAuthStore.getState(), "login")

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText(/seu@email.com/i), {
      target: { value: "test@example.com" },
    })
    fireEvent.change(screen.getByPlaceholderText(/digite sua senha/i), {
      target: { value: "123456" },
    })

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }))

    await waitFor(() => expect(loginMock).toHaveBeenCalled())
    expect(loginStoreSpy).toHaveBeenCalledWith("fake-token")
  })
})