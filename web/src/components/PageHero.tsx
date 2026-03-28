import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { Reveal } from './Reveal'

export function PageHero({
  title,
  subtitle,
  children,
  className,
  containerClassName,
  animateEntry = true,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  containerClassName?: string
  /** false: üst bölüm animasyonsuz (ör. yoğun form sayfaları) */
  animateEntry?: boolean
}) {
  const inner = (
    <div className={clsx('mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10', containerClassName)}>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h1>
      {subtitle ? <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">{subtitle}</p> : null}
      {children}
    </div>
  )

  return (
    <div
      className={clsx('border-b border-border', className)}
      style={{
        background: `linear-gradient(to bottom, var(--ui-hero-from), var(--ui-hero-to))`,
      }}
    >
      {animateEntry ? (
        <Reveal rootMargin="0px 0px 0px 0px">{inner}</Reveal>
      ) : (
        inner
      )}
    </div>
  )
}
