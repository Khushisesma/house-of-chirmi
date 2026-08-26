import { useEffect, useRef, useState } from 'react'

// Reveal-on-scroll via IntersectionObserver. Reliable across SSG hydration and
// degrades to visible with no JS / reduced motion.
export const useInView = (amount = 0.2) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [amount])
  return [ref, inView]
}
