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

  function acknowledge() {
    document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`
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
          misurazione e di marketing. Continuando a navigare ne accetti l&apos;uso. Maggiori dettagli
          nell&apos;
          <Link
            href="/cookie-policy"
            className="font-semibold text-white underline underline-offset-2 hover:text-white/80"
          >
            informativa sui cookie
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={acknowledge}
          className="shrink-0 rounded-xl bg-[#68cd67] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#7bd97a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Ho capito
        </button>
      </div>
    </div>
  )
}
