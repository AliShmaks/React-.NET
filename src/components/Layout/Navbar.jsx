import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, Utensils, Truck, ChevronDown } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1025)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const { getTotalItems } = useCart()
  const location = useLocation()
  const totalItems = getTotalItems()

  const navLinks = [
    { to: '/xogame', label: 'XO Game' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/contact', label: 'Contact' },
    { to: '/location', label: 'Location' },
    { to: '/socials', label: 'Socials' },
  ]

  const isActive = (path) => location.pathname === path

  // Preload logo when component mounts
  useEffect(() => {
    const img = new Image()
    img.src = '/logo.webp'
    img.onload = () => setLogoLoaded(true)
    img.onerror = () => setLogoLoaded(true) // Fallback - show anyway
  }, [])

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogoClick = (e) => {
    if (mobileOpen) setMobileOpen(false)
    
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link 
          to="/" 
          className="logo-link" 
          onClick={handleLogoClick}
        >
          <div className="logo-img">
            <img 
              src="/logo.webp" 
              alt="shmaks BBQ Logo"
              loading="eager"
              fetchpriority="high"
              style={{ 
                opacity: logoLoaded ? 1 : 0,
                transition: 'opacity 0.15s ease'
              }}
              onLoad={() => setLogoLoaded(true)}
            />
          </div>
        </Link>

        {/* Only show nav links on DESKTOP */}
        {!isMobile && (
          <div className="nav-links">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active-link' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            
            <div className="dropdown-wrap">
              <button 
                className="nav-link dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Menu <ChevronDown className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu open">
                  <Link to="/menu?mode=dinein" onClick={() => { setDropdownOpen(false); setMobileOpen(false) }}>
                    <span className="dropdown-icon"><Utensils size={16} /></span>
                    Dine In Menu
                  </Link>
                  <Link to="/menu?mode=delivery" onClick={() => { setDropdownOpen(false); setMobileOpen(false) }}>
                    <span className="dropdown-icon"><Truck size={16} /></span>
                    Delivery Menu
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`nav-link ${isActive(link.to) ? 'active-link' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <div className="nav-actions">
          <Link to="/checkout" className={`cart-btn ${isActive('/checkout') ? 'active' : ''}`}>
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="cart-badge" style={{ display: 'flex' }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <button 
            className="close-menu" 
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <p className="menu-label">Menu</p>
          <Link to="/menu?mode=dinein" onClick={() => setMobileOpen(false)}>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4"/>
              <path d="M21 7v8"/>
              <path d="M16 7v8"/>
              <path d="M16 2v5a2 2 0 0 0 2 2h3"/>
            </svg>
            Dine In
          </Link>
          <Link to="/menu?mode=delivery" onClick={() => setMobileOpen(false)}>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path d="M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path d="M9 16l-2-4h12l-2 4"/>
              <path d="M7 12l2-4h6l2 4"/>
              <path d="M9 8h6"/>
            </svg>
            Delivery
          </Link>
          <Link to="/xogame" onClick={() => setMobileOpen(false)}>XO Game</Link>
          <Link to="/testimonials" onClick={() => setMobileOpen(false)}>Testimonials</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link to="/location" onClick={() => setMobileOpen(false)}>Location</Link>
          <Link to="/socials" onClick={() => setMobileOpen(false)}>Socials</Link>
          <Link to="/checkout" onClick={() => setMobileOpen(false)}>Checkout</Link>
        </div>
      </div>
    </>
  )
}