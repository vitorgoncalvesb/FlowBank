import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Check, Globe2, LockKeyhole, Send, ShieldCheck, Sparkles, Sun } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const iconProps = { size: 18, strokeWidth: 1.8, 'aria-hidden': true as const }

function IconArrow() { return <ArrowUpRight {...iconProps} /> }
function IconMark() { return <Sparkles {...iconProps} size={16} /> }

const icons = { arrow: <IconArrow />, mark: <IconMark /> }

/* Keep decorative icons in one place so the visual language stays consistent. */

function Arrow() { return <span className="icon-inline">{icons.arrow}</span> }
function Mark() { return null }

function PremiumIcon({ name }: { name: 'globe' | 'send' | 'spark' }) {
  const Icon = name === 'globe' ? Globe2 : name === 'send' ? Send : Sparkles
  return <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
}

function PlatformIcon({ name }: { name: 'apple' | 'android' | 'web' }) {
  const sources = {
    apple: '/assets/platforms/apple-app-store.png',
    android: '/assets/platforms/google-play-store.png',
    web: '/assets/platforms/web-extension.svg',
  }

  return <img className={`platform-brand-icon platform-brand-${name}`} src={sources[name]} alt="" aria-hidden="true" />
}

function SecurityIcon() { return <ShieldCheck size={23} strokeWidth={1.6} aria-hidden="true" /> }
function LockIcon() { return <LockKeyhole size={30} strokeWidth={1.5} aria-hidden="true" /> }
function CheckIcon() { return <Check size={18} strokeWidth={2} aria-hidden="true" /> }
function SunIcon() { return <Sun size={15} strokeWidth={1.6} aria-hidden="true" /> }
function DownIcon() { return <ArrowDown size={16} strokeWidth={1.7} aria-hidden="true" /> }
function PrevIcon() { return <ArrowLeft size={17} strokeWidth={1.7} aria-hidden="true" /> }
function NextIcon() { return <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" /> }

/* The page uses Lucide for crisp, coherent iconography at every size. */

type Testimonial = { quote: string; name: string; role: string; initials: string }

const testimonials: Testimonial[] = [
  { quote: 'FlowBank made my move to Lisbon feel less like a financial project and more like a fresh start.', name: 'Maya Chen', role: 'Product designer · Singapore → Lisbon', initials: 'MC' },
  { quote: 'I stopped thinking about exchange rates. That is exactly what a travel card should do.', name: 'Jon Bell', role: 'Founder · London', initials: 'JB' },
  { quote: 'The budget view is the first one I have actually kept using. Simple, calm, and useful.', name: 'Sara Okafor', role: 'Architect · Nairobi', initials: 'SO' },
]

const copy = {
  en: {
    heroKicker: 'The global money app', heroTitle: <>Spend anywhere.<br /><em>Zero FX fees.</em></>, heroText: 'One card for every currency, every border, and every version of your life. FlowBank makes global money feel local.', getCard: 'Get your free card', seeHow: 'See how it works', waitlistPeople: <>Join <strong>18,000+</strong> people on the waitlist</>,
    productKicker: 'A better way to move', productTitle: <>Money that keeps<br />up with <em>you.</em></>, productText: 'From your morning coffee to your next continent, FlowBank gives you one clear view of your money — without the old-world friction.',
    featureKicker: 'Made for everywhere', featureTitle: <>The essentials,<br /><em>rethought.</em></>,
    platformKicker: 'Your money, your way', platformTitle: <>One account.<br /><em>Every screen.</em></>, platformText: 'Pick up where you left off — on your phone, your laptop, or wherever your day takes you.',
    securityKicker: 'Quietly protected', securityTitle: <>Your money<br />is <em>safe here.</em></>, securityText: 'We use bank-level encryption and trusted partners so you can focus on the places you are going.',
    waitTitle: <>The world is<br /><em>waiting.</em></>, waitText: 'Be first in line for a smarter way to spend, save, and move globally.', email: 'Your email address', placeholder: 'you@example.com', join: 'Join the waitlist', noSpam: 'No spam. Just a better way to bank.',
  },
  'pt-BR': {
    heroKicker: 'A app global de dinheiro', heroTitle: <>Gaste em qualquer lugar.<br /><em>Sem taxas de câmbio.</em></>, heroText: 'Um cartão para cada moeda, fronteira e versão da sua vida. A FlowBank torna o dinheiro global local.', getCard: 'Peça o seu cartão grátis', seeHow: 'Veja como funciona', waitlistPeople: <>Junte-se a <strong>18.000+</strong> pessoas na lista</>,
    productKicker: 'Uma forma melhor de se mover', productTitle: <>Dinheiro que acompanha<br /><em>você.</em></>, productText: 'Do café da manhã ao próximo continente, a FlowBank oferece uma visão clara do seu dinheiro — sem a burocracia de sempre.',
    featureKicker: 'Feito para todos os lugares', featureTitle: <>O essencial,<br /><em>repensado.</em></>,
    platformKicker: 'O seu dinheiro, do seu jeito', platformTitle: <>Uma conta.<br /><em>Todos os ecrãs.</em></>, platformText: 'Continue de onde parou — no telemóvel, computador ou onde quer que o seu dia aconteça.',
    securityKicker: 'Proteção silenciosa', securityTitle: <>O seu dinheiro<br /><em>está seguro.</em></>, securityText: 'Usamos encriptação bancária e parceiros de confiança para que se concentre nos lugares para onde vai.',
    waitTitle: <>O mundo está<br /><em>à espera.</em></>, waitText: 'Seja dos primeiros a conhecer uma forma mais inteligente de gastar, poupar e movimentar dinheiro.', email: 'O seu email', placeholder: 'voce@exemplo.com', join: 'Entrar na lista', noSpam: 'Sem spam. Apenas uma forma melhor de fazer banking.',
  },
} as const

export default function App() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isPortuguese = false
  const emailInputRef = useRef<HTMLInputElement>(null)
  const t = copy.en
  const localizedTestimonials = testimonials
  const [submitted, setSubmitted] = useState(false)
  const [cookieChoice, setCookieChoice] = useState<'accepted' | 'rejected' | null>(() => {
    try { return (localStorage.getItem('flowbank-cookie-choice') as 'accepted' | 'rejected' | null) } catch { return null }
  })
  const [showCookiePreferences, setShowCookiePreferences] = useState(false)
  const [consent, setConsent] = useState(false)
  const [testimonial, setTestimonial] = useState(0)
  const current = localizedTestimonials[testimonial]
  const appRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const sections = '.product, .features, .platforms, .proof'
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(`${sections}, .card-stack, .note-top, .note-bottom, .art-caption, .waitlist-visual img`, { opacity: 1, y: 0, yPercent: 0, scale: 1, rotation: 0, clearProps: 'transform' })
        gsap.set('.scroll-progress', { scaleX: 0 })
      })

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.app-shell', start: 'top top', end: 'bottom bottom', scrub: 0.2 } })

        gsap.to('.nav', { height: 72, backgroundColor: '#0d0d0ff5', scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=160', scrub: true } })

        gsap.from('.logo-strip > *', { opacity: 0, x: -12, duration: 0.5, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: '.logo-strip', start: 'top 85%', once: true } })

        const heroParallax = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        heroParallax
          .fromTo('.card-stack', { rotation: -12 }, { rotation: -8, yPercent: -10, ease: 'none' }, 0)
          .to('.note-top', { yPercent: -18, ease: 'none' }, 0)
          .to('.note-bottom', { yPercent: 12, ease: 'none' }, 0)
          .to('.art-caption', { yPercent: -8, opacity: 0.45, ease: 'none' }, 0)

        gsap.utils.toArray<HTMLElement>(sections).forEach((section) => {
          gsap.fromTo(section,
            { opacity: 0, y: 18, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                once: true,
                invalidateOnRefresh: true,
              },
            },
          )
        })

        gsap.from('.feature-grid article', {
          opacity: 0,
          y: 28,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.feature-grid', start: 'top 82%', once: true },
        })

        gsap.from('.platform-list a', {
          opacity: 0,
          x: 24,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.platform-list', start: 'top 82%', once: true },
        })

        gsap.from('.dashboard-card > *', {
          opacity: 0,
          y: 14,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.dashboard-card', start: 'top 78%', once: true },
        })

        gsap.from('.phone', {
          opacity: 0,
          y: 40,
          rotate: 3,
          duration: 0.9,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.platform-visual', start: 'top 82%', once: true },
        })

        gsap.from('.waitlist-content > *', {
          opacity: 0,
          y: 22,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.waitlist', start: 'top 78%', once: true },
        })

        gsap.to('.pulse', {
          scale: 1.35,
          opacity: 0.55,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.utils.toArray<HTMLElement>('.feature-icon').forEach((icon) => {
          gsap.to(icon, {
            rotate: 4,
            y: -3,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 0.4,
          })
        })

        gsap.utils.toArray<HTMLElement>('.chart span, .phone-chart i').forEach((bar) => {
          gsap.fromTo(bar, { scaleY: 0.7 }, {
            scaleY: 1,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 0.7,
            transformOrigin: 'bottom center',
          })
        })

        gsap.from('.progress i', { scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.dashboard-card', start: 'top 78%', once: true } })
        gsap.from('.currency-row > div', { opacity: 0, y: 10, duration: 0.4, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.currency-row', start: 'top 85%', once: true } })

        gsap.utils.toArray<HTMLElement>('.feature-grid article').forEach((card) => {
          const icon = card.querySelector('.feature-icon')
          const arrow = card.querySelector('.icon-inline')
          card.addEventListener('mouseenter', () => gsap.to(card, { y: -6, duration: 0.25, ease: 'power2.out' }))
          card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.35, ease: 'power2.out' }))
          if (icon) card.addEventListener('mouseenter', () => gsap.to(icon, { y: -3, scale: 1.06, duration: 0.25 }))
          if (arrow) card.addEventListener('mouseenter', () => gsap.to(arrow, { x: 4, duration: 0.2 }))
        })

        gsap.from('.security-content', { opacity: 0, x: 24, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.security-content', start: 'top 82%', once: true } })

        gsap.fromTo('.success-message', { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
      })
    }, appRef)

    return () => context.revert()
  }, [])


  function submitWaitlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim() || !consent) {
      emailInputRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 650)
  }

  return (
    <div ref={appRef} className={`app-shell ${isPortuguese ? 'is-pt' : 'is-en'}`}>

      <header className="nav">
        <a className="brand" href="#top" aria-label="FlowBank home"><img className="flowbank-logo navbar-logo" src="/assets/brand/logoFlowBankSimpleVersion.png" alt="FlowBank" /></a>
        <nav aria-label={isPortuguese ? 'Navegação principal' : 'Main navigation'}><a href="#product">{isPortuguese ? 'Produto' : 'Product'}</a><a href="#features">{isPortuguese ? 'Funcionalidades' : 'Features'}</a><a href="#security">{isPortuguese ? 'Segurança' : 'Security'}</a></nav>
        <div className="nav-actions"><a className="nav-cta" href="#waitlist">Join the waitlist <Arrow /></a></div>
      </header>

      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main id="main-content">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="kicker"><span className="pulse" /> {t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions"><a className="button button-primary" href="#waitlist">{t.getCard} <Arrow /></a><a className="text-link" href="#product">{t.seeHow} <span><DownIcon /></span></a></div>
            <div className="trust-row"><div className="avatars"><span>AM</span><span>JK</span><span>RS</span><span>+</span></div><p>{isPortuguese ? 'Junte-se a' : 'Join'} <strong>18,000+</strong> {isPortuguese ? 'pessoas na lista' : 'people on the waitlist'}</p></div>
          </div>
          <div className="hero-art" aria-label="FlowBank card preview">
            <div className="card-stack"><div className="card-back" /><article className="bank-card"><div className="bank-card-inner"><div className="bank-card-face bank-card-front"><div className="card-glow" /><div className="card-top"><span className="card-brand"><img className="flowbank-logo card-logo" src="/assets/brand/logoFlowBank.webp" alt="FlowBank" /></span><span className="card-type">VISA <small>DEBIT</small></span></div><div className="card-middle"><div className="card-chip"><span /><span /><span /><span /></div><span className="contactless" aria-label="Contactless payment">)))</span></div><div className="card-number">••••  ••••  ••••  2048</div><div className="card-bottom"><span>YOUR NAME</span><span className="card-sig">FLOW<span>∞</span></span></div></div><div className="bank-card-face bank-card-back distinctive-back"><span className="back-stripe" /><div className="back-content"><span className="back-label">FLOWBANK / 2026</span><strong>YOUR MONEY.<br />WITHOUT BORDERS.</strong><span className="back-chip" /><span className="back-meta">SECURE GLOBAL ACCOUNT</span></div></div></div></article></div>
            <div className="float-note note-top"><span className="note-icon green"><ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" /></span><div><strong>{isPortuguese ? 'Recarga concluída' : 'Top up complete'}</strong><small>+ €500,00 · {isPortuguese ? 'agora' : 'just now'}</small></div></div>
            <div className="float-note note-bottom"><span className="note-icon purple">$</span><div><strong>{isPortuguese ? 'Pago em USD' : 'Paid in USD'}</strong><small>{isPortuguese ? 'Sem taxa de conversão' : 'No conversion fee'}</small></div></div>
            <div className="art-caption">{isPortuguese ? 'O seu dinheiro, em mais lugares.' : 'Your money, in more places.'}</div>
          </div>
        </section>

        <div className="logo-strip"><span>{isPortuguese ? 'De confiança para quem segue em frente' : 'Trusted by people moving forward'}</span><strong>WANDERLUST</strong><strong>northstar</strong><strong>◎ monzo</strong><strong>orbit</strong></div>

        <section className="product section-wrap" id="product">
          <div className="section-intro"><p className="kicker">{t.productKicker}</p><h2>{t.productTitle}</h2><p>{t.productText}</p></div>
          <div className="dashboard-card"><div className="dash-top"><span>{isPortuguese ? 'Bom dia, Maya' : 'Good morning, Maya'} <span className="sun"><SunIcon /></span></span><span className="menu-dots">•••</span></div><div className="balance-label">{isPortuguese ? 'Saldo total' : 'Total balance'} <span>⌁</span></div><div className="balance">$12,480<small>.50</small></div><div className="balance-change">↗ 12,4% <span>{isPortuguese ? 'este mês' : 'this month'}</span></div><div className="currency-row"><div><span className="coin usd">$</span><strong>USD</strong><small> $8,210.00</small></div><div><span className="coin eur">€</span><strong>EUR</strong><small> €3,920.50</small></div><div><span className="coin gbp">£</span><strong>GBP</strong><small> £350.00</small></div></div><div className="spend-row"><span>{isPortuguese ? 'Gastos deste mês' : 'Spending this month'}</span><strong>$2.840 <small>{isPortuguese ? 'de' : 'of'} $4.000</small></strong></div><div className="progress"><i /></div><div className="chart"><span style={{height:'38%'}} /><span style={{height:'54%'}} /><span style={{height:'46%'}} /><span style={{height:'74%'}} /><span style={{height:'61%'}} /><span className="active" style={{height:'88%'}} /><span style={{height:'68%'}} /><span style={{height:'96%'}} /><span style={{height:'76%'}} /></div></div>
        </section>

        <section className="features section-wrap" id="features"><div className="feature-heading"><p className="kicker">{t.featureKicker}</p><h2>{t.featureTitle}</h2></div><div className="feature-grid"><article><div className="feature-icon icon-globe"><PremiumIcon name="globe" /></div><h3>{isPortuguese ? 'Sem taxas de câmbio' : 'Zero FX fees'}</h3><p>{isPortuguese ? 'Gaste em mais de 150 moedas à taxa de câmbio real. Sem margens escondidas.' : 'Spend in 150+ currencies at the real exchange rate. We never add a markup.'}</p><a href="#waitlist">{isPortuguese ? 'Saiba mais' : 'Learn more'} <Arrow /></a></article><article><div className="feature-icon icon-send"><PremiumIcon name="send" /></div><h3>{isPortuguese ? 'Além-fronteiras em segundos' : 'Cross-border in seconds'}</h3><p>{isPortuguese ? 'Envie dinheiro para amigos, família e equipas em mais de 40 países, na hora.' : 'Send money to friends, family, and teams in 40+ countries, instantly.'}</p><a href="#waitlist">{isPortuguese ? 'Saiba mais' : 'Learn more'} <Arrow /></a></article><article><div className="feature-icon icon-spark"><PremiumIcon name="spark" /></div><h3>{isPortuguese ? 'Orçamentos que antecipam' : 'Budgets that think ahead'}</h3><p>{isPortuguese ? 'Categorias inteligentes e alertas suaves ajudam a gastar com intenção.' : 'Smart categories and gentle nudges help you spend with intention, not anxiety.'}</p><a href="#waitlist">{isPortuguese ? 'Saiba mais' : 'Learn more'} <Arrow /></a></article></div></section>

        <section className="platforms section-wrap"><div className="platform-copy"><p className="kicker">{t.platformKicker}</p><h2>{t.platformTitle}</h2><p>{t.platformText}</p></div><div className="platform-visual" aria-label="FlowBank mobile app preview"><div className="phone"><div className="phone-speaker" /><div className="phone-screen"><div className="phone-status"><span>9:41</span><span>•••</span></div><div className="phone-greeting">{isPortuguese ? 'Bom dia, Maya' : 'Good morning, Maya'} <span>☀</span></div><small>{isPortuguese ? 'Saldo total' : 'Total balance'}</small><strong>$12,480<sup>.50</sup></strong><div className="phone-change">↗ 12,4% {isPortuguese ? 'este mês' : 'this month'}</div><div className="phone-chart"><i /><i /><i /><i /><i /><i /><i /></div><div className="phone-divider" /><div className="phone-row"><span className="phone-coin">$</span><span><b>USD</b><small>{isPortuguese ? 'Saldo disponível' : 'Available balance'}</small></span><strong>$8,210</strong></div><div className="phone-row"><span className="phone-coin eur">€</span><span><b>EUR</b><small>{isPortuguese ? 'Saldo disponível' : 'Available balance'}</small></span><strong>€3,920</strong></div><div className="phone-nav"><span>⌂</span><span>◌</span><span className="active">◈</span><span>◯</span></div></div></div></div><div className="platform-list"><a href="#waitlist"><span className="platform-icon"><PlatformIcon name="apple" /></span><span><small>Download on the</small><strong>App Store</strong></span><Arrow /></a><a href="#waitlist"><span className="platform-icon android"><PlatformIcon name="android" /></span><span><small>GET IT ON</small><strong>Google Play</strong></span><Arrow /></a><a href="#waitlist"><span className="platform-icon"><PlatformIcon name="web" /></span><span><small>Available for</small><strong>Web Extension</strong></span><Arrow /></a></div></section>

        <section className="proof section-wrap" id="security"><div className="testimonial"><div className="testimonial-card"><p className="kicker">People in motion</p><blockquote>“{current.quote}”</blockquote><div className="person"><span className={`person-avatar avatar-${current.initials.toLowerCase()}`}>{current.initials}</span><span><strong>{current.name}</strong><small>{current.role}</small></span></div><div className="slider-controls"><button aria-label="Previous testimonial" onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)}><PrevIcon /></button><span>{String(testimonial + 1).padStart(2,'0')} / 0{testimonials.length}</span><button aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % testimonials.length)}><NextIcon /></button></div></div></div><div className="security-panel"><div className="security-content"><div className="lock-icon"><LockIcon /></div><p className="kicker">{t.securityKicker}</p><h2>{t.securityTitle}</h2><p>{t.securityText}</p><div className="security-badges"><span><SecurityIcon /><strong>256-bit</strong><small>Encryption</small></span><span><CheckIcon /><strong>FDIC</strong><small>Insured partners</small></span></div></div></div></section>

        <section className="waitlist section-wrap" id="waitlist"><div className="waitlist-content"><Mark /><h2>{t.waitTitle}</h2><p>{t.waitText}</p>{submitted ? <div className="success-message" role="status" aria-live="polite"><strong>You’re on the list.</strong><span>We’ll be in touch when FlowBank is ready.</span></div> : <form onSubmit={submitWaitlist}><label htmlFor="email">{t.email}</label><div><input ref={emailInputRef} id="email" name="email" type="email" required autoComplete="email" placeholder={t.placeholder} value={email} onChange={(e) => setEmail(e.target.value)} /><button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Joining…' : t.join} {!isSubmitting && <Arrow />}</button></div><label className="consent-row"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /> <span>I agree to receive waitlist updates and accept the <a href="#privacy">Privacy Policy</a>.</span></label><small>{t.noSpam} Unsubscribe anytime.</small></form>}</div><div className="waitlist-visual" aria-hidden="true"><img src="/assets/illustrations/flowbank-3d-core.svg" alt="" /></div></section>
      </main>
      <footer><a className="brand footer-brand" href="#top"><img className="flowbank-logo" src="/assets/brand/logoFlowBank.webp" alt="FlowBank" /></a><span className="footer-tagline">Built for a borderless life.</span><nav className="legal-links" aria-label="Legal information"><a id="privacy" href="#privacy">Privacy Policy</a><a id="terms" href="#terms">Terms of Use</a><a id="refunds" href="#refunds">Refund &amp; Cancellation</a></nav></footer>
      {!cookieChoice && <aside className="cookie-banner" role="dialog" aria-label="Cookie preferences"><div><strong>Your privacy matters.</strong><p>We use only essential storage by default. Optional analytics will never run without your consent.</p></div><div className="cookie-actions"><button type="button" onClick={() => { setCookieChoice('rejected'); try { localStorage.setItem('flowbank-cookie-choice', 'rejected') } catch {} }}>Decline</button><button type="button" onClick={() => { setCookieChoice('accepted'); try { localStorage.setItem('flowbank-cookie-choice', 'accepted') } catch {} }}>Accept</button><button type="button" className="cookie-manage" onClick={() => setShowCookiePreferences(true)}>Manage preferences</button></div></aside>}
      {showCookiePreferences && <aside className="cookie-preferences" role="dialog" aria-modal="true" aria-label="Manage cookie preferences"><h2>Cookie preferences</h2><p>Optional analytics are currently disabled and will remain disabled unless you choose to enable them.</p><button type="button" onClick={() => { setShowCookiePreferences(false); setCookieChoice('rejected'); try { localStorage.setItem('flowbank-cookie-choice', 'rejected') } catch {} }}>Save essential only</button></aside>}
    </div>
  )
}
