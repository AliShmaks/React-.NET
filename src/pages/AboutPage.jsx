import React, { useState, useEffect } from 'react'
import { Footer } from '../components/Layout'
import { Link } from 'react-router-dom'
import { 
  ChevronDown,
  Utensils,
  Truck,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react'
import '../styles/AboutPage.css'

const AboutPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? (scrollY / height) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>


      {/* Scroll Progress Bar */}
      <div 
        id="scrollProgress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Main Content */}
      <main className="page-section">
        <div className="about-container">
          {/* Centered Logo Above Text */}
          <div className="about-logo">
            <img 
              src="/logo.webp" 
              alt="Hanks BBQ Logo" 
            />
          </div>
          
          <div className="about-header">
            <h1 className="about-title">About Hanks BBQ</h1>
          </div>

          <div className="about-content">
            <div className="about-card">
              <p className="about-text">
                Hanks BBQ was founded by <span className="highlight">Mohammad Delbani</span>, 
                a passionate <span className="highlight">Lebanese owner</span> who transformed 
                his love for bold flavors, premium ingredients, and exceptional quality into a 
                burger experience unlike any other. Driven by a commitment to excellence and a 
                desire to bring people together through great food, he created a brand dedicated 
                to serving perfectly crafted smashed burgers that deliver unforgettable taste in 
                every bite.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AboutPage