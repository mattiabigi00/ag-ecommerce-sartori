export const GUARANTEE_SHORT =
  'Segui il metodo e il mio team ti segue passo passo finché non incassi i tuoi primi 4.000 euro.'

export const CTA_LABEL = 'Voglio costruire il mio secondo stipendio'
export const CTA_DECLINE = 'No, non voglio uno stipendio in più ogni mese'

export const CTA_STEPS = [
  { title: '1 · Rispondi', text: 'a qualche domanda, ci vogliono 2 minuti' },
  { title: '2 · Ti chiamiamo', text: 'se il profilo è in linea, un consulente entro 24 ore' },
  { title: '3 · Il tuo piano', text: 'sere, budget e primo passo, costi compresi' },
]

export const COUNTERS = [
  { value: '+5 milioni €', label: 'di incassi online' },
  { value: '+300', label: 'persone seguite nel percorso' },
  { value: 'Best seller', label: 'su Amazon con il libro di Alex' },
  { value: '+40', label: 'persone tra gli uffici di Roma e il magazzino di Firenze' },
]

export type Story = {
  name: string
  role: string
  title: string
  quote: string
  result: string
  image?: string
}

export const STORIES: Story[] = [
  {
    name: 'Giacomo e Cristina Tassi',
    role: 'sposati, due figli',
    title: 'Siamo partiti proprio da zero!',
    quote:
      'Assolutamente, partiti totalmente da zero. Però ci abbiamo creduto e non ci siamo mai fermati, ed è lì che fa la differenza.',
    result: "€15'000 al mese",
    image: '/images/landing/avatar-tassi.webp',
  },
  {
    name: 'Alessandro Fichera',
    role: 'carrozziere, 3 figli maschi',
    title: 'Non pensavo fosse possibile!',
    quote:
      'Ho lanciato 3 store all\'inizio, senza grandi risultati, ma col quarto... è cambiato tutto. Ora sono sui €6000 netti al mese!',
    result: '€6000 netti al mese',
    image: '/images/landing/avatar-fichera.webp',
  },
  {
    name: 'Michele, Ugo e Salvatore Tripodi',
    role: 'studenti',
    title: 'Oggi €500 in metà giornata!',
    quote:
      'Ieri €400 di incassi, oggi già €500 e siamo a metà giornata! E da qui, lo sappiamo bene, si può solo migliorare...',
    result: "€15'000 al mese",
    image: '/images/landing/avatar-tripodi.webp',
  },
  {
    name: 'Giovanni Pastori',
    role: 'salumiere, sposato e con una figlia',
    title: "Me lo sentivo che ce l'avrei fatta",
    quote:
      'Non voglio diventare ricco, voglio essere libero. Lavorare dove e quando voglio. Grazie a questo percorso, lo sto facendo.',
    result: '€1200 al giorno',
    image: '/images/landing/avatar-pastori.webp',
  },
]

export const METHOD_STEPS = [
  {
    title: 'Il prodotto.',
    text: 'Non lo inventi: lo scegli tra quelli che stanno già vendendo, e il tuo coach lo valida con te prima che tu ci metta un euro.',
  },
  {
    title: 'Il negozio.',
    text: 'Non lo costruisci da zero: parti da un negozio già pronto, fatto dai nostri grafici, e i testi li scrivi con il nostro Protocollo di Vendita Emotiva.',
  },
  {
    title: 'Le persone.',
    text: 'Lo fai conoscere con la pubblicità sui social, partendo con 20 € al giorno di pubblicità. E quando il prodotto inizia a vendere, non aspetti settimane che arrivi dalla Cina. Lo spedisci dal nostro magazzino di Firenze e il tuo cliente lo riceve in 24 ore.',
  },
]

export type VideoResult = {
  title: string
  quote: string
  name: string
  role: string
  result: string
  wistiaId: string
  thumbnail: string
  avatar?: string
}

