import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:5173'
const browser = await chromium.launch({ headless: true })
const results = []
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile-narrow', width: 360, height: 800 },
  { name: 'mobile', width: 375, height: 812 },
  { name: 'mobile-wide', width: 390, height: 844 },
]

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  const language = await page.locator('html').getAttribute('lang')
  if (overflow) throw new Error(`${viewport.name} has horizontal overflow`)
  if (language !== 'pt-BR') throw new Error(`${viewport.name} did not default to pt-BR`)

  const contextSection = page.locator('.context-section')
  if (await contextSection.count() !== 1) throw new Error(`${viewport.name} context section missing or duplicated`)
  if (await page.locator('.hero + .context-section').count() !== 1) throw new Error(`${viewport.name} context section is not immediately after hero`)
  if (await contextSection.locator('table thead th').count() !== 3) throw new Error(`${viewport.name} context table headers missing`)
  if (await contextSection.getByText('Exemplo visual — não representa saldos ou cotações reais.').count() !== 1) throw new Error(`${viewport.name} Portuguese disclaimer missing`)
  if (viewport.width <= 390) {
    const positions = await page.evaluate(() => {
      const cta = document.querySelector('.primary-cta').getBoundingClientRect()
      const card = document.querySelector('.hero-object').getBoundingClientRect()
      const request = document.querySelector('.request-panel').getBoundingClientRect()
      const cardVisual = document.querySelector('.debit-card').getBoundingClientRect()
      return { ctaBottom: cta.bottom, cardTop: card.top, requestTop: request.top, cardLeft: cardVisual.left, cardRight: cardVisual.right, documentWidth: document.documentElement.scrollWidth }
    })
    if (positions.cardTop < positions.ctaBottom || positions.requestTop < positions.cardTop || positions.cardLeft < 0 || positions.cardRight > positions.documentWidth) {
      throw new Error(`${viewport.name} has an invalid CTA/card/form sequence or clipped card`)
    }
  }

  await page.screenshot({ path: `artifacts/${viewport.name}.png`, fullPage: true })
  results.push(`${viewport.name}: no horizontal overflow, Portuguese default`)
  await page.close()
}

async function clearStorage(page) {
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'networkidle' })
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(baseUrl, { waitUntil: 'networkidle' })
await clearStorage(page)
if (await page.title() !== 'FlowBank — Beta privada') throw new Error('Portuguese document title missing')

await page.getByRole('button', { name: 'EN' }).click()
if (await page.locator('html').getAttribute('lang') !== 'en') throw new Error('Language switch did not set English document language')
if (await page.title() !== 'FlowBank — Private beta') throw new Error('English document title missing')
if (!(await page.getByRole('button', { name: 'Request beta access' }).isVisible())) throw new Error('English CTA missing')
await page.getByRole('button', { name: 'Request beta access' }).click()
await page.waitForTimeout(350)
if (await page.evaluate(() => document.activeElement?.id) !== 'email') throw new Error('English CTA did not focus email input')
if (!(await page.getByLabel('Your best email').isVisible())) throw new Error('English email label missing')
await page.getByLabel('Your best email').fill('invalid')
await page.getByRole('button', { name: 'Save request in this browser' }).click()
if (!(await page.getByRole('alert').getByText('Enter a valid email to continue.').isVisible())) throw new Error('English invalid email feedback missing')
await page.getByLabel('Your best email').fill('english@example.com')
await page.getByRole('button', { name: 'Save request in this browser' }).click()
if (!(await page.getByText('Request saved in this browser.').isVisible())) throw new Error('English local-only success message missing')
if (!(await page.getByText('Local prototype: this request is not sent to FlowBank and is saved only in this browser.').isVisible())) throw new Error('English local-only disclosure missing')
if (!(await page.evaluate(() => localStorage.getItem('flowbank-beta-request')))?.includes('english@example.com')) throw new Error('English local request was not persisted')

