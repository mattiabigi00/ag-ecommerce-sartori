'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const COOKIE_NAME = 'ag_cookie_notice'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180

function hasAcknowledged() {
  return document.cookie.split('; ').some((entry) => entry.startsWith(`${COOKIE_NAME}=`))
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!hasAcknowledged())
  }, [])

  if (!visible) return null

  function choose(choice: 'accepted' | 'rejected') {
    document.cookie = `${COOKIE_NAME}=${choice}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Informativa sui cookie"
      className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-[#0b1020] p-4 text-white shadow-2xl sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <p className="text-xs leading-relaxed text-white/80 sm:flex-1 sm:text-sm">
          Questo sito utilizza cookie tecnici e, tramite terze parti (come Meta e Vimeo), strumenti di
          misurazione e di marketing. Maggiori dettagli nell&apos;
          <Link
            href="/cookie-policy"
            className="font-semibold text-white underline underline-offset-2 hover:text-white/80"
          >
            informativa sui cookie
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => choose('rejected')}
            className="flex-1 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none"
          >
            Rifiuta
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="flex-1 rounded-xl bg-[#68cd67] px-5 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#7bd97a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
