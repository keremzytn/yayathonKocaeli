/** Route lazy yüklenirken Suspense geri bildirimi */
export function PageLoading() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-border border-t-accent-600 dark:border-t-accent-400"
        aria-hidden
      />
      <p className="text-sm text-muted">Yükleniyor…</p>
    </div>
  )
}
