// Mede sobreposição entre pílulas legíveis (opacidade > 0.5) da #leitura-risco durante ~30s.
// Uso: node scripts/check-pills.mjs <url> [larguras]
import { chromium } from 'playwright-core'
const url = process.argv[2] ?? 'http://localhost:5173/'
const widths = (process.argv[3] ?? '1440,1024,390').split(',').map(Number)
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 768 ? 844 : 900 } })
  await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.evaluate(() => {
    const el = document.querySelector('[data-lr-stage]')
    const y = el.getBoundingClientRect().top + scrollY - (innerHeight - el.offsetHeight) / 2
    window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y)
  })
  await page.waitForTimeout(800)
  const res = await page.evaluate(async () => {
    const pills = [...document.querySelectorAll('[data-lr-pill]')]
    let frames = 0, bad = 0, worst = 0
    for (let k = 0; k < 120; k++) {
      await new Promise((r) => setTimeout(r, 250))
      frames++
      const vis = pills.map((p) => ({ r: p.getBoundingClientRect(), o: +getComputedStyle(p).opacity }))
        .filter((v) => v.o > 0.5)
      let hit = false
      for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
        const a = vis[i].r, b = vis[j].r
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left)
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
        if (ox > 0 && oy > 0) { hit = true; worst = Math.max(worst, ox * oy) }
      }
      if (hit) bad++
    }
    return { frames, bad, worst: Math.round(worst), n: pills.length }
  })
  console.log(`${w}px: ${res.n} pílulas, ${res.bad}/${res.frames} quadros com sobreposição legível (pior ${res.worst}px²)`)
  await page.close()
}
await browser.close()
