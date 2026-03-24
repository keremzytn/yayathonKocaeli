import { Download } from 'lucide-react'
import { resourcesPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'

export function ResourcesPage() {
  usePageTitle('Kaynaklar')

  return (
    <>
      <PageHero title={resourcesPage.title} subtitle={resourcesPage.intro} />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-2">
        {resourcesPage.assets.map((a) => (
          <Card key={a.filename} className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-base font-semibold text-white">{a.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted">{a.description}</p>
              </div>
              <span className="rounded-lg bg-surface-800 p-2 text-accent-400">
                <Download className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-500">{a.filename}</p>
            {a.available ? (
              <a
                href={`/downloads/${a.filename}`}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-surface-950 no-underline hover:bg-accent-400"
                download
              >
                İndir
              </a>
            ) : (
              <p className="mt-4 text-sm text-muted">Yakında — dosya eklendiğinde indirme aktif olacak.</p>
            )}
          </Card>
        ))}
      </div>
    </>
  )
}
