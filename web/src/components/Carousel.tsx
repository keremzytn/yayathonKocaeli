import { useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

export function Carousel({ images, title }: { images: { src: string; alt: string }[]; title: string }) {
  const [i, setI] = useState(0)
  const n = images.length
  const prev = useCallback(() => setI((x) => (x - 1 + n) % n), [n])
  const next = useCallback(() => setI((x) => (x + 1) % n), [n])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    }
  }

  if (n === 0) return null

  const navBtn =
    'absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white shadow-lg backdrop-blur-md transition hover:border-white/25 hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 sm:h-12 sm:w-12'

  return (
    <figure className="mx-auto max-w-5xl">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="group/carousel overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 dark:bg-surface-900 dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)] dark:ring-white/[0.06]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-grid-bg md:aspect-[2/1]">
          {images.map((im, idx) => (
            <img
              key={im.src}
              src={im.src}
              alt={im.alt}
              width={1600}
              height={1000}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className={clsx(
                'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out',
                idx === i ? 'z-10 opacity-100' : 'z-0 opacity-0 scale-[1.02]',
              )}
              aria-hidden={idx !== i}
            />
          ))}

          <div
            className="pointer-events-none absolute inset-0 z-[6] rounded-b-none ring-1 ring-inset ring-black/10 dark:ring-white/[0.06]"
            aria-hidden
          />

          <button type="button" className={clsx(navBtn, 'left-3 sm:left-4')} onClick={prev} aria-label="Önceki görsel">
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
          <button type="button" className={clsx(navBtn, 'right-3 sm:right-4')} onClick={next} aria-label="Sonraki görsel">
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
          </button>
        </div>

        <div
          className="flex gap-2 border-t border-border bg-bg-muted/80 p-3 backdrop-blur-md dark:border-white/10 dark:bg-surface-950/90 sm:gap-3 sm:p-4"
          role="tablist"
          aria-label="Galeri önizlemeleri"
        >
          {images.map((im, idx) => (
            <button
              key={im.src}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={`Görsel ${idx + 1}`}
              onClick={() => setI(idx)}
              className={clsx(
                'relative aspect-[4/3] min-h-0 flex-1 overflow-hidden rounded-xl transition-all duration-300 sm:max-h-[4.5rem]',
                idx === i
                  ? 'ring-2 ring-accent-600 ring-offset-2 ring-offset-bg dark:ring-accent-600 dark:ring-offset-surface-950'
                  : 'opacity-55 ring-1 ring-transparent hover:opacity-90 hover:ring-border',
              )}
            >
              <img src={im.src} alt="" className="h-full w-full object-cover" loading="lazy" width={200} height={150} />
            </button>
          ))}
        </div>
      </div>
    </figure>
  )
}
