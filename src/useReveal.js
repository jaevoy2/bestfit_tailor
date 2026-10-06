import { useEffect } from 'react'

// Scroll-reveal: elements marked data-reveal="up|left|right|group" fade/slide in
// the first time they enter the viewport. "group" staggers the element's children.
// The hidden start state (.pre) is added here, so with JS off or reduced motion
// on, everything simply stays visible.
export default function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.dataset.reveal === 'group') {
        // React-rendered children (e.g. product cards) set their own --i.
        Array.from(el.children).forEach((c, i) => {
          if (!c.style.getPropertyValue('--i')) c.style.setProperty('--i', i)
        })
      }
      el.classList.add('pre')
      io.observe(el)
    })

    return () => io.disconnect()
  }, [])
}
