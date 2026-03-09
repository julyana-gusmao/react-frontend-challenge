import { useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "../model/auth-store"
import { login } from "../api/login"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema, type LoginFormData } from "../model/login-schema"

import { Loader2 } from "lucide-react"
import { Button, Card, CardContent, Input, Label } from "@/shared/ui"

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
      viewTransition: true
    })
  }

  return (
    <Card className="border-zinc-200 shadow-sm py-5">
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
            autoFocus
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Senha
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-zinc-800 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}