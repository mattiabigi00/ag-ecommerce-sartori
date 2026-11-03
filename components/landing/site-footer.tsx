export function SiteFooter() {
  return (
    <footer className="bg-[#05070d] px-5 py-10 text-center text-white/75">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 text-sm leading-relaxed">
        <p>
          I risultati citati in questa pagina sono casi reali e non garantiscono risultati analoghi: ogni
          percorso dipende dall&apos;impegno e dalle circostanze personali.
        </p>
        <p>© {new Date().getFullYear()} New Opportunities S.r.l. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}
