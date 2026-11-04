'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  embedUrl: string
  title?: string
  /** Chiave localStorage: il tempo guardato resta salvato se la pagina viene ricaricata. */
  progressKey?: string
  onProgress: (watchedSeconds: number) => void
  className?: string
}

/** Un salto maggiore di questo (secondi di video) tra due aggiornamenti e' considerato uno scorrimento, non visione. */
const MAX_JUMP_SECONDS = 2

export function isVimeoUrl(url: string) {
  try {
    return new URL(url).hostname.endsWith('vimeo.com')
  } catch {
    return false
  }
}

/**
 * Vimeo con SDK ufficiale. Conta solo i secondi realmente guardati:
 * - avanza solo mentre il video e' in riproduzione e la scheda e' visibile
 * - gli spostamenti con la barra (avanti o indietro) non aggiungono tempo
 * - a velocita' superiore a 1x non si guadagna piu' tempo reale trascorso
 */
export function VimeoPlayer({ embedUrl, title = 'Video', progressKey, onProgress, className }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const onProgressRef = useRef(onProgress)

  useEffect(() => {
    onProgressRef.current = onProgress
  }, [onProgress])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let cancelled = false
    let cleanup = () => {}

    let watched = 0
    try {
      const saved = progressKey ? Number(localStorage.getItem(progressKey)) : 0
      if (Number.isFinite(saved) && saved > 0) watched = saved
    } catch {}
    let lastReported = Math.floor(watched)
    if (watched > 0) onProgressRef.current(watched)

    import('@vimeo/player').then(({ default: Player }) => {
      if (cancelled) return
      const player = new Player(iframe)

      let lastVideoTime: number | null = null
      let lastWallTime = performance.now()
      let playing = false

      const resetReference = () => {
        lastVideoTime = null
        lastWallTime = performance.now()
      }

      const onPlay = () => {
        playing = true
        resetReference()
      }
      const onPause = () => {
        playing = false
        resetReference()
      }
      const onSeeked = () => resetReference()

      const onTimeUpdate = ({ seconds }: { seconds: number }) => {
        const now = performance.now()
        const wallDelta = (now - lastWallTime) / 1000
        lastWallTime = now

        const videoDelta = lastVideoTime === null ? 0 : seconds - lastVideoTime
        lastVideoTime = seconds

        const visible = document.visibilityState === 'visible'
        if (!playing || !visible) return
        if (videoDelta <= 0 || videoDelta > MAX_JUMP_SECONDS) return

        watched += Math.min(videoDelta, wallDelta)

        const whole = Math.floor(watched)
        if (whole !== lastReported) {
          lastReported = whole
          onProgressRef.current(watched)
          try {
            if (progressKey) localStorage.setItem(progressKey, String(whole))
          } catch {}
        }
      }

      player.on('play', onPlay)
      player.on('playing', onPlay)
      player.on('pause', onPause)
      player.on('ended', onPause)
      player.on('seeked', onSeeked)
      player.on('timeupdate', onTimeUpdate)

      cleanup = () => {
        player.off('play', onPlay)
        player.off('playing', onPlay)
        player.off('pause', onPause)
        player.off('ended', onPause)
        player.off('seeked', onSeeked)
        player.off('timeupdate', onTimeUpdate)
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [progressKey])

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black',
        className,
      )}
    >
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 size-full"
      />
    </div>
  )
}
