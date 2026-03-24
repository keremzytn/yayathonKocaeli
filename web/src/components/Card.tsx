import type { ReactNode } from 'react'
import { clsx } from 'clsx'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur-sm dark:shadow-xl dark:shadow-black/20',
        className,
      )}
    >
      {children}
    </div>
  )
}
