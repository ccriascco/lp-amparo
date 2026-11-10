import { Marquee } from '../components/ui/Marquee'
import { marquee } from '../content/copy'

/** Faixa de recursos (COPY 3.2b, DESIGN §6.25), logo abaixo dos números. */
export function MarqueeBand() {
  return <Marquee items={marquee.items} label="Recursos do Amparo" />
}
