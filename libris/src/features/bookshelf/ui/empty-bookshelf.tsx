export function EmptyBookshelf() {
  return (
    <main className="flex flex-col items-center justify-center py-20 text-center">

      <div className="text-6xl mb-4">
        📚
      </div>

      <p className="text-lg font-semibold">
        Sua estante está vazia
      </p>

      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        Busque livros e adicione à sua estante para acompanhar sua leitura.
      </p>

    </main>
  )
}