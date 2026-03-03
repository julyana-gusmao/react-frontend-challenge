import type { Book } from "@/entities/book/model/types"
import { Link } from "@tanstack/react-router"
import { useNavigate } from "@tanstack/react-router"

type Props = {
  book: Book
}

export function BookCard({ book }: Props) {
  const navigate = useNavigate()

  function openBook() {
  navigate({
    to: "/app/book/$id",
    params: { id: book.id },
  })
}

  return (
    <Link
      to="/app/book/$id"
      params={{ id: book.id }}
      className="flex gap-3 border p-3 rounded-md hover:bg-gray-50"
    >
      {book.thumbnail && (
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-16 h-24 object-cover"
        />
      )}

      <div onClick={openBook}>
        <h3 className="font-semibold">{book.title}</h3>

        <p className="text-sm text-gray-600">
          {book.authors.join(", ")}
        </p>
      </div>
    </Link>
  )
}