import type { Book } from "./types"

export interface GoogleBookVolume {
    id: string
    volumeInfo?: {
        title?: string
        authors?: string[]
        description?: string
        imageLinks?: {
            thumbnail?: string
        }
        publishedDate?: string
        publisher?: string
        previewLink?: string
    }
}

export function mapGoogleBookToEntity(
    data: GoogleBookVolume
): Book {
    return {
        id: data.id,
        title: data.volumeInfo?.title ?? "Sem título",
        authors: data.volumeInfo?.authors ?? ["Autor desconhecido"],
        description: data.volumeInfo?.description,
        thumbnail: normalizeThumbnail(
            data.volumeInfo?.imageLinks?.thumbnail
        ),
        publishedDate: data.volumeInfo?.publishedDate,
        publisher: data.volumeInfo?.publisher,
        previewLink: data.volumeInfo?.previewLink,
    }
}

function normalizeThumbnail(url?: string) {
    if (!url) return undefined

    return url.replace("http://", "https://")
}