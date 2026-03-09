import type { Book } from "@/entities/book/model/types"
import { useBookshelf } from "@/features/bookshelf"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  book: Book
}

export function AddToBookshelfButton({ book }: Props) {
  const { books, addBook, removeBook } = useBookshelf()

  const [loading, setLoading] = useState(false)

  const exists = books.some((b) => b.id === book.id)

  async function handleAdd() {
    setLoading(true)

    await new Promise((r) => setTimeout(r, 600))

    addBook(book)

    toast.success("Livro adicionado à estante 📚", {
      description: book.title,
    })

    setLoading(false)
  }

  async function handleRemove() {
    setLoading(true)

    await new Promise((r) => setTimeout(r, 600))

    removeBook(book.id)

    toast("Livro removido da estante", {
      description: book.title,
    })

    setLoading(false)
  }

  if (exists) {
    return (
      <button
        onClick={handleRemove}
        disabled={loading}
        className="
          flex items-center gap-2
          px-4 py-2
          bg-red-500
          text-white
          rounded-md
          hover:opacity-90
        "
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Remover da estante
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="
        flex items-center gap-2
        px-4 py-2
        bg-green-600
        text-white
        rounded-md
        hover:opacity-90
      "
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      Adicionar na estante
    </button>
  )
}