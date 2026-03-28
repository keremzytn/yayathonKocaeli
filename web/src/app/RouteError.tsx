import { useEffect } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { AlertTriangle, FileQuestion } from 'lucide-react'
import { contactPage, siteMeta } from '../content/siteContent'
import { Card } from '../components/Card'
import { Button, LinkButton } from '../components/Button'

export function RouteError() {
  const error = useRouteError()

  const is404 = isRouteErrorResponse(error) && error.status === 404
  const title = is404 ? 'Sayfa bulunamadı' : 'Bir sorun oluştu'

  let message =
    'Sayfa yüklenirken beklenmeyen bir sorun oluştu. Birkaç dakika sonra tekrar deneyebilir veya anasayfaya dönebilirsiniz.'

  if (is404) {
    message = 'Bu adrese karşılık gelen bir sayfa yok veya taşınmış olabilir.'
  } else if (isRouteErrorResponse(error)) {
    message = error.statusText || message
  } else if (error instanceof Error && error.message) {
    message = error.message
  }

  useEffect(() => {
    const prev = document.title
    const short = siteMeta.title.split(' | ')[0] ?? siteMeta.title
    document.title = `${title} | ${short}`
    return () => {
      document.title = prev
    }
  }, [title])

  const Icon = is404 ? FileQuestion : AlertTriangle
  const iconWrap = is404
    ? 'bg-accent-500/15 text-accent-600 dark:text-accent-400'
    : 'bg-red-500/10 text-red-600 dark:text-red-400'

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-muted via-bg to-bg-elevated px-4 py-16 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 sm:py-24">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">Yayathon 2026</p>

        <Card className="w-full border-border/90 text-center shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] dark:border-white/10 dark:shadow-black/40">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${iconWrap}`}
            aria-hidden
          >
            <Icon className="h-8 w-8" strokeWidth={1.75} />
          </div>

          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-fg sm:text-[1.65rem]">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">{message}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <LinkButton to="/" className="w-full justify-center sm:w-auto sm:min-w-[11rem]">
              Anasayfaya dön
            </LinkButton>
            <Button
              type="button"
              variant="secondary"
              className="w-full justify-center sm:w-auto sm:min-w-[11rem]"
              onClick={() => window.location.reload()}
            >
              Sayfayı yenile
            </Button>
          </div>

          <p className="mt-6 border-t border-border pt-6 text-xs leading-relaxed text-fg-muted dark:border-white/10">
            Sorun devam ederse{' '}
            <a
              href={`mailto:${contactPage.email}`}
              className="font-medium text-accent-600 underline-offset-2 hover:underline dark:text-accent-400"
            >
              {contactPage.email}
            </a>{' '}
            adresinden bize yazabilirsiniz.
          </p>
        </Card>
      </div>
    </div>
  )
}
