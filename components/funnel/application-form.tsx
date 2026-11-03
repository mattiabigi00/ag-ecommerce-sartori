'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { APPLICATION_QUESTIONS } from '@/lib/application-questions'
import type { FunnelId } from '@/lib/funnels'
import { readTracking, trackEvent } from '@/lib/tracking'
import { submitLead } from './submit-lead'

type Props = {
  funnel: FunnelId
  step?: string
  /** Dopo l'invio porta a questa pagina (es. calendario per la call). Se assente mostra il messaggio finale. */
  redirectTo?: string
  successMessage?: string
}

const CONTACT_STEP = APPLICATION_QUESTIONS.length

export function ApplicationForm({
  funnel,
  step = 'application',
  redirectTo,
  successMessage = 'Candidatura ricevuta. Ti scriveremo a breve per i prossimi passi.',
}: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [error, setError] = useState<string>()
  const [done, setDone] = useState(false)

  const total = APPLICATION_QUESTIONS.length + 1
  const question = APPLICATION_QUESTIONS[index]
  const isContactStep = index === CONTACT_STEP

  function setAnswer(id: string, value: string) {
    setAnswers((current) => ({ ...current, [id]: value }))
  }

  function next(event: React.FormEvent) {
    event.preventDefault()
    setIndex((current) => current + 1)
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
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
        answers,
        tracking: readTracking(),
      })

      if (!result.ok) {
        setError(result.error)
        return
      }

      trackEvent('SubmitApplication', { funnel })
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Passo {index + 1} di {total}
        </p>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {!isContactStep && question && (
        <form key={question.id} onSubmit={next} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-medium">{question.label}</legend>
            {question.type === 'text' ? (
              <Input
                aria-label={question.label}
                placeholder={question.placeholder}
                value={answers[question.id] ?? ''}
                onChange={(event) => setAnswer(question.id, event.target.value)}
                required
              />
            ) : (
              <RadioGroup
                value={answers[question.id] ?? ''}
                onValueChange={(value) => setAnswer(question.id, String(value))}
                className="flex flex-col gap-2"
              >
                {question.options?.map((option) => (
                  <Label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 has-[[data-checked]]:border-primary"
                  >
                    <RadioGroupItem value={option} />
                    {option}
                  </Label>
                ))}
              </RadioGroup>
            )}
          </fieldset>
          <div className="flex gap-3">
            {index > 0 && (
              <Button type="button" variant="outline" onClick={() => setIndex(index - 1)}>
                Indietro
              </Button>
            )}
            <Button type="submit" size="lg" className="flex-1" disabled={!answers[question.id]}>
              Continua
            </Button>
          </div>
        </form>
      )}

      {isContactStep && (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Dove possiamo contattarti?</h3>
          <div className="flex flex-col gap-2">
            <Label htmlFor="application-name">Nome e cognome</Label>
            <Input id="application-name" name="name" autoComplete="name" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="application-email">Email</Label>
            <Input id="application-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="application-phone">Telefono</Label>
            <Input id="application-phone" name="phone" type="tel" autoComplete="tel" required />
          </div>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="flex items-start gap-3">
            <Checkbox id="application-consent" name="consent" required />
            <Label
              htmlFor="application-consent"
              className="text-sm leading-snug text-muted-foreground"
            >
              Acconsento al trattamento dei dati personali secondo la privacy policy.
            </Label>
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setIndex(index - 1)}>
              Indietro
            </Button>
            <Button type="submit" size="lg" className="flex-1" disabled={pending}>
              {pending ? 'Invio in corso...' : 'Invia candidatura'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
