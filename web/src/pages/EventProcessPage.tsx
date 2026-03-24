import { designPage, methodologyPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { Carousel } from '../components/Carousel'

export function EventProcessPage() {
  usePageTitle('Etkinlik süreci')

  return (
    <>
      <PageHero title="Etkinlik süreci" subtitle="Hackathon metodolojisi ve tasarım çerçevesi — özet." />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
        {methodologyPage.sections.map((block) => (
          <Card key={block.h}>
            <h2 className="font-display text-lg font-semibold text-fg">{block.h}</h2>
            {'p' in block && block.p ? (
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{block.p}</p>
            ) : null}
            {'items' in block && block.items ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-fg-muted">
                {block.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        ))}
      </div>
      <Section title="Tasarım çerçevesi">
        <Card>
          <p className="text-sm leading-relaxed text-fg-muted">{designPage.intro}</p>
          <p className="mt-4 text-sm text-muted">
            Tasarım ilkeleri ve beklentilerin özeti «Ödüller ve kurallar» sayfasındadır.
          </p>
        </Card>
      </Section>
      <Section title={designPage.gallery.title} lead={designPage.gallery.caption} className="bg-bg-muted/60 dark:bg-surface-900/30">
        <Carousel images={designPage.gallery.images} title={designPage.gallery.caption} />
      </Section>
    </>
  )
}
