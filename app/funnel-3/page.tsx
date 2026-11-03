import { VslSection } from '@/components/funnel/vsl-section'
import { Button } from '@/components/ui/button'
import { VSL_SOURCES } from '@/lib/funnels'

export default function Funnel3Page() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-4 py-12">
      <header className="flex flex-col gap-3 text-center">
        <h1 className="text-balance text-3xl font-semibold md:text-4xl">Titolo pagina VSL</h1>
      </header>

      <VslSection funnel="funnel-3" {...VSL_SOURCES['funnel-3']}>
        <div className="flex justify-center">
          <Button size="lg" render={<a href="#" />}>
            Prenota la tua call
          </Button>
        </div>
      </VslSection>
    </main>
  )
}
