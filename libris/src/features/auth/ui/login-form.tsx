import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "../model/auth-store"
import { login } from "../api/login"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema, type LoginFormData } from "../model/login-schema"

export function LoginForm() {
  const navigate = useNavigate()

  const loginStore = useAuthStore((s) => s.login)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    const result = await login(data.email, data.password)

    loginStore(result.token)

    navigate({
      to: "/app/books",
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Senha"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
      >
        Entrar
      </button>

    </form>
  )
}