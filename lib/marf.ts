import { APPLICATION_QUESTIONS } from '@/lib/application-questions'
import type { FunnelId } from '@/lib/funnels'

const MARF_URL = 'https://app.scalers-os.com/api/public/survey/ag-academy/submit'

export const MARF_FORMS = {
  optin: '6aeef95da283777098fc09df',
  survey: {
    'funnel-1': '6aeef959a283777098fc0882',
    'funnel-2': '6aeef95aa283777098fc0910',
    'funnel-3': '6aeef95ba283777098fc0978',
  },
} as const satisfies { optin: string; survey: Record<FunnelId, string> }

/**
 * Valori che MARF si aspetta per ogni risposta, nello stesso ordine delle opzioni in
 * `APPLICATION_QUESTIONS`. Se cambi o riordini le opzioni, aggiorna anche questa tabella.
 */
const MARF_ANSWER_VALUES: Record<string, string[]> = {
  goal: [
    'serenita_economica_famiglia',
    'non_dipendere_da_uno_stipendio',
    'mettere_da_parte_ogni_mese',
    'costruire_qualcosa_mio',
    'guadagnare_di_piu',
  ],
  age: ['fino_29', '30_40', '41_52', '53_plus'],
  time: ['mezzora_al_giorno', 'un_ora_la_sera', 'solo_weekend', 'di_piu_sul_serio'],
  blocker: ['non_so_da_dove_cominciare', 'non_ho_tempo', 'paura_di_perdere_soldi', 'gia_provato', 'troppo_tardi'],
  worry: [
    'stesso_punto_tra_dieci_anni',
    'imprevisto_salute_lavoro',
    'pensione_non_basti',
    'non_poter_dare_ai_miei_cari',
  ],
}

/** Converte le risposte (etichette mostrate all'utente) nei valori attesi da MARF. */
export function toMarfAnswers(answers: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {}
  for (const question of APPLICATION_QUESTIONS) {
    const label = answers[question.id]
    if (!label) continue
    const value = MARF_ANSWER_VALUES[question.id]?.[question.options.indexOf(label)]
    if (value) result[question.id] = value
  }
  return result
}

/** "Mario De Rossi" -> nome "Mario", cognome "De Rossi". Cognome vuoto se manca. */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const [firstName = '', ...rest] = fullName.trim().split(/\s+/)
  return { firstName, lastName: rest.join(' ') }
}

type MarfInput = {
  surveyDefinitionId: string
  fullName: string
  email: string
  phone: string
  answers?: Record<string, string>
  tracking?: Record<string, string>
  /** Istante (ms) in cui l'utente ha aperto la pagina: MARF scarta gli invii entro 3 secondi. */
  formStart: number
}

export type MarfResult =
  | { ok: true }
  /** `invalid`: MARF ha rifiutato i dati (4xx). Altrimenti problema temporaneo di rete o del servizio. */
  | { ok: false; invalid: boolean }

export async function submitToMarf(input: MarfInput): Promise<MarfResult> {
  const { firstName, lastName } = splitName(input.fullName)
  const tracking = input.tracking ?? {}

  try {
    const response = await fetch(MARF_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surveyDefinitionId: input.surveyDefinitionId,
        basicInfo: { firstName, lastName, email: input.email, phone: input.phone },
        consents: { privacy: true, marketing: false },
        ...(input.answers ? { answers: toMarfAnswers(input.answers) } : {}),
        utm: {
          source: tracking.utm_source ?? '',
          medium: tracking.utm_medium ?? '',
          campaign: tracking.utm_campaign ?? '',
        },
        _form_start: input.formStart,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (response.ok) return { ok: true }

    console.error('[marf] invio rifiutato', response.status, await response.text().catch(() => ''))
    return { ok: false, invalid: response.status >= 400 && response.status < 500 }
  } catch (error) {
    console.error('[marf] invio non riuscito', error)
    return { ok: false, invalid: false }
  }
}
