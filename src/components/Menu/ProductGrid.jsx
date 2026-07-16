import React from 'react'
import { useCart } from '../../context/CartContext'
import { showToast } from '../Layout/Toast'

export const ProductGrid = ({ 
  products, 
  categoryName, 
  selectedCategory, 
  mode, 
  onOpenDetail 
}) => {
  const { cart, addToCart, changeQty } = useCart()

  const getQty = (key) => {
    const item = cart.find(c => c.key === key)
    return item ? item.qty : 0
  }

  const handleAddToCart = (e, catId, idx, item) => {
    e.stopPropagation()
    addToCart(catId, idx, item)
    showToast(`${item.name} added to cart!`)
  }

  const handleQtyChange = (e, key, delta) => {
    e.stopPropagation()
    changeQty(key, delta)
  }

  if (products.length === 0) {
    return (
      <div className="products-section">
        <div className="products-container">
          <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            Coming soon...
          </p>
        </div>
      </div>
    )
  }

  const isDelivery = mode === 'delivery'

  return (
    <div className="products-section">
      <div className="products-container">
        {/* REMOVED: products-header, products-title, products-title-underline */}
        {/* The category name is now shown in the filter bar or badge */}
        
        <div className="products-grid view-grid">
          {products.map((item, idx) => {
            const key = `${selectedCategory}-${idx}`
            const qty = getQty(key)
            const hasItem = qty > 0

            return (
              <div 
                key={idx}
                className="menu-card" 
                onClick={() => onOpenDetail(selectedCategory, idx)}
              >
                <div className="mc-img">
                  <img 
                    src={item.image_seed || ''} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/300x200/333/8B1A1A?text=${item.name.charAt(0)}`
                    }}
                  />
                  {item.bestseller && (
                    <div className="badge-bs">★ Bestseller</div>
                  )}
                </div>
                <div className="mc-info">
                  <h3>{item.name}</h3>
                  <span className="price">${item.price.toFixed(2)}</span>
                  {item.ingredients && (
                    <p className="desc">{item.ingredients}</p>
                  )}
                  <div className="badge-group">
                    {item.has_fries && <span className="badge-fries">🍟 Fries</span>}
                    {item.is_spicy && <span className="badge-spicy">🌶️ Spicy</span>}
                  </div>
                  <div className="mc-bottom">
                    <div className="mc-action" data-key={key}>
                      {isDelivery ? (
                        hasItem ? (
                          <div className="quantity-selector">
                            <button 
                              className="qty-minus" 
                              onClick={(e) => handleQtyChange(e, key, -1)}
                            >−</button>
                            <span className="qty-number">{qty}</span>
                            <button 
                              className="qty-plus" 
                              onClick={(e) => handleQtyChange(e, key, 1)}
                            >+</button>
                          </div>
                        ) : (
                          <button 
                            className="atc-btn" 
                            onClick={(e) => handleAddToCart(e, selectedCategory, idx, item)}
                          >+ Add</button>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}