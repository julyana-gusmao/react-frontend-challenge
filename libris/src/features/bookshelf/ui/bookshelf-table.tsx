import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"

import { useBookshelf } from "../hooks/use-bookshelf"
import type { BookshelfBook } from "../model/types"

import { useMemo, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { createBookshelfColumns } from "./bookshelf-columns"


type Props = {
  books: BookshelfBook[]
}

export function BookshelfTable({ books }: Props) {
  const { removeBook, updateStatus } = useBookshelf()
  const navigate = useNavigate()

  const [sorting, setSorting] = useState<SortingState>([])

  function openBook(id: string) {
    navigate({ to: `/app/book/${id}` })
  }

  function handleRemove(book: BookshelfBook) {
    removeBook(book.id)

    toast("Livro excluído da estante", {
      description: book.title,
    })
  }

  const columns = useMemo(
    () =>
      createBookshelfColumns({
        openBook,
        removeBook: handleRemove,
        updateStatus,
      }),
    [updateStatus]
  )

  const table = useReactTable({
    data: books,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="border rounded-lg overflow-hidden">

      <table className="w-full">

        <thead className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>

              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="
                    text-left
                    text-sm
                    font-medium
                    px-4
                    py-3
                  "
                >
                  {header.column.getCanSort() ? (
                    <button
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center gap-1"
                      aria-label={`Ordenar por ${header.column.id}`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <ArrowUpDown size={14} />
                    </button>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </th>
              ))}

            </tr>
          ))}
        </thead>

        <tbody>

          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="
                  text-center
                  py-10
                  text-muted-foreground
                "
              >
                Nenhum livro na estante
              </td>
            </tr>
          )}

          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="
                border-t
                hover:bg-muted/40
                transition-colors
              "
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-sm"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}