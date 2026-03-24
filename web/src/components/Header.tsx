import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { clsx } from 'clsx'
import { navItems } from '../content/siteContent'
import { LinkButton } from './Button'
import { useTheme } from '../theme/useTheme'

export function Header() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          to="/"
          className="shrink-0 font-display text-lg font-semibold tracking-tight text-fg no-underline"
        >
          Yayathon <span className="text-accent-600 dark:text-accent-400">2026</span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 xl:flex xl:px-2"
          aria-label="Ana menü"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'shrink-0 whitespace-nowrap rounded-lg px-2 py-2 text-[0.8125rem] font-medium leading-none no-underline transition lg:px-2.5 lg:text-sm',
                  isActive
                    ? 'bg-nav-active text-fg'
                    : 'text-fg-muted hover:bg-nav-hover hover:text-fg',
                )
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <button
            type="button"
            onClick={() => toggleTheme()}
            className="rounded-lg border border-border bg-bg-elevated p-2 text-fg transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
            aria-pressed={isDark}
            aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
            title={isDark ? 'Açık tema' : 'Koyu tema'}
          >
            {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
          </button>
          <LinkButton to="/basvuru">Başvuru</LinkButton>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <button
            type="button"
            onClick={() => toggleTheme()}
            className="rounded-lg border border-border p-2 text-fg"
            aria-pressed={isDark}
            aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-fg"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menü</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border xl:hidden">
          <nav className="mx-auto flex w-full max-w-screen-2xl flex-col gap-1 px-4 py-4 sm:px-6 lg:px-8" aria-label="Mobil menü">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'rounded-lg px-3 py-3 text-sm no-underline',
                    isActive ? 'bg-nav-active text-fg' : 'text-fg hover:bg-nav-hover',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <LinkButton to="/basvuru" className="mt-2 justify-center" onClick={() => setOpen(false)}>
              Başvuru
            </LinkButton>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
