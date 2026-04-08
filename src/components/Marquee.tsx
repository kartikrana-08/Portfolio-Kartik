import { theme } from '../theme'

const skills = [
  'UI Design',
  'Visual Hierarchy',
  'User Flow',
  'Figma',
  'Mobile UI',
  'Web Design',
  'Component Design',
  'Clean Aesthetics',
]

export function Marquee() {
  const items = [...skills, ...skills, ...skills]

  const marqueeStyle: any = {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    zIndex: 1,
    background: '#1A1A1A', // var(--color-dark)
    overflow: 'hidden',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
  }

  const trackStyle: any = {
    display: 'flex',
    whiteSpace: 'nowrap',
    animation: 'marqueeScroll 40s linear infinite',
    willChange: 'transform',
  }

  const itemStyle: any = {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
  }

  const textStyle: any = {
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: '0.02em',
    padding: '0 8px',
  }

  const dotStyle: any = {
    color: theme.colors.accent,
    fontSize: '0.6rem',
    padding: '0 8px',
  }

  return (
    <div style={marqueeStyle}>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
      <div style={trackStyle}>
        {items.map((skill, index) => (
          <span key={index} style={itemStyle}>
            <span style={textStyle}>{skill}</span>
            <span style={dotStyle}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
