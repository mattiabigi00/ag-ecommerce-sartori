import { Check, ShieldCheck } from 'lucide-react'
import { PROGRAM_ITEMS } from '@/lib/landing/funnel-1-content'
import { CtaBlock } from './cta-block'
import { SectionTitle } from './ui-bits'

export function Program() {
  return (
    <section id="percorso" aria-labelledby="percorso-titolo" className="scroll-mt-4 bg-black px-5 py-16 text-white md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky md:text-[15px]">
            Cosa trovi nel percorso
          </p>
          <SectionTitle>
            <span id="percorso-titolo">
              Non resti <span className="marker">mai solo</span>
            </span>
          </SectionTitle>
          <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Tutto quello che serve per arrivare alla prima vendita, senza dover capire tutto da solo.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {PROGRAM_ITEMS.map((item) => (
            <li key={item.title} className="flex items-start gap-4 rounded-2xl bg-navy p-5 md:p-6">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-go text-black">
                <Check aria-hidden="true" className="size-5" strokeWidth={3} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-extrabold leading-snug">{item.title}</h3>
                <p className="text-[16px] leading-relaxed text-white/85">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-5 rounded-3xl border-2 border-go p-6 text-center md:p-10">
          <span className="flex size-16 items-center justify-center rounded-full bg-go/15 text-go">
            <ShieldCheck aria-hidden="true" className="size-9" />
          </span>
          <SectionTitle className="text-[clamp(1.8rem,4vw,2.8rem)]">
            Garanzia <span className="marker">Primi 4.000€</span>
          </SectionTitle>
          <div className="flex max-w-2xl flex-col gap-4 text-left text-lg leading-relaxed text-white/90 md:text-xl">
            <p>
              Segui il metodo e <strong className="text-white">il mio team ti segue passo passo</strong> finché
              non incassi i tuoi primi 4.000 euro.
            </p>
            <p>
              Non perché io sia buono: perché se non incassi tu, non incassa nemmeno la mia azienda. Per questo
              ti seguiamo finché non arrivi al risultato.
            </p>
          </div>
        </div>

        <CtaBlock position="program" declineHref="#candidatura" variant="plain" showSteps />
      </div>
    </section>
  )
}
