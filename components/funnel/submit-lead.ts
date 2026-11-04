import type { FunnelId } from '@/lib/funnels'

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
