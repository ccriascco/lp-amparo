import clsx from 'clsx'
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/** Tela de referência das telas codadas (px "do app"), proporção 9:19,5. */
export const SCREEN_W = 390
export const SCREEN_H = 845

type PhoneFrameProps = {
  /** Tela codada (desenhada em 390×845). */
  children?: ReactNode
  /** Ou uma imagem de `src/assets/app-screens/`. */
  src?: string
  alt?: string
  /** Controla a largura do celular (ex.: `w-[300px]`). */
  className?: string
  /** Fundo da tela, visível antes do conteúdo (preto na calculadora). */
  screenClassName?: string
  /**
   * Tela codada **não interativa** descrita como imagem (`role="img"`).
   * Ex.: `a11y.altHome`. Não use com conteúdo interativo (a calculadora interativa).
   */
  label?: string
  /** Esconde o celular de tecnologias assistivas (repetições puramente visuais). */
  decorative?: boolean
  style?: CSSProperties
}

/**
 * Moldura de celular em CSS (DESIGN.md §6.3): raio `r-phone`, borda `#1A1016`,
 * ilha dinâmica e `shadow-phone`. As medidas da moldura acompanham a largura (cqw).
 */
export function PhoneFrame({
  children,
  src,
  alt = '',
  className,
  screenClassName,
  label,
  decorative,
  style,
}: PhoneFrameProps) {
  return (
    <div className={clsx('@container relative', className)} style={style}>
      <div
        className="relative w-full rounded-[16cqw] bg-[#1A1016] p-[3.3cqw] shadow-phone"
        role={label && !decorative ? 'img' : undefined}
        aria-label={decorative ? undefined : label}
        aria-hidden={decorative || undefined}
      >
        <div
          className={clsx(
            'relative aspect-[390/845] w-full overflow-hidden rounded-[12.8cqw] bg-white',
            screenClassName,
          )}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover object-top"
              draggable={false}
              loading="lazy"
            />
          ) : (
            <ScaledScreen>{children}</ScaledScreen>
          )}
        </div>
        {/* Ilha dinâmica */}
        <div
          aria-hidden
          className="absolute top-[5.4cqw] left-1/2 z-20 h-[7.4cqw] w-[27cqw] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  )
}

/** Escala uma tela desenhada em 390×845 para o tamanho real da moldura. */
function ScaledScreen({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = outer.current
    const target = inner.current
    if (!el || !target) return
    // Nunca aplica escala 0: medida com a moldura escondida (display:none) deixava a tela branca
    // ("tela toda branca" no celular das Dores). Reaplica também quando a moldura entra na tela.
    // Largura com casas decimais (clientWidth arredonda) + 1px de folga: sem isso sobrava uma fresta
    // do fundo branco na borda direita, visível como faixa clara em telas com zoom/escala (125%).
    // O excesso fica escondido pelo overflow da moldura.
    const apply = () => {
      const w = el.offsetWidth ? parseFloat(getComputedStyle(el).width) : 0
      if (w > 0) target.style.transform = `scale(${(w + 1) / SCREEN_W})`
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    const io = new IntersectionObserver(apply)
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div ref={outer} className="absolute inset-0">
      <div
        ref={inner}
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: SCREEN_W, height: SCREEN_H }}
      >
        {children}
      </div>
    </div>
  )
}
