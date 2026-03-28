import { Modal } from './Modal'
import type { Announcement } from '../content/siteContent'
import { formatAnnouncementDateLong } from '../utils/announcementFormat'

export function AnnouncementDetailModal({
  announcement,
  onClose,
}: {
  announcement: Announcement | null
  onClose: () => void
}) {
  return (
    <Modal open={Boolean(announcement)} title={announcement?.title ?? 'Duyuru'} onClose={onClose}>
      {announcement ? (
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-border bg-bg-muted/60 px-3 py-1 text-xs font-semibold text-muted dark:bg-surface-800">
            {formatAnnouncementDateLong(announcement.dateIso)}
          </p>
          <p className="text-base font-medium leading-relaxed text-fg">{announcement.summary}</p>
          <div className="border-t border-border pt-5 dark:border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Detay</p>
            <div className="mt-3 space-y-4">
              {announcement.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-fg-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-end border-t border-border pt-5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-fg transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
            >
              Kapat
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
