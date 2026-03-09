import { useState, useEffect } from "react"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useBooksQuery } from "./use-books-query"

export function useBooksSearch() {
    const search = useSearch({ from: "/app/books" })
    const navigate = useNavigate()

    const [query, setQuery] = useState(search.q ?? "")
    const [printType, setPrintType] = useState(search.printType ?? "all")
    const [orderBy, setOrderBy] = useState(search.orderBy ?? "relevance")

    const debouncedQuery = useDebounce(query, 500)

    useEffect(() => {
        navigate({
            search: (prev) => ({
                ...prev,
                q: query || undefined,
                printType: printType !== "all" ? printType : undefined,
                orderBy: orderBy !== "relevance" ? orderBy : undefined,
            }),
        })
    }, [query, printType, orderBy, navigate])

    const booksQuery = useBooksQuery({
        query: debouncedQuery || undefined,
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