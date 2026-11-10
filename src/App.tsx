import { lazy, Suspense, useEffect, useState, useSyncExternalStore } from 'react'
import { shouldShowPreloader, startIntro } from './lib/intro'
import { Preloader } from './sections/Preloader'
import { useSiteMotion } from './motion/useSiteMotion'
import { Ajudar } from './sections/Ajudar'
import { Comecar } from './sections/Comecar'
import { Contexto } from './sections/Contexto'
import { CtaFinal } from './sections/CtaFinal'
import { Direitos } from './sections/Direitos'
import { Disfarce } from './sections/Disfarce'
import { Dores } from './sections/Dores'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { MarqueeBand } from './sections/MarqueeBand'
import { Pessoas } from './sections/Pessoas'
import { Beneficios } from './sections/Beneficios'
import { Cofre, Rede, Risco, Sos } from './sections/Pilares'
import { Recursos } from './sections/Recursos'
import { Seguranca } from './sections/Seguranca'

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

  // Página temporária de componentes: /#kit
  if (hash === '#kit') {
    return (
      <Suspense fallback={null}>
        <Kit />
      </Suspense>
    )
  }

  return <Landing />
}

function Landing() {
  useSiteMotion()
  const [withPreloader] = useState(shouldShowPreloader)
  useEffect(() => {
    if (!withPreloader) startIntro()
  }, [withPreloader])
  return (
    <>
      {withPreloader && <Preloader />}
      <a
        href="#contexto"
        className="sr-only z-[60] rounded-full bg-vinho px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <MarqueeBand />
        <Contexto />
        <Pessoas />
        <Beneficios />
        <Dores />
        <Disfarce />
        <Recursos />
        <Sos />
        <Cofre />
        <Rede />
        <Risco />
        <Direitos />
        <Seguranca />
        <Comecar />
        <Ajudar />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
