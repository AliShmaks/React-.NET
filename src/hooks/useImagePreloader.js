// hooks/useImagePreloader.js
import { useState, useEffect } from 'react'

export const useImagePreloader = (imageUrls) => {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    // If no images, consider it loaded
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true)
      return
    }

    let loadedCount = 0
    const totalImages = imageUrls.length

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        
        img.onload = () => {
          loadedCount++
          resolve()
        }
        
        img.onerror = () => {
          // Count errors as loaded too (so we don't get stuck)
          loadedCount++
          resolve()
        }

        // Safety timeout - if image takes too long, continue anyway
        setTimeout(() => {
          if (!img.complete) {
            loadedCount++
            resolve()
          }
        }, 5000)
      })
    }

    const loadAllImages = async () => {
      await Promise.all(imageUrls.map(url => loadImage(url)))
      setImagesLoaded(true)
    }

    loadAllImages()
  }, [imageUrls])

  return imagesLoaded
}