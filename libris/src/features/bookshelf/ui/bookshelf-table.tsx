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
import { ArrowUpDown, Trash2 } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { createBookshelfColumns } from "./bookshelf-columns"
import { StatusSelect } from "./status-select"

type Props = {
  books: BookshelfBook[]
}

export function BookshelfTable({ books }: Props) {
  const { removeBook, updateStatus } = useBookshelf()
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])

  function openBook(id: string) {
    navigate({ to: `/app/book/${id}`, viewTransition: true })
  }

  function handleRemove(book: BookshelfBook) {
    removeBook(book.id)
    toast("Livro excluído da estante", { description: book.title })
  }

  const columns = useMemo(
    () => createBookshelfColumns({ openBook, removeBook: handleRemove, updateStatus }),
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

  const rows = table.getRowModel().rows

  return (
    <div className="w-full">
      {/* MOBILE */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rows.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground border rounded-lg">
            Nenhum livro na estante
          </div>
        ) : (
          rows.map((row) => {
            const book = row.original
            return (
              <div
                key={row.id}
                className="border rounded-lg p-4 space-y-3 bg-card shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => openBook(book.id)}
                  >
                    <h3 className="font-bold text-base leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {book.authors.join(", ")}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(book)}
                    className="text-destructive p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {book.publishedDate ?? "Sem data"}
                  </span>

                  <div className="flex-1 max-w-37.5">
                    <StatusSelect
                      value={book.status}
                      onChange={(value) => updateStatus(book.id, value)}
                    />
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left text-sm font-medium px-4 py-3">
                    {header.column.getCanSort() ? (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-1"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown size={14} />
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-muted/40 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}