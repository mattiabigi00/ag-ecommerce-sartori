import type { Metadata } from 'next'
import { VslGate } from '@/components/funnel/vsl-gate'
import { SiteFooter } from '@/components/landing/site-footer'
import { UnlockedSection } from '@/components/landing/unlocked-section'
import { VSL_SOURCES } from '@/lib/funnels'

export const metadata: Metadata = {
  title: 'Come un dipendente ha incassato 10.000 euro in un giorno | Alex Grassi',
  description:
    'Guarda la lezione gratuita: come costruire un negozio online la sera, partendo da un lavoro dipendente.',
}

export default function Funnel3Page() {
  return (
    <>
      <main>
        <VslGate
          funnel="funnel-3"
          {...VSL_SOURCES['funnel-3']}
          lockedText="Guarda la lezione: al minuto 8 si apre la candidatura alla chiamata gratuita, con le storie di chi ha già iniziato."
          header={
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="max-w-full text-balance rounded-full bg-white/10 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.08em] sm:text-sm sm:tracking-[0.12em] md:text-[15px]">
                Per chi ha un lavoro e vuole uno stipendio in più
              </p>
              <h1 className="text-balance font-display text-[clamp(1.55rem,6vw,3.9rem)] uppercase leading-[1.32] tracking-[0.005em]">
                <span className="marker">10.000 euro in un giorno</span>, con un negozio online costruito la
                sera
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                Guarda la lezione gratuita: ti mostro i <strong className="text-white">3 passi</strong> che
                trasformano 90 minuti la sera in un secondo stipendio.
              </p>
            </div>
          }
        >
          <UnlockedSection funnel="funnel-3" />
        </VslGate>
      </main>
      <SiteFooter />
    </>
  )
}
