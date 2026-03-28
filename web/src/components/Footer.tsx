import { Link } from 'react-router-dom'
import { navItems, siteMeta } from '../content/siteContent'

export function Footer() {
  const infoLinks = navItems.filter((n) => n.to !== '/')

  return (
    <footer className="border-t border-border bg-bg-muted/80 dark:bg-surface-900/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-fg">Yayathon 2026</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{siteMeta.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-fg">Sayfalar</p>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2 sm:gap-x-4">
              {infoLinks.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-fg-muted no-underline hover:text-accent-600 dark:hover:text-accent-400">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-fg">İletişim</p>
            <a
              href="mailto:hackathon@kocaeli.bel.tr"
              className="mt-3 block text-sm text-accent-600 no-underline hover:underline dark:text-accent-400"
            >
              hackathon@kocaeli.bel.tr
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-8 text-center text-xs text-muted">
          Kocaeli Büyükşehir Belediyesi · Kaiser Mühendislik
        </p>
      </div>
    </footer>
  )
}
