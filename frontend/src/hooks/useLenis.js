import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Client-only Lenis smooth scroll, scroll-to-top on route change, and hash scroll.
export const useLenis = () => {
  const location = useLocation()
  const lenisRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let lenis
    let rafId
    let cancelled = false
    ;(async () => {
      const Lenis = (await import('lenis')).default
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis
      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })()

    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const lenis = lenisRef.current
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: 0 })
        else el.scrollIntoView()
        return
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
}
