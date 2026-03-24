import { useEffect, useState } from 'react'

function pad2(n: number) {
  return n.toString().padStart(2, '0')
}

export function Countdown({
  deadlineIso,
  title = 'Son Başvuruya Kalan Süre',
  subtitle = 'Fırsatı kaçırmamak için hemen başvurunu tamamla!',
}: {
  deadlineIso: string
  title?: string
  subtitle?: string
}) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [])

  const end = new Date(deadlineIso).getTime()
  const diff = Math.max(0, end - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const done = diff <= 0

  const dayStr = d < 100 ? pad2(d) : String(d)

  const units = done
    ? []
    : [
        { value: dayStr, label: 'GÜN' },
        { value: pad2(h), label: 'SAAT' },
        { value: pad2(m), label: 'DAK.' },
        { value: pad2(s), label: 'SN.' },
      ]

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur-sm dark:border-surface-700 dark:bg-surface-900/90 dark:shadow-xl dark:shadow-black/25 sm:rounded-3xl sm:p-8 md:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
        <div className="min-w-0 shrink-0 lg:max-w-sm xl:max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
            Son başvuru
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
        </div>

        {done ? (
          <p className="flex-1 text-center text-base font-medium text-fg lg:text-left">Başvuru süresi sona ermiştir.</p>
        ) : (
          <div
            className="grid w-full min-w-0 flex-1 grid-cols-4 gap-2 sm:gap-3 md:gap-4"
            aria-live="polite"
            aria-atomic="true"
          >
            {units.map((u) => (
              <div
                key={u.label}
                className="flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-bg-muted/90 py-4 sm:gap-2 sm:py-5 md:py-6 dark:border-surface-600 dark:bg-surface-800/70"
              >
                <span className="font-display text-xl font-bold tabular-nums leading-none text-fg sm:text-2xl md:text-3xl lg:text-4xl">
                  {u.value}
                </span>
                <span className="text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-accent-600 dark:text-accent-400 sm:text-[0.65rem]">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
