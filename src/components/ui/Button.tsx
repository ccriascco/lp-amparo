import clsx from 'clsx'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'on-dark' | 'ghost'
type Size = 'md' | 'sm'

type Common = {
  variant?: Variant
  size?: Size
  /** Ícone opcional, sempre à esquerda (DESIGN.md §6.1). */
  icon?: ReactNode
  /** Ocupa a largura toda (CTAs empilhados no mobile). */
  block?: boolean
  children: ReactNode
  className?: string
}

type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export type ButtonProps = AsLink | AsButton

const base =
  'inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-sans font-bold leading-none transition-[background-color,color,border-color,transform] duration-250 ease-amparo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const sizes: Record<Size, string> = {
  // Área de toque mínima de 44px em todos os tamanhos (regra do app).
  md: 'h-12 px-6 text-base md:h-14 md:px-7',
  sm: 'h-11 px-5 text-[0.9375rem]',
}

const variants: Record<Variant, string> = {
  primary: 'bg-vinho text-white hover:bg-vinho-profundo',
  secondary: 'border-[1.5px] border-vinho bg-transparent text-vinho hover:bg-superficie',
  'on-dark': 'bg-white text-vinho-profundo hover:bg-superficie',
  ghost: '',
}

/**
 * Botão do design system (DESIGN.md §6.1). Renderiza `<a>` quando recebe `href`.
 * O CTA principal é sempre `primary` com "Acessar o Amparo".
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, block, children, className, ...rest } = props

  if (variant === 'ghost') {
    const cls = clsx(
      'group inline-flex min-h-11 items-center gap-2 font-bold text-vinho',
      className,
    )
    const content = (
      <>
        {icon}
        <span className="relative">
          {children}
          {/* Sublinhado de 1px que cresce no hover */}
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-[0.35] bg-current transition-transform duration-250 ease-amparo group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </span>
      </>
    )
    return 'href' in rest && rest.href !== undefined ? (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls}>
        {content}
      </a>
    ) : (
      <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
        {content}
      </button>
    )
  }

  const cls = clsx(base, sizes[size], variants[variant], block && 'w-full', className)
  const content = (
    <>
      {icon && <span className="-ml-1 flex shrink-0 [&>svg]:size-5">{icon}</span>}
      {children}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
      {content}
    </button>
  )
}
