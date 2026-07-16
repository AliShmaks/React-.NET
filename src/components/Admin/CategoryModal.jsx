import React, { useState, useEffect } from 'react'
import { useApi} from '../../hooks/useApi'

function CategoryModal({ isOpen, onClose, category, onSaved, showToast }) {
  const [formData, setFormData] = useState({
    id: '',
    categoryKey: '',
    name: '',
    imageUrl: '',
    displayOrder: 0
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { addCategory, editCategory, uploadCategoryImage } = useApi()

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        categoryKey: category.category_key,
        name: category.name || '',
        imageUrl: category.image_seed || '',
        displayOrder: category.display_order || 0
      })
      setImagePreview(category.image_seed || '')
      setIsEditing(true)
    } else {
      resetForm()
    }
  }, [category])

  const resetForm = () => {
    setFormData({
      id: '',
      categoryKey: '',
      name: '',
      imageUrl: '',
      displayOrder: 0
    })
    setImageFile(null)
    setImagePreview('')
    setIsEditing(false)
  }

  const handleClose = () => {
  resetForm()
  setImageFile(null)
  setImagePreview('')
  onClose()
}

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = formData.imageUrl
      
      if (imageFile) {
        const uploadedUrl = await uploadCategoryImage(imageFile)
        if (uploadedUrl) imageUrl = uploadedUrl
      }

      const categoryName = formData.name.trim()
      const categoryKey = formData.categoryKey.trim().toLowerCase().replace(/\s+/g, '-')
      
      if (!categoryName) {
        showToast('Please fill in category name')
        setLoading(false)
        return
      }

      if (isEditing) {
        await editCategory(formData.id, {
          name: categoryName,
          image_seed: imageUrl,
          display_order: parseInt(formData.displayOrder) || 0
        })
      } else {
        if (!categoryKey) {
          showToast('Please fill in category key')
          setLoading(false)
          return
        }
        await addCategory({
          category_key: categoryKey,
          name: categoryName,
          image_seed: imageUrl,
          display_order: parseInt(formData.displayOrder) || 0
        })
      }

      showToast('✅ Category saved!')
       resetForm()
       setImageFile(null)
       setImagePreview('')


      onSaved()
    } catch (error) {
      if (error.code === '23505') {
        showToast('❌ Category key "' + formData.categoryKey + '" already exists!')
      } else {
        showToast('Error: ' + error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{isEditing ? 'Edit Category' : 'Add Category'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Category Key</label>
            <input 
              type="text" 
              name="categoryKey"
              className="form-input" 
              placeholder="e.g., burgers"
              value={formData.categoryKey}
              onChange={handleChange}
              disabled={isEditing}
              style={isEditing ? { backgroundColor: '#1a1a1a', color: '#64748B', cursor: 'not-allowed' } : {}}
            />
            <div className="form-hint">No spaces, use hyphens {isEditing ? '(cannot be changed)' : ''}</div>
          </div>

          <div className="form-group">
            <label className="form-label">Category Name</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              placeholder="e.g., Burgers"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Image</label>
            <div className="file-drop">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="file-icon">📷</div>
              <div className="file-text"><span>Click to upload</span> image from your phone or PC</div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Or paste image URL</label>
            <input 
              type="text" 
              name="imageUrl"
              className="form-input" 
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          {imagePreview && (
            <div className="form-group">
              <img src={imagePreview} className="preview-img" alt="Preview" />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Display Order</label>
            <input 
              type="number" 
              name="displayOrder"
              className="form-input" 
              placeholder="0, 1, 2..."
              value={formData.displayOrder}
              onChange={handleChange}
            />
          </div>

          <div style={{display:'flex', gap:'12px', marginTop:'24px'}}>
            <button type="submit" className="btn btn-red" style={{flex:1}} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className="btn btn-ghost" style={{flex:1}} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryModal