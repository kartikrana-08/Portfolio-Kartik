import { useEffect, useRef } from 'preact/hooks'

const TRAIL_LENGTH = 20
const TRAIL_COLOR = '200, 85, 61' // #C8553D in RGB

export const GuestCursor = ({ isPointer }: { isPointer: boolean }) => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const trail = useRef<{ x: number; y: number; age: number }[]>([])
  const rafId = useRef<number>(0)
  const lastTrailTime = useRef(0)

  const prevMouse = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const animate = (time: number) => {
      // Only add trail points when mouse is moving
      const dx = mouse.current.x - prevMouse.current.x
      const dy = mouse.current.y - prevMouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 2 && time - lastTrailTime.current > 16) {
        trail.current.push({ x: mouse.current.x, y: mouse.current.y, age: 0 })
        if (trail.current.length > TRAIL_LENGTH) {
          trail.current.shift()
        }
        lastTrailTime.current = time
      }

      prevMouse.current.x = mouse.current.x
      prevMouse.current.y = mouse.current.y

      // Age trail points
      trail.current.forEach(p => { p.age += 1 })

      // Draw trail on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < trail.current.length; i++) {
        const point = trail.current[i]
        const life = 1 - (point.age / (TRAIL_LENGTH * 2))
        if (life <= 0) continue

        const radius = 18 * life
        const opacity = 0.05 * life

        ctx.beginPath()
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${TRAIL_COLOR}, ${opacity})`
        ctx.fill()
      }

      // Remove dead points
      trail.current = trail.current.filter(p => (1 - p.age / (TRAIL_LENGTH * 2)) > 0)

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`
      }

      // Ring trails with smooth lerp
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId.current)
    }
  }, [isPointer])

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998,
          filter: 'blur(8px)',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isPointer ? '0px' : '8px',
          height: isPointer ? '0px' : '8px',
          backgroundColor: '#C8553D',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.3s ease, height 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: `2px solid ${isPointer ? 'rgba(200, 85, 61, 0.6)' : 'rgba(200, 85, 61, 0.35)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
          backgroundColor: isPointer ? 'rgba(200, 85, 61, 0.1)' : 'transparent',
          willChange: 'transform',
        }}
      />
    </>
  )
}
