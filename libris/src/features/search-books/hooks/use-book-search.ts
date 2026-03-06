import { useState } from "react"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { useSearchBooks } from "./use-search-books"

export function useBookSearch() {

    const [query, setQuery] = useState("freida mcfadden")

    const [printType, setPrintType] = useState<
        "all" | "books" | "magazines"
    >("all")

    const [orderBy, setOrderBy] = useState<
        "relevance" | "newest"
    >("relevance")

    const debouncedQuery = useDebounce(query, 500)

    const booksQuery = useSearchBooks({
        query: debouncedQuery,
        printType,
        orderBy,
    })

    return {
        query,
        setQuery,

        printType,
        setPrintType,

        orderBy,
        setOrderBy,

        booksQuery,
    }
}