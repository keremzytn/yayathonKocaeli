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

type StepConfig = { title: string; subtitle: string; fieldNames: readonly string[] }

const FORM_STEPS: StepConfig[] = [
  {
    title: 'Kişisel bilgiler',
    subtitle: 'İletişim ve kimlik için temel bilgiler.',
    fieldNames: ['fullName', 'email', 'phone'],
  },
  {
    title: 'Profil',
    subtitle: 'Uzmanlık, deneyim ve araç bilgisi.',
    fieldNames: ['expertise', 'experience', 'skills'],
  },
  {
    title: 'Yanıtlarınız',
    subtitle: 'Motivasyonunuz ve saha gözleminiz.',
    fieldNames: ['motivation', 'problem'],
  },
  {
    title: 'Ek ve gönderim',
    subtitle: 'İsteğe bağlı belge yükleme ve başvuruyu tamamlama.',
    fieldNames: ['portfolio'],
  },
]

function fieldErrorMessage(f: FormField, values: Record<string, string | string[]>): string | null {
  if (f.type === 'file') return null
  if (!f.required) {
    if (f.type === 'textarea') {
      const s = String(values[f.name] ?? '').trim()
      const wc = countWords(s)
      if (wc > f.maxWords) return `En fazla ${f.maxWords} kelime (şu an ${wc}).`
    }
    return null
  }
  const v = values[f.name]
  if (f.type === 'checkbox') {
    if (!Array.isArray(v) || v.length === 0) return 'En az bir seçenek işaretleyin.'
    return null
  }
  const s = typeof v === 'string' ? v.trim() : ''
  if (!s || (f.type === 'select' && s === '')) return 'Zorunlu alan.'
  if (f.type === 'textarea') {
    const wc = countWords(s)
    if (wc > f.maxWords) return `En fazla ${f.maxWords} kelime (şu an ${wc}).`
  }
  return null
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
  const [step, setStep] = useState(0)

  const totalSteps = FORM_STEPS.length
  const isLastStep = step === totalSteps - 1

  function setField(name: string, v: string | string[]) {
    setValues((prev) => ({ ...prev, [name]: v }))
    setErrors((e) => {
      const n = { ...e }
      delete n[name]
      return n
    })
  }

  function getFieldsForStep(stepIndex: number): FormField[] {
    const names = new Set(FORM_STEPS[stepIndex]?.fieldNames ?? [])
    return applicationFormFields.filter((f) => names.has(f.name))
  }

  function mergeStepErrors(stepIndex: number, stepErrors: Record<string, string>) {
    const fields = getFieldsForStep(stepIndex)
    setErrors((prev) => {
      const next = { ...prev }
      for (const f of fields) delete next[f.name]
      return { ...next, ...stepErrors }
    })
  }

  function validateStep(stepIndex: number): boolean {
    const fields = getFieldsForStep(stepIndex)
    const stepErrors: Record<string, string> = {}
    for (const f of fields) {
      const msg = fieldErrorMessage(f, values)
      if (msg) stepErrors[f.name] = msg
    }
    mergeStepErrors(stepIndex, stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  function goNext() {
    if (!validateStep(step)) return
    setStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!isLastStep) return
    const e: Record<string, string> = {}
    for (const f of applicationFormFields) {
      if (f.type === 'file') continue
      const msg = fieldErrorMessage(f, values)
      if (msg) e[f.name] = msg
    }
    setErrors(e)
    if (Object.keys(e).length > 0) {
      const first = applicationFormFields.find((f) => e[f.name])
      if (first) {
        const stepIdx = FORM_STEPS.findIndex((s) => s.fieldNames.includes(first.name))
        if (stepIdx >= 0) setStep(stepIdx)
      }
      return
    }
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
    const common = err ? 'border-red-500/60 focus-visible:ring-red-400' : 'border-border focus-visible:ring-accent-600'

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
          {err ? <p className="mt-1 text-xs text-red-500 dark:text-red-400">{err}</p> : null}
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
          {err ? <p className="mt-1 text-xs text-red-500 dark:text-red-400">{err}</p> : null}
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
                  className="border-border text-accent-500 focus-visible:ring-accent-600"
                />
                {o.label}
              </label>
            ))}
          </div>
          {err ? <p className="text-xs text-red-500 dark:text-red-400">{err}</p> : null}
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
                  className="rounded border-border text-accent-500 focus-visible:ring-accent-600"
                />
                {o.label}
              </label>
            ))}
          </div>
          {err ? <p className="text-xs text-red-500 dark:text-red-400">{err}</p> : null}
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
          <p className={clsx('mt-1 text-xs', wc > f.maxWords ? 'text-red-500 dark:text-red-400' : 'text-muted')}>
            {wc} / {f.maxWords} kelime
          </p>
          {err ? <p className="text-xs text-red-500 dark:text-red-400">{err}</p> : null}
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
            className="mt-2 block w-full text-sm text-fg-muted file:mr-3 file:cursor-pointer file:rounded-xl file:border file:border-accent-600/25 file:bg-accent-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white file:shadow-sm file:transition file:hover:border-accent-500/40 file:hover:bg-accent-500 dark:file:border-accent-400/35 dark:file:bg-accent-500 dark:file:hover:bg-accent-400"
          />
          {fileLabel ? <p className="mt-1 text-xs text-muted">Seçilen: {fileLabel}</p> : null}
          <p className="mt-1 text-xs text-muted">Backend olmadan dosya yalnızca tarayıcıda kalır; gönderim simülasyonudur.</p>
        </div>
      )
    }

    return null
  }

  const currentConfig = FORM_STEPS[step]
  const stepFields = getFieldsForStep(step)

  return (
    <>
      <PageHero title="Başvuru" subtitle="Bireysel başvuru ile katılın; takım ataması komite tarafından yapılır." />
      <div className="w-full px-0 py-8 sm:py-12">
        <Countdown deadlineIso={applicationDeadlineIso} />
        <Card className="mt-6">
          {status === 'ok' ? (
            <p className="text-center text-green-600 dark:text-green-400">Başvurunuz alındı (simülasyon). Teşekkürler!</p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Adım {step + 1} / {totalSteps}</p>
                <nav aria-label="Başvuru adımları" className="mt-3 flex gap-2">
                  {FORM_STEPS.map((s, i) => (
                    <div
                      key={s.title}
                      className={clsx(
                        'h-1 flex-1 rounded-full transition',
                        i < step ? 'bg-accent-500' : i === step ? 'bg-accent-500/50' : 'bg-border',
                      )}
                      title={s.title}
                    />
                  ))}
                </nav>
                <h2 className="mt-4 font-display text-xl font-semibold text-fg">{currentConfig?.title}</h2>
                <p className="mt-1 text-sm text-muted">{currentConfig?.subtitle}</p>
              </div>

              <div className="space-y-8">{stepFields.map(renderField)}</div>

              {status === 'err' ? <p className="text-sm text-red-500 dark:text-red-400">Gönderim başarısız. Daha sonra tekrar deneyin.</p> : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="button" variant="secondary" className="w-full sm:w-auto" disabled={step === 0} onClick={goBack}>
                  Geri
                </Button>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-end">
                  {!isLastStep ? (
                    <Button type="button" className="w-full sm:w-auto" onClick={goNext}>
                      İleri
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Gönderiliyor…' : 'Başvuruyu gönder (demo)'}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          )}
        </Card>
      </div>
    </>
  )
}
