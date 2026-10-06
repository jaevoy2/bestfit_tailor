import { useEffect, useState } from 'react'
import { accents, brand, showPricing } from './config'
import Customizer from './components/Customizer'
import useReveal from './useReveal'
import {
  Nav, Hero, Catalog, Editorial, Services, Process, Pricing, Testimonials, Contact, Newsletter, Footer,
} from './components/Sections'

// Tell the server about this visit once per browser session; it emails the site owner.
function notifyVisit() {
  if (import.meta.env.DEV) return
  try {
    if (sessionStorage.getItem('visit-sent')) return
    sessionStorage.setItem('visit-sent', '1')
  } catch {
    /* no sessionStorage — the server throttles by IP anyway */
  }
  fetch('/api/notify-visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tz: Intl.DateTimeFormat().resolvedOptions().timeZone }),
    keepalive: true,
  }).catch(() => {})
}

const STORE ='bestfit-prefs-v2'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [saved] = useState(load)
  const [accent, setAccent] = useState(saved.accent || accents[0])
  const [mode, setMode] = useState(
    saved.mode || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  )
  const [name, setName] = useState(saved.name || brand.name)

  useEffect(notifyVisit, [])
  useReveal()

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.setProperty('--accent', accent)
    document.title = `${name} ${brand.suffix}`
    try {
      localStorage.setItem(STORE, JSON.stringify({ accent, mode, name }))
    } catch {
      /* storage unavailable — preferences just won't persist */
    }
  }, [accent, mode, name])

  return (
    <>
      <Nav name={name} />
      <main>
        <Hero />
        <Catalog />
        <Editorial name={name} />
        <Services />
        <Process />
        {showPricing && <Pricing />}
        <Testimonials />
        <Contact />
        <Newsletter />
      </main>
      <Footer name={name} />
      <Customizer
        accent={accent} setAccent={setAccent}
        mode={mode} setMode={setMode}
        name={name} setName={setName}
        reset={() => { setName(brand.name); setAccent(accents[0]) }}
      />
    </>
  )
}
