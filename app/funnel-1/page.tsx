import type { Metadata } from 'next'
import { ApplicationSection } from '@/components/landing/application-section'
import { Hero } from '@/components/landing/hero'
import { Letter } from '@/components/landing/letter'
import { Program } from '@/components/landing/program'
import { Accreditation, Counters } from '@/components/landing/proof-bar'
import { Results } from '@/components/landing/results'
import { Reviews } from '@/components/landing/reviews'
import { SiteFooter } from '@/components/landing/site-footer'
import { Stories } from '@/components/landing/stories'

export const metadata: Metadata = {
  title: 'Il tuo secondo stipendio con un e-commerce, la sera | Alex Grassi',
  description:
    'Guarda la lezione gratuita: i 3 passi per costruire un e-commerce la sera, partendo da un lavoro dipendente. Candidati alla chiamata gratuita.',
}

export default function Funnel1Page() {
  return (
    <main>
      <Hero />
      <Accreditation />
      <Counters />
      <Stories />
      <Letter />
      <Results />
      <Reviews />
      <Program />
      <ApplicationSection />
      <SiteFooter />
    </main>
  )
}
