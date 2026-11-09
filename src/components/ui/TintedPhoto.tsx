import clsx from 'clsx'
import type { ReactNode } from 'react'
import images from '../../content/images.json'

export type ImageSlot = keyof typeof images

type TintedPhotoProps = {
  slot: ImageSlot
  alt?: string
  /** Largura em que a foto aparece, para o navegador escolher o arquivo do `srcset`. */
  sizes: string
  /** Véu de legibilidade (`::after`). */
  overlay?: 'bottom' | 'left' | 'soft' | 'strong' | 'none'
  /** Imagem com folga de 20% para o parallax interno (§7.9). */
  parallax?: boolean
  priority?: boolean
  className?: string
  /** Conteúdo sobre a foto (texto branco). */
  children?: ReactNode
}

const OVERLAY = {
  bottom: '',
  left: 'tinted--left',
  soft: 'tinted--soft',
  strong: 'tinted--strong',
  none: 'tinted--none',
}

/** `<picture>` AVIF/WebP com `srcset` a partir de `public/images/` (gerado por `npm run images`). */
export function Picture({
  slot,
  alt = '',
  sizes,
  priority,
  className,
}: Pick<TintedPhotoProps, 'slot' | 'alt' | 'sizes' | 'priority' | 'className'>) {
  const meta = images[slot]
  const set = (ext: string) =>
    meta.widths.map((w) => `/images/${slot}-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/images/${slot}.jpg`}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        draggable={false}
        className={className}
      />
    </picture>
  )
}

/** Foto com o tingimento monocromático no vinho do app (DESIGN.md §6.18). */
export function TintedPhoto({
  slot,
  alt,
  sizes,
  overlay = 'bottom',
  parallax,
  priority,
  className,
  children,
}: TintedPhotoProps) {
  return (
    <div className={clsx('tinted', OVERLAY[overlay], className)}>
      <Picture
        slot={slot}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={parallax ? 'parallax-img' : 'absolute inset-0 h-full w-full object-cover'}
      />
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  )
}
