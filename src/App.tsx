import logo from './assets/brand/amparo-logo-horizontal.svg'

/**
 * Fase 1: casca mínima para validar tokens, fontes e assets.
 * As seções da landing entram a partir da Fase 2.
 */
export default function App() {
  return (
    <main
      className="grid min-h-svh place-items-center px-5 text-center"
      style={{ background: 'var(--grad-suave)' }}
    >
      <div>
        <img src={logo} alt="Amparo" width={180} height={60} className="mx-auto h-auto w-45" />
        <h1 className="mt-8 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-texto">
          Você não está sozinha.
        </h1>
      </div>
    </main>
  )
}
