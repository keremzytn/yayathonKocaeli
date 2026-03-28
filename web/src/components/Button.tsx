import { clsx } from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { primaryButtonClassName } from './buttonStyles'

type Variant = 'primary' | 'secondary' | 'ghost'

/** Dışarıda `<a>` vb. ile aynı görünüm için (ör. indirme linki) */
const variants: Record<Variant, string> = {
  primary: primaryButtonClassName,
  secondary:
    'inline-flex items-center justify-center rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-sm font-medium text-fg no-underline shadow-sm transition hover:bg-bg-muted hover:shadow dark:bg-surface-800 dark:hover:bg-surface-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-surface-950',
  ghost:
    'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-accent-600 no-underline transition hover:bg-bg-muted hover:text-accent-700 dark:text-accent-400 dark:hover:bg-surface-800/60 dark:hover:text-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={clsx(variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}

export function LinkButton({
  to,
  variant = 'primary',
  className,
  children,
  onClick,
}: {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <Link to={to} onClick={onClick} className={clsx(variants[variant], className)}>
      {children}
    </Link>
  )
}
