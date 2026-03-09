import { mapGoogleBookToEntity } from "@/entities/book/model/mapper"
import type { Book } from "@/entities/book/model/types"
import { API_KEY, BASE_URL, BOOKS_PER_PAGE } from "@/shared/constants/base-api-info"
import { buildUrl } from "@/shared/utils/build-url"


interface SearchParams {
    query: string
    startIndex?: number
    printType?: "all" | "books" | "magazines"
    orderBy?: "relevance" | "newest"
    signal?: AbortSignal
}


export async function searchBooks({
    query,
    startIndex = 0,
    printType,
    orderBy,
    signal,
}: SearchParams): Promise<Book[]> {

    const url = buildUrl(BASE_URL, {
        q: query,
        startIndex,
        maxResults: BOOKS_PER_PAGE,
        printType: printType !== "all" ? printType : undefined,
        orderBy,
        key: API_KEY,
    })

    const response = await fetch(url, { signal })

    if (!response.ok) {
        throw new Error("Erro ao buscar livros")
    }

    const data = await response.json()

    return data.items?.map(mapGoogleBookToEntity) ?? []
}