import { aboutPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'

export function AboutPage() {
  usePageTitle('Hakkında')

  return (
    <>
      <PageHero title={aboutPage.title} />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
        {aboutPage.sections.map((s) => (
          <Card key={s.h}>
            <h2 className="font-display text-lg font-semibold text-white">{s.h}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">{s.p}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
