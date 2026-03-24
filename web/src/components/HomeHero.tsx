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
    <section className="border-b border-border bg-bg py-6 sm:py-10 dark:bg-surface-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative min-h-[min(58vh,540px)] overflow-hidden rounded-[2rem] border border-white/10 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            role="img"
            aria-label={backgroundAlt}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/25 via-transparent to-transparent" aria-hidden />
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05]" aria-hidden />

          <div className="relative flex min-h-[min(58vh,540px)] flex-col px-5 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9 md:px-12">
            <div className="shrink-0">
              <span className="inline-block rounded-full bg-blue-600 px-4 py-2 text-[0.65rem] font-semibold uppercase leading-none tracking-[0.12em] text-white shadow-sm sm:text-xs">
                {kicker}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center py-8 text-center sm:py-10">
              <h1 className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/95 sm:text-lg">
                {subtitle}
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-1 gap-8 border-t border-white/15 pt-8 sm:grid-cols-2 sm:gap-6 sm:pt-7">
              {stats.map((s, idx) => (
                <div key={s.label} className={idx === 1 ? 'sm:text-right' : ''}>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                    {s.label}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold text-white sm:text-xl">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
