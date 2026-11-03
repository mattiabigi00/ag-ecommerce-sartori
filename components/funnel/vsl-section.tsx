'use client'

import { useEffect, useRef } from 'react'
import { VSL_UNLOCK_SECONDS, type FunnelId } from '@/lib/funnels'
import { useUnlock } from './use-unlock'
import { VslPlayer } from './vsl-player'

type Props = {
  funnel: FunnelId
  src?: string
  embedUrl?: string
  poster?: string
  /** Default 8 minuti. */
  unlockAfterSeconds?: number
  /** Contenuto che appare quando il tempo e' raggiunto (CTA, form info, candidatura...). */
  children: React.ReactNode
}

export function VslSection({
  funnel,
  src,
  embedUrl,
  poster,
  unlockAfterSeconds = VSL_UNLOCK_SECONDS,
  children,
}: Props) {
  const { unlocked, report } = useUnlock({
    storageKey: `ag_unlocked_${funnel}`,
    unlockAfterSeconds,
  })
  const revealRef = useRef<HTMLDivElement>(null)
  const wasLockedRef = useRef(true)

  useEffect(() => {
    // Scorre alla sezione solo se lo sblocco avviene mentre si guarda, non al ricaricamento.
    if (unlocked && !wasLockedRef.current) {
      revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [unlocked])

  useEffect(() => {
    const timer = setTimeout(() => {
      wasLockedRef.current = false
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-10">
      <VslPlayer
        src={src}
        embedUrl={embedUrl}
        poster={poster}
        unlockAfterSeconds={unlockAfterSeconds}
        alreadyUnlocked={unlocked}
        onProgress={report}
      />
      {unlocked && (
        <div
          ref={revealRef}
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          {children}
        </div>
      )}
    </div>
  )
}
