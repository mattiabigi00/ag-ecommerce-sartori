import Image from 'next/image'
import { COUNTERS } from '@/lib/landing/funnel-1-content'

export function Accreditation() {
  return (
    <section aria-label="Accreditamento" className="border-b border-black/10 bg-white px-5 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Image
          src="/images/regione-lazio.webp"
          alt="Logo Regione Lazio"
          width={400}
          height={110}
          className="h-14 w-auto shrink-0"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold text-ink md:text-lg">
            Ente accreditato dalla Regione Lazio per le attività di formazione e orientamento
          </p>
          <p className="text-sm leading-relaxed text-ink-soft md:text-[15px]">
            New Opportunities S.r.l. · accreditamento per tipologia attività «finanziata e autorizzata»,
            Determinazione Regione Lazio n. G08933 del 01/07/2026
          </p>
        </div>
      </div>
    </section>
  )
}

export function Counters() {
  return (
    <section aria-label="I numeri" className="bg-sky-pale px-5 py-14 md:py-16">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 items-start gap-x-6 gap-y-10 text-center lg:grid-cols-4">
        {COUNTERS.map((counter) => (
          <div key={counter.value} className="flex flex-col-reverse items-center gap-3">
            <dd className="max-w-[16rem] text-balance text-base font-medium leading-snug text-ink-soft md:text-lg">
              {counter.label}
            </dd>
            <dt className="whitespace-nowrap font-display text-[clamp(1.7rem,3.4vw,2.7rem)] uppercase leading-none text-ink">
              {counter.value}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
