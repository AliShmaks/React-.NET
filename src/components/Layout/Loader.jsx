import React, { useState, useEffect } from 'react'

export const Loader = () => {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setVisible(true)
    setFading(false)

    const timer = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setVisible(false)
      }, 100)  // ← 0.5s fade out
    }, 700)    // ← Show for 0.5s

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className={`loader-overlay ${fading ? 'fade-out' : ''}`}>
      <div className="loader-container">
        <div className="loader-logo">
          <img src="/logo.webp" alt="Shmaks BBQ Logo" />
        </div>
        <div className="loader-bar"></div>
      </div>
    </div>
  )
}