'use client'

import { useEffect, useRef, useState } from 'react'
import { COUNTERS } from '@/lib/landing/funnel-1-content'

const DURATION_MS = 1600

/** Progresso 0 → 1 che parte quando l'elemento entra nello schermo. Con "riduci movimento" resta a 1. */
function useRevealProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setProgress(0)
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS)
          setProgress(t)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return { ref, progress }
}

function AnimatedValue({ value }: { value: string }) {
  const { ref, progress } = useRevealProgress()
  const numeric = value.match(/^(\+?)(\d+)(.*)$/)

  let animated: React.ReactNode
  if (numeric) {
    const [, prefix, digits, suffix] = numeric
    const eased = 1 - Math.pow(1 - progress, 3)
    animated = `${prefix}${Math.round(Number(digits) * eased)}${suffix}`
  } else {
    const visible = Math.ceil(value.length * progress)
    animated = (
      <>
        {value.slice(0, visible)}
        <span className="invisible">{value.slice(visible)}</span>
      </>
    )
  }

  return (
    <div ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{animated}</span>
    </div>
  )
}

export function Counters() {
  return (
    <section aria-label="I numeri" className="bg-sky-pale px-5 py-14 md:py-16">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 items-start gap-x-6 gap-y-10 text-center lg:grid-cols-4">
        {COUNTERS.map((counter) => (
          <div key={counter.value} className="flex flex-col-reverse items-center gap-3">
            <dd className="max-w-[16rem] text-balance text-base font-semibold leading-snug text-ink-soft md:text-lg">
              {counter.label}
            </dd>
            <dt className="whitespace-nowrap font-display text-[clamp(1.9rem,3.8vw,3rem)] uppercase leading-none text-ink">
              <AnimatedValue value={counter.value} />
            </dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
