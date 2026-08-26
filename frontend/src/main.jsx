import './styles/tokens.css'
import './styles/global.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'

export const createRoot = ViteReactSSG({ routes })
