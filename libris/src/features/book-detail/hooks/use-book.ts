import { useQuery } from "@tanstack/react-query"
import { getBookById } from "../../../shared/api/get-book-by-id"

export function useBook(id: string) {
    return useQuery({
        queryKey: ["book", id],
        queryFn: () => getBookById(id),
        enabled: !!id,
    })
}