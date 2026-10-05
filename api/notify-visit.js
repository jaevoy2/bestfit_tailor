// Vercel serverless function: emails the site owner when someone visits.
// Needs env vars (set in the Vercel dashboard, never in the client code):
//   RESEND_API_KEY  – API key from https://resend.com
//   NOTIFY_FROM     – verified sender, e.g. "Bestfit Site <alerts@yourdomain.com>"
//   NOTIFY_TO       – recipient (default: francis@creativedevlabs.com)

const TO_DEFAULT = 'francis@creativedevlabs.com'
const BOT = /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|pingdom|uptime|curl|wget|python-requests/i

// Best-effort per-IP throttle (resets when the function instance recycles).
const seen = new Map()
const WINDOW_MS = 30 * 60 * 1000

const esc = (s) =>
  String(s ?? '—').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function parseUA(ua = '') {
  const m = (re) => re.exec(ua)
  const browser =
    (m(/Edg\/([\d.]+)/) && `Edge ${m(/Edg\/([\d.]+)/)[1]}`) ||
    (m(/OPR\/([\d.]+)/) && `Opera ${m(/OPR\/([\d.]+)/)[1]}`) ||
    (m(/Firefox\/([\d.]+)/) && `Firefox ${m(/Firefox\/([\d.]+)/)[1]}`) ||
    (m(/(?:Chrome|CriOS)\/([\d.]+)/) && `Chrome ${m(/(?:Chrome|CriOS)\/([\d.]+)/)[1]}`) ||
    (m(/Version\/([\d.]+).*Safari/) && `Safari ${m(/Version\/([\d.]+).*Safari/)[1]}`) ||
    'Unknown'
  const os =
    (/Windows NT/.test(ua) && 'Windows') ||
    (/(iPhone|iPad|iPod)/.test(ua) && 'iOS') ||
    (m(/Android ([\d.]+)/) && `Android ${m(/Android ([\d.]+)/)[1]}`) ||
    (/Mac OS X/.test(ua) && 'macOS') ||
    (/CrOS/.test(ua) && 'ChromeOS') ||
    (/Linux/.test(ua) && 'Linux') ||
    'Unknown OS'
  const type = /iPad|Tablet/.test(ua) ? 'Tablet' : /Mobi|iPhone|Android/.test(ua) ? 'Mobile' : 'Desktop'
  return { browser, device: `${type} · ${os}` }
}

async function locate(req, ip) {
  const h = req.headers
  const city = h['x-vercel-ip-city'] && decodeURIComponent(h['x-vercel-ip-city'])
  const region = h['x-vercel-ip-country-region']
  const country = h['x-vercel-ip-country']
  if (city || country) return [city, region, country].filter(Boolean).join(', ')
  try {
    const r = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?fields=success,city,region,country`)
    const j = await r.json()
    if (j.success) return [j.city, j.region, j.country].filter(Boolean).join(', ')
  } catch {
    /* lookup failed — fall through */
  }
  return 'Unknown'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // Same-origin only, so other sites can't trigger emails.
  const origin = req.headers.origin
  if (origin && new URL(origin).host !== req.headers.host) return res.status(403).end()

  const ua = req.headers['user-agent'] || ''
  if (BOT.test(ua)) return res.status(204).end()

  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim() || 'Unknown'
  const now = Date.now()
  if (now - (seen.get(ip) || 0) < WINDOW_MS) return res.status(204).end()
  seen.set(ip, now)

  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(500).json({ error: 'RESEND_API_KEY not set' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const tz = typeof body.tz === 'string' && body.tz.length < 60 ? body.tz : 'UTC'
  const when = new Date(now)
  let local
  try {
    local = when.toLocaleString('en-US', { timeZone: tz, dateStyle: 'medium', timeStyle: 'medium' }) + ` (${tz})`
  } catch {
    local = when.toUTCString()
  }

  const { browser, device } = parseUA(ua)
  const location = await locate(req, ip)

  const rows = [
    ['IP Address', ip],
    ['Location', location],
    ['Device', device],
    ['Browser', browser],
    ['Date/time', `${local} — ${when.toISOString()}`],
  ]
  const html = `<h2 style="font-family:sans-serif">New site visit</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`)
    .join('')}</table>`

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || 'Site Visits <onboarding@resend.dev>',
      to: process.env.NOTIFY_TO || TO_DEFAULT,
      subject: `New visitor — ${location}`,
      html,
    }),
  })
  if (!r.ok) return res.status(502).json({ error: 'Email provider rejected the request' })
  return res.status(200).json({ ok: true })
}
