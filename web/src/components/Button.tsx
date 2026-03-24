import { clsx } from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-surface-950 font-medium hover:bg-accent-400 focus-visible:ring-2 focus-visible:ring-accent-400',
  secondary:
    'bg-surface-800 text-gray-100 border border-border hover:bg-surface-700 focus-visible:ring-2 focus-visible:ring-accent-400',
  ghost: 'text-accent-400 hover:text-accent-500 hover:bg-surface-800/60',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={clsx('rounded-lg px-4 py-2.5 text-sm transition', variants[variant], className)} {...rest}>
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
    <Link
      to={to}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm transition no-underline',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  )
}
