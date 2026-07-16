import React from 'react'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/logo.webp" alt="Shmaks BBQ Logo" />
          </div>
          <span className="footer-copyright">© 2026 Shmaks BBQ. All rights reserved.</span>
        </div>
        <div className="footer-right">
          <div className="developer-credit">
            Coded by{' '}
            <a 
              href="https://www.instagram.com/alishararah_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="developer-link"
            >
              Ali Shararah
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
