const STORAGE_KEY = 'ag_tracking'
const TRACKED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
  'ttclid',
]

type TrackingData = Record<string, string>

/** Salva UTM e click id alla prima visita, cosi' restano disponibili nelle pagine successive. */
export function captureTracking() {
  if (typeof window === 'undefined') return

  const stored = readTracking()
  const params = new URLSearchParams(window.location.search)
  const next: TrackingData = { ...stored }

  for (const key of TRACKED_PARAMS) {
    const value = params.get(key)
    if (value) next[key] = value
  }
  if (!next.landing_page) next.landing_page = window.location.pathname
  if (!next.referrer && document.referrer) next.referrer = document.referrer

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function readTracking(): TrackingData {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as TrackingData
  } catch {
    return {}
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

/** Evento standard (Lead, SubmitApplication...) verso Meta Pixel e Google, se presenti. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.fbq?.('track', name, params)
  window.gtag?.('event', name, params)
}

export function trackCustomEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.fbq?.('trackCustom', name, params)
  window.gtag?.('event', name, params)
}
