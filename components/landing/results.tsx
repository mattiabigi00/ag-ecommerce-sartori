import { Check } from 'lucide-react'
import { VIDEO_RESULTS } from '@/lib/landing/funnel-1-content'
import { CtaBlock } from './cta-block'
import { SectionTitle } from './ui-bits'
import { WistiaVideo } from './wistia-video'

export function Results() {
  return (
    <section id="risultati" aria-labelledby="risultati-titolo" className="scroll-mt-4 bg-sky-pale px-5 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <SectionTitle className="mx-auto max-w-4xl text-center text-ink">
          <span id="risultati-titolo">
            Gente normale, con un lavoro. <span className="marker">Risultati veri.</span>
          </span>
        </SectionTitle>

        <div className="grid gap-6 md:grid-cols-2">
          {VIDEO_RESULTS.map((video) => (
            <article
              key={video.wistiaId}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10"
            >
              <WistiaVideo wistiaId={video.wistiaId} thumbnail={video.thumbnail} title={video.title} />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-balance text-xl font-extrabold leading-snug text-ink">
                  &ldquo;{video.title}&rdquo;
                </h3>
                <p className="text-[16px] leading-relaxed text-ink-soft">&ldquo;{video.quote}&rdquo;</p>
                <p className="mt-auto text-[15px] font-semibold leading-snug text-ink">
                  {video.name}, {video.role}
                </p>
                <p className="flex items-start gap-2 rounded-lg bg-sky-pale px-3 py-2.5 text-[15px] font-bold leading-snug text-ink">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-go-strong" strokeWidth={3} />
                  {video.result}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-ink-soft md:text-[15px]">
          I risultati mostrati sono casi reali di studenti del percorso, selezionati tra quelli che hanno
          applicato il metodo con costanza. Non sono una garanzia di guadagno: i risultati dipendono
          dall&apos;impegno, dal tempo dedicato e dal prodotto scelto.
        </p>

        <CtaBlock position="results" declineHref="#percorso" showSteps />
      </div>
    </section>
  )
}
