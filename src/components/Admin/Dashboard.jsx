import React from 'react'
import { useApi } from '../../hooks/useApi'
import Stats from './Stats'

function Dashboard({ showToast }) {
  const { stats, recentProducts, loading } = useApi()

  const handleAddProduct = () => {
    const event = new CustomEvent('openProductModal')
    document.dispatchEvent(event)
  }

  const handleAddCategory = () => {
    const event = new CustomEvent('openCategoryModal')
    document.dispatchEvent(event)
  }

  const handleViewAll = () => {
    const productsTab = document.querySelector('[data-tab="products"]')
    if (productsTab) productsTab.click()
  }

  return (
    <>
      <Stats stats={stats} />

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
        </div>
        <div style={{display:'flex', flexWrap:'wrap', gap:'10px'}}>
          <button className="btn btn-red btn-sm" onClick={handleAddProduct}>+ Add Product</button>
          <button className="btn btn-ghost btn-sm" onClick={handleAddCategory}>+ Add Category</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Products</h3>
          <button className="btn btn-ghost btn-sm" onClick={handleViewAll}>View All →</button>
        </div>
        <div id="recentProducts">
          {loading ? (
            <div style={{color:'#475569', padding:'16px'}}>Loading...</div>
          ) : recentProducts.length === 0 ? (
            <div style={{color:'#475569', padding:'16px'}}>No products yet</div>
          ) : (
            recentProducts.map(product => (
              <div key={product.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(139,26,26,0.1)'}}>
                <div>
                  <div style={{fontSize:'13px', color:'#fff', fontWeight:'500'}}>{product.name}</div>
                  <div style={{fontSize:'11px', color:'#475569'}}>{product.category_key}</div>
                </div>
                <span style={{color:'#8B1A1A', fontWeight:'600'}}>${product.price}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard