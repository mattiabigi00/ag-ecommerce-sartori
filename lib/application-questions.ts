export type ApplicationQuestion = {
  id: string
  label: string
  options: string[]
}

export const APPLICATION_QUESTIONS: ApplicationQuestion[] = [
  {
    id: 'goal',
    label: "Quest'anno, cosa vuoi più di tutto?",
    options: [
      'Più serenità economica per la mia famiglia',
      'Non dipendere da un solo stipendio',
      'Riuscire a mettere da parte qualcosa ogni mese',
      'Costruire qualcosa che sia mio',
      'Guadagnare di più per vivere meglio',
    ],
  },
  {
    id: 'age',
    label: 'Quanti anni hai?',
    options: ['Fino a 29', '30-40', '41-52', '53 o più'],
  },
  {
    id: 'time',
    label: 'Quanto tempo puoi dedicarci ogni settimana?',
    options: ['Una mezz’ora al giorno, quando capita', 'Un’ora la sera', 'Solo nel weekend', 'Di più: voglio farlo sul serio'],
  },
  {
    id: 'blocker',
    label: 'Cosa ti ha fermato finora?',
    options: [
      'Non so da dove cominciare',
      'Non ho tempo: lavoro e famiglia mi assorbono',
      'Ho paura di perdere soldi',
      'Ho già provato e non ha funzionato',
      'Penso sia troppo tardi per me',
    ],
  },
  {
    id: 'worry',
    label: 'Quale di queste cose ti preoccupa di più?',
    options: [
      'Che tra dieci anni sarò nello stesso punto di oggi',
      'Che un imprevisto di salute o lavoro mi metta in difficoltà',
      'Che la pensione non basti',
      'Di non poter dare alle persone che amo ciò che vorrei',
    ],
  },
]

/** Messaggio mostrato dopo la domanda "Cosa ti ha fermato finora?", personalizzato sulla risposta. */
export const BLOCKER_CONFIRMATIONS: Record<string, string> = {
  'Non so da dove cominciare': 'Perfetto: parti senza cattive abitudini da correggere.',
  'Non ho tempo: lavoro e famiglia mi assorbono': 'Non serve più tempo, serve usarlo meglio. Ti mostro come.',
  'Ho paura di perdere soldi': 'Hai ragione a essere prudente: partiremo da un percorso a rischio contenuto.',
  'Ho già provato e non ha funzionato': 'Quasi sempre è mancato il metodo, non la volontà.',
  'Penso sia troppo tardi per me': 'Non lo è: per chi parte adesso ci sono esempi a ogni età.',
}

/** Risposte riportate nel resoconto finale, prima del modulo di contatto. */
export const RECAP_ITEMS = [
  { id: 'goal', label: 'Quello che vuoi' },
  { id: 'time', label: 'Il tempo che puoi dedicarci' },
  { id: 'blocker', label: 'Cosa ti ha fermato finora' },
] as const

/**
 * Schermata con un dato, mostrata prima dell'ultima domanda. Inserisci una statistica reale e verificabile
 * sul tuo mercato, con la fonte. Finché è `null` la schermata viene saltata.
 */
export const MARKET_STAT: { figure: string; text: string; source: string; sourceUrl?: string } | null = null
