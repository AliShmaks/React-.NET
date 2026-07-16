import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import ProductModal from './ProductModal'

function Products({ showToast, updateLastSaved }) {
  const { 
    categories,
    products: productsByCategory,
    loading,
    removeProduct,
    refreshProducts,
    refreshStats,
    refreshRecentProducts
  } = useApi()
  
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    let allProducts = []
    Object.values(productsByCategory).forEach(categoryProducts => {
      allProducts = [...allProducts, ...categoryProducts]
    })
    
    if (filter) {
      setFilteredProducts(allProducts.filter(p => p.category_key === filter))
    } else {
      setFilteredProducts(allProducts)
    }
  }, [productsByCategory, filter])

  useEffect(() => {
    const handleOpenModal = () => {
      setEditingProduct(null)
      setShowModal(true)
    }

    document.addEventListener('openProductModal', handleOpenModal)
    return () => document.removeEventListener('openProductModal', handleOpenModal)
  }, [])

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('⚠️ Delete this product?')) return

    try {
      await removeProduct(id)
      showToast('✅ Product deleted!')
      await refreshProducts()
      await refreshStats()
      await refreshRecentProducts()
      if (updateLastSaved) updateLastSaved()
    } catch (error) {
      showToast('Error: ' + error.message)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleProductSaved = async () => {
    await refreshProducts()
    await refreshStats()
    await refreshRecentProducts()
    if (updateLastSaved) updateLastSaved()
    handleModalClose()
  }

  const escapeHtml = (str) => {
    if (!str) return ''
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;'
      if (m === '<') return '&lt;'
      if (m === '>') return '&gt;'
      return m
    })
  }

  const catMap = {}
  categories.forEach(c => catMap[c.category_key] = c.name)

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Products</h3>
          <button className="btn btn-red btn-sm" onClick={() => { setEditingProduct(null); setShowModal(true); }}>
            + Add Product
          </button>
        </div>
        
        <div className="form-group" style={{maxWidth:'280px'}}>
          <select 
            className="form-input" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.category_key}>{c.name}</option>
            ))}
          </select>
        </div>

        <div id="productsList">
          {loading ? (
            <div style={{color:'#475569', textAlign:'center', padding:'32px'}}>Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div style={{color:'#475569', textAlign:'center', padding:'32px'}}>No products found. Click + Add Product.</div>
          ) : (
            filteredProducts.map(p => (
              <div key={p.id} className="item-row">
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                  {p.image_seed ? (
                    <img src={p.image_seed} style={{width:'44px', height:'44px', borderRadius:'10px', objectFit:'cover'}} alt={p.name} />
                  ) : (
                    <div style={{width:'44px', height:'44px', background:'#0d0d0d', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px'}}>🍖</div>
                  )}
                  <div>
                    <div style={{fontWeight:'500', color:'#fff'}}>
                      {escapeHtml(p.name)} {p.bestseller ? '⭐' : ''}{p.is_spicy ? '🌶️' : ''}
                    </div>
                    <div style={{fontSize:'12px', color:'#475569'}}>
                      {escapeHtml(catMap[p.category_key] || p.category_key)} {p.has_fries ? '· 🍟' : ''}
                    </div>
                  </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                  <span style={{color:'#8B1A1A', fontWeight:'700'}}>${p.price}</span>
                  <button onClick={() => handleEdit(p)} className="btn btn-ghost btn-sm">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={handleModalClose}
        product={editingProduct}
        categories={categories}
        onSaved={handleProductSaved}
        showToast={showToast}
      />
    </>
  )
}

export default Products