const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "https://alexgrassi.com/privacypolicy" },
  { label: "Cookie Policy", href: "https://alexgrassi.com/cookiepolicy" },
  { label: "Disclaimer", href: "https://alexgrassi.com/disclaimer" },
  { label: "Termini e Condizioni", href: "https://alexgrassi.com/terminiecondizioni" },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#05070d] px-5 py-10 text-center text-white/75">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-sm leading-relaxed">
        <nav aria-label="Informazioni legali">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {LEGAL_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">-</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-white underline underline-offset-2 hover:text-white/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col gap-1 not-italic">
          <span>New Opportunities SRL - P.IVA e CF 03914971209 - Sede Via Trasaghis 18e, 00188 Roma (RM)</span>
          <span>REA RM-1746328</span>
          <span>Cap. Sociale €52.000</span>
          <span>new.opportunities@pec.it</span>
        </address>

        <p className="text-xs text-white/55">
          I risultati citati in questa pagina sono casi reali e non garantiscono risultati analoghi: ogni
          percorso dipende dall&apos;impegno e dalle circostanze personali.
        </p>
        <p className="text-xs text-white/55">
          Questo sito non fa parte di Meta Platforms, Inc. e non è approvato da Meta in alcun modo. Facebook e
          Instagram sono marchi registrati di Meta Platforms, Inc.
        </p>
      </div>
    </footer>
  )
}
