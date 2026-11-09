import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import gsap from 'gsap'
import { Plus } from 'lucide-react'
import { useId, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../../lib/useReducedMotion'

export type AccordionItem = { q: string; a: ReactNode }

/** FAQ (DESIGN.md §6.14): `<button aria-expanded>` + painel com altura animada. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <ul className="border-b border-borda">
      {items.map((item) => (
        <AccordionRow key={item.q} item={item} />
      ))}
    </ul>
  )
}

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const panel = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const first = useRef(true)

  useGSAP(
    () => {
      const el = panel.current
      if (!el) return
      if (first.current) {
        first.current = false
        gsap.set(el, { height: 0 })
        return
      }
      if (reduced) {
        gsap.set(el, { height: open ? 'auto' : 0 })
        return
      }
      gsap.to(el, { height: open ? 'auto' : 0, duration: 0.45, ease: 'power2.inOut' })
    },
    { dependencies: [open, reduced] },
  )

  return (
    <li className="border-t border-borda">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-p`}
          id={`${id}-b`}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-[1.25rem] leading-snug font-semibold tracking-[-0.01em] text-texto transition-colors duration-250 group-hover:text-vinho">
            {item.q}
          </span>
          <span
            aria-hidden
            className={clsx(
              'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-superficie text-vinho transition-transform duration-300 ease-amparo',
              open && 'rotate-45',
            )}
          >
            <Plus className="size-4" strokeWidth={2.25} />
          </span>
        </button>
      </h3>
      <div
        ref={panel}
        id={`${id}-p`}
        role="region"
        aria-labelledby={`${id}-b`}
        className="overflow-hidden"
        style={{ height: 0 }}
        inert={!open}
      >
        <p className="max-w-[62ch] pr-12 pb-6 text-texto-secundario">{item.a}</p>
      </div>
    </li>
  )
}
