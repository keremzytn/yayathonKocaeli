import { ExternalLink, MapPin } from 'lucide-react'
import { contactVenue } from '../content/siteContent'
import { Card } from './Card'

export function ContactVenueMap() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY?.trim()
  const googleEmbedSrc = key
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(contactVenue.googleMapsPlaceQuery)}&zoom=16&language=tr&maptype=roadmap`
    : null

  return (
    <Card className="overflow-hidden p-0 shadow-md dark:shadow-xl dark:shadow-black/25">
      <div>
        <div className="flex flex-wrap items-start gap-3 px-5 pb-2 pt-6 sm:px-8 sm:pt-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600 dark:text-accent-400">
            <MapPin className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold text-fg sm:text-xl">{contactVenue.mapTitle}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{contactVenue.addressLine}</p>
          </div>
        </div>

        <div className="relative mt-4 min-h-[min(52vh,440px)] w-full sm:min-h-[460px] lg:min-h-[500px]">
          {googleEmbedSrc ? (
            <iframe
              title={contactVenue.mapTitle}
              src={googleEmbedSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <>
              <iframe
                title={contactVenue.mapTitle}
                src={contactVenue.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(8%)_saturate(0.92)_contrast(1.02)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {import.meta.env.DEV ? (
                <p className="absolute right-3 top-3 max-w-[min(100%-1.5rem,20rem)] rounded-lg border border-border bg-card/95 px-3 py-2 text-xs leading-snug text-muted shadow-sm backdrop-blur-sm">
                  Google görünümü:{' '}
                  <code className="rounded bg-bg-muted px-1 py-0.5 text-[0.65rem] text-fg">VITE_GOOGLE_MAPS_EMBED_KEY</code>{' '}
                  (Embed API)
                </p>
              ) : null}
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
          <a
            href={contactVenue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 no-underline hover:underline dark:text-accent-400"
          >
            Google Haritalar’da aç
            <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          </a>
          {!googleEmbedSrc ? (
            <span className="text-xs text-muted">Yedek harita: OpenStreetMap</span>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
