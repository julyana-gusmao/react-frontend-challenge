import type { BookStatus } from "@/entities/book/model/types"

type Props = {
  value: BookStatus
  onChange: (value: BookStatus) => void
}

export function StatusSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as BookStatus)}
      className="
        border
        rounded-md
        px-2
        py-1
        text-sm
        bg-background
      "
    >
      <option value="QUERO_LER">📚 Quero Ler</option>
      <option value="LENDO">📖 Lendo</option>
      <option value="CONCLUIDO">✅ Concluído</option>
    </select>
  )
}