import { useBookshelfStore } from "../model/bookshelf-store"

export function useBookshelf() {
    const books = useBookshelfStore((s) => s.books)
    const addBook = useBookshelfStore((s) => s.addBook)
    const removeBook = useBookshelfStore((s) => s.removeBook)
    const updateStatus = useBookshelfStore((s) => s.updateStatus)

    return {
        books,
        addBook,
        removeBook,
        updateStatus,
    }
}