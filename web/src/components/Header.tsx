import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { clsx } from 'clsx'
import { useTheme } from '../theme/useTheme'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold leading-none no-underline transition sm:text-base',
    isActive ? 'bg-nav-active text-fg' : 'text-fg-muted hover:bg-nav-hover hover:text-fg',
  )

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'block rounded-lg px-3 py-3 text-base font-semibold no-underline transition',
    isActive ? 'bg-nav-active text-fg' : 'text-fg-muted hover:bg-nav-hover hover:text-fg',
  )

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Rota değişince mobil menüyü kapat (geri/ileri ve programatik geçişler)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pathname değişimine bağlı tek senkron davranış
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2 no-underline" aria-label="Anasayfa">
          <span className="flex h-12 w-12 overflow-hidden rounded-md bg-bg-elevated ring-1 ring-border/60" aria-hidden>
            <img src="/images/logo.jpeg" alt="" className="h-full w-full object-cover" />
          </span>
        </Link>

        <div className="relative flex min-w-0 flex-1 items-center justify-end">
          <nav
            aria-label="Üst menü"
            className="pointer-events-auto absolute left-1/2 top-1/2 hidden w-[min(720px,calc(100%-7.5rem))] -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <div className="flex flex-nowrap items-center justify-center gap-1 overflow-x-auto px-1 text-center sm:gap-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              <NavLink to="/" end className={navLinkClass}>
                Anasayfa
              </NavLink>

              <NavLink to="/yarismaci-kunyesi" className={navLinkClass}>
                Yayathon 2026
              </NavLink>

              <NavLink to="/duyurular" end className={navLinkClass}>
                Duyurular
              </NavLink>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="rounded-lg border border-border bg-bg-elevated p-2 text-fg transition hover:bg-bg-muted md:hidden dark:bg-surface-800 dark:hover:bg-surface-700"
              aria-expanded={mobileOpen}
              aria-controls="mobile-primary-nav"
              aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="shrink-0 rounded-lg border border-border bg-bg-elevated p-2 text-fg transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
              aria-pressed={isDark}
              aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
              title={isDark ? 'Açık tema' : 'Koyu tema'}
            >
              {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-primary-nav"
        className={clsx('border-t border-border bg-bg/95 md:hidden', mobileOpen ? 'block' : 'hidden')}
      >
        <nav className="flex flex-col px-4 py-2" aria-label="Üst menü">
          <NavLink to="/" end className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Anasayfa
          </NavLink>
          <NavLink to="/yarismaci-kunyesi" className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Yayathon 2026
          </NavLink>
          <NavLink to="/duyurular" end className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Duyurular
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
