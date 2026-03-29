import { participatePage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { GraduationCap, Layers, Users } from 'lucide-react'
import { Reveal } from '../components/Reveal'

export function ParticipationConditionsPage() {
  usePageTitle('Katılım Koşulları')

  return (
    <>
      <PageHero title="Katılım Koşulları" subtitle={participatePage.lead}>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Users className="h-4 w-4" aria-hidden />
              Katılımcı Modeli
            </p>
            <p className="mt-2 text-sm font-medium text-fg">100 kişi / 10 takım</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Layers className="h-4 w-4" aria-hidden />
              Başvuru Tipi
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Bireysel başvuru</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <GraduationCap className="h-4 w-4" aria-hidden />
              Profil
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Akademik + profesyonel</p>
          </div>
        </div>
      </PageHero>
      <Reveal>
        <Section title={participatePage.eligibility.title}>
          <div className="grid gap-4 md:grid-cols-3">
            {participatePage.eligibility.items.map((x, idx) => (
              <Card key={x}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{`Kriter ${(idx + 1).toString().padStart(2, '0')}`}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{x}</p>
              </Card>
            ))}
          </div>
        </Section>
      </Reveal>
      <Reveal>
        <Section title={participatePage.teamModel.title} className="bg-bg-muted/60 dark:bg-surface-900/30">
          <Card>
            <p className="max-w-3xl leading-relaxed text-fg-muted">{participatePage.teamModel.p}</p>
          </Card>
        </Section>
      </Reveal>
      <div className="pb-16" />
    </>
  )
}
