import { BOOK_PLACEHOLDER } from "@/shared/constants/placeholders"

interface Props {
  thumbnail?: string
  title: string
}

export function BookDetailHeader({ thumbnail, title }: Props) {
  return (
    <header>
      <img
        src={
          thumbnail ??
          BOOK_PLACEHOLDER
        }
        alt={`Capa do livro ${title}`}
        loading="lazy"
        className="w-full rounded-md shadow-md"
      />
    </header>
  )
}