import { useState, useEffect } from 'react'
import {
  fetchCategories,
  fetchProducts,
  fetchStats,
  fetchRecentProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  loginUser,
  logoutUser,
  getCurrentUser
} from '../services/apiService'

export const useApi = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({})
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    bestsellers: 0,
    spicy: 0
  })
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [cats, prods, statsData, recent] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          fetchStats(),
          fetchRecentProducts(5)
        ])
        
        setCategories(cats)
        setStats(statsData)
        setRecentProducts(recent)
        
        // Group products by category
        const productsByCategory = {}
        prods.forEach(product => {
          if (!productsByCategory[product.category_key]) {
            productsByCategory[product.category_key] = []
          }
          productsByCategory[product.category_key].push(product)
        })
        setProducts(productsByCategory)
        
      } catch (err) {
        setError(err.message)
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Refresh functions
  const refreshCategories = async () => {
    try {
      const cats = await fetchCategories()
      setCategories(cats)
      return cats
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refreshProducts = async (categoryKey = null) => {
    try {
      const prods = await fetchProducts(categoryKey)
      const productsByCategory = {}
      prods.forEach(product => {
        if (!productsByCategory[product.category_key]) {
          productsByCategory[product.category_key] = []
        }
        productsByCategory[product.category_key].push(product)
      })
      setProducts(productsByCategory)
      return prods
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refreshStats = async () => {
    try {
      const statsData = await fetchStats()
      setStats(statsData)
      return statsData
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refreshRecentProducts = async () => {
    try {
      const recent = await fetchRecentProducts(5)
      setRecentProducts(recent)
      return recent
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const refreshAll = async () => {
    setLoading(true)
    try {
      await Promise.all([
        refreshCategories(),
        refreshProducts(),
        refreshStats(),
        refreshRecentProducts()
      ])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Category CRUD operations
  const addCategory = async (categoryData) => {
    try {
      const newCategory = await createCategory(categoryData)
      await refreshCategories()
      return newCategory
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const editCategory = async (id, categoryData) => {
    try {
      const updated = await updateCategory(id, categoryData)
      await refreshCategories()
      return updated
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id)
      await refreshCategories()
      await refreshProducts()
      await refreshStats()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Product CRUD operations
  const addProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData)
      await refreshProducts()
      await refreshStats()
      await refreshRecentProducts()
      return newProduct
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const editProduct = async (id, productData) => {
    try {
      const updated = await updateProduct(id, productData)
      await refreshProducts()
      await refreshStats()
      await refreshRecentProducts()
      return updated
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id)
      await refreshProducts()
      await refreshStats()
      await refreshRecentProducts()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Image upload
  const uploadProductImage = async (file) => {
    try {
      return await uploadImage(file, 'products')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const uploadCategoryImage = async (file) => {
    try {
      return await uploadImage(file, 'categories')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Auth
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const checkSession = async (token) => {
    try {
      const user = await getCurrentUser(token)
      return user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    // State
    categories,
    products,
    stats,
    recentProducts,
    loading,
    error,
    
    // Refresh functions
    refreshCategories,
    refreshProducts,
    refreshStats,
    refreshRecentProducts,
    refreshAll,
    
    // Category operations
    addCategory,
    editCategory,
    removeCategory,
    
    // Product operations
    addProduct,
    editProduct,
    removeProduct,
    
    // Image upload
    uploadProductImage,
    uploadCategoryImage,
    
    // Auth
    login,
    logout,
    checkSession
  }
}