import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Libris 📚
      </h1>
    </div>
  )
}