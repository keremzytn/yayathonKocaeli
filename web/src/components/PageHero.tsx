import type { ReactNode } from 'react'

export function PageHero({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-border bg-gradient-to-b from-surface-900/90 to-surface-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">{subtitle}</p> : null}
        {children}
      </div>
    </div>
  )
}
