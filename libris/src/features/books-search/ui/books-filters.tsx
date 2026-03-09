import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"

type PrintType = "all" | "books" | "magazines"
type OrderBy = "relevance" | "newest"

type Props = {
  printType: PrintType
  setPrintType: (v: PrintType) => void

  orderBy: OrderBy
  setOrderBy: (v: OrderBy) => void
}

export function BooksFilters({
  printType,
  setPrintType,
  orderBy,
  setOrderBy,
}: Props) {
  return (
    <div className="flex flex-wrap items-end gap-6">

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Tipo
        </span>

        <Select
          value={printType}
          onValueChange={(v) => setPrintType(v as PrintType)}
        >
          <SelectTrigger className="w-42.5">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem aria-label="Todos" value="all">Todos</SelectItem>
            <SelectItem aria-label="Livros" value="books">Livros</SelectItem>
            <SelectItem aria-label="Revistas" value="magazines">Revistas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Ordenar por
        </span>

        <Select
          value={orderBy}
          onValueChange={(v) => setOrderBy(v as OrderBy)}
        >
          <SelectTrigger className="w-42.5">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem aria-label="Relevância" value="relevance">Relevância</SelectItem>
            <SelectItem aria-label="Mais novos" value="newest">Mais novos</SelectItem>
          </SelectContent>
        </Select>
      </div>

    </div>
  )
}