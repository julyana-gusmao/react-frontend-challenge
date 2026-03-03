import { createFileRoute } from "@tanstack/react-router"
import { BooksPage } from "@/pages/books/page"

export const Route = createFileRoute("/app/books")({
  component: BooksPage,
})