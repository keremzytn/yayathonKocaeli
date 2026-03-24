import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { navItems } from '../content/siteContent'
import { LinkButton } from './Button'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-white no-underline">
          Yayathon <span className="text-accent-400">2026</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'rounded-lg px-3 py-2 text-sm no-underline transition',
                  isActive ? 'bg-surface-800 text-white' : 'text-gray-300 hover:bg-surface-800/60 hover:text-white',
                )
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton to="/basvuru">Başvuru</LinkButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Menü</span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobil menü">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'rounded-lg px-3 py-3 text-sm no-underline',
                    isActive ? 'bg-surface-800 text-white' : 'text-gray-200 hover:bg-surface-800/80',
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
