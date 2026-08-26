import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutContext } from './LayoutContext'
import { useLenis } from '../hooks/useLenis'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { MeasureRail } from './MeasureRail'
import { SkipLink } from './SkipLink'

export const Layout = () => {
  const [darkHero, setDarkHero] = useState(false)
  useLenis()

  return (
    <LayoutContext.Provider value={{ darkHero, setDarkHero }}>
      <SkipLink />
      <MeasureRail />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </LayoutContext.Provider>
  )
}
