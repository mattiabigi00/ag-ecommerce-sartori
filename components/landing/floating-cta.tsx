'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { CtaButton } from './cta-block'

const HIDE_WHILE_VISIBLE = ['hero', 'candidatura']

/** CTA fissa in basso, solo su mobile: sparisce quando si vede la hero o il survey. */
export function FloatingCta() {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const targets = HIDE_WHILE_VISIBLE.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (targets.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      setVisibleSections((current) => {
        const next = { ...current }
        for (const entry of entries) next[entry.target.id] = entry.isIntersecting
        return next
      })
    })
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const hidden = HIDE_WHILE_VISIBLE.some((id) => visibleSections[id] !== false)

  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex flex-col items-center gap-1.5 bg-black/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden',
        hidden ? 'translate-y-full' : 'translate-y-0',
      )}
    >
      <CtaButton
        position="floating"
        label="Candidati ora"
        className="min-h-14 max-w-md py-3 text-base shadow-[0_4px_0_0_var(--color-go-strong)] active:shadow-[0_2px_0_0_var(--color-go-strong)]"
      />
      <p className="text-[11px] leading-none text-white/70">Ente accreditato alla Regione Lazio</p>
    </div>
  )
}
