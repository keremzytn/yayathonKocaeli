import { participatePage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Model10x10 } from '../components/Model10x10'

export function ParticipatePage() {
  usePageTitle('Katılım')

  return (
    <>
      <PageHero title={participatePage.title} subtitle={participatePage.lead} />
      <Section title={participatePage.eligibility.title}>
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-gray-300">
          {participatePage.eligibility.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Section>
      <Section title={participatePage.teamModel.title} className="bg-surface-900/30">
        <p className="max-w-3xl text-gray-300 leading-relaxed">{participatePage.teamModel.p}</p>
      </Section>
      <Section title="10 × 10 modeli — etkileşimli görünüm">
        <Model10x10 />
      </Section>
      <div className="pb-16" />
    </>
  )
}
