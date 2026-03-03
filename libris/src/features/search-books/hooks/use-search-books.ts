import { useInfiniteQuery } from "@tanstack/react-query"
import { searchBooks } from "../api/search-books"

interface Params {
    query: string
    printType?: "all" | "books" | "magazines"
    orderBy?: "relevance" | "newest"
}

export function useSearchBooks(params: Params) {
    return useInfiniteQuery({
        queryKey: ["books", params],

        queryFn: ({ pageParam = 0 }) =>
            searchBooks({
                ...params,
                startIndex: pageParam,
            }),

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined

            return allPages.length * 20
        },

        initialPageParam: 0,
        enabled: !!params.query,
    })
}