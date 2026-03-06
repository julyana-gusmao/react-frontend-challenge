import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"

import { StatusSelect } from "./status-select"
import { useBookshelf } from "../hooks/use-bookshelf"
import type { BookshelfBook } from "../model/types"
import { useState } from "react"
import { ArrowUpDown, Trash2 } from "lucide-react"

const columnHelper = createColumnHelper<BookshelfBook>()

type Props = {
  books: BookshelfBook[]
}

export function BookshelfTable({ books }: Props) {
  const { removeBook, updateStatus } = useBookshelf()

  const [sorting, setSorting] = useState<SortingState>([])

  const columns = [
    columnHelper.accessor("thumbnail", {
      header: "Capa",
      cell: (info) => (
        <img
          src={
            info.getValue() ??
            "https://via.placeholder.com/80x120"
          }
          className="w-12 rounded shadow"
        />
      ),
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
      cell: (info) => (
        <button
          onClick={() => removeBook(info.row.original.id)}
          className="
            text-red-500
            hover:text-red-700
            transition
          "
        >
          <Trash2 size={18} />
        </button>
      ),
    }),
  ]

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

          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-muted/40"
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