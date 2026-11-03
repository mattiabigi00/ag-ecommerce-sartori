'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { trackCustomEvent } from '@/lib/tracking'

type Options = {
  /** Chiave univoca per funnel: lo sblocco resta salvato nel browser (ricarico = resta sbloccato). */
  storageKey: string
  unlockAfterSeconds: number
}

export function useUnlock({ storageKey, unlockAfterSeconds }: Options) {
  const [unlocked, setUnlocked] = useState(false)
  const [watched, setWatched] = useState(0)
  const unlockedRef = useRef(false)

  const unlock = useCallback(() => {
    if (unlockedRef.current) return
    unlockedRef.current = true
    setUnlocked(true)
    try {
      localStorage.setItem(storageKey, '1')
    } catch {}
    trackCustomEvent('VslUnlocked', { seconds: unlockAfterSeconds })
  }, [storageKey, unlockAfterSeconds])

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === '1') {
        unlockedRef.current = true
        setUnlocked(true)
      }
    } catch {}
  }, [storageKey])

  /** Comunica i secondi guardati finora; sblocca al raggiungimento della soglia. */
  const report = useCallback(
    (seconds: number) => {
      setWatched(seconds)
      if (seconds >= unlockAfterSeconds) unlock()
    },
    [unlock, unlockAfterSeconds],
  )

  return { unlocked, watched, report, unlock }
}
