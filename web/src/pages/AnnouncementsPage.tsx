import { useSearchParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Card } from '../components/Card'
import { Modal } from '../components/Modal'
import { PageHero } from '../components/PageHero'
import { announcements } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'

function formatDateTR(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(d)
}

export function AnnouncementsPage() {
  usePageTitle('Duyurular')
  const [params, setParams] = useSearchParams()
  const selectedSlug = params.get('duyuru')
  const selected = selectedSlug ? announcements.find((x) => x.slug === selectedSlug) : null

  function openAnnouncement(slug: string) {
    setParams((p) => {
      const next = new URLSearchParams(p)
      next.set('duyuru', slug)
      return next
    })
  }

  function closeModal() {
    setParams((p) => {
      const next = new URLSearchParams(p)
      next.delete('duyuru')
      return next
    })
  }

  return (
    <>
      <PageHero
        title="Duyurular"
        subtitle="Yayathon 2026 ile ilgili güncellemeler ve bilgilendirmeler."
        containerClassName="max-w-screen-2xl"
      />
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex items-end justify-between gap-4 pb-5 sm:pb-6">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight text-fg">Tüm duyurular</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">Bir duyuruya tıklayarak detayını görüntüleyebilirsin.</p>
          </div>
          <p className="shrink-0 rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs font-semibold text-fg-muted">
            {announcements.length} duyuru
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {announcements.map((a) => (
            <Card
              key={a.slug}
              className="group relative overflow-hidden p-0 transition hover:-translate-y-[1px] hover:border-brand/30 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => openAnnouncement(a.slug)}
                className="absolute inset-0 rounded-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                aria-label={`${a.title} duyurusunu aç`}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand/60 to-brand/10 opacity-0 transition group-hover:opacity-100" />

              <div className="relative flex items-start gap-4 px-5 py-5 sm:px-6 sm:py-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-fg sm:text-lg">{a.title}</h3>
                    <span className="inline-flex items-center rounded-full border border-border bg-bg-elevated px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                      {formatDateTR(a.dateIso)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{a.summary}</p>
                </div>

                <div className="shrink-0 pt-1 text-fg-muted transition group-hover:text-fg">
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={Boolean(selected)} title={selected?.title ?? 'Duyuru'} onClose={closeModal}>
        {selected ? (
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {formatDateTR(selected.dateIso)}
            </p>
            <p className="text-sm leading-relaxed text-fg-muted">{selected.summary}</p>
            <div className="space-y-3">
              {selected.body.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-fg-muted">
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 border-t border-border pt-4 dark:border-white/10">
              <button type="button" onClick={closeModal} className="text-sm font-semibold text-fg-muted hover:text-fg">
                Kapat
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  )
}

