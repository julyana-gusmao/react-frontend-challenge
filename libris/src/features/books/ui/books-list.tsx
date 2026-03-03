import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import type { Book } from "@/entities/book/model/types"
import { BookCard } from "./books-card"

type Props = {
  books: Book[]
  fetchNextPage: () => void
  hasNextPage?: boolean
}

export function BooksList({
  books,
  fetchNextPage,
  hasNextPage,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: books.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 5,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  if (
    hasNextPage &&
    virtualItems.length > 0 &&
    virtualItems[virtualItems.length - 1].index >= books.length - 5
  ) {
    fetchNextPage()
  }

  return (
    <div
      ref={parentRef}
      className="h-150 overflow-auto"
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => {
          const book = books[virtualRow.index]

          return (
            <div
              key={book.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <BookCard book={book} />
            </div>
          )
        })}
      </div>
    </div>
  )
}