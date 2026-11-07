'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  APPLICATION_QUESTIONS,
  BLOCKER_CONFIRMATIONS,
  MARKET_STAT,
  RECAP_ITEMS,
} from '@/lib/application-questions'
import type { FunnelId } from '@/lib/funnels'
import { readTracking, trackEvent } from '@/lib/tracking'
import { submitLead, submitSurveyAnswers } from './submit-lead'

type Props = {
  funnel: FunnelId
  step?: string
  /**
   * `full`: sondaggio + dati di contatto (il lead nasce qui).
   * `survey`: solo sondaggio, per chi ha già lasciato nome, email e telefono (funnel 2).
   */
  mode?: 'full' | 'survey'
  /** Dopo l'invio porta a questa pagina. Se assente mostra il messaggio finale. */
  redirectTo?: string
  successMessage?: string
}

type Step =
  | { kind: 'question'; index: number }
  | { kind: 'confirm' }
  | { kind: 'stat' }
  | { kind: 'loading' }
  | { kind: 'recap' }
  | { kind: 'contact' }

const BLOCKER_INDEX = APPLICATION_QUESTIONS.findIndex((question) => question.id === 'blocker')

function buildSteps(mode: 'full' | 'survey'): Step[] {
  const steps: Step[] = []
  APPLICATION_QUESTIONS.forEach((_, index) => {
    if (MARKET_STAT && index === BLOCKER_INDEX + 1) steps.push({ kind: 'stat' })
    steps.push({ kind: 'question', index })
    if (index === BLOCKER_INDEX) steps.push({ kind: 'confirm' })
  })
  steps.push({ kind: 'loading' }, { kind: 'recap' })
  if (mode === 'full') steps.push({ kind: 'contact' })
  return steps
}

