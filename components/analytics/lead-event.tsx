'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/tracking'

const MAX_WAIT_MS = 6000

/** Fa scattare l'evento Lead di Meta una sola volta per pagina e sessione, appena il pixel e' pronto. */
export function LeadEvent() {
  useEffect(() => {
    const storageKey = `ag_lead_fired:${window.location.pathname}`
    if (sessionStorage.getItem(storageKey)) return

    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      if (window.fbq) {
        window.clearInterval(timer)
        sessionStorage.setItem(storageKey, '1')
        trackEvent('Lead')
      } else if (Date.now() - startedAt > MAX_WAIT_MS) {
        window.clearInterval(timer)
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [])

  return null
}
