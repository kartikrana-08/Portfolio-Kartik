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
    display: 'flex',
    flexDirection: gridCols === 1 ? 'column' : 'row',
    flexWrap: gridCols === 2 ? 'wrap' : 'nowrap',
    gap: theme.spacing.lg,
    alignItems: 'stretch',
  }

  const cardStyle = (index: number): any => {
    let flexStyle = {}
    
    if (gridCols === 4) {
      const flexVal = hoveredCard === index ? '2' : (hoveredCard !== null ? '0.66' : '1')
      flexStyle = { flex: `${flexVal} 1 0%` }
    } else if (gridCols === 2) {
      let basis = 'calc(50% - 0.75rem)'
      if (hoveredCard !== null) {
        const isSameRow = Math.floor(hoveredCard / 2) === Math.floor(index / 2)
        if (isSameRow) {
          basis = hoveredCard === index ? 'calc(65% - 0.75rem)' : 'calc(35% - 0.75rem)'
        }
      }
      flexStyle = { flex: `0 0 ${basis}` }
    } else {
      flexStyle = { width: '100%' }
    }

    return {
      ...flexStyle,
      background: theme.colors.white,
      borderRadius: '24px',
      padding: '2.5rem 2rem',
      border: '1px solid rgba(0, 0, 0, 0.03)',
      boxShadow: hoveredCard === index ? '0 20px 40px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.02)',
      transform: hoveredCard === index ? 'translateY(-4px)' : 'none',
      transition: 'all 600ms cubic-bezier(0.25, 1, 0.5, 1)',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'default',
      overflow: 'hidden',
    }
  }

  const tagStyle = (tagId: string): any => ({
    padding: '0.6rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: hoveredTag === tagId ? theme.colors.accentHover : '#333333',
    borderRadius: '10px',
    background: hoveredTag === tagId ? 'rgba(200, 85, 61, 0.06)' : '#F5F5F5',
    transition: 'all 0.25s ease',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{group.icon}</span>
                <span style={{ 
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', 
                  textTransform: 'uppercase', color: '#A09E9C',
                }}>
                  {group.title}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
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
