import React, { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'

function ProductModal({
  isOpen,
  onClose,
  product,
  categories,
  onSaved,
  showToast
}) {
  const [formData, setFormData] = useState({
    id: '',
    categoryKey: '',
    name: '',
    price: '',
    ingredients: '',
    imageUrl: '',
    displayOrder: 0,
    bestseller: false,
    hasFries: false,
    isSpicy: false
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const {
    addProduct,
    editProduct,
    uploadProductImage
  } = useApi()

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        categoryKey: product.category_key || '',
        name: product.name || '',
        price: product.price || '',
        ingredients:
          product.ingredients ||
          product.description ||
          '',
        imageUrl:
          product.image_seed ||
          product.image_url ||
          '',
        displayOrder: product.display_order || 0,
        bestseller: product.bestseller || false,
        hasFries: product.has_fries || false,
        isSpicy: product.is_spicy || false
      })

      setImagePreview(
        product.image_seed ||
        product.image_url ||
        ''
      )

      setIsEditing(true)
    } else {
      resetForm()
    }
  }, [product])

  const resetForm = () => {
    setFormData({
      id: '',
      categoryKey: '',
      name: '',
      price: '',
      ingredients: '',
      imageUrl: '',
      displayOrder: 0,
      bestseller: false,
      hasFries: false,
      isSpicy: false
    })

    setImageFile(null)
    setImagePreview('')
    setIsEditing(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData(previous => ({
      ...previous,
      [name]: type === 'checkbox'
        ? checked
        : value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    setImageFile(file)

    const reader = new FileReader()

    reader.onload = event => {
      setImagePreview(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const selectedCategory = categories.find(
      category =>
        category.category_key === formData.categoryKey
    )

    if (!selectedCategory) {
      showToast('Please select a valid category')
      return
    }

    const productName = formData.name.trim()
    const parsedPrice = Number.parseFloat(formData.price)

    if (!productName || Number.isNaN(parsedPrice)) {
      showToast('Please fill: Category, Name, and Price')
      return
    }

    setLoading(true)

    try {
      let imageUrl = formData.imageUrl

      if (imageFile) {
        const uploadedUrl =
          await uploadProductImage(imageFile)

        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const productData = {
        category_id: selectedCategory.id,
        category_key: selectedCategory.category_key,
        name: productName,
        description: formData.ingredients.trim(),
        ingredients: formData.ingredients.trim(),
        price: parsedPrice,
        image_url: imageUrl,
        image_seed: imageUrl,
        display_order:
          Number.parseInt(formData.displayOrder, 10) || 0,
        bestseller: formData.bestseller,
        has_fries: formData.hasFries,
        is_spicy: formData.isSpicy,
        is_available: true
      }

      if (isEditing) {
        await editProduct(formData.id, productData)
      } else {
        await addProduct(productData)
      }

      showToast('✅ Product saved!')
      resetForm()
      await onSaved()
    } catch (error) {
      showToast('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleClose}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal-title">
          {isEditing ? 'Edit Product' : 'Add Product'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Category
            </label>

            <select
              name="categoryKey"
              className="form-input"
              value={formData.categoryKey}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map(category => (
                <option
                  key={category.id}
                  value={category.category_key}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '16px'
            }}
          >
            <div className="form-group">
              <label className="form-label">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g., Classic Smashed"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Price ($)
              </label>

              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="10.99"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Ingredients
            </label>

            <textarea
              name="ingredients"
              className="form-input"
              rows="3"
              placeholder="List ingredients..."
              value={formData.ingredients}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Upload Image
            </label>

            <div className="file-drop">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              <div className="file-icon">🍖</div>

              <div className="file-text">
                <span>Click to upload</span> image from
                your phone or PC
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Or paste image URL
            </label>

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
              <img
                src={imagePreview}
                className="preview-img"
                alt="Preview"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              Display Order
            </label>

            <input
              type="number"
              name="displayOrder"
              className="form-input"
              placeholder="0, 1, 2..."
              value={formData.displayOrder}
              onChange={handleChange}
            />

            <div className="form-hint">
              Lower numbers appear first
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              margin: '8px 0 20px'
            }}
          >
            <label className="checkbox-wrap">
              <input
                type="checkbox"
                name="bestseller"
                checked={formData.bestseller}
                onChange={handleChange}
              />
              ⭐ Bestseller
            </label>

            <label className="checkbox-wrap">
              <input
                type="checkbox"
                name="hasFries"
                checked={formData.hasFries}
                onChange={handleChange}
              />
              🍟 Includes Fries
            </label>

            <label className="checkbox-wrap">
              <input
                type="checkbox"
                name="isSpicy"
                checked={formData.isSpicy}
                onChange={handleChange}
              />
              🌶️ Spicy
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              className="btn btn-red"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              style={{ flex: 1 }}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal