import { useState, useEffect } from 'preact/hooks'

export function useMousePosition(ref: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [ref])

  return mousePos
}
