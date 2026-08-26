import { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../config/nav'
import { Seed } from './Seed'
import { LayoutContext } from './LayoutContext'

export const Nav = () => {
  const { darkHero } = useContext(LayoutContext)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // transparent only over a dark hero that hasn't scrolled
  const transparent = darkHero && !scrolled
  const barClass = transparent
    ? 'text-paper'
    : 'bg-paper text-ink border-b'

  // mobile overlay: lock scroll, trap focus, escape, return focus
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const overlay = overlayRef.current
    const focusables = overlay ? overlay.querySelectorAll('a, button') : []
    if (focusables.length) focusables[0].focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Tab' && focusables.length) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      if (toggleRef.current) toggleRef.current.focus()
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-nav-h flex items-center px-gutter transition-colors duration-500 ${barClass}`}
      style={{ borderColor: 'var(--hair-on-paper)' }}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3" aria-label="House of Chirmi home">
          <span style={{ fontSize: '1.35rem' }}>
            <Seed inverted={transparent} />
          </span>
          <span className="font-display" style={{ fontSize: '1.35rem', lineHeight: 1 }}>
            House of Chirmi
          </span>
        </Link>

        {/* desktop links */}
        <nav className="hidden min-[821px]:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="btn-label relative"
              style={({ isActive }) => ({ opacity: isActive ? 1 : 0.78 })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute"
                      style={{ left: '-1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem' }}
                    >
                      <Seed />
                    </span>
                  )}
                  {l.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="btn-label min-[821px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-ink text-paper flex flex-col justify-center px-gutter gap-6 min-[821px]:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="btn-label absolute top-0 right-0 h-nav-h px-gutter"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="h2 flex items-center gap-4"
            >
              <span style={{ fontSize: '2.2rem' }}>
                <Seed inverted />
              </span>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
