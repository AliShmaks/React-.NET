const API_URL = 'http://localhost:5184/api'

const getToken = () => sessionStorage.getItem('admin_token')

const request = async (url, options = {}) => {
  const token = getToken()

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  })

  let data = null

  if (response.status !== 204) {
    try {
      data = await response.json()
    } catch {
      data = null
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed')
  }

  return data
}

// ==========================================
// AUTHENTICATION
// ==========================================

export const loginUser = async (email, password) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export const logoutUser = async () => {
  sessionStorage.removeItem('admin_token')
  return true
}

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Invalid session')
  }

  return data
}

// ==========================================
// CATEGORIES
// ==========================================

const mapCategoryFromApi = category => ({
  id: category.id,
  category_key: category.categoryKey,
  name: category.name,
  image_seed: category.imageUrl || '',
  display_order: category.displayOrder,
  is_active: category.isActive
})

const mapCategoryToApi = category => ({
  categoryKey: category.category_key,
  name: category.name,
  imageUrl: category.image_seed || '',
  displayOrder: Number(category.display_order) || 0,
  isActive: category.is_active ?? true
})

export const fetchCategories = async () => {
  const categories = await request('/categories')
  return categories.map(mapCategoryFromApi)
}

export const createCategory = async categoryData => {
  const created = await request('/categories', {
    method: 'POST',
    body: JSON.stringify(mapCategoryToApi(categoryData))
  })

  return mapCategoryFromApi(created)
}

export const updateCategory = async (id, categoryData) => {
  const currentCategories = await request('/categories')
  const current = currentCategories.find(category => category.id === id)

  if (!current) {
    throw new Error('Category not found')
  }

  const payload = {
    id,
    categoryKey: current.categoryKey,
    name: categoryData.name ?? current.name,
    imageUrl: categoryData.image_seed ?? current.imageUrl ?? '',
    displayOrder:
      Number(categoryData.display_order ?? current.displayOrder) || 0,
    isActive: categoryData.is_active ?? current.isActive
  }

  await request(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  return mapCategoryFromApi(payload)
}

export const deleteCategory = async id => {
  await request(`/categories/${id}`, {
    method: 'DELETE'
  })

  return true
}

// ==========================================
// PRODUCTS
// ==========================================

const mapProductFromApi = product => ({
  id: product.id,
  category_id: product.categoryId,
  category_key: product.category?.categoryKey || '',
  name: product.name,
  description: product.description,
  ingredients: product.description,
  price: product.price,
  image_url: product.imageUrl || '',
  image_seed: product.imageUrl || '',
  display_order: product.displayOrder,
  bestseller: product.bestseller,
  has_fries: product.hasFries,
  is_spicy: product.isSpicy,
  is_available: product.isAvailable,
  created_at: product.createdAt
})

const mapProductToApi = product => ({
  categoryId: Number(product.category_id),
  name: product.name,
  description: product.description || product.ingredients || '',
  price: Number(product.price) || 0,
  imageUrl: product.image_url || product.image_seed || '',
  displayOrder: Number(product.display_order) || 0,
  bestseller: Boolean(product.bestseller),
  hasFries: Boolean(product.has_fries),
  isSpicy: Boolean(product.is_spicy),
  isAvailable: product.is_available ?? true
})

export const fetchProducts = async categoryKey => {
  const products = await request('/products')
  const mapped = products.map(mapProductFromApi)

  return categoryKey
    ? mapped.filter(product => product.category_key === categoryKey)
    : mapped
}

export const createProduct = async productData => {
  const created = await request('/products', {
    method: 'POST',
    body: JSON.stringify(mapProductToApi(productData))
  })

  return mapProductFromApi(created)
}

export const updateProduct = async (id, productData) => {
  const payload = {
    id,
    ...mapProductToApi(productData)
  }

  await request(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  return mapProductFromApi(payload)
}

export const deleteProduct = async id => {
  await request(`/products/${id}`, {
    method: 'DELETE'
  })

  return true
}

// ==========================================
// DASHBOARD
// ==========================================

export const fetchStats = async () => {
  return request('/dashboard/stats')
}

export const fetchRecentProducts = async (limit = 5) => {
  const products = await request(
    `/dashboard/recent-products?limit=${limit}`
  )

  return products.map(mapProductFromApi)
}

// ==========================================
// IMAGE UPLOAD
// ==========================================

export const uploadImage = async (file, folder = "products") => {
  const token = sessionStorage.getItem("admin_token")

  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(
    `http://localhost:5184/api/images/upload?folder=${folder}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Upload failed")
  }

  return data.imageUrl
}