import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'
import { useScrollReveal } from '../hooks/useScrollReveal'

// --- Sub-components for better organization ---

const FloatingTag = ({ children, type, mousePos }: any) => {
  const baseStyle: any = {
    position: 'absolute',
    padding: theme.spacing.sm + ' ' + '1.25rem',
    borderRadius: theme.radius.full,
    fontSize: '0.75rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    zIndex: 10,
    boxShadow: type === 'mobile' ? theme.shadows.tag : theme.shadows.sm,
    opacity: 0,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.3s ease-out',
  }

  const typeStyles: any = {
    clean: {
      top: '-8px',
      left: 0,
      background: 'rgba(233, 245, 237, 0.85)',
      color: theme.colors.green,
      border: '1px solid rgba(45, 138, 78, 0.15)',
      animation: 'tagPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.8s forwards, gentleFloat 4s ease-in-out 2.5s infinite',
      transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
    },
    mobile: {
      top: '50px',
      right: '-15px',
      background: 'rgba(255, 255, 255, 0.95)',
      color: theme.colors.textPrimary,
      border: '1px solid rgba(230, 225, 220, 0.5)',
      animation: 'tagPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 2.1s forwards, gentleFloatAlt 4.5s ease-in-out 2.8s infinite',
      transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
    },
    figma: {
      bottom: '170px',
      left: '-10px',
      background: 'rgba(233, 245, 237, 0.85)',
      color: theme.colors.green,
      border: '1px solid rgba(45, 138, 78, 0.15)',
      animation: 'tagPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 2.4s forwards, gentleFloat 3.8s ease-in-out 3.1s infinite',
      transform: `translate(${mousePos.x * -20}px, ${mousePos.y * 20}px)`,
    }
  }

  return (
    <div style={{ ...baseStyle, ...typeStyles[type] }}>
      {children}
    </div>
  )
}




