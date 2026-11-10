import { ArrowDown, Check, ShieldCheck, Smartphone } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import calcPng from '../assets/app-screens/modo-disfarce-calculadora.png'
import homePng from '../assets/app-screens/inicio-celular.png'
import homeSosPng from '../assets/app-screens/home-sos.png'
import ocorrPng from '../assets/app-screens/ocorrencias.png'
import redePng from '../assets/app-screens/rede-de-apoio.png'
import {
  DireitosScreen,
  HomeRiscoScreen,
  HomeSosScreen,
  OcorrenciasScreen,
  ProvaScreen,
  RedeScreen,
} from '../components/phone/AppScreens'
import direitosPng from '../assets/app-screens/conteudo-direitos.png'
import riscoPng from '../assets/app-screens/home-leitura-risco.png'
import provaPng from '../assets/app-screens/prova-verificada.png'
import simbolo from '../assets/brand/amparo-simbolo.svg'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { PhoneFrame } from '../components/ui/PhoneFrame'
import { CalculatorScreen } from '../components/phone/CalculatorScreen'
import { HomeScreen } from '../components/phone/HomeScreen'
import { a11y, contexto, cta, dores, hero, leituraRisco } from '../content/copy'
import { APP_URL } from '../lib/config'
import { formatNumber } from '../lib/format'
import { Header } from '../sections/Header'

const COLORS = [
  ['vinho', '#954B6E', 'bg-vinho'],
  ['vinho-profundo', '#4B2A3F', 'bg-vinho-profundo'],
  ['sos', '#C62828 (só SOS)', 'bg-sos'],
  ['confirma', '#2E7D6B', 'bg-confirma'],
  ['branco', '#FFFFFF', 'bg-branco'],
  ['superficie', '#F3EDEF', 'bg-superficie'],
  ['borda', '#E4D3D9', 'bg-borda'],
  ['texto', '#111111', 'bg-texto'],
  ['texto-secundario', '#5D5D5D', 'bg-texto-secundario'],
] as const

