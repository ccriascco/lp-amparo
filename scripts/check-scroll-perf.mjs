// Mede a fluidez da rolagem (para baixo e para cima) num trecho da página, com CPU 4× mais lenta.
// Uso: node scripts/check-scroll-perf.mjs <url> <seletor> [largura]
// Rola do ponto em que o topo do elemento está no fim da tela até ele chegar ao topo, e volta.
import { chromium } from 'playwright-core'
const url = process.argv[2] ?? 'http://localhost:5173/'
const sel = process.argv[3] ?? '#como-funciona'
const w = Number(process.argv[4] ?? 1440)
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME, args: ['--enable-gpu-rasterization'] })
const page = await browser.newPage({ viewport: { width: w, height: w < 768 ? 844 : 900 } })
await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const cdp = await page.context().newCDPSession(page)
const [a, b] = await page.evaluate((sel) => {
  const top = document.querySelector(sel).getBoundingClientRect().top + scrollY
  return [top - innerHeight - 200, top + 200]
}, sel)
const run = (from, to) =>
  page.evaluate(
    async ([from, to]) => {
      window.__lenis.scrollTo(from, { immediate: true, force: true })
      await new Promise((r) => setTimeout(r, 600))
      const times = []
      let last = performance.now()
      let go = true
      const loop = (t) => {
        times.push(t - last)
        last = t
        if (go) requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
      // Rolagem como a de uma roda: passos de 120px a cada 60ms, passando pelo Lenis.
      const dir = Math.sign(to - from)
      for (let y = from; dir > 0 ? y < to : y > to; y += dir * 120) {
        window.__lenis.scrollTo(y, { lerp: 0.085 })
        await new Promise((r) => setTimeout(r, 60))
      }
      await new Promise((r) => setTimeout(r, 1200))
      go = false
      times.shift()
      const s = [...times].sort((x, y) => x - y)
      const med = s[Math.floor(s.length / 2)]
      const p95 = s[Math.floor(s.length * 0.95)]
      const long = times.filter((t) => t > 33).length
      return { frames: times.length, fpsMed: Math.round(1000 / med), p95: Math.round(p95), long }
    },
    [from, to],
  )
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
const down = await run(a, b)
const up = await run(b, a)
console.log(`${w}px ${sel} CPU 4×`)
console.log('  descendo:', JSON.stringify(down))
console.log('  subindo: ', JSON.stringify(up))
await browser.close()
