import React, { useState, useEffect } from 'react'
import {  Footer } from '../components/Layout'
import { 
  Phone, 
  Clock, 
  Send
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import '../styles/ContactPage.css'

const ContactPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false)  // ← RENAMED
  const [popupContext, setPopupContext] = useState({})
  const [popupCallback, setPopupCallback] = useState(null)

  // Location data - HANKS BBQ BRANCHES
  const locations = [
    { name: 'Khaldeh', phone: '96176002206', display: '76 002 206' },
    { name: 'Dahye', phone: '96181600699', display: '81 600 699' },
    { name: 'Jneh', phone: '96181863086', display: '81 863 086' }
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id === 'contactName' ? 'name' : id === 'contactPhone' ? 'phone' : 'message']: value
    }))
  }

  // ========== LOCATION POPUP FUNCTIONS ==========
  
  // Show location popup - RENAMED FUNCTION
  const openLocationPopup = (callback, contextData = {}) => {
    setPopupCallback(() => callback)
    setPopupContext(contextData)
    setIsLocationPopupOpen(true)
    document.body.style.overflow = 'hidden'
  }

  // Close location popup
  const closeLocationPopup = () => {
    setIsLocationPopupOpen(false)
    document.body.style.overflow = ''
    setPopupCallback(null)
    setPopupContext({})
  }

  // Handle location selection
  const handleLocationSelect = (phoneNum, locName) => {
    if (popupCallback) {
      popupCallback(phoneNum, locName, popupContext)
    }
    closeLocationPopup()
  }

  // ========== CONTACT ACTION HANDLERS ==========

  // Handle phone call - shows location popup first
  const handlePhoneClick = (e) => {
    e.preventDefault()
    openLocationPopup((phoneNum, locName) => {
      window.location.href = `tel:${phoneNum}`
      toast.success(`Calling ${locName}...`)
    }, {})
  }

  // Handle WhatsApp - shows location popup first
  const handleWhatsAppClick = (e) => {
    e.preventDefault()
    openLocationPopup((phoneNum, locName) => {
      const message = `Hello Hanks BBQ ${locName}! I'm contacting you from your website.`
      const encodedMsg = encodeURIComponent(message)
      window.open(`https://wa.me/${phoneNum}?text=${encodedMsg}`, '_blank')
      toast.success(`Opening WhatsApp for ${locName}...`)
    }, {})
  }

  // Handle form submit - shows location popup first
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    
    // Show location popup with form data
    openLocationPopup((phoneNum, locName, contextData) => {
      const { name, phone, message } = contextData
      
      const whatsappMsg = `🍖 *New Contact Message from Hanks BBQ Website* 🍖\n\n🏪 *Branch:* ${locName}\n👤 *Name:* ${name}\n📱 *Phone:* ${phone}\n💬 *Message:* ${message}\n\n---\n*Sent from Hanks BBQ Contact Form*`
      
      const encodedMsg = encodeURIComponent(whatsappMsg)
      window.open(`https://wa.me/${phoneNum}?text=${encodedMsg}`, '_blank')
      
      // Reset form
      setFormData({ name: '', phone: '', message: '' })
      toast.success(`Sending message to ${locName}...`)
      setIsSubmitting(false)
    }, formData)
  }

  return (
    <>

      
      {/* Scroll Progress Bar */}
      <div 
        id="scrollProgress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <section className="page-section">
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">Contact Us</h1>
          </div>
          
          <div className="contact-grid">
            {/* Left Side - Contact Info */}
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-content">
                  <p className="info-label">Phone</p>
                  <a 
                    href="#" 
                    className="info-value" 
                    onClick={handlePhoneClick}
                  >
                    Call us
                  </a>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaWhatsapp size={24} />
                </div>
                <div className="info-content">
                  <p className="info-label">WhatsApp</p>
                  <a 
                    href="#" 
                    className="info-value" 
                    onClick={handleWhatsAppClick}
                  >
                    Chat with us
                  </a>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <Clock size={24} />
                </div>
                <div className="info-content">
                  <p className="info-label">Hours</p>
                  <p className="info-value">Daily: 12:00 AM – 3:00 AM</p>
                </div>
              </div>
            </div>
            
            {/* Right Side - Contact Form */}
            <div className="contact-form-card">
              <h3 className="form-title">Send us a Message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="contactName" 
                    className="form-input" 
                    placeholder="Your name" 
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input 
                    type="tel" 
                    id="contactPhone" 
                    className="form-input" 
                    placeholder="Your phone number" 
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea 
                    id="contactMessage" 
                    className="form-textarea" 
                    rows="4" 
                    placeholder="How can we help?" 
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  <Send size={18} /> 
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location Popup Modal */}
      {isLocationPopupOpen && (
        <div 
          className="location-popup" 
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLocationPopup()
          }}
        >
          <div className="location-popup-content">
            <div className="location-popup-header">
              <h3>📍 Select Your Branch</h3>
              <button className="location-popup-close" onClick={closeLocationPopup}>
                &times;
              </button>
            </div>
            <div className="location-popup-body">
              <p>Which Hanks BBQ branch would you like to contact?</p>
              <div className="location-options">
                {locations.map((loc) => (
                  <button 
                    key={loc.phone}
                    className="location-option" 
                    onClick={() => handleLocationSelect(loc.phone, loc.name)}
                  >
                    <span className="loc-name">{loc.name}</span>
                    <span className="loc-phone">{loc.display}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default ContactPage