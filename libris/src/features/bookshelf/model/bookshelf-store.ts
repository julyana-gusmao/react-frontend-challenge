import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { Book, BookStatus } from "@/entities/book/model/types"

type BookshelfBook = Book & {
    status: BookStatus
}

type BookshelfState = {
    books: BookshelfBook[]

    addBook: (book: Book) => void
    removeBook: (id: string) => void
    updateStatus: (id: string, status: BookStatus) => void
}

export const useBookshelfStore = create<BookshelfState>()(
    persist(
        (set) => ({
            books: [],

            addBook: (book) =>
                set((state) => {
                    const exists = state.books.find((b) => b.id === book.id)
                    if (exists) return state

                    return {
                        books: [
                            ...state.books,
                            {
                                ...book,
                                status: "QUERO_LER",
                            },
                        ],
                    }
                }),

            removeBook: (id) =>
                set((state) => ({
                    books: state.books.filter((b) => b.id !== id),
                })),

            updateStatus: (id, status) =>
                set((state) => ({
                    books: state.books.map((b) =>
                        b.id === id ? { ...b, status } : b
                    ),
                })),
        }),
        {
            name: "bookshelf-storage",
        }
    )
)