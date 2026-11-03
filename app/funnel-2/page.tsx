import { LeadForm } from '@/components/funnel/lead-form'
import { FUNNELS } from '@/lib/funnels'

export default function Funnel2SqueezePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-8 px-4 py-12">
      <header className="flex flex-col gap-3 text-center">
        <h1 className="text-balance text-3xl font-semibold">Titolo squeeze page</h1>
        <p className="text-pretty text-muted-foreground">
          Inserisci i tuoi dati per accedere al video.
        </p>
      </header>
      <LeadForm
        funnel="funnel-2"
        step="squeeze"
        ctaLabel="Guarda il video"
        redirectTo={FUNNELS['funnel-2'].videoPath}
      />
    </main>
  )
}