export const VIDEO_RESULTS: VideoResult[] = [
  {
    title: 'Oggi €500 in metà giornata!',
    quote:
      'Ieri €400 di incassi, oggi già €500 e siamo a metà giornata! In più abbiamo ancora il limite sulle pubblicità, quindi da qui si può solo migliorare...',
    name: 'Michele, Ugo e Salvatore Tripodi',
    role: 'studenti',
    result: "€15'000 al mese",
    wistiaId: 'fvg1folj0c',
    thumbnail: '/images/landing/video-tripodi.webp',
    avatar: '/images/landing/avatar-tripodi.webp',
  },
  {
    title: 'Me lo sentivo: dovevo farcela. E così è stato.',
    quote:
      'Io non volevo diventare ricco, io volevo essere libero. Lavorare dove voglio, quando voglio. E con questo percorso sto iniziando a farlo.',
    name: 'Giovanni Pastori',
    role: 'salumiere, sposato e con una figlia',
    result: '€1200 al giorno',
    wistiaId: '0dkkx7sqwa',
    thumbnail: '/images/landing/video-pastori.webp',
    avatar: '/images/landing/avatar-pastori.webp',
  },
  {
    title: 'Siamo partiti TOTALMENTE da zero!',
    quote:
      "Assolutamente, totalmente da zero. Non avevamo fatto niente di simile all'e-commerce. Però ci abbiamo creduto e non ci siamo mai fermati, ed è lì che fa la differenza.",
    name: 'Giacomo e Cristina Tassi',
    role: 'sposati con due figli, dipendenti',
    result: "€15'000 al mese",
    wistiaId: 'j67n1u9d6a',
    thumbnail: '/images/landing/video-tassi.webp',
    avatar: '/images/landing/avatar-tassi.webp',
  },
  {
    title: "L'e-commerce ha cambiato tutto",
    quote:
      "Quando fai un negozio devi sperare che qualcuno entri. Con l'e-commerce puoi far entrare migliaia di persone ogni giorno. È lì che cambia tutto.",
    name: 'Daniele Garofano',
    role: 'commerciale e papà di una bimba',
    result: '€250 al giorno',
    wistiaId: 'o7h95p9d5n',
    thumbnail: '/images/landing/video-garofano.webp',
  },
  {
    title: 'Non immaginavo fosse davvero possibile!',
    quote:
      "Ho lanciato 3 store all'inizio, senza grandi risultati, ma col quarto... col quarto è cambiato tutto. Ora sono sui €6000 netti al mese. Netti!",
    name: 'Alessandro Fichera',
    role: 'carrozziere, 3 figli maschi',
    result: '€6000 al mese',
    wistiaId: 'i9i0shw1ml',
    thumbnail: '/images/landing/video-fichera.webp',
    avatar: '/images/landing/avatar-fichera.webp',
  },
  {
    title: 'Questa è una vera professione alto pagata!',
    quote:
      'Fallo se vuoi cambiare veramente e rimescolare le carte in tavola. Se resti dove sei, non cambia nulla. Qui impari una vera professione.',
    name: 'Michele Morri',
    role: 'grafico, papà di due bimbe',
    result: '€500 al giorno',
    wistiaId: 'vb5p40l3cs',
    thumbnail: '/images/landing/video-morri.webp',
  },
  {
    title: "Farò un milione quest'anno!",
    quote:
      'Avevo solo bisogno di un\'altra entrata. Ora ho fatturato 150.000€ grazie a voi. Mi avete fatto sentire capace. Mai stupida. E questo vale più di tutto.',
    name: 'Anna Rita',
    role: 'imprenditrice, una figlia',
    result: '€150\'000 di vendite in pochi mesi',
    wistiaId: '6pxkwbtrin',
    thumbnail: '/images/landing/video-annarita.webp',
  },
  {
    title: "Sono un ignorante, ma ce l'ho fatta!",
    quote:
      "Sono un metalmeccanico ignorante... ma ce l'ho fatta! Ho pubblicato l'annuncio, due ore... PRIMA VENDITA. P***ana la miseria!",
    name: 'Andrea Marzocchi',
    role: 'operaio',
    result: '€2000 netti al mese',
    wistiaId: 'fukxu4swpe',
    thumbnail: '/images/landing/video-marzocchi.webp',
  },
]

export const RATINGS = [
  { score: '4,3', source: 'Trustpilot', count: 389 },
  { score: '4,8', source: 'Google', count: 137 },
]

