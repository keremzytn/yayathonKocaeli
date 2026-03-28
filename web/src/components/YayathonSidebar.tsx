import {
  CalendarDays,
  ClipboardCheck,
  CircleHelp,
  FilePenLine,
  LayoutList,
  Mail,
  Route,
  ScrollText,
  Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { NavLink } from 'react-router-dom'
import { navItems } from '../content/siteContent'
import { LinkButton } from './Button'

const navIconByPath: Record<string, LucideIcon> = {
  '/yarismaci-kunyesi': ScrollText,
  '/etkinlik-suresi': Route,
  '/katilim-kosullari': ClipboardCheck,
  '/oduller-ve-kurallar': Trophy,
  '/takvim': CalendarDays,
  '/sss': CircleHelp,
  '/basvuru': FilePenLine,
  '/iletisim': Mail,
}

export function YayathonSidebar() {
  const items = navItems.filter((n) => n.to !== '/')

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-2xl border border-border/90 bg-gradient-to-b from-bg-elevated to-card',
        'shadow-[0_12px_40px_-12px_rgba(15,23,42,0.2)] ring-1 ring-black/[0.06]',
        'dark:border-surface-700 dark:from-surface-900/95 dark:to-surface-950/90 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] dark:ring-white/[0.08]',
      )}
    >
      <div className="p-5">
        <nav aria-label="Yayathon sayfa menüsü">
          <ul className="space-y-1">
            {items.map((item) => {
              const Icon = navIconByPath[item.to] ?? LayoutList
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-semibold no-underline transition',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/15 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-white/20 dark:focus-visible:ring-offset-surface-950',
                        isActive
                          ? 'bg-nav-active text-fg shadow-sm ring-1 ring-border/80 dark:bg-surface-800 dark:ring-white/10'
                          : 'text-fg-muted hover:bg-nav-hover hover:text-fg',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={clsx(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition',
                            isActive
                              ? 'bg-bg-muted text-fg ring-1 ring-border/90 dark:bg-surface-700 dark:ring-white/10'
                              : 'bg-bg-muted/80 text-fg-muted group-hover:bg-bg-muted group-hover:text-fg dark:bg-surface-800/80',
                          )}
                          aria-hidden
                        >
                          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1 truncate leading-snug">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-5 border-t border-border/80 pt-5 dark:border-white/10">
          <LinkButton to="/basvuru" className="w-full justify-center shadow-md">
            Başvuru yap
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
