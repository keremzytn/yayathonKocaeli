const MONTHS_TR = ['OCA', 'ŞUB', 'MAR', 'NIS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKI', 'KAS', 'ARA'] as const

export function parseAnnouncementListDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return { day: '—', month: '—' }
  const monthIdx = Number(m[2]) - 1
  const day = String(Number(m[3]))
  return { day, month: MONTHS_TR[monthIdx] ?? '—' }
}

export function formatAnnouncementDateLong(iso: string) {
  const d = new Date(`${iso}T12:00:00`)
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}