export function ApplicationForm({
  funnel,
  step = 'application',
  mode = 'full',
  redirectTo,
  successMessage = 'Candidatura ricevuta. Ti scriveremo a breve per i prossimi passi.',
}: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const steps = useMemo(() => buildSteps(mode), [mode])
  const [position, setPosition] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [error, setError] = useState<string>()
  const [done, setDone] = useState(false)

  const current = steps[position]
  const visibleSteps = steps.filter((item) => item.kind !== 'loading')
  const visiblePosition = Math.min(
    visibleSteps.findIndex((item) => item === current) + 1 || position,
    visibleSteps.length,
  )

  useEffect(() => {
    if (current.kind !== 'loading') return
    const timer = window.setTimeout(() => setPosition((value) => value + 1), 1900)
    return () => window.clearTimeout(timer)
  }, [current.kind])

  function goNext(from: number) {
    setPosition((value) => (value === from ? value + 1 : value))
  }

  function goBack() {
    setPosition((value) => {
      let target = value - 1
      while (target > 0 && steps[target].kind === 'loading') target -= 1
      return Math.max(target, 0)
    })
  }

  function choose(questionId: string, value: string) {
    setAnswers((existing) => ({ ...existing, [questionId]: value }))
    const from = position
    window.setTimeout(() => goNext(from), 260)
  }

  function finish() {
    trackEvent('SubmitApplication', { funnel })
    if (redirectTo) {
      router.push(redirectTo)
    } else {
      setDone(true)
    }
  }

  function submitContact(event: React.FormEvent<HTMLFormElement>) {
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
      finish()
    })
  }

  function submitSurvey() {
    setError(undefined)
    startTransition(async () => {
      const result = await submitSurveyAnswers(answers)
      if (!result.ok) {
        setError(result.error)
        return
      }
      finish()
    })
  }

  if (done) {
    return (
      <p role="status" className="rounded-2xl border border-ink/10 bg-white p-6 text-center text-lg font-semibold">
        {successMessage}
      </p>
    )
  }

  const showBack = position > 0 && current.kind !== 'loading'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-semibold text-ink-soft">
          <span>
            Passo {visiblePosition} di {visibleSteps.length}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Avanzamento del questionario"
          aria-valuemin={1}
          aria-valuemax={visibleSteps.length}
          aria-valuenow={visiblePosition}
          className="h-2 w-full overflow-hidden rounded-full bg-ink/10"
        >
          <div
            className="h-full rounded-full bg-sky transition-all duration-500"
            style={{ width: `${(visiblePosition / visibleSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {current.kind === 'question' && (
        <QuestionStep
          key={current.index}
          index={current.index}
          value={answers[APPLICATION_QUESTIONS[current.index].id]}
          onChoose={choose}
        />
      )}

      {current.kind === 'confirm' && (
        <div className="flex flex-col items-center gap-6 py-4 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-go text-black">
            <Check aria-hidden="true" className="size-8" strokeWidth={4} />
          </span>
          <p className="text-balance text-2xl font-extrabold leading-snug text-ink">
            {BLOCKER_CONFIRMATIONS[answers.blocker] ?? 'Perfetto, andiamo avanti.'}
          </p>
          <ContinueButton onClick={() => goNext(position)} />
        </div>
      )}

      {current.kind === 'stat' && MARKET_STAT && (
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <p className="font-display text-6xl leading-none text-sky">{MARKET_STAT.figure}</p>
          <p className="text-balance text-xl font-bold leading-snug text-ink">{MARKET_STAT.text}</p>
          <p className="text-sm text-ink-soft">
            Fonte:{' '}
            {MARKET_STAT.sourceUrl ? (
              <a href={MARKET_STAT.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {MARKET_STAT.source}
              </a>
            ) : (
              MARKET_STAT.source
            )}
          </p>
          <ContinueButton onClick={() => goNext(position)} />
        </div>
      )}

      {current.kind === 'loading' && (
        <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
          <Loader2 aria-hidden="true" className="size-10 animate-spin text-sky" />
          <p className="text-lg font-bold text-ink">Sto analizzando le tue risposte...</p>
        </div>
      )}

      {current.kind === 'recap' && (
        <div className="flex flex-col gap-5">
          <h3 className="text-balance text-2xl font-extrabold leading-tight text-ink">
            Ecco cosa mi hai raccontato
          </h3>
          <dl className="flex flex-col gap-3">
            {RECAP_ITEMS.map((item) => (
              <div key={item.id} className="flex flex-col gap-1 rounded-xl bg-ink/[0.04] px-4 py-3">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">{item.label}</dt>
                <dd className="text-[17px] font-semibold leading-snug text-ink">{answers[item.id]}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[16px] leading-relaxed text-ink-soft">
            {mode === 'full'
              ? 'Ultimo passo: lasciami i tuoi dati e un consulente del mio team ti chiama per mostrarti da dove partire.'
              : 'Invia la candidatura: un consulente del mio team ti chiama per mostrarti da dove partire.'}
          </p>
          {mode === 'survey' ? (
            <div className="flex flex-col gap-3">
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <SubmitButton pending={pending} onClick={submitSurvey} />
            </div>
          ) : (
            <ContinueButton onClick={() => goNext(position)} />
          )}
        </div>
      )}

      {current.kind === 'contact' && (
        <form onSubmit={submitContact} className="flex flex-col gap-5">
          <h3 className="text-balance text-2xl font-extrabold leading-tight text-ink">
            Dove possiamo contattarti?
          </h3>
          <ContactField id="application-name" label="Nome e cognome">
            <Input
              id="application-name"
              name="name"
              autoComplete="name"
              placeholder="Il tuo nome e cognome"
              required
              pattern="\S+\s+\S.*"
              title="Inserisci nome e cognome"
              className={inputClass}
            />
          </ContactField>
          <ContactField id="application-email" label="Email">
            <Input
              id="application-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nome@email.it"
              required
              className={inputClass}
            />
          </ContactField>
          <ContactField id="application-phone" label="Cellulare">
            <Input
              id="application-phone"
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
          </ContactField>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="flex items-start gap-3">
            <Checkbox
              id="application-consent"
              name="consent"
              required
              className="mt-0.5 size-5 rounded-md border-2 border-ink/25 bg-white data-checked:border-sky data-checked:bg-sky data-checked:text-white"
            />
            <Label htmlFor="application-consent" className="text-[13px] font-normal leading-snug text-ink-soft">
              Acconsento al trattamento dei dati personali secondo la privacy policy.
            </Label>
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton pending={pending} />
        </form>
      )}

      {showBack && <BackButton onClick={goBack} />}
    </div>
  )
}

const inputClass =
  'h-12 rounded-xl border-2 border-ink/10 bg-white px-4 text-base text-ink shadow-none placeholder:text-ink/35 focus-visible:border-sky focus-visible:ring-4 focus-visible:ring-sky/20 aria-invalid:border-red-500'

function QuestionStep({
  index,
  value,
  onChoose,
}: {
  index: number
  value?: string
  onChoose: (questionId: string, value: string) => void
}) {
  const question = APPLICATION_QUESTIONS[index]

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-1 text-balance text-2xl font-extrabold leading-tight text-ink">{question.label}</legend>
      <RadioGroup
        value={value ?? ''}
        onValueChange={(next) => onChoose(question.id, String(next))}
        className="flex flex-col gap-3"
      >
        {question.options.map((option) => (
          <Label
            key={option}
            className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 border-ink/10 bg-white px-4 py-3 text-[16px] font-semibold leading-snug text-ink transition-colors hover:border-sky/60 has-[[data-checked]]:border-sky has-[[data-checked]]:bg-sky/10"
          >
            <RadioGroupItem value={option} className="size-5 shrink-0" />
            {option}
          </Label>
        ))}
      </RadioGroup>
    </fieldset>
  )
}

function ContactField({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
      </Label>
      {children}
    </div>
  )
}

const primaryButtonClass =
  'h-auto min-h-14 w-full text-balance rounded-xl bg-go px-4 py-3.5 text-[15px] font-extrabold uppercase leading-tight tracking-wide text-black shadow-[0_6px_0_0_var(--color-go-strong)] hover:bg-go hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_0_var(--color-go-strong)] sm:text-lg'

function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="button" size="lg" onClick={onClick} className={primaryButtonClass}>
      Continua
    </Button>
  )
}

function SubmitButton({ pending, onClick }: { pending: boolean; onClick?: () => void }) {
  return (
    <Button
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      size="lg"
      disabled={pending}
      className={primaryButtonClass}
    >
      {pending ? 'Invio in corso...' : 'Invia candidatura'}
    </Button>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-center text-sm font-semibold text-ink-soft underline-offset-4 hover:underline"
    >
      Indietro
    </button>
  )
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
      {children}
    </p>
  )
}
