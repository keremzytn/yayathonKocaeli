import { designPage, methodologyPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { Carousel } from '../components/Carousel'
import { Compass, Lightbulb, Route } from 'lucide-react'

export function EventProcessPage() {
  usePageTitle('Etkinlik süreci')

  return (
    <>
      <PageHero title="Etkinlik süreci" subtitle="Hackathon metodolojisi ve tasarım çerçevesi — özet.">
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Compass className="h-4 w-4" aria-hidden />
              Süreç Tipi
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Saha + Yoğun Çalışma</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Route className="h-4 w-4" aria-hidden />
              Yaklaşım
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Design Thinking + Tactical Urbanism</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-elevated p-3 dark:bg-surface-900/60">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Lightbulb className="h-4 w-4" aria-hidden />
              Çıktı
            </p>
            <p className="mt-2 text-sm font-medium text-fg">Uygulanabilir proje fikirleri</p>
          </div>
        </div>
      </PageHero>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Metodoloji Adımları</h2>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Süreç Özeti</p>
        </div>
        <div className="space-y-4">
          {methodologyPage.sections.map((block, idx) => (
            <Card key={block.h}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{`Adım ${(idx + 1).toString().padStart(2, '0')}`}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-fg">{block.h}</h3>
                {'p' in block && block.p ? <p className="mt-3 text-sm leading-relaxed text-fg-muted">{block.p}</p> : null}
                {'items' in block && block.items ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-fg-muted">
                    {block.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Section title="Tasarım çerçevesi">
        <Card>
          <p className="text-sm leading-relaxed text-fg-muted">{designPage.intro}</p>
          <p className="mt-4 text-sm text-muted">
            Tasarım ilkeleri ve beklentilerin özeti «Ödüller ve kurallar» sayfasındadır.
          </p>
        </Card>
      </Section>
      <Section
        title={designPage.gallery.title}
        lead={designPage.gallery.caption}
        className="border-t border-border bg-gradient-to-b from-bg-muted/40 via-bg-muted/50 to-bg-muted/70 dark:from-surface-900/40 dark:via-surface-900/35 dark:to-surface-950/50"
      >
        <Carousel images={designPage.gallery.images} title={designPage.gallery.caption} />
      </Section>
    </>
  )
}
