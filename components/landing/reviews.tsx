import { RATINGS, REVIEWS } from '@/lib/landing/funnel-1-content'
import { Initial, SectionTitle, Stars } from './ui-bits'

export function Reviews() {
  return (
    <section aria-labelledby="recensioni-titolo" className="bg-white px-5 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionTitle className="max-w-3xl text-ink">
            <span id="recensioni-titolo">Cosa dice chi ci è passato</span>
          </SectionTitle>
          <div className="flex flex-wrap justify-center gap-4">
            {RATINGS.map((rating) => (
              <div
                key={rating.source}
                className="flex items-center gap-3 rounded-xl bg-sky-pale px-5 py-3 text-left"
              >
                <span className="font-display text-4xl leading-none text-ink">{rating.score}</span>
                <span className="flex flex-col gap-1">
                  <Stars label={`Valutazione ${rating.score} su 5`} />
                  <span className="text-sm font-semibold text-ink-soft">
                    {rating.count} recensioni su {rating.source}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {REVIEWS.map((review, index) => (
            <article
              key={`${review.name}-${index}`}
              className="mb-6 flex break-inside-avoid flex-col gap-3 rounded-2xl border border-black/10 bg-white p-6"
            >
              <header className="flex items-center gap-3">
                <Initial name={review.name} className="size-10 text-lg" />
                <div className="flex flex-col leading-snug">
                  <p className="text-[15px] font-bold text-ink">{review.name}</p>
                  <p className="text-sm text-ink-soft">
                    {review.source} · {review.date}
                  </p>
                </div>
              </header>
              <Stars />
              {review.title && <h3 className="text-base font-extrabold leading-snug text-ink">{review.title}</h3>}
              <p className="text-[16px] leading-relaxed text-ink-soft">{review.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
