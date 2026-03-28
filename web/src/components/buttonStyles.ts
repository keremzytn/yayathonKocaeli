import { clsx } from 'clsx'

export const primaryButtonClassName = clsx(
  'inline-flex items-center justify-center rounded-xl border border-accent-600/25 bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-900/10 no-underline transition',
  'hover:border-accent-500/40 hover:bg-accent-500 hover:shadow-lg hover:shadow-accent-600/15',
  'active:translate-y-px active:shadow-sm active:brightness-[0.97]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  'disabled:pointer-events-none disabled:opacity-50',
  'dark:border-accent-400/35 dark:bg-accent-500 dark:shadow-black/30 dark:hover:border-accent-300/40 dark:hover:bg-accent-400 dark:focus-visible:ring-offset-surface-950',
)

