import { VSL_SOURCES } from '@/lib/funnels'
import { CtaBlock } from './cta-block'
import { HeroVsl } from './hero-vsl'

export function Hero() {
  return (
    <section className="bg-black px-5 pb-16 pt-8 text-white md:pb-24 md:pt-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-white md:text-[15px]">
          Per chi si spacca la schiena a lavoro ogni giorno
        </p>

        <h1 className="text-balance font-display text-[clamp(2.15rem,6.2vw,4.4rem)] uppercase leading-[1.1] tracking-[0.005em]">
          <span className="marker">10.000 euro in un giorno</span>, partendo da un negozio online costruito la
          sera: l&apos;ex dipendente Alex Grassi rivela come ci è riuscito
        </h1>

        <p className="max-w-3xl text-pretty text-lg leading-relaxed text-white/90 md:text-[22px] md:leading-relaxed">
          Nella lezione gratuita ti mostro i <strong className="text-white">3 passi</strong> che mi hanno portato
          da dipendente a oltre <strong className="text-white">5 milioni di euro incassati</strong>, se hai un
          lavoro e 90 minuti la sera.
        </p>

        <HeroVsl {...VSL_SOURCES['funnel-1']} />

        <CtaBlock
          position="hero"
          declineHref="#lettera"
          variant="plain"
          note="Solo per chi ha già un lavoro e può dedicarci le sue sere. Se cerchi soldi facili, non candidarti: qui si lavora."
        />
      </div>
    </section>
  )
}
