import type { Book } from "@/entities/book/model/types"
import { BOOK_PLACEHOLDER } from "@/shared/constants/placeholders"
import { Link } from "@tanstack/react-router"

type Props = {
  book: Book
}

export function BookCard({ book }: Props) {
  const thumbnail =
    book.thumbnail ??
    BOOK_PLACEHOLDER

  return (
    <Link
      to={`/app/book/${book.id}`}
      className="block"
      viewTransition
    >
      <div
        className="
          group
          flex
          flex-col
          gap-3
          p-2
          cursor-pointer
          transition
        "
      >

        <div
          className="
            overflow-hidden
            rounded-lg
            bg-muted
            shadow-sm
            transition-all
            duration-200
            group-hover:shadow-md
          "
        >
          <img
            src={thumbnail}
            alt={book.title}
            loading="lazy"
            className="
              w-full
              aspect-2/3
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>

        <div className="flex flex-col gap-1 px-1">

          <h3
            className="
              text-sm
              font-semibold
              leading-snug
              line-clamp-2
            "
          >
            {book.title}
          </h3>

          {book.authors && (
            <p
              className="
                text-xs
                text-muted-foreground
                line-clamp-1
              "
            >
              {book.authors.join(", ")}
            </p>
          )}

        </div>
      </div>
    </Link>
  )
}