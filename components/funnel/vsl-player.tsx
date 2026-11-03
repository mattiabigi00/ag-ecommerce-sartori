'use client'

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  src?: string
  embedUrl?: string
  poster?: string
  /** Secondi gia' visti (per la barra di avanzamento verso lo sblocco). */
  unlockAfterSeconds: number
  alreadyUnlocked: boolean
  onProgress: (seconds: number) => void
  className?: string
}

export function VslPlayer({
  src,
  embedUrl,
  poster,
  unlockAfterSeconds,
  alreadyUnlocked,
  onProgress,
  className,
}: Props) {
  if (src) {
    return (
      <FilePlayer
        src={src}
        poster={poster}
        alreadyUnlocked={alreadyUnlocked}
        onProgress={onProgress}
        className={className}
      />
    )
  }

  if (embedUrl) {
    return <EmbedPlayer embedUrl={embedUrl} onProgress={onProgress} className={className} />
  }

  return (
    <Placeholder
      unlockAfterSeconds={unlockAfterSeconds}
      onProgress={onProgress}
      className={className}
    />
  )
}

/** Video mp4: lo sblocco conta il tempo di riproduzione reale, senza poter saltare avanti. */
function FilePlayer({
  src,
  poster,
  alreadyUnlocked,
  onProgress,
  className,
}: Pick<Props, 'src' | 'poster' | 'alreadyUnlocked' | 'onProgress' | 'className'>) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const maxTimeRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  function toggle() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black',
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        className="size-full"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true)
          setStarted(true)
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const video = event.currentTarget
          if (!alreadyUnlocked && video.currentTime > maxTimeRef.current + 1.5) {
            video.currentTime = maxTimeRef.current
            return
          }
          maxTimeRef.current = Math.max(maxTimeRef.current, video.currentTime)
          onProgress(maxTimeRef.current)
        }}
      />
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={started ? 'Riprendi il video' : 'Guarda il video'}
          className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/30"
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Play className="ml-1 size-9 fill-current" aria-hidden />
          </span>
        </button>
      )}
    </div>
  )
}

/** Embed (Vimeo, YouTube, Wistia): non si legge il tempo di riproduzione, conta il tempo a scheda visibile. */
function EmbedPlayer({
  embedUrl,
  onProgress,
  className,
}: Pick<Props, 'embedUrl' | 'onProgress' | 'className'>) {
  useEffect(() => {
    let seconds = 0
    const interval = setInterval(() => {
      if (document.visibilityState !== 'visible') return
      seconds += 1
      onProgress(seconds)
    }, 1000)
    return () => clearInterval(interval)
  }, [onProgress])

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black',
        className,
      )}
    >
      <iframe
        src={embedUrl}
        title="Video"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="size-full"
      />
    </div>
  )
}

/** Finche' non c'e' un video, il riquadro permette di provare lo sblocco in test. */
function Placeholder({
  unlockAfterSeconds,
  onProgress,
  className,
}: Pick<Props, 'unlockAfterSeconds' | 'onProgress' | 'className'>) {
  return (
    <div
      className={cn(
  'flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-xl bg-navy p-6 text-center text-white',
  className,
  )}
  >
  <p className="text-base font-semibold text-white/80">Video VSL non ancora caricato</p>
  {process.env.NODE_ENV !== 'production' && (
  <Button type="button" variant="secondary" onClick={() => onProgress(unlockAfterSeconds)}>
          Simula lo sblocco (solo test)
        </Button>
      )}
    </div>
  )
}
