import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'
import { openLightbox } from './ImageLightbox'
import { useIsMobile } from '../hooks/useIsMobile'

// --- Data ---

const projectMeta = [
  { label: 'ROLE', value: 'UI Designer' },
  { label: 'TYPE', value: 'Collaborative' },
  { label: 'PLATFORM', value: 'Mobile App + Website' },
  { label: 'TOOL', value: 'Figma' },
  { label: 'FOCUS', value: 'EdTech UI' },
]

const problems = [
  'Inconsistent visual hierarchy made scanning difficult',
  'User flow had unnecessary friction between key actions',
  'No clear typographic or spacing system',
  'Mobile experience felt like an afterthought',
]

const processSteps = [
  {
    num: '01',
    title: 'Audit & Observe',
    desc: 'Studied the existing interface screen by screen — noting what felt confusing, visually heavy, or where the flow broke down.',
  },
  {
    num: '02',
    title: 'Define the Problems',
    desc: 'Grouped issues into three categories: visual inconsistency, flow friction, and spacing/layout problems. This gave the design a clear direction.',
  },
  {
    num: '03',
    title: 'Design & Refine',
    desc: 'Applied a consistent type scale, spacing system, and component structure. Built key screens prioritizing clarity and calm over complexity.',
  },
  {
    num: '04',
    title: 'Review & Iterate',
    desc: 'Compared design iterations side-by-side to ensure every change had a reason. Removed anything that didn\'t serve the user.',
  },
]

const improvements = [
  'Established clear visual hierarchy using type scale and weight contrast',
  'Simplified navigation flow — reduced steps to reach core content',
  'Introduced consistent spacing and layout grid across all screens',
  'Redesigned mobile screens with thumb-friendly interaction zones',
  'Applied a clean, minimal color palette suited for long study sessions',
  'Created reusable UI components for visual consistency',
]

const decisions = [
  { decision: 'Minimal color palette', reason: 'Reduces cognitive load during study sessions' },
  { decision: 'Large readable typography', reason: 'Prioritizes accessibility and scan-ability' },
  { decision: 'Bottom navigation on mobile', reason: 'Follows natural thumb reach patterns' },
  { decision: 'Generous white space', reason: 'Lets content breathe, reduces overwhelm' },
  { decision: 'Card-based layout', reason: 'Creates clear content boundaries' },
]

// --- Scroll-reveal hook ---
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}


// --- Animated Scroll-reveal Block ---
function RevealBlock({ children, delay = 0, style = {} }: { children: any; delay?: number; style?: any }) {
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(35px)',
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}


