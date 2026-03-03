import BookPage from "@/pages/book/page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/book/$id")({
  component: BookPage,
})