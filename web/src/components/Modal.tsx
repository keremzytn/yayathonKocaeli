import { useEffect } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

export function Modal({
  open,
  title,
  children,
  onClose,
  className,
}: {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  className?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div className="relative mx-auto flex h-full w-full items-center justify-center px-4 py-6 sm:px-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={clsx(
            'w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl ring-1 ring-black/10 dark:bg-surface-900 dark:ring-white/10',
            className,
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 dark:border-white/10">
            <p className="min-w-0 truncate font-display text-base font-semibold text-fg">{title}</p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-bg text-fg transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="max-h-[min(78vh,720px)] overflow-auto px-5 py-5">{children}</div>
        </div>
      </div>
    </div>
  )
}

