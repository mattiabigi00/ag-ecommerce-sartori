import type { Metadata } from 'next'
import Image from 'next/image'
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

function LessonBullets() {
  return (
    <>
      <p className="mb-5 text-base font-extrabold uppercase tracking-[0.1em] text-sky">In questa lezione scopri:</p>
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
    </>
  )
}

export default function Funnel2SqueezePage() {
  return (
    <>
      <main>
        <section className="bg-black px-5 py-12 text-white md:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="flex min-w-0 flex-col gap-6">
              <p className="max-w-full text-balance rounded-full bg-white/10 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.08em] sm:w-fit sm:text-sm sm:tracking-[0.12em] md:text-[15px]">
                Lezione gratuita per chi ha un lavoro
              </p>
              <h1 className="type-h1">
                Come ho incassato <span className="marker">10.000 euro in un giorno</span> mentre ero ancora
                dipendente
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
                Guarda la lezione e scopri il metodo che usano operai, impiegati e corrieri per costruire uno
                stipendio in più, <strong className="text-white">la sera, in 90 minuti.</strong>
              </p>
              <div className="hidden lg:block">
                <LessonBullets />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <a
                href="#modulo"
                aria-label="Guarda la lezione gratuita: vai al modulo"
                className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border-2 border-sky bg-navy transition-transform hover:scale-[1.01]"
              >
                <Image
                  src="/images/landing/vsl-thumbnail.webp"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
                <span className="relative flex size-16 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110 sm:size-20">
                  <Play className="size-7 translate-x-0.5 sm:size-8" fill="currentColor" />
                </span>
                <span className="absolute bottom-3 left-4 right-4 text-xs font-bold uppercase tracking-[0.1em] text-white/85 sm:text-sm">
                  Lezione gratuita con Alex Grassi
                </span>
              </a>

              <div id="modulo" className="scroll-mt-6 rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-8">
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
                  showPhone
                  redirectTo={FUNNELS['funnel-2'].videoPath}
                />
              </div>
            </div>

            <div className="lg:hidden">
              <LessonBullets />
            </div>
          </div>
        </section>
        <Accreditation />
      </main>
      <SiteFooter />
    </>
  )
}
