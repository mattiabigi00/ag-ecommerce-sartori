import { Check, Play } from 'lucide-react'
import { QUOTE_RESULTS, VIDEO_RESULTS } from '@/lib/landing/funnel-1-content'
import { CtaBlock } from './cta-block'
import { Initial, SectionTitle } from './ui-bits'

export function Results() {
  return (
    <section id="risultati" aria-labelledby="risultati-titolo" className="scroll-mt-4 bg-sky-pale px-5 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <SectionTitle className="mx-auto max-w-4xl text-center text-ink">
          <span id="risultati-titolo">
            Gente normale, con un lavoro. <span className="marker">Risultati veri.</span>
          </span>
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-3">
          {VIDEO_RESULTS.map((video) => (
            <article
              key={video.name}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10"
            >
              {video.videoUrl ? (
                <iframe
                  src={video.videoUrl}
                  title={`Video di ${video.name}`}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              ) : (
                <div className="relative flex aspect-video items-center justify-center bg-navy">
                  <span className="flex size-16 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/60">
                    <Play aria-hidden="true" className="ml-1 size-7 fill-white text-white" />
                  </span>
                  <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                    Video di {video.name}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl font-extrabold text-ink">{video.name}</h3>
                <p className="text-[15px] font-semibold text-ink-soft">{video.role}</p>
                <dl className="flex flex-col gap-2 text-[16px] leading-snug">
                  <div className="flex gap-2">
                    <dt className="shrink-0 rounded bg-neutral-200 px-2 py-0.5 text-xs font-bold uppercase text-ink">
                      Prima
                    </dt>
                    <dd className="text-ink-soft">{video.before}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 rounded bg-go px-2 py-0.5 text-xs font-bold uppercase text-black">
                      Dopo
                    </dt>
                    <dd className="font-bold text-ink">{video.after}</dd>
                  </div>
                </dl>
                <p className="mt-auto border-l-4 border-sky pl-3 text-[16px] leading-relaxed text-ink-soft">
                  {video.quote}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {QUOTE_RESULTS.map((item) => (
            <article
              key={item.name}
              className="mb-6 flex break-inside-avoid flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/10"
            >
              <h3 className="text-balance text-lg font-extrabold leading-snug text-ink">
                &ldquo;{item.title}&rdquo;
              </h3>
              <p className="text-[17px] leading-relaxed text-ink-soft">{item.quote}</p>
              <div className="flex items-center gap-3">
                <Initial name={item.name} className="size-10 text-lg" />
                <p className="text-[15px] font-semibold leading-snug text-ink">{item.name}</p>
              </div>
              <p className="flex items-start gap-2 rounded-lg bg-sky-pale px-3 py-2 text-[15px] font-bold text-ink">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-go-strong" strokeWidth={3} />
                {item.result}
              </p>
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
