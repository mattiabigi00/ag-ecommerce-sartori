import Link from 'next/link'
import { FUNNELS } from '@/lib/funnels'

export default function IndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Funnel ecommerce AG</h1>
      <ul className="flex flex-col gap-3">
        {Object.values(FUNNELS).map((funnel) => (
          <li key={funnel.id}>
            <Link
              href={funnel.path}
              className="flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <span className="font-medium">{funnel.label}</span>
              <span className="text-sm text-muted-foreground">{funnel.path}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
