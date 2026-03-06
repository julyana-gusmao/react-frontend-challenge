export function BooksSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 border rounded animate-pulse"
        >
          <div className="w-16 h-24 bg-gray-300 rounded" />

          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}