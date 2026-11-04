export function FunnelHeader() {
  return (
    <header className="border-b border-white/10 bg-black px-5 py-4 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <span className="font-display text-2xl uppercase tracking-wide">
          AG <span className="text-sky">Academy</span>
        </span>
        <span className="text-sm text-white/80 md:text-[15px]">Lezione gratuita con Alex Grassi</span>
      </div>
    </header>
  )
}
