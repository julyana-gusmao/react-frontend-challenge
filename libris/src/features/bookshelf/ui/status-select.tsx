import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui"
import type { BookStatus } from "@/entities/book/model/types"

type Props = {
  value: BookStatus 
  onChange: (value: BookStatus) => void
}

const statusLabels: Record<BookStatus, string> = {
  QUERO_LER: "Quero Ler",
  LENDO: "Lendo",
  CONCLUIDO: "Concluído",
}

export function StatusSelect({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as BookStatus)}
    >
      <SelectTrigger
        className="w-35"
        aria-label="Alterar status do livro"
      >
        <SelectValue>
          {statusLabels[value]}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>

        <SelectItem value="QUERO_LER">
          {statusLabels.QUERO_LER}
        </SelectItem>

        <SelectItem value="LENDO">
          {statusLabels.LENDO}
        </SelectItem>

        <SelectItem value="CONCLUIDO">
          {statusLabels.CONCLUIDO}
        </SelectItem>

      </SelectContent>
    </Select>
  )
}