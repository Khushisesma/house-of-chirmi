import './styles.css'
import { ViteReactSSG } from 'vite-react-ssg'
import { Layout } from './components'
import { Home, Work, CaseDetail, Studio, Brands, About, Contact, NotFound } from './pages'
import { cases } from './content'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work', element: <Work /> },
      { path: 'work/:slug', element: <CaseDetail />, getStaticPaths: () => cases.map((c) => `/work/${c.slug}`) },
      { path: 'studio', element: <Studio /> },
      { path: 'brands', element: <Brands /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const createRoot = ViteReactSSG({ routes })
