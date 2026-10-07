import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { galleryImages } from '../config'

function Lightbox({ index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onMove(1)
      else if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, onMove])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button className="lb-btn lb-close" onClick={onClose} aria-label="Close">×</button>
      <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onMove(-1) }} aria-label="Previous photo">‹</button>
      <img src={galleryImages[index]} alt={`Best Fit Tailor gallery photo ${index + 1}`} onClick={(e) => e.stopPropagation()} />
      <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onMove(1) }} aria-label="Next photo">›</button>
      <p className="lb-count">{index + 1} / {galleryImages.length}</p>
    </div>
  )
}

export default function GalleryPage() {
  const [params, setParams] = useSearchParams()
  const [open, setOpen] = useState(null)

  // Deep link from the home page: /gallery?photo=8 opens that photo.
  useEffect(() => {
    const n = Number(params.get('photo'))
    if (n >= 1 && n <= galleryImages.length) setOpen(n - 1)
    // only on first arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => {
    setOpen(null)
    if (params.has('photo')) setParams({}, { replace: true })
  }, [params, setParams])
  const move = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + galleryImages.length) % galleryImages.length)), [])

  return (
    <main className="gallery-page">
      <header className="gallery-head">
        <p className="kicker">Our work</p>
        <h1>Gallery</h1>
        <p className="lead">Gowns, wedding dresses, traditional áo dài and formalwear — all made in our studio. Tap a photo to view it larger.</p>
      </header>
      <div className="gallery-grid">
        {galleryImages.map((src, i) => (
          <button key={src} className="g-item" style={{ '--i': i % 6 }} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`}>
            <img
              src={src}
              alt={`Best Fit Tailor gallery photo ${i + 1}`}
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add('loaded')}
            />
          </button>
        ))}
      </div>
      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </main>
  )
}
