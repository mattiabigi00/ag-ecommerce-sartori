import { Check } from 'lucide-react'
import { ApplicationForm } from '@/components/funnel/application-form'
import { FUNNELS, type FunnelId } from '@/lib/funnels'
import {
  FEATURED_STORIES,
  MORE_STORIES,
  UNLOCK_CTA_LABEL,
  UNLOCK_CTA_NOTE,
} from '@/lib/landing/unlocked-content'
import { GuaranteeNote, CtaButton } from './cta-block'
import { Accreditation } from './proof-bar'
import { Reviews } from './reviews'
import { Initial, SectionTitle, Underline } from './ui-bits'

function CtaCard({ funnel, position, title }: { funnel: FunnelId; position: string; title?: string }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 rounded-3xl bg-black p-6 text-center text-white shadow-xl md:p-10">
      {title && <p className="text-balance font-display text-2xl uppercase leading-tight md:text-3xl">{title}</p>}
      <div className="w-full max-w-[680px]">
        <CtaButton position={position} funnel={funnel} href="#survey" label={UNLOCK_CTA_LABEL} />
      </div>
      <p className="text-[15px] text-white/80">{UNLOCK_CTA_NOTE}</p>
    </div>
  )
}

export function UnlockedSection({ funnel }: { funnel: FunnelId }) {
  return (
    <>
      <section aria-labelledby="sbloccato-titolo" className="bg-black px-5 pb-16 text-white md:pb-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border-2 border-go/70 bg-navy p-6 text-center md:p-10">
          <p className="rounded-full bg-go px-4 py-1.5 text-sm font-extrabold uppercase tracking-[0.12em] text-black">
            Il passo successivo è aperto
          </p>
          <h2
            id="sbloccato-titolo"
            className="text-balance font-display text-[clamp(1.4rem,4.2vw,2.8rem)] uppercase leading-[1.32]"
          >
            Se pensi che faccia per te, <span className="marker">candidati</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/90">
            Rispondi a qualche domanda. Se il tuo profilo è in linea, un consulente ti chiama entro 24 ore.
          </p>
          <div className="w-full max-w-[680px]">
            <CtaButton position="unlocked-top" funnel={funnel} href="#survey" label={UNLOCK_CTA_LABEL} />
          </div>
          <p className="text-[15px] text-white/80">{UNLOCK_CTA_NOTE}</p>
        </div>
      </section>

      <Accreditation />

      <section aria-labelledby="storie-sbloccate" className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1566c8] md:text-[15px]">
              Le loro storie
            </p>
            <SectionTitle className="text-ink">
              <span id="storie-sbloccate">
                Avevano un lavoro, come te. Il negozio l&apos;hanno costruito <Underline>la sera.</Underline>
              </span>
            </SectionTitle>
            <p className="text-lg leading-relaxed text-ink-soft">
              Operai, impiegati, corrieri. Te lo raccontano loro, con le loro parole.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {FEATURED_STORIES.map((story) => (
              <article
                key={story.name}
                className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Initial name={story.name} className="size-14 text-2xl" />
                  <div>
                    <h3 className="text-xl font-extrabold leading-tight text-ink">{story.name}</h3>
                    <p className="text-[15px] leading-snug text-ink-soft">{story.role}</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <p className="rounded-xl bg-neutral-100 px-4 py-3 text-[16px] leading-snug text-ink">
                    <span className="mb-1 block text-xs font-extrabold uppercase tracking-[0.12em] text-neutral-600">
                      Prima
                    </span>
                    {story.before}
                  </p>
                  <p className="rounded-xl bg-emerald-50 px-4 py-3 text-[16px] font-bold leading-snug text-emerald-900">
                    <span className="mb-1 block text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-800">
                      Dopo
                    </span>
                    {story.after}
                  </p>
                </div>
                <p className="mt-auto text-[17px] italic leading-relaxed text-ink-soft">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </article>
            ))}
          </div>

          <CtaCard funnel={funnel} position="unlocked-stories" title="La prossima storia può essere la tua" />
        </div>
      </section>

      <section aria-labelledby="altre-storie" className="bg-sky-pale px-5 py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <h2
            id="altre-storie"
            className="mx-auto max-w-3xl text-balance text-center font-display text-[clamp(1.35rem,3.8vw,2.6rem)] uppercase leading-[1.3] text-ink"
          >
            Altre storie di chi è partito con uno stipendio
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MORE_STORIES.map((story) => (
              <article key={story.name} className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Initial name={story.name} />
                  <div>
                    <h3 className="text-lg font-extrabold leading-tight text-ink">{story.name}</h3>
                    <p className="text-sm leading-snug text-ink-soft">{story.role}</p>
                  </div>
                </div>
                <p className="flex items-start gap-2 text-[16px] font-bold leading-snug text-emerald-900">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-go-strong" strokeWidth={3} />
                  {story.result}
                </p>
                <p className="text-[16px] italic leading-relaxed text-ink-soft">&ldquo;{story.quote}&rdquo;</p>
              </article>
            ))}
          </div>
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-ink-soft">
            Risultati raccontati dagli studenti nelle loro video-testimonianze. Sono vendite del negozio, non
            guadagni netti, e dipendono dall&apos;impegno di ciascuno.
          </p>
        </div>
      </section>

      <Reviews />

      <section
        id="survey"
        aria-labelledby="survey-titolo"
        className="scroll-mt-4 bg-black px-5 py-16 text-white md:py-24"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <SectionTitle>
              <span id="survey-titolo">
                Hai visto la lezione e le loro storie. <span className="marker">Ora tocca a te.</span>
              </span>
            </SectionTitle>
            <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              Rispondi a qualche domanda. Se il tuo profilo è in linea, un consulente ti chiama entro 24 ore.
            </p>
          </div>
          <div className="w-full rounded-3xl bg-white p-5 text-ink shadow-2xl sm:p-8">
            <ApplicationForm funnel={funnel} redirectTo={FUNNELS[funnel].thankYouPath} />
          </div>
          <GuaranteeNote className="max-w-[680px]" />
          <p className="max-w-xl text-center text-[15px] leading-relaxed text-white/75">
            Ogni settimana prendiamo solo pochi nuovi studenti: quanti i nostri coach riescono a seguire davvero.
          </p>
        </div>
      </section>
    </>
  )
}
