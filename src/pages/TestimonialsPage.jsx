import React, { useState, useEffect, useRef, useCallback } from 'react'
import {  Footer } from '../components/Layout'
import { Link } from 'react-router-dom'
import { 
  Star, 
  Quote, 
  CheckCircle,
  ChevronDown,
  Utensils,
  Truck,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import toast from 'react-hot-toast'
import '../styles/TestimonialsPage.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const TestimonialsPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const statsRef = useRef(null)
  const testimonialRefs = useRef([])
  const ctaRef = useRef(null)

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Ali Shararah',
      title: 'Regular Customer ⭐⭐⭐⭐⭐',
      text: '"Best BBQ in town! The meat is juicy, the buns are fresh, and the sauce is absolutely addictive. I\'ve been coming here every week since they opened. Ali knows what he\'s doing!"',
      rating: 5,
      verified: true,
      avatar: 'https://ui-avatars.com/api/?background=8B1A1A&color=fff&name=Ali+Shararah'
    },
    {
      id: 2,
      name: 'Sarah Khoury',
      title: 'Foodie Lover 🍔',
      text: '"The crispy fries are to die for! And the Smash Combo is the perfect meal. Delivery is always fast and the food arrives hot. Highly recommend!"',
      rating: 5,
      verified: true,
      avatar: 'https://ui-avatars.com/api/?background=8B1A1A&color=fff&name=Sarah+Khoury'
    },
    {
      id: 3,
      name: 'Mike Haddad',
      title: 'BBQ Enthusiast 🍔',
      text: '"Finally a BBQ joint that gets it right! The double smashed patty with caramelized onions is pure heaven. Great atmosphere for dine-in too."',
      rating: 5,
      verified: true,
      avatar: 'https://ui-avatars.com/api/?background=8B1A1A&color=fff&name=Mike+Haddad'
    },
    {
      id: 4,
      name: 'Layla Saab',
      title: 'Food Blogger 🍟',
      text: '"The loaded fries are amazing! Great value for money and the staff is super friendly. My new favorite spot in town."',
      rating: 5,
      verified: true,
      avatar: 'https://ui-avatars.com/api/?background=8B1A1A&color=fff&name=Layla+Saab'
    },
    {
      id: 5,
      name: 'Joe Bou Salman',
      title: 'Loyal Customer ❤️',
      text: '"Best BBQ in Lebanon! The quality is unmatched and the portions are generous. I order from here at least twice a week!"',
      rating: 5,
      verified: true,
      avatar: 'https://ui-avatars.com/api/?background=8B1A1A&color=fff&name=Joe+Bou+Salman'
    },
    {
      id: 6,
      name: 'Rita Chalhoub',
      title: 'Regular Customer ⭐',
      text: '"The delivery is super fast and the food always arrives hot. Their secret sauce is incredible. Definitely my go-to BBQ place!"',
      rating: 5,
      verified: true,
      avatar: 'https://ui-avatars.com/api/?background=8B1A1A&color=fff&name=Rita+Chalhoub'
    }
  ]

  // Stats data
  const stats = [
    { target: 5000, label: 'Happy Customers', suffix: '+' },
    { target: 15000, label: 'Burgers Sold', suffix: '+' },
    { target: 4.9, label: 'Average Rating', suffix: '' },
    { target: 500, label: '5-Star Reviews', suffix: '+' }
  ]

  // ===== SCROLL PROGRESS =====
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

  // ===== ANIMATE STATS =====
  const animateStats = useCallback(() => {
    const statNumbers = document.querySelectorAll('.stat-number')
    statNumbers.forEach((stat, index) => {
      const target = parseFloat(stat.getAttribute('data-target'))
      const duration = 2000
      const startTime = performance.now()
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = eased * target
        
        if (target % 1 === 0) {
          stat.textContent = Math.floor(current)
        } else {
          stat.textContent = current.toFixed(1)
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          if (target % 1 === 0) {
            stat.textContent = target
          } else {
            stat.textContent = target.toFixed(1)
          }
        }
      }
      
      setTimeout(() => {
        requestAnimationFrame(animate)
      }, index * 200)
    })
  }, [])

  // ===== GSAP SCROLL REVEAL =====
  useEffect(() => {
    // Testimonial cards reveal
    testimonialRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    // Stats section reveal
    if (statsRef.current) {
      gsap.fromTo('.stat-card',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (!statsAnimated) {
                setStatsAnimated(true)
                animateStats()
              }
            }
          }
        }
      )
    }

    // CTA section reveal
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [animateStats, statsAnimated])

  // ===== RENDER STARS =====
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < rating ? '#fbbf24' : 'none'}
        color={i < rating ? '#fbbf24' : 'rgba(255,255,255,0.2)'}
      />
    ))
  }

  return (
    <>


      {/* Scroll Progress Bar */}
      <div 
        id="scrollProgress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Customer <span className="gold-text">Testimonials</span>
          </h1>
          <p className="hero-subtitle">
            Don't just take our word for it. See what our customers have to say about Hanks BBQ!
          </p>
          <div className="rating-summary">
            <div className="stars">
              {renderStars(5)}
            </div>
            <span className="rating-number">4.9</span>
            <span className="rating-count">(500+ reviews)</span>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card"
                ref={el => testimonialRefs.current[index] = el}
              >
                <div className="quote-icon">
                  <Quote size={20} />
                </div>
                <div className="stars-row">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="customer-info">
                  <div className="customer-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="customer-details">
                    <h4 className="customer-name">{testimonial.name}</h4>
                    <p className="customer-title">{testimonial.title}</p>
                  </div>
                </div>
                {testimonial.verified && (
                  <div className="verified-badge">
                    <CheckCircle size={14} />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number" data-target={stat.target}>
                0{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-content">
          <h2>Ready to Smash Your Hunger?</h2>
          <p>Join thousands of satisfied customers and taste the difference!</p>
          <div className="cta-buttons">
            <Link to="/menu?mode=dinein" className="cta-btn primary">Order Now</Link>
            <Link to="/contact" className="cta-btn secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default TestimonialsPage