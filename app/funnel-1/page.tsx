import { ApplicationForm } from '@/components/funnel/application-form'
import { VslSection } from '@/components/funnel/vsl-section'
import { VSL_SOURCES } from '@/lib/funnels'

export default function Funnel1Page() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-4 py-12">
      <header className="flex flex-col gap-3 text-center">
        <h1 className="text-balance text-3xl font-semibold md:text-4xl">
          Titolo landing funnel 1
        </h1>
        <p className="text-pretty text-muted-foreground">Sottotitolo della landing.</p>
      </header>

      <VslSection funnel="funnel-1" {...VSL_SOURCES['funnel-1']} unlockAfterSeconds={0}>
        <section aria-labelledby="candidatura" className="flex flex-col gap-6">
          <h2 id="candidatura" className="text-2xl font-semibold">
            Candidati
          </h2>
          <ApplicationForm funnel="funnel-1" />
        </section>
      </VslSection>
    </main>
  )
}
