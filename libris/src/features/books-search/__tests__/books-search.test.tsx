import { renderHook, act } from "@testing-library/react"
import { render, screen, fireEvent, within } from "@testing-library/react"
import { describe, it, vi, beforeEach, expect } from "vitest"
import * as BooksQuery from "../hooks/use-books-query"
import { useBooksSearch } from "../hooks/use-search-books"
import * as Router from "@tanstack/react-router"
import { BooksFilters } from "../ui/books-filters"
import { BooksList } from "../ui/books-list"
import type { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query"
import type { Book } from "@/entities/book/model/types"
import "@testing-library/jest-dom"

vi.mock("../api/fetch-books")
vi.mock("../hooks/use-books-query")
vi.mock("@tanstack/react-router")
vi.mock("@/shared/hooks/use-debounce", () => ({
  useDebounce: (value: string) => value ?? "", 
}))

describe("useBooksSearch", () => {
  const navigateMock = vi.fn()
  const booksQueryMock = {
    data: { pages: [[]] as Book[][], pageParams: [0] },
    fetchNextPage: vi.fn(),
    hasNextPage: false,
    isLoading: false,
    isError: false,
    error: null,
    isFetching: false,
    isFetchingNextPage: false,
    refetch: vi.fn(),
    status: "success",
  } as unknown as UseInfiniteQueryResult<InfiniteData<Book[], unknown>, Error>

  beforeEach(() => {
    vi.mocked(Router.useNavigate).mockReturnValue(navigateMock)
    vi.mocked(Router.useSearch).mockReturnValue({
      q: undefined,
      printType: undefined,
      orderBy: undefined,
    })
    vi.mocked(BooksQuery.useBooksQuery).mockReturnValue(booksQueryMock)
    navigateMock.mockClear()
  })

  it("initializes with default values", () => {
    const { result } = renderHook(() => useBooksSearch())

    expect(result.current.query).toBe("")
    expect(result.current.printType).toBe("all")
    expect(result.current.orderBy).toBe("relevance")
    expect(result.current.booksQuery).toEqual(booksQueryMock)
  })

  it("calls navigate when query, printType or orderBy change", () => {
    const { result } = renderHook(() => useBooksSearch())

    navigateMock.mockClear()
    act(() => result.current.setQuery("Harry Potter"))
    expect(navigateMock).toHaveBeenCalledTimes(1)

    act(() => result.current.setPrintType("books"))
    expect(navigateMock).toHaveBeenCalledTimes(2)

    act(() => result.current.setOrderBy("newest"))
    expect(navigateMock).toHaveBeenCalledTimes(3)
  })

  it("uses the debouncedQuery to search for books", () => {
    const { result } = renderHook(() => useBooksSearch())

    act(() => result.current.setQuery("React"))

    expect(BooksQuery.useBooksQuery).toHaveBeenCalledWith({
      query: "React",
      printType: "all",
      orderBy: "relevance",
    })
  })
})

describe("BooksFilters", () => {
  it("renders selects and dispatches onValueChange", () => {
    const setPrintType = vi.fn()
    const setOrderBy = vi.fn()

    render(
      <BooksFilters
        printType="all"
        setPrintType={setPrintType}
        orderBy="relevance"
        setOrderBy={setOrderBy}
      />
    )

    const printTypeSelect = screen.getByText("Todos").closest("button")!
    fireEvent.click(printTypeSelect)
    const booksOption = within(document.body).getByText("Livros")
    fireEvent.click(booksOption)
    expect(setPrintType).toHaveBeenCalledWith("books")

    const orderBySelect = screen.getByText("Relevância").closest("button")!
    fireEvent.click(orderBySelect)
    const newestOption = within(document.body).getByText("Mais novos")
    fireEvent.click(newestOption)
    expect(setOrderBy).toHaveBeenCalledWith("newest")
  })
})

describe("BooksList", () => {
  const booksMock = Array.from({ length: 6 }).map((_, i) => ({
    id: `${i}`,
    title: `Livro ${i}`,
    authors: ["Autor Teste"],
  }))

  it("renders message 'Nenhum livro encontrado' if books is empty and isLoading=false", () => {
    render(<BooksList books={[]} fetchNextPage={vi.fn()} isLoading={false} />)
    expect(screen.queryByText(/Nenhum livro encontrado/i)).not.toBeNull()
  })

  it("renders spinner when isLoading=true", () => {
    render(<BooksList books={[]} fetchNextPage={vi.fn()} isLoading />)
    const spinner = document.querySelector("svg.animate-spin")
    expect(spinner).not.toBeNull()
  })

  it("renders visible books when books is not empty", () => {
    render(<BooksList books={booksMock} fetchNextPage={vi.fn()} />)
    const grid = document.querySelector("div.grid")
    expect(grid).not.toBeNull()
  })
})