import { clsx } from 'clsx'
import { NavLink } from 'react-router-dom'
import { navItems } from '../content/siteContent'
import { Card } from './Card'
import { LinkButton } from './Button'

export function YayathonSidebar() {
  const items = navItems.filter((n) => n.to !== '/')

  return (
    <Card className="p-5">
      <nav aria-label="Yayathon sayfa menüsü">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium no-underline transition',
                    isActive ? 'bg-nav-active text-fg' : 'text-fg-muted hover:bg-nav-hover hover:text-fg',
                  )
                }
              >
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-5">
        <LinkButton to="/basvuru" className="w-full justify-center">
          Başvuru yap
        </LinkButton>
      </div>
    </Card>
  )
}

