import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import Login from '../components/Admin/Login'
import AdminLayout from '../components/Admin/AdminLayout'
import Dashboard from '../components/Admin/Dashboard'
import Categories from '../components/Admin/Categories'
import Products from '../components/Admin/Products'
import { showToast } from '../components/Layout/Toast'
import '../styles/admin.css'

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { checkSession, logout } = useApi()

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token) {
      checkSession(token).then(user => {
        if (user) setIsAuthenticated(true)
        else sessionStorage.removeItem('admin_token')
      }).catch(() => sessionStorage.removeItem('admin_token'))
    }
  }, [])

  const handleLogin = (token) => {
    sessionStorage.setItem('admin_token', token)
    setIsAuthenticated(true)
    showToast('✅ Login successful!') 
  }

  const handleLogout = async () => {
    try {
      await logout()
      sessionStorage.removeItem('admin_token')
      setIsAuthenticated(false)
      showToast('🔒 Logged out') 
    } catch (error) {
      showToast('Error logging out: ' + error.message)
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories showToast={showToast} />} />
        <Route path="/products" element={<Products showToast={showToast} />} />
        <Route path="*" element={<Navigate to="/shmaksadmin432000" replace />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminApp