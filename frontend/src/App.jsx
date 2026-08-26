import { Layout } from './components/Layout'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Brands from './pages/Brands'
import Collective from './pages/Collective'
import Work from './pages/Work'
import CaseDetail from './pages/CaseDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { cases } from './config/cases'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'studio', element: <Studio /> },
      { path: 'brands', element: <Brands /> },
      { path: 'collective', element: <Collective /> },
      { path: 'work', element: <Work /> },
      {
        path: 'work/:slug',
        element: <CaseDetail />,
        getStaticPaths: () => cases.map((c) => `/work/${c.slug}`),
      },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
