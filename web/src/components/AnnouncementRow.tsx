import { clsx } from 'clsx'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Announcement } from '../content/siteContent'
import { parseAnnouncementListDate } from '../utils/announcementFormat'

const rowBase =
  'group flex w-full items-start gap-4 rounded-xl py-5 text-left transition hover:bg-bg-muted/50 sm:gap-6 sm:py-6 dark:hover:bg-surface-900/50'

export function AnnouncementRow({
  announcement,
  clampSummary = true,
  className,
  ...action
}: {
  announcement: Announcement
  clampSummary?: boolean
  className?: string
} & ({ as: 'link'; to: string } | { as: 'button'; onClick: () => void })) {
  const { day, month } = parseAnnouncementListDate(announcement.dateIso)

  const body = (
    <>
      <div className="flex w-14 shrink-0 flex-col items-center text-center sm:w-16">
        <span className="text-2xl font-light tabular-nums leading-none text-muted sm:text-3xl">{day}</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[11px]">
          {month}
        </span>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="font-display text-base font-semibold text-fg sm:text-lg">{announcement.title}</p>
        <p className={clsx('mt-1 text-sm leading-relaxed text-fg-muted', clampSummary && 'line-clamp-2')}>
          {announcement.summary}
        </p>
      </div>
      <div className="shrink-0 self-center text-muted transition group-hover:text-fg" aria-hidden>
        <ArrowUpRight className="h-5 w-5 stroke-[1.25]" />
      </div>
    </>
  )

  if (action.as === 'link') {
    return (
      <Link to={action.to} className={clsx(rowBase, 'no-underline', className)}>
        {body}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={action.onClick}
      className={clsx(rowBase, 'cursor-pointer border-0 bg-transparent text-fg', className)}
      aria-label={`${announcement.title} duyurusunu aç`}
    >
      {body}
    </button>
  )
}
