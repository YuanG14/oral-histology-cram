import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Clock3,
  CreditCard,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Truck,
  UserRound,
  X,
} from 'lucide-react'

const navigation = ['Shop', 'iPhone', 'iPad', 'Mac', 'Accessories', 'Support']

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <circle cx="32" cy="32" r="27" />
        <ellipse cx="32" cy="32" rx="13" ry="27" />
        <path d="M6 32h52M10 20h44M10 44h44" />
      </svg>
      <strong>PNE</strong>
    </div>
  )
}

function Header({ onNotice }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const handleNav = (label) => {
    setMenuOpen(false)
    onNotice(`${label} browsing will be connected in Phase 2.`)
  }

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="PNE Gadgets PH home">
        <BrandMark />
        <span>PNE GADGETS PH</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <button key={item} type="button" onClick={() => handleNav(item)}>
            {item}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button type="button" aria-label="Search" onClick={() => onNotice('Product search will be connected in Phase 2.')}>
          <Search />
        </button>
        <button type="button" aria-label="Account" onClick={() => onNotice('Customer accounts are planned for the authentication phase.')}>
          <UserRound />
        </button>
        <button type="button" aria-label="Shopping cart" onClick={() => onNotice('Your shopping cart is currently empty.')}>
          <ShoppingBag />
        </button>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <button key={item} type="button" onClick={() => handleNav(item)}>
              {item}
              <ArrowRight size={18} />
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

const trustItems = [
  {
    icon: Truck,
    title: 'Nationwide Shipping',
    description: 'We deliver across the Philippines.',
  },
  {
    icon: Clock3,
    title: 'Same-day Metro Manila',
    description: 'Fast delivery within Metro Manila.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment Options',
    description: 'Cash, GCash, Maya, BDO, and more.',
  },
]

function App() {
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 3800)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <div id="top" className="app-shell">
      <Header onNotice={setNotice} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/pne-hero-products.png"
            alt="A premium arrangement of a smartphone, laptop, tablet, smartwatch, and wireless earbuds"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
            <h1 id="hero-title">Premium Apple devices. Trusted since 2016.</h1>
            <p>Authentic devices, dependable service, and nationwide delivery from PNE Gadgets PH.</p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={() => setNotice('The full product catalog is coming in Phase 2.')}>
                Shop Devices
                <ArrowRight />
              </button>
              <a
                className="button button-secondary"
                href="https://m.me/pnegadgetsph2.0"
                target="_blank"
                rel="noreferrer"
              >
                Message Us
                <MessageCircle />
              </a>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Store benefits">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <article className="trust-item" key={title}>
              <Icon aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className={`notice ${notice ? 'notice-visible' : ''}`} role="status" aria-live="polite">
        {notice}
      </div>
    </div>
  )
}

export default App
