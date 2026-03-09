export function buildUrl(
    base: string,
    params: Record<string, string | number | undefined>
) {
    const url = new URL(base)

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.set(key, String(value))
        }
    })

    return url.toString()
}