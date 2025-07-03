import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Skills from './Pages/Skills'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Sidebar from './Components/Sidebar/Sidebar'
import { LanguageProvider, useLanguage } from './Components/Lang'
import './Assets/Styles.scss'
import './Assets/Sidebar.scss'

function AppContent() {
  const { t } = useLanguage()
  
  useEffect(() => {
    document.title = t('page-title')
  }, [t])

  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/Skills' element= {<Skills/>}/>
        <Route path='/Projects' element= {<Projects/>}/>
        <Route path='/Contact' element= {<Contact/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  )
}
