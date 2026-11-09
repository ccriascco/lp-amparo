/**
 * Gera os SVGs da marca a partir do vetor original (src/assets/brand/LogoAmparo1.svg).
 * Uso: node scripts/build-logos.mjs
 *
 * O original tem fundo #F6F2F0, vinho #9F5773 e os "furos" das letras pintados com a cor
 * do fundo. Aqui: furos viram vazados (evenodd), cor = token vinho (#954B6E), fundo removido.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BRAND = path.join(ROOT, 'src/assets/brand')
const VINHO = '#954B6E'
const BRANCO = '#FFFFFF'

const src = await fs.readFile(path.join(BRAND, 'LogoAmparo1.svg'), 'utf8')
const paths = [...src.matchAll(/<path d="([^"]+)" fill="([^"]+)"\/>/g)].map((m) => ({
  d: m[1],
  fill: m[2],
}))
const P = (i) => paths[i].d

// Índices conferidos à mão (ordem do arquivo original):
// 0 fundo · 1 gota esq. · 2 filete claro · 3 gota dir. · 4 curva inferior · 9 círculo
// letras: 7 A (+8 furo) · 14 m · 5 p (+6 furo) · 10 a (+11 furo) · 15 r · 12 o (+13 furo)
if (paths.length !== 16 || paths[0].fill !== '#F6F2F0')
  throw new Error('Estrutura do SVG original mudou')

const simbolo = [P(1), P(3), P(4), P(9)].join(' ')
const wordmark = [P(7) + P(8), P(14), P(5) + P(6), P(10) + P(11), P(15), P(12) + P(13)].join(' ')

// Caixas (coordenadas do original, 1024×1024)
const SIM = { x: 336, y: 171, w: 369, h: 456 }
const WORD = { x: 191, y: 617, w: 654, h: 169 } // "Amparo" com a descendente do p
const CAP = { top: 617, base: 749 } // altura do "A"

const svg = (viewBox, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`
const path_ = (d, fill, transform = '') =>
  `<path fill="${fill}" fill-rule="evenodd"${transform ? ` transform="${transform}"` : ''} d="${d}"/>`

async function write(name, content) {
  await fs.writeFile(path.join(BRAND, name), content)
  console.log(name, content.length, 'bytes')
}

// Símbolo
for (const [suffix, fill] of [
  ['', VINHO],
  ['-branco', BRANCO],
]) {
  await write(
    `amparo-simbolo${suffix}.svg`,
    svg(`${SIM.x} ${SIM.y} ${SIM.w} ${SIM.h}`, path_(simbolo, fill), 'Amparo'),
  )
}

// Vertical (layout do original, sem fundo)
{
  const pad = 8
  const x0 = WORD.x - pad
  const y0 = SIM.y - pad
  const w = WORD.w + pad * 2
  const h = WORD.y + WORD.h - SIM.y + pad * 2
  await write(
    'amparo-logo-vertical.svg',
    svg(`${x0} ${y0} ${w} ${h}`, path_(simbolo, VINHO) + path_(wordmark, VINHO), 'Amparo'),
  )
}

// Horizontal: proporções medidas no PNG horizontal do kit
//   altura do símbolo ≈ 2,42 × altura do "A"; base do símbolo ≈ 0,32 × A abaixo da linha de base;
//   espaço entre símbolo e "A" ≈ 0,32 × A.
{
  const capH = CAP.base - CAP.top
  const s = (2.42 * capH) / SIM.h
  const gap = 0.32 * capH
  const symBottom = CAP.base + 0.32 * capH
  const tx = WORD.x - gap - SIM.w * s - SIM.x * s
  const ty = symBottom - (SIM.y + SIM.h) * s
  const left = WORD.x - gap - SIM.w * s
  const top = symBottom - SIM.h * s
  const right = WORD.x + WORD.w
  const bottom = Math.max(symBottom, WORD.y + WORD.h)
  const vb = [left, top, right - left, bottom - top].map((n) => +n.toFixed(2)).join(' ')
  const t = `matrix(${s.toFixed(5)} 0 0 ${s.toFixed(5)} ${tx.toFixed(2)} ${ty.toFixed(2)})`
  for (const [suffix, fill] of [
    ['', VINHO],
    ['-branco', BRANCO],
  ]) {
    await write(
      `amparo-logo-horizontal${suffix}.svg`,
      svg(vb, path_(simbolo, fill, t) + path_(wordmark, fill), 'Amparo'),
    )
  }
}
