export type ApplicationQuestion = {
  id: string
  label: string
  type: 'text' | 'choice'
  options?: string[]
  placeholder?: string
}

/** Domande della candidatura: segnaposto da sostituire con quelle definitive. */
export const APPLICATION_QUESTIONS: ApplicationQuestion[] = [
  {
    id: 'store_url',
    label: 'Qual e il sito del tuo ecommerce?',
    type: 'text',
    placeholder: 'https://',
  },
  {
    id: 'monthly_revenue',
    label: 'Quanto fatturi al mese oggi?',
    type: 'choice',
    options: ['Non ancora attivo', 'Fino a 10.000 euro', '10.000 - 50.000 euro', '50.000 - 150.000 euro', 'Oltre 150.000 euro'],
  },
  {
    id: 'ads_budget',
    label: 'Quanto investi al mese in advertising?',
    type: 'choice',
    options: ['Nulla', 'Fino a 2.000 euro', '2.000 - 10.000 euro', 'Oltre 10.000 euro'],
  },
  {
    id: 'goal',
    label: 'Qual e il tuo obiettivo principale nei prossimi 6 mesi?',
    type: 'text',
    placeholder: 'Descrivilo in poche righe',
  },
]
