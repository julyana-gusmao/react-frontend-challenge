import { EmptyBookshelf } from "@/features/bookshelf/components/empty-bookshelf"
import { useBookshelf } from "@/features/bookshelf/hooks/use-bookshelf"
import { BookshelfSection } from "@/features/bookshelf/components/bookshelf-section"
import { groupBooksByStatus } from "@/features/bookshelf/lib/group-books-by-status"

export default function BookshelfPage() {
  const { books } = useBookshelf()

  if (!books.length) {
    return <EmptyBookshelf />
  }

  const grouped = groupBooksByStatus(books)

  return (
    <main className="space-y-10 max-w-6xl mx-auto px-6 py-10">

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

    </main>
  )
}