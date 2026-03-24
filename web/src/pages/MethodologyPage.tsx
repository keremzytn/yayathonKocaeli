import { methodologyPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'

export function MethodologyPage() {
  usePageTitle('Metodoloji')

  return (
    <>
      <PageHero title={methodologyPage.title} subtitle="Hackathon Metodoloji Raporu’ndan özetlenmiştir." />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
        {methodologyPage.sections.map((block) => (
          <Card key={block.h}>
            <h2 className="font-display text-lg font-semibold text-white">{block.h}</h2>
            {'p' in block && block.p ? (
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{block.p}</p>
            ) : null}
            {'items' in block && block.items ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-300">
                {block.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        ))}
      </div>
    </>
  )
}
