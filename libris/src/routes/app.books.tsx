
import { BooksPage } from "@/pages/books/books-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/books")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: typeof search.q === "string" ? search.q : "",
    }
  },

  component: BooksPage,
})