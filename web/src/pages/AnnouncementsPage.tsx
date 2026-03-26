import { Card } from '../components/Card'
import { PageHero } from '../components/PageHero'
import { usePageTitle } from '../hooks/usePageTitle'

export function AnnouncementsPage() {
  usePageTitle('Duyurular')

  return (
    <>
      <PageHero title="Duyurular" subtitle="Yayathon 2026 ile ilgili duyurular burada yayınlanacak." />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Card>
          <p className="text-sm leading-relaxed text-fg-muted">
            Şu an için duyuru eklenmedi. İlk duyurular yayınlandığında bu bölüm güncellenecek.
          </p>
        </Card>
      </div>
    </>
  )
}

