import Image from 'next/image'
import { Trophy } from 'lucide-react'
import { STORIES } from '@/lib/landing/funnel-1-content'
import { Initial, SectionTitle, Underline } from './ui-bits'

export function Stories() {
  return (
    <section aria-labelledby="storie-titolo" className="bg-white px-5 py-16 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <SectionTitle className="mx-auto max-w-4xl text-center text-ink">
          <span id="storie-titolo">
            Avevano un lavoro, come te. E hanno costruito un secondo stipendio nel tempo libero, in meno di 90
            minuti <Underline>la sera.</Underline>
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
                  width={400}
                  height={400}
                  className="size-24 rounded-full object-cover"
                />
              ) : (
                <Initial name={story.name} className="size-16 text-3xl" />
              )}
              <h3 className="text-balance text-lg font-extrabold leading-snug text-ink">
                &ldquo;{story.title}&rdquo;
              </h3>
              <p className="text-base leading-relaxed text-ink-soft">{story.quote}</p>
              <p className="text-base font-bold text-ink">
                {story.name}, {story.role}
              </p>
              <p className="mt-auto flex items-center gap-2.5 rounded-xl bg-black px-4 py-3 text-xl font-extrabold leading-tight text-white">
                <Trophy aria-hidden="true" className="size-6 shrink-0 text-amber-400" strokeWidth={2.5} />
                {story.result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
