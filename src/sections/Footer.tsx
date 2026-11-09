import logoBranco from '../assets/brand/amparo-logo-horizontal-branco.svg'
import { EmergencyBar } from '../components/ui/EmergencyBar'
import { Container } from '../components/ui/Section'
import { faq, footer, nav } from '../content/copy'

const LINKS = [...nav.links, { label: faq.h2, href: '#faq' }]

/** Rodapé (DESIGN.md §6.16): marca + links · EmergencyBar · texto legal. */
export function Footer() {
  return (
    <footer data-header-dark className="on-dark mt-3 bg-vinho-profundo text-white/80 md:mt-4">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={logoBranco} alt="Amparo" width={120} height={40} className="h-10 w-auto" />
            <p className="mt-6 display-m text-white">{footer.lema}</p>
          </div>
          <nav aria-label="Seções do site" className="md:col-span-6 md:col-start-7">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <EmergencyBar subtle className="mt-12" />

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-small text-white/60 md:flex-row md:justify-between md:gap-10">
          <p className="max-w-[80ch]">{footer.legal}</p>
          <p className="shrink-0">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
