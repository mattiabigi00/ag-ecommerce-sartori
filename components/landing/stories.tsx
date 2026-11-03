import Image from 'next/image'
import { Check } from 'lucide-react'
import { STORIES } from '@/lib/landing/funnel-1-content'
import { Initial, SectionTitle, Underline } from './ui-bits'

export function Stories() {
  return (
    <section aria-labelledby="storie-titolo" className="bg-white px-5 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionTitle className="mx-auto max-w-4xl text-center text-ink">
          <span id="storie-titolo">
            Avevano un lavoro, come te. Il negozio l&apos;hanno costruito{' '}
            <Underline>la sera.</Underline>
          </span>
        </SectionTitle>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {STORIES.map((story) => (
            <article
              key={story.name}
              className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
            >
              {story.image ? (
                <Image
                  src={story.image}
                  alt={`Foto di ${story.name}`}
                  width={96}
                  height={96}
                  className="size-24 rounded-full object-cover"
                />
              ) : (
                <Initial name={story.name} className="size-16 text-3xl" />
              )}
              <h3 className="text-balance text-xl font-extrabold leading-snug text-ink">
                &ldquo;{story.title}&rdquo;
              </h3>
              <p className="text-[17px] leading-relaxed text-ink-soft">{story.quote}</p>
              <p className="text-[15px] font-semibold text-ink">
                {story.name}, {story.role}
              </p>
              <p className="mt-auto flex items-start gap-2 rounded-lg bg-sky-pale px-3 py-2.5 text-[15px] font-bold leading-snug text-ink">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-go-strong" strokeWidth={3} />
                {story.result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
