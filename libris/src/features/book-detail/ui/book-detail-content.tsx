import type { Book } from "@/entities/book/model/types"
import DOMPurify from "dompurify"

interface Props {
  book: Book
}

export function BookDetailContent({ book }: Props) {
  return (
    <section className="space-y-4">

      <h1 className="text-3xl font-bold">
        {book.title}
      </h1>

      {book.authors && (
        <p className="text-muted-foreground">
          {book.authors.join(", ")}
        </p>
      )}

      {book.publishedDate && (
        <p className="text-sm text-muted-foreground">
          Publicado em {book.publishedDate}
        </p>
      )}

      {book.description ? (
        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(book.description),
          }}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Este livro não possui descrição disponível.
        </p>
      )}

    </section>
  )
}