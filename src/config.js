// ─────────────────────────────────────────────────────────────
// Edit this file to customise the site's content.
// Colours / dark mode can also be changed live with the ⚙ panel.
//
// PHOTOS: every `image` below is optional. Drop your files in
// public/images/ and set e.g. image: '/images/hero-1.jpg'.
// Without a photo, a tonal placeholder is shown.
// `tone` picks the placeholder shade: sand | camel | cocoa | stone | blush
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: 'Bestfit',
  suffix: 'Tailors',
  tagline: 'Tailoring, made personal',
  sub: 'Bespoke suits, evening wear and expert alterations — measured by hand, finished to the last millimetre.',
  email: 'best_fit_tailor@yahoo.com',
  phone: '(515) 331-4343',
  address: '7020 Douglas Ave C2, Urbandale, IA 50322',
  hours: 'Tue–Sat · 10:00–18:00',
}

// Pricing is hidden for now. Set to true to show the pricing section and product prices.
export const showPricing = false

// Contact map (OpenStreetMap, no API key). Pin is at the studio address below.
export const map = { lat: 41.62887, lon: -93.71345, zoom: 17 }

export const accents = ['#8a6a4a', '#a4533d', '#4f6b5c', '#3f4a6b', '#7a3b5a', '#2b2622']

export const hero = [
  { image: '/images/hero-1.jpg', tone: 'sand', pos: 'Tailor at work' },
  { image: '/images/hero-2.jpg', tone: 'camel', pos: 'Neutral knit set' },
  { image: '/images/hero-3.jpg', tone: 'cocoa', pos: 'Brown notch-lapel coat' },
]

// Photos from the studio's gallery (public/gallery/01.jpg … 68.jpg).
export const galleryImages = Array.from({ length: 68 }, (_, i) => `/gallery/${String(i + 1).padStart(2, '0')}.jpg`)

// Home-page gallery preview: a hand-picked selection. `n` is the photo number in /public/gallery.
export const categories = ['All', 'Wedding', 'Evening', 'Traditional', 'Menswear']

export const collection = [
  { id: 1, n: 8, name: 'Wedding gown with train', category: 'Wedding' },
  { id: 2, n: 21, name: 'A-line wedding gown', category: 'Wedding' },
  { id: 3, n: 6, name: 'Beaded evening gown', category: 'Evening' },
  { id: 4, n: 24, name: 'Blue evening gown', category: 'Evening' },
  { id: 6, n: 18, name: 'Floral áo dài', category: 'Traditional' },
  { id: 7, n: 67, name: 'Classic tuxedo', category: 'Menswear' },
  { id: 8, n: 68, name: 'Shawl-collar tuxedo jacket', category: 'Menswear' },
].map((p) => ({ ...p, image: galleryImages[p.n - 1] }))

export const editorial = {
  kicker: 'The art of modern elegance',
  title: 'More than clothing',
  text: 'We craft each garment around the person who wears it — their posture, their habits, their taste. Every pattern is drafted by hand, every seam checked twice, and every fitting unhurried. The result is clothing that feels like it was always yours.',
  image: '/images/editorial-1.jpg',
  tone: 'blush',
  image2: '/images/editorial-2.jpg',
  tone2: 'camel',
}

export const services = [
  { icon: '✂', title: 'Bespoke Suits', text: 'Fully custom suits and jackets, drafted from scratch to your measurements and posture.' },
  { icon: '❖', title: 'Wedding & Evening', text: 'Gowns, tuxedos and bridal parties — coordinated, fitted and ready on the day.' },
  { icon: '⌇', title: 'Alterations', text: 'Hems, tapers, resizing and repairs on anything you own. Most done in 48 hours.' },
  { icon: '◐', title: 'Made-to-Measure', text: 'Shirts, trousers and coats from our pattern library, adjusted to your body.' },
  { icon: '❋', title: 'Restyling', text: 'Give a loved garment a second life: new lining, new silhouette, new buttons.' },
  { icon: '☰', title: 'Fabric Sourcing', text: 'Mills in Italy, England and Japan. Swatch books to browse in the studio.' },
]

export const steps = [
  { title: 'Consultation', text: 'Tell us the occasion, the style and the budget. We’ll bring the fabrics.' },
  { title: 'Measurement', text: 'Around 30 measurements plus posture notes, taken in a relaxed 30-minute session.' },
  { title: 'Fittings', text: 'A baste fitting and a forward fitting to perfect balance before final stitching.' },
  { title: 'Delivery', text: 'Pressed, packed and handed over — with free adjustments for life.' },
]

export const plans = [
  { name: 'Alteration', price: '$25+', note: 'per item', features: ['Hems & tapers', '48-hour turnaround', 'Free pressing'], featured: false },
  { name: 'Made-to-Measure', price: '$320+', note: 'per garment', features: ['Pattern library fit', '2 fittings', '200+ fabrics', '3-week delivery'], featured: true },
  { name: 'Full Bespoke', price: '$890+', note: 'per garment', features: ['Hand-drafted pattern', '3 fittings', 'Canvas construction', 'Lifetime adjustments'], featured: false },
]

export const testimonials = [
  { quote: 'The first suit that has ever actually fit my shoulders. I’m never going back.', who: 'Marcus T.' },
  { quote: 'They rebuilt my mother’s dress for my wedding. I cried at the final fitting.', who: 'Amara O.' },
  { quote: 'Fast, precise and honest about what’s worth altering. Worth every cent.', who: 'Daniel K.' },
]
