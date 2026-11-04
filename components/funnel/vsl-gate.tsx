'use client'

import { useEffect, useRef } from 'react'
import { Check, Lock } from 'lucide-react'
import { VSL_UNLOCK_SECONDS, type FunnelId } from '@/lib/funnels'
import { cn } from '@/lib/utils'
import { useUnlock } from './use-unlock'
import { VslPlayer } from './vsl-player'

type Props = {
  funnel: FunnelId
  src?: string
  embedUrl?: string
  poster?: string
  unlockAfterSeconds?: number
  /** Titolo e testi sopra il video. */
  header: React.ReactNode
  /** Mostra l'indicatore "Passo 1 di 2 / Passo 2 di 2". */
  showSteps?: boolean
  /** Testo del riquadro sotto il video mentre e' bloccato. */
  lockedText: string
  /** Contenuto a tutta larghezza che appare allo sblocco. */
  children: React.ReactNode
}

function formatTime(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds))
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`
}

export function VslGate({
  funnel,
  src,
  embedUrl,
  poster,
  unlockAfterSeconds = VSL_UNLOCK_SECONDS,
  header,
  showSteps = false,
  lockedText,
  children,
}: Props) {
  const { unlocked, watched, report } = useUnlock({
    storageKey: `ag_unlocked_${funnel}`,
    unlockAfterSeconds,
  })
  const revealRef = useRef<HTMLDivElement>(null)
  const wasLockedRef = useRef(true)

  useEffect(() => {
    // Scorre alla sezione solo se lo sblocco avviene mentre si guarda, non al ricaricamento.
    if (unlocked && !wasLockedRef.current) {
      revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [unlocked])

  useEffect(() => {
    const timer = setTimeout(() => {
      wasLockedRef.current = false
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const percent = Math.min(100, (watched / unlockAfterSeconds) * 100)
  const unlockLabel = formatTime(unlockAfterSeconds)

  return (
    <>
      <section className="bg-black px-5 pb-14 pt-8 text-white md:pb-20 md:pt-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 md:gap-8">
          {showSteps && (
            <ol aria-label="Avanzamento" className="grid grid-cols-2 gap-3">
              <li
                aria-current={unlocked ? undefined : 'step'}
                className={cn(
                  'flex items-center gap-3 rounded-xl border-2 p-3 md:p-4',
                  unlocked ? 'border-white/15 bg-white/[0.04]' : 'border-sky bg-navy',
                )}
              >
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full font-display text-lg',
                    unlocked ? 'bg-go text-black' : 'bg-sky text-black',
                  )}
                >
                  {unlocked ? <Check aria-hidden="true" className="size-5" strokeWidth={3.5} /> : 1}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Passo 1 di 2</span>
                  <span className="text-base font-extrabold md:text-lg">
                    {unlocked ? 'Lezione sbloccata' : 'Guarda la lezione'}
                  </span>
                </span>
              </li>
              <li
                aria-current={unlocked ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl border-2 p-3 md:p-4',
                  unlocked ? 'border-sky bg-navy' : 'border-white/15 bg-white/[0.04]',
                )}
              >
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full font-display text-lg',
                    unlocked ? 'bg-sky text-black' : 'bg-white/15 text-white',
                  )}
                >
                  {unlocked ? 2 : <Lock aria-hidden="true" className="size-4" />}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Passo 2 di 2</span>
                  <span className="text-base font-extrabold md:text-lg">
                    {unlocked ? 'Candidati' : `Si sblocca a ${unlockLabel}`}
                  </span>
                </span>
              </li>
            </ol>
          )}

          {header}

          <div className="overflow-hidden rounded-2xl border-2 border-sky shadow-[0_0_60px_-10px_rgba(59,155,255,0.45)]">
            <VslPlayer
              src={src}
              embedUrl={embedUrl}
              poster={poster}
              unlockAfterSeconds={unlockAfterSeconds}
              alreadyUnlocked={unlocked}
              progressKey={`ag_watched_${funnel}`}
              onProgress={report}
            />
          </div>

          {!unlocked && (
            <div className="flex items-start gap-4 rounded-2xl border-2 border-dashed border-white/30 p-5 md:p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Lock aria-hidden="true" className="size-5" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <p className="text-lg font-extrabold leading-snug md:text-xl">
                  Il passo successivo si apre al minuto {unlockLabel}
                </p>
                <p className="text-base leading-relaxed text-white/85 md:text-[17px]">{lockedText}</p>
                <div className="flex items-center gap-3">
                  <div
                    role="progressbar"
                    aria-label="Minuti guardati"
                    aria-valuemin={0}
                    aria-valuemax={unlockAfterSeconds}
                    aria-valuenow={Math.floor(watched)}
                    className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/15"
                  >
                    <div className="h-full rounded-full bg-sky transition-[width] duration-500" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="shrink-0 text-sm font-bold tabular-nums text-white/85">
                    {formatTime(watched)} di {unlockLabel}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {unlocked && (
        <div ref={revealRef} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      )}
    </>
  )
}
