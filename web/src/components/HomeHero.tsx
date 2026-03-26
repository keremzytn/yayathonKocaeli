import { Link } from 'react-router-dom'

type HeroStat = { label: string; value: string }

export function HomeHero({
  kicker,
  title,
  subtitle,
  stats,
  backgroundImage,
  backgroundAlt,
}: {
  kicker: string
  title: string
  subtitle: string
  stats: readonly HeroStat[]
  backgroundImage: string
  backgroundAlt: string
}) {
  return (
    <section className="border-b border-border">
      <div className="relative flex w-screen min-h-[min(70vh,640px)] items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          role="img"
          aria-label={backgroundAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/65" aria-hidden />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]" aria-hidden />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-black/25 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/90 shadow-sm sm:text-xs">
                {kicker}
              </span>

              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/95 sm:text-lg lg:mx-0">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  to="/yarismaci-kunyesi"
                  className="inline-flex items-center justify-center rounded-xl bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-900/10 transition hover:bg-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Yarışma künyesi
                </Link>
                <Link
                  to="/basvuru"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-black/20 px-4 py-2.5 text-sm font-semibold text-white/95 backdrop-blur transition hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Başvuru
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/15 bg-black/20 p-5 backdrop-blur-sm transition hover:border-white/25"
                >
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                    {s.label}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
