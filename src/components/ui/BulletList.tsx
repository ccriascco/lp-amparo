import { Check } from 'lucide-react'
import type { Lead } from '../../content/copy'
import { LeadText } from './RichText'

/** Lista de benefícios com check (texto do COPY.md com início em negrito). */
export function BulletList({ items }: { items: Lead[] }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((b) => (
        <li key={b.strong} className="flex gap-3">
          <span
            aria-hidden
            className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-superficie text-vinho"
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <span className="text-texto-secundario">
            <LeadText item={b} />
          </span>
        </li>
      ))}
    </ul>
  )
}
