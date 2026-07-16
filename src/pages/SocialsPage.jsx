import React, { useState, useEffect } from 'react'
import { Footer } from '../components/Layout'
import { 
  Instagram,
  Music, 
  MessageCircle, 
  Heart,
  ChevronDown,
  Utensils,
  Truck,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import '../styles/SocialsPage.css'

const SocialsPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)

  // WhatsApp numbers
  const whatsappNumbers = [
    { name: 'Khaldeh', number: '96176002206', display: '76 002 206', flag: '🇱🇧' },
    { name: 'Dahye', number: '96181600699', display: '81 600 699', flag: '🇱🇧' },
    { name: 'Jneh', number: '96181863086', display: '81 863 086', flag: '🇱🇧' }
  ]

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

  // Handle WhatsApp click - show modal
  const handleWhatsAppClick = () => {
    setShowWhatsAppModal(true)
    document.body.style.overflow = 'hidden'
  }

  // Close WhatsApp modal
  const closeWhatsAppModal = () => {
    setShowWhatsAppModal(false)
    document.body.style.overflow = ''
  }

  // Handle WhatsApp number selection
  const handleWhatsAppSelect = (number) => {
    const whatsappUrl = `https://wa.me/${number}`
    window.open(whatsappUrl, '_blank')
    closeWhatsAppModal()
    toast.success('Opening WhatsApp...')
  }

  return (
    <>
    

      {/* Scroll Progress Bar */}
      <div 
        id="scrollProgress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <main className="page-section">
        <div className="socials-container">
          <div className="socials-header">
            <h1 className="socials-title">Follow Hanks BBQ</h1>
            <p className="socials-subtitle">Stay updated with our latest BBQ, offers, and events</p>
          </div>

          <div className="socials-grid">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/hanks.bbq/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-card instagram"
            >
              <div className="social-icon-bg">
                <Instagram size={40} />
              </div>
              <h3 className="social-name">Instagram</h3>
              <p className="social-handle">@hanks.bbq</p>
              <div className="social-follow-btn">
                <span>Follow</span>
                <span className="arrow-icon">→</span>
              </div>
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@hanks_bbq_delbani" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-card tiktok"
            >
              <div className="social-icon-bg">
                <Music size={40} />
              </div>
              <h3 className="social-name">TikTok</h3>
              <p className="social-handle">@hanks_bbq_delbani</p>
              <div className="social-follow-btn">
                <span>Follow</span>
                <span className="arrow-icon">→</span>
              </div>
            </a>

            {/* WhatsApp */}
            <div 
              className="social-card whatsapp"
              onClick={handleWhatsAppClick}
            >
              <div className="social-icon-bg">
                <FaWhatsapp size={40} />
              </div>
              <h3 className="social-name">WhatsApp</h3>
              <p className="social-handle">Choose a number</p>
              <div className="social-follow-btn">
                <span>Chat Now</span>
                <span className="arrow-icon">→</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="socials-cta">
            <div className="cta-card">
              <Heart size={40} />
              <p>Tag us in your posts for a chance to be featured!</p>
              <span className="cta-hashtag">#HanksBBQ</span>
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="whatsapp-modal active" onClick={(e) => {
          if (e.target === e.currentTarget) closeWhatsAppModal()
        }}>
          <div className="modal-content">
            <div className="modal-icon">
              <FaWhatsapp size={32} />
            </div>
            <h3>Choose a number</h3>
            <p>Select a WhatsApp number to chat with us</p>
            <div className="number-options">
              {whatsappNumbers.map((item) => (
                <div 
                  key={item.number}
                  className="number-btn"
                  onClick={() => handleWhatsAppSelect(item.number)}
                >
                  <span className="number-text">
                    <span className="phone-icon">📞</span>
                    <span>{item.flag} {item.name} - {item.display}</span>
                  </span>
                  <FaWhatsapp className="whatsapp-icon" />
                </div>
              ))}
            </div>
            <button className="close-modal-btn" onClick={closeWhatsAppModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default SocialsPage