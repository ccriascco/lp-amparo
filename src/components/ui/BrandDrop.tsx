import clsx from 'clsx'
import raw from '../../assets/brand/amparo-simbolo.svg?raw'

// O SVG do símbolo tem um único path com viewBox justo ao desenho (gerado por scripts/build-logos.mjs).
const VIEWBOX = raw.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100'
const D = raw.match(/ d="([^"]+)"/)?.[1] ?? ''

/**
 * Gota do Amparo como SVG inline (para desenhar com DrawSVG ou trocar a cor via `currentColor`).
 * `data-drop-path` marca o path para a animação do preloader.
 */
export function BrandDrop({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={clsx('block', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path data-drop-path d={D} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}
