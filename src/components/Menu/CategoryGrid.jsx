import React from 'react'

export const CategoryGrid = ({ categories, title, subtitle, onSelectCategory }) => {
  return (
    <div className="cat-view">
      <div className="cat-header-section">
        <div className="cat-header-content">
          <h1 className="cat-title">{title}</h1>
          <p className="cat-subtitle">{subtitle}</p>
        </div>
        <div id="catGrid" className="cat-grid">
          {categories.map(cat => (
            <div 
              key={cat.category_key}
              className="cat-card" 
              onClick={() => onSelectCategory(cat.category_key)}
            >
              <div className="cat-img">
                <img 
                  src={cat.image_seed} 
                  alt={cat.name}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/200x200/333/8B1A1A?text=${cat.name.charAt(0)}`
                  }}
                />
              </div>
              <p className="cat-name">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}