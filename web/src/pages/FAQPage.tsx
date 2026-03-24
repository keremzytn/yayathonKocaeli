import { faqItems } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { FAQList } from '../components/FAQ'

export function FAQPage() {
  usePageTitle('SSS')

  return (
    <>
      <PageHero title="Sıkça sorulan sorular" subtitle="Lojistik ve etkinlik kuralları hakkında özet yanıtlar." />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <FAQList items={faqItems} />
      </div>
    </>
  )
}
