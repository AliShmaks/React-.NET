import React, { useRef } from 'react'

export const CategoryFilter = ({ categories, selectedCategory, onSwitchCategory }) => {
  const scrollRef = useRef(null)

  const scroll = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className="filter-sticky">
      <div className="filter-container">
        <div className="filter-wrapper">
          <button className="filter-scroll-btn" onClick={() => scroll(-200)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="filter-scroll" ref={scrollRef}>
            {categories.map(cat => (
              <div 
                key={cat.category_key}
                className={`filter-card ${cat.category_key === selectedCategory ? 'active-f' : ''}`}
                onClick={() => onSwitchCategory(cat.category_key)}
              >
                <div className="filter-ring">
                  <img 
                    src={cat.image_seed} 
                    alt={cat.name}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/100x100/333/8B1A1A?text=${cat.name.charAt(0)}`
                    }}
                  />
                </div>
                <p className="filter-name">{cat.name}</p>
              </div>
            ))}
          </div>
          <button className="filter-scroll-btn" onClick={() => scroll(200)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}