import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LeadForm } from '@/components/funnel/lead-form'
import { VslSection } from '@/components/funnel/vsl-section'
import { FUNNELS, GATE_COOKIE, VSL_SOURCES } from '@/lib/funnels'

export default async function Funnel2VideoPage() {
  const jar = await cookies()
  if (!jar.get(GATE_COOKIE)) redirect(FUNNELS['funnel-2'].path)

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-4 py-12">
      <header className="flex flex-col gap-3 text-center">
        <h1 className="text-balance text-3xl font-semibold md:text-4xl">Titolo pagina VSL</h1>
      </header>

      <VslSection funnel="funnel-2" {...VSL_SOURCES['funnel-2']}>
        <section aria-labelledby="richiedi-info" className="mx-auto flex w-full max-w-md flex-col gap-6">
          <h2 id="richiedi-info" className="text-2xl font-semibold">
            Richiedi informazioni
          </h2>
          <LeadForm
            funnel="funnel-2"
            step="info-request"
            ctaLabel="Richiedi informazioni"
            showPhone
          />
        </section>
      </VslSection>
    </main>
  )
}
