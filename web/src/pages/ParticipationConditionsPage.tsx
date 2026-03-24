import { participatePage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Model10x10 } from '../components/Model10x10'

export function ParticipationConditionsPage() {
  usePageTitle('Katılım koşulları')

  return (
    <>
      <PageHero title="Katılım koşulları" subtitle={participatePage.lead} />
      <Section title={participatePage.eligibility.title}>
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-fg-muted">
          {participatePage.eligibility.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Section>
      <Section title={participatePage.teamModel.title} className="bg-bg-muted/60 dark:bg-surface-900/30">
        <p className="max-w-3xl leading-relaxed text-fg-muted">{participatePage.teamModel.p}</p>
      </Section>
      <Section title="10 × 10 modeli — etkileşimli görünüm">
        <Model10x10 />
      </Section>
      <div className="pb-16" />
    </>
  )
}
