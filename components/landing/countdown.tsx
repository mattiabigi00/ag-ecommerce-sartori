'use client'

import { useEffect, useState } from 'react'

type Parts = { d: string; h: string; m: string; s: string }

/** Chiusura candidature: domenica alle 23:59:59 della settimana corrente. */
function remaining(): Parts {
  const now = new Date()
  const end = new Date(now)
  end.setDate(now.getDate() + ((7 - now.getDay()) % 7))
  end.setHours(23, 59, 59, 999)

  let diff = Math.max(0, end.getTime() - now.getTime())
  const pad = (value: number) => String(value).padStart(2, '0')
  const d = Math.floor(diff / 86_400_000)
  diff -= d * 86_400_000
  const h = Math.floor(diff / 3_600_000)
  diff -= h * 3_600_000
  const m = Math.floor(diff / 60_000)
  diff -= m * 60_000
  const s = Math.floor(diff / 1000)
  return { d: String(d), h: pad(h), m: pad(m), s: pad(s) }
}

export function Countdown() {
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    setParts(remaining())
    const timer = setInterval(() => setParts(remaining()), 1000)
    return () => clearInterval(timer)
  }, [])

  const cells: { value: string; label: string }[] = [
    { value: parts?.d ?? '--', label: 'giorni' },
    { value: parts?.h ?? '--', label: 'ore' },
    { value: parts?.m ?? '--', label: 'min' },
    { value: parts?.s ?? '--', label: 'sec' },
  ]

  return (
    <div role="timer" aria-label="Tempo alla chiusura delle candidature" className="flex gap-2">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex min-w-[58px] flex-col items-center rounded-lg bg-white/10 px-2 py-1.5 leading-none"
        >
          <span className="font-display text-2xl tabular-nums text-white">{cell.value}</span>
          <span className="mt-1 text-xs font-medium text-white/75">{cell.label}</span>
        </div>
      ))}
    </div>
  )
}
