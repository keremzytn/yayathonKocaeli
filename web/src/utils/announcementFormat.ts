const MONTHS_TR = ['OCA', 'ŞUB', 'MAR', 'NIS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKI', 'KAS', 'ARA'] as const

export function parseAnnouncementListDate(iso: string) {
  const datePart = iso.length > 10 ? iso.substring(0, 10) : iso
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart)
  if (!m) return { day: '—', month: '—' }
  const monthIdx = Number(m[2]) - 1
  const day = String(Number(m[3]))
  return { day, month: MONTHS_TR[monthIdx] ?? '—' }
}

export function formatAnnouncementDateLong(iso: string) {
  const dateStr = iso.length > 10 ? iso : `${iso}T12:00:00`
  const d = new Date(dateStr)
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}
