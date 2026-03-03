import type { Book } from "../model/types"
import { mapGoogleBookToEntity } from "../model/mapper"

const BASE_URL = "https://www.googleapis.com/books/v1/volumes"

export async function getBookById(id: string): Promise<Book> {
    const response = await fetch(`${BASE_URL}/${id}`)

    if (!response.ok) {
        throw new Error("Erro ao buscar livro")
    }

    const data = await response.json()

    return mapGoogleBookToEntity(data)
}