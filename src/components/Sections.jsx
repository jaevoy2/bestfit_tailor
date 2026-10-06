import { useEffect, useState } from 'react'
import {
  brand, hero, categories, collection, editorial, services, steps, plans, testimonials, showPricing, map,
} from '../config'

// Photo slot: shows the image if one is configured, otherwise a tonal placeholder.
function Photo({ src, tone = 'sand', label, className = '', ...rest }) {
  if (src) return <img className={`photo ${className}`} src={src} alt={label || ''} loading="lazy" {...rest} />
  return (
    <div className={`photo ph ${tone} ${className}`} role="img" aria-label={label || 'Photo placeholder'} {...rest}>
      <svg viewBox="0 0 100 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle cx="50" cy="34" r="12" />
        <path d="M18 140c0-34 8-62 32-62s32 28 32 62z" />
      </svg>
    </div>
  )
}

export function Nav({ name }) {
  // Transparent over the hero; solid once the page is scrolled.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-left">
        <a href="#collection">Collection</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
      </nav>
      <a href="#top" className="logo">{name.toUpperCase()}</a>
      <nav className="nav-right">
        {showPricing && <a href="#pricing">Pricing</a>}
        <a href="#contact">Contact</a>
        <a href="#contact" className="nav-cta">Book a fitting</a>
      </nav>
    </header>
  )
}

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-strip">
        {hero.map((h, i) => <Photo key={i} src={h.image} tone={h.tone} label={h.pos} />)}
      </div>
      <div className="hero-copy">
        <h1>{brand.tagline}</h1>
        <p>{brand.sub}</p>
        <a href="#contact" className="btn-white">Book a fitting</a>
      </div>
    </section>
  )
}

export function Catalog() {
  const [cat, setCat] = useState('All')
  const items = collection.filter((c) => cat === 'All' || c.category === cat)
  return (
    <section id="collection" className="catalog">
      <div className="cat-head" data-reveal="group">
        <p className="kicker">Ready to be made yours</p>
        <h2>The Collection</h2>
        <p className="lead">Browse our signature pieces, then book a fitting and we’ll cut them to your measurements.</p>
        <div className="chips" role="tablist">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="cards" data-reveal="group">
        {items.map((p, i) => (
          <a key={p.id} href="#contact" className="product" style={{ '--i': i }} aria-label={`Book ${p.name}`}>
            <div className="product-img">
              <Photo src={p.image} tone={p.tone} label={p.name} />
              <span className="product-cta">Book this piece</span>
            </div>
            <p className="product-cat">{p.category}</p>
            <h3>{p.name}</h3>
            {showPricing && <p className="product-price">{p.price}</p>}
          </a>
        ))}
        {cat === 'All' && (
          <a href="#contact" className="product product-custom" style={{ '--i': items.length }}>
            <h3>Something else in mind?</h3>
            <p>Every piece can be made to order. Tell us what you’re dreaming of.</p>
            <span className="btn-line">Book a consultation</span>
          </a>
        )}
      </div>
    </section>
  )
}

export function Editorial({ name }) {
  return (
    <section className="editorial">
      <Photo src={editorial.image} tone={editorial.tone} label="Studio" className="ed-main" data-reveal="left" />
      <div className="ed-text" data-reveal="group">
        <p className="kicker">{editorial.kicker}</p>
        <div className="wordmark">{name.toUpperCase()}</div>
        <h2>{editorial.title}</h2>
        <p>{editorial.text}</p>
      </div>
      <Photo src={editorial.image2} tone={editorial.tone2} label="Detail" className="ed-side" data-reveal="right" />
    </section>
  )
}

const Head = ({ title, text }) => (
  <div className="head" data-reveal="group">
    <h2 className="caps">{title}</h2>
    {text && <p className="lead">{text}</p>}
  </div>
)

export function Services() {
  return (
    <section id="services" className="section">
      <Head title="Services" text="From a quick hem to a full bespoke commission." />
      <div className="grid three" data-reveal="group">
        {services.map((s) => (
          <article key={s.title} className="tile">
            <span className="icon" aria-hidden>{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section id="process" className="section alt">
      <Head title="How it works" />
      <ol className="steps" data-reveal="group">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <Head title="Pricing" text="Fabric is quoted separately at your consultation." />
      <div className="grid three" data-reveal="group">
        {plans.map((p) => (
          <article key={p.name} className={`tile plan ${p.featured ? 'featured' : ''}`}>
            {p.featured && <span className="badge">Most popular</span>}
            <h3>{p.name}</h3>
            <p className="amount">{p.price}<small> {p.note}</small></p>
            <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <a href="#contact" className={featuredClass(p)}>Choose</a>
          </article>
        ))}
      </div>
    </section>
  )
}
const featuredClass = (p) => (p.featured ? 'btn-dark' : 'btn-line')

export function Testimonials() {
  return (
    <section className="section alt">
      <Head title="Kind words" />
      <div className="grid three" data-reveal="group">
        {testimonials.map((t) => (
          <blockquote key={t.who} className="tile quote">
            <p>“{t.quote}”</p>
            <footer>— {t.who}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    // No backend yet: replace with a fetch() to your form endpoint.
    setSent(true)
  }
  return (
    <section id="contact" className="section contact">
      <div>
        <Head title="Book a fitting" text="Tell us what you have in mind and we’ll find a time that suits." />
        <ul className="info" data-reveal="up">
          <li>{brand.address}</li>
          <li>{brand.hours}</li>
          <li>{brand.phone}</li>
          <li>{brand.email}</li>
        </ul>
        <div className="map" data-reveal="up">
          <iframe
            title="Map to our studio"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${map.lon - 0.004},${map.lat - 0.002},${map.lon + 0.004},${map.lat + 0.002}&layer=mapnik&marker=${map.lat},${map.lon}`}
          />
          <a href={`https://www.openstreetmap.org/?mlat=${map.lat}&mlon=${map.lon}#map=${map.zoom}/${map.lat}/${map.lon}`} target="_blank" rel="noreferrer">View larger map ↗</a>
        </div>
      </div>
      {sent ? (
        <div className="tile thanks"><h3>Thank you!</h3><p>We’ll be in touch within one working day.</p></div>
      ) : (
        <form className="tile form" onSubmit={submit} data-reveal="up">
          <label>Name<input required name="name" autoComplete="name" /></label>
          <label>Email<input required type="email" name="email" autoComplete="email" /></label>
          <label>Service
            <select name="service">{services.map((s) => <option key={s.title}>{s.title}</option>)}</select>
          </label>
          <label>Preferred date<input type="date" name="date" /></label>
          <label>Message<textarea rows="3" name="message" /></label>
          <button className="btn-dark" type="submit">Request appointment</button>
        </form>
      )}
    </section>
  )
}

export function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="newsletter" data-reveal="group">
      <h2>Subscribe to our newsletter for style notes and new fabrics</h2>
      <p>Get <strong>10% off</strong> your first alteration when you sign up.</p>
      {done ? (
        <p className="ok">You’re on the list — thank you.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
          <input required type="email" placeholder="Your email" aria-label="Email address" />
          <button className="btn-dark" type="submit">Subscribe</button>
        </form>
      )}
    </section>
  )
}

export function Footer({ name }) {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {name} {brand.suffix}</span>
      <span>{brand.tagline}</span>
      <span className="privacy">We record basic visit details (IP address, approximate location, device and browser) for security and analytics.</span>
    </footer>
  )
}
