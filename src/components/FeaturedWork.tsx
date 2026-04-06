import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'
import { useMousePosition } from '../hooks/useMousePosition'

export function FeaturedWork({ onViewCaseStudy }: { onViewCaseStudy?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useMousePosition(containerRef)
  const [isCtaHovered, setIsCtaHovered] = useState(false)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  
  // Responsive logic
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth <= 768
  const isSmallMobile = windowWidth <= 640

  // Parallax calculations
  const offsetX = (mousePos.x - (containerRef.current?.offsetWidth || 0) / 2) * 0.02
  const offsetY = (mousePos.y - (containerRef.current?.offsetHeight || 0) / 2) * 0.02

  // -- Styles --

  const innerStyle: any = {
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
  }

  const cardStyle: any = {
    position: 'relative',
    background: theme.colors.white,
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: theme.shadows.md,
    border: '1px solid rgba(240, 236, 232, 0.6)',
  }

  const spotlightStyle: any = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(192, 81, 63, 0.03), transparent 40%)`,
    pointerEvents: 'none',
    zIndex: 1,
  }

  const accentStyle: any = {
    position: 'relative',
    zIndex: 2,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.colors.accent}, #E8875C, #F0A060)`,
  }

  const cardInnerStyle: any = {
    position: 'relative',
    zIndex: 2,
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: theme.spacing.xl,
    padding: isSmallMobile ? theme.spacing.lg : theme.spacing['2xl'],
    alignItems: 'center',
  }

  const descStyle: any = {
    fontSize: '0.9375rem',
    lineHeight: 1.7,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    maxWidth: '380px',
  }

  const tagStyle = (tagName: string): any => ({
    padding: '0.3rem 0.85rem',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: hoveredTag === tagName ? theme.colors.textPrimary : theme.colors.textSecondary,
    border: `1px solid ${hoveredTag === tagName ? theme.colors.textPrimary : theme.colors.border}`,
    borderRadius: theme.radius.full,
    background: 'transparent',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  })

  const ctaStyle: any = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: '0.75rem 1.75rem',
    background: isCtaHovered ? theme.colors.accentHover : theme.colors.accent,
    color: theme.colors.white,
    fontSize: '0.9375rem',
    fontWeight: 500,
    borderRadius: theme.radius.full,
    transition: 'all 0.25s ease',
    width: 'fit-content',
    textDecoration: 'none',
    transform: isCtaHovered ? 'translateY(-2px)' : 'none',
    boxShadow: isCtaHovered ? '0 8px 24px rgba(192, 81, 63, 0.3)' : 'none',
  }

  const visualContainerStyle: any = {
    position: 'relative',
    height: isMobile ? '280px' : '360px',
    overflow: 'visible',
    maxWidth: isMobile ? '350px' : 'none',
    margin: isMobile ? '0 auto' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const desktopMockStyle: any = {
    position: 'absolute',
    top: '10px',
    left: '0',
    width: isSmallMobile ? '240px' : '300px',
    background: theme.colors.white,
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    border: '1px solid #F0ECE8',
    transform: isMobile ? 'none' : `translate(${offsetX}px, ${offsetY}px)`,
    transition: 'transform 0.1s ease-out',
  }

  const phoneMockStyle: any = {
    position: 'absolute',
    top: isSmallMobile ? '50px' : '70px',
    right: '0',
    width: isSmallMobile ? '130px' : '150px',
    background: theme.colors.white,
    borderRadius: '22px',
    boxShadow: '0 12px 35px rgba(0,0,0,0.1)',
    padding: '6px',
    border: '1px solid #F0ECE8',
    transform: isMobile ? 'none' : `translate(${-offsetX * 1.5}px, ${-offsetY * 1.5}px)`,
    transition: 'transform 0.1s ease-out',
  }

  const tags = ['UI Design', 'Figma', 'Mobile + Web', 'EdTech']

  return (
    <div style={innerStyle} ref={containerRef}>
      {/* Project card */}
      <div style={cardStyle}>
        <div style={spotlightStyle} />
        <div style={accentStyle} />
        <div style={cardInnerStyle}>
          {/* Left - Info */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 3 }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: theme.colors.accent, marginBottom: theme.spacing.sm }}>01</span>
            <h3 style={{ fontFamily: theme.typography.serif, fontSize: '2rem', fontWeight: 400, color: theme.colors.textPrimary, marginBottom: theme.spacing.md, letterSpacing: '-0.01em', margin: 0 }}>
              Virtual Library
            </h3>
            <p style={descStyle}>
              Redesigning the way students learn online. A UI design
              project for an educational tutoring platform — mobile app
              and website.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.sm, marginBottom: theme.spacing.xl }}>
              {tags.map(tag => (
                <span 
                  key={tag}
                  style={tagStyle(tag)}
                  onMouseEnter={() => setHoveredTag(tag)}
                  onMouseLeave={() => setHoveredTag(null)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button 
              style={{ ...ctaStyle, border: 'none', cursor: 'pointer', fontFamily: theme.typography.sans }}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              onClick={() => onViewCaseStudy?.()}
            >
              View Case Study 
              <span style={{ transition: 'transform 0.15s ease', transform: isCtaHovered ? 'translateX(4px)' : 'none', display: 'inline-block' }}>→</span>
            </button>
          </div>

          {/* Right - Mockup visuals */}
          <div style={visualContainerStyle}>
            {/* Desktop mockup */}
            <div style={desktopMockStyle}>
              <div style={{ display: 'flex', gap: '4px', padding: '10px 12px', borderBottom: '1px solid #F0ECE8' }}>
                {[1, 2, 3].map(i => <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D5CFC8' }} />)}
              </div>
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ height: '8px', background: '#EDE9E3', borderRadius: '4px', width: '100%' }} />
                <div style={{ height: '8px', background: '#EDE9E3', borderRadius: '4px', width: '70%' }} />
                <div style={{ display: 'flex', gap: '10px', margin: '6px 0' }}>
                  <div style={{ flex: 1, height: '70px', background: '#EDE9E3', borderRadius: '10px' }} />
                  <div style={{ flex: 1, height: '70px', background: '#EDE9E3', borderRadius: '10px' }} />
                </div>
                <div style={{ height: '8px', background: '#EDE9E3', borderRadius: '4px', width: '90%' }} />
                <div style={{ height: '8px', background: '#EDE9E3', borderRadius: '4px', width: '55%' }} />
                <div style={{ display: 'flex', gap: '10px', margin: '4px 0' }}>
                  <div style={{ flex: 1, height: '50px', background: '#EDE9E3', borderRadius: '10px' }} />
                  <div style={{ flex: 1, height: '50px', background: '#EDE9E3', borderRadius: '10px' }} />
                  <div style={{ flex: 1, height: '50px', background: '#EDE9E3', borderRadius: '10px' }} />
                </div>
                <div style={{ height: '8px', background: '#EDE9E3', borderRadius: '4px', width: '65%' }} />
              </div>
            </div>

            {/* Phone mockup */}
            <div style={phoneMockStyle}>
              <div style={{ width: '40px', height: '4px', background: '#E0DBD5', borderRadius: '8px', margin: '4px auto 6px' }} />
              <div style={{ background: '#FAF7F4', borderRadius: '16px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px', marginBottom: '2px' }}>
                  {[1, 2, 3].map(i => <span key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D5CFC8' }} />)}
                </div>
                <div style={{ height: '6px', background: '#EDE9E3', borderRadius: '3px', width: '100%' }} />
                <div style={{ height: '6px', background: '#EDE9E3', borderRadius: '3px', width: '60%' }} />
                <div style={{ height: '60px', background: '#EDE9E3', borderRadius: '8px' }} />
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ flex: 1, height: '35px', background: '#EDE9E3', borderRadius: '6px' }} />
                  <div style={{ flex: 1, height: '35px', background: '#EDE9E3', borderRadius: '6px' }} />
                </div>
                <div style={{ height: '6px', background: '#EDE9E3', borderRadius: '3px', width: '80%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
