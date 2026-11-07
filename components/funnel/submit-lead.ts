import type { FunnelId } from '@/lib/funnels'

/** Istante di apertura della pagina: MARF scarta gli invii arrivati entro 3 secondi. */
const pageLoadedAt = typeof window === 'undefined' ? 0 : Date.now()

export type LeadPayload = {
  funnel: FunnelId
  step: string
  name: string
  email: string
  phone: string
  website: string
  consent: boolean
  answers: Record<string, string>
  tracking: Record<string, string>
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        name: payload.name || undefined,
        website: payload.website || undefined,
        formStart: pageLoadedAt,
      }),
    })
    if (!response.ok) {
      return { ok: false, error: 'Controlla i dati inseriti e riprova.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Connessione non riuscita. Riprova tra un istante.' }
  }
}

/** Aggiunge le risposte del sondaggio al lead già creato nella squeeze page (funnel 2). */
export async function submitSurveyAnswers(
  answers: Record<string, string>,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch('/api/leads/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, formStart: pageLoadedAt }),
    })
    if (!response.ok) {
      return { ok: false, error: 'Non siamo riusciti a salvare le risposte. Riprova tra un istante.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Connessione non riuscita. Riprova tra un istante.' }
  }
}
