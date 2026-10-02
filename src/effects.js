// Site-wide motion. Everything here is progressive: the static HTML is complete
// without JS, and nothing runs when the visitor prefers reduced motion.
import { useEffect } from 'react'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export function useSiteEffects(pathname) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    const root = document.documentElement
    const cleanups = []
    const on = (t, e, f, o) => { t.addEventListener(e, f, o); cleanups.push(() => t.removeEventListener(e, f, o)) }

    /* Scroll progress bar */
    const bar = document.querySelector('.progress')
    /* Stacking work cards */
    const cards = [...document.querySelectorAll('.stack-card')]
    /* Scroll-lit words */
    const scrubs = [...document.querySelectorAll('[data-scrub]')].map((el) => ({ el, words: [...el.querySelectorAll('.w')] }))
    /* Parallax */
    const para = [...document.querySelectorAll('[data-parallax]')]

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const vh = window.innerHeight
        if (bar) {
          const max = document.documentElement.scrollHeight - vh
          bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
        }
        if (reduce) return
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          const top = parseFloat(getComputedStyle(card).top) || 0
          const p = clamp(1 - (next.getBoundingClientRect().top - top) / card.offsetHeight, 0, 1)
          card.style.setProperty('--p', p.toFixed(3))
        })
        scrubs.forEach(({ el, words }) => {
          const r = el.getBoundingClientRect()
          const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1)
          const lit = Math.round(p * words.length)
          words.forEach((w, i) => w.classList.toggle('lit', i < lit))
        })
        para.forEach((el) => {
          const r = el.getBoundingClientRect()
          const speed = parseFloat(el.dataset.parallax) || 0.2
          el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1)}px, 0)`
        })
      })
    }
    on(window, 'scroll', onScroll, { passive: true })
    on(window, 'resize', onScroll)
    onScroll()

    if (reduce) return () => cleanups.forEach((c) => c())
    root.classList.add('motion')

    /* Reveal on scroll */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('in')
        io.unobserve(e.target)
        const n = e.target.querySelector('[data-count]') || (e.target.dataset.count && e.target)
        if (n) countUp(n)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    cleanups.push(() => io.disconnect())

    if (!fine) return () => cleanups.forEach((c) => c())

    /* Custom cursor — turns black wherever it would sit on red or pink */
    const redCache = new WeakMap()
    const SWEEPS = '.stack, .rows-sweep a.row, .view-all, .pill, .seed'
    const onRed = (el) => {
      if (!el || el.nodeType !== 1) return false
      if (el.closest(SWEEPS)) return true
      if (redCache.has(el)) return redCache.get(el)
      let red = false
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const m = getComputedStyle(n).backgroundColor.match(/\d+(\.\d+)?/g)
        if (!m || (m[3] !== undefined && +m[3] === 0)) continue
        const [r, g, b] = m.map(Number)
        red = r > 170 && g < 100 // seed red and rani pink
        break
      }
      redCache.set(el, red)
      return red
    }

    const cur = document.createElement('div')
    cur.className = 'cursor'
    cur.innerHTML = '<span class="cursor-label"></span>'
    document.body.appendChild(cur)
    const label = cur.firstChild
    let x = -100, y = -100, cx = x, cy = y, raf
    const loop = () => {
      cx += (x - cx) * 0.5; cy += (y - cy) * 0.5
      cur.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    on(window, 'mousemove', (e) => {
      x = e.clientX; y = e.clientY
      const t = e.target.closest?.('[data-cursor], a, button, summary, select, input, textarea')
      const text = t?.closest('[data-cursor]')?.dataset.cursor || ''
      cur.classList.toggle('is-link', !!t)
      cur.classList.toggle('is-label', !!text)
      cur.classList.toggle('is-dark', onRed(e.target))
      label.textContent = text
      // hero seeds drift away from the pointer
      document.querySelectorAll('[data-depth]').forEach((s) => {
        const d = parseFloat(s.dataset.depth)
        s.style.translate = `${((x / innerWidth) - 0.5) * d * -60}px ${((y / innerHeight) - 0.5) * d * -60}px`
      })
    })
    on(document, 'mouseleave', () => { x = y = -100 })
    cleanups.push(() => { cancelAnimationFrame(raf); cur.remove() })

    /* Magnetic buttons */
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      on(el, 'mousemove', (e) => {
        const r = el.getBoundingClientRect()
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
      })
      on(el, 'mouseleave', () => { el.style.transform = '' })
    })

    /* Floating screenshot preview on list rows */
    const rows = document.querySelectorAll('[data-preview]')
    if (rows.length) {
      const pv = document.createElement('img')
      pv.className = 'row-preview'
      pv.alt = ''
      document.body.appendChild(pv)
      rows.forEach((r) => {
        on(r, 'mouseenter', () => { pv.src = r.dataset.preview; pv.classList.add('show') })
        on(r, 'mouseleave', () => pv.classList.remove('show'))
        on(r, 'mousemove', (e) => { pv.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0) rotate(-3deg)` })
      })
      cleanups.push(() => pv.remove())
    }

    return () => cleanups.forEach((c) => c())
  }, [pathname])
}

function countUp(el) {
  const end = parseFloat(el.dataset.count)
  if (!end) return
  const t0 = performance.now()
  const dur = 1400
  const step = (t) => {
    const p = Math.min(1, (t - t0) / dur)
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
