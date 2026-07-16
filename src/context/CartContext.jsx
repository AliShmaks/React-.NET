import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem('hanks_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    sessionStorage.setItem('hanks_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (catId, idx, item) => {
    const key = `${catId}-${idx}`
    setCart(prev => {
      const existing = prev.find(c => c.key === key)
      if (existing) {
        return prev.map(c => 
          c.key === key ? { ...c, qty: c.qty + 1 } : c
        )
      }
      return [...prev, { 
        key, catId, idx, 
        name: item.name, 
        price: item.price, 
        image: item.image_seed, 
        qty: 1 
      }]
    })
  }

  const removeFromCart = (key) => {
    setCart(prev => prev.filter(c => c.key !== key))
  }

  const changeQty = (key, delta) => {
    setCart(prev => {
      const item = prev.find(c => c.key === key)
      if (!item) return prev
      const newQty = item.qty + delta
      if (newQty <= 0) {
        return prev.filter(c => c.key !== key)
      }
      return prev.map(c => 
        c.key === key ? { ...c, qty: newQty } : c
      )
    })
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.qty, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      changeQty,
      getTotalItems,
      getTotalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}