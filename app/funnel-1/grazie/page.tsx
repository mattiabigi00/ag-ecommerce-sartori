import type { Metadata } from 'next'
import { ThankYou } from '@/components/landing/thank-you'

export const metadata: Metadata = {
  title: 'Grazie, candidatura ricevuta | Alex Grassi',
  robots: { index: false, follow: false },
}

export default function Funnel1ThankYouPage() {
  return (
    <ThankYou
      title={
        <>
          Grazie, hai fatto il <span className="marker">primo passo</span>
        </>
      }
      intro="Abbiamo ricevuto la tua candidatura. Ecco cosa succede adesso."
    />
  )
}
