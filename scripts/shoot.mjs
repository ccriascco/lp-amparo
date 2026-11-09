/**
 * Screenshots da landing com o Chrome instalado (playwright-core).
 * Uso: node scripts/shoot.mjs <url> <saida-dir> [larguras=360,768,1280] [--full] [--selector=css]
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright-core'

const [url, outDir, widthsArg = '360,768,1280', ...flags] = process.argv.slice(2)
if (!url || !outDir)
  throw new Error(
    'uso: node scripts/shoot.mjs <url> <saida-dir> [larguras] [--full] [--selector=css]',
  )
const full = flags.includes('--full')
const selector = flags.find((f) => f.startsWith('--selector='))?.slice(11)
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

await fs.mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME })
for (const w of widthsArg.split(',').map(Number)) {
  const page = await browser.newPage({
    viewport: { width: w, height: w < 768 ? 780 : 900 },
    deviceScaleFactor: 2,
  })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  const file = path.join(outDir, `${w}.png`)
  if (selector) await page.locator(selector).first().screenshot({ path: file })
  else await page.screenshot({ path: file, fullPage: full })
  console.log(
    `${w}px → ${file}  overflow-x: ${overflow}px${errors.length ? '  ERROS: ' + errors.join(' | ') : ''}`,
  )
  await page.close()
}
await browser.close()
