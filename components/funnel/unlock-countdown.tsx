import { CircleArrowDown } from 'lucide-react'

type Props = {
  /** Secondi ancora da guardare prima dello sblocco. */
  remainingSeconds: number
  className?: string
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#2356b0] to-[#1e4488] px-3 pb-2 pt-3 text-white">
      <span className="text-[clamp(2.75rem,12vw,4.5rem)] font-black leading-[0.95] tabular-nums">{value}</span>
      <span className="text-[clamp(0.95rem,3.6vw,1.375rem)] font-black uppercase leading-none tracking-tight">
        {label}
      </span>
    </div>
  )
}

export function UnlockCountdown({ remainingSeconds, className }: Props) {
  const safe = Math.max(0, Math.ceil(remainingSeconds))
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60

  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-2xl bg-[#f3f3f5] px-5 py-8 shadow-xl md:gap-8 md:px-10 md:py-10 ${className ?? ''}`}
    >
      <p className="flex items-center justify-center gap-2.5 text-center text-base font-bold leading-snug text-[#14306b] md:text-xl">
        <CircleArrowDown aria-hidden="true" className="size-5 shrink-0 fill-[#14306b] text-[#f3f3f5] md:size-6" />
        <span>LA FASE 2 si sbloccherà quando il timer raggiungerà lo zero</span>
      </p>
      <div
        role="timer"
        aria-live="off"
        aria-label={`Mancano ${minutes} minuti e ${seconds} secondi allo sblocco`}
        className="flex w-full max-w-2xl gap-4 md:gap-6"
      >
        <Unit value={minutes} label={minutes === 1 ? 'Minuto' : 'Minuti'} />
        <Unit value={seconds} label={seconds === 1 ? 'Secondo' : 'Secondi'} />
      </div>
    </div>
  )
}
