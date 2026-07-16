import React from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export const ScrollProgress = () => {
  const progress = useScrollProgress()

  return (
    <div 
      id="scrollProgress" 
      style={{ width: `${progress}%` }}
      className="scroll-progress"
    />
  )
}
