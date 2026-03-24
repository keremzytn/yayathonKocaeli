import type { ReactNode } from 'react'
import { clsx } from 'clsx'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-border bg-surface-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
