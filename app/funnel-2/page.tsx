import type { Metadata } from 'next'
import { Check, Play } from 'lucide-react'
import { LeadForm } from '@/components/funnel/lead-form'
import { Accreditation } from '@/components/landing/proof-bar'
import { SiteFooter } from '@/components/landing/site-footer'
import { FUNNELS } from '@/lib/funnels'
import { SQUEEZE_BULLETS } from '@/lib/landing/unlocked-content'

export const metadata: Metadata = {
  title: 'Lezione gratuita: come incassare 10.000 euro in un giorno | Alex Grassi',
  description:
    'Inserisci nome ed email per guardare la lezione gratuita: come un dipendente può costruire un negozio online la sera.',
}

export default function Funnel2SqueezePage() {
  return (
    <>
      <main>
        <section className="bg-black px-5 py-12 text-white md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <p className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] md:text-[15px]">
                Lezione gratuita per chi ha un lavoro
              </p>
              <h1 className="text-balance font-display text-[clamp(2.1rem,5.2vw,3.9rem)] uppercase leading-[1.1]">
                Come ho incassato <span className="marker">10.000 euro in un giorno</span> mentre ero ancora
                dipendente
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
                Guarda la lezione e scopri il metodo che usano operai, impiegati e corrieri per costruire uno
                stipendio in più, <strong className="text-white">la sera, in 90 minuti.</strong>
              </p>
              <p className="text-base font-extrabold uppercase tracking-[0.1em] text-sky">In questa lezione scopri:</p>
              <ul className="flex flex-col gap-4">
                {SQUEEZE_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[17px] leading-snug md:text-lg">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-go text-black">
                      <Check aria-hidden="true" className="size-4" strokeWidth={4} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div
                aria-hidden="true"
                className="relative hidden aspect-video items-center justify-center overflow-hidden rounded-2xl border-2 border-sky bg-navy lg:flex"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,155,255,0.35),transparent_60%)]" />
                <span className="relative flex size-20 items-center justify-center rounded-full bg-white text-black">
                  <Play className="size-8 translate-x-0.5" fill="currentColor" />
                </span>
                <span className="absolute bottom-3 left-4 text-sm font-bold uppercase tracking-[0.12em] text-white/85">
                  Lezione gratuita con Alex Grassi
                </span>
              </div>

              <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
                <h2 className="mb-1 text-balance text-2xl font-extrabold leading-tight">
                  Dove ti mando la lezione?
                </h2>
                <p className="mb-6 text-[16px] leading-relaxed text-ink-soft">
                  Inserisci i tuoi dati per guardarla subito. Durata: circa 20 minuti.
                </p>
                <LeadForm
                  funnel="funnel-2"
                  step="squeeze"
                  ctaLabel="Guarda la lezione gratuita"
                  redirectTo={FUNNELS['funnel-2'].videoPath}
                />
              </div>
            </div>
          </div>
        </section>
        <Accreditation />
      </main>
      <SiteFooter />
    </>
  )
}
