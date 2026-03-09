import { SMALL_WORDS } from "@/shared/constants/small-words"

export function capitalizeWords(text?: string) {
    if (!text) return ""

    const normalized = text.toLowerCase().trim()

    const words = normalized.split(" ")

    return words
        .map((word, index) => {
            if (index !== 0 && SMALL_WORDS.includes(word)) {
                return word
            }

            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(" ")
}