import { useState, useEffect } from 'preact/hooks'
import { theme } from '../theme'

const TAGLINES: Record<string, { r: string; b: string }> = {
  hero: { r: 'Good Design Is Invisible. ', b: 'Bad Design Is Everywhere.' },
  work: { r: 'Every Pixel Has A Reason. ', b: "Or It Shouldn't Be There." },
  about: { r: "Tools Don't Design Designers Do. ", b: 'Tools Just Get Out Of The Way' },
  skills: { r: 'The Right Tools. ', b: 'The Right Mindset.' },
  process: { r: "Clean Design Isn't About Making Things Pretty — ", b: "It's About Making Things Obvious" },
  contact: { r: 'The Best Design Collaboration ', b: 'Starts With A Single Message' },
}


export function Navbar() {
  const [activeTab, setActiveTab] = useState('hero')
  const [displayedText, setDisplayedText] = useState('')
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)

  // Custom Media Query Hook logic
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

    const observeSections = () => {
      document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    }

    observeSections()

    const mutationObserver = new MutationObserver(() => {
      observeSections()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  const currentTagline = TAGLINES[activeTab] || TAGLINES.hero
  const targetText = currentTagline.r + currentTagline.b

  useEffect(() => {
    let timeout: number
    if (displayedText !== targetText) {
      if (!targetText.startsWith(displayedText)) {
        timeout = window.setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1))
        }, 12)
      } else {
        timeout = window.setTimeout(() => {
          setDisplayedText(prev => targetText.slice(0, prev.length + 1))
        }, 22)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayedText, targetText])

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

  // -- Styles --

  const navStyle: any = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: theme.layout.navHeight,
    background: 'rgba(255, 248, 242, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(224, 213, 204, 0.4)',
  }

  const innerStyle: any = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
  }

  const logoStyle: any = {
    fontFamily: theme.typography.serif,
    fontSize: '24px',
    fontWeight: 800,
    color: theme.colors.textPrimary,
    letterSpacing: '-0.5px',
    transition: 'opacity 0.15s ease',
    opacity: isLogoHovered ? 0.7 : 1,
    textDecoration: 'none',
  }

  const taglineStyle: any = {
    fontSize: '22px',
    letterSpacing: '0.01em',
    fontWeight: 700,
    display: isMobile ? 'none' : 'block',
    margin: 0,
  }

  const ctaStyle: any = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: '0.625rem 1.25rem',
    color: theme.colors.white,
    fontSize: '0.875rem',
    fontWeight: 500,
    borderRadius: theme.radius.full,
    transition: 'all 0.25s ease',
    transform: isCtaHovered ? 'translateY(-1px)' : 'none',
    boxShadow: isCtaHovered ? theme.shadows.md : 'none',
    background: isCtaHovered ? '#333' : theme.colors.dark,
    textDecoration: 'none',
  }

  const arrowStyle: any = {
    transition: 'transform 0.15s ease',
    transform: isCtaHovered ? 'translateX(3px)' : 'none',
  }

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <a
          href="#"
          style={logoStyle}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          KR.
        </a>
        <p style={taglineStyle}>
          <span style={{ color: activeTab === 'hero' ? '#B2AFA9' : '#C8553D', transition: 'color 0.25s ease' }}>{displayedRegular}</span>
          {displayedBold && <strong style={{ color: '#C8553D', fontWeight: 700, transition: 'color 0.25s ease' }}>{displayedBold}</strong>}
        </p>
        <a
          href="#contact"
          style={ctaStyle}
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
        >
          Let's Talk <span style={arrowStyle}>→</span>
        </a>
      </div>
    </nav>
  )
}
