import { BookOpen, Eye, FileX2, Footprints, TrendingUp } from 'lucide-react'
import { QuestionStage, type Pain } from '../components/ui/QuestionStage'
import { dores } from '../content/copy'

const ICONS = [Eye, FileX2, Footprints, TrendingUp, BookOpen]

/** `#dores` — pergunta fixa com as barreiras flutuando (COPY 3.3, DESIGN §6.32, padrão Gardance). */
export function Dores() {
  const pains: Pain[] = dores.items.map((item, i) => ({
    ...item,
    icon: ICONS[i],
    href: dores.linkTargets[i],
  }))
  return (
    <section
      id="dores"
      aria-labelledby="dores-title"
      data-header-dark
      className="on-dark bg-vinho-profundo"
    >
      <QuestionStage
        id="dores-title"
        question={dores.h2}
        intro={dores.intro}
        pains={pains}
        linkLabel={dores.link}
        fecho={dores.fecho}
        fechoButton={dores.fechoButton}
      />
    </section>
  )
}
