import { scheduleFieldDay, scheduleHackathon, scheduleMeta } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'

export function CalendarPage() {
  usePageTitle('Takvim')

  return (
    <>
      <PageHero
        title="Takvim"
        subtitle={`Saha keşfi 5 Haziran, maraton ${scheduleMeta.hackathonDate} tarihinde ${scheduleMeta.venue} adresinde.`}
      />
      <Section title={scheduleFieldDay.title}>
        <Card>
          <p className="text-sm font-medium text-accent-600 dark:text-accent-400">{scheduleFieldDay.location}</p>
          {scheduleFieldDay.paragraphs.map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}
        </Card>
      </Section>
      <Section title={`Hackathon — ${scheduleMeta.hackathonDate}`} className="bg-bg-muted/60 dark:bg-surface-900/30">
        <p className="mb-6 text-sm text-muted">{scheduleMeta.venue}</p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-bg-muted text-xs uppercase tracking-wide text-muted dark:bg-surface-900/80">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Saat</th>
                <th className="px-4 py-3 font-medium">Oturum</th>
                <th className="px-4 py-3 font-medium">İçerik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-fg-muted">
              {scheduleHackathon.map((row) => (
                <tr key={row.time} className="bg-card hover:bg-bg-muted dark:bg-surface-950/40 dark:hover:bg-surface-900/60">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-accent-600 dark:text-accent-400">{row.time}</td>
                  <td className="px-4 py-3 font-medium text-fg">{row.session}</td>
                  <td className="px-4 py-3 text-muted">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 block text-xs text-muted md:hidden">Tabloyu görmek için yatay kaydırın.</p>
      </Section>
    </>
  )
}
