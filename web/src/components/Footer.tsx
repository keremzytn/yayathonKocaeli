import { Link } from 'react-router-dom'
import { navItems, siteMeta } from '../content/siteContent'

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-900/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-white">Yayathon 2026</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{siteMeta.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Sayfalar</p>
            <ul className="mt-3 grid gap-2 text-sm">
              {navItems.slice(0, 6).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-gray-400 no-underline hover:text-accent-400">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white">İletişim</p>
            <a href="mailto:hackathon@kocaeli.bel.tr" className="mt-3 block text-sm text-accent-400 no-underline hover:underline">
              hackathon@kocaeli.bel.tr
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-8 text-center text-xs text-muted">
          Kocaeli Büyükşehir Belediyesi · Kaiser Mühendislik iş birliği
        </p>
      </div>
    </footer>
  )
}
