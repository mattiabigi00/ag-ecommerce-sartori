import Image from 'next/image'
import { cn } from '@/lib/utils'

export { Counters } from './counters'

function PostIt({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute z-10 select-none', className)}>
      <p className="rotate-[4deg] bg-[#fff176] px-4 py-2.5 font-hand text-[1.65rem] leading-none text-ink shadow-[0_6px_14px_rgba(0,0,0,0.28)] md:text-3xl">
        Siamo un ente accreditato!
      </p>
      <svg
        viewBox="0 0 60 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -bottom-11 left-1 h-12 w-14 text-ink"
      >
        <path d="M52 4 C 40 6, 18 14, 10 38" />
        <path d="M2 28 L10 40 L22 32" />
      </svg>
    </div>
  )
}

export function Accreditation({ postIt = false }: { postIt?: boolean }) {
  return (
    <section
      aria-label="Accreditamento"
      className={cn('relative border-b border-black/10 bg-white px-5 py-6', postIt && 'pb-6 pt-14 md:pt-10')}
    >
      {postIt && <PostIt className="-top-6 right-4 md:right-[10%]" />}
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

/** Versione compatta, da mettere accanto a un modulo. */
export function AccreditationCard() {
  return (
    <div className="relative mt-5">
      <PostIt className="-top-7 right-3" />
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-4 py-4 pt-7 text-center text-ink sm:flex-row sm:gap-4 sm:pt-6 sm:text-left">
        <Image
          src="/images/regione-lazio.webp"
          alt="Logo Regione Lazio"
          width={400}
          height={110}
          className="h-9 w-auto shrink-0 sm:h-11"
        />
        <p className="min-w-0 text-balance text-sm font-bold leading-snug sm:text-[15px]">
          Ente accreditato dalla Regione Lazio per le attività di formazione e orientamento
        </p>
      </div>
    </div>
  )
}
