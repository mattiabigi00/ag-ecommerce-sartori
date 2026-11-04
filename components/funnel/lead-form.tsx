'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
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
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate={false}>
      {showName && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${step}-name`}>Nome</Label>
          <Input id={`${step}-name`} name="name" autoComplete="name" required />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${step}-email`}>Email</Label>
        <Input id={`${step}-email`} name="email" type="email" autoComplete="email" required />
      </div>
      {showPhone && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${step}-phone`}>Telefono</Label>
          <Input id={`${step}-phone`} name="phone" type="tel" autoComplete="tel" required />
        </div>
      )}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="flex items-start gap-3">
        <Checkbox id={`${step}-consent`} name="consent" required />
        <Label htmlFor={`${step}-consent`} className="text-sm leading-snug text-muted-foreground">
          Acconsento al trattamento dei dati personali secondo la privacy policy.
        </Label>
      </div>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="h-14 w-full rounded-xl bg-go text-base font-extrabold uppercase tracking-wide text-black shadow-[0_6px_0_0_var(--color-go-strong)] hover:bg-go hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_0_var(--color-go-strong)] md:text-lg"
      >
        {pending ? 'Invio in corso...' : ctaLabel}
      </Button>
    </form>
  )
}
