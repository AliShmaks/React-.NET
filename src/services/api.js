const API_URL = 'http://localhost:5184/api'

const getToken = () => sessionStorage.getItem('admin_token')

const handleResponse = async (response, fallbackMessage) => {
  if (!response.ok) {
    let message = fallbackMessage

    try {
      const errorData = await response.json()
      message = errorData.message || fallbackMessage
    } catch {}

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

const authHeaders = () => {
  const token = getToken()

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export const api = {
  // ==========================
  // Categories
  // ==========================

  async getCategories() {
    const response = await fetch(`${API_URL}/categories`)

    return handleResponse(response, 'Failed to load categories')
  },

  async createCategory(category) {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(category)
    })

    return handleResponse(response, 'Failed to create category')
  },

  async updateCategory(id, category) {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({
        ...category,
        id
      })
    })

    return handleResponse(response, 'Failed to update category')
  },

  async deleteCategory(id) {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    return handleResponse(response, 'Failed to delete category')
  },

  // ==========================
  // Products
  // ==========================

  async getProducts() {
    const response = await fetch(`${API_URL}/products`)

    return handleResponse(response, 'Failed to load products')
  },

  async createProduct(product) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(product)
    })

    return handleResponse(response, 'Failed to create product')
  },

  async updateProduct(id, product) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({
        ...product,
        id
      })
    })

    return handleResponse(response, 'Failed to update product')
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    return handleResponse(response, 'Failed to delete product')
  }
}