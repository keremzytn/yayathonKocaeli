import { scheduleFieldDay, scheduleHackathon, scheduleMeta } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'

export function ProgramPage() {
  usePageTitle('Program')

  return (
    <>
      <PageHero
        title="Program ve takvim"
        subtitle={`Saha keşfi 5 Haziran, maraton ${scheduleMeta.hackathonDate} tarihinde ${scheduleMeta.venue} adresinde.`}
      />
      <Section title={scheduleFieldDay.title}>
        <Card>
          <p className="text-sm font-medium text-accent-400">{scheduleFieldDay.location}</p>
          {scheduleFieldDay.paragraphs.map((p) => (
            <p key={p} className="mt-3 text-gray-300 leading-relaxed">
              {p}
            </p>
          ))}
        </Card>
      </Section>
      <Section title={`Hackathon — ${scheduleMeta.hackathonDate}`} className="bg-surface-900/30">
        <p className="mb-6 text-sm text-muted">{scheduleMeta.venue}</p>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-900/80 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-medium">Saat</th>
                <th className="px-4 py-3 font-medium">Oturum</th>
                <th className="px-4 py-3 font-medium">İçerik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-gray-200">
              {scheduleHackathon.map((row) => (
                <tr key={row.time} className="bg-surface-950/40 hover:bg-surface-900/60">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-accent-400">{row.time}</td>
                  <td className="px-4 py-3 font-medium text-white">{row.session}</td>
                  <td className="px-4 py-3 text-muted">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 block md:hidden text-xs text-muted">
          Tabloyu görmek için yatay kaydırın.
        </p>
      </Section>
    </>
  )
}
