import { useState, useEffect } from 'preact/hooks'
import { theme } from '../theme'
import { useScrollReveal } from '../hooks/useScrollReveal'


export function Footer() {
  const { ref: footerRef } = useScrollReveal()
  const currentYear = new Date().getFullYear()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isBackTopHovered, setIsBackTopHovered] = useState(false)

  
  // Responsive logic
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth <= 768

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // -- Styles --

  const footerStyle: any = {
    backgroundColor: '#121110',
    color: '#FFFFFF',
    padding: `${theme.spacing['4xl']} 0 ${theme.spacing.md}`,
    position: 'relative',
  }

  const innerStyle: any = {
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
  }

  const gridStyle: any = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: isMobile ? theme.spacing['2xl'] : theme.spacing.xl,
    marginBottom: theme.spacing['3xl'],
  }

  const linkStyle = (id: string): any => ({
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: hoveredLink === id ? theme.colors.white : 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transform: hoveredLink === id ? 'translateX(4px)' : 'none',
    position: 'relative',
  })

  const arrowStyle = (id: string): any => ({
    opacity: hoveredLink === id ? 1 : 0.4,
    fontSize: '0.75rem',
    transition: 'opacity 0.15s ease',
  })

  const backTopStyle: any = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '0.75rem 1.5rem',
    background: isBackTopHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)',
    border: `1px solid ${isBackTopHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
    borderRadius: theme.radius.full,
    color: theme.colors.white,
    fontSize: '0.8125rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: theme.typography.sans,
    transform: isBackTopHovered ? 'translateY(-2px)' : 'none',
  }

  return (
    <footer style={footerStyle} ref={footerRef}>

      <div style={innerStyle}>
        {/* Top bar with tagline and back-to-top */}
        <div 
          className="animate-on-scroll"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: theme.spacing.lg,
            marginBottom: theme.spacing['3xl'],
            paddingBottom: theme.spacing['2xl'],
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >

          <p style={{
            fontFamily: theme.typography.serif,
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.85)',
            margin: 0,
            lineHeight: 1.4,
          }}>
            Good design is invisible<br />
            <span style={{ color: theme.colors.accent }}>Bad design is everywhere</span>
          </p>
          <button
            style={backTopStyle}
            onClick={scrollToTop}
            onMouseEnter={() => setIsBackTopHovered(true)}
            onMouseLeave={() => setIsBackTopHovered(false)}
          >
            <span style={{ 
              transform: isBackTopHovered ? 'translateY(-2px)' : 'none', 
              transition: 'transform 0.2s ease',
              display: 'inline-block',
            }}>↑</span> Back to top
          </button>
        </div>

        <div className="animate-on-scroll" style={{ ...gridStyle, transitionDelay: '0.15s' }}>

          {/* Logo & Info */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h2 style={{ fontFamily: theme.typography.serif, fontSize: '1.5rem', fontWeight: 400, margin: '0 0 0.5rem' }}>KR.</h2>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.4)', margin: 0 }}>Kartik Rana · UI Designer</p>
          </div>

          {/* Links Columns */}
          {[
            [
              { label: 'My Portfolio', href: '#work' },
              { label: 'Dribbble', href: 'https://dribbble.com/kartikrana', external: true }
            ],
            [
              { label: '+91 70489 24873', href: 'tel:+917048924873' },
              { label: 'Instagram', href: 'https://instagram.com/kartikrana', external: true }
            ],
            [
              { label: 'rana.work08@gmail.com', href: 'mailto:rana.work08@gmail.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/kartikrana', external: true }
            ]
          ].map((col, i) => (
            <div key={i} style={{ minWidth: isMobile ? '100%' : '15vw' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
                {col.map(link => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      style={linkStyle(link.label)} 
                      target={link.external ? "_blank" : undefined}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label} {link.external && <span style={arrowStyle(link.label)}>↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: theme.spacing.xl, borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255, 255, 255, 0.3)', margin: 0 }}>© {currentYear} Kartik Rana · Designed with intent</p>
        </div>
      </div>
    </footer>
  )
}
