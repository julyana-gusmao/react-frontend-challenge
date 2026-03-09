import { capitalizeWords } from "@/shared/utils/captalize-words"
import type { Book } from "./types"
import { formatDate } from "@/shared/utils/format-date"

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

    const rawTitle = data.volumeInfo?.title

    return {
        id: data.id,

        title: rawTitle
            ? capitalizeWords(rawTitle)
            : "Sem título",

        authors: data.volumeInfo?.authors ?? ["Autor desconhecido"],

        description: data.volumeInfo?.description,

        thumbnail: normalizeThumbnail(
            data.volumeInfo?.imageLinks?.thumbnail
        ),

        publishedDate: formatDate(
            data.volumeInfo?.publishedDate
        ),

        publisher: data.volumeInfo?.publisher,

        previewLink: data.volumeInfo?.previewLink,
    }
}

function normalizeThumbnail(url?: string) {
    if (!url) return undefined

    return url.replace("http://", "https://")
}