await clearStorage(page)
await page.getByRole('button', { name: 'PT' }).click()
if (await page.locator('html').getAttribute('lang') !== 'pt-BR') throw new Error('Language switch did not return to Portuguese')
if (await page.title() !== 'FlowBank — Beta privada') throw new Error('Portuguese title did not return')
await page.getByRole('button', { name: 'Solicitar acesso à beta' }).focus()
if (await page.evaluate(() => document.activeElement?.className) !== 'primary-cta') throw new Error('Primary CTA is not keyboard focusable')
await page.keyboard.press('Enter')
await page.waitForTimeout(350)
if (await page.evaluate(() => document.activeElement?.id) !== 'email') throw new Error('Portuguese keyboard CTA did not focus email input')
await page.getByLabel('Seu melhor e-mail').fill('invalido')
await page.getByRole('button', { name: 'Salvar pedido neste navegador' }).click()
if (!(await page.getByRole('alert').getByText('Informe um e-mail válido para continuar.').isVisible())) throw new Error('Portuguese invalid email feedback missing')
await page.getByLabel('Seu melhor e-mail').fill('teste@exemplo.com')
await page.getByRole('button', { name: 'Salvar pedido neste navegador' }).click()
if (!(await page.getByText('Pedido salvo neste navegador.').isVisible())) throw new Error('Portuguese local-only success message missing')
if (!(await page.getByText('Protótipo local: este pedido não é enviado para a FlowBank e fica salvo apenas neste navegador.').isVisible())) throw new Error('Portuguese local-only disclosure missing')
await page.locator('.context-section').getByRole('button').count().then((count) => { if (count !== 0) throw new Error('Context record contains unexpected interactive buttons') })
await page.getByRole('button', { name: 'EN' }).click()
if (!(await page.getByText('Visual example — no real balances or rates shown.').isVisible())) throw new Error('English context disclaimer missing')
if (!(await page.getByText('Context record').isVisible())) throw new Error('English context title missing')
if (!(await page.locator('.context-section').getByText('planning').isVisible())) throw new Error('English context row missing')

const journey = page.locator('.money-journey')
if (await journey.count() !== 1) throw new Error('Money Journey section missing or duplicated')
if (await page.locator('.context-section + .money-journey').count() !== 1) throw new Error('Money Journey is not immediately after Context Ledger')
if (await journey.locator('h2').count() !== 1) throw new Error('Money Journey heading missing')
if (await journey.locator('ol > li').count() !== 3) throw new Error('Money Journey does not contain exactly three markers')
if (await journey.locator('svg[aria-hidden="true"]').count() !== 1) throw new Error('Money Journey route SVG is not decorative')
if (await journey.locator('button, a, input, select, textarea').count() !== 0) throw new Error('Money Journey contains unexpected interactive controls')
if (!(await journey.getByText('Illustrative context example — not an active account.').isVisible())) throw new Error('English journey note missing')
if (!(await journey.getByText('The journey changes. Clarity remains.').isVisible())) throw new Error('English journey closing missing')
await page.getByRole('button', { name: 'PT' }).click()
if (!(await page.locator('.money-journey').getByText('O percurso', { exact: true }).isVisible())) throw new Error('Portuguese journey label missing after switch')
if (!(await page.locator('.money-journey').getByText('Planejamento').isVisible())) throw new Error('Portuguese journey marker missing after switch')
if (!(await page.locator('.money-journey').getByText('Exemplo visual de contexto — não representa uma conta ativa.').isVisible())) throw new Error('Portuguese journey note missing')
if (!(await page.locator('.money-journey').getByText('O percurso muda. A clareza permanece.').isVisible())) throw new Error('Portuguese journey closing missing')

const viewportWidth = await page.evaluate(() => window.innerWidth)
const journeyBounds = await journey.evaluate((section) => {
  const rect = section.getBoundingClientRect()
  const svg = section.querySelector('svg').getBoundingClientRect()
  const markers = [...section.querySelectorAll('li')].map((item) => item.getBoundingClientRect())
  return { sectionLeft: rect.left, sectionRight: rect.right, svgLeft: svg.left, svgRight: svg.right, markers }
})
if (journeyBounds.svgLeft < 0 || journeyBounds.svgRight > viewportWidth) throw new Error('Journey route exceeds viewport bounds')
for (const marker of journeyBounds.markers) {
  if (marker.left < 0 || marker.right > viewportWidth) throw new Error('Journey marker exceeds viewport bounds')
}
await page.getByRole('button', { name: 'PT' }).click()
if (!(await page.evaluate(() => localStorage.getItem('flowbank-beta-request')))?.includes('teste@exemplo.com')) throw new Error('Portuguese local request was not persisted')
results.push('interaction: full PT/EN copy, keyboard CTA focus, translated validation, local-only success, localStorage')

const reducedPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
await reducedPage.goto(baseUrl, { waitUntil: 'networkidle' })
await clearStorage(reducedPage)
const animation = await reducedPage.locator('.hero-object').evaluate((element) => getComputedStyle(element).animationName)
const scrollBehavior = await reducedPage.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)
if (animation !== 'none') throw new Error(`Reduced motion still has animation: ${animation}`)
if (scrollBehavior !== 'auto') throw new Error(`Reduced motion still has smooth scrolling: ${scrollBehavior}`)
await reducedPage.getByRole('button', { name: 'Solicitar acesso à beta' }).click()
await reducedPage.waitForTimeout(25)
if (await reducedPage.evaluate(() => document.activeElement?.id) !== 'email') throw new Error('Reduced-motion CTA did not immediately focus email input')
results.push('reduced motion: no entrance animation, automatic scroll behavior, immediate CTA focus')

await reducedPage.close()
await page.close()
await browser.close()
console.log(results.join('\n'))
