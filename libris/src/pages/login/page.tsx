import { LoginForm } from "@/features/auth/ui/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50">
      <section className="w-full max-w-md px-6">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Bem-vindo a Libris! 📚
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Acesse sua conta para continuar
          </p>
        </header>

        <LoginForm />
      </section>
    </main>
  )
}