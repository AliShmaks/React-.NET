import React, { useState, useEffect } from 'react'
import { Footer } from '../components/Layout'
import { 
  MapPin, 
  Phone, 
  Navigation, 
  Clock,
  ChevronDown,
  Utensils,
  Truck,
  ShoppingBag
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import '../styles/LocationPage.css'

const LocationPage = () => {
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

  // Locations data
  const locations = [
    {
      id: 1,
      name: 'Khaldeh',
      address: 'Khaldeh Main Road, Near the Highway, Lebanon',
      phone: '+961 76 002 206',
      phoneRaw: '96176002206',
      directions: 'https://maps.google.com/?q=Khaldeh+Lebanon'
    },
    {
      id: 2,
      name: 'Dahye',
      address: 'Dahye Main Road, Near the Municipality, Lebanon',
      phone: '+961 81 600 699',
      phoneRaw: '96181600699',
      directions: 'https://maps.google.com/?q=Dahye+Lebanon'
    },
    {
      id: 3,
      name: 'Jneh',
      address: 'Jneh Main Road, Near the Intersection, Lebanon',
      phone: '+961 81 863 086',
      phoneRaw: '96181863086',
      directions: 'https://maps.google.com/?q=Jneh+Lebanon'
    }
  ]

  return (
    <>


      {/* Scroll Progress Bar */}
      <div 
        id="scrollProgress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <main className="page-section">
        <div className="locations-container">
          {/* Hero Logo */}
          <div className="locations-logo">
            <img src="/logo.webp" alt="Hanks BBQ Logo" />
          </div>

          <div className="locations-header">
            <h1 className="locations-title">Our Locations</h1>
            <p className="locations-subtitle">Visit your nearest Hanks BBQ for the best BBQ in town</p>
          </div>

          <div className="locations-grid">
            {locations.map((location) => (
              <div key={location.id} className="location-card">
                <div className="location-icon">
                  <MapPin size={28} />
                </div>
                <h3 className="location-name">{location.name}</h3>
                <p className="location-address">{location.address}</p>
                <a 
                  href={`tel:${location.phoneRaw}`} 
                  className="location-phone"
                  onClick={() => toast.success(`Calling ${location.name}...`)}
                >
                  <Phone size={16} />
                  {location.phone}
                </a>
                <a 
                  href={location.directions} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="location-direction"
                  onClick={() => toast.success(`Getting directions to ${location.name}...`)}
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
              </div>
            ))}
          </div>

          {/* Hours Section */}
          <div className="hours-section">
            <div className="hours-card">
              <div className="hours-icon">
                <Clock size={26} />
              </div>
              <h3>Opening Hours</h3>
              <p><strong>Monday - Sunday</strong><br />11:00 AM – 3:00 AM</p>
              <p><strong>Delivery Available</strong><br />Same hours</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default LocationPage