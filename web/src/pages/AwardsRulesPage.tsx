import { Download } from 'lucide-react'
import { designPage, evaluationPage, resourcesPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { BadgeCheck, Gavel, Trophy } from 'lucide-react'

export function AwardsRulesPage() {
  usePageTitle('Ödüller ve kurallar')

  return (
    <>
      <PageHero title="Ödüller ve kurallar" subtitle={evaluationPage.intro}>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Gavel className="h-4 w-4" aria-hidden />
              Jüri
            </p>
            <p className="mt-2 text-sm font-medium text-fg">7 kişilik hibrit yapı</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <BadgeCheck className="h-4 w-4" aria-hidden />
              Değerlendirme
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Ağırlıklı puanlama sistemi</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Trophy className="h-4 w-4" aria-hidden />
              Ödül
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Kişi başı hediye çeki</p>
          </div>
        </div>
      </PageHero>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-accent-500/55" aria-hidden />
          <div className="pl-2">
          <h2 className="font-display text-lg font-semibold text-fg">{evaluationPage.jury.title}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {evaluationPage.jury.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-accent-500/55" aria-hidden />
          <div className="pl-2">
          <h2 className="font-display text-lg font-semibold text-fg">{evaluationPage.weights.title}</h2>
          <ul className="mt-4 space-y-3">
            {evaluationPage.weights.items.map((w) => (
              <li
                key={w.label}
                className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0"
              >
                <span className="text-fg-muted">{w.label}</span>
                <span className="font-mono text-accent-600 dark:text-accent-400">%{w.percent}</span>
              </li>
            ))}
          </ul>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-accent-500/55" aria-hidden />
          <div className="pl-2">
          <h2 className="font-display text-lg font-semibold text-fg">{evaluationPage.prizes.title}</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {evaluationPage.prizes.rows.map((r) => (
                  <tr key={r.rank} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-fg">{r.rank}</td>
                    <td className="px-4 py-3 text-right font-mono text-accent-600 dark:text-accent-400">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </Card>
      </div>
      <Section title="Beklentiler ve tasarım ilkeleri" lead="Projelerinizde dikkate almanız beklenen özet ilkeler.">
        <div className="grid gap-6 md:grid-cols-2">
          {designPage.focus.items.map((item) => (
            <Card key={item.h}>
              <h3 className="font-display text-base font-semibold text-accent-600 dark:text-accent-400">{item.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.p}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section title={resourcesPage.title} lead={resourcesPage.intro} className="bg-bg-muted/60 dark:bg-surface-900/30">
        <div className="grid gap-6 sm:grid-cols-2">
          {resourcesPage.assets.map((a) => (
            <Card key={a.filename} className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-semibold text-fg">{a.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted">{a.description}</p>
                </div>
                <span className="rounded-lg bg-bg-muted p-2 text-accent-600 dark:bg-surface-800 dark:text-accent-400">
                  <Download className="h-5 w-5" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-xs text-fg-muted">{a.filename}</p>
              {a.available ? (
                <a
                  href={`/downloads/${a.filename}`}
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-surface-950 no-underline hover:bg-accent-400"
                  download
                >
                  İndir
                </a>
              ) : (
                <p className="mt-4 text-sm text-muted">Yakında — dosya eklendiğinde indirme aktif olacak.</p>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
