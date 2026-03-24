import { evaluationPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Card } from '../components/Card'

export function EvaluationPage() {
  usePageTitle('Değerlendirme')

  return (
    <>
      <PageHero title={evaluationPage.title} subtitle={evaluationPage.intro} />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
        <Card>
          <h2 className="font-display text-lg font-semibold text-white">{evaluationPage.jury.title}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-300">
            {evaluationPage.jury.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold text-white">{evaluationPage.weights.title}</h2>
          <ul className="mt-4 space-y-3">
            {evaluationPage.weights.items.map((w) => (
              <li key={w.label} className="flex items-center justify-between gap-4 border-b border-border/50 pb-3 last:border-0">
                <span className="text-gray-200">{w.label}</span>
                <span className="font-mono text-accent-400">%{w.percent}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold text-white">{evaluationPage.prizes.title}</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {evaluationPage.prizes.rows.map((r) => (
                  <tr key={r.rank} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-white">{r.rank}</td>
                    <td className="px-4 py-3 text-right font-mono text-accent-400">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}
