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
  /** Cores originais da foto, sem o tingimento vinho (exceção pedida pelo cliente). */
  natural?: boolean
  /** `object-position` da imagem (ex.: manter um rosto no recorte vertical do celular). */
  position?: string
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

/** Até 767px o `<picture>` pode trocar de arquivo (direção de arte: ex. foto vertical no celular). */
const MOBILE_MEDIA = '(max-width: 767px)'

/**
 * `<picture>` AVIF/WebP com `srcset` a partir de `public/images/` (gerado por `npm run images`).
 * Com `mobileSlot`, o navegador baixa só a imagem certa: a de `mobileSlot` até 767px, a de `slot`
 * a partir de 768px.
 */
export function Picture({
  slot,
  alt = '',
  sizes,
  priority,
  className,
  position,
  mobileSlot,
  mobileSizes = '100vw',
}: Pick<TintedPhotoProps, 'slot' | 'alt' | 'sizes' | 'priority' | 'className' | 'position'> & {
  mobileSlot?: ImageSlot
  mobileSizes?: string
}) {
  const meta = images[slot]
  const set = (s: ImageSlot, ext: string) =>
    images[s].widths.map((w) => `/images/${s}-${w}.${ext} ${w}w`).join(', ')
  return (
    <picture>
      {mobileSlot && (
        <>
          <source
            media={MOBILE_MEDIA}
            type="image/avif"
            srcSet={set(mobileSlot, 'avif')}
            sizes={mobileSizes}
          />
          <source
            media={MOBILE_MEDIA}
            type="image/webp"
            srcSet={set(mobileSlot, 'webp')}
            sizes={mobileSizes}
          />
        </>
      )}
      <source type="image/avif" srcSet={set(slot, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set(slot, 'webp')} sizes={sizes} />
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
        style={position ? { objectPosition: position } : undefined}
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
  natural,
  position,
  className,
  children,
}: TintedPhotoProps) {
  return (
    <div className={clsx('tinted', OVERLAY[overlay], natural && 'tinted--natural', className)}>
      <Picture
        slot={slot}
        alt={alt}
        sizes={sizes}
        priority={priority}
        position={position}
        className={parallax ? 'parallax-img' : 'absolute inset-0 h-full w-full object-cover'}
      />
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  )
}
