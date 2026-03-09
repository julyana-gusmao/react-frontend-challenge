export const booksQueryKey = {
    all: ["books"] as const,

    list: (params: unknown) =>
        [...booksQueryKey.all, "list", params] as const,
}