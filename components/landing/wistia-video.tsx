'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'

type WistiaVideoProps = {
  wistiaId: string
  thumbnail: string
  title: string
}

export function WistiaVideo({ wistiaId, thumbnail, title }: WistiaVideoProps) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://fast.wistia.net/embed/iframe/${wistiaId}?version=v1&autoplay=1&silentAutoPlay=allow`}
        title={`Video testimonianza: ${title}`}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="aspect-video w-full bg-black"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Guarda il video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-black"
    >
      <Image
        src={thumbnail}
        alt=""
        width={960}
        height={540}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="size-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
        <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform group-hover:scale-110">
          <Play aria-hidden="true" className="ml-1 size-7" fill="currentColor" />
        </span>
      </span>
    </button>
  )
}
