export type BookStatus =
    | "QUERO_LER"
    | "LENDO"
    | "CONCLUIDO"

export interface Book {
    id: string
    title: string
    authors: string[]
    description?: string
    thumbnail?: string
    publishedDate?: string
    publisher?: string
    previewLink?: string
}