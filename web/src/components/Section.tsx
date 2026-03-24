import type { ReactNode } from 'react'
import { clsx } from 'clsx'

export function Section({
  id,
  title,
  lead,
  children,
  className,
}: {
  id?: string
  title?: string
  lead?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={clsx('py-16 sm:py-20', className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {title ? (
          <header className="mb-10 max-w-3xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{title}</h2>
            {lead ? <p className="mt-3 text-base text-muted leading-relaxed">{lead}</p> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  )
}
