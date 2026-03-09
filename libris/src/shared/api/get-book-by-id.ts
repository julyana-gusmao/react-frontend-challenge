import { mapGoogleBookToEntity } from "@/entities/book/model/mapper"
import type { Book } from "@/entities/book/model/types"
import { API_KEY, BASE_URL } from "@/shared/constants/base-api-info"

export async function getBookById(id: string): Promise<Book> {
    const response = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`)

    if (!response.ok) {
        throw new Error("Erro ao buscar livro")
    }

    const data = await response.json()

    return mapGoogleBookToEntity(data)
}