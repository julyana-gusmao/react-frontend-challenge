import { useInfiniteQuery } from "@tanstack/react-query"
import { searchBooks } from "@/entities/book/api/google-books.api"

interface Params {
    query: string
    printType?: "all" | "books" | "magazines"
    orderBy?: "relevance" | "newest"
}

export function useSearchBooks(params: Params) {
    return useInfiniteQuery({
        queryKey: ["books", params],

        queryFn: ({ pageParam = 0, signal }) =>
            searchBooks({
                ...params,
                startIndex: pageParam,
                signal,
            }),

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined
            return allPages.length * 20
        },

        initialPageParam: 0,

        enabled: !!params.query,

        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}