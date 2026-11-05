import Image from 'next/image'
import { METHOD_STEPS } from '@/lib/landing/funnel-1-content'
import { CtaBlock } from './cta-block'
import { SectionTitle } from './ui-bits'

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-extrabold text-black">{children}</strong>
}

function LetterImage({
  src,
  alt,
  width,
  height,
  className = '',
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 768px) 704px, 100vw"
      className={`mx-auto my-2 h-auto w-full rounded-2xl shadow-md ${className}`}
    />
  )
}

export function Letter() {
  return (
    <section id="lettera" aria-label="Lettera di Alex" className="scroll-mt-4 bg-neutral-50 px-5 py-16 md:py-24">
      <div className="mx-auto flex max-w-[44rem] flex-col gap-14">
        <h2 className="type-h1 text-center text-ink">
          Il giorno in cui ho capito che <span className="marker">il mio tempo non era mio</span>
        </h2>
        <div className="flex flex-col gap-6 text-[17px] font-medium leading-[1.7] text-ink md:text-lg md:leading-[1.7] [&_p]:text-pretty">
          <p className="border-l-4 border-sky pl-4 text-base leading-relaxed text-ink-soft md:text-lg">
            Dalla scrivania di Alex Grassi.
            <br />
            Bologna, ore 6:00 del mattino.
            <br />
            La moka gorgoglia, le bimbe dormono.
          </p>

          <p className="text-xl font-extrabold leading-snug text-black md:text-2xl">
            Se sei arrivato qui, probabilmente un lavoro ce l&apos;hai. Ma a fine mese lo stipendio è sempre
            quello.
          </p>
          <p>
            Intanto la spesa costa di più, le bollette costano di più, la rata è sempre lì. E quando arriva una
            spesa che non avevi previsto, la senti nello stomaco.
          </p>
          <p>
            Allora fai quello che ti hanno insegnato: uno straordinario, un turno in più, un sabato. Il sabato
            che era tuo, e della tua famiglia.
          </p>
          <p>
            <B>
              Ma ogni ora in più che dai all&apos;azienda la paghi tu, con il tuo tempo, e la incassa qualcun
              altro.
            </B>
          </p>
          <p>Lo so bene, perché per dieci anni ho vissuto esattamente così.</p>
          <p>
            Ero responsabile in un&apos;azienda metalmeccanica. Stipendio fisso, straordinari, sempre lo stesso
            posto. E la sera, stanco morto, provavo a costruirmi qualcosa: network marketing, trading, crypto,
            Amazon, self publishing. <B>Sette anni. Zero risultati.</B>
          </p>
          <p>
            Poi, a febbraio 2018, mia moglie Martina e nostra figlia Gioia, che aveva undici mesi, fanno un
            incidente in macchina. Gioia entra in coma.
          </p>
          <LetterImage
            src="/images/landing/letter-ospedale.webp"
            alt="Gioia, la figlia di Alex, in ospedale"
            width={900}
            height={1600}
            className="max-w-xs"
          />
          <p>Io non mi stacco un attimo da loro. Finché squilla il telefono. È il mio capo.</p>
          <blockquote className="rounded-xl bg-white p-5 text-xl font-bold italic leading-snug text-black shadow-sm md:text-2xl">
            &ldquo;Alex, mi dispiace chiedertelo, ma… quando pensi di rientrare?&rdquo;
          </blockquote>
          <p>
            <B>In quel corridoio ho capito che il mio tempo non era mio.</B> Bastava una telefonata per
            ricordarmelo.
          </p>
          <p>
            Grazie a Dio si sono riprese. E da quel giorno ho smesso di &ldquo;provare&rdquo; e ho cominciato a
            fare sul serio.
          </p>
          <p>
            Nel 2020 mi gioco l&apos;ultima carta: un negozio online con un solo prodotto.{' '}
            <B>La sera, dopo il lavoro.</B>
          </p>
          <p>
            Sei mesi, praticamente zero vendite. Volevo mollare. Poi ho capito una cosa:{' '}
            <B>non stavo sbagliando il modello, stavo sbagliando l&apos;ordine dei passaggi.</B> Ho cambiato
            quello.
          </p>
          <p>A marzo 2021 arrivano le prime vendite. Reinvesto tutto, ogni euro.</p>
          <p>
            Il 16 maggio 2021 sono con Martina a scegliere il catering del nostro matrimonio. Il telefono vibra
            ogni trenta secondi. Dopo due ore lei sbotta: &ldquo;Ma si può sapere chi ti scrive?&rdquo;
          </p>
          <p>
            Le giro lo schermo. <B>Da quando eravamo entrati avevo incassato più di 3.000 euro.</B> A fine
            giornata, per la prima volta, ho superato i 10.000 euro di vendite in un giorno.
          </p>
          <LetterImage
            src="/images/landing/letter-incassi.webp"
            alt="Il pannello vendite del negozio di Alex: quasi 10.000 euro e 232 ordini in un giorno"
            width={1400}
            height={788}
          />
          <p>
            Qualche mese dopo mi sono licenziato. <B>Ma non è quello che ti sto chiedendo di fare.</B>
          </p>
          <p>
            Quello che voglio farti vedere è cosa è successo prima: quel negozio l&apos;ho costruito la sera,
            con lo stipendio che c&apos;era ancora e una famiglia da mandare avanti.{' '}
            <B>Ed è esattamente questo che insegno.</B>
          </p>
          <LetterImage
            src="/images/landing/letter-martina.webp"
            alt="Alex e Martina abbracciati al tramonto su una barca"
            width={540}
            height={786}
            className="max-w-xs"
          />
        </div>

        <div className="flex flex-col gap-6 text-[17px] font-medium leading-[1.7] text-ink md:text-lg md:leading-[1.7] [&_p]:text-pretty">
          <SectionTitle className="text-ink">
            Il metodo: <span className="marker">3 passi</span>, nell&apos;ordine giusto
          </SectionTitle>
          <p>
            In quei sei mesi senza vendite ho capito perché quasi tutti mollano: <B>sbagliano il primo passo.</B>{' '}
            Scelgono il prodotto a sensazione, bruciano i soldi in pubblicità e pensano che il problema siano
            loro.
          </p>
          <p>Così ho messo tutto in fila. Tre passi, sempre gli stessi:</p>

          <ol className="flex flex-col gap-4">
            {METHOD_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sky font-display text-2xl text-black"
                >
                  {index + 1}
                </span>
                <p className="text-[17px] leading-relaxed md:text-lg">
                  <B>{step.title}</B> {step.text}
                </p>
              </li>
            ))}
          </ol>

          <p>
            Sì, questo modello si chiama anche dropshipping. Non te lo nascondo.{' '}
            <B>La differenza non è il modello: è l&apos;ordine dei passaggi, e un coach che te li fa fare uno alla volta.</B>
          </p>
          <p>
            E nessuno di questi passi ti chiede di esserci alle nove del mattino.{' '}
            <B>Si fanno la sera, dopo cena, quando la giornata di lavoro è finita.</B>
          </p>

          <SectionTitle className="mt-4 text-ink">Non sono soltanto io</SectionTitle>
          <p>
            Oggi questo metodo lo seguono più di 300 persone. <B>Operai, impiegati, turnisti, commerciali.</B>{' '}
            Gente che la mattina va a lavorare, come te.
          </p>
          <p>
            E dietro non c&apos;è solo un video su internet. C&apos;è un&apos;azienda italiana di oltre 40
            persone, con i suoi uffici a Roma, dove puoi venirci a trovare, e un magazzino nostro a Firenze che
            spedisce ogni giorno. Chi vuole fregarti non apre un magazzino.
          </p>
          <p>
            Molti con il computer erano negati. Tanti avevano già provato altro e ci avevano perso soldi. Quasi
            tutti avevano pochissimo tempo libero.
          </p>
          <p>
            <B>La differenza è che adesso, a fine mese, i bonifici sono due.</B> E quando arriva una spesa che
            non avevi previsto, una vacanza da prenotare o un regalo da fare, la risposta non è più
            &ldquo;vediamo&rdquo;.
          </p>
          <p>
            Se ti sei riconosciuto in questa lettera, il primo passo è semplice: candidati alla chiamata
            gratuita. Un consulente del mio team guarda con te come potresti costruire il tuo secondo stipendio,
            la sera, senza lasciare il lavoro.
          </p>
          <p>E se non fa per te, te lo diciamo noi.</p>
          <p className="text-xl font-extrabold text-black md:text-2xl">
            Ci vediamo dall&apos;altra parte,
            <br />
            Alex
          </p>
        </div>

        <CtaBlock
          position="letter"
          declineHref="#risultati"
          showSteps
          note="Non candidarti se cerchi soldi facili, se non puoi dedicarci le tue sere o se quei soldi ti servono per arrivare a fine mese."
        />
      </div>
    </section>
  )
}
