import { useBookshelfStore } from "../model/bookshelf-store"
import type { BookshelfBook } from "../model/types"

export function useBookshelf() {
    const books = useBookshelfStore((s) => s.books) as BookshelfBook[]
    const addBook = useBookshelfStore((s) => s.addBook) as (book: BookshelfBook) => void
    const removeBook = useBookshelfStore((s) => s.removeBook) as (id: string) => void
    const updateStatus = useBookshelfStore((s) => s.updateStatus)

    return {
        books,
        addBook,
        removeBook,
        updateStatus,
    }
}