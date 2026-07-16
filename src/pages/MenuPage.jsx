import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Footer } from '../components/Layout'  
import { CategoryGrid } from '../components/Menu/CategoryGrid'
import { CategoryFilter } from '../components/Menu/CategoryFilter'
import { ProductGrid } from '../components/Menu/ProductGrid'
import { ProductDetail } from '../components/Menu/ProductDetail'
import { useApi } from '../hooks/useApi'
import '../styles/MenuPage.css'

const MenuPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [detailItem, setDetailItem] = useState(null)
  
  const { categories, products } = useApi()
  
  const mode = searchParams.get('mode') || 'dinein'
  const categoryFromURL = searchParams.get('cat')

  // Set initial category from URL
  useEffect(() => {
    if (categories.length > 0 && categoryFromURL) {
      setSelectedCategory(categoryFromURL)
    }
  }, [categories, categoryFromURL])

  // Handle category selection from CategoryGrid (updates URL)
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId)
    navigate(`/menu?mode=${mode}&cat=${catId}`)
  }

  // Handle category switch from CategoryFilter (DOES NOT update URL)
  const handleSwitchCategory = (catId) => {
    setSelectedCategory(catId) // Just change the state, no URL update
    // ❌ NO navigate() here!
  }

  const handleOpenDetail = (catId, idx) => {
    const item = products[catId]?.[idx]
    if (item) setDetailItem({ catId, idx, item })
  }

  const handleCloseDetail = () => {
    setDetailItem(null)
    navigate(`/menu?mode=${mode}&cat=${selectedCategory}`)
  }

  const title = mode === 'delivery' ? 'Delivery Menu' : 'Dine-in Menu'
  const subtitle = mode === 'delivery' 
    ? 'Add items to your cart for delivery' 
    : 'Browse our full menu'

  if (categories.length === 0) {
    return null
  }

  return (
    <>
      <div className="page-section">
        {!selectedCategory ? (
          <CategoryGrid 
            categories={categories} 
            title={title} 
            subtitle={subtitle}
            onSelectCategory={handleSelectCategory}
          />
        ) : (
          <div className="products-view">
            <div className="sticky-category-filter">
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onSwitchCategory={handleSwitchCategory} // This won't update URL
              />
            </div>
            
            <ProductGrid 
              key={selectedCategory}
              products={products[selectedCategory] || []}
              categoryName={categories.find(c => c.category_key === selectedCategory)?.name}
              selectedCategory={selectedCategory}
              mode={mode}
              onOpenDetail={handleOpenDetail}
            />
          </div>
        )}
      </div>
      <Footer />
      
      {detailItem && (
        <ProductDetail 
          item={detailItem}
          mode={mode}
          onClose={handleCloseDetail}
        />
      )}
    </>
  )
}

export default MenuPage