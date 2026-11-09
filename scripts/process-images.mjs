/**
 * Gera as fotos otimizadas da landing (public/images/) e os favicons (public/).
 * Fonte das fotos: assets/fotos/  ·  Uso: npm run images
 *
 * Cada slot sai em AVIF + WebP nas larguras de srcset (DESIGN.md §7.10) e um .jpg
 * de fallback com o nome do slot (DESIGN.md §8), para a troca ser só substituir o arquivo.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'assets/fotos')
const OUT = path.join(ROOT, 'public/images')
const PUB = path.join(ROOT, 'public')
const MAX_BYTES = 300 * 1024 // nenhuma foto acima de 300 KB (§7.10)
const WIDTHS = [640, 1080, 1600, 2200]

/**
 * crop: região do arquivo-fonte (px do original). Ajustado à mão para cada foto.
 * Todas as fotos ficam em assets/fotos/; as que não estão em SLOTS são alternativas (ver NOTES.md).
 */
const SLOTS = [
  // 3:4 — três amigas no banco (1024×1024)
  {
    slot: 'rede-duas-mulheres',
    file: 'rede-duas-mulheres.png',
    crop: { left: 110, top: 0, width: 768, height: 1024 },
  },
  // 3:4 — duas amigas conversando no sofá (1086×1448, já 3:4)
  { slot: 'ajudar', file: 'ajudar.png', crop: { left: 0, top: 0, width: 1086, height: 1448 } },
  // 4:5 — StatCard foto em #contexto: mulher na janela com a caneca (1122×1402, já 4:5)
  { slot: 'contexto', file: 'contexto.png', crop: { left: 0, top: 0, width: 1122, height: 1402 } },
  // 3:5 — PhotoCard (topo em pílula) em #direitos: detalhes sem rosto (originais 1122×1402)
  {
    slot: 'direitos-1',
    file: 'direitos-1.png',
    crop: { left: 150, top: 0, width: 841, height: 1402 },
  },
  {
    slot: 'direitos-2',
    file: 'direitos-2.png',
    crop: { left: 90, top: 0, width: 841, height: 1402 },
  },
  {
    slot: 'direitos-3',
    file: 'direitos-3.png',
    crop: { left: 140, top: 0, width: 841, height: 1402 },
  },
  {
    slot: 'direitos-4',
    file: 'direitos-4.png',
    crop: { left: 70, top: 0, width: 841, height: 1402 },
  },
  // 16:9 — caminhada na calçada arborizada (1672×941)
  { slot: 'cta-final', file: 'cta-final.png', crop: { left: 0, top: 0, width: 1672, height: 941 } },
  // 4:5 — recorte mobile centrado na figura (terço direito do original)
  {
    slot: 'cta-final-mobile',
    file: 'cta-final.png',
    crop: { left: 900, top: 0, width: 753, height: 941 },
  },
]

async function encode(pipeline, file, fmt) {
  // Reduz a qualidade até caber no limite de tamanho; a última tentativa é gravada de qualquer forma.
  const qualities = fmt === 'avif' ? [55, 48, 40, 34] : [78, 70, 62, 54]
  let buf
  for (const quality of qualities) {
    buf = await pipeline
      .clone()
      [fmt]({ quality, ...(fmt === 'avif' ? { effort: 6 } : {}) })
      .toBuffer()
    if (buf.length <= MAX_BYTES) break
  }
  await fs.writeFile(file, buf)
  return buf.length
}

async function photos() {
  await fs.mkdir(OUT, { recursive: true })
  // Limpa saídas antigas dos slots (sem tocar em outros arquivos, como a og-image).
  const slotFile = new RegExp(`^(${SLOTS.map((s) => s.slot).join('|')})(-\\d+)?\\.(avif|webp|jpg)$`)
  for (const f of await fs.readdir(OUT)) if (slotFile.test(f)) await fs.rm(path.join(OUT, f))
  const manifest = {}
  for (const { slot, file, crop } of SLOTS) {
    const base = sharp(path.join(SRC, file)).extract(crop)
    const widths = [...WIDTHS.filter((w) => w < crop.width), crop.width].filter(
      (w, i, a) => a.indexOf(w) === i && w <= 2200,
    )
    manifest[slot] = { width: crop.width, height: crop.height, widths }
    for (const w of widths) {
      const p = base.clone().resize({ width: w })
      const a = await encode(p, path.join(OUT, `${slot}-${w}.avif`), 'avif')
      const b = await encode(p, path.join(OUT, `${slot}-${w}.webp`), 'webp')
      console.log(
        `${slot}-${w}  avif ${(a / 1024).toFixed(0)} KB  webp ${(b / 1024).toFixed(0)} KB`,
      )
    }
    const fallbackW = Math.min(1080, crop.width)
    const jpg = await base
      .clone()
      .resize({ width: fallbackW })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer()
    await fs.writeFile(path.join(OUT, `${slot}.jpg`), jpg)
  }
  await fs.writeFile(
    path.join(ROOT, 'src/content/images.json'),
    JSON.stringify(manifest, null, 2) + '\n',
  )
}

async function favicons() {
  const svg = await fs.readFile(path.join(ROOT, 'src/assets/brand/amparo-simbolo.svg'))
  await fs.writeFile(path.join(PUB, 'favicon.svg'), svg)
  const make = async (size, pad, bg, out) => {
    const inner = await sharp(svg, { density: 600 })
      .resize({ height: Math.round(size * (1 - pad * 2)) })
      .png()
      .toBuffer()
    await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
      .composite([{ input: inner, gravity: 'center' }])
      .png()
      .toFile(path.join(PUB, out))
  }
  await make(32, 0.04, { r: 0, g: 0, b: 0, alpha: 0 }, 'favicon-32.png')
  await make(180, 0.16, '#ffffff', 'apple-touch-icon.png')
  await make(512, 0.16, '#ffffff', 'icon-512.png')
  console.log('favicons ok')
}

await fs.mkdir(path.join(ROOT, 'src/content'), { recursive: true })
await photos()
await favicons()
