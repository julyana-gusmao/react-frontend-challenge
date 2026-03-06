import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="
        flex
        items-center
        justify-center
        w-9
        h-9
        rounded-md
        border
        hover:bg-muted
        transition
      "
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}