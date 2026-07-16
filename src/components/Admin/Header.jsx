import React from 'react'

function Header({ activeTab, lastSaved }) {
  const titles = {
    dashboard: 'Dashboard',
    categories: 'Categories',
    products: 'Products'
  }

  const toggleSidebar = () => {
    document.querySelector('.sidebar')?.classList.toggle('open')
    document.querySelector('.sidebar-backdrop')?.classList.toggle('open')
  }

  return (
    <header className="main-header">
      <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
        <button className="mobile-toggle" onClick={toggleSidebar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h2 style={{fontSize:'18px', fontWeight:'600', color:'#fff'}}>
          {titles[activeTab] || 'Dashboard'}
        </h2>
      </div>
      <div style={{fontSize:'13px', color:'#64748B'}}>{lastSaved}</div>
    </header>
  )
}

export default Header