import type { BookshelfBook } from "../model/types"
import { BookshelfTable } from "./bookshelf-table"

type Props = {
  title: string
  books: BookshelfBook[]
}

export function BookshelfSection({ title, books }: Props) {
  if (!books.length) return null

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <span
          className="text-sm text-muted-foreground"
          aria-label={`${books.length} livros nesta seção`}
        >
          {books.length} livro{books.length > 1 && "s"}
        </span>

      </div>

      <BookshelfTable books={books} />

    </section>
  )
}