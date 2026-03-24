import { Mail, MessageCircle } from 'lucide-react'
import { contactPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'

export function ContactPage() {
  usePageTitle('İletişim')

  return (
    <>
      <PageHero title={contactPage.title} subtitle="Teknik sorular ve duyurular için kanallar." />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {contactPage.channels.map((c) => (
            <Card key={c.name} className="flex flex-col">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/15 text-accent-400">
                {c.name === 'E-posta' ? <Mail className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">{c.name}</h3>
              {c.href ? (
                <a href={c.href} className="mt-2 text-sm text-accent-400 no-underline hover:underline">
                  {c.detail}
                </a>
              ) : (
                <p className="mt-2 text-sm text-muted leading-relaxed">{c.detail}</p>
              )}
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-muted">
          Rehberde önerilen “floating chat” ikonu için ikinci fazda widget eklenebilir.
        </p>
      </div>
    </>
  )
}
