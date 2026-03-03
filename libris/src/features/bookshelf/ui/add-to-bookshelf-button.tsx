import type { Book } from "@/entities/book/model/types"
import { useBookshelf } from "../hooks/use-bookshelf"

type Props = {
  book: Book
}

export function AddToBookshelfButton({ book }: Props) {
  const { books, addBook, removeBook } = useBookshelf()

  const exists = books.some((b) => b.id === book.id)

  if (exists) {
    return (
      <button
        onClick={() => removeBook(book.id)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Remover da estante
      </button>
    )
  }

  return (
    <button
      onClick={() => addBook(book)}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Adicionar à estante
    </button>
  )
}