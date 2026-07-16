import React, { useState, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Loader, ScrollProgress, Toast, Navbar } from './components/Layout'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import CheckoutPage from './pages/CheckoutPage'
import LocationPage from './pages/LocationPage'
import ContactPage from './pages/ContactPage'
import XOGame from './pages/XOGame'
import SocialsPage from './pages/SocialsPage'  
import TestimonialsPage from './pages/TestimonialsPage'
import AboutPage from './pages/AboutPage'  
import AdminApp from './admin/AdminApp'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
const AppContent = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.includes('/shmaksadmin432000') 
  const [loading, setLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useLayoutEffect(() => {
    
     if (isAdminRoute) {
    setShowContent(true)
    setLoading(false)
    return
  }
    setShowContent(false)
    setLoading(true)

   const timer = setTimeout(() => {
  setLoading(false)
  setShowContent(true) 
}, 800)

    window.scrollTo(0, 0)

    return () => clearTimeout(timer)
  }, [location.pathname, location.search, isAdminRoute]) 

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <ScrollProgress />
      {showContent && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/xogame" element={<XOGame />} />
          <Route path="/socials" element={<SocialsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shmaksadmin432000/*" element={<AdminApp />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
      <Toast />
    </>
  )
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  )
}

export default App