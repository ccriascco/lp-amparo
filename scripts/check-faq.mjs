// Confere o FAQ em conversa (#faq): 1ª aberta, digitação, só uma aberta, teclado e JSON-LD; e fotografa.
// Uso: node scripts/check-faq.mjs <url> <pasta>
import { chromium } from 'playwright-core'
const url = process.argv[2] ?? 'http://localhost:5173/'
const out = process.argv[3] ?? 'screenshots/faq'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const b = await chromium.launch({ executablePath: CHROME })
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } })
  const errs = []
  p.on('pageerror', (e) => errs.push(e.message))
  await p.addInitScript(() => sessionStorage.setItem('amparo:preloader', '1'))
  await p.goto(url, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  const go = (sel) => p.evaluate((sel) => { const y = document.querySelector(sel).getBoundingClientRect().top + scrollY - 20; const from = scrollY; return new Promise(async (res) => { for (let i = 1; i <= 20; i++) { window.__lenis.scrollTo(from + ((y - from) * i) / 20, { immediate: true, force: true }); await new Promise((r) => setTimeout(r, 30)) } res() }) }, sel)
  const state = () => p.evaluate(() => [...document.querySelectorAll('#faq [data-faq-q]')].map((q) => (q.getAttribute('aria-expanded') === 'true' ? 1 : 0)).join(''))
  await go('#faq'); await p.waitForTimeout(1500)
  console.log(w, 'inicial', await state())
  await p.screenshot({ path: `${out}/${w}-pergunta-1.png`, fullPage: false })
  const q4 = p.locator('#faq [data-faq-q]').nth(3)
  await q4.click(); await p.waitForTimeout(300)
  const digitando = await p.evaluate(() => getComputedStyle(document.querySelectorAll('#faq [data-faq-typing]')[3]).display !== 'none')
  await p.waitForTimeout(1200)
  console.log(w, 'clique na 4', await state(), 'digitação apareceu:', digitando)
  await p.evaluate(() => { const el = document.querySelectorAll('#faq [data-faq-q]')[3]; window.__lenis.scrollTo(el.getBoundingClientRect().top + scrollY - 200, { immediate: true, force: true }) }); await p.waitForTimeout(600)
  await p.screenshot({ path: `${out}/${w}-pergunta-4.png` })
  if (w === 1440) {
    await p.locator('#faq [data-faq-q]').nth(5).focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(1300)
    console.log(w, 'Enter na 6', await state())
    await p.keyboard.press(' '); await p.waitForTimeout(600)
    console.log(w, 'Espaço na 6 (fecha)', await state())
    const ld = await p.evaluate(() => JSON.parse(document.querySelector('#faq script[type="application/ld+json"]').textContent).mainEntity.length)
    console.log(w, 'JSON-LD perguntas:', ld)
  }
  console.log(w, 'erros:', errs.length ? errs : 'nenhum')
  await p.close()
}
await b.close()
