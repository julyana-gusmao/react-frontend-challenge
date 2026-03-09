import { useEffect, useState } from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import type { Book } from "@/entities/book/model/types"
import { BookCard } from "./books-card"
import { Loader2 } from "lucide-react"

type Props = {
  books: Book[]
  fetchNextPage: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  isLoading?: boolean
}

const CARD_HEIGHT = 320

export function BooksList({
  books,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: Props) {

  const [columns, setColumns] = useState(1)

  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth

      if (width >= 1280) setColumns(6)
      else if (width >= 1024) setColumns(5)
      else if (width >= 768) setColumns(4)
      else if (width >= 640) setColumns(3)
      else setColumns(2)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)

    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  const rows = Math.ceil(books.length / columns)

  const rowVirtualizer = useWindowVirtualizer({
    count: rows,
    estimateSize: () => CARD_HEIGHT,
    overscan: 5,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  useEffect(() => {
    const lastRow = virtualRows[virtualRows.length - 1]

    if (!lastRow) return

    if (
      lastRow.index >= rows - 2 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [virtualRows, rows, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="flex justify-center py-24 text-muted-foreground">
        Nenhum livro encontrado
      </div>
    )
  }

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >

      {virtualRows.map((virtualRow) => {

        const start = virtualRow.index * columns
        const end = start + columns
        const rowItems = books.slice(start, end)

        return (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`
            }}
          >

            <div
              className="grid gap-6 px-2"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
              }}
            >

              {rowItems.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                />
              ))}

            </div>

          </div>
        )
      })}

    </div>
  )
}