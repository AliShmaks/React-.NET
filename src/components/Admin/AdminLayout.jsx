import React, { useState, useEffect } from 'react'  // ← ADD useEffect here
import { useNavigate, useLocation } from 'react-router-dom'  // ← ADD useLocation here
import Sidebar from './Sidebar'
import Header from './Header'

function AdminLayout({ children, onLogout, showToast }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [lastSaved, setLastSaved] = useState('')
  const navigate = useNavigate()
  const location = useLocation()  // ← ADD this line

  const updateLastSaved = () => {
    setLastSaved('Last saved ' + new Date().toLocaleTimeString())
  }

  // ← ADD this entire useEffect block
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/categories')) {
      setActiveTab('categories')
    } else if (path.includes('/products')) {
      setActiveTab('products')
    } else {
      setActiveTab('dashboard')
    }
  }, [location.pathname])  // ← END of useEffect

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    navigate(`/shmaksadmin432000/${tab === 'dashboard' ? '' : tab}`)
  }

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} onLogout={onLogout} />
      <div className="main-content">
        <Header activeTab={activeTab} lastSaved={lastSaved} />
        <div className="main-body">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { 
                showToast, 
                updateLastSaved 
              })
            }
            return child
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout