import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import { LinkButton } from '../components/Button'
import { Reveal } from '../components/Reveal'

export function NotFoundPage() {
  usePageTitle('Sayfa bulunamadı')

  return (
    <Reveal rootMargin="0px 0px 0px 0px" className="mx-auto max-w-lg px-4 py-20 text-center sm:py-28">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Sayfa bulunamadı</h1>
      <p className="mt-3 text-muted leading-relaxed">
        Aradığınız adres taşınmış, silinmiş veya yanlış yazılmış olabilir.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <LinkButton to="/">Anasayfa</LinkButton>
        <Link
          to="/sss"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-fg no-underline transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
        >
          SSS
        </Link>
        <Link
          to="/iletisim"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-semibold text-fg-muted no-underline transition hover:bg-nav-hover hover:text-fg"
        >
          İletişim
        </Link>
      </div>
    </Reveal>
  )
}
