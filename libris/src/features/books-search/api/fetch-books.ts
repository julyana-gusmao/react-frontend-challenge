import type { Book } from "@/entities/book/model/types"
import { searchBooks } from "@/shared/api/search-books"

export interface BooksQueryParams {
    query?: string
    printType?: "all" | "books" | "magazines"
    orderBy?: "relevance" | "newest"
}

interface FetchBooksParams {
    pageParam?: number
    params: BooksQueryParams
    signal?: AbortSignal
}

export async function fetchBooks({
    pageParam = 0,
    params,
    signal,
}: FetchBooksParams): Promise<Book[]> {

    const effectiveQuery =
        params.query?.trim() || "bestseller"

    return searchBooks({
        ...params,
        query: effectiveQuery,
        startIndex: pageParam,
        signal,
    })
}