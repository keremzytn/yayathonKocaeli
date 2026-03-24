import { useMemo, useState, type FormEvent } from 'react'
import { applicationDeadlineIso } from '../content/siteContent'
import { applicationFormFields } from '../content/formSchema'
import type { FormField } from '../content/formSchema'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { Countdown } from '../components/Countdown'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { countWords } from '../lib/strings'
import { submitApplication } from '../lib/api'
import { clsx } from 'clsx'

function fieldId(name: string) {
  return `field-${name}`
}

export function ApplyPage() {
  usePageTitle('Başvuru')

  const initial = useMemo(() => {
    const o: Record<string, string | string[]> = {}
    for (const f of applicationFormFields) {
      if (f.type === 'checkbox') o[f.name] = []
      else o[f.name] = ''
    }
    return o
  }, [])

  const [values, setValues] = useState<Record<string, string | string[]>>(initial)
  const [fileLabel, setFileLabel] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  function setField(name: string, v: string | string[]) {
    setValues((prev) => ({ ...prev, [name]: v }))
    setErrors((e) => {
      const n = { ...e }
      delete n[name]
      return n
    })
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    for (const f of applicationFormFields) {
      if (f.type === 'file') continue
      if (!f.required) continue
      const v = values[f.name]
      if (f.type === 'checkbox') {
        if (!Array.isArray(v) || v.length === 0) e[f.name] = 'En az bir seçenek işaretleyin.'
        continue
      }
      const s = typeof v === 'string' ? v.trim() : ''
      if (!s || (f.type === 'select' && s === '')) e[f.name] = 'Zorunlu alan.'
      if (f.type === 'textarea') {
        const wc = countWords(s)
        if (wc > f.maxWords) e[f.name] = `En fazla ${f.maxWords} kelime (şu an ${wc}).`
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const payload: Record<string, string | string[] | File | null> = { ...values, portfolio: file }
      await submitApplication(payload)
      setStatus('ok')
    } catch {
      setStatus('err')
    }
  }

  function renderField(f: FormField) {
    const err = errors[f.name]
    const common = err ? 'border-red-500/60 focus-visible:ring-red-400' : 'border-border focus-visible:ring-accent-400'

    if (f.type === 'text' || f.type === 'email' || f.type === 'tel') {
      return (
        <div key={f.name}>
          <label htmlFor={fieldId(f.name)} className="block text-sm font-medium text-fg">
            {f.label}
            {f.required ? <span className="text-red-500 dark:text-red-400"> *</span> : null}
          </label>
          <input
            id={fieldId(f.name)}
            name={f.name}
            type={f.type}
            autoComplete="on"
            value={String(values[f.name] ?? '')}
            onChange={(e) => setField(f.name, e.target.value)}
            placeholder={f.placeholder}
            className={clsx(
              'mt-2 w-full rounded-lg border bg-bg-elevated px-3 py-2 text-sm text-fg placeholder:text-fg-muted focus-visible:outline-none focus-visible:ring-2 dark:bg-surface-950/80',
              common,
            )}
          />
          {err ? <p className="mt-1 text-xs text-red-400">{err}</p> : null}
        </div>
      )
    }

    if (f.type === 'select') {
      return (
        <div key={f.name}>
          <label htmlFor={fieldId(f.name)} className="block text-sm font-medium text-fg">
            {f.label}
            {f.required ? <span className="text-red-500 dark:text-red-400"> *</span> : null}
          </label>
          <select
            id={fieldId(f.name)}
            name={f.name}
            value={String(values[f.name] ?? '')}
            onChange={(e) => setField(f.name, e.target.value)}
            className={clsx(
              'mt-2 w-full rounded-lg border bg-bg-elevated px-3 py-2 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 dark:bg-surface-950/80',
              common,
            )}
          >
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {err ? <p className="mt-1 text-xs text-red-400">{err}</p> : null}
        </div>
      )
    }

    if (f.type === 'radio') {
      const v = String(values[f.name] ?? '')
      return (
        <fieldset key={f.name} className="space-y-2">
          <legend className="text-sm font-medium text-fg">
            {f.label}
            {f.required ? <span className="text-red-500 dark:text-red-400"> *</span> : null}
          </legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {f.options.map((o) => (
              <label key={o.value} className="flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
                <input
                  type="radio"
                  name={f.name}
                  value={o.value}
                  checked={v === o.value}
                  onChange={() => setField(f.name, o.value)}
                  className="border-border text-accent-500 focus-visible:ring-accent-400"
                />
                {o.label}
              </label>
            ))}
          </div>
          {err ? <p className="text-xs text-red-400">{err}</p> : null}
        </fieldset>
      )
    }

    if (f.type === 'checkbox') {
      const arr = Array.isArray(values[f.name]) ? (values[f.name] as string[]) : []
      return (
        <fieldset key={f.name} className="space-y-2">
          <legend className="text-sm font-medium text-fg">{f.label}</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {f.options.map((o) => (
              <label key={o.value} className="flex cursor-pointer items-center gap-2 text-sm text-fg-muted">
                <input
                  type="checkbox"
                  checked={arr.includes(o.value)}
                  onChange={() => {
                    const next = arr.includes(o.value) ? arr.filter((x) => x !== o.value) : [...arr, o.value]
                    setField(f.name, next)
                  }}
                  className="rounded border-border text-accent-500 focus-visible:ring-accent-400"
                />
                {o.label}
              </label>
            ))}
          </div>
          {err ? <p className="text-xs text-red-400">{err}</p> : null}
        </fieldset>
      )
    }

    if (f.type === 'textarea') {
      const s = String(values[f.name] ?? '')
      const wc = countWords(s)
      return (
        <div key={f.name}>
          <label htmlFor={fieldId(f.name)} className="block text-sm font-medium text-fg">
            {f.label}
            {f.required ? <span className="text-red-500 dark:text-red-400"> *</span> : null}
          </label>
          <textarea
            id={fieldId(f.name)}
            name={f.name}
            rows={5}
            value={s}
            onChange={(e) => setField(f.name, e.target.value)}
            placeholder={f.placeholder}
            className={clsx(
              'mt-2 w-full resize-y rounded-lg border bg-bg-elevated px-3 py-2 text-sm text-fg placeholder:text-fg-muted focus-visible:outline-none focus-visible:ring-2 dark:bg-surface-950/80',
              common,
            )}
          />
          <p className={clsx('mt-1 text-xs', wc > f.maxWords ? 'text-red-400' : 'text-muted')}>
            {wc} / {f.maxWords} kelime
          </p>
          {err ? <p className="text-xs text-red-400">{err}</p> : null}
        </div>
      )
    }

    if (f.type === 'file') {
      return (
        <div key={f.name}>
          <label htmlFor={fieldId(f.name)} className="block text-sm font-medium text-fg">
            {f.label}
          </label>
          <input
            id={fieldId(f.name)}
            name={f.name}
            type="file"
            accept={f.accept}
            onChange={(e) => {
              const fl = e.target.files?.[0]
              setFile(fl ?? null)
              setFileLabel(fl?.name ?? null)
            }}
            className="mt-2 block w-full text-sm text-fg-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-surface-950"
          />
          {fileLabel ? <p className="mt-1 text-xs text-muted">Seçilen: {fileLabel}</p> : null}
          <p className="mt-1 text-xs text-muted">Backend olmadan dosya yalnızca tarayıcıda kalır; gönderim simülasyonudur.</p>
        </div>
      )
    }

    return null
  }

  return (
    <>
      <PageHero title="Başvuru" subtitle="Bireysel başvuru ile katılın; takım ataması komite tarafından yapılır." />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Countdown deadlineIso={applicationDeadlineIso} />
        <Card className="mt-8">
          {status === 'ok' ? (
            <p className="text-center text-green-600 dark:text-green-400">Başvurunuz alındı (simülasyon). Teşekkürler!</p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              {applicationFormFields.map(renderField)}
              {status === 'err' ? <p className="text-sm text-red-400">Gönderim başarısız. Daha sonra tekrar deneyin.</p> : null}
              <Button type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
                {status === 'sending' ? 'Gönderiliyor…' : 'Başvuruyu gönder (demo)'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </>
  )
}