const MockupWindow = ({ mousePos }: any) => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: '18px',
        left: '5%',
        width: '350px',
        background: theme.colors.white,
        borderRadius: '16px',
        boxShadow: theme.shadows.mockup,
        border: '1px solid rgba(230, 225, 220, 0.4)',
        overflow: 'hidden',
        opacity: 0,
        animation: 'popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards',
        transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >

      {/* Title bar - minimal */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 14px', borderBottom: '1px solid #F0ECE8' }}>
        {[1, 2, 3].map(i => (
          <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D5CFC8' }} />
        ))}
      </div>


      {/* Content area */}
      <div style={{ display: 'flex', minHeight: '300px' }}>
        {/* Sidebar */}
        <div style={{ width: '36px', padding: '12px 6px', borderRight: '1px solid #F0ECE8', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[14, 12, 12, 10].map((s, i) => (
            <div key={i} style={{ width: s + 'px', height: s + 'px', borderRadius: i === 0 ? '4px' : '50%', background: i === 0 ? theme.colors.accentSoft : '#EDE9E3', margin: '0 auto', opacity: i === 0 ? 1 : 0.5 }} />
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Search/filter bar */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1, height: '24px', background: '#F5F2EE', borderRadius: '6px', border: '1px solid #EDE9E3' }} />
            <div style={{ width: '24px', height: '24px', background: theme.colors.accentSoft, borderRadius: '6px' }} />
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {[45, 35, 40, 30].map((w, i) => (
              <div key={i} style={{ width: w + 'px', height: '8px', borderRadius: '4px', background: i === 0 ? theme.colors.accent : '#EDE9E3', opacity: i === 0 ? 0.7 : 1 }} />
            ))}
          </div>

          {/* Content grid - varied sizes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '10px' }}>
            {/* Featured card */}
            <div style={{ height: '80px', background: 'linear-gradient(135deg, #F5F2EE, #EDE9E3)', borderRadius: '10px', border: '1px solid rgba(230, 220, 210, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '8px' }}>
              <div style={{ height: '5px', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', width: '70%' }} />
              <div style={{ height: '4px', background: 'rgba(0,0,0,0.04)', borderRadius: '3px', width: '45%', marginTop: '4px' }} />
            </div>
            {/* Stacked cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ flex: 1, background: '#F5F2EE', borderRadius: '8px', border: '1px solid rgba(230, 220, 210, 0.2)' }} />
              <div style={{ flex: 1, background: '#F5F2EE', borderRadius: '8px', border: '1px solid rgba(230, 220, 210, 0.2)' }} />
            </div>
          </div>

          {/* Bottom row - 3 equal cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ height: '50px', background: '#F5F2EE', borderRadius: '8px', border: '1px solid rgba(230, 220, 210, 0.2)' }} />
            ))}
          </div>

          {/* Text lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            <div style={{ height: '6px', background: '#EDE9E3', borderRadius: '10px', width: '100%' }} />
            <div style={{ height: '6px', background: '#EDE9E3', borderRadius: '10px', width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const PhoneMockup = ({ mousePos }: any) => {
  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '25px',
        right: '0%',
        width: '190px',
        background: theme.colors.white,
        borderRadius: '32px',
        boxShadow: theme.shadows.phone,
        border: '1px solid rgba(230, 225, 220, 0.4)',
        overflow: 'hidden',
        padding: '10px',
        opacity: 0,
        animation: 'slideInRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s forwards',
        transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`
      }}
    >
      <div style={{ width: '35px', height: '6px', background: theme.colors.mockup.line, borderRadius: '10px', margin: '6px auto 10px' }} />
      <div style={{ background: '#FAF7F4', borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px' }}>
          <span style={{ fontSize: '0.5rem', fontWeight: 700, color: theme.colors.textPrimary }}>9:41</span>
          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
             {[4, 6, 8].map(h => <span key={h} style={{ width: '3px', height: h+'px', background: theme.colors.textPrimary, borderRadius: '1px' }} />)}
          </div>
        </div>
        <div style={{ padding: '10px 12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Header area */}
          <div style={{ height: '50px', background: 'linear-gradient(135deg, #EDE9E3, #E5E0D9)', borderRadius: '10px' }} />
          {/* Title lines */}
          <div style={{ height: '6px', background: '#EDE9E3', borderRadius: '4px', width: '85%' }} />
          <div style={{ height: '5px', background: '#EDE9E3', borderRadius: '4px', width: '55%' }} />
          {/* Card row */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <div style={{ flex: 1, height: '48px', background: '#F5F2EE', borderRadius: '8px', border: '1px solid rgba(230, 220, 210, 0.2)' }} />
            <div style={{ flex: 1, height: '48px', background: '#F5F2EE', borderRadius: '8px', border: '1px solid rgba(230, 220, 210, 0.2)' }} />
          </div>
          {/* List items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            <div style={{ height: '5px', background: '#EDE9E3', borderRadius: '4px', width: '100%' }} />
            <div style={{ height: '5px', background: '#EDE9E3', borderRadius: '4px', width: '70%' }} />
          </div>
        </div>
        {/* Bottom nav */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 16px', borderTop: '1px solid rgba(230, 220, 210, 0.3)' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ width: '12px', height: '12px', borderRadius: i === 0 ? '4px' : '50%', background: i === 0 ? 'rgba(192, 81, 63, 0.3)' : '#EDE9E3' }} />
          ))}
        </div>
      </div>
      <div style={{ width: '40px', height: '4px', background: '#D5CFC8', borderRadius: '10px', margin: '8px auto 4px' }} />
    </div>
  )
}

// --- Main Hero Component ---

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  
  const { ref: sectionRef } = useScrollReveal()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()
      const nx = (e.clientX - left) / width - 0.5
      const ny = (e.clientY - top) / height - 0.5
      setMousePos({ x: nx, y: ny })
      setPixelPos({ x: e.clientX - left, y: e.clientY - top })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])




  const leftBtnRef = useRef<HTMLAnchorElement>(null)
  const [leftBtnTransform, setLeftBtnTransform] = useState({ x: 0, y: 0 })

  const handleMagnetic = (e: MouseEvent) => {
    if (!leftBtnRef.current) return
    const { left, top, width, height } = leftBtnRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    if (distance < 120) {
      setLeftBtnTransform({ x: distanceX * 0.4, y: distanceY * 0.4 })
    } else {
      setLeftBtnTransform({ x: 0, y: 0 })
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMagnetic)
    return () => window.removeEventListener('mousemove', handleMagnetic)
  }, [])

  return (
    <section 
      id="hero" 
      ref={(el: any) => {
        heroRef.current = el
        sectionRef.current = el
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: theme.colors.bg,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: theme.layout.navHeight,
      }}
    >

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0,
        animation: 'fadeInUp 0.8s ease-out 3s forwards',
        zIndex: 10
      }}>
        <div style={{
          width: '24px',
          height: '40px',
          borderRadius: '12px',
          border: `2px solid ${theme.colors.border}`,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            width: '2px',
            height: '6px',
            background: theme.colors.accent,
            borderRadius: '2px',
            transform: 'translateX(-50%)',
            animation: 'scrollDot 2s ease-in-out infinite'
          }} />
        </div>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', color: theme.colors.textMuted, textTransform: 'uppercase' }}>Scroll</span>
      </div>


      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes badgePopIn { 
          0% { opacity: 0; transform: scale(0.9) translateY(-10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 
          0% { opacity: 0; transform: scale(0.8) translateY(40px); }
          60% { opacity: 1; transform: scale(1.02) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(60px) scale(0.9); }
          70% { opacity: 1; transform: translateX(-5px) scale(1.01); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes tagPopIn { from { opacity: 0; transform: scale(0) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes gentleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes gentleFloatAlt { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-4px) translateX(3px); } }
        @keyframes labelFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes liveBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } }
        @keyframes badgePulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(45, 138, 78, 0.1); } 50% { box-shadow: 0 0 0 6px rgba(45, 138, 78, 0); } }
        @keyframes meshFlow { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-5%, 5%) rotate(5deg); } 100% { transform: translate(5%, -5%) rotate(-5deg); } }
        @keyframes scrollDot { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
        @keyframes floatParticle {

          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(45deg); }
          66% { transform: translate(-20px, 40px) rotate(-45deg); }
        }
      `}</style>

      {/* Premium Background Layers */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '120%', height: '140%',
          backgroundImage: `radial-gradient(at 0% 0%, rgba(253, 220, 196, 0.4) 0px, transparent 50%),
                           radial-gradient(at 100% 0%, rgba(255, 232, 214, 0.4) 0px, transparent 50%),
                           radial-gradient(at 0% 100%, rgba(245, 197, 168, 0.3) 0px, transparent 50%),
                           radial-gradient(at 100% 100%, rgba(253, 220, 196, 0.4) 0px, transparent 50%)`,
          filter: 'blur(100px)', animation: 'meshFlow 20s ease-in-out infinite alternate'
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
        {/* Subtle Grid Pattern */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: `radial-gradient(${theme.colors.border} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>


      {/* Spotlight Effect */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none',
        background: `radial-gradient(600px circle at ${pixelPos.x}px ${pixelPos.y}px, rgba(192, 81, 63, 0.06), transparent 40%)`
      }} />


      {/* Decorative Particles */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: '15px', height: '15px', border: `1px solid ${theme.colors.accent}`, borderRadius: '50%', top: '20%', left: '10%', opacity: 0.15, animation: 'floatParticle 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '10px', height: '10px', background: theme.colors.accent, borderRadius: '2px', bottom: '30%', right: '15%', opacity: 0.15, animation: 'floatParticle 10s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', width: '15px', height: '15px', border: `1px solid ${theme.colors.accent}`, borderRadius: '50%', top: '60%', left: '80%', opacity: 0.1, animation: 'floatParticle 8s ease-in-out infinite', animationDelay: '-2s' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: theme.spacing['3xl'], alignItems: 'center', width: '100%', maxWidth: theme.layout.maxWidth, margin: '0 auto', padding: `0 ${theme.spacing.xl}`, position: 'relative', zIndex: 2 }}>
        {/* Left Content */}
        <div>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '0.5rem 1rem', 
              background: '#ECFDF5', 
              border: '1.5px solid rgba(16, 185, 129, 0.15)', 
              borderRadius: theme.radius.full, 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: '#065F46', 
              marginBottom: theme.spacing.xl,
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.05)',
              position: 'relative',
              zIndex: 10,
              animation: 'badgePopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards',
              opacity: 0,
              cursor: 'default',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e: any) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)' }}
            onMouseLeave={(e: any) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.05)' }}
          >
            <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 0 5px rgba(16, 185, 129, 0.1)', animation: 'badgePulse 2.5s infinite ease-in-out' }} />
            <span style={{ fontSize: '0.85rem' }}>✦</span>
            <span style={{ letterSpacing: '0.01em' }}>Available for opportunities</span>
          </div>

          <h1 
            className="hero-text animate-on-scroll"
            style={{ 
              fontFamily: theme.typography.serif, 
              fontSize: 'clamp(2.75rem, 6vw, 4.25rem)', 
              fontWeight: 400, 
              lineHeight: 1.1, 
              letterSpacing: '-0.025em', 
              color: theme.colors.textPrimary, 
              marginBottom: theme.spacing.lg,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Crafting interfaces</span>
            <span style={{ display: 'inline-block', color: theme.colors.accent, fontStyle: 'italic', whiteSpace: 'nowrap' }}>people enjoy</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>using</span>
          </h1>

          <p 
            className="hero-text animate-on-scroll"
            style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: theme.colors.textSecondary, maxWidth: '420px', marginBottom: theme.spacing.lg }}
          >
            I'm Kartik Rana — a UI Designer turning cluttered screens into calm, intuitive experiences.
          </p>

          <div 
            className="animate-on-scroll"
            style={{ display: 'flex', gap: theme.spacing.lg, marginBottom: theme.spacing['2xl'], opacity: 0, animation: 'fadeInUp 0.5s ease-out 1.2s forwards' }}
          >
            {['UI/UX Design', 'Branding', 'Prototyping'].map((label, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.65rem', color: theme.colors.accent }}>✦</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: theme.colors.textMuted, textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>


          <div 
            className="animate-on-scroll"
            style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}
          >

             <a 
               href="#work" 
               ref={leftBtnRef} 
               style={{ 
                 display: 'inline-flex', 
                 alignItems: 'center', 
                 gap: theme.spacing.sm, 
                 padding: '1rem 2.25rem', 
                 fontSize: '0.9375rem', 
                 fontWeight: 600, 
                 borderRadius: theme.radius.full, 
                 background: theme.colors.accent, 
                 color: theme.colors.white, 
                 textDecoration: 'none',
                 transform: `translate(${leftBtnTransform.x}px, ${leftBtnTransform.y}px)`, 
                 transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                 boxShadow: '0 4px 15px rgba(192, 81, 63, 0.2)'
               }}
               onMouseEnter={(e: any) => e.currentTarget.style.background = theme.colors.accentHover}
               onMouseLeave={(e: any) => e.currentTarget.style.background = theme.colors.accent}
             >
               See My Work
             </a>
             <a 
               href="#about" 
               style={{ 
                 display: 'inline-flex', 
                 alignItems: 'center', 
                 gap: theme.spacing.sm, 
                 padding: '1rem 2.25rem', 
                 fontSize: '0.9375rem', 
                 fontWeight: 600, 
                 borderRadius: theme.radius.full, 
                 background: 'transparent', 
                 color: theme.colors.textPrimary, 
                 border: `1.5px solid ${theme.colors.border}`, 
                 textDecoration: 'none',
                 transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)' 
               }}
               onMouseEnter={(e: any) => {
                 e.currentTarget.style.background = 'rgba(0,0,0,0.02)'
                 e.currentTarget.style.borderColor = theme.colors.textPrimary
               }}
               onMouseLeave={(e: any) => {
                 e.currentTarget.style.background = 'transparent'
                 e.currentTarget.style.borderColor = theme.colors.border
               }}
             >
               About Me <span style={{ transition: 'transform 0.3s ease', marginLeft: '4px' }}>→</span>
             </a>
          </div>
        </div>

        {/* Right Visual */}
        <div style={{ position: 'relative', height: '520px', transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}>
          <FloatingTag children={<><span style={{ marginRight: '4px' }}>✦</span> Clean UI</>} type="clean" mousePos={mousePos} />
          <FloatingTag children="Mobile + Web" type="mobile" mousePos={mousePos} />
          <FloatingTag children="Figma" type="figma" mousePos={mousePos} />


          
          <MockupWindow mousePos={mousePos} />

          <PhoneMockup mousePos={mousePos} />


          <div style={{
            position: 'absolute', bottom: '-15px', right: '0%', width: '190px', textAlign: 'center',
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: theme.colors.accent,
            textTransform: 'uppercase', opacity: 0, animation: 'labelFadeIn 0.5s ease-out 1.7s forwards'
          }}>
            UI DESIGN · FIGMA
          </div>
        </div>
      </div>
    </section>
  )
}