// --- Glimpses / Project Showcase Section ---
function GlimpsesSection({ isMobile }: { isMobile: boolean }) {
  const { ref, visible } = useReveal()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const mobileScreens = [
    { src: '/screenshots/screen-1.png', alt: 'Live Focus Room' },
    { src: '/screenshots/screen-2.png', alt: 'Home Dashboard' },
    { src: '/screenshots/screen-4.png', alt: 'Revision Notes' },
    { src: '/screenshots/screen-5.png', alt: 'Focus Timer' },
    { src: '/screenshots/screen-6.png', alt: 'Study Rooms' },
    { src: '/screenshots/screen-7.png', alt: 'Leaderboard' },
  ]

  return (
    <div
      ref={ref}
      style={{
        marginTop: '2rem',
        marginBottom: '0.5rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: '#C8553D',
          whiteSpace: 'nowrap' as const,
        }}>
          Some Glimpses from the Project
        </div>
        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(200,85,61,0.45), transparent)',
        }} />
      </div>

      {/* Mobile Screenshots — staggered mosaic grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
        gap: isMobile ? '10px' : '12px',
        alignItems: 'end',
        marginBottom: isMobile ? '10px' : '12px',
        paddingBottom: isMobile ? '8px' : '20px',
      }}>
        {mobileScreens.map((screen, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => openLightbox(screen.src, screen.alt)}
            style={{
              borderRadius: '22px',
              overflow: 'hidden',
              boxShadow: hoveredIdx === i
                ? '0 22px 52px rgba(200,85,61,0.3), 0 6px 20px rgba(0,0,0,0.08)'
                : '0 6px 24px rgba(0,0,0,0.09)',
              border: hoveredIdx === i
                ? '1.5px solid rgba(200,85,61,0.4)'
                : '1.5px solid rgba(224, 213, 204, 0.55)',
              transform: hoveredIdx === i
                ? (i % 2 === 0 ? 'translateY(-10px) scale(1.04)' : 'translateY(6px) scale(1.04)')
                : (i % 2 === 0 ? 'translateY(0px)' : 'translateY(18px)'),
              transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              cursor: 'zoom-in',
              background: theme.colors.white,
            }}
          >
            <img
              src={screen.src}
              alt={screen.alt}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .custom-scrollbar-container::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-container::-webkit-scrollbar-track {
          background: #0B0816;
        }
        .custom-scrollbar-container::-webkit-scrollbar-thumb {
          background: rgba(200, 85, 61, 0.45);
          border-radius: 4px;
        }
        .custom-scrollbar-container::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 85, 61, 0.7);
        }
      `}</style>

      {/* Website Screenshot — full width with browser chrome */}
      <div
        onMouseEnter={() => setHoveredIdx(99)}
        onMouseLeave={() => setHoveredIdx(null)}
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: hoveredIdx === 99
            ? '0 32px 70px rgba(200,85,61,0.28), 0 10px 30px rgba(0,0,0,0.12)'
            : '0 12px 40px rgba(0,0,0,0.08)',
          border: hoveredIdx === 99
            ? '1.5px solid rgba(200,85,61,0.45)'
            : '1.5px solid rgba(224,213,204,0.5)',
          transform: hoveredIdx === 99 ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          background: '#0B0816',
        }}
      >
        {/* Browser address bar */}
        <div style={{
          background: 'linear-gradient(135deg, #100726 0%, #2e1266 50%, #100726 100%)',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          userSelect: 'none',
        }}>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((color, i) => (
              <span key={i} style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: color,
                display: 'block',
              }} />
            ))}
          </div>
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '10px',
            padding: '5px 16px',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center' as const,
            letterSpacing: '0.04em',
            fontFamily: 'Inter, sans-serif',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}>
            <span style={{ color: '#9B6FE5', fontWeight: 600 }}>🔒</span>
            <span>virtuallibrary.in</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', paddingRight: '4px' }}>
            <span>✕</span>
          </div>
        </div>

        {/* Scrollable web preview container */}
        <div 
          onClick={() => openLightbox('/screenshots/screen-8.png', 'Virtual Library Website')}
          style={{
            height: isMobile ? '340px' : '560px',
            overflowY: 'auto',
            overflowX: 'hidden',
            cursor: 'zoom-in',
            position: 'relative',
            background: '#0a0712',
          }}
          className="custom-scrollbar-container"
        >
          <img
            src="/screenshots/screen-8.png"
            alt="Virtual Library Website"
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              imageRendering: 'auto',
            }}
          />
        </div>
      </div>

      {/* Scroll hint on mobile */}
      {isMobile && (
        <div style={{
          textAlign: 'center' as const,
          fontSize: '0.75rem',
          color: theme.colors.textMuted,
          marginTop: '8px',
          letterSpacing: '0.04em',
        }}>
          Swipe to explore →
        </div>
      )}
    </div>
  )
}


// --- Main Component ---

