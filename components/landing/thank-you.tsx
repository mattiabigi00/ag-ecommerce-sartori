import { CheckCircle2, Clock, Phone, Smartphone } from 'lucide-react'
import { SiteFooter } from './site-footer'

const NEXT_STEPS = [
  {
    icon: Clock,
    title: 'Controlliamo il tuo profilo',
    text: 'Leggiamo con attenzione le tue risposte per capire se il percorso è adatto alla tua situazione.',
  },
  {
    icon: Phone,
    title: 'Ti chiama un consulente entro 24 ore',
    text: 'La chiamata è gratuita e dura circa 20 minuti. Ti mostra cosa faresti, passo dopo passo.',
  },
  {
    icon: Smartphone,
    title: 'Tieni il telefono a portata di mano',
    text: 'Risponderemo da un numero italiano. Se non puoi rispondere, ti richiamiamo o ti scriviamo.',
  },
]

type Props = {
  title: React.ReactNode
  intro: string
}

export function ThankYou({ title, intro }: Props) {
  return (
    <>
      <main className="bg-black px-5 py-14 text-white md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-go text-black">
            <CheckCircle2 aria-hidden="true" className="size-9" strokeWidth={2.5} />
          </span>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-go md:text-[15px]">
              Candidatura ricevuta
            </p>
            <h1 className="text-balance font-display text-[clamp(2rem,5.4vw,3.6rem)] uppercase leading-[1.32]">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{intro}</p>
          </div>

          <ol className="grid w-full gap-4 text-left md:grid-cols-3">
            {NEXT_STEPS.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-2xl bg-navy p-6">
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-10 items-center justify-center rounded-full bg-sky font-display text-lg text-black"
                  >
                    {index + 1}
                  </span>
                  <step.icon aria-hidden="true" className="size-5 text-white/70" />
                </span>
                <h2 className="text-lg font-extrabold leading-snug">{step.title}</h2>
                <p className="text-[16px] leading-relaxed text-white/85">{step.text}</p>
              </li>
            ))}
          </ol>

          <p className="max-w-xl text-[15px] leading-relaxed text-white/75">
            Non hai ricevuto nulla entro 24 ore? Controlla anche la cartella spam della tua email.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