export type Review = {
  name: string
  source: 'Trustpilot' | 'Google'
  date: string
  title?: string
  body: string
}

export const REVIEWS: Review[] = [
  {
    name: 'Elena Luppi',
    source: 'Trustpilot',
    date: '16 ott 2026',
    title: 'Un\'esperienza fantastica: store creati passo dopo passo e supporto costante',
    body: 'La mia esperienza con Alex Grassi e il suo team è semplicemente fantastica. Ho trovato la massima serietà, professionalità e competenza. Il supporto è qualcosa di eccezionale: le classi con i coach sono aperte continuativamente dalle 9:00 del mattino fino alle 21:00 di sera, e spesso rispondono e ti aiutano volentieri anche dopo le 21:00 se hai bisogno.',
  },
  {
    name: "Simone D'Auria",
    source: 'Trustpilot',
    date: '6 lug 2026',
    title: 'Avevo iniziato il percorso più di 18…',
    body: 'Avevo iniziato il percorso più di 18 mesi fa ma, per ragioni personali, mi ero letteralmente perso per strada. Poi un giorno una telefonata da AG Academy, avevano capito che non stavo più proseguendo con il mio cammino e mi hanno sostenuto per riprendere la mia esperienza e la mia crescita personale e professionale.',
  },
  {
    name: 'samantha fedeli',
    source: 'Google',
    date: '3 settimane fa',
    body: "Frequento l' Ag Academy da circa 6 mesi. Team e coach molto preparati e disponibili, sempre presenti con classi attive dalle 9 alle 21. Si scopre un mondo in continua evoluzione ed è importante avere delle persone a cui rivolgersi e di cui fidarsi con esperienza in questo settore. Esperienza super positiva!",
  },
  {
    name: 'Francesco Di Fulvio',
    source: 'Trustpilot',
    date: '4 set 2026',
    title: 'Sono nel percorso di Alex Grassi da…',
    body: 'Sono nel percorso di Alex Grassi da circa due mesi e fino ad oggi la mia esperienza è davvero molto positiva. Sono ancora all\'inizio e ho sicuramente tanto da imparare e mettere in pratica, ma mi sto trovando benissimo. Una delle cose che sto apprezzando maggiormente del percorso è proprio il fatto di sentirmi seguito e di avere un punto di riferimento quando ne ho bisogno.',
  },
  {
    name: 'Giuseppe Celauro',
    source: 'Trustpilot',
    date: '3 set 2026',
    title: 'Grande azienda italiana!',
    body: 'Grande azienda italiana!! E si AG Academy è un azienda italiana di tutto rispetto, incominciando da Alex , e dal personale Coach, sempre presenti e ben disponili ad aiutarti a raggiungere i tuoi obbiettivi.',
  },
  {
    name: 'flavio scardella',
    source: 'Google',
    date: '2 mesi fa',
    body: "Sono davvero soddisfatto di aver iniziato questo percorso. Una delle cose che mi ha colpito maggiormente è la disponibilità delle persone che lavorano all’interno dell’accademia: quando hai un dubbio o non sai come affrontare una determinata situazione, trovi sempre qualcuno pronto ad aiutarti e a spiegarti come muoverti.",
  },
  {
    name: 'Valentino Fanucci',
    source: 'Trustpilot',
    date: '3 set 2026',
    title: 'Provate anche voi',
    body: "Ho scoperto AG Accademy tramite i social e ascoltando le loro parole mi sono incuriosito e ho voluto provare. Ormai sono già alcuni mesi che seguo le loro lezioni e devo dire che mi trovo molto bene, ho trovato tutor molto preparati e sempre disponibili a aiutarmi e consigliarmi in questo mio nuovo percorso nell'ecommerce.",
  },
  {
    name: 'Vincenzo Abruscato',
    source: 'Trustpilot',
    date: '1 set 2026',
    title: 'Fin dall’inizio si percepisce che è…',
    body: 'Fin dall’inizio si percepisce che è stato preparato con attenzione e soprattutto con la voglia di trasmettere qualcosa di concreto. Le spiegazioni sono chiare, il ritmo è piacevole e anche gli argomenti che inizialmente possono sembrare un po’ complicati vengono affrontati in maniera semplice e comprensibile. lo consiglio vivamente!',
  },
  {
    name: 'Marzia Montu`',
    source: 'Google',
    date: '7 mesi fa',
    body: 'Con la recente aggiunta delle classi formative, questo corso è diventato ancora di più facile comprensione, si è costantemente seguiti dai coach e questo porta ad un migliore e veloce apprendimento del mondo dell’e-commerce. Alex e tutto il suo team sono persone estremamente professionali e di grande umanità. Super consigliato!!!',
  },
  {
    name: 'Gabriele Catarinacci',
    source: 'Trustpilot',
    date: '6 lug 2026',
    title: 'Sono assistito da persone fantastiche',
    body: 'Sono assistito da persone fantastiche, risolvono ogni problema che può capitare nel corso dello studio. Con il loro aiuto è praticamente impossibile non riuscire. Grazie',
  },
  {
    name: 'Giuseppe Tuzzeo',
    source: 'Trustpilot',
    date: '6 lug 2026',
    title: 'Eccellente ♥️',
    body: 'Penso che non ci sia accademia migliore in Italia al momento come serietà professionalità e sopratutto volontà di aiutare a chi vuole iniziare questo percorso a cambiare la propio vita .',
  },
  {
    name: 'Giuseppe Celauro',
    source: 'Google',
    date: '2 mesi fa',
    body: 'Ho incominciato  da poco più di 1 mese questo percorso, Alex e il suo staff della AG ACADEMY oltre a essere preparati sono sempre pronti ad aiutarti e portarti verso il successo del tuo obbiettivo.',
  },
  {
    name: 'Desirèe',
    source: 'Trustpilot',
    date: '8 ott 2026',
    title: 'La mia esperienza con il team di Alex…',
    body: 'La mia esperienza con il team di Alex Grassi è davvero molto positiva,Silvia la mia coach è davvero speciale,ma anche tutti gli altri,l unico rimpianto… non aver iniziato prima.❤️',
  },
]

