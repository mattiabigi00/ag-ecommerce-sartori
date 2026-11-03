import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Sottolineatura a pennarello sotto una parola breve del titolo. */
export function Underline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('relative inline-block whitespace-nowrap', className)}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.28em] left-0 h-[0.3em] w-full text-sky"
      >
        <path
          d="M2 9 C 40 2, 90 12, 130 5 S 190 4, 198 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M30 12 C 80 8, 140 13, 180 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-sm font-bold uppercase tracking-[0.18em] md:text-[15px]', className)}>
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        'text-balance font-display text-[clamp(2rem,4.6vw,3.4rem)] uppercase leading-[1.12] tracking-[0.005em]',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function Stars({ label = '5 stelle su 5', className }: { label?: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={cn('inline-flex gap-0.5', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} aria-hidden="true" className="size-5 fill-amber-400 text-amber-400" />
      ))}
    </span>
  )
}

export function Initial({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-full bg-sky font-display text-xl text-black',
        className,
      )}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  )
}
