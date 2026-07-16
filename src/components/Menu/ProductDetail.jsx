import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { showToast } from '../Layout/Toast'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export const ProductDetail = ({ item, mode, onClose }) => {
  const { cart, addToCart, changeQty } = useCart()
  const { catId, idx, item: product } = item
  const [isAnimating, setIsAnimating] = useState(false)

  const key = `${catId}-${idx}`
  const cartItem = cart.find(c => c.key === key)
  const qty = cartItem ? cartItem.qty : 0
  const isDelivery = mode === 'delivery'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleAddToCart = (e) => {
    // Create ripple effect
    const btn = e.currentTarget
    const ripple = document.createElement('span')
    ripple.classList.add('ripple')
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px'
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px'
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)

    // Pulse animation
    btn.classList.add('pulse')
    setTimeout(() => btn.classList.remove('pulse'), 400)

    // Start transforming
    setIsAnimating(true)
    btn.classList.add('transforming')

    // After animation, add to cart and show quantity selector
    setTimeout(() => {
      addToCart(catId, idx, product)
      showToast(`${product.name} added to cart!`)
      setIsAnimating(false)
      btn.style.display = 'none'
      
      // Show quantity selector with animation
      const parent = btn.closest('.detail-footer')
      const qtySelector = parent?.querySelector('.quantity-selector-container .quantity-selector')
      if (qtySelector) {
        qtySelector.style.display = 'flex'
        qtySelector.style.animation = 'none'
        void qtySelector.offsetWidth // Trigger reflow
        qtySelector.style.animation = 'qtyAppear 0.4s ease forwards'
      }
    }, 500)
  }

  const handleQtyChange = (delta) => {
    if (qty + delta <= 0) {
      changeQty(key, -qty)
      showToast(`${product.name} removed from cart`)
      
      // Show Add button again when quantity goes to 0
      setTimeout(() => {
        const parent = document.querySelector('.detail-footer')
        const addBtn = parent?.querySelector('.atc-btn')
        const qtySelector = parent?.querySelector('.quantity-selector')
        if (addBtn) {
          addBtn.style.display = 'flex'
          addBtn.classList.remove('transforming')
        }
        if (qtySelector) {
          qtySelector.style.display = 'none'
        }
      }, 300)
    } else {
      changeQty(key, delta)
      showToast(delta > 0 ? `Added 1 ${product.name}` : `Removed 1 ${product.name}`)
    }
  }

  return (
    <div className="detail-page active">
      <button className="detail-back" onClick={onClose}>
        <ArrowLeft size={24} />
      </button>

      <div className="detail-scroll">
        <div className="detail-hero">
          <img 
            src={product.image_seed || ''}
            alt={product.name}
            onError={(e) => {
              e.target.src = `https://placehold.co/600x400/333/8B1A1A?text=${product.name.charAt(0)}`
            }}
          />
        </div>
        <div className="detail-body">
          <div className="detail-head">
            <h1>{product.name}</h1>
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
          <div className="badge-group">
            {product.bestseller && (
              <span className="badge-bs" style={{ position: 'relative', top: 0, right: 0 }}>
                ★ Bestseller
              </span>
            )}
            {product.has_fries && <span className="badge-fries">🍟 Includes Fries</span>}
            {product.is_spicy && <span className="badge-spicy">🌶️ Spicy</span>}
          </div>
          <p className="desc">{product.ingredients || ''}</p>
        </div>
      </div>

      <div className="detail-footer">
        {isDelivery ? (
          <>
            {qty > 0 && !isAnimating ? (
              <div className="quantity-selector-container">
                <div className="quantity-selector visible">
                  <button className="qty-minus" onClick={() => handleQtyChange(-1)}>−</button>
                  <span className="qty-number">{qty}</span>
                  <button className="qty-plus" onClick={() => handleQtyChange(1)}>+</button>
                </div>
              </div>
            ) : (
              <button 
                className="atc-btn" 
                onClick={handleAddToCart}
                style={{ display: isAnimating ? 'none' : 'flex' }}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
            )}
            {/* Hidden button for animation */}
            {isAnimating && (
              <button className="atc-btn transforming" style={{ display: 'flex' }}>
                <ShoppingBag size={18} /> Add to Cart
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}