import { useState, type FormEvent } from 'react'
import { Mail, MessageCircle, Send } from 'lucide-react'
import { contactPage } from '../content/siteContent'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHero } from '../components/PageHero'
import { ContactVenueMap } from '../components/ContactVenueMap'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { submitContact } from '../lib/api'
import { clsx } from 'clsx'
import { Reveal } from '../components/Reveal'

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

export function ContactPage() {
  usePageTitle('İletişim')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Ad soyad gerekli.'
    if (!email.trim()) e.email = 'E-posta gerekli.'
    else if (!isValidEmail(email.trim())) e.email = 'Geçerli bir e-posta girin.'
    if (!subject.trim()) e.subject = 'Konu gerekli.'
    if (!message.trim()) e.message = 'Mesaj gerekli.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      await submitContact({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      })
      setStatus('ok')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setErrors({})
    } catch {
      setStatus('err')
    }
  }

  const inputCls = (field: string) =>
    clsx(
      'mt-2 w-full rounded-lg border bg-bg-elevated px-3 py-2 text-sm text-fg placeholder:text-fg-muted focus-visible:outline-none focus-visible:ring-2 dark:bg-surface-950/80',
      errors[field] ? 'border-red-500/60 focus-visible:ring-red-400' : 'border-border focus-visible:ring-accent-600',
    )

  return (
    <>
      <PageHero title={contactPage.title} subtitle="Teknik sorular ve duyurular için kanallar." />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {contactPage.channels.map((c) => (
              <Card key={c.name} className="flex flex-col">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/15 text-accent-600 dark:text-accent-400">
                    {c.name === 'E-posta' ? <Mail className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-fg">{c.name}</h3>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-2 text-sm text-accent-600 no-underline hover:underline dark:text-accent-400"
                    >
                      {c.detail}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-muted leading-relaxed">{c.detail}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Reveal>

        <Card>
          <div>
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-accent-600 dark:text-accent-400" aria-hidden />
              <h2 className="font-display text-lg font-semibold text-fg">Bize yazın</h2>
            </div>
            <p className="mt-1 text-sm text-muted">
              Aşağıdaki formu doldurarak bizlere soru ve önerilerinizi iletebilirsiniz. En kısa sürede dönüş sağlanacaktır.
            </p>

            {status === 'ok' ? (
              <p role="status" aria-live="polite" className="mt-6 text-sm text-green-600 dark:text-green-400">
                Mesajınız başarıyla iletildi. Teşekkürler!
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-fg">
                      Ad Soyad <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        setErrors((x) => {
                          const n = { ...x }
                          delete n.name
                          return n
                        })
                      }}
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? 'contact-name-err' : undefined}
                      className={inputCls('name')}
                    />
                    {errors.name ? (
                      <p id="contact-name-err" className="mt-1 text-xs text-red-500 dark:text-red-400">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-fg">
                      E-posta <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setErrors((x) => {
                          const n = { ...x }
                          delete n.email
                          return n
                        })
                      }}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? 'contact-email-err' : undefined}
                      className={inputCls('email')}
                    />
                    {errors.email ? (
                      <p id="contact-email-err" className="mt-1 text-xs text-red-500 dark:text-red-400">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-fg">
                    Konu <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value)
                      setErrors((x) => {
                        const n = { ...x }
                        delete n.subject
                        return n
                      })
                    }}
                    placeholder="Örn. Başvuru, teknik destek…"
                    aria-invalid={errors.subject ? true : undefined}
                    aria-describedby={errors.subject ? 'contact-subject-err' : undefined}
                    className={inputCls('subject')}
                  />
                  {errors.subject ? (
                    <p id="contact-subject-err" className="mt-1 text-xs text-red-500 dark:text-red-400">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-fg">
                    Mesaj <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      setErrors((x) => {
                        const n = { ...x }
                        delete n.message
                        return n
                      })
                    }}
                    placeholder="Mesajınızı yazın…"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? 'contact-message-err' : undefined}
                    className={inputCls('message')}
                  />
                  {errors.message ? (
                    <p id="contact-message-err" className="mt-1 text-xs text-red-500 dark:text-red-400">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                {status === 'err' ? (
                  <p role="alert" className="text-sm text-red-500 dark:text-red-400">
                    Gönderim başarısız. Lütfen daha sonra tekrar deneyin.
                  </p>
                ) : null}
                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Gönderiliyor…' : 'Mesajı gönder'}
                </Button>
              </form>
            )}
          </div>
        </Card>

        <ContactVenueMap />
      </div>
    </>
  )
}
