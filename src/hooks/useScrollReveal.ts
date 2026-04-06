import { useEffect, useRef, useState } from 'preact/hooks'

/**
 * Hook that observes elements with scroll-animation classes
 * and adds 'is-visible' when they enter the viewport.
 * Call once per section/component to activate its animations.
 */
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Add is-visible to all animate-on-scroll children
          el.querySelectorAll('.animate-on-scroll, .process-card, .skill-tag, .skill-card').forEach(child => {
            child.classList.add('is-visible')
          })
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
