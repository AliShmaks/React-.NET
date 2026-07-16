import React from 'react'

function Stats({ stats }) {
  const statItems = [
    { icon: '📁', value: stats.categories, label: 'Categories' },
    { icon: '🍖', value: stats.products, label: 'Products' },
    { icon: '⭐', value: stats.bestsellers, label: 'Bestsellers' },
    { icon: '🌶️', value: stats.spicy, label: 'Spicy Items' }
  ]

  return (
    <div className="stat-grid">
      {statItems.map((item, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">{item.icon}</div>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export default Stats