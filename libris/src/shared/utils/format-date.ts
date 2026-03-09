export function formatDate(date?: string) {
    if (!date) return undefined

    if (date.length === 4) {
        return date
    }

    const parts = date.split("-")

    if (parts.length !== 3) {
        return date
    }

    const [year, month, day] = parts

    return `${day}/${month}/${year}`
}