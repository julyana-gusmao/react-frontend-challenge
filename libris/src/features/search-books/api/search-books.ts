import { mapGoogleBookToEntity } from "@/entities/book/model/mapper"
import type { Book } from "@/entities/book/model/types"

const BASE_URL = "https://www.googleapis.com/books/v1/volumes"

interface SearchParams {
    query: string
    startIndex?: number
    printType?: "all" | "books" | "magazines"
    orderBy?: "relevance" | "newest"
}

export async function searchBooks({
    query,
    startIndex = 0,
    printType,
    orderBy,
}: SearchParams): Promise<Book[]> {

    const url = new URL(BASE_URL)

    url.searchParams.set("q", query)
    url.searchParams.set("startIndex", startIndex.toString())
    url.searchParams.set("maxResults", "20")

    if (printType) url.searchParams.set("printType", printType)
    if (orderBy) url.searchParams.set("orderBy", orderBy)

    const response = await fetch(url.toString())

    if (!response.ok) {
        throw new Error("Erro ao buscar livros")
    }

    const data = await response.json()

    return data.items?.map(mapGoogleBookToEntity) ?? []
}