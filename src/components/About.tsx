import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: revealRef } = useScrollReveal()
  const [isBtnHovered, setIsBtnHovered] = useState(false)
  const [isQuoteHovered, setIsQuoteHovered] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect()
      const px = (e.clientX - left) / width * 100
      const py = (e.clientY - top) / height * 100
      sectionRef.current.style.setProperty('--mx-pct', `${px}%`)
      sectionRef.current.style.setProperty('--my-pct', `${py}%`)
    }
    
    // Only track when inside section to save CPU
    const el = sectionRef.current
    el?.addEventListener('mousemove', handleMouseMove)
    return () => el?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth <= 768
  const isSmallMobile = windowWidth <= 640

  // -- Styles --

  const sectionStyle: any = {
    position: 'relative',
    backgroundColor: theme.colors.bg,
    padding: theme.spacing['4xl'] + ' 0',
    minHeight: 'auto',
    overflow: 'hidden',
  }

  const bgGradientStyle: any = {
    content: "''",
    position: 'absolute',
    top: isMobile ? '20%' : 'var(--my-pct, 50%)',
    left: isMobile ? '10%' : 'var(--mx-pct, 50%)',
    width: '1000px',
    height: '1000px',
    background: 'radial-gradient(circle, rgba(253, 220, 196, 0.45) 0%, transparent 65%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
    transform: 'translate(-50%, -50%)',
    transition: 'top 0.4s ease-out, left 0.4s ease-out',
  }

  const innerStyle: any = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
    gap: isMobile ? theme.spacing['2xl'] : theme.spacing['3xl'],
    alignItems: 'start',
    position: 'relative',
    zIndex: 1,
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
  }

  const contentStyle: any = {
    position: 'relative',
    paddingLeft: isMobile ? theme.spacing.md : theme.spacing.xl,
  }

  const paraStyle: any = {
    fontSize: isSmallMobile ? '0.875rem' : '0.9375rem',
    lineHeight: 1.85,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  }

  const btnWrapStyle: any = {
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    transitionDelay: '0.4s',
  }

  const btnStyle: any = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: '0.8rem 2rem',
    background: isBtnHovered ? theme.colors.accentHover : theme.colors.accent,
    color: theme.colors.white,
    fontSize: '0.9375rem',
    fontWeight: 500,
    borderRadius: theme.radius.full,
    transition: 'all 0.25s ease',
    marginTop: theme.spacing.md,
    boxShadow: isBtnHovered ? '0 8px 28px rgba(192, 81, 63, 0.35)' : '0 4px 16px rgba(192, 81, 63, 0.15)',
    transform: isBtnHovered ? 'translateY(-2px)' : 'none',
    textDecoration: 'none',
  }

  const sidebarStyle: any = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    transitionDelay: '0.2s',
  }

  const infoStackStyle: any = {
    background: theme.colors.white,
    borderRadius: '18px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02), 0 6px 20px rgba(0,0,0,0.04)',
    border: '1px solid rgba(240, 236, 232, 0.5)',
  }

  const infoCardStyle = (i: number): any => ({
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderBottom: i === 3 ? 'none' : '1px solid #F0ECE8',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    background: hoveredCard === i ? 'rgba(240, 236, 232, 0.25)' : 'transparent',
    transition: 'background 0.15s ease',
    cursor: 'default',
  })

  const quoteStyle: any = {
    background: theme.colors.accent,
    borderRadius: '18px',
    padding: isSmallMobile ? theme.spacing.lg : theme.spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    transform: isQuoteHovered ? 'translateY(-3px)' : 'none',
    boxShadow: isQuoteHovered ? '0 12px 32px rgba(192, 81, 63, 0.25)' : 'none',
    cursor: 'default',
  }

  const infoCards = [
    { label: 'CURRENTLY', value: 'Open to opportunities', pulse: true },
    { label: 'BASED IN', value: 'India 🇮🇳' },
    { label: 'BACKGROUND', value: 'Commerce → UI Design' },
    { label: 'LOOKING FOR', value: 'Freelance · Internship · Full-time' }
  ]

  return (
    <section style={sectionStyle} id="about" ref={(el) => { (sectionRef as any).current = el; (revealRef as any).current = el; }}>
      {/* Background radial gradient */}
      <div style={bgGradientStyle} />

      <style>{`
        @keyframes aboutPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: theme.layout.maxWidth,
        margin: '0 auto',
        padding: `0 ${theme.spacing.xl}`,
      }}>
        {/* Section header — full width above the grid */}
        <div 
          className="animate-on-scroll"
          style={{
            marginBottom: theme.spacing['2xl'],
            paddingLeft: isMobile ? theme.spacing.md : theme.spacing.xl,
          }}
        >
          <span style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            background: theme.colors.accentSoft,
            color: theme.colors.accentText,
            fontSize: '0.8125rem',
            fontWeight: 600,
            borderRadius: theme.radius.full,
            marginBottom: theme.spacing.lg,
          }}>About Me</span>
          <h2 style={{
            fontFamily: theme.typography.serif,
            fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: theme.colors.textPrimary,
            margin: 0,
          }}>
            The person behind the pixels
          </h2>
        </div>

        {/* Two-column content */}
        <div style={innerStyle}>
          {/* Left - Text content */}
          <div style={contentStyle}>
            <p className="about-text animate-on-scroll" style={paraStyle}>
              I'm Kartik — a UI designer who came to design through curiosity, not a
              conventional path. I study Commerce, but somewhere between spreadsheets
              and textbooks, I got obsessed with something else: why do some apps feel
              effortless while others just frustrate you?
            </p>

            <p className="about-text animate-on-scroll" style={{ ...paraStyle, transitionDelay: '0.1s' }}>
              That question pulled me into UI design. And honestly? I think my background
              helps. I naturally think about users as people with goals, not just screens to fill.
              Design, to me, is about removing obstacles — not adding decoration.
            </p>

            <p className="about-text animate-on-scroll" style={{ ...paraStyle, transitionDelay: '0.2s' }}>
              I work in Figma, focusing on mobile and web interfaces. My process is
              straightforward: understand the problem, simplify the flow, make every visual
              choice intentional. I'm early in my career but serious about the craft.
            </p>

            <p className="about-text animate-on-scroll" style={{ ...paraStyle, transitionDelay: '0.3s' }}>
              If you're looking for someone who shows up thoughtful, stays minimal, and
              genuinely cares about the end user — let's talk.
            </p>

            <div className="animate-on-scroll" style={btnWrapStyle}>
              <a 
                href="#contact" 
                style={btnStyle}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
              >
                Get In Touch <span style={{ transition: 'transform 0.15s ease', transform: isBtnHovered ? 'translateX(4px)' : 'none' }}>→</span>
              </a>
            </div>
          </div>

          {/* Right - Info cards + quote */}
          <div className="animate-on-scroll" style={sidebarStyle}>
            <div style={infoStackStyle}>
              {infoCards.map((card, i) => (
                <div 
                  key={i} 
                  style={infoCardStyle(i)}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: theme.colors.textMuted }}>{card.label}</span>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: theme.colors.textPrimary, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {card.value}
                    {card.pulse && (
                      <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28C840', position: 'absolute' }} />
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid rgba(40, 200, 64, 0.3)', position: 'absolute', animation: 'aboutPulse 2s ease-in-out infinite' }} />
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div 
              style={quoteStyle}
              onMouseEnter={() => setIsQuoteHovered(true)}
              onMouseLeave={() => setIsQuoteHovered(false)}
            >
              {/* Pattern */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
              
              <span style={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.35)', lineHeight: 1, display: 'block', marginBottom: theme.spacing.sm }}>❝</span>
              <p style={{ fontSize: '1.0625rem', fontWeight: 500, color: theme.colors.white, lineHeight: 1.6, letterSpacing: '0.01em', margin: 0 }}>
                Designing interfaces that get out of the user's way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
