'use client'

import { VslPlayer } from '@/components/funnel/vsl-player'

type Props = { src?: string; embedUrl?: string; poster?: string }

/** Nella landing la CTA e' sempre visibile: il player non blocca nulla. */
export function HeroVsl(props: Props) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border-2 border-sky shadow-[0_0_60px_-10px_rgba(59,155,255,0.45)]">
      <VslPlayer {...props} unlockAfterSeconds={0} alreadyUnlocked onProgress={() => {}} />
    </div>
  )
}
