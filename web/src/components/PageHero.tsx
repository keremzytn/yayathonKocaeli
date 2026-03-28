import type { ReactNode } from 'react'
import { clsx } from 'clsx'

export function PageHero({
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <div
      className={clsx('border-b border-border', className)}
      style={{
        background: `linear-gradient(to bottom, var(--ui-hero-from), var(--ui-hero-to))`,
      }}
    >
      <div className={clsx('mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10', containerClassName)}>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">{subtitle}</p> : null}
        {children}
      </div>
    </div>
  )
}
