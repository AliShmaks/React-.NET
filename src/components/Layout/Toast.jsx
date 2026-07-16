import React, { useState, useEffect } from 'react'

export const Toast = () => {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleToast = (e) => {
      setMessage(e.detail.message)
      setVisible(true)
      setTimeout(() => setVisible(false), 2500)
    }

    window.addEventListener('show-toast', handleToast)
    return () => window.removeEventListener('show-toast', handleToast)
  }, [])

  if (!visible) return null

  return <div className="toast show">{message}</div>
}

export const showToast = (message) => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { message } }))
}
