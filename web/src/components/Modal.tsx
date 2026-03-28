import * as Dialog from '@radix-ui/react-dialog'
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
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className={clsx(
            'fixed left-1/2 top-1/2 z-[61] max-h-[min(90vh,800px)] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-2xl ring-1 ring-black/10 outline-none focus:outline-none dark:bg-surface-900 dark:ring-white/10 sm:w-full',
            className,
          )}
        >
          <div className="flex max-h-[min(90vh,800px)] flex-col">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-5 py-4 dark:border-white/10">
              <Dialog.Title className="min-w-0 truncate font-display text-base font-semibold text-fg">{title}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-bg text-fg transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
                  aria-label="Kapat"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </Dialog.Close>
            </div>
            <div className="min-h-0 flex-1 overflow-auto px-5 py-5">{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
