import type { Book, BookStatus } from "@/entities/book/model/types"

export type BookshelfBook = Book & {
    status: BookStatus
}