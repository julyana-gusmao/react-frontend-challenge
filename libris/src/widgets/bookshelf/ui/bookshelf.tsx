import {
  BookshelfSection,
  EmptyBookshelf,
  useBookshelf,
} from "@/features/bookshelf"

import { groupBooksByStatus } from "@/features/bookshelf/lib/group-books-by-status"

export function Bookshelf() {
  const { books } = useBookshelf()

  if (!books.length) {
    return <EmptyBookshelf />
  }

  const grouped = groupBooksByStatus(books)

  return (
    <section className="space-y-10">

      <BookshelfSection
        title="📚 Quero Ler"
        books={grouped.QUERO_LER}
      />

      <BookshelfSection
        title="📖 Lendo"
        books={grouped.LENDO}
      />

      <BookshelfSection
        title="✅ Concluídos"
        books={grouped.CONCLUIDO}
      />

    </section>
  )
}