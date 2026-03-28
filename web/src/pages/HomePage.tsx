import { Check, Footprints, PenTool } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  applicationDeadlineIso,
  ctaBand,
  hero,
  heroBackground,
  homePrizesSection,
  homeVideo,
  introSection,
  pillarSections,
} from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { LinkButton } from '../components/Button'
import { HomeHero } from '../components/HomeHero'
import { PrizeShowcase } from '../components/PrizeShowcase'
import { HomeAnnouncements } from '../components/HomeAnnouncements'
import { Countdown } from '../components/Countdown'

const pillarIcons = {
  walk: Footprints,
  design: PenTool,
} as const

export function HomePage() {
  usePageTitle('Ana Sayfa')

  return (
    <>
      {/* 1. Hero — ilk dikkat ve marka tonu */}
      <HomeHero
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        stats={hero.stats}
        backgroundImage={heroBackground.imageSrc}
        backgroundAlt={heroBackground.imageAlt}
      />

      {/* 2. Hakkında — "Bu nedir?" sorusunu yanıtla + video ile duygusal bağ kur */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Sol: metin içeriği */}
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                {introSection.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{introSection.lead}</p>
              <ul className="mt-8 space-y-4">
                {introSection.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-fg-muted">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-600 dark:text-accent-400">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sağ: video */}
            <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-lg ring-1 ring-black/5 dark:bg-surface-900 dark:ring-white/10">
              {homeVideo.youtubeId ? (
                <div className="aspect-video w-full">
                  <iframe
                    title={homeVideo.title}
                    src={`https://www.youtube-nocookie.com/embed/${homeVideo.youtubeId}?rel=0`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center gap-2 bg-bg-muted px-6 text-center dark:bg-surface-800">
                  <p className="text-sm text-muted">Video henüz eklenmedi.</p>
                </div>
              )}
              <div className="px-4 py-3 text-center">
                <p className="text-xs font-medium text-muted">{homeVideo.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Misyon kartları — değer teklifini somutlaştır */}
      <Section className="bg-bg-muted/60 dark:bg-surface-900/40">
        <div className="grid gap-8 md:grid-cols-2">
          {pillarSections.map((p) => {
            const Icon = pillarIcons[p.icon]
            return (
              <Card key={p.title} className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600 dark:text-accent-400">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-fg">{p.title}</h3>
                <p className="text-muted leading-relaxed">{p.body}</p>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* 4. Ödüller — arzu yarat, katılma motivasyonunu zirveye çıkar */}
      <Section title={homePrizesSection.title} lead={homePrizesSection.lead} className="border-t border-border bg-bg-muted/40 dark:bg-surface-900/25">
        <PrizeShowcase mode="home" />
      </Section>

      {/* 5. Video intro bölümüne taşındı */}

      {/* 6. Geri sayım + başvuru CTA — aciliyet ve harekete geçiş */}
      <section className="border-b border-border bg-bg-muted/30 py-12 dark:bg-surface-900/35 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Countdown deadlineIso={applicationDeadlineIso} />
          <div className="mt-6 flex justify-center">
            <LinkButton to="/basvuru">Başvuruya git</LinkButton>
          </div>
        </div>
      </section>

      {/* 7. Duyurular — merak uyandırılmış kullanıcı güncel bilgiyi okur */}
      <HomeAnnouncements />

      {/* 8. Kapanış CTA — son soru işaretlerini gider */}
      <section className="border-t border-border bg-gradient-to-br from-bg-muted to-bg py-16 dark:from-surface-900 dark:to-surface-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">{ctaBand.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">{ctaBand.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/sss"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm text-fg no-underline transition hover:bg-bg-muted dark:bg-surface-800 dark:hover:bg-surface-700"
            >
              SSS
            </Link>
            <LinkButton to="/iletisim">İletişime geç</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}
