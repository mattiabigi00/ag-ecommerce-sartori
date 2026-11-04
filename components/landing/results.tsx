import { VIDEO_RESULTS } from '@/lib/landing/funnel-1-content'
import { CtaBlock } from './cta-block'
import { SectionTitle } from './ui-bits'
import { VideoResultCard } from './video-result-card'

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
            <VideoResultCard key={video.wistiaId} video={video} />
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
