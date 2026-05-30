import { useState, useEffect } from 'preact/hooks'

export function useIsMobile() {
  // Use state to trigger re-renders on resize
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => setWindowWidth(window.innerWidth)
    
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isMobile: windowWidth <= 768,
    isSmallMobile: windowWidth <= 480,
    windowWidth
  }
}
