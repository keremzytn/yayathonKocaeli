import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import { Button } from './Button'

export function Carousel({ images, title }: { images: { src: string; alt: string }[]; title: string }) {
  const [i, setI] = useState(0)
  const n = images.length
  const prev = useCallback(() => setI((x) => (x - 1 + n) % n), [n])
  const next = useCallback(() => setI((x) => (x + 1) % n), [n])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const img = images[i]
  if (!img) return null

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface-900/80">
      <div className="relative aspect-[16/10] bg-surface-950">
        <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" width={1200} height={750} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-6">
          <figcaption className="text-sm text-gray-200">{title}</figcaption>
          <p className="text-xs text-gray-400">
            Görsel {i + 1} / {n}
          </p>
        </div>
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
          <Button
            variant="secondary"
            className="!px-2 !py-2"
            onClick={prev}
            aria-label="Önceki görsel"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            className="!px-2 !py-2"
            onClick={next}
            aria-label="Sonraki görsel"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex gap-1 p-3" role="tablist" aria-label="Galeri göstergeleri">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={clsx('h-2 flex-1 rounded-full transition', idx === i ? 'bg-accent-500' : 'bg-surface-700 hover:bg-surface-600')}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </figure>
  )
}
