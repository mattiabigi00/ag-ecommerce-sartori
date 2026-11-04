import type { Metadata } from 'next'
import { ThankYou } from '@/components/landing/thank-you'

export const metadata: Metadata = {
  title: 'Grazie, candidatura ricevuta | Alex Grassi',
  robots: { index: false, follow: false },
}

export default function Funnel3ThankYouPage() {
  return (
    <ThankYou
      title={
        <>
          Grazie, <span className="marker">candidatura ricevuta</span>
        </>
      }
      intro="Abbiamo ricevuto le tue risposte. Ecco cosa succede adesso."
    />
  )
}
