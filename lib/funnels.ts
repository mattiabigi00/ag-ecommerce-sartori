/** Tempo di visione (in secondi) dopo il quale si sblocca la CTA sotto la VSL. */
export const VSL_UNLOCK_SECONDS = 8 * 60

export const FUNNELS = {
  'funnel-1': {
    id: 'funnel-1',
    label: 'Landing + VSL + candidatura',
    path: '/funnel-1',
  },
  'funnel-2': {
    id: 'funnel-2',
    label: 'Gated VSL (squeeze + VSL)',
    path: '/funnel-2',
    videoPath: '/funnel-2/video',
  },
  'funnel-3': {
    id: 'funnel-3',
    label: 'Ungated VSL',
    path: '/funnel-3',
  },
} as const

export type FunnelId = keyof typeof FUNNELS

export const FUNNEL_IDS = Object.keys(FUNNELS) as [FunnelId, ...FunnelId[]]

/** Cookie impostato dopo l'iscrizione alla squeeze page: permette di vedere la VSL del funnel 2. */
export const GATE_COOKIE = 'ag_gate_funnel2'

/**
 * Sorgenti video. Imposta l'URL del file (mp4 / Vercel Blob) oppure l'embed (Vimeo, YouTube, Wistia).
 * Con il file mp4 lo sblocco si basa sul tempo di riproduzione reale; con l'embed sul tempo
 * trascorso sulla pagina (scheda visibile).
 */
export const VSL_SOURCES: Record<FunnelId, { src?: string; embedUrl?: string; poster?: string }> = {
  'funnel-1': {},
  'funnel-2': {},
  'funnel-3': {},
}
