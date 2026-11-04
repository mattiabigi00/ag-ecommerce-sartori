'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { trackEvent } from '@/lib/tracking'
import {
  CTA_DECLINE,
  CTA_LABEL,
  CTA_STEPS,
  GUARANTEE_SHORT,
  getSeatsLeft,
} from '@/lib/landing/funnel-1-content'
import { cn } from '@/lib/utils'
import { Countdown } from './countdown'

export function SeatsTimer({ className, label }: { className?: string; label?: string }) {
  const [seats, setSeats] = useState<number | null>(null)

  useEffect(() => {
    setSeats(getSeatsLeft())
  }, [])

  return (
    <div className={cn('flex flex-col items-center gap-3 sm:flex-row sm:gap-5', className)}>
      <p className="text-base font-bold text-white md:text-lg">
        {label ?? (
          <>
            Restano <span className="marker">{seats ?? '--'} posti</span> questa settimana
          </>
        )}
      </p>
      <Countdown />
    </div>
  )
}

export function GuaranteeNote({ className }: { className?: string }) {
  return (
    <p className={cn('flex items-start gap-3 text-left text-base text-white/90 md:text-[17px]', className)}>
      <ShieldCheck aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-go" />
      <span>
        <strong className="text-white">Garanzia Primi 4.000€.</strong> {GUARANTEE_SHORT}
      </span>
    </p>
  )
}

export function StepsList({ className }: { className?: string }) {
  return (
    <ol className={cn('grid w-full gap-3 text-left sm:grid-cols-3', className)}>
      {CTA_STEPS.map((step) => (
        <li key={step.title} className="rounded-xl bg-white/[0.07] p-4 text-[15px] leading-snug text-white/85">
          <strong className="mb-1 block text-base text-white">{step.title}</strong>
          {step.text}
        </li>
      ))}
    </ol>
  )
}

export function CtaButton({
  position,
  className,
  href = '#modulo-candidatura',
  label = CTA_LABEL,
  funnel = 'funnel-1',
}: {
  position: string
  className?: string
  href?: string
  label?: string
  funnel?: string
}) {
  return (
    <a
      href={href}
      onClick={() => trackEvent('CtaClick', { funnel, position })}
      className={cn(
        'group flex min-h-16 w-full items-center justify-center gap-3 rounded-xl bg-go px-6 py-5 text-center text-lg font-extrabold uppercase leading-tight tracking-wide text-black shadow-[0_8px_0_0_var(--color-go-strong)] transition active:translate-y-1 active:shadow-[0_4px_0_0_var(--color-go-strong)] hover:brightness-105 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white md:text-xl',
        className,
      )}
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
    </a>
  )
}

type Props = {
  /** Identifica il punto della pagina per il tracking. */
  position: string
  /** Dove porta il link "No, non voglio...": prosegue la lettura. */
  declineHref: string
  /** "card" = riquadro nero dentro le sezioni chiare, "plain" = direttamente su sfondo scuro. */
  variant?: 'card' | 'plain'
  showSteps?: boolean
  note?: string
  className?: string
}

export function CtaBlock({ position, declineHref, variant = 'card', showSteps = false, note, className }: Props) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center',
        variant === 'card' && 'rounded-3xl bg-black p-6 shadow-xl md:p-10',
        className,
      )}
    >
      <SeatsTimer />
      <div className="flex w-full max-w-[680px] flex-col items-center gap-3">
        <CtaButton position={position} />
        <a
          href={declineHref}
          className="min-h-11 px-3 py-2 text-[15px] text-white/80 underline underline-offset-4 hover:text-white"
        >
          {CTA_DECLINE}
        </a>
      </div>
      {showSteps && <StepsList />}
      <GuaranteeNote className="max-w-[680px]" />
      {note && <p className="max-w-[680px] text-[15px] leading-relaxed text-white/75">{note}</p>}
    </div>
  )
}
