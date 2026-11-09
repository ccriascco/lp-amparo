import { lazy, Suspense, useSyncExternalStore } from 'react'
import { Header } from './sections/Header'

const Kit = lazy(() => import('./pages/Kit'))

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
const useHash = () =>
  useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => '',
  )

export default function App() {
  const hash = useHash()

  // Página temporária de componentes (Fase 2): /#kit
  if (hash === '#kit') {
    return (
      <Suspense fallback={null}>
        <Kit />
      </Suspense>
    )
  }

  // As seções da landing entram na Fase 3.
  return (
    <>
      <Header />
      <main
        id="inicio"
        className="grid min-h-svh place-items-center px-5 text-center"
        style={{ background: 'var(--grad-suave)' }}
      >
        <h1 className="display-xl">Você não está sozinha.</h1>
      </main>
    </>
  )
}
