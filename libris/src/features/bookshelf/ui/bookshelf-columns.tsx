import {
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table"
import { Trash2 } from "lucide-react"

import type { BookshelfBook } from "../model/types"
import type { BookStatus } from "@/entities/book/model/types"

import { BOOK_PLACEHOLDER } from "@/shared/constants/placeholders"
import { StatusSelect } from "./status-select"

const columnHelper = createColumnHelper<BookshelfBook>()

type Params = {
  openBook: (id: string) => void
  removeBook: (book: BookshelfBook) => void
  updateStatus: (id: string, status: BookStatus) => void
}

export function createBookshelfColumns(
  params: Params
  /* eslint-disable */
): ColumnDef<BookshelfBook, any>[] {
  const { openBook, removeBook, updateStatus } = params

  return [
    columnHelper.accessor("thumbnail", {
      header: "Capa",
      cell: (info) => {
        const book = info.row.original

        return (
          <img
            src={info.getValue() ?? BOOK_PLACEHOLDER}
            alt={`Capa do livro ${book.title}`}
            loading="lazy"
            onClick={() => openBook(book.id)}
            className="
              w-12
              h-16
              object-cover
              rounded
              shadow
              cursor-pointer
              hover:scale-105
              transition-transform
            "
          />
        )
      },
    }),

    columnHelper.accessor("title", {
      header: "Título",
      enableSorting: true,
      cell: (info) => (
        <span className="font-medium">
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("authors", {
      header: "Autor",
      cell: (info) => (
        <span className="text-sm text-muted-foreground">
          {info.getValue().join(", ")}
        </span>
      ),
    }),

    columnHelper.accessor("publishedDate", {
      header: "Publicação",
      cell: (info) => (
        <span className="text-sm">
          {info.getValue() ?? "-"}
        </span>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      enableSorting: true,
      cell: (info) => (
        <StatusSelect
          value={info.getValue()}
          onChange={(value) =>
            updateStatus(info.row.original.id, value)
          }
        />
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => {
        const book = info.row.original

        return (
          <button
            aria-label={`Remover ${book.title} da estante`}
            onClick={() => removeBook(book)}
            className="
              text-red-500
              hover:text-red-700
              transition-colors
            "
          >
            <Trash2 size={18} />
          </button>
        )
      },
    }),
  ]
}