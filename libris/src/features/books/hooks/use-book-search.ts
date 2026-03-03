import { useState } from "react"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { useSearchBooks } from "./use-search-books"

export function useBookSearch() {

    const [query, setQuery] = useState("")

    const debouncedQuery = useDebounce(query, 500)

    const booksQuery = useSearchBooks({
        query: debouncedQuery,
    })

    return {
        query,
        setQuery,
        booksQuery,
    }
}