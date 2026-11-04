import { Star } from 'lucide-react'
import { RATINGS, REVIEWS } from '@/lib/landing/funnel-1-content'
import { Initial, SectionTitle } from './ui-bits'

type Source = 'Trustpilot' | 'Google'

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  )
}

function BrandMark({ source, className }: { source: Source; className?: string }) {
  if (source === 'Google') return <GoogleLogo className={className} />
  return (
    <span aria-hidden="true" className={`flex items-center justify-center bg-[#00B67A] text-white ${className ?? ''}`}>
      <Star className="size-[65%]" fill="currentColor" strokeWidth={0} />
    </span>
  )
}

function BrandStars({ source, label }: { source: Source; label: string }) {
  if (source === 'Google') {
    return (
      <span role="img" aria-label={label} className="flex gap-0.5 text-[#FBBC05]">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} aria-hidden="true" className="size-4" fill="currentColor" strokeWidth={0} />
        ))}
      </span>
    )
  }
  return (
    <span role="img" aria-label={label} className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className="flex size-[18px] items-center justify-center bg-[#00B67A] text-white">
          <Star className="size-3" fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </span>
  )
}

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
                className="flex items-center gap-4 rounded-xl border border-black/10 bg-white px-5 py-3 text-left shadow-sm"
              >
                <BrandMark source={rating.source as Source} className="size-10 shrink-0 rounded-md" />
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-3xl leading-none text-ink">{rating.score}</span>
                    <BrandStars source={rating.source as Source} label={`Valutazione ${rating.score} su 5`} />
                  </span>
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
                  <p className="text-sm text-ink-soft">{review.date}</p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                  <BrandMark source={review.source} className="size-5 shrink-0 rounded-[3px]" />
                  {review.source}
                </span>
              </header>
              <BrandStars source={review.source} label="5 stelle su 5" />
              {review.title && <h3 className="text-base font-extrabold leading-snug text-ink">{review.title}</h3>}
              <p className="text-[16px] leading-relaxed text-ink-soft">{review.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
