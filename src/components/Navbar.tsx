import { useState, useEffect } from 'preact/hooks'
import './Navbar.css'

const TAGLINES: Record<string, { r: string; b: string }> = {
  hero: { r: 'Good Design Is Invisible. ', b: 'Bad Design Is Everywhere.' },
  work: { r: 'Every Pixel Has A Reason. ', b: "Or It Shouldn't Be There." },
  about: { r: "Tools Don't Design. Designers Do. ", b: 'Tools Just Get Out Of The Way.' },
  skills: { r: 'The Right Tools. ', b: 'The Right Mindset.' },
  process: { r: "Clean Design Isn't About Making Things Pretty — ", b: "It's About Making Things Obvious." },
  contact: { r: 'The Best Design Collaboration ', b: 'Starts With A Single Message.' },
}

export function Navbar() {
  const [activeTab, setActiveTab] = useState('hero')
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (TAGLINES[id]) {
            setActiveTab(id)
          }
        }
      })
    }, { threshold: 0.3 })

    const sections = document.querySelectorAll('section[id]')
    sections.forEach(s => observer.observe(s))
    
    return () => observer.disconnect()
  }, [])

  const currentTagline = TAGLINES[activeTab] || TAGLINES.hero
  const targetText = currentTagline.r + currentTagline.b

  useEffect(() => {
    let timeout: number
    if (displayedText !== targetText) {
      if (!targetText.startsWith(displayedText)) {
        // Untype (delete from end)
        timeout = window.setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1))
        }, 12) // FAST delete
      } else {
        // Type forward
        timeout = window.setTimeout(() => {
          setDisplayedText(prev => targetText.slice(0, prev.length + 1))
        }, 25) // typing speed
      }
    }
    return () => clearTimeout(timeout)
  }, [displayedText, targetText])

  // Determine split index for styling based on what string is currently displaying
  let activeTaglineObj = currentTagline
  for (const key in TAGLINES) {
    const t = TAGLINES[key].r + TAGLINES[key].b
    if (t.startsWith(displayedText) && displayedText.length > 0) {
      activeTaglineObj = TAGLINES[key]
      break
    }
  }

  const regChars = activeTaglineObj.r.length
  const displayedRegular = displayedText.slice(0, regChars)
  const displayedBold = displayedText.slice(regChars)

  return (
    <nav class="navbar">
      <div class="navbar__inner container">
        <a href="#" class="navbar__logo">KR.</a>
        <p class="navbar__tagline">
          <span class="navbar__tagline-reg">{displayedRegular}</span>
          {displayedBold && <strong class="navbar__tagline-bold">{displayedBold}</strong>}
        </p>
        <a href="#contact" class="navbar__cta">
          Let's Talk <span class="navbar__cta-arrow">→</span>
        </a>
      </div>
    </nav>
  )
}

