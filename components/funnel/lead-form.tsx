'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FunnelId } from '@/lib/funnels'
import { readTracking, trackEvent } from '@/lib/tracking'
import { submitLead } from './submit-lead'

type Props = {
  funnel: FunnelId
  /** Identifica il punto del funnel: "squeeze", "info-request", ... */
  step: string
  ctaLabel: string
  showPhone?: boolean
  showName?: boolean
  /** Dopo l'invio porta a questa pagina. Se assente mostra successMessage. */
  redirectTo?: string
  successMessage?: string
}

export function LeadForm({
  funnel,
  step,
  ctaLabel,
  showPhone = false,
  showName = true,
  redirectTo,
  successMessage = 'Grazie! Ti contatteremo a breve.',
}: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string>()
  const [done, setDone] = useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError(undefined)

    startTransition(async () => {
      const result = await submitLead({
        funnel,
        step,
        name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        phone: String(form.get('phone') ?? ''),
        website: String(form.get('website') ?? ''),
        consent: form.get('consent') === 'on',
        answers: {},
        tracking: readTracking(),
      })

      if (!result.ok) {
        setError(result.error)
        return
      }

      trackEvent('Lead', { funnel, step })
      if (redirectTo) {
        router.push(redirectTo)
      } else {
        setDone(true)
      }
    })
  }

  if (done) {
    return (
      <p role="status" className="rounded-lg border border-border bg-card p-6 text-center">
        {successMessage}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {showName && (
        <Field id={`${step}-name`} label="Nome e cognome">
          <Input
            id={`${step}-name`}
            name="name"
            autoComplete="name"
            placeholder="Il tuo nome e cognome"
            required
            pattern="\S+\s+\S.*"
            title="Inserisci nome e cognome"
            className={inputClass}
          />
        </Field>
      )}
      <Field id={`${step}-email`} label="Email">
        <Input
          id={`${step}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="nome@email.it"
          required
          className={inputClass}
        />
      </Field>
      {showPhone && (
        <Field id={`${step}-phone`} label="Cellulare">
          <Input
            id={`${step}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+39 333 1234567"
            required
            minLength={6}
            pattern="[0-9+\s().\-]{6,}"
            title="Inserisci un numero di telefono valido"
            className={inputClass}
          />
        </Field>
      )}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="flex items-start gap-3">
        <Checkbox
          id={`${step}-consent`}
          name="consent"
          required
          className="mt-0.5 size-5 rounded-md border-2 border-ink/25 bg-white data-checked:border-sky data-checked:bg-sky data-checked:text-white"
        />
        <Label htmlFor={`${step}-consent`} className="text-[13px] font-normal leading-snug text-ink-soft">
          Acconsento al trattamento dei dati personali secondo la privacy policy.
        </Label>
      </div>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-auto min-h-14 w-full text-balance rounded-xl bg-go px-4 py-3.5 text-[15px] font-extrabold uppercase leading-tight tracking-wide text-black shadow-[0_6px_0_0_var(--color-go-strong)] hover:bg-go hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_0_var(--color-go-strong)] sm:text-lg"
        >
          {pending ? 'Invio in corso...' : ctaLabel}
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-ink-soft/80">
          <Lock aria-hidden="true" className="size-3.5" />
          I tuoi dati sono al sicuro. Niente spam.
        </p>
      </div>
    </form>
  )
}

const inputClass =
  'h-12 rounded-xl border-2 border-ink/10 bg-white px-4 text-base text-ink shadow-none placeholder:text-ink/35 focus-visible:border-sky focus-visible:ring-4 focus-visible:ring-sky/20 aria-invalid:border-red-500'

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
      </Label>
      {children}
    </div>
  )
}
