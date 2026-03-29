import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { homeAnnouncementsConfig, mapBackendAnnouncement } from '../content/siteContent'
import type { Announcement, BackendAnnouncement } from '../content/siteContent'
import { AnnouncementDetailModal } from './AnnouncementDetailModal'
import { AnnouncementRow } from './AnnouncementRow'

/** ~tek satır yüksekliği (padding + başlık + 2 satır özet); 3 satır görünür alan için çarpan. */
const ROW_ESTIMATE_REM = 6.75

export function HomeAnnouncements() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [items, setItems] = useState<Announcement[]>([])

  useEffect(() => {
    fetch('http://localhost:5144/api/announcements')
      .then(res => res.json())
      .then((data: BackendAnnouncement[]) => {
        const mapped = data
          .filter(a => a.isActive)
          .map(mapBackendAnnouncement)
          .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
        setItems(mapped)
      })
      .catch(err => console.error("Error fetching announcements:", err))
  }, [])

  const selected = openSlug ? (items.find((a) => a.slug === openSlug) ?? null) : null

  if (items.length === 0) return null

  const { visibleRows } = homeAnnouncementsConfig
  const listMaxHeight = `min(${visibleRows * ROW_ESTIMATE_REM}rem, 70vh)`

  return (
    <section className="border-b border-border bg-bg py-12 sm:py-16 dark:bg-surface-950" aria-labelledby="home-announcements-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-border">
        <div className="flex items-end justify-between gap-4 border-b border-border bg-bg-muted/30 px-4 py-4 dark:bg-surface-900/40 sm:px-5">
          <h2 id="home-announcements-heading" className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
            Duyurular
          </h2>
          <Link
            to="/duyurular"
            className="shrink-0 text-sm font-medium text-muted no-underline transition hover:text-fg"
          >
            + tümü
          </Link>
        </div>
        <div
          className="overflow-y-auto overflow-x-hidden overscroll-y-contain scroll-smooth bg-bg pr-1 [-webkit-overflow-scrolling:touch] dark:bg-surface-950"
          style={{ maxHeight: listMaxHeight }}
          role="region"
          aria-label="Duyuru listesi, kaydırarak tümünü görebilirsiniz"
          tabIndex={0}
        >
        <ul className="divide-y divide-border px-2 sm:px-3">
          {items.map((a) => (
            <li key={a.slug}>
              <AnnouncementRow
                announcement={a}
                clampSummary
                className="-mx-2 px-2"
                as="button"
                onClick={() => setOpenSlug(a.slug)}
              />
            </li>
          ))}
        </ul>
        </div>
        </div>
      </div>
      <AnnouncementDetailModal announcement={selected} onClose={() => setOpenSlug(null)} />
    </section>
  )
}
