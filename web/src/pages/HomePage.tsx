import { Check, Footprints, PenTool } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ctaBand,
  hero,
  introSection,
  pillarSections,
} from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { LinkButton } from '../components/Button'

const pillarIcons = {
  walk: Footprints,
  design: PenTool,
} as const

export function HomePage() {
  usePageTitle('Ana Sayfa')

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(13,148,136,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent-400 sm:text-sm">
            {hero.kicker}
          </p>
          <h1 className="mt-4 text-center font-display text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-gray-300 sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {hero.stats.map((s) => (
              <Card key={s.label} className="text-center sm:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-accent-400">{s.label}</p>
                <p className="mt-2 font-display text-xl font-semibold text-white">{s.value}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton to="/basvuru">Başvuru sayfası</LinkButton>
            <LinkButton to="/program" variant="secondary">
              Program
            </LinkButton>
          </div>
          <p className="mt-8 text-center text-xs text-muted">
            Giriş görseli / video alanı: yüksek çözünürlüklü yaya temalı görsel veya belediye vitamı buraya yerleştirilebilir.
          </p>
        </div>
      </section>

      <Section title={introSection.title} lead={introSection.lead}>
        <ul className="max-w-3xl space-y-4">
          {introSection.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-gray-200">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-surface-900/40">
        <div className="grid gap-8 md:grid-cols-2">
          {pillarSections.map((p) => {
            const Icon = pillarIcons[p.icon]
            return (
              <Card key={p.title} className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                <p className="text-muted leading-relaxed">{p.body}</p>
              </Card>
            )
          })}
        </div>
      </Section>

      <section className="border-t border-border bg-gradient-to-br from-surface-900 to-surface-950 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{ctaBand.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">{ctaBand.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/sss"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-800 px-4 py-2.5 text-sm text-white no-underline transition hover:bg-surface-700"
            >
              SSS
            </Link>
            <Link
              to="/iletisim"
              className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-medium text-surface-950 no-underline hover:bg-accent-400"
            >
              İletişime geç
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
