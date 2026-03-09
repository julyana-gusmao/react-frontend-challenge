import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, vi, beforeEach, expect } from "vitest"
import { AddToBookshelfButton } from "../ui/add-to-bookshelf-button"
import * as Bookshelf from "@/features/bookshelf"
import * as Sonner from "sonner"
import type { BookStatus } from "@/entities/book/model/types"
import type { BookshelfBook } from "@/features/bookshelf/model/types"
import "@testing-library/jest-dom"

vi.mock("@/features/bookshelf")
vi.mock("sonner")

describe("AddToBookshelfButton", () => {
  const book: BookshelfBook = {
    id: "1",
    title: "Livro Teste",
    authors: ["Autor Teste"],
    status: "QUERO_LER" as BookStatus,
  }

  let addBook: (book: BookshelfBook) => void
  let removeBook: (id: string) => void
  let updateStatus: (id: string, status: BookStatus) => void

  beforeEach(() => {
    addBook = vi.fn()
    removeBook = vi.fn()
    updateStatus = vi.fn()

    vi.mocked(Bookshelf.useBookshelf).mockReturnValue({
      books: [] as BookshelfBook[],
      addBook,
      removeBook,
      updateStatus,
    })

    vi.mocked(Sonner.toast).mockClear()
    vi.mocked(Sonner.toast.success).mockClear()
  })

  it("render add button if book is not on shelf", () => {
    render(<AddToBookshelfButton book={book} />)
    expect(
      screen.getByRole("button", { name: /adicionar na estante/i })
    ).toBeInTheDocument()
  })

  it("calls addBook and toast when clicking add", async () => {
    render(<AddToBookshelfButton book={book} />)
    fireEvent.click(screen.getByRole("button", { name: /adicionar na estante/i }))

    await waitFor(() => expect(addBook).toHaveBeenCalledWith(book))
    expect(Sonner.toast.success).toHaveBeenCalledWith(
      "Livro adicionado à estante 📚",
      { description: book.title }
    )
  })

  it("renders remove button if book is already on the shelf", () => {
    vi.mocked(Bookshelf.useBookshelf).mockReturnValue({
      books: [book],
      addBook,
      removeBook,
      updateStatus,
    })

    render(<AddToBookshelfButton book={book} />)
    expect(
      screen.getByRole("button", { name: /remover da estante/i })
    ).toBeInTheDocument()
  })

  it("calls removeBook and toast when clicking remove", async () => {
    vi.mocked(Bookshelf.useBookshelf).mockReturnValue({
      books: [book],
      addBook,
      removeBook,
      updateStatus,
    })

    render(<AddToBookshelfButton book={book} />)
    fireEvent.click(screen.getByRole("button", { name: /remover da estante/i }))

    await waitFor(() => expect(removeBook).toHaveBeenCalledWith(book.id))
    expect(Sonner.toast).toHaveBeenCalledWith(
      "Livro removido da estante",
      { description: book.title }
    )
  })
})