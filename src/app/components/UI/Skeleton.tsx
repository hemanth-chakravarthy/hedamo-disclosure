export default function TableSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="h-10 w-64 rounded-md bg-slate-200 mb-6" />
      <div className="rounded-lg border border-slate-200 bg-white">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-slate-100 p-6 last:border-0"
          >
            <div className="space-y-2">
              <div className="h-4 w-48 rounded bg-slate-200" />
              <div className="h-3 w-32 rounded bg-slate-100" />
            </div>
            <div className="h-6 w-20 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}