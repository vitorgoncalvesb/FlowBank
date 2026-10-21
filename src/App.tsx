import { useState } from 'react'
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Check, Globe2, LockKeyhole, Send, ShieldCheck, Sparkles, Sun } from 'lucide-react'

const iconProps = { size: 18, strokeWidth: 1.8, 'aria-hidden': true as const }

function IconArrow() { return <ArrowUpRight {...iconProps} /> }
function IconMark() { return <Sparkles {...iconProps} size={16} /> }

const icons = { arrow: <IconArrow />, mark: <IconMark /> }

/* Keep decorative icons in one place so the visual language stays consistent. */

function Arrow() { return <span className="icon-inline">{icons.arrow}</span> }
function Mark() { return <span className="brand-mark" aria-hidden="true">{icons.mark}</span> }

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

const translatedTestimonials = {
  en: testimonials,
  'pt-BR': [
    { ...testimonials[0], quote: 'A FlowBank fez a minha mudança para Lisboa parecer menos um projeto financeiro e mais um novo começo.', role: 'Designer de produto · Singapura → Lisboa' },
    { ...testimonials[1], quote: 'Deixei de pensar nas taxas de câmbio. É exatamente isso que um cartão de viagem deve fazer.', role: 'Fundador · Londres' },
    { ...testimonials[2], quote: 'A visão do orçamento é a primeira que continuei a usar. Simples, tranquila e útil.', role: 'Arquiteta · Nairobi' },
  ],
} as const


export default function App() {
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState<'en' | 'pt-BR'>('en')
  const isPortuguese = language === 'pt-BR'
  const t = copy[language]
  const localizedTestimonials = translatedTestimonials[language]
  const [submitted, setSubmitted] = useState(false)
  const [testimonial, setTestimonial] = useState(0)
  const current = localizedTestimonials[testimonial]

  function submitWaitlist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <div className={`app-shell ${isPortuguese ? 'is-pt' : 'is-en'}`}>

      <header className="nav">
        <a className="brand" href="#top" aria-label="FlowBank home"><img className="flowbank-logo navbar-logo" src="/assets/brand/logoFlowBankSimpleVersion.png" alt="FlowBank" /></a>
        <nav aria-label={isPortuguese ? 'Navegação principal' : 'Main navigation'}><a href="#product">{isPortuguese ? 'Produto' : 'Product'}</a><a href="#features">{isPortuguese ? 'Funcionalidades' : 'Features'}</a><a href="#security">{isPortuguese ? 'Segurança' : 'Security'}</a></nav>
        <div className="nav-actions"><button className="language-toggle" type="button" onClick={() => setLanguage(isPortuguese ? 'en' : 'pt-BR')} aria-label={isPortuguese ? 'Switch to English' : 'Mudar para português'}>{isPortuguese ? 'EN' : 'PT-BR'}</button><a className="nav-cta" href="#waitlist">{isPortuguese ? 'Entrar na lista' : 'Join the waitlist'} <Arrow /></a></div>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="kicker"><span className="pulse" /> {t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-text">{t.heroText}</p>
            <div className="hero-actions"><a className="button button-primary" href="#waitlist">{t.getCard} <Arrow /></a><a className="text-link" href="#product">{t.seeHow} <span><DownIcon /></span></a></div>
            <div className="trust-row"><div className="avatars"><span>AM</span><span>JK</span><span>RS</span><span>+</span></div><p>{isPortuguese ? 'Junte-se a' : 'Join'} <strong>18,000+</strong> {isPortuguese ? 'pessoas na lista' : 'people on the waitlist'}</p></div>
          </div>
          <div className="hero-art" aria-label="FlowBank card preview">
            <div className="card-stack"><div className="card-back" /><article className="bank-card"><div className="card-glow" /><div className="card-top"><span className="card-brand"><img className="flowbank-logo card-logo" src="/assets/brand/logoFlowBank.webp" alt="FlowBank" /></span><span className="card-type">VISA <small>DEBIT</small></span></div><div className="card-middle"><div className="card-chip"><span /><span /><span /><span /></div><span className="contactless" aria-label="Contactless payment">)))</span></div><div className="card-number">••••  ••••  ••••  2048</div><div className="card-bottom"><span>YOUR NAME</span><span className="card-sig">FLOW<span>∞</span></span></div></article></div>
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

        <section className="waitlist section-wrap" id="waitlist"><div className="waitlist-content"><Mark /><h2>{t.waitTitle}</h2><p>{t.waitText}</p>{submitted ? <div className="success-message">You’re on the list. We’ll be in touch soon.</div> : <form onSubmit={submitWaitlist}><label htmlFor="email">{t.email}</label><div><input id="email" type="email" required placeholder={t.placeholder} value={email} onChange={(e) => setEmail(e.target.value)} /><button type="submit">{t.join} <Arrow /></button></div><small>{t.noSpam}</small></form>}</div><div className="waitlist-visual" aria-hidden="true"><img src="/assets/illustrations/flowbank-3d-core.svg" alt="" /></div></section>
      </main>
      <footer><a className="brand" href="#top"><img className="flowbank-logo" src="/assets/brand/logoFlowBank.webp" alt="FlowBank" /></a><span>© 2026 FlowBank Inc.</span><span>Built for a borderless life.</span></footer>
    </div>
  )
}
