import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'
import { openLightbox } from './ImageLightbox'
import { useIsMobile } from '../hooks/useIsMobile'

export function FeaturedWork({ onViewCaseStudy }: { onViewCaseStudy?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCtaHovered, setIsCtaHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const mx = e.clientX - left
      const my = e.clientY - top
      const ox = (mx - width / 2) * 0.04
      const oy = (my - height / 2) * 0.04
      
      containerRef.current.style.setProperty('--mx', `${mx}px`)
      containerRef.current.style.setProperty('--my', `${my}px`)
      containerRef.current.style.setProperty('--ox', `${ox}px`)
      containerRef.current.style.setProperty('--oy', `${oy}px`)
    }
    const el = containerRef.current
    el?.addEventListener('mousemove', handleMouseMove)
    return () => el?.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Responsive logic
  const { isMobile, isSmallMobile } = useIsMobile()


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
    background: 'radial-gradient(800px circle at var(--mx) var(--my), rgba(192, 81, 63, 0.08), transparent 40%)',
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
    transform: isClicked ? 'scale(0.96)' : (isCtaHovered ? 'translateY(-2px)' : 'none'),
    boxShadow: isCtaHovered ? '0 8px 24px rgba(192, 81, 63, 0.3)' : 'none',
    animation: isClicked ? 'buttonClick 0.4s ease' : 'none',
  }

  const visualContainerStyle: any = {
    position: 'relative',
    height: isMobile ? '310px' : '400px',
    overflow: 'visible',
    maxWidth: isMobile ? '350px' : 'none',
    margin: isMobile ? '0 auto' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
            <h3 style={{ fontFamily: theme.typography.serif, fontSize: '40px', fontWeight: 800, color: theme.colors.textPrimary, marginBottom: theme.spacing.md, letterSpacing: '-0.01em', margin: 0 }}>
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
              className={isClicked ? 'active-cta' : ''}
              style={{ ...ctaStyle, border: 'none', cursor: 'pointer', fontFamily: theme.typography.sans }}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              onClick={() => {
                setIsClicked(true)
                setTimeout(() => {
                  onViewCaseStudy?.()
                  setIsClicked(false)
                }, 350)
              }}
            >
              View Case Study 
              <span style={{ transition: 'transform 0.15s ease', transform: isCtaHovered ? 'translateX(4px)' : 'none', display: 'inline-block' }}>→</span>
            </button>
          </div>

          {/* Right — Real Phone Screenshots */}
          <div style={visualContainerStyle}>

            {/* Orange glow backdrop */}
            <div style={{
              position: 'absolute',
              width: isMobile ? '220px' : '280px',
              height: isMobile ? '220px' : '280px',
              background: 'radial-gradient(circle, rgba(200,85,61,0.18) 0%, rgba(220,105,81,0.08) 50%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* Left phone — Leaderboard */}
            <div
              onClick={() => openLightbox('/screenshots/screen-7.png', 'Leaderboard')}
              style={{
              position: 'absolute',
              left: isSmallMobile ? '-8px' : '0',
              top: '16px',
              width: isSmallMobile ? '95px' : isMobile ? '112px' : '132px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 44px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)',
              border: '2px solid rgba(255,255,255,0.92)',
              transform: isMobile
                ? 'rotate(-5deg)'
                : `rotate(-5deg) translate(var(--ox), var(--oy))`,
              transition: 'transform 0.1s ease-out',
              zIndex: 1,
              background: theme.colors.white,
              cursor: 'zoom-in',
            }}>
              <img
                src="/screenshots/screen-7.png"
                alt="Leaderboard"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Center phone — Home (hero, most prominent) */}
            <div
              onClick={() => openLightbox('/screenshots/screen-2.png', 'Home Dashboard')}
              style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              transform: isMobile
                ? 'translateX(-50%)'
                : `translateX(-50%) translate(var(--ox), var(--oy))`,
              width: isSmallMobile ? '128px' : isMobile ? '150px' : '174px',
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: '0 28px 64px rgba(200,85,61,0.32), 0 8px 32px rgba(0,0,0,0.12)',
              border: '2px solid rgba(255,255,255,0.97)',
              transition: 'transform 0.1s ease-out',
              zIndex: 3,
              background: theme.colors.white,
              cursor: 'zoom-in',
            }}>
              <img
                src="/screenshots/screen-2.png"
                alt="Home Dashboard"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Right phone — Focus timer */}
            <div
              onClick={() => openLightbox('/screenshots/screen-5.png', 'Focus Timer')}
              style={{
              position: 'absolute',
              right: isSmallMobile ? '-8px' : '0',
              top: '44px',
              width: isSmallMobile ? '95px' : isMobile ? '112px' : '132px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 16px 44px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)',
              border: '2px solid rgba(255,255,255,0.92)',
              transform: isMobile
                ? 'rotate(5deg)'
                : `rotate(5deg) translate(calc(var(--ox) * -1.2), calc(var(--oy) * -1.2))`,
              transition: 'transform 0.1s ease-out',
              zIndex: 1,
              background: theme.colors.white,
              cursor: 'zoom-in',
            }}>
              <img
                src="/screenshots/screen-5.png"
                alt="Focus Timer"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

          </div>
        </div>
      </div>
  </div>
  )
}