/** Página temporária de componentes (Fase 2). Acesse em `/#kit`. */
export default function Kit() {
  const [unlocked, setUnlocked] = useState(false)

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] px-5 pt-32 pb-24 md:px-8">
        <h1 className="display-l">Kit de componentes</h1>
        <p className="mt-4 max-w-[52ch] lead text-texto-secundario">
          Fundações da landing do Amparo: tokens, tipografia, botões, chips, moldura do celular e as
          telas codadas do app.
        </p>

        <Block title="Cores">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {COLORS.map(([name, hex, cls]) => (
              <li key={name} className="rounded-card border border-borda p-3">
                <span className={`block h-14 rounded-xl border border-borda ${cls}`} />
                <p className="mt-2 text-sm font-bold">{name}</p>
                <p className="text-xs text-texto-secundario">{hex}</p>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="h-24 rounded-card-lg" style={{ background: 'var(--grad-vinho)' }} />
            <div
              className="h-24 rounded-card-lg border border-borda"
              style={{ background: 'var(--grad-suave)' }}
            />
          </div>
        </Block>

        <Block title="Tipografia">
          <div className="space-y-6">
            <p className="display-xl">{hero.h1}</p>
            <p className="max-w-[18ch] display-l">{contexto.h2}</p>
            <p className="display-m">{leituraRisco.h2}</p>
            <p className="numero">
              {formatNumber(1492)} · {formatNumber(64.3, 1)}%
            </p>
            <p className="max-w-[52ch] lead text-texto-secundario">{hero.sub}</p>
            <p className="max-w-[62ch] text-body">{contexto.text}</p>
            <p className="text-small text-texto-secundario">{dores.banner.sub}</p>
            <p className="caption text-vinho">Caption · Nunito Sans 600</p>
          </div>
        </Block>

        <Block title="Botões">
          <div className="flex flex-wrap items-center gap-4">
            <Button href={APP_URL} target="_blank" rel="noopener" icon={<Smartphone />}>
              {cta.acessar}
            </Button>
            <Button variant="secondary" href="#como-funciona" icon={<ArrowDown />}>
              {hero.ctaSecondary.label}
            </Button>
            <Button size="sm">{cta.acessar}</Button>
            <Button variant="ghost" href="#leitura-risco">
              Conheça os recursos
            </Button>
          </div>
          <div className="on-dark mt-4 flex flex-wrap items-center gap-4 rounded-card-lg bg-vinho-profundo p-6">
            <Button variant="on-dark" href={APP_URL} target="_blank" rel="noopener">
              {cta.acessar}
            </Button>
          </div>
        </Block>

        <Block title="Chips">
          <div className="flex flex-wrap items-center gap-3">
            <Chip icon={<ShieldCheck />}>{hero.chip}</Chip>
            {['Proteger', 'Documentar', 'Conectar', 'Transformar'].map((p) => (
              <Chip key={p} dot>
                {p}
              </Chip>
            ))}
            <Chip variant="outline">Física</Chip>
          </div>
          <div
            className="mt-4 flex flex-wrap gap-3 rounded-card-lg p-6"
            style={{ background: 'var(--grad-vinho)' }}
          >
            <Chip variant="glass" icon={<Check />}>
              Chip glass sobre gradiente
            </Chip>
            <span className="rounded-full px-3.5 py-1.5 caption text-white glass">.glass</span>
            <span className="rounded-full px-3.5 py-1.5 caption glass-light">.glass-light</span>
            <span className="rounded-full px-3.5 py-1.5 caption text-white glass-vinho">
              .glass-vinho
            </span>
          </div>
        </Block>

        <Block title="Telas codadas × telas do app">
          <p className="mb-8 max-w-[62ch] text-texto-secundario">
            À esquerda de cada par, o componente em código dentro do <code>PhoneFrame</code>; à
            direita, a tela original do protótipo. A calculadora funciona: digite{' '}
            <strong>1907</strong> e toque em <strong>=</strong>.
          </p>
          <div className="grid gap-12 lg:grid-cols-2">
            <Pair
              code={
                <PhoneFrame
                  className="w-[280px]"
                  screenClassName="bg-black"
                  label={unlocked ? a11y.altHome : undefined}
                >
                  {unlocked ? (
                    <HomeScreen />
                  ) : (
                    <CalculatorScreen mode="interactive" onUnlock={() => setUnlocked(true)} />
                  )}
                </PhoneFrame>
              }
              original={
                <img src={calcPng} alt="Tela original: calculadora" className="w-[280px]" />
              }
              caption={
                unlocked ? (
                  <button
                    type="button"
                    className="font-bold text-vinho underline"
                    onClick={() => setUnlocked(false)}
                  >
                    Voltar para a calculadora
                  </button>
                ) : (
                  'Digite 1907 e toque em ='
                )
              }
            />
            <Pair
              code={
                <PhoneFrame className="w-[280px]" label={a11y.altHome}>
                  <HomeScreen />
                </PhoneFrame>
              }
              original={
                <img src={homePng} alt="Tela original: início com SOS" className="w-[280px]" />
              }
              caption="HomeScreen"
            />
          </div>
          <div data-kit-hero-screens className="mt-12 grid gap-10">
            {(
              [
                [HomeSosScreen, homeSosPng, 'HomeSosScreen'],
                [RedeScreen, redePng, 'RedeScreen'],
                [OcorrenciasScreen, ocorrPng, 'OcorrenciasScreen'],
                [ProvaScreen, provaPng, 'ProvaScreen'],
                [HomeRiscoScreen, riscoPng, 'HomeRiscoScreen'],
                [DireitosScreen, direitosPng, 'DireitosScreen'],
              ] as const
            ).map(([S, png, name]) => (
              <Pair
                key={name}
                code={
                  <div className="w-[280px] overflow-hidden rounded-[24px] border border-borda">
                    <div className="[container-type:inline-size] aspect-[390/845] w-full">
                      <div className="h-[845px] w-[390px] origin-top-left scale-[0.718]">
                        <S />
                      </div>
                    </div>
                  </div>
                }
                original={<img src={png} alt="" className="w-[280px] rounded-[24px]" />}
                caption={name}
              />
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-end gap-6">
            {[320, 260, 200].map((w) => (
              <PhoneFrame
                key={w}
                style={{ width: w }}
                label={a11y.altCalculadora}
                screenClassName="bg-black"
              >
                <CalculatorScreen mode="auto" />
              </PhoneFrame>
            ))}
            <p className="text-small text-texto-secundario">
              A moldura escala com a largura (320, 260, 200 px).
            </p>
          </div>
        </Block>

        <Block title="Símbolo">
          <img src={simbolo} alt="Símbolo do Amparo" className="h-24 w-auto" />
        </Block>
      </main>
    </>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-20 border-t border-borda pt-10">
      <h2 className="mb-8 display-m">{title}</h2>
      {children}
    </section>
  )
}

function Pair({
  code,
  original,
  caption,
}: {
  code: ReactNode
  original: ReactNode
  caption: ReactNode
}) {
  return (
    <figure>
      <div className="flex flex-wrap items-start gap-6">
        {code}
        {original}
      </div>
      <figcaption className="mt-4 text-small text-texto-secundario">{caption}</figcaption>
    </figure>
  )
}
