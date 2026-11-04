export const UNLOCK_CTA_LABEL = 'Candidati al Piano Secondo Stipendio'
export const UNLOCK_CTA_NOTE = 'Chiamata gratuita: 2 minuti di domande, poi ti chiama un consulente'

export type FeaturedStory = {
  name: string
  role: string
  before: string
  after: string
  quote: string
}

export const FEATURED_STORIES: FeaturedStory[] = [
  {
    name: 'Francesco Grillo',
    role: 'Tornitore e fresatore in fabbrica, 9-10 ore al giorno',
    before: 'Poco tempo per la famiglia, paura di buttare i soldi',
    after: '500-600 € di vendite il primo giorno di test (13 ordini)',
    quote: 'Mentre lavoro, ho avuto la vendita, mentre lavoro, cioè, è stato incredibile.',
  },
  {
    name: 'Yann Bezushko',
    role: 'Autista e corriere, 50 anni',
    before: '6 anni con altre agenzie: 17 vendite in quasi 2 anni',
    after: '2.240 € di vendite in 7 giorni (42 ordini)',
    quote: 'In sei anni è la prima volta che arrivo a un passo successivo… sono da due mesi.',
  },
  {
    name: 'Jonathan Foscoli',
    role: 'Operaio, da quando ha finito la scuola',
    before: '1.300-1.500 € al mese, nessuna fiducia in sé',
    after: '300-400 € al giorno di vendite in meno di un mese',
    quote: 'Stiamo viaggiando su quei tre quattrocento euro diciamo al giorno mediamente.',
  },
]

export type MoreStory = {
  name: string
  role: string
  result: string
  quote: string
}

export const MORE_STORIES: MoreStory[] = [
  {
    name: 'Manuel Furlan',
    role: 'Operaio metalmeccanico, 9 ore al giorno',
    result: '14.000 € di vendite in 3 mesi',
    quote: 'A 31 anni chiedo il permesso per fare le mie cose, sinceramente sarei anche stanco.',
  },
  {
    name: 'Fabiano Miele',
    role: 'Impiegato in banca',
    result: '12 ordini nelle prime 30 ore',
    quote: 'In banca il mio valore della vita si annulla.',
  },
  {
    name: 'Antonio Vitelli',
    role: 'Manutentore a turni in una multinazionale',
    result: 'Circa 3.000 € di vendite (102 ordini)',
    quote: 'Nel momento in cui ti guardano negli occhi e ti mostrano i loro sogni…',
  },
  {
    name: 'Angelo Gatti',
    role: 'Venditore nella grande distribuzione',
    result: '3.000 € di vendite in 8 giorni (50 ordini)',
    quote: 'Gli direi non avere dubbi, fallo subito.',
  },
  {
    name: 'Pietro Lanzo',
    role: "Responsabile officina in un'azienda metalmeccanica",
    result: '1.700 € di vendite in 24 ore',
    quote: 'Ho scoperto che comunque il blocco non era dentro di me.',
  },
  {
    name: 'Michele Morri',
    role: 'Grafico dipendente',
    result: '600 € di vendite al giorno',
    quote: 'Fallo se hai voglia di cambiare veramente le cose.',
  },
]

export const SQUEEZE_BULLETS = [
  'Il lavoro serale da 90 minuti che non è trading, non sono crypto e non è network marketing',
  'Perché lo fai già anche tu, quasi ogni settimana, dal divano: solo che stai dalla parte sbagliata',
  'Cosa è successo il 16 maggio 2021, quando il telefono ha vibrato ogni 30 secondi per due ore',
  'Perché chi entra viene seguito fino al profitto',
]
