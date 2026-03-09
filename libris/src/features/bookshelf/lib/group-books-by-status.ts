import type { BookshelfBook } from "../model/types"

export function groupBooksByStatus(books: BookshelfBook[]) {
    return {
        QUERO_LER: books.filter((b) => b.status === "QUERO_LER"),
        LENDO: books.filter((b) => b.status === "LENDO"),
        CONCLUIDO: books.filter((b) => b.status === "CONCLUIDO"),
    }
}