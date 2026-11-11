import { Smartphone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { CircularBadge } from '../components/ui/CircularBadge'
import { ConcentricRings } from '../components/ui/ConcentricRings'
import { TintedPhoto } from '../components/ui/TintedPhoto'
import { cta, ctaFinal } from '../content/copy'
import { APP_URL } from '../lib/config'

/** `#cta` — shell com foto tingida (overlay forte), texto branco centralizado. */
export function CtaFinal() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="px-3 pb-3 md:px-4 md:pb-4">
      <div
        data-shell-open
        className="on-dark relative grid min-h-[560px] place-items-center overflow-hidden rounded-[28px] md:min-h-[640px] md:rounded-shell"
      >
        <TintedPhoto
          slot="cta-final-mobile"
          overlay="strong"
          sizes="100vw"
          className="absolute inset-0 md:hidden"
        />
        <TintedPhoto
          slot="cta-final"
          overlay="strong"
          sizes="(min-width: 1280px) 1250px, 100vw"
          className="absolute inset-0 hidden md:block"
        />
        <div className="relative z-10 px-6 py-20 text-center">
          <ConcentricRings
            r={120}
            tone="white"
            className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          />
          <h2 id="cta-title" data-words className="mx-auto max-w-[14ch] display-l text-white">
            {ctaFinal.h2}
          </h2>
          <p className="mx-auto mt-5 lead text-white/80">{ctaFinal.text}</p>
          <div className="mt-9 flex justify-center">
            <Button
              href={APP_URL}
              target="_blank"
              rel="noopener"
              variant="on-dark"
              icon={<Smartphone />}
            >
              {cta.acessar}
            </Button>
          </div>
        </div>
        <div className="absolute right-6 bottom-6 z-10 md:right-10 md:bottom-10">
          <CircularBadge onPhoto />
        </div>
      </div>
    </section>
  )
}
