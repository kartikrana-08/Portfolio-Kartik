import { useState } from 'preact/hooks'
import { theme } from '../theme'

export function Navbar() {
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)



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



  const ctaStyle: any = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.575rem 1.2rem',
    color: isCtaHovered ? theme.colors.white : theme.colors.textPrimary,
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: theme.radius.full,
    transition: 'all 0.25s ease',
    transform: isCtaHovered ? 'translateY(-2px)' : 'none',
    boxShadow: isCtaHovered ? '0 8px 24px rgba(0,0,0,0.15)' : 'none',
    background: isCtaHovered ? theme.colors.dark : 'transparent',
    border: `2px solid ${isCtaHovered ? theme.colors.dark : theme.colors.textPrimary}`,
    textDecoration: 'none',
    letterSpacing: '0.01em',
    cursor: 'pointer',
  }

  const iconStyle: any = {
    transition: 'transform 0.2s ease',
    transform: isCtaHovered ? 'translateY(2px)' : 'translateY(0)',
    display: 'flex',
    alignItems: 'center',
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

        <a
          href="/resume.pdf"
          download="Kartik_Rana_Resume.pdf"
          style={ctaStyle}
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
        >
          <span style={iconStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </span>
          Resume
        </a>
      </div>
    </nav>
  )
}
