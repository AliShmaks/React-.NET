import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import CategoryModal from './CategoryModal'

function Categories({ showToast, updateLastSaved }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const loadCategories = async () => {
    try {
      setLoading(true)

      const data = await api.getCategories()
      setCategories(data)
    } catch (error) {
      showToast('Error loading categories: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    const handleOpenModal = () => {
      setEditingCategory(null)
      setShowModal(true)
    }

    document.addEventListener('openCategoryModal', handleOpenModal)

    return () => {
      document.removeEventListener('openCategoryModal', handleOpenModal)
    }
  }, [])

  const handleEdit = (category) => {
    setEditingCategory(category)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      '⚠️ WARNING: Delete this category? ALL products in it will be deleted!'
    )

    if (!confirmed) return

    try {
      await api.deleteCategory(id)

      showToast('✅ Category deleted!')
      await loadCategories()

      if (updateLastSaved) {
        updateLastSaved()
      }
    } catch (error) {
      showToast('Error: ' + error.message)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingCategory(null)
  }

  const handleCategorySaved = async () => {
    await loadCategories()

    if (updateLastSaved) {
      updateLastSaved()
    }

    handleModalClose()
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Categories</h3>

          <button
            className="btn btn-red btn-sm"
            onClick={() => {
              setEditingCategory(null)
              setShowModal(true)
            }}
          >
            + Add Category
          </button>
        </div>

        <div id="categoriesList">
          {loading ? (
            <div
              style={{
                color: '#475569',
                textAlign: 'center',
                padding: '32px'
              }}
            >
              Loading...
            </div>
          ) : categories.length === 0 ? (
            <div
              style={{
                color: '#475569',
                textAlign: 'center',
                padding: '32px'
              }}
            >
              No categories yet. Click + Add Category.
            </div>
          ) : (
            categories.map(category => (
              <div key={category.id} className="item-row">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                      alt={category.name}
                    />
                  ) : (
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: '#0d0d0d',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      📁
                    </div>
                  )}

                  <div>
                    <div style={{ fontWeight: '500', color: '#fff' }}>
                      {category.name}
                    </div>

                    <div style={{ fontSize: '12px', color: '#475569' }}>
                      {category.categoryKey} · Order: {category.displayOrder}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleEdit(category)}
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CategoryModal
        isOpen={showModal}
        onClose={handleModalClose}
        category={editingCategory}
        onSaved={handleCategorySaved}
        showToast={showToast}
      />
    </>
  )
}

export default Categories