import { designPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Carousel } from '../components/Carousel'

export function DesignInspirationPage() {
  usePageTitle('Tasarım ve ilham')

  return (
    <>
      <PageHero title={designPage.title} subtitle={designPage.intro} />
      <Section title={designPage.focus.title}>
        <div className="grid gap-6 md:grid-cols-2">
          {designPage.focus.items.map((item) => (
            <Card key={item.h}>
              <h3 className="font-display text-base font-semibold text-accent-400">{item.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.p}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section title={designPage.gallery.title} lead={designPage.gallery.caption} className="bg-surface-900/30">
        <Carousel images={designPage.gallery.images} title={designPage.gallery.caption} />
      </Section>
    </>
  )
}
