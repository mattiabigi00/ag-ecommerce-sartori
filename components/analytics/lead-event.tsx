'use client'

import { useEffect } from 'react'
import { GOOGLE_CONVERSIONS, trackEvent, trackGoogleConversion } from '@/lib/tracking'

const MAX_WAIT_MS = 6000

/** Fa scattare Lead (Google Ads subito, Meta appena il pixel e' pronto) una sola volta per pagina e sessione, appena il pixel e' pronto. */
export function LeadEvent() {
  useEffect(() => {
    const googleKey = `ag_gads_lead_fired:${window.location.pathname}`
    if (!sessionStorage.getItem(googleKey)) {
      sessionStorage.setItem(googleKey, '1')
      trackGoogleConversion(GOOGLE_CONVERSIONS.lead)
    }

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
