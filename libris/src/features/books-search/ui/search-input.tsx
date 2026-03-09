import { Input } from "@/shared/ui"
import { Search, X } from "lucide-react"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar livros ou autores...",
  className,
}: Props) {
  return (
    <div className="relative w-full">

      <Search
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          h-4
          w-4
          text-muted-foreground
        "
      />

      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          rounded-lg
          border
          bg-background
          py-3
          pl-10
          pr-10
          text-sm
          shadow-sm
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          ${className ?? ""}
        `}
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-muted-foreground
            hover:text-foreground
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}

    </div>
  )
}