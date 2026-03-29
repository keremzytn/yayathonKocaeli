import { faqItems } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { FAQList } from '../components/FAQ'
import { Reveal } from '../components/Reveal'

export function FAQPage() {
  usePageTitle('SSS')

  return (
    <>
      <PageHero title="Sık Sorulan Sorular" subtitle="Lojistik ve etkinlik kuralları hakkında özet yanıtlar." />
      <Reveal className="w-full px-0 py-12 sm:py-16">
        <FAQList items={faqItems} />
      </Reveal>
    </>
  )
}
