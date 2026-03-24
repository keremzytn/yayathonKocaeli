import { useMemo, useState } from 'react'
import { Card } from './Card'

/** 10 takım × 10 kişi — hücre seçimi ile bilgi paneli */
export function Model10x10() {
  const [selected, setSelected] = useState<{ team: number; seat: number } | null>(null)

  const cells = useMemo(() => {
    const out: { team: number; seat: number }[] = []
    for (let team = 0; team < 10; team++) {
      for (let seat = 0; seat < 10; seat++) {
        out.push({ team: team + 1, seat: seat + 1 })
      }
    }
    return out
  }, [])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <Card className="overflow-hidden p-4 sm:p-6">
        <p className="mb-4 text-sm text-muted">Izgarada bir hücreye tıklayın — takım ve sıra numarası gösterilir.</p>
        <div
          className="grid max-h-[min(70vh,520px)] gap-0.5 overflow-auto rounded-xl bg-surface-950 p-2 sm:gap-1"
          style={{ gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' }}
          role="grid"
          aria-label="On takım on kişi modeli"
        >
          {cells.map((c) => {
            const active = selected?.team === c.team && selected?.seat === c.seat
            return (
              <button
                key={`${c.team}-${c.seat}`}
                type="button"
                role="gridcell"
                aria-selected={active}
                onClick={() => setSelected(c)}
                className={
                  active
                    ? 'aspect-square min-h-[24px] rounded-md bg-accent-500 text-surface-950 sm:min-h-[28px]'
                    : 'aspect-square min-h-[24px] rounded-md bg-surface-800/90 text-transparent hover:bg-accent-500/40 sm:min-h-[28px]'
                }
                title={`Takım ${c.team}, ${c.seat}. sıra`}
              >
                <span className="sr-only">
                  Takım {c.team}, kişi {c.seat}
                </span>
              </button>
            )
          })}
        </div>
      </Card>
      <Card className="h-fit">
        <h3 className="font-display text-lg font-semibold text-white">Seçim</h3>
        {selected ? (
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            <strong className="text-white">Takım {selected.team}</strong> — bu takımdaki{' '}
            <strong className="text-white">{selected.seat}. katılımcı</strong> konumu. Gerçek atama organizasyon komitesi
            tarafından disiplin ve denge kriterlerine göre yapılır.
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">Henüz seçim yok.</p>
        )}
        <p className="mt-4 text-xs text-muted">Model: 100 kişi, 10 hibrit takım, takım başına 10 üye.</p>
      </Card>
    </div>
  )
}
