import React, { useState } from 'react'

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'categories', label: 'Categories', icon: '📁' },
    { id: 'products', label: 'Products', icon: '🍖' }
  ]

  const handleNavClick = (tabId) => {
    setActiveTab(tabId)
    setIsOpen(false)
    document.querySelector('.sidebar')?.classList.remove('open')
    document.querySelector('.sidebar-backdrop')?.classList.remove('open')
  }

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{width:'36px', height:'36px', background:'#8B1A1A', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div style={{fontSize:'15px', fontWeight:'700', color:'#fff'}}>Hanks BBQ</div>
              <div style={{fontSize:'11px', color:'#64748B'}}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Overview</div>
          {navItems.map(item => (
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              data-tab={item.id}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-ghost btn-full btn-sm" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar