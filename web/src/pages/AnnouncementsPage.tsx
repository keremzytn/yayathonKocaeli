import { useSearchParams } from 'react-router-dom'
import { AnnouncementDetailModal } from '../components/AnnouncementDetailModal'
import { PageHero } from '../components/PageHero'
import { AnnouncementRow } from '../components/AnnouncementRow'
import { announcements } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'

export function AnnouncementsPage() {
  usePageTitle('Duyurular')
  const [params, setParams] = useSearchParams()
  const selectedSlug = params.get('duyuru')
  const selected = selectedSlug ? announcements.find((x) => x.slug === selectedSlug) : null

  const sorted = [...announcements].sort((a, b) => b.dateIso.localeCompare(a.dateIso))

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
        subtitle="Yayathon 2026 ile ilgili resmi güncellemeler, tarihler ve katılımcı bilgilendirmeleri."
        containerClassName="max-w-6xl"
      />

      <div className="border-b border-border bg-bg py-12 dark:bg-surface-950 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm dark:bg-surface-900/40 dark:shadow-black/20">
            <div className="border-b border-border bg-bg-muted/40 px-5 py-4 dark:bg-surface-900/60 sm:px-6 sm:py-5">
              <h2 className="font-display text-lg font-semibold text-fg sm:text-xl">Duyuru listesi</h2>
              <p className="mt-1 text-sm text-fg-muted">Tüm kayıtlar tek sayfada; detay için satırı seçin.</p>
            </div>
            <ul className="divide-y divide-border">
              {sorted.map((a) => (
                <li key={a.slug} className="px-3 sm:px-5">
                  <AnnouncementRow
                    announcement={a}
                    clampSummary={false}
                    className="px-2 sm:px-1"
                    as="button"
                    onClick={() => openAnnouncement(a.slug)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal open={Boolean(selected)} title={selected?.title ?? 'Duyuru'} onClose={closeModal}>
        {selected ? (
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-border bg-bg-muted/60 px-3 py-1 text-xs font-semibold text-muted dark:bg-surface-800">
              {formatAnnouncementDateLong(selected.dateIso)}
            </p>
            <p className="text-base font-medium leading-relaxed text-fg">{selected.summary}</p>
            <div className="border-t border-border pt-5 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Detay</p>
              <div className="mt-3 space-y-4">
                {selected.body.map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-fg-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-end border-t border-border pt-5 dark:border-white/10">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-fg transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
              >
                Kapat
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
