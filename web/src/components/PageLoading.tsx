import { Footprints } from 'lucide-react'
import { clsx } from 'clsx'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** Route lazy yüklenirken Suspense geri bildirimi — iskelet + ayak izi ritmi */
export function PageLoading() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="flex min-h-[min(56vh,480px)] flex-col items-center justify-center gap-10 px-4 py-16">
      <div
        className="flex w-full max-w-md flex-col items-center gap-8"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="sr-only">Sayfa yükleniyor, lütfen bekleyin.</span>

        <div className="flex items-end justify-center gap-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <Footprints
              key={i}
              className={clsx(
                'h-9 w-9 text-accent-600 dark:text-accent-400',
                !reducedMotion && 'ui-loading-footprint',
              )}
              style={
                !reducedMotion
                  ? { animationDelay: `${i * 160}ms` }
                  : undefined
              }
            />
          ))}
        </div>

        <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm ring-1 ring-black/[0.04] dark:bg-surface-900/50 dark:ring-white/[0.06]">
          <div className={clsx('h-3 w-2/5 rounded-full', 'ui-loading-shimmer')} />
          <div className="mt-8 space-y-3">
            <div className={clsx('h-2.5 w-full rounded-full', 'ui-loading-shimmer')} />
            <div className={clsx('h-2.5 w-full rounded-full', 'ui-loading-shimmer')} style={{ animationDelay: '120ms' }} />
            <div className={clsx('h-2.5 w-11/12 rounded-full', 'ui-loading-shimmer')} style={{ animationDelay: '240ms' }} />
            <div className={clsx('h-2.5 w-2/3 rounded-full', 'ui-loading-shimmer')} style={{ animationDelay: '360ms' }} />
          </div>
        </div>

        <p className="text-sm font-medium tracking-wide text-muted">Yükleniyor…</p>
      </div>
    </div>
  )
}
