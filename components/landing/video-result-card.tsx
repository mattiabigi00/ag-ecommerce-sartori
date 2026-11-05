import Image from 'next/image'
import { Trophy } from 'lucide-react'
import type { VideoResult } from '@/lib/landing/funnel-1-content'
import { Initial } from './ui-bits'
import { WistiaVideo } from './wistia-video'

export function VideoResultCard({ video, showAvatar = false }: { video: VideoResult; showAvatar?: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
      <WistiaVideo wistiaId={video.wistiaId} thumbnail={video.thumbnail} title={video.title} />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-balance text-xl font-extrabold leading-snug text-ink">
          &ldquo;{video.title}&rdquo;
        </h3>
        <p className="text-[16px] leading-relaxed text-ink-soft">&ldquo;{video.quote}&rdquo;</p>
        <div className="mt-auto flex items-center gap-3">
          {showAvatar &&
            (video.avatar ? (
              <Image
                src={video.avatar}
                alt={`Foto di ${video.name}`}
                width={96}
                height={96}
                className="size-12 shrink-0 rounded-full object-cover"
              />
            ) : (
              <Initial name={video.name} />
            ))}
          <p className="text-base font-bold leading-snug text-ink">
            {video.name}, {video.role}
          </p>
        </div>
        <p className="flex items-center gap-2.5 rounded-xl bg-black px-4 py-3 text-xl font-extrabold leading-tight text-white">
          <Trophy aria-hidden="true" className="size-6 shrink-0 text-amber-400" strokeWidth={2.5} />
          {video.result}
        </p>
      </div>
    </article>
  )
}
