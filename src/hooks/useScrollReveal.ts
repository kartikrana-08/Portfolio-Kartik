import { useEffect, useRef, useState } from 'preact/hooks'

/**
 * Hook that observes elements with scroll-animation classes
 * and adds 'is-visible' when they enter the viewport.
 * Call once per section/component to activate its animations.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const revealChildren = () => {
      el.querySelectorAll('.animate-on-scroll, .process-card, .skill-tag, .skill-card').forEach(child => {
        child.classList.add('is-visible')
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          revealChildren()
          
          // Also set up a MutationObserver in case content is lazy-loaded
          const mutationObserver = new MutationObserver(() => {
            revealChildren()
          })
          mutationObserver.observe(el, { childList: true, subtree: true })
          
          observer.unobserve(el)
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -10% 0px' // Wait until it's 10% into view from the bottom
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
