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
