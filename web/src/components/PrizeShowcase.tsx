import { clsx } from 'clsx'
import { ChevronRight, Medal } from 'lucide-react'
import { evaluationPage } from '../content/siteContent'
import { LinkButton } from './Button'
import { Reveal } from './Reveal'

const tierStyles = [
  'border-amber-500/40 bg-gradient-to-br from-amber-500/[0.14] via-transparent to-transparent shadow-amber-500/5 dark:from-amber-500/[0.08]',
  'border-slate-400/35 bg-gradient-to-br from-slate-400/[0.12] via-transparent to-transparent dark:from-slate-400/[0.06]',
  'border-orange-900/30 bg-gradient-to-br from-orange-950/[0.12] via-transparent to-transparent dark:from-orange-950/20',
] as const

const medalClass = [
  'text-amber-600 dark:text-amber-400',
  'text-slate-500 dark:text-slate-400',
  'text-orange-800 dark:text-orange-600',
] as const

export function PrizeShowcase({ mode }: { mode: 'page' | 'home' }) {
  const { title, subtitle, rows } = evaluationPage.prizes

  const grid = (
    <div className="grid gap-4 sm:grid-cols-3">
      {rows.map((r, i) => (
        <Reveal key={r.rank} staggerStep={Math.min(i, 3)} className="h-full">
          <div
            className={clsx(
              'relative flex h-full flex-col rounded-2xl border p-5 transition-shadow hover:shadow-md dark:hover:shadow-black/30',
              tierStyles[i] ?? tierStyles[2],
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={clsx(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg-elevated/80 dark:bg-surface-900/80',
                  medalClass[i] ?? medalClass[2],
                )}
              >
                <Medal className="h-5 w-5" aria-hidden />
              </span>
              <span className="rounded-full bg-bg-muted px-2.5 py-0.5 text-xs font-semibold tabular-nums text-muted dark:bg-surface-800">
                {i + 1}. sıra
              </span>
            </div>
            <p className="mt-4 font-display text-sm font-semibold text-fg">{r.rank}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-accent-600 dark:text-accent-400">{r.amount}</p>
            <p className="mt-2 text-xs leading-relaxed text-fg-muted">Kişi başı hediye çeki</p>
          </div>
        </Reveal>
      ))}
    </div>
  )

  if (mode === 'home') {
    return (
      <div className="space-y-8">
        {grid}
        <div className="flex justify-center">
          <LinkButton to="/oduller-ve-kurallar" className="gap-1.5">
            Ödüller ve Kurallar
            <ChevronRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-lg font-semibold text-fg">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{subtitle}</p>
      </header>
      {grid}
      <p className="text-xs leading-relaxed text-muted">
        Tutarlar takım üyesi başına geçerlidir; dağıtım ve kullanım koşulları etkinlik şartnamesi ile uyumludur.
      </p>
    </div>
  )
}
