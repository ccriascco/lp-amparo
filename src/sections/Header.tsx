import clsx from 'clsx'
import { Menu, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { useEffect, useId, useRef, useState } from 'react'
import logoBranco from '../assets/brand/amparo-logo-horizontal-branco.svg'
import logoVinho from '../assets/brand/amparo-logo-horizontal.svg'
import { Button } from '../components/ui/Button'
import { cta, nav } from '../content/copy'
import { APP_URL } from '../lib/config'
import { getLenis, gsap, MQ, ScrollTrigger } from '../lib/gsap'

type HeaderProps = {
  /**
   * `light`: `.glass-light` com logo vinho (padrão; o hero é claro).
   * `dark`: sobre `#disfarce` e o rodapé, `.glass` com logo branco (troca feita na Fase 4).
   */
  tone?: 'light' | 'dark'
}

/** Header em pílula flutuante (DESIGN.md §6.2). */
export function Header({ tone = 'light' }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [overDark, setOverDark] = useState(false)
  const sheetId = useId()
  const pill = useRef<HTMLDivElement>(null)
  const openRef = useRef(open)
  useEffect(() => {
    openRef.current = open
  }, [open])
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  // Com a folha aberta a pílula fica sobre o fundo escuro: usa a versão escura.
  const dark = tone === 'dark' || overDark || open

  // Folha aberta: trava o scroll, foca o primeiro link e fecha com Esc.
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    getLenis()?.stop()
    gsap.to(pill.current, { yPercent: 0, duration: 0.2, overwrite: true })
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prev
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Tom escuro sobre #disfarce e rodapé; some ao descer e volta ao subir (§6.2, Fase 4).
  useGSAP(() => {
    const active = new Set<Element>()
    const darks = gsap.utils.toArray<HTMLElement>('[data-header-dark]')
    darks.forEach((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 48px',
        end: 'bottom 48px',
        onToggle: (self) => {
          if (self.isActive) active.add(el)
          else active.delete(el)
          setOverDark(active.size > 0)
        },
      }),
    )

    const mm = gsap.matchMedia()
    mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
      // Só anima quando o estado muda (reiniciar a cada evento de scroll travaria o tween no começo).
      let visible = true
      const show = (v: boolean) => {
        if (v === visible) return
        visible = v
        gsap.to(pill.current, {
          yPercent: v ? 0 : -150,
          duration: v ? 0.45 : 0.35,
          ease: v ? 'expo.out' : 'power2.in',
          overwrite: true,
        })
      }
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (openRef.current) return
          if (self.direction === 1 && self.scroll() > 200) show(false)
          else if (self.direction === -1) show(true)
        },
      })
    })
    return () => mm.revert()
  })

  return (
    <header data-header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-4">
      <div
        ref={pill}
        data-header-pill
        // Foco por teclado sempre traz o header de volta.
        onFocusCapture={() =>
          gsap.to(pill.current, { yPercent: 0, duration: 0.3, overwrite: true })
        }
        className={clsx(
          'relative mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 rounded-full pr-2 pl-5 transition-colors duration-300 md:pl-6',
          dark
            ? 'on-dark text-white glass'
            : 'text-texto shadow-[0_8px_30px_-18px_rgb(75_42_63/0.35)] glass-light',
        )}
      >
        <a
          href="#inicio"
          className="relative flex h-11 shrink-0 items-center"
          aria-label="Amparo, voltar ao início"
        >
          <img
            src={logoVinho}
            alt=""
            width={84}
            height={28}
            className={clsx('h-7 w-auto transition-opacity duration-300', dark && 'opacity-0')}
          />
          <img
            src={logoBranco}
            alt=""
            width={84}
            height={28}
            className={clsx(
              'absolute top-1/2 left-0 h-7 w-auto -translate-y-1/2 transition-opacity duration-300',
              !dark && 'opacity-0',
            )}
          />
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={clsx(
                    'inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-semibold transition-colors duration-250',
                    dark
                      ? 'text-white/85 hover:text-white'
                      : 'text-texto-secundario hover:text-vinho',
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile (< 640px): só logo + menu (DESIGN.md §6.2) */}
          <div className="hidden sm:block">
            <Button
              href={APP_URL}
              target="_blank"
              rel="noopener"
              size="sm"
              variant={dark ? 'on-dark' : 'primary'}
            >
              {cta.acessar}
            </Button>
          </div>
          <button
            ref={menuButton}
            type="button"
            className={clsx(
              'grid size-11 place-items-center rounded-full lg:hidden',
              dark ? 'bg-white/15 text-white' : 'bg-superficie text-vinho-profundo',
            )}
            aria-expanded={open}
            aria-controls={sheetId}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Folha de tela cheia (mobile) */}
      <div
        id={sheetId}
        hidden={!open}
        className="on-dark fixed inset-0 -z-10 overflow-y-auto bg-vinho-profundo/95 px-5 pt-28 pb-10 text-white backdrop-blur-lg lg:hidden"
      >
        <nav aria-label="Seções">
          <ul className="flex flex-col gap-1">
            {nav.links.map((l, i) => (
              <li key={l.href}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center border-b border-white/10 py-3 display-m"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          href={APP_URL}
          target="_blank"
          rel="noopener"
          variant="on-dark"
          block
          className="mt-8"
        >
          {cta.acessar}
        </Button>
      </div>
    </header>
  )
}