export function CaseStudy({ onBack }: { onBack?: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroReveal = useReveal()

  // Responsive
  const { isMobile } = useIsMobile()

  return (
    <div
      ref={sectionRef}
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: `0 ${theme.spacing.xl}`,
        fontFamily: theme.typography.sans,
      }}
    >

        {/* Back Button */}
        <button
          onClick={() => onBack?.()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.625rem 1.25rem',
            background: theme.colors.white,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.full,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.colors.textPrimary,
            cursor: 'pointer',
            marginBottom: theme.spacing['2xl'],
            transition: 'all 0.25s ease',
            fontFamily: theme.typography.sans,
          }}
          onMouseEnter={(e: any) => { e.currentTarget.style.background = theme.colors.dark; e.currentTarget.style.color = theme.colors.white; e.currentTarget.style.borderColor = theme.colors.dark }}
          onMouseLeave={(e: any) => { e.currentTarget.style.background = theme.colors.white; e.currentTarget.style.color = theme.colors.textPrimary; e.currentTarget.style.borderColor = theme.colors.border }}
        >
          <span style={{ transition: 'transform 0.2s ease', display: 'inline-block' }}>←</span> Back to Projects
        </button>

        {/* --- HERO --- */}
        <div
          ref={heroReveal.ref}
          style={{
            marginBottom: theme.spacing['2xl'],
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: theme.spacing.md, marginBottom: theme.spacing.sm }}>
            <span style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 400,
              color: 'rgba(192, 81, 63, 0.15)',
              lineHeight: 1,
            }}>01</span>
            <h2 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 600,
              color: theme.colors.textPrimary,
              margin: 0,
              letterSpacing: '-0.02em',
            }}>Virtual Library</h2>
          </div>
          <p style={{
            fontSize: '1.0625rem',
            color: theme.colors.textSecondary,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '600px',
          }}>
            Redesigning the way students learn online — from functional to frictionless.
          </p>
        </div>

        {/* --- META BAR --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : `repeat(${projectMeta.length}, 1fr)`,
            background: theme.colors.white,
            borderRadius: '14px',
            border: '1px solid rgba(224, 213, 204, 0.5)',
            overflow: 'hidden',
            marginBottom: theme.spacing.md,
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
          }}
        >
          {projectMeta.map((meta, i) => (
            <div key={i} style={{
              padding: '1rem 1.25rem',
              borderRight: (i < projectMeta.length - 1 && !isMobile) ? '1px solid rgba(224, 213, 204, 0.4)' : 'none',
              borderBottom: isMobile ? '1px solid rgba(224, 213, 204, 0.4)' : 'none',
            }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.colors.textMuted, marginBottom: '6px' }}>
                {meta.label}
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: theme.colors.textPrimary }}>
                {meta.value}
              </div>
            </div>
          ))}
        </div>

        {/* --- APP SCREENSHOTS / GLIMPSES --- */}
        <GlimpsesSection isMobile={isMobile} />

        {/* --- OVERVIEW --- */}
        <RevealBlock style={{ borderTop: '1px solid rgba(224, 213, 204, 0.4)', padding: '2.5rem 0' }}>
          <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8553D', marginBottom: '12px' }}>Overview</h3>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: 0 }}>
            Virtual Library is a tutoring platform designed to connect students with learning resources and educators. This project focused on designing a clean, structured UI that creates an intuitive learning experience across both a mobile app and website.
          </p>
        </RevealBlock>

        {/* --- PROBLEM & MY ROLE --- */}
        <RevealBlock style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? '2.5rem' : '4.5rem',
          borderTop: '1px solid rgba(224, 213, 204, 0.4)',
          padding: '2.5rem 0',
        }}>
          {/* Left: Problem */}
          <div>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8553D', marginBottom: '12px' }}>Problem</h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: `0 0 ${theme.spacing.lg} 0` }}>
              The existing interface was built code-first — functional, but visually rough and difficult to navigate. Learners had to work harder than necessary to find content, understand where they were, or move between key sections.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {problems.map((p, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '0.875rem 1.125rem',
                  background: 'rgba(253, 236, 236, 0.45)',
                  border: '1px solid rgba(192, 81, 63, 0.1)',
                  borderRadius: '10px',
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'rgba(192, 81, 63, 0.12)',
                    color: theme.colors.accent,
                    fontSize: '0.55rem',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>✕</span>
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.5, color: theme.colors.textPrimary }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: My Role */}
          <div>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8553D', marginBottom: '12px' }}>My Role</h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: 0 }}>
              I was responsible for the complete UI design of the platform — from layout structure and visual hierarchy to user flow and component design. The project was collaborative in nature, with development and technical implementation handled separately.
            </p>
          </div>
        </RevealBlock>

        {/* --- PROCESS --- */}
        <RevealBlock style={{
          borderTop: '1px solid rgba(224, 213, 204, 0.4)',
          padding: '2.5rem 0',
        }}>
          <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8553D', marginBottom: '24px' }}>Process</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '24px',
            position: 'relative',
          }}>
            {/* Connecting horizontal line on desktop */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '30px',
                right: '30px',
                height: '2px',
                background: 'linear-gradient(90deg, #C8553D 0%, rgba(200,85,61,0.15) 100%)',
                zIndex: 0,
              }} />
            )}
            {processSteps.map((step) => (
              <div key={step.num} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '14px', alignItems: isMobile ? 'flex-start' : 'center', textAlign: isMobile ? 'left' : 'center' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#C8553D',
                  color: theme.colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  boxShadow: '0 0 0 4px rgba(200,85,61,0.15)',
                }}>
                  {step.num}
                </div>
                <div style={{ marginTop: isMobile ? '0' : '8px' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: theme.colors.textPrimary, margin: '0 0 6px 0' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: theme.colors.textSecondary, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealBlock>

        {/* --- KEY UI IMPROVEMENTS & DESIGN DECISIONS --- */}
        <RevealBlock style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2.5rem' : '4.5rem',
          borderTop: '1px solid rgba(224, 213, 204, 0.4)',
          padding: '2.5rem 0',
        }}>
          {/* Left: Key UI Improvements */}
          <div>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8553D', marginBottom: '16px' }}>Key UI Improvements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {improvements.map((imp, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '0.875rem 1.125rem',
                  background: 'rgba(230, 244, 234, 0.45)',
                  border: '1px solid rgba(45, 138, 78, 0.1)',
                  borderRadius: '10px',
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'rgba(45, 138, 78, 0.12)',
                    color: theme.colors.green,
                    fontSize: '0.6rem',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>✓</span>
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.5, color: theme.colors.textPrimary }}>{imp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Design Decisions */}
          <div>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8553D', marginBottom: '16px' }}>Design Decisions</h3>
            <div style={{
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(224, 213, 204, 0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            }}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.3fr',
                background: '#150A2E',
                padding: '0.75rem 1.125rem',
              }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: theme.colors.white, letterSpacing: '0.04em' }}>DECISION</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: theme.colors.white, letterSpacing: '0.04em' }}>REASON</span>
              </div>
              {/* Table Rows */}
              {decisions.map((row, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.3fr',
                  padding: '0.75rem 1.125rem',
                  borderBottom: i < decisions.length - 1 ? '1px solid rgba(224, 213, 204, 0.3)' : 'none',
                  background: theme.colors.white,
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: theme.colors.textPrimary }}>{row.decision}</span>
                  <span style={{ fontSize: '0.85rem', color: theme.colors.textSecondary, lineHeight: 1.4 }}>{row.reason}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* --- OUTCOME --- */}
        <RevealBlock style={{
          borderTop: '1px solid rgba(224, 213, 204, 0.4)',
          padding: '2.5rem 0',
        }}>
          <div style={{
            background: 'rgba(200, 85, 61, 0.04)',
            border: '1.5px dashed rgba(200, 85, 61, 0.25)',
            borderRadius: '20px',
            padding: '2.25rem',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8553D', marginBottom: '12px' }}>Outcome</h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: 0, fontStyle: 'italic', fontWeight: 500 }}>
              The designed interface transforms Virtual Library from a rough, code-first platform into a calm, organized learning environment. Students can now navigate with less friction, find content faster, and spend more mental energy on learning — not figuring out the UI.
            </p>
          </div>
        </RevealBlock>

        {/* --- APP & WEBSITE LINKS --- */}
        <RevealBlock style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '16px',
          borderTop: '1px solid rgba(224, 213, 204, 0.4)',
          paddingTop: '2.5rem',
          paddingBottom: '3.5rem',
        }}>
          {/* App Link Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: theme.colors.white,
            borderRadius: '16px',
            border: '1px solid rgba(224, 213, 204, 0.5)',
            padding: '1.25rem 1.5rem',
            gap: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(200, 85, 61, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C8553D',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}>📱</div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.colors.textPrimary }}>APP LINK</div>
              </div>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=in.virtuallibrary.virtuallibrary"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.65rem 1.25rem',
                background: '#150A2E',
                color: theme.colors.white,
                borderRadius: theme.radius.full,
                fontSize: '0.8125rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e: any) => e.currentTarget.style.background = '#C8553D'}
              onMouseLeave={(e: any) => e.currentTarget.style.background = '#150A2E'}
            >
              Get App <span>→</span>
            </a>
          </div>

          {/* Website Link Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: theme.colors.white,
            borderRadius: '16px',
            border: '1px solid rgba(224, 213, 204, 0.5)',
            padding: '1.25rem 1.5rem',
            gap: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(200, 85, 61, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C8553D',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}>🌐</div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.colors.textPrimary }}>WEBSITE LINK</div>
              </div>
            </div>
            <a
              href="https://virtuallibrary.in/v2/neet-pg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.65rem 1.25rem',
                background: '#150A2E',
                color: theme.colors.white,
                borderRadius: theme.radius.full,
                fontSize: '0.8125rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e: any) => e.currentTarget.style.background = '#C8553D'}
              onMouseLeave={(e: any) => e.currentTarget.style.background = '#150A2E'}
            >
              Visit <span>→</span>
            </a>
          </div>
        </RevealBlock>

    </div>
  )
}
