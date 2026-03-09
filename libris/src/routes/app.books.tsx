import type { BooksSearchParams } from "@/entities/book/model/types"
import { BooksPage } from "@/pages/books/books-page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/books")({
  validateSearch: (search: Record<string, unknown>): BooksSearchParams => {
    return {
      q: typeof search.q === "string" ? search.q : "",
      printType:
        search.printType === "books" || search.printType === "magazines"
          ? search.printType
          : "all",
      orderBy:
        search.orderBy === "newest"
          ? "newest"
          : "relevance",
    }
  },

  component: BooksPage,
})