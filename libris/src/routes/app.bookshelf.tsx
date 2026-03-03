import { createFileRoute } from "@tanstack/react-router"
import BookshelfPage from "@/pages/bookshelf/page"

export const Route = createFileRoute("/app/bookshelf")({
  component: BookshelfPage,
})