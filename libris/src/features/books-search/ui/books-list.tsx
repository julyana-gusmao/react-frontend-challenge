import { useEffect, useRef } from "react"
import type { Book } from "@/entities/book/model/types"
import { BookCard } from "./books-card"
import { Loader2 } from "lucide-react"
import { BookCardSkeleton } from "./books-card-skeleton"
import { booksGridClass } from "@/features/books-search/ui/books-grid"

type Props = {
  books: Book[]
  fetchNextPage: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  isLoading?: boolean
}

export function BooksList({
  books,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: Props) {

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting) {
          fetchNextPage()
        }
      },
      {
        rootMargin: "300px",
      }
    )

    const current = loadMoreRef.current

    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="flex justify-center py-24 text-muted-foreground">
        Nenhum livro encontrado.
      </div>
    )
  }

  return (
    <div className="space-y-10">

      <div className={booksGridClass}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </div>

      {isFetchingNextPage && (
        <div className={booksGridClass}>
          {Array.from({ length: 12 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      )}

      <div
        ref={loadMoreRef}
        className="h-10"
      />

    </div>
  )
}