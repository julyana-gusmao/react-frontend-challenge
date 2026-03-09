import {
  BookDetailContent,
  BookDetailFooter,
  BookDetailHeader,
  useBook,
} from "@/features/book-detail"

import { useParams } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"

export function BookDetail() {
  const { id } = useParams({ from: "/app/book/$id" })

  const { data: book, isLoading } = useBook(id)

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!book) {
    return (
      <div className="text-center py-20">
        Livro não encontrado
      </div>
    )
  }

  return (
    <section className="grid md:grid-cols-[240px_1fr] gap-10">

      <BookDetailHeader
        thumbnail={book.thumbnail}
        title={book.title}
      />

      <div className="space-y-6">
        <BookDetailContent book={book} />
        <BookDetailFooter book={book} />
      </div>

    </section>
  )
}