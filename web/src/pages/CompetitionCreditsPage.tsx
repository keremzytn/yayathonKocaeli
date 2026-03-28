import { aboutPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'
import { Building2, CalendarDays, MapPinned } from 'lucide-react'

export function CompetitionCreditsPage() {
  usePageTitle('Yarışma künyesi')

  return (
    <>
      <PageHero title="Yarışma künyesi" subtitle={aboutPage.title}>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Building2 className="h-4 w-4" aria-hidden />
              Düzenleyici
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Kocaeli Büyükşehir Belediyesi</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <MapPinned className="h-4 w-4" aria-hidden />
              Odak Alanı
            </p>
            <p className="mt-2 text-sm font-medium text-fg">İzmit ve Darıca</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <CalendarDays className="h-4 w-4" aria-hidden />
              Etkinlik Dönemi
            </p>
            <p className="mt-2 text-sm font-medium text-fg">5-6 Haziran 2026</p>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Kurumsal Çerçeve</h2>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Yayathon 2026</p>
        </div>

        <div className="space-y-4">
          {aboutPage.sections.map((s, idx) => (
            <Card key={s.h}>
              <div className="flex items-start gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-bg-muted text-sm font-semibold text-fg dark:bg-surface-800">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-fg">{s.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.p}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
