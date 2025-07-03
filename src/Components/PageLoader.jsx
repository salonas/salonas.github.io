import React, { useState, useEffect } from 'react'
import './PageLoader.scss'

const PageLoader = ({ children, delay = 100 }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`page-loader ${isLoaded ? 'loaded' : 'loading'}`}>
      {children}
    </div>
  )
}

export default PageLoader