export const PROGRAM_ITEMS = [
  { title: 'Il tuo coach personale', text: 'Ti segue passo passo, dalla scelta del prodotto alla prima vendita e oltre.' },
  { title: 'La formazione completa', text: 'Registrata, la guardi quando hai tempo, con accesso per sempre.' },
  { title: 'Negozi già pronti', text: 'Fatti dai nostri grafici: li personalizzi invece di perdere settimane a costruirli.' },
  { title: 'Protocollo di Vendita Emotiva', text: 'I testi che usiamo noi per presentare i prodotti, da adattare al tuo.' },
  {
    title: 'Magazzino e logistica in Italia',
    text: 'Quando il tuo prodotto vende, lo spedisci dal nostro magazzino di Firenze e arriva in 24 ore.',
  },
  { title: 'Le live del lunedì sera', text: 'Con Alex: e-commerce, ma anche soldi, tasse e mentalità.' },
  { title: 'Il gruppo con il tuo coach', text: 'Coach, consulente e team di Alex a portata di messaggio.' },
]

export const CALL_OUTCOMES = [
  { title: 'Le tue sere', text: 'Quante sere a settimana ti servono davvero, e come incastrarle con i tuoi turni e la famiglia.' },
  {
    title: 'Il tuo budget di partenza',
    text: 'Quanto mettere in pubblicità per il primo test, e se ha senso partire adesso o tra qualche mese.',
  },
  {
    title: 'Il tuo primo passo',
    text: 'Da che tipo di prodotto partiresti, come ti seguirebbe il coach e quanto costa il percorso. Se non fa per te, te lo diciamo noi.',
  },
]

export const APPLY_IF = [
  "hai già un lavoro e vuoi un'entrata che non dipenda dal tuo capo",
  'puoi dedicarci del tempo ogni sera, dopo il lavoro',
  'puoi investire nel percorso e in un primo budget per la pubblicità senza toccare i soldi della spesa',
]

export const DONT_APPLY_IF = [
  'cerchi soldi facili o veloci',
  'vuoi solo "dare un\'occhiata": i consulenti chiamano chi vuole partire',
  'quei soldi ti servono per arrivare a fine mese',
]
