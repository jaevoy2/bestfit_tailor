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

export const categories = ['All', 'Suits', 'Dresses', 'Shirts', 'Coats']

export const collection = [
  { id: 1, name: 'Plaid suit jacket', category: 'Suits', price: 'from $890', image: '/images/p-suit.jpg', tone: 'stone' },
  { id: 2, name: 'Evening dress', category: 'Dresses', price: 'from $1,200', image: '/images/p-gown.jpg', tone: 'blush' },
  { id: 3, name: 'Crisp white shirt', category: 'Shirts', price: 'from $140', image: '/images/p-shirt.jpg', tone: 'sand' },
  { id: 4, name: 'Wool-cashmere overcoat', category: 'Coats', price: 'from $1,050', image: '/images/p-overcoat.jpg', tone: 'camel' },
  { id: 5, name: 'Tailored blazer', category: 'Suits', price: 'from $520', image: '/images/p-blazer.jpg', tone: 'cocoa' },
  { id: 6, name: 'Camel wool coat', category: 'Coats', price: 'from $960', image: '/images/p-coat.jpg', tone: 'camel' },
  { id: 7, name: 'Trench coat', category: 'Coats', price: 'from $760', image: '/images/p-trench.jpg', tone: 'sand' },
]

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
