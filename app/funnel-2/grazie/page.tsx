import type { Metadata } from 'next'
import { ThankYou } from '@/components/landing/thank-you'

export const metadata: Metadata = {
  title: 'Grazie, candidatura ricevuta | Alex Grassi',
  robots: { index: false, follow: false },
}

export default function Funnel2ThankYouPage() {
  return (
    <ThankYou
      title={
        <>
          Perfetto, <span className="marker">ci siamo quasi</span>
        </>
      }
      intro="Hai guardato la lezione e ti sei candidato: abbiamo ricevuto le tue risposte. Ecco cosa succede adesso."
    />
  )
}
