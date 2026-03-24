import { aboutPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'

export function CompetitionCreditsPage() {
  usePageTitle('Yarışma künyesi')

  return (
    <>
      <PageHero title="Yarışma künyesi" subtitle={aboutPage.title} />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
        {aboutPage.sections.map((s) => (
          <Card key={s.h}>
            <h2 className="font-display text-lg font-semibold text-fg">{s.h}</h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{s.p}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
