import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LeadEvent } from '@/components/analytics/lead-event'
import { VslGate } from '@/components/funnel/vsl-gate'
import { SiteFooter } from '@/components/landing/site-footer'
import { UnlockedSection } from '@/components/landing/unlocked-section'
import { FUNNELS, GATE_COOKIE, LEAD_NAME_COOKIE, VSL_SOURCES } from '@/lib/funnels'

export const metadata: Metadata = {
  title: 'La tua lezione gratuita | Alex Grassi',
  robots: { index: false, follow: false },
}

function readFirstName(raw: string | undefined) {
  if (!raw) return null
  let decoded = raw
  try {
    decoded = decodeURIComponent(raw)
  } catch {
    // il valore non era codificato
  }
  const first = decoded.trim().split(/\s+/)[0]
  return first ? first.charAt(0).toUpperCase() + first.slice(1) : null
}

export default async function Funnel2VideoPage() {
  const jar = await cookies()
  if (!jar.get(GATE_COOKIE)) redirect(FUNNELS['funnel-2'].path)
  const firstName = readFirstName(jar.get(LEAD_NAME_COOKIE)?.value)

  return (
    <>
      <LeadEvent />
      <main>
        <VslGate
          funnel="funnel-2"
          {...VSL_SOURCES['funnel-2']}
          showSteps
          lockedText="Guarda la lezione: al minuto 8 si apre la candidatura alla chiamata gratuita, con le storie di chi ha già iniziato."
          header={
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="rounded-full bg-go px-4 py-2 text-sm font-extrabold uppercase tracking-[0.12em] text-black md:text-[15px]">
                {firstName ? `${firstName}, la lezione è pronta` : 'La lezione è pronta'}
              </p>
              <h1 className="type-h1">
                Come ho incassato <span className="marker">10.000 euro in un giorno</span> mentre facevo ancora il
                dipendente
              </h1>
              <p className="max-w-2xl text-[15px] leading-relaxed text-white/90 md:text-xl">
                Mettiti comodo, alza il volume e guarda fino in fondo: <strong className="text-white">al minuto 8</strong>{' '}
                si apre il passo successivo.
              </p>
            </div>
          }
        >
          <UnlockedSection funnel="funnel-2" />
        </VslGate>
      </main>
      <SiteFooter />
    </>
  )
}
