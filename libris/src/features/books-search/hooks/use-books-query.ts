import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchBooks, type BooksQueryParams } from "../api/fetch-books"
import { booksQueryKey } from "../api/books-query-key"

export function useBooksQuery(params: BooksQueryParams) {
    return useInfiniteQuery({
        queryKey: booksQueryKey.list(params),

        queryFn: ({ pageParam, signal }) =>
            fetchBooks({ pageParam, params, signal }),

        initialPageParam: 0,

        getNextPageParam: (lastPage, allPages) =>
            lastPage.length ? allPages.length * 18 : undefined,

        retry: false,
    })
}