import { BookDetailPage } from "@/pages/books/book-detail-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/book/$id")({
  component: BookDetailPage,
})