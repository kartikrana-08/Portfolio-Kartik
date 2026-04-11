import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'
import { useScrollReveal } from '../hooks/useScrollReveal'

const skillGroups = [
  {
    title: 'DESIGN TOOLS',
    icon: '🎨',
    items: ['Figma', 'FigJam', 'Prototyping', 'Auto Layout'],
  },
  {
    title: 'DESIGN SKILLS',
    icon: '✦',
    items: [
      'UI Design',
      'Visual Hierarchy',
      'User Flow Design',
      'Typography',
      'Component Design',
      'Mobile UI',
      'Web UI',
      'Layout & Spacing',
    ],
  },
  {
    title: 'DEVELOPMENT',
    icon: '⚡',
    items: [
      'HTML / CSS',
      'Javascript',
      'Typescript',
      'React / Preact',
      'Vite',
      'Responsive Design',
    ],
  },
  {
    title: 'SOFT SKILLS',
    icon: '🧠',
    items: [
      'Attention to Detail',
      'Problem Solving',
      'Business Thinking',
      'Self-directed Learning',
    ],
  },
]

export function Skills() {
  const containerRef = useRef<HTMLElement>(null)
  const { ref: revealRef } = useScrollReveal()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

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

  const gridCols = windowWidth > 1100 ? 4 : windowWidth > 600 ? 2 : 1

  // -- Styles --

  const sectionStyle: any = {
    position: 'relative',
    backgroundColor: theme.colors.white,
    padding: theme.spacing['4xl'] + ' 0',
    overflow: 'hidden',
  }

  const spotlightStyle: any = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(800px circle at var(--mx) var(--my), rgba(16, 185, 129, 0.08), transparent 45%)',
    pointerEvents: 'none',
    zIndex: 1,
  }

  const innerStyle: any = {
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
    position: 'relative',
    zIndex: 2,
  }

  const headerStyle: any = {
    marginBottom: theme.spacing['2xl'],
    transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  const badgeStyle: any = {
    display: 'inline-block',
    padding: '0.35rem 1rem',
    background: theme.colors.accentSoft,
    color: theme.colors.accentText,
    fontSize: '0.8125rem',
    fontWeight: 600,
    borderRadius: theme.radius.full,
    marginBottom: theme.spacing.lg,
  }

  const titleStyle: any = {
    fontFamily: theme.typography.serif,
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    color: theme.colors.textPrimary,
    margin: 0,
  }

  const gridStyle: any = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gap: theme.spacing.md,
  }

  const cardStyle = (index: number): any => ({
    background: theme.colors.white,
    borderRadius: '16px',
    padding: theme.spacing.lg,
    border: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: hoveredCard === index ? '0 10px 25px rgba(0, 0, 0, 0.06)' : '0 1px 4px rgba(0, 0, 0, 0.02)',
    transform: hoveredCard === index ? 'translateY(-4px)' : 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'default',
  })

  const tagStyle = (tagId: string): any => ({
    padding: '0.5rem 0.8rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: hoveredTag === tagId ? theme.colors.accentText : theme.colors.textPrimary,
    borderRadius: '8px',
    background: hoveredTag === tagId ? theme.colors.accentSoft : '#F4F4F4',
    transition: 'all 0.15s ease',
    border: `1px solid ${hoveredTag === tagId ? theme.colors.accentSoft : 'transparent'}`,
    transform: hoveredTag === tagId ? 'translateY(-1px)' : 'none',
    cursor: 'default',
  })

  return (
    <section style={sectionStyle} id="skills" ref={(el) => { (containerRef as any).current = el; (revealRef as any).current = el; }}>
      <div style={spotlightStyle} />
      <div style={innerStyle}>
        <div className="animate-on-scroll" style={headerStyle}>
          <span style={badgeStyle}>Skills</span>
          <h2 style={titleStyle}>What's in the Toolkit.</h2>
        </div>

        <div style={gridStyle}>
          {skillGroups.map((group, index) => (
            <div 
              key={group.title}
              className="skill-card"
              style={cardStyle(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: theme.spacing.lg }}>
                <span style={{ fontSize: '1.1rem' }}>{group.icon}</span>
                <span style={{ 
                  fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', 
                  textTransform: 'uppercase', color: '#BBB',
                }}>
                  {group.title}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {group.items.map((item) => {
                  const tagId = `${group.title}-${item}`
                  return (
                    <span 
                      key={item}
                      className="skill-tag"
                      style={tagStyle(tagId)}
                      onMouseEnter={() => setHoveredTag(tagId)}
                      onMouseLeave={() => setHoveredTag(null)}
                    >
                      {item}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
