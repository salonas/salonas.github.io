import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageProvider'
import { MusicProvider } from './music/MusicProvider'
import MusicNotice from './music/MusicNotice'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Toolbox from './pages/Toolbox'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Shell() {
  return (
    <div className="site">
      <ScrollToTop />
      <Sidebar />
      <div className="scroll">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route caseSensitive path="/toolbox" element={<Toolbox />} />
            <Route caseSensitive path="/projects" element={<Projects />} />
            <Route caseSensitive path="/projects/:slug" element={<ProjectDetail />} />
            <Route caseSensitive path="/contact" element={<Contact />} />
            {/* Addresses of the previous site. */}
            <Route caseSensitive path="/Skills" element={<Navigate to="/toolbox" replace />} />
            <Route caseSensitive path="/Projects" element={<Navigate to="/projects" replace />} />
            <Route caseSensitive path="/Contact" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <MusicNotice />
    </div>
  )
}

export default function App({ lang }) {
  return (
    <LanguageProvider initial={lang ?? undefined}>
      <MusicProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </MusicProvider>
    </LanguageProvider>
  )
}
