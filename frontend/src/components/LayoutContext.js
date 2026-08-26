import { createContext, useContext } from 'react'

export const LayoutContext = createContext({ darkHero: false, setDarkHero: () => {} })

// Pages call this to declare whether their hero sits on a dark ground.
import { useEffect } from 'react'
export const useDarkHero = (value) => {
  const { setDarkHero } = useContext(LayoutContext)
  useEffect(() => {
    setDarkHero(value)
    return () => setDarkHero(false)
  }, [value, setDarkHero])
}
