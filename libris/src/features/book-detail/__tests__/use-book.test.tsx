import { renderHook } from "@testing-library/react"
import { waitFor } from "@testing-library/react"
import { describe, it, vi, expect } from "vitest"
import { useBook } from "../hooks/use-book"
import * as api from "@/shared/api/get-book-by-id"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

describe("useBook hook", () => {
  const queryClient = new QueryClient()

  /* eslint-disable */
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it("returns book data when valid id", async () => {
    const bookMock = { id: "1", title: "Livro teste", authors: ["Autor teste"] }
    vi.spyOn(api, "getBookById").mockResolvedValue(bookMock)

    const { result } = renderHook(() => useBook("1"), { wrapper })

    await waitFor(() => {
      if (!result.current.isSuccess) throw new Error("Ainda não carregou")
    })

    expect(result.current.data).toEqual(bookMock)
    expect(api.getBookById).toHaveBeenCalledWith("1")
  })

  it("does not fetch when id is empty", async () => {
    const { result } = renderHook(() => useBook(""), { wrapper })
    expect(result.current.isFetching).toBe(false)
  })
})