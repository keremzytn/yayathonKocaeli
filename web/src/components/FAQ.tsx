import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

export function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((item, i) => (
        <Accordion.Item key={i} value={`item-${i}`} className="overflow-hidden">
          <Accordion.Header>
            <Accordion.Trigger
              className={clsx(
                'flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-fg',
                'hover:bg-bg-muted data-[state=open]:bg-bg-muted dark:hover:bg-surface-800/50 dark:data-[state=open]:bg-surface-800/40 [&[data-state=open]>svg]:rotate-180',
              )}
            >
              {item.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-accent-600 transition-transform duration-200 dark:text-accent-400" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden">
            <div className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-fg-muted">{item.a}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
