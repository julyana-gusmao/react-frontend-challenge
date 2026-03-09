import type { Book } from "@/entities/book/model/types"
import { AddToBookshelfButton } from "./add-to-bookshelf-button"

interface Props {
  book: Book
}

export function BookDetailFooter({ book }: Props) {
  return (
    <footer className="pt-4">
      <AddToBookshelfButton book={book} />
    </footer>
  )
}