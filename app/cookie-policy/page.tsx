import type { Metadata } from 'next'
import { SiteFooter } from '@/components/landing/site-footer'

export const metadata: Metadata = {
  title: 'Informativa sui cookie | Ecommerce AG',
  description: 'Informativa sull’uso dei cookie e delle tecnologie simili su questo sito.',
}

const COOKIES = [
  {
    name: 'ag_cookie_notice',
    provider: 'Questo sito (prima parte)',
    purpose: 'Registra la scelta fatta nel banner dei cookie (accetta o rifiuta), così non ti viene riproposto.',
    duration: '180 giorni',
    type: 'Tecnico',
  },
  {
    name: '_fbp, _fbc',
    provider: 'Meta Platforms Ireland Ltd. (Meta Pixel)',
    purpose:
      'Misurano le visite e le azioni compiute sul sito (ad esempio l’invio della candidatura) per valutare e ottimizzare le campagne pubblicitarie su Facebook e Instagram.',
    duration: 'Fino a 90 giorni',
    type: 'Marketing',
  },
  {
    name: 'Cookie del lettore video',
    provider: 'Vimeo Inc.',
    purpose: 'Servono a riprodurre i video incorporati nelle pagine e a ricordarne le preferenze di riproduzione.',
    duration: 'Secondo la policy di Vimeo',
    type: 'Terza parte',
  },
]

const STORAGE = [
  {
    name: 'ag_unlocked_*, ag_watched_*',
    purpose: 'Salvano nel tuo browser lo stato di visione del video, per non farti ricominciare se ricarichi la pagina.',
    where: 'localStorage',
  },
  {
    name: 'Parametri di campagna (utm, click id)',
    purpose: 'Registrano da quale annuncio o link sei arrivato, per associare correttamente la candidatura alla campagna.',
    where: 'sessionStorage (si cancella alla chiusura della scheda)',
  },
]

export default function CookiePolicyPage() {
  return (
    <>
      <main className="bg-white px-5 py-12 text-[#0b1020] sm:py-16">
        <article className="mx-auto flex max-w-3xl flex-col gap-8 text-base leading-relaxed">
          <header className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2f7d32]">Informativa</p>
            <h1 className="font-display text-4xl uppercase leading-tight sm:text-5xl">Informativa sui cookie</h1>
            <p className="text-sm text-black/60">Ultimo aggiornamento: novembre 2026</p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl uppercase">Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti salvano sul dispositivo di chi li visita. Servono a far
              funzionare il sito, a ricordare alcune scelte e, in certi casi, a misurare l&apos;efficacia della
              pubblicità. Questa pagina descrive anche tecnologie simili, come localStorage e sessionStorage.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl uppercase">Titolare del trattamento</h2>
            <p>
              New Opportunities SRL, P.IVA e CF 03914971209, sede in Via Trasaghis 18e, 00188 Roma (RM). Per qualsiasi
              richiesta puoi scrivere a{' '}
              <a className="underline underline-offset-2" href="mailto:new.opportunities@pec.it">
                new.opportunities@pec.it
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-2xl uppercase">Cookie utilizzati</h2>
            <ul className="flex flex-col gap-3">
              {COOKIES.map((cookie) => (
                <li key={cookie.name} className="flex flex-col gap-1 rounded-xl border border-black/10 bg-[#f6f8fd] p-4">
                  <p className="font-bold">
                    {cookie.name} <span className="font-normal text-black/60">- {cookie.type}</span>
                  </p>
                  <p className="text-sm">{cookie.purpose}</p>
                  <p className="text-sm text-black/60">
                    {cookie.provider} - Durata: {cookie.duration}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-2xl uppercase">Archiviazione locale</h2>
            <ul className="flex flex-col gap-3">
              {STORAGE.map((item) => (
                <li key={item.name} className="flex flex-col gap-1 rounded-xl border border-black/10 bg-[#f6f8fd] p-4">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm">{item.purpose}</p>
                  <p className="text-sm text-black/60">{item.where}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl uppercase">Statistiche di utilizzo</h2>
            <p>
              Per misurare le visite in forma aggregata usiamo Vercel Analytics, che non utilizza cookie e non
              identifica i singoli visitatori.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl uppercase">Come gestire o disattivare i cookie</h2>
            <p>
              Puoi cancellare o bloccare i cookie dalle impostazioni del tuo browser (Chrome, Safari, Firefox, Edge): in
              questo caso alcune funzioni del sito potrebbero non funzionare correttamente. Per la pubblicità
              personalizzata di Meta puoi modificare le tue preferenze dalle{' '}
              <a
                className="underline underline-offset-2"
                href="https://www.facebook.com/adpreferences"
                target="_blank"
                rel="noopener noreferrer"
              >
                impostazioni annunci di Facebook
              </a>{' '}
              o da{' '}
              <a
                className="underline underline-offset-2"
                href="https://www.youronlinechoices.com/it/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Your Online Choices
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl uppercase">I tuoi diritti</h2>
            <p>
              Hai diritto di accedere ai tuoi dati, rettificarli, cancellarli, limitarne il trattamento e opporti ad
              esso, oltre a presentare reclamo al Garante per la protezione dei dati personali. Per maggiori dettagli
              consulta la{' '}
              <a
                className="underline underline-offset-2"
                href="https://alexgrassi.com/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
