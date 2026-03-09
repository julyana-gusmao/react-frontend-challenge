import { describe, it, expect, beforeEach, vi, type Mock } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useBookshelf } from "../hooks/use-bookshelf"
import { useBookshelfStore } from "../model/bookshelf-store"
import type { BookStatus } from "@/entities/book/model/types"
import type { BookshelfBook } from "../model/types"

vi.mock("../model/bookshelf-store", () => ({
  useBookshelfStore: vi.fn(),
}))

const mockBooks: BookshelfBook[] = [
  { id: "1", title: "Book 1", authors: ["Author 1"], status: "QUERO_LER" as BookStatus, publishedDate: "2023" },
  { id: "2", title: "Book 2", authors: ["Author 2"], status: "LENDO" as BookStatus, publishedDate: "2022" },
]

describe("useBookshelf hook", () => {
  let addBook: (book: BookshelfBook) => void
  let removeBook: (id: string) => void
  let updateStatus: (id: string, status: BookStatus) => void

  beforeEach(() => {
    vi.clearAllMocks()

    addBook = vi.fn()
    removeBook = vi.fn()
    updateStatus = vi.fn()

    /* eslint-disable */
    ;(useBookshelfStore as unknown as Mock).mockImplementation((selector: any) => {
      const store = {
        books: mockBooks,
        addBook,
        removeBook,
        updateStatus,
      }
      return selector(store)
    })
  })

  it("should return books from store", () => {
    const { result } = renderHook(() => useBookshelf())
    expect(result.current.books).toHaveLength(2)
  })

  it("should call addBook when addBook is invoked", () => {
    const { result } = renderHook(() => useBookshelf())
    act(() => result.current.addBook(mockBooks[0]))
    expect(addBook).toHaveBeenCalledWith(mockBooks[0])
  })

  it("should call removeBook when removeBook is invoked", () => {
    const { result } = renderHook(() => useBookshelf())
    act(() => result.current.removeBook("1"))
    expect(removeBook).toHaveBeenCalledWith("1")
  })

  it("should call updateStatus when updateStatus is invoked", () => {
    const { result } = renderHook(() => useBookshelf())
    act(() => result.current.updateStatus("1", "CONCLUIDO" as BookStatus))
    expect(updateStatus).toHaveBeenCalledWith("1", "CONCLUIDO")
  })
})