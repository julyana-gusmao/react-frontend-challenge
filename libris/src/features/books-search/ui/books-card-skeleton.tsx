export function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">

      <div
        className="
          w-full
          aspect-3/4
          rounded-md
          bg-muted
        "
      />

      <div className="h-3 w-3/4 bg-muted rounded" />

      <div className="h-3 w-1/2 bg-muted rounded" />

    </div>
  )
}