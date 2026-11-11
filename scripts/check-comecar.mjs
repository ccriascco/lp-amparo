// Confere o palco de #comecar (desktop): clicar no rótulo leva ao passo, só o passo ativo fica
// interativo (inert nos outros) e só o laço do passo ativo anda. Uso: node scripts/check-comecar.mjs <url>
import { chromium } from 'playwright-core'
const url = process.argv[2] ?? 'http://localhost:5173/'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
await page.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.evaluate(() => {
  const t = document.querySelector('[data-cm-track]')
  window.__lenis.scrollTo(t.getBoundingClientRect().top + scrollY + 200, { immediate: true, force: true })
})
await page.waitForTimeout(800)
const state = () =>
  page.evaluate(async () => {
    const cards = [...document.querySelectorAll('[data-cm-card]')]
    const snap = () => cards.map((c) => [...c.querySelectorAll('[data-cm-pill],[data-cm-dot],[data-cm-row],[data-cm-check]')].map((e) => getComputedStyle(e).transform + getComputedStyle(e).opacity).join('|'))
    const a = snap()
    await new Promise((r) => setTimeout(r, 900))
    const b = snap()
    return {
      ativo: [...document.querySelectorAll('[data-cm-label]')].findIndex((l) => l.hasAttribute('data-active')) + 1,
      interativo: cards.map((c) => (c.inert ? 0 : 1)).join(''),
      lacoAndando: a.map((x, i) => (x !== b[i] ? 1 : 0)).join(''),
    }
  })
console.log('início      ', JSON.stringify(await state()))
for (const k of [3, 4, 2]) {
  await page.locator('[data-cm-label]').nth(k - 1).click()
  await page.waitForTimeout(1800)
  console.log(`clique no ${k} `, JSON.stringify(await state()))
}
console.log('erros:', errors.length ? errors : 'nenhum')
await browser.close()
