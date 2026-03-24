import { useEffect, useState } from 'react'
import { Card } from './Card'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function Countdown({ deadlineIso, label = 'Son başvuru' }: { deadlineIso: string; label?: string }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const end = new Date(deadlineIso).getTime()
  const diff = Math.max(0, end - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const done = diff <= 0

  return (
    <Card className="flex flex-wrap items-center justify-between gap-6 border-accent-500/30">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">{label}</p>
        <p className="mt-1 text-sm text-muted">Tarih bilgisi içerik dosyasından yönetilir.</p>
      </div>
      {done ? (
        <p className="text-lg font-medium text-fg">Başvuru süresi sona ermiştir.</p>
      ) : (
        <div className="flex gap-4 font-mono text-2xl font-semibold tabular-nums text-fg sm:text-3xl" aria-live="polite">
          <span title="Gün">
            <span className="text-muted text-lg not-italic sm:text-xl">G </span>
            {pad(d)}
          </span>
          <span className="text-border">:</span>
          <span title="Saat">{pad(h)}</span>
          <span className="text-border">:</span>
          <span title="Dakika">{pad(m)}</span>
          <span className="text-border">:</span>
          <span title="Saniye">{pad(s)}</span>
        </div>
      )}
    </Card>
  )
}
