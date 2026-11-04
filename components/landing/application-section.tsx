import { Check, X } from 'lucide-react'
import { ApplicationForm } from '@/components/funnel/application-form'
import { FUNNELS } from '@/lib/funnels'
import { APPLY_IF, CALL_OUTCOMES, DONT_APPLY_IF } from '@/lib/landing/funnel-1-content'
import { GuaranteeNote, SeatsTimer, StepsList } from './cta-block'
import { SectionTitle } from './ui-bits'

export function ApplicationSection() {
  return (
    <section
      id="candidatura"
      aria-labelledby="candidatura-titolo"
      className="scroll-mt-4 border-t border-white/10 bg-black px-5 py-16 text-white md:py-24"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky md:text-[15px]">
            La chiamata gratuita
          </p>
          <SectionTitle>
            <span id="candidatura-titolo">
              Il tuo <span className="marker">secondo stipendio</span> parte da qui
            </span>
          </SectionTitle>
          <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            Rispondi ad alcune domande. Se il profilo è in linea, un consulente del mio team ti chiama entro 24
            ore e ti mostra cosa faresti, passo dopo passo.
          </p>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {CALL_OUTCOMES.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-3 rounded-2xl bg-navy p-6">
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full bg-sky font-display text-xl text-black"
              >
                {index + 1}
              </span>
              <h3 className="text-lg font-extrabold">{item.title}</h3>
              <p className="text-[16px] leading-relaxed text-white/85">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-go/70 p-6">
            <h3 className="text-lg font-extrabold text-go">Candidati se</h3>
            <ul className="flex flex-col gap-3">
              {APPLY_IF.map((text) => (
                <li key={text} className="flex items-start gap-3 text-[17px] leading-snug text-white/90">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-go" strokeWidth={3} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-red-400/70 p-6">
            <h3 className="text-lg font-extrabold text-red-300">Non candidarti se</h3>
            <ul className="flex flex-col gap-3">
              {DONT_APPLY_IF.map((text) => (
                <li key={text} className="flex items-start gap-3 text-[17px] leading-snug text-white/90">
                  <X aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red-300" strokeWidth={3} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6">
          <SeatsTimer />
          <div className="w-full rounded-3xl bg-white p-5 text-ink shadow-2xl sm:p-8">
            <ApplicationForm funnel="funnel-1" redirectTo={FUNNELS['funnel-1'].thankYouPath} />
          </div>
          <StepsList />
          <GuaranteeNote className="max-w-[680px]" />
        </div>

        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-white/90">
          <p>
            <strong className="text-white">P.S.</strong> I posti per le chiamate sono limitati, perché i
            consulenti seguono pochi nuovi studenti a settimana. Se leggi questa pagina tra qualche giorno,
            potrebbero essere finiti.
          </p>
          <p>
            <strong className="text-white">P.P.S.</strong> Hai 90 minuti la sera e un lavoro da cui non vuoi
            dipendere per sempre? Allora candidati ora.
          </p>
        </div>
      </div>
    </section>
  )
}
