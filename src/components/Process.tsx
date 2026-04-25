import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'
import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Understand',
    desc: 'What does the user actually need here? Before opening Figma, I try to feel the friction — where does the flow break.',
  },
  {
    num: '02',
    title: 'Simplify',
    desc: "What's the fastest way to give it to them? Every extra click, every ambiguous label, every unnecessary element — out.",
  },
  {
    num: '03',
    title: 'Refine',
    desc: "What can I remove without losing meaning? Good design is obvious in hindsight. I keep going until the interface disappears.",
  },
]

export function Process() {
  const containerRef = useRef<HTMLElement>(null)
  const { ref: revealRef } = useScrollReveal()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top } = containerRef.current.getBoundingClientRect()
      containerRef.current.style.setProperty('--mx', `${e.clientX - left}px`)
      containerRef.current.style.setProperty('--my', `${e.clientY - top}px`)
    }
    const el = containerRef.current
    el?.addEventListener('mousemove', handleMouseMove)
    return () => el?.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Responsive logic
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth <= 768

  // -- Styles --

  const sectionStyle: any = {
    position: 'relative',
    backgroundColor: '#f2ede3',
    padding: theme.spacing['4xl'] + ' 0',
    borderTop: '1px solid rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
  }

  const lightBeamStyle: any = {
    position: 'absolute',
    top: isMobile ? '-100%' : 'var(--my)',
    left: isMobile ? '-100%' : 'var(--mx)',
    width: '1000px',
    height: '1000px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, transparent 60%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 1,
    transform: 'translate(-50%, -50%)',
    transition: 'top 0.1s ease-out, left 0.1s ease-out',
  }

  const innerStyle: any = {
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
  }

  const headerStyle: any = {
    marginBottom: theme.spacing['2xl'],
    transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  const gridStyle: any = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: isMobile ? theme.spacing.md : theme.spacing.lg,
    marginBottom: theme.spacing['3xl'],
    position: 'relative',
  }

  const cardStyle = (index: number): any => ({
    background: theme.colors.white,
    borderRadius: '20px',
    padding: theme.spacing.xl,
    border: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: hoveredCard === index ? '0 10px 25px rgba(0, 0, 0, 0.05)' : '0 2px 10px rgba(0, 0, 0, 0.02)',
    transform: hoveredCard === index ? 'translateY(-4px)' : 'none',
    transition: 'all 0.3s ease',
    cursor: 'default',
    position: 'relative',
  })

  return (
    <section style={sectionStyle} id="process" ref={(el) => { (containerRef as any).current = el; (revealRef as any).current = el; }}>
      <div style={lightBeamStyle} />
      <div style={innerStyle}>
        {/* Section header */}
        <div className="animate-on-scroll" style={headerStyle}>
          <span style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            background: theme.colors.accentSoft,
            color: theme.colors.accentText,
            fontSize: '0.8125rem',
            fontWeight: 600,
            borderRadius: theme.radius.full,
            marginBottom: theme.spacing.lg,
          }}>My Process</span>
          <h2 style={{
            fontFamily: theme.typography.serif,
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: theme.colors.textPrimary,
            margin: 0,
          }}>
            How I approach every<br />
            project.
          </h2>
        </div>

        {/* Steps with connecting line */}
        <div style={gridStyle}>
          {steps.map((step, index) => (
            <div 
              key={step.num}
              className="process-card"
              style={cardStyle(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Step number with accent circle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md,
                marginBottom: theme.spacing.lg,
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: hoveredCard === index ? theme.colors.accent : theme.colors.accentSoft,
                  color: hoveredCard === index ? theme.colors.white : theme.colors.accentText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {step.num}
                </div>
              </div>

              <h3 style={{ 
                fontFamily: theme.typography.sans, fontSize: '1.25rem', 
                fontWeight: 700, color: theme.colors.textPrimary, 
                marginBottom: theme.spacing.md, margin: `0 0 ${theme.spacing.md} 0`,
              }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: theme.colors.textSecondary, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
