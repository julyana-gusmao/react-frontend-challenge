import { BooksFilters, BooksList, useBooksSearch } from "@/features/books-search"
import { SearchInput } from "@/features/books-search/ui/search-input"

export function BooksSearch() {
  const {
    query,
    setQuery,
    printType,
    setPrintType,
    orderBy,
    setOrderBy,
    booksQuery,
  } = useBooksSearch()

  const books = booksQuery.data?.pages.flat() ?? []

  return (
    <section className="space-y-8">

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca Virtual</h1>
          <p className="text-sm text-muted-foreground">
            Descubra novos livros
          </p>
        </div>
      </header>

      <SearchInput value={query} onChange={setQuery} />

      <BooksFilters
        printType={printType}
        setPrintType={setPrintType}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />

      <BooksList
        books={books}
        fetchNextPage={booksQuery.fetchNextPage}
        hasNextPage={booksQuery.hasNextPage}
        isFetchingNextPage={booksQuery.isFetchingNextPage}
        isLoading={booksQuery.isLoading}
      />

    </section>
  )
}